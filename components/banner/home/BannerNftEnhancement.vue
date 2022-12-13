<template>
  <div class="banner banner__enhancement">
    <div class="banner__wrapper">
      <h2 class="banner__enhancement--image">NFT ENHANCEMENT</h2>
      <p class="banner__message">
        <span class="banner__message--break">Enhance your character using </span>
        <span class="banner__message--break">Mirage Scrolls</span>
      </p>
      <nuxt-link to="/mirage/my" class="banner--link" @click.native="changeMirageTab">NFT Enhancement</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'BannerNftEnhancement',
  setup() {
    const { useMirageActions } = useMirageStore();
    const { fetchMyMirageCurrentTab } = useMirageActions(['fetchMyMirageCurrentTab']);

    const changeMirageTab = () => {
      fetchMyMirageCurrentTab(1);
    };

    return {
      changeMirageTab,
    };
  },
});
</script>
