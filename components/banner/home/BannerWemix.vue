<template>
  <div class="banner banner__wemix">
    <div class="banner__wrapper">
      <h2 class="banner__wemix--title">Wemix Play</h2>
      <p class="banner__wemix--message">
        <span class="banner__wemix--message-space">GRAND OPEN </span>
        <span class="banner__wemix--message-space">Get Ready to Play!</span>
      </p>
      <a href="https://www.wemixplay.com" class="banner--link" target="_blank">WEMIXPLAY.COM</a>
    </div>
  </div>
</template>

<script>
import MobileDetect from 'mobile-detect';
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'BannerWemix',
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
