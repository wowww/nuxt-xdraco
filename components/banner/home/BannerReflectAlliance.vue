<template>
  <div class="banner banner__reflect-alliance">
    <div class="banner__wrapper">
      <span class="banner__image banner__image--reflect-alliance">HYDRA & DRACO</span>
      <p class="banner--title">
        <span class="banner--title-sub">Celebrating founding members of</span>
        <em class="banner--title-main">the REFLECT ALLIANCE</em>
        <em class="banner--title-main">HYDRA & DRACO</em>
      </p>
      <a href="https://wemixplay.com/reflect/fusion" class="banner--link" target="_blank">FUSION NOW</a>
    </div>
  </div>
</template>

<script>
import MobileDetect from 'mobile-detect';
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'BannerWimix',
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    md: new MobileDetect(window.navigator.userAgent),
  }),
  computed: {
    getDracoHost() {
      return process.env.VUE_APP_DRACO_HOST;
    },
  },
});
</script>
