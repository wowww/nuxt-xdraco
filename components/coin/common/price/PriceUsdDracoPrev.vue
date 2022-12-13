<template>
  <v-carousel-item>
    <span title="USD">${{ dracoUsdPrev | currency(defaultNumberDigits) }} USD</span>
  </v-carousel-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceUsdDracoPrev',
  computed: {
    ...mapGetters(['defaultNumberDigits', 'dracoUsdPrev']),
  },
};
</script>
