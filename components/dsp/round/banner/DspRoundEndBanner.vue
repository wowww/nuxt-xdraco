<template>
  <div class="dsp-rounds__banner">
    <div class="dsp-rounds__banner__inner">
      <p class="dsp-rounds__banner__desc"><span>DSP SEASON 3 WILL RETURN</span><br />with more unique XDRACO items!</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundEndBanner',
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

<style lang="scss">
@import '~@/assets/sass/common/pages/dsp/dsp-round';
</style>
