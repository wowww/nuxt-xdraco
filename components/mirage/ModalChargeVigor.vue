<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-charge"
    :value="visibleChargeVigor"
    :width="isDesktop ? '640px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="dialog-mirage-charge__contents">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleChargeVigor(false)" />
      <div class="dialog-header">{{ $t('w.mirage.charge.vigor') }}</div>
      <div class="dialog-mirage-charge__info">
        <div v-if="accountInfo" class="inventory">
          <div class="inventory__item">
            {{ $t('w.mirage.vigor') }}<span class="inventory__item__amount">{{ accountInfo.VigorAmount | currency(0) }}</span>
          </div>
          <div class="inventory__item">
            {{
              $t('w.rounds.wallet.balance.hydra')
            }}<span class="hydra"
          >{{ formattedHydra[0] }}<em v-if="formattedHydra[1]">{{ formattedHydra[1] }}</em></span
          >
          </div>
        </div>
        <ul class="dialog-mirage-charge__list">
          <li class="vigor--small">
            <p>{{ $t('w.mirage.vigor.10') }}</p>
            <button type="button" class="btn btn-red-mirage" :disabled="loading || balanceLoading" @click="allowance('2')">
              <span class="buy">1</span>
            </button>
          </li>
          <li class="vigor--medium">
            <p>{{ $t('w.mirage.vigor.33') }}</p>
            <button type="button" class="btn btn-red-mirage" :disabled="loading || balanceLoading" @click="allowance('3')">
              <span class="buy">3</span>
            </button>
          </li>
          <li class="vigor--large">
            <p>{{ $t('w.mirage.vigor.60') }}</p>
            <button type="button" class="btn btn-red-mirage" :disabled="loading || balanceLoading" @click="allowance('4')">
              <span class="buy">5</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import { useFormattedRefNumber } from '@/utils/composables/common';

