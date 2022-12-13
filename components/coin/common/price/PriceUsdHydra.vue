<template>
  <v-carousel-item>
    <dl class="display-price">
      <dt>USD / HYDRA</dt>
      <dd>
        <span class="amount">${{ hydraUsd | currency(defaultNumberDigits) }} </span>
        <span class="change" :class="{ plus: hydraUsdChange > 0, minus: hydraUsdChange < 0 }">
          {{ hydraUsdChange > 0 ? '+' : '' }}{{ hydraUsdChange.toFixed(2) }}%
        </span>
      </dd>
    </dl>
  </v-carousel-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceUsdHydra',
  computed: {
    ...mapGetters(['defaultNumberDigits', 'hydraUsd', 'hydraUsdChange']),
  },
};
</script>
