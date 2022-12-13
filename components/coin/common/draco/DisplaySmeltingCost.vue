<template>
  <dl class="display-price">
    <dt>
      {{ $t('t.smelting-cost') }}<span class="sub-title">{{ $t('s.smelting-cost.fee') }}</span>
    </dt>
    <dd>
      <span v-if="isShowSymbol" class="symbol">
        <img src="https://file.mir4global.com/xdraco/img/desktop/symbol-draco.webp" width="56" alt="DRACO" />
        <span>{{ valueShowSymbol }}</span>
        <span class="eqaul">=</span>
      </span>
      <span class="amount">{{ todayCost | currency(0) }}</span>
      <sup class="sup">DS</sup>
      <span class="change" :class="{ plus: rate > 0, minus: rate < 0 }">
        <template v-if="rate === 0"> {{ Number(rate).toFixed(0) }}%</template>
        <template v-else-if="rate < 0">{{ Number(rate).toFixed(0) }}%</template>
        <template v-else-if="rate > 0">+{{ Number(rate).toFixed(0) }}%</template>
      </span>
    </dd>
  </dl>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'DisplaySmeltingCost',
  props: {
    isShowSymbol: {
      type: Boolean,
      default: false,
    },
    valueShowSymbol: {
      type: Number,
      required: false,
      default: () => 1,
    },
  },
  setup() {
    const { smeltingFee, derby } = useState(['smeltingFee', 'derby']);

    const todayCost = computed(() => {
      const today = derby.value.slice(-1)[0];
      if (!today) return 0;

      return Number(today.DS) + (today.SmeltingCost ? Number(today.SmeltingCost) : smeltingFee.value);
    });

    const yesterdayCost = computed(() => {
      const yesterday = derby.value.slice(-2, -1)[0];
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
