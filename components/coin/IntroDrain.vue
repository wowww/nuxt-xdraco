<template>
  <div id="IntroDrain" ref="IntroDrain" class="intro-banner intro-drain" :class="{ 'intro-drain--open': isOpen }">
    <div class="intro-drain__inner">
      <div class="logo">
        <img src="https://file.mir4global.com/xdraco/img/common/intro-drain-banner/img-coin-hydra@2x.webp" width="97" alt="" />
      </div>
      <div class="cont">
        <h3 class="title" v-html="$t('t.drain.notice.budget-increase')"></h3>
        <!-- <p v-html="$t('s.drain-teaser.banner.desc1')"></p>  -->
        <dl class="sub-caution">
          <dd v-html="$t('s.drain.notice.budget-increase')"></dd>
        </dl>
        <nuxt-link to="/drain" class="link">{{ $t('w.drain.notice.find-out-more') }}</nuxt-link>
      </div>
      <button type="button" class="btn-close" @click="closeMessage">close layer</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'IntroDrain',
  components: {
    //
  },
  props: {
    //
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    isOpen: false,
  }),
  methods: {
    closeMessage() {
      sessionStorage.setItem(`read-intro-drain-20220319`, true);
      this.isOpen = false;
    },
  },
  mounted() {
    const showMessage = sessionStorage.getItem(`read-intro-drain-20220319`);

    if (!showMessage) {
      setTimeout(() => {
        this.isOpen = !this.isOpen;
      }, 1000);
    }
  },
  destroyed() {
    document.documentElement.classList.remove('init--nft-intro-wallet');
  },
});
</script>

<style lang="scss">
.intro-drain {
  --btn-close-size: 28px;
  --font-size: 14px;
  --inner-width: 960px;

  overflow: hidden;
  position: absolute;
  top: var(--header-height);
  margin-top: 54px;
  left: 0;
  z-index: 2;
  width: 100%;
  max-height: 0;
  line-height: 1.29;
  font-size: var(--font-size);
  color: #000;
  background: #c5dcff url('https://file.mir4global.com/xdraco/img/common/intro-drain-banner/bg-intro-drain.webp') calc(50% - 426px) calc(50% - 19px) / 960px auto no-repeat;
  background-position-y: -408px;
  transition: max-height 400ms ease-out;

  &__inner {
    display: flex;
    position: relative;
    margin: 0 auto;
    padding: 26px 40px 16px 0;
    max-width: var(--inner-width);
    box-sizing: border-box;
    column-gap: 28px;

    .logo {
      img {
        vertical-align: top;
      }
    }

    .title {
      margin-bottom: 8px;
      line-height: 1.2;
      font-weight: 700;
      font-size: calc(var(--font-size) + 6px) !important;
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

    p {
      opacity: 0.75;
    }

    .link {
      display: inline-block;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      color: #000;
      margin-top: 8px;
      border-bottom: 1px solid #000;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background-color: #000;
        transform: translateX(-100%);
        transition: transform 0.2s linear;
      }

      &::after {
        content: '';
        display: inline-block;
        margin-left: 4px;
        width: 10px;
        height: 10px;
        background: url('https://file.mir4global.com/xdraco/img/common/intro-drain-banner/icon-link-arrow.webp') 0 0 / 100% auto no-repeat;
      }

      &:hover {
        &::before {
          transform: translateX(0);
        }
      }
    }

    em {
      font-style: normal;
      font-weight: 700;
    }
  }

  .sub-caution {
    line-height: 1.333;
    font-size: 14px;
    color: #000;

    dt {
      display: block;
      font-weight: 700;
    }
    &:first-of-type {
      margin-top: 0;
    }
    dd {
      em {
        color: rgba(255, 0, 0, 0.75);
        font-weight: bold;
      }
    }
  }

  &.intro-drain--open {
    max-height: 300px;
  }

  .is-mobile & {
    background-position: -404px -366px;

    &__inner {
      column-gap: 16px;
    }

    &.intro-drain--open {
      max-height: 480px;
    }

    .intro-drain__inner {
      padding: 24px;
      max-width: calc(var(--intro-draco-maxwidth) + 30px);

      .logo {
        padding-top: 40px;
      }

      .title {
        margin-left: -112px;
        margin-bottom: 16px;
        padding-right: 30px;
      }

      .btn-close {
        top: 20px;
        right: 20px;
        width: calc(var(--btn-close-size) + 4px);
        height: calc(var(--btn-close-size) + 4px);
      }

      .link {
        border-bottom: 0px;
      }
    }

    @media screen and (min-width: 550px) {
      background-position-x: calc(50% - 198px);
    }
  }
}

@media (min-width: 900px) {
  .intro-drain {
    margin-top: 100px;
  }
}
</style>
