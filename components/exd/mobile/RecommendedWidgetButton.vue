<template>
  <div class="wrap-button">
    <button type="button" class="btn btn-price-exd" @click="goToDetail">
      <exd-hydra-price :price="price" :hide-label="true" icon-size="ss" />
    </button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import { useFormattedNumber } from '@/utils/composables/common';
import { useToUsd } from '@/utils/composables/exchange';

export default defineComponent({
  name: 'RecommendedWidgetButton',
  components: { ExdHydraPrice },
  props: {
    tradeUid: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '0',
    },
  },
  setup(props, { root }) {
    const { $router } = root;
    const formattedPrice = useFormattedNumber(props.price);
    const { usd } = useToUsd(props.price);

    const goToDetail = () => {
      $router.push(`/exd/trade/${props.tradeUid}`);
    };

    return {
      formattedPrice,
      usd,
      goToDetail,
    };
  },
});
</script>
