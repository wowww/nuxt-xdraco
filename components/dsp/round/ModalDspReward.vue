<template>
  <v-dialog v-model="openReward" content-class="dialog-stake theme-dark" max-width="640" persistent>
    <div v-if="currentRound" class="content">
      <v-btn class="btn-close" fab plain x-small @click="close">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>
      <div class="dialog-header">
        <div class="info-round">
          <dsp-round-number :value="currentRound.roundNum" />
          <round-body-title :item="currentRound.item" />
        </div>
      </div>
      <div class="card-content">
        <div class="wrap-char">
          <my-present-character />
          <div class="char-detail">
            <div class="wrap-detail">
              <div class="wrap-reward">
                <div class="refundable">
                  <strong>{{ $t('w.rounds.reward.refundable-draco') }}</strong>
                  <span class="ico-darco ico-sm add-inside">{{ currentRound.myinfo.reward.refundDraco }}</span>
                </div>
                <div class="plus">+</div>
                <div class="reward">
                  <strong>{{ $t('w.rounds.my.rewards') }}</strong>
                  <span class="ico-darco ico-sm add-inside">{{ currentRound.myinfo.reward.rewardDraco }}</span>
                  <p class="desc">
                    {{ $t('w.rounds.reward.total') }} <em>{{ currentRound.winner.stake | currency(0) }} DRACO</em> {{ $t('w.rounds.reward.share') }}
                    <em>{{ sharedOdds | currency(4) }}%</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-button">
          <button type="button" class="btn btn-primary" :disabled="loading" @click="postRefund">
            <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
            <template v-else>
              {{ $t('w.rounds.refund.rewards') }}
            </template>
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations } from 'vuex-composition-helpers/dist';

import RoundBodyTitle from '@/components/dsp/round/body/RoundBodyTitle';
import DspRoundNumber from '@/components/dsp/round/DspRoundNumber';
import MyPresentCharacter from '@/components/dsp/round/modal/MyPresentCharacter';

const { useGetters: useDspGetters, useState: useDspState, useMutations: useDspMutations, useActions: useDspActions } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'ModalDspReward',
  components: { DspRoundNumber, MyPresentCharacter, RoundBodyTitle },
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const loading = ref(false);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { currentRound } = useDspGetters(['currentRound']);
    const { openReward } = useDspState(['openReward']);
    const { setOpenReward } = useDspMutations(['setOpenReward']);
    const { fetchRounds } = useDspActions(['fetchRounds']);

    const sharedOdds = computed(() => {
      const winnerOdds = currentRound.value.winner.odds;
      return currentRound.value.myinfo.currentOdds * (1 / (100 - winnerOdds)) * 100;
    });

    const close = () => {
      setOpenReward(false);
    };

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
       * - 60431 : 월렛 미연동
       * - 60432 : 라운드 조회 실패
       * - 60433 : 라운드 미종료
       * - 60434 : 환불 받을 정보 없음
       * - 60435 : 환불 실패
       * - 60436 : 이미 환불 받음
       * - 60437 : 컨트랜트 실패
       */
      const { code: errorCode } = errorResponse;
      const errorTitle = root.$t('t.dsp.refund.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60431:
          errorMessage = root.$t('s.rounds.event.message.not-linked');
          break;
        default:
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const postRefund = () => {
      loading.value = true;
      $dracoWebApi
        .post('/dsp/refund', { dspID: currentRound.value.dspID })
        .then(({ data }) => {
          loading.value = false;

          if (data.code !== 200) {
            showErrorModal(data);
          } else {
            setCommonModal({
              open: true,
              title: root.$t('w.rounds.refund.success'),
              desc: '',
              primary: root.$t('w.dsp.common.close'),
              onPrimary() {},
            });

            setOpenReward(false);
            fetchRounds();
          }
        })
        .catch(() => {
          loading.value = false;
        });
    };

    return { currentRound, openReward, close, postRefund, sharedOdds, loading };
  },
});
</script>
