<template>
  <v-dialog
    v-model="openExchange"
    content-class="dialog-item-buy bg-point"
    persistent
    :retain-focus="false"
    style="z-index: 290"
    :max-width="isDesktop ? '640px' : '100%'"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div v-if="exchangeItem" class="dialog-item-buy__contents">
      <v-btn class="btn-close" fab plain x-small @click="setOpenExchange(false)">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>

      <div class="wrap-item">
        <h3 class="wrap-item__title">{{ $t('t.exd.purchase.item', [`'${exchangeItem.item.itemName}'`]) }}</h3>
        <item-card :item="exchangeItem.item" :collectible="!!exchangeItem.item.uniqueNo" :size="isDesktop ? '' : 'sm'"/>
        <div class="wrap-item__price">
          <strong class="ico-hydra ico-ss add-inside">{{ exchangeItem.price | currency(2) }}</strong>
          <small v-if="price">$ {{
              (Number(exchangeItem.price) * Number(hydraPrice && hydraPrice.USDHydraRate)) | currency(2)
            }}</small>
        </div>
        <p class="wrap-item__desc">{{ $t('s.exd.purchase.item', [exchangeItem.price]) }}</p>
      </div>

      <button type="button" class="btn btn-primary2" :disabled="winLoading" @click="allowance">{{ $t('w.exd.purchase') }}</button>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api';
import { ethers } from 'ethers';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';
import ItemCard from '@/components/common/item/ItemCard';

