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
  name: 'ListFilter',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    filterKey: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup({ filterKey }) {
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
