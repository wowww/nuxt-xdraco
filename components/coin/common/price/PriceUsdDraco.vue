<template>
  <v-carousel-item>
    <dl class="display-price">
      <dt>USD / DRACO</dt>
      <dd>
        <span class="amount">${{ dracoUsd | currency(defaultNumberDigits) }} </span>
        <span class="change" :class="{ plus: dracoUsdChange > 0, minus: dracoUsdChange < 0 }">
          {{ dracoUsdChange > 0 ? '+' : '' }}{{ dracoUsdChange.toFixed(2) }}%
        </span>
      </dd>
    </dl>
  </v-carousel-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceUsdDraco',
  computed: {
    ...mapGetters(['defaultNumberDigits', 'dracoUsd', 'dracoUsdChange']),
  },
};
</script>
