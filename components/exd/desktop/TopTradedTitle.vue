<template>
  <div class="list-bar">
    <div class="list-bar__title">{{ $t('t.exd.top.traded') }}</div>
    <nuxt-link :to="collectibles ? '/collectibles/history' : '/exd/history'" class="list-bar__more">{{ $t('w.rounds.view.more') }}</nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TopTradedTitle',
  props: {
    collectibles: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
