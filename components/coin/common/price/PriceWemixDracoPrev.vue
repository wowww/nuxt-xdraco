<template>
  <v-carousel-item>
    <span title="WEMIX">{{ dracoWemixPrev | currency(defaultNumberDigits) }} WEMIX</span>
  </v-carousel-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceWemixDracoPrev',
  computed: {
    ...mapGetters(['defaultNumberDigits', 'dracoWemixPrev']),
  },
};
</script>
