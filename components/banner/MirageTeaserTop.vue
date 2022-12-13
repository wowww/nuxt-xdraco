<template>
  <div class="teaser-mirage-top">
    <div class="teaser-mirage-top__inner" />
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageTeaserTop',
  components: {
    // DspNav,
  },
  setup() {
    onBeforeMount(() => {
      //
    });
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
});
</script>

<style lang="scss" scoped>
.teaser-mirage-top {
  --banner-height: 600px;

  position: relative;
  background: url('https://file.mir4global.com/xdraco/img/desktop/mirage/bg-mirage-teaser.webp') 50% 0 / (3200 / 2 + px) auto no-repeat;
  height: var(--banner-height);
  background-color: #000000;

  &__inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    color: #fff;
  }

  // for Mobile
  .is-mobile & {
    width: 100%;
    height: 396px;
    background: url('https://file.mir4global.com/xdraco/img/mobile/mirage/bg-mirage-teaser.webp') 50% 0 / (1920 / 2 + px) auto no-repeat;

    .teaser-mirage-top__inner {
      width: 100%;
      p {
        margin-top: 9px;
        line-height: 20px;
      }
    }
    &::after {
      display: none;
    }
  }
}

@media screen and (max-width: 959px) {
  .teaser-mirage-top {
    .is-mobile & {
      height: 264px;
      background-size: auto 100%;
    }
  }
}
</style>
