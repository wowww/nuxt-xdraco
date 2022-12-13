<template>
  <div class="exchange-main-banner">
    <div class="exchange-main-banner__inner">
      <h2 class="bi-exd">EXD</h2>
      <p class="message">Exchange your XDRACO items by DRACO</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'ExchangeMainBanner',
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


