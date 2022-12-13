<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-smelting"
    :value="visibleMinting"
    :width="isDesktop ? '720px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="dialog-mirage-smelting__contents content">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close" />
      <div class="dialog-header">DRACO &amp; HYDRA</div>
      <v-tabs class="tabs" grow :value="mintingSymbolIdx">
        <v-tabs-slider />
        <v-tab :disabled="loading" @click="setMintingSymbolIdx(0)">{{ $t(`w.mirage.minting.0`) }}</v-tab>
        <v-tab :disabled="loading" @click="setMintingSymbolIdx(1)">{{ $t(`w.mirage.minting.1`) }}</v-tab>
        <v-tabs-items :value="mintingSymbolIdx">
          <v-tab-item>
            <div class="wrap-cost">
              <p class="wrap-cost__desc" v-html="$t('s.mirage.smelt.cost', [draco ? draco : 1])" />
              <p class="wrap-cost__amount">{{ (smeltingCost * Number(draco ? draco : '1')) | currency(0) }}</p>
            </div>
            <validation-provider ref="frmDraco" v-slot="{ errors }" :rules="{ required: true, between: [1, availableMaxDraco] }">
              <div class="wrap-input" :class="{ error: errors.length > 0 }">
                <div class="wrap-input__info">
                  <p class="wrap-input__desc">{{ $t('s.mirage.smelt.draco.input') }}</p>
                  <ul class="wrap-input__info__inventory">
                    <li>
                      Darksteels<span class="wrap-input__info__amount draco">{{ accountInfo.BlackIronAmount | currency(0) }}</span>
                    </li>
                  </ul>
                </div>
                <div class="field">
                  <div class="field__input">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/symbol-draco.webp" class="field__input__img" width="32" alt="draco" />
                    <v-text-field
                      v-model="draco"
                      class="input"
                      type="tel"
                      placeholder="0"
                      dense
                      solo
                      flat
                      :hide-details="true"
                      @keydown="inputDraco"
                      @keyup="inputDraco"
                    />
                    <div class="btn-wrap">
                      <img
                        v-if="draco.length > 0"
                        class="btn-wrap__clear"
                        src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/icon-clear.webp"
                        alt="clear"
                        @click="clearDraco"
                      />
                      <v-btn class="btn-wrap__max" light @click="setMaxDraco">{{ $t('w.hsp.main.un-stake.max') }}</v-btn>
                    </div>
                  </div>
                  <button type="button" class="btn btn-orange-mirage" :disabled="errors.length > 0" @click="allowance">
                    {{ $t('w.mirage.smelt.draco') }}
                  </button>
                </div>
              </div>
            </validation-provider>
          </v-tab-item>
          <v-tab-item>
            <div class="wrap-cost hydra">
              <p class="wrap-cost__desc" v-html="$t('s.mirage.define.hydra.cost', [hydra ? hydra : '1'])" />
              <span class="wrap-cost__stage">{{ $t('w.mirage.stage') }} {{ stage }}</span>
              <div class="wrap-amount">
                <span class="wrap-amount__draco">{{ (dracoFee * Number(hydra ? hydra : '1')) | currency(0) }}</span>
                <span class="wrap-amount__plus">+</span><span class="wrap-amount__septaria">{{ (stage * Number(hydra ? hydra : '1')) | currency(0) }}</span>
              </div>
            </div>
            <validation-provider class="hydra" ref="frmHydra" v-slot="{ errors }" :rules="{ required: true, between: [1, availableMaxHydra] }">
              <div class="wrap-input hydra" :class="{ error: errors.length > 0 }">
                <div class="wrap-input__info">
                  <p class="wrap-input__desc">{{ $t('s.mirage.refine.hydra.input') }}</p>
                  <ul class="wrap-input__info__inventory">
                    <li>
                      {{ $t('w.mirage.septaria') }}<span class="wrap-input__info__amount septaria">{{ accountInfo.SeptariaAmount | currency(0) }}</span>
                    </li>
                    <li>
                      {{ $t('w.rounds.draco.balance') }}<span v-if="balance" class="wrap-input__info__amount draco">{{ balance['DRACO'] | currency(0) }}</span>
                    </li>
                  </ul>
                </div>
                <div class="field">
                  <div class="field__input">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/symbol-hydra.webp" class="field__input__img" width="32" />
                    <v-text-field
                      v-model="hydra"
                      class="input"
                      type="tel"
                      placeholder="0"
                      dense
                      solo
                      flat
                      :hide-details="true"
                      @keydown="inputHydra"
                      @keyup="inputHydra"
                    />
                    <div class="btn-wrap">
                      <img
                        v-if="hydra.length > 0"
                        class="clear"
                        src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/icon-clear.webp"
                        alt="btn-wrap__clear"
                        @click="clearHydra"
                      />
                      <v-btn class="btn-wrap__max" light @click="setMaxHydra">{{ $t('w.hsp.main.un-stake.max') }}</v-btn>
                    </div>
                  </div>
                  <button type="button" class="btn btn-orange-mirage" :disabled="errors.length > 0" @click="allowance">
                    {{ $t('w.mirage.refine.hydra') }}
                  </button>
                </div>
              </div>
            </validation-provider>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers, useActions, useGetters, useMutations, useState } from 'vuex-composition-helpers/dist';
