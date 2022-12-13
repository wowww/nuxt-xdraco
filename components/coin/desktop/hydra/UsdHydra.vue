<template>
  <div class="coin">
    <nuxt-link to="/coin/price">
      <div>
        <div class="coin__name">
          <div class="name">USD / HYDRA</div>
        </div>
        <div class="coin__volume">
          <span class="amount">${{ hydraUsd | currency(4) }}</span>
          <span class="change" :class="{ plus: hydraUsdChange > 0, minus: hydraUsdChange < 0 }">
            {{ hydraUsdChange > 0 ? '+' : '' }}{{ hydraUsdChange && hydraUsdChange.toFixed(2) }}%
          </span>
        </div>
      </div>
      <div class="coin__date">{{ $t('date.format.decoration', [hydraRate ? hydraRate.CreatedDT : '']) }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useGetters, useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'UsdHydra',
  setup() {
    const { hydraRate } = useState(['hydraRate']);
    const { hydraUsd, hydraUsdChange } = useGetters(['hydraUsd', 'hydraUsdChange']);

    return {
      hydraRate,
      hydraUsd,
      hydraUsdChange,
    };
  },
});
</script>
