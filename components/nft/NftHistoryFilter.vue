<template>
  <v-select
    class="select-filter"
    :placeholder="placeholder"
    :value="historyFilter[filterKey]"
    :items="filterItems"
    :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
    dark
    dense
    outlined
    @change="change"
  ></v-select>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState, useMutations } = createNamespacedHelpers('nft');
const { useState: useCollectibleState, useMutations: useCollectibleMutations } = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'NftHistoryFilter',
  props: {
    placeholder: {
      type: String,
    },
    filterKey: {
      type: String,
    },
    filterItems: {
      type: Array,
      default: () => [],
    },
  },
  setup({ filterKey }) {
    const { historyFilter } = useState(['historyFilter']);
    const { setHistoryFilter } = useMutations(['setHistoryFilter']);

    const change = (value) => {
      const changedFilter = historyFilter.value;
      changedFilter[filterKey] = value;

      setHistoryFilter({ ...changedFilter });
    };

    return {
      historyFilter,
      change,
    };
  },
});
</script>
