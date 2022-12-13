<template>
  <div class="list-bar">
    <div class="list-bar__title">{{ $t('t.exd.recommended') }}</div>
    <v-tabs v-show="false" class="list-bar__tab" background-color="transparent">
      <v-tab>Legendary</v-tab>
      <v-tab>Epic</v-tab>
      <v-tab>Rare</v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RecommendedTitle',
});
</script>
