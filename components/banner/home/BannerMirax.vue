<template>
  <div class="banner banner__mirax">
    <div class="banner__wrapper">
      <h2 class="banner__mirax--title">MiraX</h2>
      <p class="banner__mirax--message">New growth system for characters <br />of the MIRAGE world.</p>
      <nuxt-link to="/mirage/dashboard" class="banner__mirax--link banner--link">MIRAGE MiraX</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BannerMirax',
});
</script>
