<template>
  <v-dialog v-model="open" content-class="dialog-stake theme-dark" max-width="640" persistent>
    <div v-if="currentRound" class="content">
      <v-btn class="btn-close" fab plain x-small @click="setOpen(false)">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>
      <!-- dialogTitle이 있는 경우 대비 -->
      <div class="dialog-header">
        <div class="info-round">
          <dsp-round-number :value="currentRound.roundNum" />
          <round-body-title :item="currentRound.item" />
        </div>
      </div>
      <div class="card-content">
        <div class="wrap-char">
          <div v-if="represent" class="char-info">
            <div class="char">
              <character-class-thumb :character-class="represent.class" size="96" />
              <div class="wrap-nick">
                <strong class="nick">{{ represent.characterName }}</strong>
                <span class="server">{{ represent.worldName }}</span>
              </div>
            </div>
            <div v-if="balance && balance" class="amount">
              <dl class="balance">
                <dt>{{ $t('w.rounds.draco.balance') }}</dt>
                <dd>
                  <span class="ico-darco ico-xs add-inside">{{ balance.DRACO | currency(0) }}</span>
                </dd>
              </dl>
            </div>
          </div>
          <div class="char-detail">
            <div class="wrap-detail">
              <h3 v-if="staking && not" class="title">{{ $t('t.stake.popup.pre-stake') }}</h3>
              <h3 v-else-if="ongoing && not" class="title">{{ $t('t.stake.popup.stake-earlier') }}</h3>
              <h3 v-else class="title">{{ $t('w.rounds.stake.more') }}</h3>
              <ul class="detail-list">
                <li v-if="more">{{ $t('s.stake.more.increase.odds') }}</li>
                <li v-else-if="staking && not">
                  {{ $t('s.stake.pre.calc.on-start') }}
                </li>
                <li v-else>{{ $t('s.stake.message.info.hurryup') }}</li>
                <li v-if="more">{{ $t('s.stake.more.more.than.stake') }}</li>
                <li v-else>{{ $t('s.stake.message.info.entry-fee', [currentRound.fee]) }}</li>
                <li v-if="not">{{ $t('s.stake.message.info.min-value', [currentRound.minStageAmount]) }}</li>
                <!--                <li v-else>{{ t('s.stake.pre.calc.on-start') }}</li>-->
              </ul>
            </div>

            <div class="amount">
              <dl class="stake">
                <dt>{{ $t(ongoing ? 'w.rounds.my.stake' : 'w.rounds.my.pre.stake') }}</dt>
                <dd>
                  <strong class="ico-darco ico-xs add-inside">{{ currentRound.myinfo.currentStake | currency(0) }}</strong>
                  <!--                  <em class="profit">+ {{ prevStake ? prevStake : 10 }} DRACO</em>-->
                </dd>
              </dl>
              <dl class="stake">
                <dt>{{ $t(ongoing ? 'w.rounds.my.odds' : 'w.rounds.my.pre.odds') }}</dt>
                <dd>
                  <div class="odds">
                    <v-tooltip top>
                      <template #activator="{ on, attrs }">
                        <span v-bind="attrs" class="value" v-on="on">{{ currentRound.myinfo.currentOdds | currency(4) }}</span
                        >%
                      </template>
                      <span>{{ currentRound.myinfo.currentOdds }}</span>
                    </v-tooltip>
                  </div>
                  <!--                  <em class="profit">+ 0.033% (E)</em>-->
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div class="form-amount">
          <span class="desc" :class="{ alert: errorMessage !== '' }">{{ errorMessage ? $t(errorMessage) : $t('s.stake.message.info.input') }}</span>
          <div class="wrap-form">
            <div class="fieldset editable" :class="{ alert: errorMessage }">
              <div>
                <span class="ico-darco ico-xs"><em class="hidden">DRACO</em></span>
                <input v-model="stakeDraco" type="text" :placeholder="$t('w.stake.quantity')" @input="skateOnlyNum" />
              </div>
              <span v-if="entryFee > 0" class="add-draco">
                <em class="add">+</em><span class="ico-darco ico-xs add-inside">{{ entryFee }}</span>
                <em class="fee">(Entry fee)</em>
              </span>
              <div v-if="!md.mobile() && prevStake > 0" class="in-msg">
                <span>Previous Stake</span>
                <span class="ico-darco ico-xs add-inside">{{ prevStake | currency(0) }}</span>
              </div>
            </div>
            <div v-if="md.mobile() && prevStake > 0" class="in-msg">
              <span>Previous Stake</span>
              <span class="ico-darco ico-xs add-inside">{{ prevStake | currency(0) }}</span>
            </div>
          </div>
        </div>

        <div class="wrap-button">
          <button type="button" :disabled="errorMessage !== '' || loading" class="btn btn-primary" @click="stake">
            <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
            <template v-else>
              <template v-if="staking && not"> PRE-STAKE</template>
              <template v-else-if="ongoing && not">STAKE EARLIER</template>
              <template v-else-if="!not">STAKE MORE</template>
            </template>
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import RoundBodyTitle from '@/components/dsp/round/body/RoundBodyTitle';
import DspRoundNumber from '@/components/dsp/round/DspRoundNumber';
import { usePossibleMore, useTime } from '@/utils/composables/round';
import { STORAGE_KEY } from '@/constants/accounts';
import { dracoStorage } from '@/utils/baseUtil';

