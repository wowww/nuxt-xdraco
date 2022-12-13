<template>
  <div class="list-bar">
    <v-tabs :value="value" class="list-bar__traded" background-color="transparent" @change="onChange">
      <v-tab>{{ $t('t.exd.top.traded') }}</v-tab>
      <v-tab>{{ $t('t.exd.recent.traded') }}</v-tab>
    </v-tabs>
    <nuxt-link to="/nft/history" class="list-bar__more">{{ $t('w.rounds.view.more') }}</nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftListTabBar',
  props: {
    value: {
      type: Number,
      defalut: 0,
    },
  },
  methods: {
    onChange(value) {
      this.$emit('input', value);
    },
  },
});
</script>


