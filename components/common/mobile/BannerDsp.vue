<template>
  <div class="banner-dsp">
    <NavDsp></NavDsp>
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

import NavDsp from '@/components/common/mobile/NavDsp';

export default defineComponent({
  name: 'BannerDsp',
  components: {
    NavDsp,
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