import { sumFee } from '@/utils/composables/mirage';

const {
  useState: useMirageState,
  useGetters: useMirageGetters,
  useMutations: useMirageMutations,
  useActions: useMirageActions,
} = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalMinting',
  setup(_, { root }) {
    const { $wemix, $dracoWebApi, $store } = root;
    const frmDraco = ref(null);
    const frmHydra = ref(null);

    const state = reactive({
      loading: false,
      draco: '',
      hydra: '',
      hash: '',
      address: '',
    });

    const { balance, derby, hydraSupply, walletAddress, isDesktop } = useState(['balance', 'derby', 'hydraSupply', 'walletAddress', 'isDesktop']);
    const { smeltingCost } = useGetters(['smeltingCost']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { fetchBalance } = useActions(['fetchBalance']);
    const { accountInfo, visibleMinting, mintingSymbolIdx } = useMirageState(['accountInfo', 'visibleMinting', 'mintingSymbolIdx']);
    const { setVisibleMinting, setMintingSymbolIdx, setOpenLoading } = useMirageMutations([
      'setVisibleMinting',
      'setMintingSymbolIdx',
      'setOpenLoading',
    ]);

    const { fetchAccountInfo } = useMirageActions(['fetchAccountInfo']);

    const availableMaxDraco = computed(() => {
      if (accountInfo.value) {
        return Math.floor(new BigNumber(accountInfo.value.BlackIronAmount).div(smeltingCost.value).toNumber());
      }

      return 0;
    });

    const stage = computed(() => {
      if (hydraSupply.value) {
        return Math.floor(Number(hydraSupply.value.HydraSupply) / 100000) + 1;
      }
      return 1;
    });

    const dracoFee = computed(() => {
      return Math.round(20 + sumFee(stage.value));
    });

    const availableMaxHydra = computed(() => {
      if (balance.value && accountInfo.value) {
        const maxByDraco = Math.floor(Number(balance.value.DRACO) / dracoFee.value);
        const maxBySeptaria = Math.floor(Number(accountInfo.value.SeptariaAmount) / stage.value);

        if (maxByDraco < maxBySeptaria) {
          return maxByDraco;
        }

        return maxBySeptaria;
      }

      return 0;
    });

    const inputDraco = (v) => {
      if (state.draco) {
        state.draco = state.draco.replace(/[^0-9]/g, '');
      }
    };

    const clearDraco = () => {
      state.draco = '';
    };

    const setMaxDraco = () => {
      state.draco = availableMaxDraco.value;
    };

    const inputHydra = (v) => {
      if (state.hydra) {
        state.hydra = state.hydra.replace(/[^0-9]/g, '');
      }
    };

    const clearHydra = () => {
      state.hydra = '';
    };

    const setMaxHydra = () => {
      state.hydra = availableMaxHydra.value;
    };

    const close = () => {
      setVisibleMinting(false);
      state.draco = '';
      state.hydra = '';
    };

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          state.loading = false;
        },
        onClose() {
          state.loading = false;
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t(`t.mirage.minting.${mintingSymbolIdx.value}.incomplete`);
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60820:
          errorMessage = root.$t('s.mirage.harvest.lockout.minting2');
          break;
        default:
          errorTitle = root.$t(`t.mirage.minting.${mintingSymbolIdx.value}.incomplete`);
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const messageSign = (nonce) => {
      const message = [];

      message.push({ type: 'address', value: state.address });
      message.push({ type: 'uint256', value: `${mintingSymbolIdx.value === 0 ? state.draco : state.hydra}000000000000000000` });
      if (mintingSymbolIdx.value === 1) {
        message.push({
          type: 'uint256',
          value: `${Math.round(sumFee(stage.value)) * Number(state.hydra)}000000000000000000`,
        });
      }
      message.push({ type: 'address', value: walletAddress.value });
      message.push({ type: 'uint256', value: `${nonce}` });

      if (mintingSymbolIdx.value === 0) {
        message.push({
          type: 'string',
          value: 'exchangeToToken',
        });
      }

      console.log(message);
      const messages = $wemix.transaction.requestMessageSignature(
        [mintingSymbolIdx.value === 0 ? root.$t('w.mirage.smelt.draco') : root.$t('w.mirage.refine.hydra')],
        ['yellow'],
        message,
      );

      $store.dispatch('wemix/sendTransaction', {
        kind: `mirage-${mintingSymbolIdx.value === 0 ? 'draco' : 'hydra'}`,
        request: {
          ...messages,
          payload: {
            token: mintingSymbolIdx.value === 0 ? 'draco' : 'hydra',
            amount: `${mintingSymbolIdx.value === 0 ? state.draco : state.hydra}`,
            nonce,
          }
        },
        onSuccess: (result) => {
          if (result.code === 200 && result.data.Result === 0) {
            setCommonModal({
              open: true,
              title: root.$t(`t.mirage.minting.${mintingSymbolIdx.value}.complete`),
              desc: root.$t(`s.mirage.minting.${mintingSymbolIdx.value}.complete`),
              primary: 'OK',
              onPrimary() {
                state.loading = false;
                setVisibleMinting(false);
                setOpenLoading(false);
              },
              onClose() {
                state.loading = false;
                setVisibleMinting(false);
                setOpenLoading(false);
              },
            });

            fetchAccountInfo();
            fetchBalance();
          } else {
            showErrorModal(result);
            state.loading = false;
          }
        }
      });

    };

    const getPrepare = () => {
      $dracoWebApi.get('/mirage/prepare', { params: { txType: mintingSymbolIdx.value === 0 ? 'draco' : 'hydra' } }).then(({ data }) => {
        if (data.code === 200) {
          messageSign(data.data.nonce);
        }
      });
    };

    const getContractAddress = () => {
      $dracoWebApi
        .get('/exd/contractaddress', { params: { contractName: mintingSymbolIdx.value === 0 ? 'draco' : 'hydra' } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.address = data.data.address;
          } else {
            state.address = null;
          }
        })
        .catch((e) => {
          state.address = null;
        })
        .finally(() => {});
    };

    const makeUnsignedTx = () => {
      const messages = $wemix.transaction.requestSignatureWithMemo([root.$t(`w.mirage.minting.${mintingSymbolIdx.value}`)], ['yellow'], state.hash);
      $store.dispatch('wemix/sendTransaction', {
        kind: `mirage-${mintingSymbolIdx.value === 0 ? 'draco' : 'hydra'}`,
        request: messages,
        onSuccess: () => getPrepare(),
      });
    };

    const getApprove = () => {
      $dracoWebApi
        .get('/mirage/approve', { params: { token: mintingSymbolIdx.value === 0 ? 'draco' : 'hydra' } })
        .then(({ data }) => {
          if (data.code !== 200 || (data.data.Result && data.data.Result !== 0)) {
            showErrorModal(data);
            return;
          }

          state.hash = data.data.hash;
          makeUnsignedTx();
        })
        .catch((e) => {
          state.loading = false;
          setOpenLoading(false);
          showErrorModal({ code: 500 });
        });
    };

    const allowance = async () => {
      if (mintingSymbolIdx.value === 0) {
        const { errors } = await frmDraco.value.validate();

        if (errors.length > 0) {
          return;
        }
      } else {
        const { errors } = await frmHydra.value.validate();

        if (errors.length > 0) {
          return;
        }
      }

      setOpenLoading(true);

      state.loading = true;
      $dracoWebApi
        .get('/mirage/allowance', {
          params: { token: mintingSymbolIdx.value === 0 ? 'draco' : 'hydra', amount: mintingSymbolIdx.value === 0 ? state.draco : state.hydra },
        })
        .then(({ data }) => {
          if (data.code !== 200 || !data.data || data.data.isAllowance === undefined) {
            showErrorModal(data);
            return;
          }

          if (data.data.isAllowance === 0) {
            // messageSign();
            getApprove();
          } else if (data.data.isAllowance === 1) {
            getPrepare();
          }
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          state.loading = false;
        });
    };

    watch(
      () => visibleMinting.value,
      () => {
        if (visibleMinting.value) {
          getContractAddress();
        }
        if (!visibleMinting.value) {
          clearDraco();
          clearHydra();
        }
      },
    );

    watch(
      () => mintingSymbolIdx.value,
      () => {
        getContractAddress();
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      frmDraco,
      frmHydra,
      balance,
      accountInfo,
      stage,
      dracoFee,
      availableMaxDraco,
      availableMaxHydra,
      visibleMinting,
      mintingSymbolIdx,
      setMintingSymbolIdx,
      smeltingCost,
      close,
      inputDraco,
      clearDraco,
      setMaxDraco,
      inputHydra,
      clearHydra,
      setMaxHydra,
      allowance,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.wemix.modal.open;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
  watch: {
    isOpen(open) {
      if (!open) {
        this.$store.commit('mirage/setOpenLoading', false);
        this.loading = false;
      }
    },
  },
});
</script>
