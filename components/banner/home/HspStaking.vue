<template>
  <div class="banner banner__hsp">
    <div class="banner__wrapper">
      <h2 class="banner__hsp--title">{{ $t('t.hsp') }}</h2>
      <p class="banner__hsp--message">{{ $t('s.hsp-staking.banner.desc') }}</p>
      <nuxt-link to="/hsp" class="banner__hsp--link banner--link">{{ $t('s.hsp-staking.banner.link') }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HspStaking',
  components: {
    //
  },
});
</script>
