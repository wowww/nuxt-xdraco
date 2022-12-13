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
    @click="$emit('click')"
    @change="change"
  ></v-select>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState, useMutations } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftListOrder',
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
    collectible: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const state = reactive({
      items: [
        { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
        { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
        { text: root.$t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
        { text: root.$t('w.exd.filter.order.pricelow'), value: 'pricelow' },
        { text: root.$t('w.exd.filter.order.lvhigh'), value: 'lvhigh' },
        { text: root.$t('w.exd.filter.order.pshigh'), value: 'pshigh' },
      ],
    });

    const { itemsFilter } = useNftState(['itemsFilter']);
    const { setItemsFilter } = useMutations(['setItemsFilter']);

    const itemValue = computed(() => {
      return state.items.find((item) => item.value === itemsFilter.value.sort);
    });

    const change = (value) => {
      const changedFilter = { ...itemsFilter.value };
      changedFilter.sort = value.value;

      setItemsFilter(changedFilter);
    };

    watch(
      () => $i18n.locale,
      () => {
        state.items = [
          { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
          { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
          { text: root.$t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
          { text: root.$t('w.exd.filter.order.pricelow'), value: 'pricelow' },
          { text: root.$t('w.exd.filter.order.lvhigh'), value: 'lvhigh' },
          { text: root.$t('w.exd.filter.order.pshigh'), value: 'pshigh' },
        ];
      },
    );

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
