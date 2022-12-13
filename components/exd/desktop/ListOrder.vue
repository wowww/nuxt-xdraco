<template>
  <v-select
    class="select-filter orderby"
    :attach="attach"
    :items="items"
    :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
    persistent-hint
    return-object
    single-line
    dark
    dense
    outlined
    :value="itemValue"
    @change="change"
  />
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useSearchState, useMutations: useSearchMutations } = createNamespacedHelpers('search');

export default defineComponent({
  name: 'ListOrder',
  props: {
    attach: {
      type: String,
      required: false,
    },
    menuProps: {
      type: Object,
      required: false,
      default() {
        return { bottom: true, offsetY: true };
      },
    },
    hidePrice: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root }) {
    const { $i18n } = root;

    const state = reactive({
      items: [
        { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
        { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
      ],
    });

    const { filter } = useSearchState(['filter']);
    const { setFilter } = useSearchMutations(['setFilter']);

    const itemValue = computed(() => {
      return state.items.find((item) => item.value === filter.value.sort);
    });

    const change = (value) => {
      const changedFilter = { ...filter.value };
      changedFilter.sort = value.value;

      setFilter(changedFilter);
    };

    watch(
      () => $i18n.locale,
      () => {
        if (props.hidePrice) {
          state.items = [
            { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
            { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
          ];
        } else {
          state.items = [
            { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
            { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
            { text: root.$t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
            { text: root.$t('w.exd.filter.order.pricelow'), value: 'pricelow' },
          ];
        }
      },
    );

    onMounted(() => {
      if (!props.hidePrice) {
        state.items = [
          ...state.items,
          { text: root.$t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
          { text: root.$t('w.exd.filter.order.pricelow'), value: 'pricelow' },
        ];
      }
    });

    return {
      itemValue,
      ...toRefs(state),
      change,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
<style lang="scss"></style>
