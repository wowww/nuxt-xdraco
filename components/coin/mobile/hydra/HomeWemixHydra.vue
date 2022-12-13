<template>
  <v-carousel-item content-class="d-flex justify-center align-center">
    <div class="coin">
      <nuxt-link to="/coin/price">
        <div class="coin__name">
          <div class="name">WEMIX / HYDRA</div>
        </div>
        <div class="coin__volume">
          <span class="amount wemix">
            {{ hydraWemix | currency(4) }}
          </span>
          <span class="change" :class="{ plus: hydraWemixChange > 0, minus: hydraWemixChange < 0 }">
            {{ hydraWemixChange > 0 ? '+' : '' }}{{ hydraWemixChange === 0 ? hydraWemixChange.toFixed(0) : hydraWemixChange.toFixed(2) }}%
          </span>
        </div>
        <div v-if="hydraDate" class="coin__date">{{ hydraDate }}</div>
      </nuxt-link>
    </div>
  </v-carousel-item>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useGetters, useState } from 'vuex-composition-helpers/dist';

import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'HomeWemixHydra',
  setup(_, { root }) {
    const { $i18n } = root;
    const { hydraRate } = useState(['hydraRate']);
    const { hydraWemix, hydraWemixChange } = useGetters(['hydraWemix', 'hydraWemixChange']);

    const hydraDate = computed(() => {
      if (hydraRate.value) {
        return root.$t('date.format.decoration', [dateFormatFromString(hydraRate.value.CreatedDT)]);
      }
      return null;
    });

    return {
      hydraRate,
      hydraWemix,
      hydraWemixChange,
      hydraDate,
    };
  },
});
</script>
