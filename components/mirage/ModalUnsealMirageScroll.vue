<template>
  <v-dialog
    :value="visibleModalUnSeal"
    content-class="dialog-mirage dialog-mirage-seal unseal"
    scrollable
    persistent
    :max-width="isDesktop ? '720px' : '100%'"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div class="content seal">
      <div class="seal__header">
        <v-btn class="btn-close btn-miragepop-close modal__close--button" fab plain x-small @click="closeModal"/>
        <h2 class="seal__title dialog-header">{{ $t('t.mirage.my.unseal') }}</h2>
      </div>
      <div class="seal__description">
        <span class="seal--thumb-item seal--thumb-card">
          <item-card
            :item="sealingBox"
            :size="!isDesktop ? 'xs' : 'sm'"
            prevent-flip
          />
          <span class="seal--thumb-item-amount">x {{ scrollInfo && scrollInfo.scrollBox || '0'}}</span>
        </span>
        <p class="seal__description-message">{{ $t('s.mirage.my.unseal.desc') }}</p>
      </div>

      <validation-provider
        ref="form"
        v-slot="{ errors, failedRules }"
        :rules="{ required: true, between: [1, Number(computedUnSeal ? computedUnSeal : 0)] }"
      >
        <div class="seal--full" :class="{ error: errors.length > 0 }">
          <div class="seal__charge input-top">
            <span v-if="failedRules.hasOwnProperty('required')" class="seal__charge-message">{{ $t('s.mirage.my.unseal.message') }}</span>
            <span v-else-if="failedRules.hasOwnProperty('between')" class="seal__charge-message--error">
              {{ isDesktop ? $t('s.mirage.my.unseal.mobile.message.error') : $t('s.mirage.my.unseal.desktop.message.error')}}
            </span>
            <span v-else class="seal__charge-message">{{ $t('s.mirage.my.unseal.message')}}</span>
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
            type="submit"
            class="submit-seal__button"
            :disabled="scroll.length === 0 || errors.length > 0"
            @click="postUnseal"
          >
            <strong class="submit-seal__title">{{ $t('t.mirage.my.unseal') }}</strong>
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
import ItemCard from '@/components/common/item/ItemCard';

export default {
  name: "ModalUnSealMirageScroll",
  components: { ItemCard },
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
    const { useMirageState, useMirageGetters, useMirageActions } = useMirageStore();

    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { scrollInfo, visibleModalUnSeal } = useMirageState(['scrollInfo', 'visibleModalUnSeal']);
    const { closeModalUnSeal, fetchScrollInfo, fetchAccountInfo } = useMirageActions(['closeModalUnSeal', 'fetchScrollInfo', 'fetchAccountInfo']);

    const state = reactive({
      scroll: '1',
      sealingBox: {
        grade: 4,
        uniqueNo: '',
        imgPath: 'https://file.mir4global.com/xdraco/img/common/mirage-enhancement/mirage-scroll-sealing-box.webp',
        itemName: 'MIRAGE Scroll Sealing Box',
        itemType: '14_8',
        class: 0,
      },
    })

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
      let errorTitle = 'Unseal was unsuccessful';
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = 'Unseal was unsuccessful';
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const postUnseal = () => {
      const amount = Number(state.scroll);

      $dracoWebApi
        .post('/mirage/scroll/unseal', { count: amount })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal(data);
          } else {
            fetchScrollInfo();
            fetchAccountInfo();
            setCommonModal({
              open: true,
              title: 'UnSeal was successful',
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

    const closeModal = () => {
      closeModalUnSeal();
      state.scroll = '1';
    }

    const maxScroll = () => {
      state.scroll = scrollInfo.value.scrollBox;
    }

    const computedUnSeal = computed(() => {
      if(scrollInfo.value) {
        return scrollInfo.value.scrollBox;
      }
      return null;
    });

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
      visibleModalUnSeal,
      scrollInfo,
      postUnseal,
      inputScroll,
      plusScroll,
      minusScroll,
      closeModal,
      maxScroll,
      computedUnSeal,
    };
  },
}
</script>

<style lang="scss">

.dialog-mirage {
  &.dialog-mirage-seal {
    &.unseal {
      .content {
        .thumb-item {
          width: auto;
          height: auto;
          display: flex;
          flex-direction: row;
          align-items: flex-end;

          .item-amount {
            background-color: transparent;
            right: -45px;
          }
        }
      }
    }
  }
}

</style>
