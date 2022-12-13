<template>
  <div class="banner-mirage">
    <div class="banner-mirage__inner">
      <h2 class="banner-title">MULTIVERSE OF MIR4</h2>
      <p class="sub-desc">{{ $t('s.banner-mirage.multiverse1') }}</p>
      <p class="desc">{{ $t('s.banner-mirage.multiverse2') }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageMultiverse',
});
</script>

<style lang="scss" scoped>
.banner-mirage {
  --banner-height: 460px;
  --inner-width: 660px;

  height: var(--banner-height);
  line-height: normal;
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: auto 100%;
  background-color: #0c0c29;
  background-image: url('https://file.mir4global.com/xdraco/img/desktop/banner-mirage-multiverse/bg-banner-open.webp');
  color: #fff;
  box-sizing: border-box;

  .banner-mirage__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-top: 97px;
    width: var(--inner-width);
    height: 100%;
  }
  .banner-title {
    width: 328px;
    height: 138px;
    font-size: 0;
    background: url('https://file.mir4global.com/xdraco/img/desktop/banner-mirage-multiverse/logo-mirage.webp') 0 0 / cover no-repeat;
  }
  .sub-desc {
    margin-top: 42px;
    line-height: 28px;
    font-size: 24px;
    font-weight: 500;
    background-image: linear-gradient(to bottom, #f00 0%, #f60 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .desc {
    margin-top: 4px;
    line-height: 47px;
    font-size: 40px;
    font-weight: bold;
    background-image: linear-gradient(to bottom, #f00 0%, #f60 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .is-mobile & {
    --banner-height: 400px;
    --inner-width: 320px;

    background-image: url('https://file.mir4global.com/xdraco/img/mobile/banner-mirage-multiverse/bg-banner-open.webp'),
      linear-gradient(to bottom, #784237 0%, #96593d 39%, #1b1e27 56%, #0c2532 73%), linear-gradient(to bottom, #180b14, #180b14);
    text-align: center;

    .banner-mirage__inner {
      padding-top: 98px;

      .banner-title {
        width: 262px;
        height: 110px;
        font-size: 0;
        background: url('https://file.mir4global.com/xdraco/img/mobile/banner-mirage-multiverse/logo-mirage.webp') 0 0 / cover no-repeat;
      }
      .sub-desc {
        margin-top: 29px;
        line-height: 19px;
        font-size: 16px;
      }
      .desc {
        margin-top: 4px;
        line-height: 28px;
        font-size: 24px;
      }
    }
  }
}
</style>
