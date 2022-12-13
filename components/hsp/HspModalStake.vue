<template>
  <v-dialog
    :value="open"
    content-class="dialog-hsp"
    scrollable
    persistent
    :max-width="isDesktop ? '900px' : '100%'"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <v-card class="dialog-contents" tile dark>
      <v-card-title class="title">
        <h2>{{ $t(Number(my.stakeAmount) > 0 ? 't.playbook.section5.stakemore' : 't.hsp.main.dialog.stake') }}</h2>
        <v-spacer />

        <v-btn class="close" fab icon @click="close">
          <img src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/icon-close-white.webp" alt="close" />
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text v-if="Number(my.stakeAmount) > 0" class="additional">
        <div v-show="false" class="additional-info-title added">{{ $t('w.hsp.main.add-stake') }}</div>

        <div v-show="false" class="additinal-info">
          <div>
            <span class="dot">·</span>
            <span v-html="$t('s.hsp.main.add-stake')"></span>
          </div>
          <div>
            <span class="dot">·</span>
            <span>{{ $t('s.hsp.main.add-stake2') }}</span>
          </div>
        </div>

        <div class="box-wrapper">
          <div class="additinal-stake-box">
            <h3>{{ $t('t.hsp.currently.hydra') }}</h3>

            <div class="box-contents">
              <span class="box">
                <img class="hydra-icon" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/img-icon-hydra-gold.webp" alt="hydra" />

                <v-tooltip content-class="hydra-tooltip price" :open-on-click="!isDesktop" :open-on-hover="!isDesktop" top>
                  <template #activator="{ on, attrs }">
                    <span class="count" v-bind="attrs" v-on="on">
                      {{ viewMyStake }}<em>{{ viewMyStakePoint }}</em>
                    </span>
                  </template>

                  <template class="tooltip-content">
                    <span v-html="my.stakeAmount"></span>
                    <span> HYD</span>
                  </template>
                </v-tooltip>
              </span>
            </div>
            <p v-if="my && price" class="usd">$ {{ (Number(my.stakeAmount) * Number(price.USDHydraRate)) | currency(2) }}</p>
          </div>

          <div class="additinal-stake-box">
            <h3>{{ $t('t.hsp.additional.stake') }}</h3>

            <div class="box-contents">
              <span class="box">
                <span style="margin-right: 2px; font-weight: bold">+</span>
                <img class="hydra-icon" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/img-icon-hydra-gold.webp" alt="hydra" />

                <v-tooltip content-class="hydra-tooltip price" :open-on-click="!isDesktop" :open-on-hover="isDesktop" top>
                  <template #activator="{ on, attrs }">
                    <span class="count" v-bind="attrs" v-on="on">
                      {{ (stake.split('.')[0] || '0') | currency(0) }}<em v-if="stake.split('.').length > 1">.{{ stake.split('.')[1] }}</em>
                    </span>
                  </template>

                  <template class="tooltip-content">
                    <span v-html="stake"></span>
                    <span> HYD</span>
                  </template>
                </v-tooltip>

                <v-btn v-show="false" width="24" height="24" fab icon :disabled="loadingMy" @click="fetchMy">
                  <img :class="{ on: loadingMy }" class="icon-refresh" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/ico-refresh.webp" />
                </v-btn>
              </span>
            </div>
            <p class="usd">
              <template v-if="stake">$ {{ (Number(stake) * Number(price.USDHydraRate)) | currency(2) }}</template>
              <template v-else>&nbsp;</template>
            </p>
          </div>
        </div>
      </v-card-text>

      <v-divider />

      <validation-provider
        v-if="balance"
        ref="form"
        v-slot="{ errors, failedRules }"
        :rules="{ required: true, decimal4: true, between: [0.0001, Number(balance ? balance['HYDRA'] : 0)] }"
      >
        <v-card-actions class="actions">
          <div class="hydra-label" :class="{ error: errors.length }">
            <div class="input-header">
              <v-tooltip v-if="isDesktop" content-class="hydra-tooltip" :open-on-click="!isDesktop" :open-on-hover="isDesktop" top>
                <template #activator="{ on, attrs }">
                  <v-btn v-bind="attrs" class="btn-info" icon x-small v-on="on">
                    <img src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/ico-info.webp" />
                  </v-btn>
                </template>

                <span class="tooltip-content">
                  <span>·</span>
                  <span>{{ $t('s.hsp.main.add-stake.info') }}</span>
                </span>
              </v-tooltip>

              <span class="input-message">
                <template v-if="failedRules.hasOwnProperty('required')">{{ $t('s.hsp.main.input-stake') }}</template>
                <template v-else-if="failedRules.hasOwnProperty('between')">{{ $t('s.hsp.main.input-stake.lack') }}</template>
                <template v-else-if="failedRules.hasOwnProperty('decimal4')">{{ $t('s.hsp.main.add-stake.info') }}</template>
                <template v-else>{{ $t('s.hsp.main.input-stake') }}</template>
              </span>

              <v-spacer></v-spacer>

              <v-tooltip v-if="!isDesktop" content-class="hydra-tooltip" :open-on-click="!isDesktop" :open-on-hover="isDesktop" top>
                <template #activator="{ on, attrs }">
                  <button v-bind="attrs" class="btn-info" v-on="on">
                    <img src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/ico-info.webp" />
                  </button>
                </template>

                <span class="tooltip-content">
                  <span>·</span>
                  <span>{{ $t('s.hsp.main.add-stake.info') }}</span>
                </span>
              </v-tooltip>
            </div>

            <v-spacer />

            <div class="options">
              <div class="amount-wrapper">
                <div class="amount-label">{{ $t('w.hsp.main.add-stake.balance') }}</div>
                <div class="amount">{{ balance['HYDRA'] | currency(4) }} HYD</div>
              </div>

              <v-spacer />

              <v-btn v-if="!isDesktop" class="max" light @click="setMax">{{ $t('w.hsp.main.un-stake.max') }}</v-btn>
              <v-btn v-if="!isDesktop" class="all-decimal text-capitalize" light @click="setAllDecimal">{{ $t('w.hsp.main.stake.all-decimal') }}</v-btn>
            </div>
          </div>

          <div class="hydra-input" :class="{ error: errors.length > 0 }">
            <img class="hydra-icon" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/img-icon-hydra-gold.webp" alt="hydra" />
            <v-text-field
              ref="stakeRef"
              v-model="stake"
              class="input"
              type="tel"
              placeholder=""
              dense
              solo
              flat
              :hide-details="true"
              @keydown="inputStake"
              @keyup="inputStake"
            />
            <img v-if="stake" class="clear" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/icon-clear.webp" alt="clear" @click="clearStake" />

            <v-btn class="max" light @click="setMax">{{ $t('w.hsp.main.un-stake.max') }}</v-btn>
            <v-btn class="text-capitalize" light @click="setAllDecimal">{{ $t('w.hsp.main.stake.all-decimal') }}</v-btn>
          </div>
          <button
            type="button"
            class="btn-stake"
            :class="{ error: errors.length > 0 }"
            :disabled="loadingMy || loading || errors.length > 0"
            @click="postStake"
          >
            {{ $t('t.hsp.main.dialog.stake') }}
          </button>
        </v-card-actions>
      </validation-provider>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { currency } from '@/utils/filters/numeric';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'HspModalStake',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    prevStake: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { root, emit }) {
    const { $dracoWebApi, $wemix, $store } = root;
    const form = ref(null);
    const stakeRef = ref(null);
    const { balance, isDesktop } = useState(['balance', 'isDesktop']);
    const state = reactive({
      stake: '',
      loading: false,
    });
    const { my, loadingMy, price } = useHspState(['my', 'loadingMy', 'price']);
    const { fetchMy } = useHspActions(['fetchMy']);

    const close = () => {
      emit('onClose');
      state.stake = '';
      if (form.value) {
        form.value.reset();
      }
    };

    const inputStake = (v) => {
      if (state.stake) {
        state.stake = state.stake.replace(/[^0-9.]/g, '');
      }
    };

    const clearStake = () => {
      state.stake = '';
    };

    const setMax = () => {
      state.stake = balance.value ? `${Math.floor(Number(balance.value.HYDRA) * 10000) / 10000}` : '';
    };

    const setAllDecimal = () => {
      if (balance.value && balance.value.HYDRA) {
        const b = balance.value.HYDRA.toString().split('.');

        if (b.length > 1) {
          state.stake = `${Number(state.stake.split('.')[0])}.${b[1].slice(0, 4)}`;
        }
      }
    };

    const postStake = async () => {
      if (state.loading) {
        return;
      }

      const { errors } = await form.value.validate();

      if (errors.length > 0) {
        return;
      }

      state.loading = true;

      $dracoWebApi
        .post('/hsp/prepare', {
          type: 'stake',
          args: [Number(state.stake)],
        })
        .then(({ data }) => {
          console.log('hsp prepare result', data);
          if (data.code !== 200) {
            // showErrorModal(data);
            state.loading = false;
            return;
          }

          const hashes = data.data.hash;
          const messages = $wemix.transaction.requestSignature(hashes);
          console.log('messages', hashes, messages);
          state.loading = true;
          emit('onStart', 'stake');
          $store.dispatch('wemix/sendTransaction', {
            kind: 'hsp',
            request: messages,
            onSuccess: (result) => {
              console.log('result', result);
              if (result.code === 200 && result.data.Result === 0) {
                emit('onEnd', 'stake');
                close();
              } else {
                emit('onEnd', 'stake', result.code);
              }
              state.loading = false;
            },
          });
        })
        .catch((e) => {
          emit('onEnd', 'stake', 110);
          state.loading = false;
          console.log(e);
        });
    };

    const viewMyStake = computed(() => {
      return my.value.stakeAmount ? currency(my.value.stakeAmount.split('.')[0], 0) : '--';
    });

    const viewMyStakePoint = computed(() => {
      if (my.value.stakeAmount && my.value.stakeAmount.split('.').length > 1) {
        if (Number(my.value.stakeAmount.split('.')[1])) {
          return `.${my.value.stakeAmount.split('.')[1]}`;
        }
      }
      return '';
    });

    const viewMyReward = computed(() => {
      return my.value.claimAmount ? currency(my.value.claimAmount.split('.')[0], 0) : '--';
    });

    const viewMyRewardPoint = computed(() => {
      return my.value.claimAmount && my.value.claimAmount.split('.').length > 1 ? `.${my.value.claimAmount.split('.')[1]}` : '';
    });

    watch(
      () => props.open,
      (current, before) => {
        if (current && !before) {
          fetchMy();
          if (form.value) {
            form.value.validate();
          }

          root.$nextTick(() => {
            setTimeout(() => {
              if (stakeRef.value) {
                stakeRef.value.$refs.input.focus();
              }
            }, 100);
          });
        }
      },
    );

    return {
      isDesktop,
      form,
      ...toRefs(state),
      balance,
      close,
      inputStake,
      clearStake,
      postStake,
      my,
      price,
      loadingMy,
      fetchMy,
      setMax,
      setAllDecimal,
      viewMyStake,
      viewMyStakePoint,
      viewMyReward,
      viewMyRewardPoint,
      emit,
      stakeRef,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.wemix.modal.open;
    },
  },
  watch: {
    isOpen(open) {
      if (!open) {
        this.$emit('onCancel');
        this.loading = false;
      }
    },
  },
});
</script>