const { useState: useDspState, useMutations: useDspMutations, useGetters: useDspGetters, useActions: useDspActions } = createNamespacedHelpers('dsp');
const { useState: useAccountState, useMutations: useAccountMutations, useGetters: useAccountGetters } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalDspRound',
  components: { RoundBodyTitle, DspRoundNumber, CharacterClassThumb },
  setup(props, { root }) {
    const { $wemix, $store } = root;
    const timestamp = useTime();
    const loading = ref(false);
    const stakeDraco = ref('');
    const state = reactive({
      minStake: 10,
      entryFee: 1,
      errorMessage: '',
    });

    const { balance } = useState(['balance']);
    const { fetchBalance } = useActions(['fetchBalance']);
    const { setCommonModal } = useMutations(['setCommonModal']);

    const { represent } = useAccountState(['represent']);

    const { currentRound } = useDspGetters(['currentRound']);
    const { open } = useDspState(['open']);
    const { setOpen, setCurrentRound } = useDspMutations(['setOpen', 'setCurrentRound']);
    const { fetchRounds } = useDspActions(['fetchRounds']);

    const ongoing = computed(() => currentRound.value && currentRound.value.startDate < timestamp && timestamp < currentRound.value.endDate);
    const staking = computed(() => currentRound.value && currentRound.value.preStartDate < timestamp && timestamp < currentRound.value.startDate);

    const not = computed(
      () => currentRound.value && (!currentRound.value.myinfo || (currentRound.value.myinfo && currentRound.value.myinfo.prevStake === 0)),
    );
    const more = computed(
      () => currentRound.value && currentRound.value.myinfo && currentRound.value.myinfo.prevStake > 0 && currentRound.value.myinfo.prevStakeDT,
    );
    const possibleMore = currentRound.value && currentRound.value.myinfo && usePossibleMore(currentRound.value.myinfo.prevStakeDT);

    const prevStake = computed(() => {
      if (!currentRound.value || !currentRound.value.myinfo || !currentRound.value.myinfo.prevStake) {
        return 0;
      }

      return currentRound.value.myinfo.prevStake;
    });

    watch(
      () => currentRound.value,
      (cr) => {
        if (cr) {
          state.minStake = cr.minStageAmount;
          state.entryFee = cr.fee;

          if (cr.myinfo.prevStake) {
            state.entryFee = 0;
            state.minStake = cr.myinfo.prevStake + 1;
          }
        }
      },
    );

    const skateOnlyNum = () => {
      stakeDraco.value = stakeDraco.value.replace(/[^0-9]/g, '');
    };

    const validStakeDraco = () => {
      if (!stakeDraco.value) {
        state.errorMessage = 's.stake.message.info.input';
      } else if (balance.value.DRACO < Number(stakeDraco.value) + state.entryFee) {
        state.errorMessage = 's.rounds.event.message.not-enuogh-draco';
      } else if (Number(stakeDraco.value) < state.minStake) {
        state.errorMessage = 's.stake.message.alert.min-stake-draco';
      } else state.errorMessage = '';
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
       * - 60401 : 월렛 미연동
       * - 60402 : 라운드 조회 실패
       * - 60403 : 라운드 시간 오류
       * - 60404 : 스테이크 가능 시간 안지남
       * - 60405 : 스테이크 수량 오류
       * - 60406 : 스테이크 규칙 오류
       * - 60407 : 컨트랙트 입력 실패
       *
       * - 60411 : Send Error
       * - 60412 : Cache Error
       * - 60413 : TX Registration Error
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      const errorTitle = root.$t('t.dsp.stake.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60401:
          errorMessage = root.$t('s.rounds.event.message.not-linked');
          break;
        default:
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const stake = () => {
      if (state.errorMessage) {
        return;
      }

      if (loading.value) {
        return;
      }

      const to = '0x19b750c24a5f2112ffc7fa5d4dbe362b70f33c01'; // wemix().contractAddress("tornado","Mir4DSP")
      const draco = $wemix.token('DRACO').address || dracoStorage.get(STORAGE_KEY.DRACO_WALLET);
      console.log('draco', draco);
      loading.value = true;
      $wemix.makeUnsignedTx(49, 'tornado', to, draco, 0, 'stake', [`${currentRound.value.dspID}`, `${stakeDraco.value}`]).then((messages) => {
        $wemix
          .api
          .sendUnsignedTransaction(messages)
          .then((data) => {
            console.log(data);
            if (data.code !== 200) {
              showErrorModal(data);
              loading.value = false;
              return;
            }

            const hashes = data.data.hash;
            const messages = $wemix.transaction.requestSignature(hashes);
            loading.value = true;

            $store.dispatch('wemix/sendTransaction', {
              request: {
                ...messages
              },
              onSuccess: () => {
                loading.value = false;
                fetchBalance();
                fetchRounds();
                setOpen(false);
              }
            });
      })
          // $wemix.openQR(
          //   'sign',
          //   req,
          //   (success) => {
          //     loading.value = false;
          //     fetchBalance();
          //     fetchRounds();
          //     setOpen(false);
          //   },
          //   (fail, err) => {
          //     loading.value = false;
          //     showErrorModal(fail);
          //   },
          //   () => {
          //     loading.value = false;
          //   },
          // );
        })
        .catch((error) => {
          loading.value = false;
          showErrorModal(error);
        });
    };

    watch(
      () => open.value,
      (current) => {
        if (!current) {
          stakeDraco.value = '';
          state.minStake = 0;
          setCurrentRound(null);
          loading.value = false;
        } else if (currentRound.value && currentRound.value.myinfo && currentRound.value.myinfo.prevStake) {
          stakeDraco.value = currentRound.value.myinfo.prevStake + 1;
        }
      },
    );

    watch(
      () => stakeDraco.value,
      () => validStakeDraco(),
    );

    return {
      stakeDraco,
      skateOnlyNum,
      timestamp,
      balance,
      open,
      setOpen,
      currentRound,
      represent,
      stake,
      ...toRefs(state),
      prevStake,
      staking,
      ongoing,
      not,
      more,
      possibleMore,
      loading,
    };
  },
});
</script>
