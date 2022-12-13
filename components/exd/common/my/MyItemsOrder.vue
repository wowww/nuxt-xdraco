<template>
  <div id="wrapFilterList" class="wrap-filter">
    <v-select
      class="select-filter orderby"
      attach="#wrapFilterList .v-select--is-menu-active"
      :value="myItemsOrder"
      :items="items"
      :menu-props="{ bottom: true, offsetY: true }"
      :placeholder="'my-items-order'"
      item-text="title"
      item-value="abc"
      persistent-hint
      return-object
      single-line
      dark
      dense
      @change="setMyItemsOrder"
      outlined
    ></v-select>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState, useMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'MyItemsOrder',
  setup(_, { root }) {
    const { $i18n } = root;
    const items = [
      { text: root.$t('w.exd.filter.order.latest'), value: 'latest' },
      { text: root.$t('w.exd.filter.order.oldest'), value: 'oldest' },
      { text: root.$t('w.exd.filter.order.pricehigh'), value: 'pricehigh' },
      { text: root.$t('w.exd.filter.order.pricelow'), value: 'pricelow' },
    ];
    const { myItemsOrder } = useState(['myItemsOrder']);
    const { setMyItemsOrder } = useMutations(['setMyItemsOrder']);

    return { items, myItemsOrder, setMyItemsOrder };
  },
});
</script>
