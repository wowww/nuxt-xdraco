<template>
  <div class="item-transprice">
    <span>{{ title }}</span>
    <div class="wrap-price">
      <div class="price">
        <strong class="ico-hydra ico-sm add-inside"
        >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
        >
        <span class="us-dollar"
        >{{ formattedUsd[0] }}<small>{{ formattedUsd[1] }}</small></span
        >
      </div>
      <time v-if="price > 0" :date="date">{{ formattedDate }}</time>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';

import { useFormattedNumber } from '@/utils/composables/common';
import { useToUsd } from '@/utils/composables/exchange';
import { useDay } from '@/utils/composables/round';

export default defineComponent({
  name: 'ItemStat',
  props: {
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    date: {
      type: Number,
    },
  },
  setup({ price, date }, { root }) {
    const { $i18n } = root;
    const formattedDate = ref('');

    const formattedPrice = useFormattedNumber(price);
    const { usd, formattedUsd } = useToUsd(price);

    watch(
      () => $i18n.locale,
      () => {
        formattedDate.value = useDay(date).format(root.$t('w.rounds.date.format'));
      },
    );

    onMounted(() => {
      formattedDate.value = useDay(date).format(root.$t('w.rounds.date.format'));
    });

    return {
      formattedDate,
      formattedPrice,
      formattedUsd,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  }
});
</script>


