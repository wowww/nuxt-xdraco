<template>
  <div class="char-info">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">{{ seller.walletAddress | truncateMiddle }}</span>
      </template>
      <span>{{ seller.walletAddress }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ItemSeller',
  props: {
    seller: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