const { useState: useExdState, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState, useMutations: useHspMutations } = createNamespacedHelpers('hsp');
const {
  useState: useAccountState,
  useGetters: useAccountGetters,
  useMutations: useAccountMutations,
  useActions: useAccountActions,
} = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalExchange',
  components: { ItemCard },
  setup(props, { root }) {
    const { $wemix, $dracoWebApi, $router, $i18n, $store } = root;
    const winLoading = ref(false);
    const step = ref(0);
    const selectedCharacterUID = ref(null);
    const hash = ref(null);

    const {
      loading: accountLoading,
      exist,
      worldNames,
      selectedWorldName,
    } = useAccountState(['loading', 'exist', 'worldNames', 'selectedWorldName']);
    const { characters } = useAccountGetters(['characters']);
    const { setSelectedWorldName } = useAccountMutations(['setSelectedWorldName']);
    const { fetchUserCharacter, fetchChannelUserCharacter } = useAccountActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);

    const { walletAddress, isDesktop } = useState(['walletAddress', 'isDesktop']);
    const { openExchange, exchangeItem, price } = useExdState(['openExchange', 'exchangeItem', 'price']);
    const { price: hydraPrice } = useHspState(['price']);
    const { setOpenExchange } = useExdMutations(['setOpenExchange']);

    const { setCommonModal } = useMutations(['setCommonModal']);

    watch(
      () => openExchange.value,
      () => {
        if (!openExchange.value) {
          step.value = -1;
        } else {
          step.value = 0;
          hash.value = null;
          selectedCharacterUID.value = null;
          winLoading.value = false;
          fetchUserCharacter();
        }
      },
    );

    const alertModal = (title, desc) => {
      if (openExchange.value) {
        setOpenExchange(false);
      }

      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          $router.replace('/exd/list');
        },
        onClose() {
          $router.replace('/exd/list');
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      /**
       * errorCode
       * - 500 : Network Error
       * - 60617 : Sold Out
       * - 60618 : In-progress
       *
       * - 60621 : DB Error
       */
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t('t.exd.purchase.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        case 60606:
        case 60609:
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

    const setSelectedCharacterUID = (id) => {
      selectedCharacterUID.value = id;
    };

    const selectCharacter = () => {
      if (!selectedCharacterUID.value) {
        return;
      }

      winLoading.value = true;
      $dracoWebApi
        .get('/exd/tradable', { params: { tradeUID: exchangeItem.value.tradeUID } })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal(data);
            return;
          }

          const { itemCount, tradable } = data.data;

          if (itemCount >= 30) {
            showErrorModal({ code: 60609 });
            return;
          }

          if (tradable === 0) {
            showErrorModal({ code: 60609 });
            return;
          }

          if (tradable === 2) {
            showErrorModal({ code: 60618 });
            return;
          }

          if (tradable === 3) {
            showErrorModal({ code: 60617 });
            return;
          }

          step.value = 1;
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          winLoading.value = false;
        });
    };

    const sub32Bytes = (str) => {
      let buffer = 0;
      let idx = 0;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const unicode = str.charCodeAt(idx);
        buffer += unicode > 127 ? 2 : 1;

        if (buffer > 31) break;
        idx += 1;
      }
      return str.substring(0, idx);
    };

    const messageSign = (address) => {
      const message = [
        { type: 'address', value: address },
        { type: 'address', value: walletAddress.value },
        { type: 'uint256', value: `${exchangeItem.value.tradeUID}` },
        { type: 'bytes32', value: `${ethers.utils.formatBytes32String(sub32Bytes(exchangeItem.value.item.itemName))}` },
        { type: 'uint256', value: `${exchangeItem.value.price}0000000000000000`.replaceAll('.', '') }, // FIXME : 소수점 확인 필요
      ];
      const messages = $wemix.transaction.requestMessageSignature([root.$t('s.exd.message-sign.message')], ['yellow'], message);
      $store.dispatch('wemix/sendTransaction', {
        kind: 'exd',
        request: {
          ...messages,
          payload: {
            tradeUID: exchangeItem.value.tradeUID,
            itemName32: `${ethers.utils.formatBytes32String(sub32Bytes(exchangeItem.value.item.itemName))}`,
          },
        },
        onSuccess: (result) => {
          if (result.code === 200 && result.data.Result === 0) {
            setCommonModal({
              open: true,
              title: root.$t('s.exd.purchase.complete'),
              desc: root.$t('s.exd.purchase.complete.desc'),
              primary: 'OK',
              onPrimary() {
                setOpenExchange(false);
                $router.push('/inventory');
              },
              onClose() {
                setOpenExchange(false);
                $router.push('/inventory');
              },
            });
          } else {
            showErrorModal(result);
          }
        },
      });
    };

    const getContractAddress = () => {
      winLoading.value = true;
      $dracoWebApi
        .get('/exd/contractaddress', { params: { contractName: 'xhydra' } })
        .then(({ data }) => {
          console.log('get contract address', data);
          if (data.code !== 200 || !data.data.address) {
            console.log('result errror');
            showErrorModal();
            return;
          }

          messageSign(data.data.address);
        })
        .catch(() => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          winLoading.value = false;
        });
    };

    const makeUnsignedTx = () => {
      const locale = $i18n.locale;
      winLoading.value = true;
      const messages = $wemix.transaction.requestSignatureWithMemo([root.$t('s.exd.approve-sign.message')], ['yellow'], hash.value);
      $store.dispatch('wemix/sendTransaction',
        {
          kind: 'exd',
          request: {
            ...messages,
            payload: {
              tradeUID: exchangeItem.value.tradeUID,
              characterUID: selectedCharacterUID.value,
              languageCode: locale,
            },
          },
          onSuccess: () => getContractAddress(),
        });
    };

    const getApprovedSign = () => {
      winLoading.value = true;
      $dracoWebApi
        .get('/exd/approvedSign', { params: { price: exchangeItem.value.price } })
        .then(({ data }) => {
          console.log('approved sign', data);
          if (data.code !== 200 || (data.data.Result && data.data.Result !== 0)) {
            showErrorModal(data);
            return;
          }

          hash.value = data.data.hash;
          makeUnsignedTx();
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          winLoading.value = false;
        });
    };

    const allowance = () => {
      winLoading.value = true;
      $dracoWebApi
        .get('/exd/allowance', { params: { price: exchangeItem.value.price } })
        .then(({ data }) => {
          if (data.code !== 200 || !data.data || data.data.isAllowance === undefined) {
            showErrorModal(data);
            return;
          }

          if (data.data.isAllowance === 0) {
            getApprovedSign();
          } else if (data.data.isAllowance === 1) {
            getContractAddress();
          }
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        })
        .finally(() => {
          winLoading.value = false;
        });
    };

    return {
      isDesktop,
      openExchange,
      setOpenExchange,
      exchangeItem,
      walletAddress,
      price,
      hydraPrice,
      step,
      accountLoading,
      worldNames,
      selectedWorldName,
      characters,
      setSelectedWorldName,
      fetchChannelUserCharacter,
      selectedCharacterUID,
      selectCharacter,
      setSelectedCharacterUID,
      winLoading,
      allowance,
      exist,
    };
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/pages/popup-exchange';
</style>
