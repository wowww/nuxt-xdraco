<template>
  <div class="banner-dsp">
    <div class="banner-dsp__inner">
      <p class="message">DRACO is POWER<br />DSP SEASON 1</p>
      <ul class="information">
        <li>
          <strong class="number">100</strong>
          <span>ROUNDS</span>
        </li>
        <li class="legendary">
          <strong class="number">20</strong>
          <span>LEGENDARY<br />ITEMS</span>
        </li>
        <li class="epic">
          <strong class="number">76</strong>
          <span>EPIC<br />ITEMS</span>
        </li>
        <li class="rare">
          <strong class="number">4</strong>
          <span>RARE<br />ITEMS</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundSeason2',
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
.banner-dsp {
  --banner-height: 460px;
  --banner-boxsize: 102px;
  --banner-inner-width: 582px;

  height: var(--banner-height);
  background: url('https://file.mir4global.com/xdraco/img/desktop/banner-dsp/bg-banner-dsp.webp') 50% 0 / auto 100% no-repeat;
  color: #fff;

  &__inner {
    margin: 0 auto;
    width: var(--banner-inner-width);
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
        background-image: url('https://file.mir4global.com/xdraco/img/desktop/banner-dsp/bg-legendary-badge.webp');

        &::before {
          content: none;
        }
      }
      &.epic,
      &.grade-4 {
        background-image: url('https://file.mir4global.com/xdraco/img/desktop/banner-dsp/bg-epic-badge.webp');

        &::before {
          content: none;
        }
      }
      &.rare,
      &.grade-3 {
        background-image: url('https://file.mir4global.com/xdraco/img/desktop/banner-dsp/bg-rare-badge.webp');

        &::before {
          content: none;
        }
      }
    }
  }

  .is-mobile & {
    --banner-height: 300px;
    --banner-boxsize: 64px;
    --banner-inner-width: 582px;

    padding: 0 var(--intro-draco-padding);
    width: 100%;
    background-image: url('https://file.mir4global.com/xdraco/img/mobile/banner-dsp/bg-banner-dsp.webp');

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
  }
}
</style>
