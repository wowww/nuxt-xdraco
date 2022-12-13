import { defineComponent, onMounted, onUnmounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BannerExdTop from '@/components/banner/ExdTop';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import MyItemsOrder from '@/components/exd/common/my/MyItemsOrder';
import MyItemsTab from '@/components/exd/common/my/MyItemsTab';
import MyItem from '@/components/exd/common/MyItem';
import { MyItemTab } from '@/constants/exchange';

const { useState: useAccountState } = createNamespacedHelpers('account');
const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'ExdMyItemList',
  components: {
    BannerExdTop,
    MyItem,
    MyItemsOrder,
    MyItemsTab,
    AccountInfo,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const { $i18n, $router } = root;
    const { dracoAccessToken } = useState(['dracoAccessToken']);
    const { loading, myItems, myItemTab, myItemsMore, myItemsPage } = useExdState(['loading', 'myItems', 'myItemTab', 'myItemsMore', 'myItemsPage']);
    const { exist } = useAccountState(['exist']);
    const { setMyItemTab } = useExdMutations(['setMyItemTab']);
    const { fetchMyItems } = useExdActions(['fetchMyItems']);

    watch(
      () => myItemTab.value,
      () => {
        fetchMyItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        fetchMyItems();
      },
    );

    watch(
      () => dracoAccessToken.value,
      (current, before) => {
        if (before && !current) {
          $router.push('/exd/list');
        }
      },
    );

    onMounted(() => {
      setMyItemTab(MyItemTab.SALE);
      if (myItemTab.value === MyItemTab.SALE) {
        if (exist.value === 1) {
          fetchMyItems();
        }
      }
    });

    onUnmounted(() => {
      setMyItemTab(MyItemTab.SALE);
    });

    return {
      MyItemTab,
      loading,
      myItems,
      myItemTab,
      myItemsMore,
      myItemsPage,
      fetchMyItems,
      exist,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
