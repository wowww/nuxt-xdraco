<template>
  <div v-if="isOpen" class="wemix__modal wemix__modal-login" aria-wemix-modal="true">
    <section class="wemix__modal-set" :aria-cell-phone="!isDesktop">
      <div class="wemix__modal-close" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 21" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7337 2.05192C20.0888 1.69689 20.0888 1.12129 19.7337 0.766267C19.3787 0.411244 18.8031 0.411244 18.4481 0.766267L10 9.21435L1.55192 0.766267C1.19689 0.411244 0.621289 0.411244 0.266267 0.766267C-0.0887555 1.12129 -0.0887555 1.69689 0.266267 2.05192L8.71435 10.5L0.266267 18.9481C-0.0887555 19.3031 -0.0887555 19.8787 0.266267 20.2337C0.621289 20.5888 1.19689 20.5888 1.55192 20.2337L10 11.7856L18.4481 20.2337C18.8031 20.5888 19.3787 20.5888 19.7337 20.2337C20.0888 19.8787 20.0888 19.3031 19.7337 18.9481L11.2856 10.5L19.7337 2.05192Z" fill="#4F4F4F"/>
        </svg>
      </div>
      <div class="wemix__modal-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25" fill="none" class="wemix__modal-title-logo-image">
          <g clip-path="url(#clip0_9278_205811)">
            <path d="M0 0V5.83375L16.0973 14.8012L21.0299 11.7162L0 0Z" fill="#FF7399"/>
            <path d="M6.74024 20.6547L16.0972 14.8022L10.9974 11.9609L6.74023 14.6234V20.6547H6.74024Z" fill="#FFB2C7"/>
            <path d="M5.39227 10.296L0 7.29102V21.996L5.39227 24.9998V10.296Z" fill="#F54977"/>
          </g>
          <defs>
            <clipPath id="clip0_9278_205811">
              <rect width="21.0299" height="25" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <template v-if="!isMobile">
          <svg xmlns="http://www.w3.org/2000/svg" width="83" height="25" viewBox="0 0 83 12" fill="none" class="wemix__modal-title-logo">
            <path d="M8.1213 4.252C8.1213 4.77467 7.9953 5.26467 7.7433 5.722C7.50063 6.17933 7.1133 6.548 6.5813 6.828C6.05863 7.108 5.39596 7.248 4.5933 7.248H2.9553V11H0.995297V1.228H4.5933C5.3493 1.228 5.9933 1.35867 6.5253 1.62C7.0573 1.88133 7.45396 2.24067 7.7153 2.698C7.98596 3.15533 8.1213 3.67333 8.1213 4.252ZM4.5093 5.666C5.05063 5.666 5.45196 5.54467 5.7133 5.302C5.97463 5.05 6.1053 4.7 6.1053 4.252C6.1053 3.3 5.5733 2.824 4.5093 2.824H2.9553V5.666H4.5093ZM11.4729 9.446H14.6929V11H9.51288V1.228H11.4729V9.446ZM21.9307 9.138H18.0387L17.3947 11H15.3367L18.8507 1.214H21.1327L24.6467 11H22.5747L21.9307 9.138ZM21.3987 7.57L19.9847 3.482L18.5707 7.57H21.3987ZM33.7301 1.228L30.4261 7.598V11H28.4661V7.598L25.1481 1.228H27.3601L29.4601 5.694L31.5461 1.228H33.7301ZM51.2585 1.228L48.5285 11H46.2185L44.3845 4.042L42.4665 11L40.1705 11.014L37.5385 1.228H39.6385L41.3605 8.816L43.3485 1.228H45.5325L47.4085 8.774L49.1445 1.228H51.2585ZM52.0343 7.094C52.0343 6.31 52.1883 5.61467 52.4963 5.008C52.8136 4.40133 53.2383 3.93467 53.7703 3.608C54.3116 3.28133 54.9136 3.118 55.5763 3.118C56.1549 3.118 56.6589 3.23467 57.0883 3.468C57.5269 3.70133 57.8769 3.99533 58.1383 4.35V3.244H60.1123V11H58.1383V9.866C57.8863 10.23 57.5363 10.5333 57.0883 10.776C56.6496 11.0093 56.1409 11.126 55.5623 11.126C54.9089 11.126 54.3116 10.958 53.7703 10.622C53.2383 10.286 52.8136 9.81467 52.4963 9.208C52.1883 8.592 52.0343 7.88733 52.0343 7.094ZM58.1383 7.122C58.1383 6.646 58.0449 6.24 57.8583 5.904C57.6716 5.55867 57.4196 5.29733 57.1023 5.12C56.7849 4.93333 56.4443 4.84 56.0803 4.84C55.7163 4.84 55.3803 4.92867 55.0723 5.106C54.7643 5.28333 54.5123 5.54467 54.3163 5.89C54.1296 6.226 54.0363 6.62733 54.0363 7.094C54.0363 7.56067 54.1296 7.97133 54.3163 8.326C54.5123 8.67133 54.7643 8.93733 55.0723 9.124C55.3896 9.31067 55.7256 9.404 56.0803 9.404C56.4443 9.404 56.7849 9.31533 57.1023 9.138C57.4196 8.95133 57.6716 8.69 57.8583 8.354C58.0449 8.00867 58.1383 7.598 58.1383 7.122ZM63.9865 0.64V11H62.0265V0.64H63.9865ZM67.883 0.64V11H65.923V0.64H67.883ZM77.0295 6.954C77.0295 7.234 77.0108 7.486 76.9735 7.71H71.3035C71.3502 8.27 71.5462 8.70867 71.8915 9.026C72.2368 9.34333 72.6615 9.502 73.1655 9.502C73.8935 9.502 74.4115 9.18933 74.7195 8.564H76.8335C76.6095 9.31067 76.1802 9.92667 75.5455 10.412C74.9108 10.888 74.1315 11.126 73.2075 11.126C72.4608 11.126 71.7888 10.9627 71.1915 10.636C70.6035 10.3 70.1415 9.82867 69.8055 9.222C69.4788 8.61533 69.3155 7.91533 69.3155 7.122C69.3155 6.31933 69.4788 5.61467 69.8055 5.008C70.1322 4.40133 70.5895 3.93467 71.1775 3.608C71.7655 3.28133 72.4422 3.118 73.2075 3.118C73.9448 3.118 74.6028 3.27667 75.1815 3.594C75.7695 3.91133 76.2222 4.364 76.5395 4.952C76.8662 5.53067 77.0295 6.198 77.0295 6.954ZM74.9995 6.394C74.9902 5.89 74.8082 5.48867 74.4535 5.19C74.0988 4.882 73.6648 4.728 73.1515 4.728C72.6662 4.728 72.2555 4.87733 71.9195 5.176C71.5928 5.46533 71.3922 5.87133 71.3175 6.394H74.9995ZM80.7421 4.854V8.606C80.7421 8.86733 80.8028 9.05867 80.9241 9.18C81.0548 9.292 81.2695 9.348 81.5681 9.348H82.4781V11H81.2461C79.5941 11 78.7681 10.1973 78.7681 8.592V4.854H77.8441V3.244H78.7681V1.326H80.7421V3.244H82.4781V4.854H80.7421Z" fill="black"/>
          </svg>
        </template>
        <p v-else class="wemix__modal-title-text">
          Connect to PLAY Wallet
        </p>
      </div>
      <article class="wemix__modal-qrcode">
        <template v-if="!isMobile">
          <div class="wemix__modal-qrcode-image">
            <canvas ref="canvas" class="wemix__qr-canvas" />
            <div v-if="refreshable" class="wemix__modal-qrcode-image-refresh" @click="refresh">
              <img src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-refresh.svg" height="30" width="30" alt="refresh-icon" />
            </div>
          </div>
          <div class="wemix__modal-qrcode-timer">
            <p>{{ i18n.t('qr.remain') }} <span class="wemix__modal-qrcode-remain">{{ remainTimeText }}</span></p>
            <p class="wemix__modal-qrcode-warning">{{ i18n.t('qr.text1') }}</p>
          </div>
        </template>
        <template v-if="isMobile">
          <p class="wemix__modal-qrcode-warning">{{ i18n.t('qr.text2') }}</p>
          <button class="wemix__modal-qrcode-button" type="button" @click="executiveApp">
            <span>{{ i18n.t('qr.mobile.submit') }}</span>
          </button>
          <div class="wemix__modal-qrcode-timer">
            <p>{{ i18n.t('qr.remain') }} <span class="wemix__modal-qrcode-remain">{{ remainTimeText }}</span></p>
          </div>
          <div class="wemix__modal-help">
            <h3 class="wemix__modal-help-heading">{{ i18n.t('qr.help.title') }}</h3>
            <ul class="wemix__modal-help-description">
              <li>{{ i18n.t('qr.help.sub1') }}</li>
              <li>{{ i18n.t('qr.help.sub2') }}</li>
            </ul>
            <p class="wemix__modal-help-email">
              <a href="https://cs.mir4global.com/customer?category=191" target="_blank">{{ i18n.t('qr.help.btn') }}</a>
            </p>
          </div>
        </template>
      </article>
      <div v-if="!isMobile" class="wemix__modal__notice">
        <div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>1</em></span>
              <div class="wemix__modal__flow-icon app">
                <img
                  class="wemix__modal__flow-icon--app"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-logo.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step1') }}</p>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>2</em></span>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--scan"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-scan.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step2') }}</p>
            </div>
            <img
              class="wemix__modal__flow-arrow"
              src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-arrow.svg"
              alt="pointer"
            />
          </div>
          <div class="wemix__modal__flow">
            <div class="wemix__modal__flow-wrap">
              <span>step<em>3</em></span>
              <div class="wemix__modal__flow-icon">
                <img
                  class="wemix__modal__flow-icon--auth"
                  src="https://file.mir4global.com/xdraco-dsp/wemix/sdk/templete/qr/ico-auth.svg"
                  alt=""
                />
              </div>
              <p>{{ i18n.t('qr.step3') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import qrcode from 'qrcode';
import { useMutations, useState } from 'vuex-composition-helpers/dist';
import { onBeforeMount } from '@vue/composition-api';
import i18n from '@/utils/wemix/sdk/language/i18n';
import WemixConstants from '@/utils/wemix/constants';

export default {
  name: 'ModalWemixLogin',
  props: {
    req: {
      type: Object,
      default: undefined,
    },
    onSuccess: {
      type: Function,
      default: undefined,
    },
    onFailed: {
      type: Function,
      default: undefined,
    },
  },
  setup(_, { root }) {
    const { $store } = root;
    const { isDesktop } = useState(['isDesktop']);
    const { setCommonModal } = useMutations(['setCommonModal']);

    const close = () => {
      return $store.dispatch('wemix/close');
    };

    const alertModal = (title, desc) => {
      setCommonModal({
        permission: true,
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          close();
        },
        onClose() {
          close();
        },
      });
    };

    return {
      isDesktop,
      alertModal,
      i18n,
    };
  },
  data() {
    return {
      finished: true,
      newWindow: null,
    };
  },
  computed: {
    isOpen() {
      return this.$store.state.wemix.modal.open;
    },
    isMobile() {
      return this.$device.isMobile;
    },
    openLink() {
      return this.$store.state.wemix.modal.openLink;
    },
    type() {
      return this.$store.state.wemix.modal.type;
    },
    requestUrl() {
      return this.$store.state.wemix.information.url;
    },
    timer() {
      return this.$store.state.wemix.timer;
    },
    remainTimeText() {
      const remainTime = this.$store.state.wemix.modal.remainTime;
      if (remainTime > 0) {
        const duration = this.$dayjs.duration(remainTime, 'seconds');
        return i18n.t('qr.remain.format').replace('{mm}', duration.minutes()).replace('{ss}', duration.seconds());
      }
      return i18n.t('qr.expired');
    },
    refreshable() {
      return this.$store.state.wemix.modal.remainTime <= 0;
    },
    result() {
      return this.$store.state.wemix.modal.response;
    },
    resultStatus() {
      return this.result ? this.result.status : '';
    },
  },
  watch: {
    isOpen(open) {
      if (open) {
        this.start();
      }
    },
    openLink(open) {
      if (open) {
        this.newWindow = window.open(this.requestUrl, 'WEMIX Authentication');

        if (!this.newWindow || this.newWindow.closed || typeof this.newWindow.closed == 'undefined') {
          this.$store.commit('wemix/setOpenLink', false);
          this.alertModal(this.$t('t.common.popup-blocked'), this.$t('s.common.popup-blocked'));
        }
      }
    },
    requestUrl(url) {
      if (!this.isMobile) {
        this.drawQROnCanvas(url);
      }
    },
    resultStatus(status) {
      switch (status) {
        case WemixConstants.STATUS.CONFIRM:
          switch (this.type) {
            case WemixConstants.TYPE.AUTH:
              this.$store.dispatch('wemix/getToken');
              break;
            case WemixConstants.TYPE.SIGN:
              this.$store.dispatch('wemix/executeTransaction');
              break;
          }
          break;
      }
    },
  },
  methods: {
    drawQROnCanvas(url) {
      qrcode.toCanvas(this.$refs.canvas, url, { width: 200, errorCorrectionLevel: 'L' });
    },
    clearCountdown() {
      this.$store.dispatch('wemix/clearCountdown');
    },
    prepare() {
      this.$store.dispatch('wemix/prepare');
    },
    setCountdown(timer) {
      this.$store.dispatch('wemix/setCountdown', timer);
    },
    start() {
      this.prepare();
      const timer = setInterval(this.decreaseRemain, 1000);
      this.setCountdown(timer);
    },
    close() {
      this.$store.dispatch('wemix/close');
    },
    refresh() {
      this.clearCountdown();
      this.start();
    },
    decreaseRemain() {
      this.drawQROnCanvas(this.requestUrl);
      this.$store.dispatch('wemix/checkStatus');
      this.$store.dispatch('wemix/decreaseRemain');
      if (this.$device.isMobile && this.openLink && this.result.result.length > 0) {
        this.newWindow.blur();
        this.newWindow.close();
      }
    },
    executiveApp() {
      window.open(this.requestUrl, 'WEMIX Authentication');
    }
  },
};
</script>
<style lang="scss">
@import '~@/utils/wemix/sdk/templete/qr/qr';
</style>
