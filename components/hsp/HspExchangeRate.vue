<template>
  <v-carousel class="currency-volume" height="auto" :show-arrows="false" interval="2000" cycle vertical hide-delimiters>
    <v-carousel-item>
      <span class="volume wemix"
        >{{ wemix[0] }}<span v-if="wemix[1]" class="decimal-point">{{ wemix[1] }}</span></span
      >
    </v-carousel-item>
    <v-carousel-item>
      <span class="volume dollar"
        >{{ usd[0] }}<span v-if="usd[1]" class="decimal-point">{{ usd[1] }}</span></span
      >
    </v-carousel-item>
    <v-carousel-item>
      <span class="volume wemix"
        >{{ wemix[0] }}<span v-if="wemix[1]" class="decimal-point">{{ wemix[1] }}</span></span
      >
    </v-carousel-item>
    <v-carousel-item>
      <span class="volume dollar"
        >{{ usd[0] }}<span v-if="usd[1]" class="decimal-point">{{ usd[1] }}</span></span
      >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { separateDecimalPoint } from '@/utils/filters/numeric';

const { useState } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'HspExchangeRate',
  props: {
    amount: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { price } = useState(['price']);

    const wemix = computed(() => {
      const value = Number(props.amount) * Number(price.value.HydraPrice);

      return separateDecimalPoint(value);
    });

    const usd = computed(() => {
      const value = Number(props.amount) * Number(price.value.USDHydraRate);

      return separateDecimalPoint(value);
    });

    return {
      price,
      wemix,
      usd,
    };
  },
});
</script>
