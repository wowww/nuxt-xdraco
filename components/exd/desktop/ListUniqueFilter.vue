<template>
  <div class="filter-check" @click="change">
    <img v-if="filter.uniqueFlag === 0" class="filter-check-img" src="https://file.mir4global.com/xdraco/img/common/ico-check-off.webp" alt="" />
    <img v-else class="filter-check-img" src="https://file.mir4global.com/xdraco/img/common/ico-check-on.webp" alt="" />
    <span class="filter-check-label">{{ $t('w.exd.collectible') }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState, useMutations } = createNamespacedHelpers('search');

export default defineComponent({
  name: 'ListUniqueFilter',
  props: {
    recently: {
      type: Boolean,
      default: false,
    },
  },
  setup({ recently }) {
    const { filter } = useState(['filter']);
    const { setFilter } = useMutations(['setFilter']);

    const change = () => {
      const changedFilter = { ...filter.value };
      changedFilter.uniqueFlag = filter.value.uniqueFlag === 0 ? 1 : 0;

      setFilter(changedFilter);
    };

    return {
      filter,
      change,
    };
  },
});
</script>
