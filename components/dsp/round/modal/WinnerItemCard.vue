<template>
  <div class="card-content">
    <div class="wrap-char">
      <div class="char-choice">
        <div class="wrap-detail">
          <h3 class="title">{{ $t('w.rounds.you.won') }}</h3>
          <div class="detail-desc" v-html="$t('s.rounds.message.win', [season.seasonID, round.dspID])"></div>
          <div class="detail-card">
            <dsp-item-card :item="round.item" :smaller="mobile ? 'sm' : ''" />
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-button">
      <button type="button" class="btn btn-secondary" :disabled="winLoading" @click="reward">
        <v-progress-circular v-if="winLoading" class="ml-2" :size="16" :width="2" color="#000" indeterminate />
        <template v-else>
          {{ $t('w.rounds.win.prize') }}<br />
          <span>{{ $t('w.rounds.claim', [availableEndDate]) }}</span>
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import DspItemCard from '@/components/dsp/round/DspItemCard';
import { defaultRound } from '@/constants/dsp/dsp-round';
import { useDay, useWemixLogin } from '@/utils/composables/round';

const { useMutations: useDspMutations, useActions: useDspActions } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'WinnerItemCardBody',
  components: { DspItemCard },
  props: {
    season: {
      type: Object,
      default: () => ({}),
    },
    round: {
      type: Object,
      default: () => defaultRound(),
    },
    mobile: Boolean,
  },
  setup({ round }, { root }) {
    const { $wemix, $store } = root;
    const { wemixLogin } = useWemixLogin(root);

    const state = reactive({
      winLoading: false,
    });

    const { accessToken } = useState(['accessToken']);
    const { setCommonModal } = useMutations(['setCommonModal']);

    const { fetchRounds } = useDspActions(['fetchRounds']);
    const { setOpenWinner } = useDspMutations(['setOpenWinner']);

    const availableEndDate = useDay(round.endDate).add(1, 'year').format(`${root.$t('w.rounds.date.format')}`);

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
      });
    };

    const showErrorModal = (errorResponse) => {
      console.log(errorResponse);
      /**
       * errorCode
       * - 500 : Network Error
       * - 60421 : 월렛 미연동
       * - 60422 : 라운드 조회 실패
       * - 60423 : 라운드 시간 오류
       * - 60424 : 당첨자 아님
       * - 60425 : 캐릭터 검색 안됨
       * - 60426 : 캐릭터 정보 미일치
       * - 60427 : 보상 라운드 조회 실패
       * - 60428 : 지급 실패
       *
       * - 60411 : Send Error
       * - 60412 : Cache Error
       * - 60413 : TX Registration Error
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      const errorTitle = root.$t('t.dsp.reward.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60421:
          errorMessage = root.$t('s.rounds.event.message.not-linked');
          break;
        default:
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const reward = () => {
      if (state.winLoading) {
        return;
      }

      if (!accessToken.value) {
        wemixLogin();
        return;
      }

      const to = '0x19b750c24a5f2112ffc7fa5d4dbe362b70f33c01'; // wemix().contractAddress("tornado","Mir4DSP")
      const draco = $wemix.token('DRACO').address;
      state.winLoading = true;
      $wemix
        .makeUnsignedTx(49, 'tornado', to, draco, 0, 'reward', [`${round.dspID}`, ``])
        .then((data) => {
          if (data.code !== 200) {
            showErrorModal(data);
            state.winLoading = false;
            return;
          }

          const hashes = data.data.hash;
          const messages = $wemix.transaction.requestSignature(hashes);
          $store.dispatch('wemix/sendTransaction', {
            request: messages,
            onSuccess: () => {
              setCommonModal({
                open: true,
                title: root.$t('s.rounds.reward.complete'),
                desc: root.$t('s.rounds.reward.complete.desc'),
                primary: root.$t('w.dsp.common.close'),
                onPrimary() {
                  state.winLoading = false;
                  fetchRounds();
                  setOpenWinner(false);
                },
                onClose() {
                  state.winLoading = false;
                  fetchRounds();
                  setOpenWinner(false);
                },
              });
            }
          });
          // $wemix.openQR(
          //   'sign',
          //   req,
          //   (success) => {
          //     console.log(success);
          //     console.log('트랜젝션이 처리 되었습니다');
          //     setCommonModal({
          //       open: true,
          //       title: root.$t('s.rounds.reward.complete'),
          //       desc: root.$t('s.rounds.reward.complete.desc'),
          //       primary: root.$t('w.dsp.common.close'),
          //       onPrimary() {
          //         state.winLoading = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //       onClose() {
          //         state.winLoading = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //     });
          //   },
          //   (fail) => {
          //     console.log(fail);
          //     // eslint-disable-next-line no-alert
          //     // alert('트랜젝션 수행 중 오류가 발생 하였습니다. ');
          //
          //     setCommonModal({
          //       open: true,
          //       title: 'Failed to send item.',
          //       desc: '',
          //       primary: root.$t('w.dsp.common.close'),
          //       onPrimary() {
          //         state.winLoading = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //       onClose() {
          //         state.winLoading = false;
          //         fetchRounds();
          //         setOpenWinner(false);
          //       },
          //     });
          //   },
          //   () => {
          //     state.winLoading = false;
          //   },
          // );
        })
        .catch((error) => {
          state.winLoading = false;
          console.log('인증 이후 사용 가능 합니다.', error);
        });
    };

    return {
      availableEndDate,
      ...toRefs(state),
      reward,
    };
  },
});
</script>
