<template>
  <div class="nft-top-banner">
    <div class="nft-top-banner__inner">
      <h2 class="nft-top-banner__img bi-banner">NFT</h2>
      <p class="nft-top-banner__headline bi-headline">My Character, Your Legacy</p>
    </div>

    <div class="nft-top-banner__video wrap-video">
      <video id="videoBannerNft" ref="videoBannerNft" :src="videoUrl" class="video" preload loop muted playsinline autoplay />
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, toRefs, watch} from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";

export default defineComponent({
  name: 'NftTopVideo',
  components: {
    // DspNav,
  },
  setup({ root }) {
    const { isDesktop } = useState(['isDesktop']);
    const staticHost = process.env.VUE_APP_STATIC_HOST + '/xdraco-dsp/video';
    const state = reactive({
      videoUrl: isDesktop.value ? staticHost + '/desktop/bg-nft-top.mp4'
        : staticHost + '/mobile/bg-nft-top.mp4',
    });

    watch(() => isDesktop.value,
      () => {
        state.videoUrl = isDesktop.value ? staticHost + '/desktop/bg-nft-top.mp4'
          : staticHost + '/mobile/bg-nft-top.mp4'
    });

    return {
      ...toRefs(state),
      isDesktop,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/common/pages/nft/nft-top-banner';
</style>
