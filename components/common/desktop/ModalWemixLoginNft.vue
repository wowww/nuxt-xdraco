<template>
  <div v-if="openQR" class="wemix__modal nft" aria-wemix-modal="true">
    <section class="wemix__modal-set" :aria-cell-phone="!isDesktop">
      <div class="wemix__modal-close" @click="close">
        <img src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-close.svg" alt="" />
      </div>
      <div class="wemix__modal-title">
        <img
          class="wemix__modal-title-logo"
          src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-logo-nft.webp"
          height="48"
          width="113"
          alt="WEMIX"
        />
        <span class="wemix__modal-title__desc" >{{ $t('s.qr.nft.desc') }}</span>
      </div>
      <article class="wemix__modal-qrcode">
        <div class="wemix__modal-qrcode-image">
          <canvas ref="canvas" class="wemix__qr-canvas" />
        </div>

        <div class="wemix__modal-qrcode-warning">
          <img src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-wemix-logo.webp" alt="wemix-logo" width="65" height="18" />
        </div>
      </article>
      <article class="wemix__modal__notice">
        <div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <h4>STEP 1</h4>
              <div class="wemix__modal__flow-icon app">
                <img
                  class="wemix__modal__flow-icon--app"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-logo.svg"
                  alt=""
                  width="18"
                />
              </div>
              <span>{{ i18n.t('qr.step1') }}</span>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
              width="16"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <h4>STEP 2</h4>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--scan"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-scan-nft.webp"
                  alt=""
                />
              </div>
              <span>{{ i18n.t('qr.step2') }}</span>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
              width="16"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <h4>STEP 3</h4>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--auth"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/mobile/ico-auth-nft.webp"
                  alt=""
                />
              </div>
              <span>{{ i18n.t('qr.step3') }}</span>
            </div>
          </div>
        </div>
        <div class="wemix__modal__step-warning">
          <span>{{ i18n.t('qr.other1') }}</span>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { createNamespacedHelpers, useState } from "vuex-composition-helpers/dist";
import qrcode from "qrcode";
import {onMounted, reactive, ref, toRefs, watch} from "@vue/composition-api";
import i18n from '@/utils/wemix/sdk/language/i18n';
const { useActions: useNftActions, useState: useNftState, useMutations: useNftMutations } = createNamespacedHelpers('nft');


export default {
  name: "ModalWemixLoginNft",
  setup(props, { root }) {
    const { $route, $device } = root;
    const { isDesktop } = useState(['isDesktop']);
    const { openQR, item } = useNftState(['openQR', 'item']);
    const { setOpenQR } = useNftMutations(['setOpenQR']);
    const { fetchNftItem } = useNftActions(['fetchNftItem']);

    const canvas = ref(null);

    const state = reactive({
      os: '',
      url: '',
      checkTimer: null,
      timer: null,
      time: 180,
      nftId: $route.params.id,
    });

    const close = () => {
      setOpenQR(false);
      fetchNftItem(state.nftId);
    };

    const goMarket = () => {
      if (state.os === 'android') {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.wemadetree.wemixwallet&hl=ko&gl=US';
      } else if (state.os === 'ios') {
        window.location.href = 'https://apps.apple.com/kr/app/wemix-wallet/id1531057807';
      }
    };

    const stopTimer = () => {
      clearInterval(state.timer);
      state.time = 0;
    };

    const startTimer = () => {
      state.time = 180;

      state.timer = setInterval(() => {
        state.time -= 1;

        if (state.time <= 0) {
          stopTimer();
        }
      }, 1000);
    };

    const checkAppInstall = () => {
      const mobile = $device.isMobile;

      if (mobile) {
        // 유저에이전트를 불러와서 OS를 구분합니다.
        if ($device.isAndroid) state.os = 'android';
        else if ($device.isIOS) state.os = 'ios';
        else state.os = 'etc';
      } else {
        // 모바일이 아닐 때
        state.os = 'nomobile';
      }

      // 앱에 설정해놓은 커스텀 스킴.
      const schemeHost = 'wemix-wallet://wemixnetwork.com';
      const urlScheme = `${schemeHost}/nft/dex/detail?symbol=M4CHA&tid=${state.nftId}`;

      const clickedAt = +new Date();
      state.checkTimer = setTimeout(() => {
        if (+new Date() - clickedAt < 2000) {
          goMarket();
        }
      }, 1500);
      window.location.href = urlScheme;
    };

    const drawQROnCanvas = (url) => {
      qrcode.toCanvas(canvas.value, url, { width: 300, errorCorrectionLevel: 'L' });
    };

    const decreaseRemain = () => {
      drawQROnCanvas(state.url)
      startTimer();
    };

    onMounted(() => {
      watch(() => openQR.value,
      () => {
        if ($device.isMobile) {
          checkAppInstall();
        }

        state.url = `wemix-wallet://wemixnetwork.com/nft/dex/detail?symbol=M4CHA&tid=${item.value.nftID}`;
        decreaseRemain();
      });
    });

    return {
      ...toRefs(state),
      canvas,
      openQR,
      isDesktop,
      i18n,
      close,
    }
  },
  methods: {


  },
}
</script>
<style lang="scss">
@import '~@/utils/wemix/sdk/templete/qr/qr';
</style>
