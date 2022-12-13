<template>
  <ul
    class="list-item"
    :class="{ recommended: items && items.length > 0, rank: selectedWidget === 0 }"
    :data-empty-message="items && items.length > 0 ? '' : $t('s.exd.sale.no-item')"
  >
    <exchange-item
      v-for="(item, itemIdx) in items.slice(0, 3)"
      :key="`top-widget-item-${itemIdx}`"
      :exchange-item="item"
      :use-rank="selectedWidget === 0"
      use-top
      use-relative-date
      :rank="itemIdx"
    />
  </ul>
</template>

<script>
import { computed, defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ExchangeItem from '~/components/exd/common/ExchangeItem';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'TopTradedWidget',
  components: { ExchangeItem },
  setup(_, { root }) {
    const { $i18n } = root;
    const { selectedWidget, topTradedItems, recentlyItems } = useExdState([
      'selectedWidget',
      'topTradedItems',
      'recentlyItems',
    ]);
    const { fetchTopTraded, fetchRecently } = useExdActions(['fetchTopTraded', 'fetchRecently']);

    const items = computed(() => {
      if (selectedWidget.value === 0) {
        return topTradedItems.value;
      }
      return recentlyItems.value;
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchTopTraded();
        fetchRecently();
      },
    );

    return {
      selectedWidget,
      items,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
