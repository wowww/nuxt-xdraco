<template>
  <div class="coin">
    <nuxt-link to="/coin/price">
      <div class="coin__name">
        <div class="name">USD / DRACO</div>
      </div>
      <div class="coin__volume">
        <span class="amount">${{ dracoUsd | currency(4) }} </span>
        <span class="change" :class="{ plus: dracoUsdChange > 0, minus: dracoUsdChange < 0 }">
          {{ dracoUsdChange > 0 ? '+' : '' }}{{ dracoUsdChange === 0 ? dracoUsdChange.toFixed(0) : dracoUsdChange.toFixed(2) }}%
        </span>
      </div>
      <div v-if="dracoDate" class="coin__date">{{ dracoDate }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api/dist/vue-composition-api';
import { useGetters, useState } from 'vuex-composition-helpers/dist';

import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'DracoUsdDraco',
  setup(_, { root }) {
    const { $i18n } = root;
    const { dracoRate } = useState(['dracoRate']);
    const { dracoUsd, dracoUsdChange } = useGetters(['dracoUsd', 'dracoUsdChange']);

    const dracoDate = computed(() => {
      if (dracoRate.value) {
        return root.$t('date.format.decoration', [dateFormatFromString(dracoRate.value.CreatedDT)]);
      }

      return null;
    });

    return {
      dracoUsd,
      dracoUsdChange,
      dracoDate,
    };
  },
});
</script>
