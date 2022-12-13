<template>
  <div class="banner-mirage-top">
    <div class="banner-mirage-top__inner" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageTop',
  components: {
    //
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  // setup() {
  //   //
  // },
});
</script>

<style lang="scss" scoped>
.banner-mirage-top {
  --banner-height: 460px;

  position: relative;
  background: #040227 url('https://file.mir4global.com/xdraco/img/desktop/mirage/bg-mirage-top.webp') 50% 0 / auto 100% no-repeat;
  height: var(--banner-height);

  .banner-mirage-top__inner {
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
    --banner-height: 300px;

    width: 100%;
    background-image: url('https://file.mir4global.com/xdraco/img/mobile/mirage/bg-mirage-top.webp');

    .banner-mirage-top__inner {
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
</style>
