<template>
  <div class="coin">
    <nuxt-link to="/coin/price">
      <div>
        <div class="coin__name">
          <div class="name">WEMIX / HYDRA</div>
        </div>
        <div class="coin__volume">
          <span class="amount wemix">{{ hydraWemix | currency(4) }}</span>
          <span class="change" :class="{ plus: hydraWemixChange > 0, minus: hydraWemixChange < 0 }">
            {{ hydraWemixChange > 0 ? '+' : '' }}{{ hydraWemixChange && hydraWemixChange.toFixed(2) }}%
          </span>
        </div>
      </div>
      <div class="coin__date">{{ $t('date.format.decoration', [hydraRate ? hydraRate.CreatedDT : '']) }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useState, useGetters } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'WemixHydra',
  setup() {
    const { hydraRate } = useState(['hydraRate']);
    const { hydraWemix, hydraWemixChange } = useGetters(['hydraWemix', 'hydraWemixChange']);

    return {
      hydraRate,
      hydraWemix,
      hydraWemixChange,
    };
  },
});
</script>
