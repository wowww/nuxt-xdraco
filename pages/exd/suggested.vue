<template>
  <main class="contents market">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button/>
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="exchange-market">
              <div class="wrap-suggest suggested">
                <div class="wrap-suggest__header">
                  <div class="wrap-suggest__item">
                    <item-info :item="exchangeItem && exchangeItem.item"/>
                  </div>
                </div>
                <div class="wrap-suggest__contents">
                  <div class="wrap-filter">
                    <v-select
                      class="select-filter orderby"
                      :items="sortItems"
                      :menu-props="{ bottom: true, offsetY: true, contentClass: 'select-filter-layer' }"
                      persistent-hint
                      return-object
                      single-line
                      dark
                      dense
                      outlined
                      :value="sort"
                      @change="changeSort"
                    ></v-select>
                  </div>
                  <ul class="wrap-suggest__list">
                    <li v-if="!isDesktop" class="wrap-suggest__list__header">
                      <em class="price">{{ $t('w.exd.sales.price') }}</em>
                      <em class="enhance">{{ $t('w.common.item.enhance') }}</em>
                      <em class="score">{{ $t('t.exd.power.score') }}</em>
                      <em class="seller">Seller ID</em>
                    </li>
                    <suggested-item
                      v-for="(item, itemIdx) in suggestedTradeItems"
                      :key="`suggested-item-${item.tradeUID}-${itemIdx}`"
                      :suggest-item="item"
                      class="wrap-suggest__list__contents"
                    />
                  </ul>
                </div>

                <div v-if="suggestedTradeItemsMore" class="wrap-button" @click="fetchOtherTrades(page + 1)">
                  <button type="button" class="btn-viewmore">VIEW MORE</button>
                </div>
              </div>
            </div>
          </div>

          <div class="wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info/>
              <sidebar-contact-us/>
            </aside>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {computed, defineComponent, onMounted, reactive, toRefs, watch} from '@vue/composition-api';
import {createNamespacedHelpers, useState} from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ItemInfo from '@/components/exd/common/ItemInfo';
import SuggestedItem from '@/components/exd/common/SuggestedItem';

const {
  useState: useExdState,
  useActions: useExdActions,
  useMutations: useExdMutations
} = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'ExdSuggestList',
  meta: {
    title: 'EXD | XDRACO',
    hasSubNav: 'exd',
  },
  components: {
    BackButton,
    SuggestedItem,
    ItemInfo,
    AccountInfo,
    SidebarContactUs,
  },
  setup(props, {root}) {
    const { $dracoWebApi, $route, $router, $i18n } = root;
    const { itemID, enhance } = $route.query;

    const state = reactive({
      stat: null,
      page: 1,
      suggestedTradeItems: [],
      suggestedTradeItemsMore: false,
      sort: 'latest',
      sortItems: [
        {text: root.$t('w.exd.filter.order.latest'), value: 'latest'},
        {text: root.$t('w.exd.filter.order.oldest'), value: 'oldest'},
      ],
    });

    const {
      exchangeItem,
    } = useExdState(['loading', 'exchangeItem', 'price', 'exdErrorCode']);

    const { isDesktop } = useState(['isDesktop']);

    const sortValue = computed(() => {
      return state.sortItems.find((item) => item.value === state.sort);
    });

    const changeSort = (value) => {
      state.sort = value;
    };

    const fetchOtherTrades = (page = 1) => {
      $dracoWebApi
        .get('/exd/sameitem/lists', {
          params: {
            itemID,
            enhance: enhance || '0',
            sort: state.sort.value,
            page: page || 1
          }
        })
        .then(({data}) => {
          if (data.code === 200) {
            state.page = page;
            if (data.data.lists) {
              if (page > 1) {
                state.suggestedTradeItems = [...state.suggestedTradeItems, ...data.data.lists];
              } else {
                state.suggestedTradeItems = [...data.data.lists];
              }
            }
            state.suggestedTradeItemsMore = data.data.more || false;
          }
        });
    };

    onMounted(() => {
      if (!exchangeItem.value || !itemID) {
        $router.replace('/exd/list');
      }

      fetchOtherTrades();
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchOtherTrades();
      },
    );

    watch(
      () => state.sort,
      () => {
        fetchOtherTrades();
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      exchangeItem,
      sortValue,
      changeSort,
      fetchOtherTrades,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/exchange-market';
</style>