const { useState: useMirageState, useMutations: useMirageMutations, useActions: useMirageActions } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalChargeVigor',
  setup(_, { root }) {
    const { $dracoWebApi, $wemix, $store } = root;
    const state = reactive({
      loading: false,
      address: '',
      selectedPrice: 1,
      hash: '',
      products: [],
      productId: '',
    });
    const { accessToken, balance, walletAddress, balanceLoading, isDesktop } = useState([
      'accessToken',
      'balance',
      'walletAddress',
      'balanceLoading',
      'isDesktop',
    ]);

    const { fetchBalance } = useActions(['fetchBalance']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { visibleChargeVigor, accountInfo } = useMirageState(['visibleChargeVigor', 'accountInfo']);
    const { setVisibleChargeVigor, setOpenLoading } = useMirageMutations(['setVisibleChargeVigor', 'setOpenLoading']);
    const { fetchAccountInfo } = useMirageActions(['fetchAccountInfo']);

    const formattedHydra = useFormattedRefNumber(balance, 'HYDRA', 4);

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          // setVisibleChargeVigor(false);
        },
        onClose() {
          // setVisibleChargeVigor(false);
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      console.log(errorResponse);
      /**
       * errorCode
       * - 500 : Network Error
       * - 60617 : Sold Out
       * - 60618 : In-progress
       *
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      let errorTitle = 'Vigor charge was unsuccessful';
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60606:
          errorMessage = root.$t('s.exd.purchase.choose.character.not-enough.inventory');
          break;
        case 60617:
          errorTitle = root.$t('t.exd.purchase.sold-out');
          errorMessage = root.$t('s.exd.purchase.sold-out');
          break;
        case 60618:
          errorTitle = root.$t('t.exd.purchase.processing');
          errorMessage = root.$t('s.exd.purchase.processing');
          break;
        default:
          errorTitle = root.$t('t.exd.purchase.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const messageSign = (ticketId) => {
      const product = state.products.find((item) => item.ProductID === state.productId);

      const message = [
        { type: 'address', value: state.address },
        { type: 'address', value: walletAddress.value },
        { type: 'uint256', value: `${ticketId}` },
        { type: 'uint256', value: `${product.ProductPrice}000000000000000000` },
      ];
      const messages = $wemix.transaction.requestMessageSignature([root.$t('w.mirage.charge.vigor')], ['yellow'], message);
      $store.dispatch('wemix/sendTransaction', {
        kind: 'mirage-energy',
        request: {
          ...messages,
          payload: {
            TicketID: ticketId,
            ProductID: state.productId,
          },
        },
        onSuccess: (response) => {
          if (response.code === 200 && response.data.Result === 0) {
            setCommonModal({
              open: true,
              title: root.$t('t.mirage.action.success'),
              desc: root.$t('s.mirage.charge.vigor.success'),
              primary: 'OK',
              onPrimary() {
                setVisibleChargeVigor(false);
                setOpenLoading(false);
              },
              onClose() {
                setVisibleChargeVigor(false);
                setOpenLoading(false);
              },
            });

            setTimeout(() => {
              fetchAccountInfo();
            }, 1000);
          } else {
            showErrorModal(response);
          }
        },
      });
    };

    const fetchEnergyPrepare = () => {
      if (!accessToken.value) {
        return;
      }

      root.$dracoWebApi.get('/mirage/energyprepare', { params: { contractName: 'mirage' } }).then(({ data }) => {
        if (data.code === 200) {
          messageSign(data.data.TicketID);
        }
      });
    };

    const getContractAddress = () => {
      if (!accessToken.value) {
        return;
      }

      root.$dracoWebApi.get('/exd/contractaddress', { params: { contractName: 'mirage' } }).then(({ data }) => {
        if (data.code === 200) {
          state.address = data.data.address;
        }
      });
    };

    const makeUnsignedTx = () => {
      const messages = $wemix.transaction.requestSignatureWithMemo([root.$t('s.exd.approve-sign.message')], ['yellow'], state.hash);
      $store.dispatch('wemix/sendTransaction', {
        kind: 'mirage-energy',
        request: messages,
        onSuccess: fetchEnergyPrepare,
      });
    };

    const getApprovedSign = () => {
      $dracoWebApi
        .get('/mirage/approve', { params: { token: 'hydra' } })
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
          showErrorModal({ code: 500 });
        });
    };

    const allowance = (productId) => {
      state.loading = true;
      state.productId = productId;

      const product = state.products.find((item) => item.ProductID == state.productId);

      if (product) {
        if (balance.value.HYDRA < Number(product.ProductPrice)) {
          alertModal(root.$t('t.exd.purchase.draco.not-enough'), root.$t('s.exd.purchase.draco.not-enough'));
          return;
        }
        setOpenLoading(true);
        $dracoWebApi
          .get('/mirage/allowance', { params: { token: 'hydra', amount: product.ProductPrice } })
          .then(({ data }) => {
            if (data.code !== 200 || !data.data || data.data.isAllowance === undefined) {
              showErrorModal(data);
              return;
            }

            if (data.data.isAllowance === 0) {
              getApprovedSign();
            } else if (data.data.isAllowance === 1) {
              fetchEnergyPrepare();
            }
          })
          .catch((e) => {
            state.loading = false;
            showErrorModal({ code: 500 });
          });
      }
    };

    const fetchEnergy = () => {
      $dracoWebApi
        .get('/mirage/meta/energy')
        .then(({ data }) => {
          if (data.code === 200) {
            state.products = data.data;
          } else {
            state.products = [];
          }
        })
        .catch(() => {
          state.products = [];
        });
    };

    watch(
      () => visibleChargeVigor.value,
      () => {
        if (visibleChargeVigor.value) {
          fetchEnergy();
          getContractAddress();
        } else {
          state.productId = '';
          state.loading = false;
          state.hash = '';
        }

        fetchBalance();
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      visibleChargeVigor,
      setVisibleChargeVigor,
      balance,
      balanceLoading,
      formattedHydra,
      allowance,
      accountInfo,
    };
  },
  watch: {
    wemixModalOpen(open) {
      if (!open) {
        this.loading = false;
        this.$store.commit('mirage/setOpenLoading', false);
      }
    },
  },
  computed: {
    wemixModalOpen() {
      return this.$store.state.wemix.modal.open;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
