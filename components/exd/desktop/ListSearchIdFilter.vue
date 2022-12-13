<template>
  <v-select
    :key="`list-filter-${filterKey}`"
    class="select-filter"
    :placeholder="placeholder"
    :value="filter[filterKey]"
    :items="items"
    :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
    dark
    dense
    outlined
    :disabled="disabled"
    @change="change"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState, useMutations } = createNamespacedHelpers('search');

export default defineComponent({
  name: 'ListSearchIdFilter',
  props: {
    placeholder: {
      type: String,
    },
    filterKey: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
    collectible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup({ collectible, filterKey }) {
    const { filter } = useState(['filter']);
    const { setFilter } = useMutations(['setFilter']);

    const change = (value) => {
      const changedFilter = { ...filter.value };
      changedFilter[filterKey] = value;

      setFilter(changedFilter);
    };

    return {
      filter,
      change,
    };
  },
});
</script>
