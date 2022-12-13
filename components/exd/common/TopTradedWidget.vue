<template>
  <ul
    class="list-item"
    :class="{ recommended: items && items.length > 0, rank: selectedTab === 0 }"
    :data-empty-message="loading || (items && items.length) > 0 ? '' : $t('s.exd.sale.no-item')"
  >
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <exchange-item
      v-for="(item, itemIdx) in items.slice(0, 3)"
      v-else
      :key="`${collectibles ? 'collectibles' : 'exd'}-${selectedTab === 0 ? 'top-traded' : 'recently'}-${itemIdx}`"
      :exchange-item="item"
      :use-rank="selectedTab === 0"
      use-top
      use-relative-date
      :rank="itemIdx"
      use-info
      :collectible="!!item.item.uniqueNo"
    />
  </ul>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import ExchangeItem from '~/components/exd/common/ExchangeItem';

const { useState: useExdState, useMutations: useExdMutations, useActions: useExdActions } = createNamespacedHelpers('exd');
const {
  useState: useCollectiblesState,
  useMutations: useCollectiblesMutations,
  useActions: useCollectiblesActions,
} = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'TopTradedWidget',
  components: { ExchangeItem },
  props: {
    collectibles: {
      type: Boolean,
      default: false,
    },
  },
  setup({ collectibles }, { root }) {
    const { $i18n } = root;
    const {
      selectedTab: exdSelectedTab,
      topTradedLoading: exdTopTradedLoading,
      recentlyLoading: exdRecentlyLoading,
      topTradedItems: exdTopTradedItems,
      recentlyItems: exdRecentlyItems,
    } = useExdState(['selectedTab', 'topTradedLoading', 'recentlyLoading', 'topTradedItems', 'recentlyItems']);
    const { fetchTopTraded: fetchExdTopTraded, fetchRecently: fetchExdRecently } = useExdActions(['fetchTopTraded', 'fetchRecently']);

    const {
      selectedTab: collectiblesSelectedTab,
      topTradedLoading: collectiblesTopTradedLoading,
      recentlyLoading: collectiblesRecentlyLoading,
      topTradedItems: collectiblesTopTradedItems,
      recentlyItems: collectiblesRecentlyItems,
    } = useCollectiblesState(['selectedTab', 'topTradedLoading', 'recentlyLoading', 'topTradedItems', 'recentlyItems']);
    const { fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectiblesActions([
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);

    const state = reactive({
      items: [],
    });

    const selectedTab = computed(() => {
      if (collectibles) {
        return collectiblesSelectedTab.value;
      }

      return exdSelectedTab.value;
    });

    const loading = computed(() => {
      if (collectibles) {
        if (collectiblesSelectedTab === 0) {
          return collectiblesTopTradedLoading.value;
        }
        return collectiblesRecentlyLoading.value;
      }
      if (exdSelectedTab === 0) {
        return exdTopTradedLoading.value;
      }
      return exdRecentlyLoading.value;
    });

    const fetch = () => {
      if (collectibles) {
        fetchCollectiblesTopTraded();
        fetchCollectiblesRecently();
      } else {
        fetchExdTopTraded();
        fetchExdRecently();
      }
    };

    const loadCollectiblesItems = () => {
      if (collectiblesSelectedTab.value === 0) {
        state.items = collectiblesTopTradedItems.value;
      } else {
        state.items = collectiblesRecentlyItems.value;
      }
    };

    const loadExdItems = () => {
      if (exdSelectedTab.value === 0) {
        state.items = exdTopTradedItems.value;
      } else {
        state.items = exdRecentlyItems.value;
      }
    };

    const loadItems = () => {
      state.items = [];
      if (collectibles) {
        loadCollectiblesItems();
      } else {
        loadExdItems();
      }
    };

    watch([exdSelectedTab, collectiblesSelectedTab], () => {
      loadItems();
    });

    watch(
      () => loading.value,
      () => {
        loadItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetch();
      },
    );

    watch(
      () => exdTopTradedItems.value,
      () => {
        loadItems();
      },
    );

    watch(
      () => collectiblesTopTradedItems.value,
      () => {
        loadItems();
      },
    );

    onMounted(() => {
      fetch();
    });

    return {
      loading,
      selectedTab,
      ...toRefs(state),
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
