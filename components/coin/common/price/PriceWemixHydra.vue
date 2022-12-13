<template>
  <v-carousel-item>
    <dl class="display-price">
      <dt>WEMIX / HYDRA</dt>
      <dd>
        <span class="amount wemix">{{ hydraWemix | currency(4) }}</span>
        <span class="change" :class="{ plus: hydraWemixChange > 0, minus: hydraWemixChange < 0 }">
          {{ hydraWemixChange > 0 ? '+' : '' }}{{ hydraWemixChange.toFixed(2) }}%
        </span>
      </dd>
    </dl>
  </v-carousel-item>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useGetters } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'PriceWemixHydra',
  setup() {
    const { hydraWemix, hydraWemixChange } = useGetters(['hydraWemix', 'hydraWemixChange']);

    return {
      hydraWemix,
      hydraWemixChange,
    };
  },
});
</script>
