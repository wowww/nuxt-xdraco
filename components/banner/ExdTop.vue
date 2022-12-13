<template>
  <div class="exd-list__banner">
    <div class="exd-list__banner__inner">
      <h2 class="exd-list__banner__bi">EXD</h2>
      <p class="exd-list__banner__msg">Exchange your XDRACO items by DRACO</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'ExdTop',
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
