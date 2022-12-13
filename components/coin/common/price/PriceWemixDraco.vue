<template>
  <v-carousel-item>
    <dl class="display-price">
      <dt>WEMIX / DRACO</dt>
      <dd>
        <span class="amount wemix">{{ dracoWemix | currency(defaultNumberDigits) }}</span>
        <span class="change" :class="{ plus: dracoWemixChange > 0, minus: dracoWemixChange < 0 }">
          {{ dracoWemixChange > 0 ? '+' : '' }}{{ dracoWemixChange.toFixed(2) }}%
        </span>
      </dd>
    </dl>
  </v-carousel-item>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PriceWemixDraco',
  computed: {
    ...mapGetters(['defaultNumberDigits', 'dracoWemix', 'dracoWemixChange']),
  },
};
</script>
