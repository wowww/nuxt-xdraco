<template>
  <v-carousel-item>
    <span title="USD">${{ hydraUsdPrev | currency(4) }} USD</span>
  </v-carousel-item>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useGetters } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'PriceUsdHydraPrev',
  setup() {
    const { hydraUsdPrev } = useGetters(['hydraUsdPrev']);
    return {
      hydraUsdPrev,
    };
  },
});
</script>
