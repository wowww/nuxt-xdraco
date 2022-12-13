<template>
  <ul
    class="list-item"
    :class="{ 'recommended rank': recommendedItems && recommendedItems.length > 0 }"
    :data-empty-message="recommendedItems && recommendedItems.length > 0 ? '' : $t('s.exd.sale.no-item')"
  >
    <exchange-item
      v-for="(item, itemIdx) in recommendedItems"
      :key="`recommended-item-${item.tradeUID}`"
      :exchange-item="item"
      :rank="itemIdx"
      :collectible="!!item.item.uniqueNo"
    />
  </ul>
</template>

<script>
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ExchangeItem from '@/components/exd/common/ExchangeItem';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');
export default defineComponent({
  name: 'RecommendedWidget',
  components: { ExchangeItem },
  setup(_, { root }) {
    const { $i18n } = root;
    const { recommendedItems } = useExdState(['recommendedItems']);
    const { fetchRecommended } = useExdActions(['fetchRecommended']);

    watch(
      () => $i18n.locale,
      () => {
        fetchRecommended();
      },
    );

    return {
      recommendedItems,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
