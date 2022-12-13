<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-score import-character"
    :value="visible"
    :width="isDesktop ? '560px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="dialog-mirage-score__contents">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="$emit('close')" />
      <div v-if="item" class="dialog-mirage-score__info">
        <nft-card
          :item="{
            tokenID: item.TokenID,
            lv: item.CharacterLev,
            characterName: item.CharacterName,
            class: item.CharacterClass,
            powerScore: item.PowerScore,
            Reinforce: item.Reinforce,
            MiraX: item.MiraX,
          }"
          :size="isDesktop ? 'sm' : 'xs'"
        />
        <div class="dialog-mirage-score__info__score">
          <dl class="info-score">
            <dt>MIRAGE Score</dt>
            <dd>
              <span v-if="mirageScore" class="info-score__value">{{ mirageScore | currency(0) }}</span>
              <div class="info-score__mirax">
                <span>MiraX</span>
                <span class="value">{{ item.MiraX }}</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
      <div class="dialog-mirage-score__desc">
        <p>
          {{ $t('s.mirage.transfer.roster') }}
        </p>
      </div>
      <button type="button" class="btn btn-red-mirage" :disabled="loading" @click="getPrepare">
        <span class="single">{{ $t('w.mirage.transfer.roster') }}</span>
      </button>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';
import NftCard from '~/components/nft/NftCard';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalImportCharacter',
  components: { NftCard },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root, emit }) {
    const { $dracoWebApi, $wemix, $store } = root;
    const { isDesktop } = useState(['isDesktop']);
    const now = useNow({ interval: 1000 });
    const state = reactive({
      loading: false,
      address: '',
    });

    const { openLoading } = useMirageState(['openLoading']);
    const { setOpenLoading } = useMirageMutations(['setOpenLoading']);
    const { valleyCapture, accessToken, walletAddress } = useState(['valleyCapture', 'accessToken', 'walletAddress']);
    const { setCommonModal } = useMutations(['setCommonModal']);

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          state.loading = false;
          setOpenLoading(false);
        },
        onClose() {
          state.loading = false;
          setOpenLoading(false);
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      const { code: errorCode } = errorResponse;
      let errorTitle = root.$t('t.mirage.action.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = root.$t('t.mirage.action.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const messageSign = (nonce) => {
      const message = [
        { type: 'address', value: state.address },
        { type: 'uint256', value: `${props.item.TokenID}` },
        { type: 'address', value: walletAddress.value },
        { type: 'uint256', value: nonce },
        { type: 'string', value: 'unseal' },
      ];
      const messages = $wemix.transaction.requestMessageSignature([root.$t('w.mirage.transfer.roster')], ['yellow'], message);
      $store.dispatch('wemix/sendTransaction', {
        kind: 'mirage-unseal',
        request: {
          ...messages,
          payload: {
            TokenID: props.item.TokenID,
            nonce,
          }
        },
        onSuccess: (result) => {
          if (result.code === 200 && result.data.Result === 0) {
            setCommonModal({
              open: true,
              title: root.$t('t.mirage.action.success'),
              desc: root.$t('s.mirage.import.success'),
              primary: 'OK',
              onPrimary() {
                state.loading = false;
                setOpenLoading(false);
                emit('close');
              },
              onClose() {
                state.loading = false;
                setOpenLoading(false);
                emit('close');
              },
            });
          } else {
            showErrorModal(result);
          }
        }
      })
    };

    const getPrepare = () => {
      setOpenLoading(true);
      $dracoWebApi
        .get('/mirage/prepare', { params: { txType: 'unseal' } })
        .then(({ data }) => {
          if (data.code === 200) {
            messageSign(data.data.nonce);
          } else {
            showErrorModal();
          }
        })
        .catch(() => {
          showErrorModal();
        });
    };

    const getContractAddress = () => {
      $dracoWebApi
        .get('/exd/contractaddress', { params: { contractName: 'character' } })
        .then(({ data }) => {
          console.log(data);
          if (data.code !== 200 || !data.data.address) {
            showErrorModal({ code: data.code });
            return;
          }

          state.address = data.data.address;
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
          state.loading = false;
        });
    };

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      return nowDay.value.diff(endDay.value, 'minute');
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    const mirageScore = computed(() => {
      if (props.item && props.item.PowerScore) {
        const mirax = new BigNumber(props.item.MiraX || '0');
        const reinforce = new BigNumber(props.item.Reinforce || '0');
        return new BigNumber(props.item.PowerScore)
          .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
          .pow(2)
          .div(100000)
          .multipliedBy(reinforce.multipliedBy(0.02).plus(1))
          .toNumber();
      }

      return 0;
    });

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          getContractAddress();
        }
        if (!props.visible) {
          state.loading = false;
        }
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      getContractAddress,
      messageSign,
      getPrepare,
      closed,
      mirageScore,
    };
  },
});
</script>


