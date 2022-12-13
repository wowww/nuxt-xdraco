<template>
  <div
    v-show="false"
    id="introNftWallet"
    ref="introNftWallet"
    class="wrap-introduction"
    :class="{ 'wrap-introduction--open': isOpen, 'wrap-introduction--indetail': inDetail }"
  >
    <div class="wrap-introduction__inner">
      <h3 class="title">
        <img src="https://file.mir4global.com/xdraco/img/common/bi-wemix-logo.webp" height="24" alt="WEMIX WALLET" />
      </h3>
      <p v-if="!inDetail">{{ $t('s.nft.intro.wemixwallet1') }}</p>
      <p v-if="!inDetail">{{ $t('s.nft.intro.wemixwallet2') }}</p>
      <p v-if="inDetail">{{ $t('s.nft.intro.wemixwallet3') }}</p>

      <button type="button" class="btn-close" @click="closeMessage">asdfasdf</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftIntroWallet',
  components: {
    //
  },
  props: {
    inDetail: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    isOpen: false,
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  mounted() {
    const showMessage =
      process.env.VUE_APP_DRACO_PROFILE !== 'production'
        ? sessionStorage.getItem(`wallet-message-${this.inDetail ? 'detail' : 'base'}`)
        : localStorage.getItem(`wallet-message-${this.inDetail ? 'detail' : 'base'}`);

    if (!showMessage) {
      setTimeout(() => {
        // document.documentElement.classList.add('init--nft-intro-wallet');
        // this.$refs.introNftWallet.classList.add('wrap-introduction--open');
        this.isOpen = !this.isOpen;
      }, 1000);
    }
  },
  destroyed() {
    document.documentElement.classList.remove('init--nft-intro-wallet');
  },
  methods: {
    closeMessage() {
      if (process.env.VUE_APP_DRACO_PROFILE !== 'production') {
        sessionStorage.setItem(`wallet-message-${this.inDetail ? 'detail' : 'base'}`, true);
      } else {
        localStorage.setItem(`wallet-message-${this.inDetail ? 'detail' : 'base'}`, true);
      }
      this.isOpen = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.wrap-introduction {
  --btn-close-size: 28px;
  --font-size: 14px;

  overflow: hidden;
  width: 100%;
  height: 0;
  background-color: #57e285;
  line-height: 1.4;
  font-size: var(--font-size);
  color: rgba(#000, 0.75);
  transition: height 400ms ease-out;

  &__inner {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    position: relative;
    margin: 0 auto;
    padding-top: 24px;
    max-width: var(--section-inner-width);
    height: 100%;
    box-sizing: border-box;

    .title {
      margin-bottom: 8px;

      img {
        display: block;
      }
    }

    .btn-close {
      position: absolute;
      top: calc(var(--btn-close-size) - 4px);
      right: 0;
      width: var(--btn-close-size);
      height: var(--btn-close-size);
      line-height: 0;
      font-size: 0;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #000;
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  // .init--nft-intro-wallet & {
  &.wrap-introduction--open {
    height: 120px;
  }

  &.wrap-introduction--indetail {
    --btn-close-size: 18px;
    --font-size: 12px;

    .title {
      img {
        height: 16px;
      }
    }

    .wrap-introduction__inner {
      padding: 16px 16px 0;
    }

    .btn-close {
      right: 16px;
    }

    &.wrap-introduction--open {
      height: 100px;
    }
  }

  .is-mobile & {
    .wrap-introduction__inner {
      padding: 15px;
      max-width: calc(var(--intro-draco-maxwidth) + 30px);

      .btn-close {
        top: 10px;
        right: 10px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    &.wrap-introduction--open {
      height: 180px;
    }
  }
}
</style>
