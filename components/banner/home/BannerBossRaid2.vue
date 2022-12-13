<template>
  <div class="banner banner__boss-raid">
    <div class="banner__wrapper">
      <h2 class="banner__boss-raid--title">Mirage</h2>
      <p class="banner-boss-raid__message">BOSS RAID SEASON 2</p>
      <nuxt-link to="/mirage/dashboard" class="banner--link">MIRAGE Boss Raid</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BannerBossRaid2',
});
</script>

<style lang="scss" scoped>
.banner-boss-raid {
  --banner-height: 460px;
  --inner-width: 660px;

  height: var(--banner-height);
  line-height: normal;
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: auto 100%;
  background-image: url('https://file.mir4global.com/xdraco/img/desktop/banner-boss-raid/bg-banner.webp'), linear-gradient(to bottom, #030227, #030227),
  linear-gradient(to bottom, #784237 0%, #96593d 41%, #1b1e27 56%, #0c2532 73%);
  color: #fff;
  box-sizing: border-box;
  text-align: center;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-top: 140px;
    width: var(--inner-width);
    height: 100%;
  }

  &__title {
    width: 236px;
    height: 68px;
    background: url('https://file.mir4global.com/xdraco/img/desktop/banner-boss-raid/bi-logo.webp') 0 0 / cover no-repeat;
    font-size: 0;
  }

  &__message {
    margin-top: 8px;
    line-height: normal;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: -0.96px;
    background-image: linear-gradient(to bottom, #ff001f 0%, #f60 100%), linear-gradient(to bottom, #f00 0%, #f60 100%), linear-gradient(to bottom, #fff, #fff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__link {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 220px;
    height: 48px;
    padding: 0 32px 0 44px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to bottom, #dd714e 0%, #620 100%);
    border-image-slice: 1;
    background-image: linear-gradient(to right, #620 0%, #f40 51%, #620 100%);
    font-weight: 700;
    font-size: 16px;
    box-sizing: border-box;
    margin-top: 32px;

    &::after {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      margin-left: 4px;
      background: url('https://file.mir4global.com/xdraco/img/desktop/banner-mirage/icon-link-arrow.webp') no-repeat 0 0 / 100%;
    }
  }
  .is-mobile & {
    --banner-height: 400px;
    --inner-width: 320px;

    background-image: url('https://file.mir4global.com/xdraco/img/mobile/banner-boss-raid/bg-banner.webp'),
    radial-gradient(circle at 50% 50%, rgba(3, 2, 39, 0.25), #030227 92%);

    &__inner {
      padding-top: 120px;
    }

    &__title {
      width: 158px;
      height: 45px;
      background-image: url('https://file.mir4global.com/xdraco/img/mobile/banner-boss-raid/bi-logo.webp');
    }

    &__message {
      font-size: 24px;
      letter-spacing: -0.48px;
    }

    &__link {
      margin-top: 40px;
      margin-bottom: 0;
      padding: 0 12px 0 24px;
    }
  }
}
</style>
