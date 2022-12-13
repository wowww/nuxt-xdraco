<template>
  <div class="coin">
    <nuxt-link to="/coin/price">
      <div class="coin__name">
        <div class="name">WEMIX / DRACO</div>
      </div>
      <div class="coin__volume">
        <span class="amount wemix">
          {{ dracoWemix | currency(4) }}
        </span>
        <span class="change" :class="{ plus: dracoWemixChange > 0, minus: dracoWemixChange < 0 }">
          {{ dracoWemixChange > 0 ? '+' : '' }}{{ dracoWemixChange === 0 ? dracoWemixChange.toFixed(0) : dracoWemixChange.toFixed(2) }}%
        </span>
      </div>
      <div v-if="dracoDate" class="coin__date">{{ dracoDate }}</div>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { useGetters, useState } from 'vuex-composition-helpers/dist';

import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'DracoWemixDraco',
  setup(_, { root }) {
    const { $i18n } = root;
    const { dracoRate } = useState(['dracoRate']);
    const { dracoWemix, dracoWemixChange } = useGetters(['dracoWemix', 'dracoWemixChange']);

    const dracoDate = computed(() => {
      if (dracoRate.value) {
        return root.$t('date.format.decoration', [dateFormatFromString(dracoRate.value.CreatedDT)]);
      }

      return null;
    });

    return {
      dracoWemix,
      dracoWemixChange,
      dracoDate,
    };
  },
});
</script>
