<template>
  <div class="dsp-round-season2" :class="{ 'type-main': type }">
    <div class="dsp-round-season2__inner">
      <h2 class="bi" v-if="type">
        <img src="https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bi-dsp.webp" width="117" alt="DSP" />
      </h2>
      <p class="message">DRACO is POWER<br />DSP SEASON 2</p>
      <ul class="information">
        <li>
          <strong class="number">50</strong>
          <span>ROUNDS</span>
        </li>
        <li class="legendary">
          <strong class="number">13</strong>
          <span>LEGENDARY<br />ITEMS</span>
        </li>
        <li class="epic">
          <strong class="number">37</strong>
          <span>EPIC<br />ITEMS</span>
        </li>
        <!-- <li class="rare">
          <strong class="number">4</strong>
          <span>RARE<br />ITEMS</span>
        </li> -->
      </ul>
      <div class="wrap-button" v-if="type">
        <nuxt-link to="/dsp/rounds" class="link">Round List</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundSeason2',
  props: {
    type: {
      type: String,
      required: false,
    },
    flipped: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  components: {
    // DspNav,
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  setup() {
    onBeforeMount(() => {
      //
    });
  },
});
</script>

<style lang="scss" scoped>
.dsp-round-season2 {
  --banner-height: 460px;
  --banner-boxsize: 102px;
  --banner-inner-width: 582px;

  overflow: hidden;
  position: relative;
  height: var(--banner-height);
  background: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-banner-desktop.webp') 50% 0 / auto 100% no-repeat;
  color: #fff;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: calc(50% - 193px - 216px);
    z-index: 0;
    width: 386px;
    height: 354px;
    background: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-character.webp') 50% 0 / 100% auto no-repeat;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    width: var(--banner-inner-width);
    height: inherit;
  }
  .subnav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .message {
    display: flex;
    align-items: flex-end;
    height: 270px;
    line-height: 1.2;
    font-size: 48px;
    font-weight: 700;
  }
  .information {
    display: flex;
    align-items: center;
    margin-top: 24px;
    padding: 0;
    font-weight: 700;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 8px;
      padding-top: 4px;
      width: var(--banner-boxsize);
      height: var(--banner-boxsize);
      list-style: none;
      line-height: 1;
      font-size: 12px;
      text-align: center;
      letter-spacing: -0.24px;
      background-position: 50% 50%;
      background-size: cover;
      background-repeat: no-repeat;
      box-sizing: border-box;

      &::before {
        content: '';
        position: absolute;
        top: 30%;
        left: 0;
        border: 1px solid #aa00ff;
        width: 71%;
        height: 71%;
        transform: rotate(-45deg) translateX(30%);
        box-sizing: border-box;
      }
      .number {
        font-weight: 700;
        font-size: 32px;
      }
      &:not([class]) {
        padding-top: 2px;

        .number {
          margin-bottom: 4px;
        }
      }
      &.legendary,
      &.grade-5 {
        background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-legendary-badge.webp');

        &::before {
          content: none;
        }
      }
      &.epic,
      &.grade-4 {
        background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-epic-badge.webp');

        &::before {
          content: none;
        }
      }
      &.rare,
      &.grade-3 {
        background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-rare-badge.webp');

        &::before {
          content: none;
        }
      }
    }
  }
  .wrap-button {
    margin-top: 25px;
    text-align: center;

    .link {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 48px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      border-style: solid;
      border-width: 1px;
      border-image-source: linear-gradient(to bottom, #7000ff, #4f0076);
      border-image-slice: 1;
      background-image: linear-gradient(103deg, #000 0%, #1d005e 51%, #000 100%);
      box-sizing: border-box;

      &::after {
        content: '';
        display: block;
        margin-left: 4px;
        width: 16px;
        height: 16px;
        background: url('https://file.mir4global.com/xdraco/img/desktop/banner-dsp-main/icon-link-arrow.webp') 0 0 / cover no-repeat;
      }
    }
  }

  // in main-page
  &.type-main {
    --banner-boxsize: 96px;

    background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-banner-desktop2.webp');
    background-color: #08081e;

    &::before {
      right: calc(50% - 193px - 308px);
      height: 379px;
    }
    .dsp-round-season2__inner {
      justify-content: center;
      align-items: center;
    }
    .message {
      height: auto;
      line-height: 1.091;
      font-size: 44px;
      text-align: center;
    }
    .information {
      margin-top: 4px;
    }
  }

  .is-mobile & {
    --banner-height: 300px;
    --banner-boxsize: 64px;
    --banner-inner-width: 582px;

    padding: 0 var(--intro-draco-padding);
    width: 100%;
    background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-banner-mobile.webp');

    &::before {
      right: calc(50% - 106px - 96px);
      width: 213px;
      height: 211px;
    }
    .banner-dsp__inner {
      height: 100%;
      width: 320px;
      max-width: var(--intro-draco-maxwidth);
    }
    .message {
      display: flex;
      align-items: flex-end;
      width: 74%;
      height: 165px;
      line-height: 1.1;
      font-size: 28px;
      word-break: break-all;
    }
    .information {
      margin-top: 16px;

      li {
        margin-right: 4px;
        font-size: 10px;

        > span {
          height: 20px;
        }
        .number {
          font-size: 20px;
          letter-spacing: -0.4px;
        }
      }
    }
    // in main-page
    &.type-main {
      --banner-height: 400px;
      --banner-inner-width: 280px;
      --banner-boxsize: 88px;

      background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-banner-mobile2.webp');

      &::before {
        right: calc(50% - 106px - 216px);
        width: 347px;
        height: 360px;
        background-image: url('https://file.mir4global.com/xdraco/img/common/banner/dsp-round-season2/bg-character2.png');
      }
      .message {
        width: auto;
        height: auto;
      }
      .information {
        margin-top: 10px;

        li {
          font-size: 12px;

          .number {
            font-size: 28px;
          }
        }
      }
      .wrap-button {
        margin-top: 14px;
      }
    }
  }
}
</style>
