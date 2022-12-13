<template>
  <v-dialog
    :value="visibleModalSeal"
    content-class="dialog-mirage dialog-mirage-seal"
    scrollable
    persistent
    :max-width="isDesktop ? '720px' : '100%'"
    :transition="!isDesktop? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div class="seal">
      <div class="seal__header">
        <v-btn class="btn-close modal__close--button" fab plain x-small @click="closeModal"/>
        <h2 class="seal__title dialog-header">{{ $t('t.mirage.my.seal') }}</h2>
      </div>

      <div class="seal__description">
        <span class="seal--thumb-item">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-64-mirage-scroll.webp" alt="" />
          <span class="seal--thumb-item-amount">x {{ scrollInfo && scrollInfo.ScrollAmount || '0' }}</span>
        </span>
        <h3 class="seal__description-title">{{ $t('w.mirage.my.scroll') }}</h3>
        <p class="seal__description-message">
          {{ $t('s.mirage.my.seal.desc') }}
        </p>
      </div>

      <validation-provider
        ref="form"
        v-slot="{ errors, failedRules }"
        :rules="{ required: true, between: [1, Number(computedSeal ? computedSeal : 0)] }"
      >
        <div class="seal--full" :class="{ error: errors.length > 0 }">
          <div class="seal__charge input-top">
            <span v-if="failedRules.hasOwnProperty('required')" class="seal__charge-message">{{ $t('s.mirage.my.seal.message') }}</span>
            <span v-else-if="failedRules.hasOwnProperty('between')" class="seal__charge-message--error">
              {{ !isDesktop ? $t('s.mirage.my.seal.mobile.message.error') : $t('s.mirage.my.seal.desktop.message.error')}}
            </span>
            <span v-else class="seal__charge-message">{{ $t('s.mirage.my.seal.message') }}</span>
            <div class="seal__charge-info">
              <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-energy.webp" width="20" height="20" alt="energy" />
              <p class="seal__charge-info__quantity">{{ scrollInfo && scrollInfo.VigorAmount || '0' }}</p>
              <button type="button" class="seal__charge-info--modal-btn" @click="openChargeVigor">charge</button>
            </div>
          </div>

          <div class="input-box">
            <v-text-field
              ref="scrollRef"
              v-model="scroll"
              class="input-box__field input"
              type="tel"
              placeholder=""
              dense
              solo
              flat
              :hide-details="true"
              @keydown="inputScroll"
              @keyup="inputScroll"
            />

            <button type="button" class="input-box__button-minus minus" @click="minusScroll"></button>
            <button type="button" class="input-box__button-plus plus" @click="plusScroll"></button>
            <button type="button" class="input-box__button-max max" @click="maxScroll">MAX</button>
          </div>

          <button
            type="button"
            class="submit-seal__button"
            :disabled="scroll.length === 0 || errors.length > 0"
            @click="postSeal"
          >
            <strong class="submit-seal__title btn-name">{{ $t('w.mirage.my.seal') }}</strong>
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-energy.webp" alt="energy" />
            <em class="submit-seal__required-quantity quantity-seal">10</em>
          </button>
        </div>
      </validation-provider>
    </div>

  </v-dialog>
</template>

<script>
import { reactive, ref, toRefs, watch, computed } from "@vue/composition-api";
import { useMutations, useState } from "vuex-composition-helpers/dist";
import { useMirageStore } from '@/utils/composables/mirage';

export default {
  name: "ModalSealMirageScroll",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root }) {
    const { $dracoWebApi } = root;
    const form = ref(null);
    const { isDesktop } = useState(['isDesktop']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();

    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { scrollInfo, visibleModalSeal } = useMirageState(['scrollInfo', 'visibleModalSeal']);
    const { setVisibleChargeVigor } = useMirageMutations(['setVisibleChargeVigor', 'closeModalSeal']);
    const { closeModalSeal, fetchScrollInfo, fetchAccountInfo } = useMirageActions(['closeModalSeal', 'fetchScrollInfo', 'fetchAccountInfo']);

    const state = reactive({
      scroll: '1',
    })

    const openChargeVigor = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      setVisibleChargeVigor(true);
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
      let errorTitle = 'Seal was unsuccessful';
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = 'Seal was unsuccessful';
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const postSeal = () => {
      const amount = Number(state.scroll);

      $dracoWebApi
        .post('/mirage/scroll/seal', { count: amount })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal(data);
          }else {
            fetchScrollInfo();
            fetchAccountInfo();
            setCommonModal({
              open: true,
              title: 'Seal was successful',
              desc: '',
              primary: root.$t('w.dsp.common.close'),
              onPrimary() {},
            });
          }

          root.$nextTick(() => {
            closeModal();
          });
        })
        .catch((e) => {
          showErrorModal({ code: 500 });
        });
    };

    const inputScroll = (v) => {
      if (state.scroll) {
        state.scroll = state.scroll.replace(/[^\d.]/g, '');
      }
    };

    const plusScroll = () => {
      if(state.scroll) {
        state.scroll++;
      }
    }

    const minusScroll = () => {
      if(state.scroll && state.scroll > 1) {
        state.scroll--;
      }
    }

    const calculateMax = () => {
      if(scrollInfo.value) {
        const scrollAmount = scrollInfo.value.ScrollAmount / 10;
        const vigorAmount = scrollInfo.value.VigorAmount / 10;

        if(scrollAmount > vigorAmount) {
          return vigorAmount;
        } else {
          return scrollAmount;
        }
      }
    }

    const maxScroll = () => {
      state.scroll = String(Math.floor(calculateMax()));
    }

    const computedSeal = computed(() => {
      if(scrollInfo.value && scrollInfo.value.ScrollAmount) {
        return calculateMax();
      }
      return null;
    });

    const closeModal = () => {
      closeModalSeal();
      state.scroll = '1';
    }

    watch(
      () => props.visible,
      () => {
        if(form.value) {
          form.value.validate();
        }
      }
    )

    return {
      ...toRefs(state),
      isDesktop,
      scrollInfo,
      visibleModalSeal,
      inputScroll,
      plusScroll,
      minusScroll,
      openChargeVigor,
      postSeal,
      computedSeal,
      maxScroll,
      closeModal,
    };
  },
}
</script>
