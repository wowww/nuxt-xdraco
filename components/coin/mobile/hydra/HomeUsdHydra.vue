<template>
  <v-carousel-item content-class="d-flex justify-center align-center">
    <div class="coin">
      <nuxt-link to="/coin/price">
        <div class="coin__name">
          <div class="name">USD / HYDRA</div>
        </div>
        <div class="coin__volume">
          <span class="amount">${{ hydraUsd | currency(4) }} </span>
          <span class="change" :class="{ plus: hydraUsdChange > 0, minus: hydraUsdChange < 0 }">
            {{ hydraUsdChange > 0 ? '+' : '' }}{{ hydraUsdChange === 0 ? hydraUsdChange.toFixed(0) : hydraUsdChange.toFixed(2) }}%
          </span>
        </div>
        <div v-if="hydraDate" class="coin__date">{{ hydraDate }}</div>
      </nuxt-link>
    </div>
  </v-carousel-item>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useState, useGetters } from 'vuex-composition-helpers/dist';

import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'HomeUsdHydra',
  setup(_, { root }) {
    const { $i18n } = root;
    const { hydraRate } = useState(['hydraRate']);
    const { hydraUsd, hydraUsdChange } = useGetters(['hydraUsd', 'hydraUsdChange']);

    const hydraDate = computed(() => {
      if (hydraRate.value) {
        return root.$t('date.format.decoration', [dateFormatFromString(hydraRate.value.CreatedDT)]);
      }
      return null;
    });

    return {
      hydraRate,
      hydraUsd,
      hydraUsdChange,
      hydraDate,
    };
  },
});
</script>
