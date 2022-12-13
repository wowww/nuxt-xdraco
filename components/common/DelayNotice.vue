<template>
  <div class="wrap-delay-notice" :class="{ 'wrap-delay-notice--open': isOpen }">
    <div class="wrap-delay-notice__inner">
      <strong v-html="$t('t.draco.hsp.delay-notice')"></strong>
      <p v-html="$t('s.draco.hsp.delay-notice')"></p>
      <button type="button" class="btn-close" @click="closeMessage">close</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DelayNotice',
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
  mounted() {
    const showMessage =
      process.env.VUE_APP_DRACO_PROFILE !== 'production'
        ? sessionStorage.getItem(`delay-notice-${this.inDetail ? 'detail' : 'base'}`)
        : localStorage.getItem(`delay-notice-${this.inDetail ? 'detail' : 'base'}`);
    if (!showMessage) {
      setTimeout(() => {
        // document.documentElement.classList.add('init--nft-intro-wallet');
        // this.$refs.introNftWallet.classList.add('wrap-delay-notice--open');
        this.isOpen = !this.isOpen;
      }, 1000);
    }
  },
  destroyed() {
    // document.documentElement.classList.remove('init--nft-intro-wallet');
  },
  methods: {
    closeMessage() {
      if (process.env.VUE_APP_DRACO_PROFILE !== 'production') {
        sessionStorage.setItem(`delay-notice-${this.inDetail ? 'detail' : 'base'}`, true);
      } else {
        localStorage.setItem(`delay-notice-${this.inDetail ? 'detail' : 'base'}`, true);
      }
      this.isOpen = false;
    },
  },
});
</script>

<style lang="scss">
.wrap-delay-notice {
  --btn-close-size: 33px;
  --font-size: 14px;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  overflow: hidden;
  width: 100%;
  height: 0;
  background-color: #4141ff;
  line-height: normal;
  font-size: var(--font-size);
  color: #fff;
  transition: height 400ms ease-out;

  &__inner {
    display: flex;
    position: relative;
    flex-direction: column;
    row-gap: 8px;
    position: relative;
    margin: 0 auto;
    padding: 24px 26px 28px 106px;
    max-width: var(--section-width);
    height: 100%;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 0;
      width: 96px;
      height: 96px;
      background: url('https://file.mir4global.com/xdraco/img/common/delay-notice/symbol-hydra.png') 0 0 / cover no-repeat;
    }

    > strong {
      display: flex;
      column-gap: 4px;
      padding: 4px 0;
      line-height: 1.14;

      &::before {
        content: '';
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        background: url('https://file.mir4global.com/xdraco/img/common/delay-notice/ico-exclaim.webp') 0 0 / cover no-repeat;
      }
    }

    > p {
      font-size: 12px;
      line-height: 1.5;

      em {
        font-weight: 600;
      }
    }

    .btn-close {
      position: absolute;
      top: calc(var(--btn-close-size) - 11px);
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
        background-color: #fff;
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  &.wrap-delay-notice--open {
    height: 120px;
  }

  .is-mobile & {
    &.wrap-delay-notice--open {
      height: 208px;
    }

    .wrap-delay-notice__inner {
      padding: 24px;
      row-gap: 16px;
      max-width: 640px;

      &::before {
        display: none;
      }

      > strong {
        padding-right: 32px;
      }

      > p {
        position: relative;
        padding-left: 106px;
        min-height: 64px;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 96px;
          height: 96px;
          background: url('https://file.mir4global.com/xdraco/img/common/delay-notice/symbol-hydra.png') 0 0 / cover no-repeat;
        }
      }
      .btn-close {
        top: calc(var(--btn-close-size) - 12px);
        right: calc(var(--btn-close-size) - 19px);

        &::before,
        &::after {
          left: 4px;
          width: 65%;
        }
      }
    }
  }
}
</style>
