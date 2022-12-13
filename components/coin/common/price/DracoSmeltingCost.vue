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
      <span class="amount">
        <template v-if="todayDerby">{{ todayCost | currency(0) }}</template>
        <template v-else>--</template>
      </span>
      <sup class="sup">DS</sup>
      <span class="change" :class="{ plus: rate > 0, minus: rate < 0 }"> {{ rate > 0 ? '+' : '' }}{{ Number(rate).toFixed(0) }}% </span>
    </dd>
  </dl>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'PriceSmeltingCost',
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

    const todayDerby = computed(() => {
      if (!derby.value || derby.value.length === 0) {
        return null;
      }

      return derby.value.slice(-1)[0];
    });

    const todayCost = computed(() => {
      if (!todayDerby.value) {
        return smeltingFee.value;
      }
      return Number(todayDerby.value.DS) + (todayDerby.value.SmeltingCost ? Number(todayDerby.value.SmeltingCost) : smeltingFee.value);
    });

    const yesterdayDerby = computed(() => {
      if (!derby.value || derby.value.length === 0) {
        return null;
      }

      return derby.value.slice(-2, -1)[0];
    });

    const yesterdayCost = computed(() => {
      if (!yesterdayDerby.value) {
        return 1000;
      }

      return Number(yesterdayDerby.value.DS) + (yesterdayDerby.value.SmeltingCost ? Number(yesterdayDerby.value.SmeltingCost) : 1000);
    });

    const rate = computed(() => {
      return ((todayCost.value - yesterdayCost.value) / yesterdayCost.value) * 100;
    });

    return {
      smeltingFee,
      derby,
      todayDerby,
      todayCost,
      yesterdayCost,
      rate,
    };
  },
});
</script>
