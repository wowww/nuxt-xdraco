<template>
  <div class="coin">
    <nuxt-link to="/coin/price">
      <div class="coin__name">
        <div class="name">
          {{ $t('t.smelting-cost') }}<br /><span>({{ $t('s.smelting-cost.fee') }})</span>
        </div>
      </div>
      <div class="coin__volume">
        <span class="amount">{{ todayCost | currency(0) }}</span>
        <sup class="sup ml-1">DS</sup>
        <span class="change" :class="{ plus: rate > 0, minus: rate < 0 }">
          <template v-if="rate === 0">{{ Number(rate).toFixed(0) }}%</template>
          <template v-else-if="rate < 0">{{ Number(rate).toFixed(0) }}%</template>
          <template v-else-if="rate > 0">+{{ Number(rate).toFixed(0) }}%</template>
        </span>
      </div>
      <div class="coin__date">{{ $t('s.smelting-cost.updated') }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'DracoSmeltingCost',
  setup() {
    const { smeltingFee, derby } = useState(['smeltingFee', 'derby']);

    const todayCost = computed(() => {
      const [today] = derby.value.slice(-1);
      if (!today) return 0;

      return Number(today.DS) + (today.SmeltingCost ? Number(today.SmeltingCost) : smeltingFee.value);
    });

    const yesterdayCost = computed(() => {
      const [yesterday] = derby.value.slice(-2, -1);
      if (!yesterday) return 0;

      return Number(yesterday.DS) + (yesterday.SmeltingCost ? Number(yesterday.SmeltingCost) : 1000);
    });

    const rate = computed(() => {
      return ((todayCost.value - yesterdayCost.value) / yesterdayCost.value) * 100;
    });

    return {
      smeltingFee,
      derby,
      todayCost,
      rate,
    };
  },
});
</script>
