<template>
  <div class="hsp-banner">
    <div class="hsp-banner__wrapper">
      <h2 class="hsp-banner--title">{{ $t('t.hsp') }}</h2>
      <p class="hsp-banner--description">{{ $t('s.banner-hsp-top.desc') }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';
import '@/assets/sass/common/pages/hsp/_hsp-top.scss';

export default defineComponent({
  name: 'HspTop',
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

