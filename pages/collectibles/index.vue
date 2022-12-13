<template>
  <main class="contents collectible">
    <banner-collectible-top />

    <section class="section">
      <div class="section__inner">
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="exchange-list for-list">
              <top-traded-title v-if="collectiblesTopTradedItems.length > 2" collectibles />
              <top-traded-widget v-if="collectiblesTopTradedItems.length > 2" collectibles />

              <div class="list-bar">
                <div class="list-bar__title">
                  {{ $t('w.collectible.items') }}
                  <span v-if="itemsTotal > 0" class="list-bar__total">{{ itemsTotal | currency(0) }}</span>
                </div>
                <v-tabs v-show="false" class="list-bar__tab" background-color="transparent">
                  <v-tab>All</v-tab>
                  <v-tab>Dark Steel</v-tab>
                </v-tabs>
              </div>

              <!-- Filter -->
              <div id="wrapFilterList" class="wrap-filter">
                <div class="wrap-filter__inner">
                  <list-filter
                    :placeholder="`${$t('w.common.item.class')}`"
                    filter-key="class"
                    :items="[
                      { text: `${$t('w.common.item.class')} (${$t('w.common.all')})`, value: 0 },
                      { text: $t('w.rounds.item.class.1'), value: 1 },
                      { text: $t('w.rounds.item.class.2'), value: 2 },
                      { text: $t('w.rounds.item.class.3'), value: 3 },
                      { text: $t('w.rounds.item.class.5'), value: 5 },
                      { text: $t('w.rounds.item.class.4'), value: 4 },
                    ]"
                  />
                  <list-filter
                    :placeholder="`${$t('w.common.item.type')}`"
                    filter-key="itemType"
                    :items="[
                      { text: `${$t('w.common.item.type')} (${$t('w.common.all')})`, value: '0' },
                      { text: $t('w.exd.item-type.2_1'), value: '2_1' },
                      { text: $t('w.exd.item-type.2_2'), value: '2_2' },
                      { text: $t('w.exd.item-type.2_3'), value: '2_3' },
                      { text: $t('w.exd.item-type.2_5'), value: '2_5' },
                      { text: $t('w.exd.item-type.2_4'), value: '2_4' },
                      { text: $t('w.exd.item-type.3_1.base'), value: '3_1' },
                      { text: $t('w.exd.item-type.3_2.base'), value: '3_2' },
                      { text: $t('w.exd.item-type.3_3.base'), value: '3_3' },
                      { text: $t('w.exd.item-type.3_4.base'), value: '3_4' },
                      { text: $t('w.exd.item-type.4_1'), value: '4_1' },
                      { text: $t('w.exd.item-type.4_2'), value: '4_2' },
                      { text: $t('w.exd.item-type.4_3'), value: '4_3' },
                      // { text: $t('w.exd.item-type.4_4'), value: '4_4' },
                      { text: $t('w.exd.item-type.6_33'), value: '6_33' },
                      { text: $t('w.exd.item-type.8_1'), value: '8_1' },
                      { text: $t('w.exd.item-type.8_2'), value: '8_2' },
                      { text: $t('w.exd.item-type.8_3'), value: '8_3' },
                      { text: $t('w.exd.item-type.8_4'), value: '8_4' },
                      { text: $t('w.exd.item-type.8_5'), value: '8_5' },
                      { text: $t('w.exd.item-type.8_6'), value: '8_6' },
                      { text: $t('w.exd.item-type.8_7'), value: '8_7' },
                      // { text: $t('w.exd.item-type.8_8'), value: '8_8' },
                      { text: $t('w.exd.item-type.17_2'), value: '17_2' },
                      // { text: $t('w.exd.item-type.20_1'), value: '20_1' },
                      { text: $t('w.exd.item-type.21_1'), value: '21_1' },
                      { text: $t('w.exd.item-type.21_2'), value: '21_2' },
                    ]"
                  />
                  <list-filter
                    :placeholder="`${$t('w.common.item.grade')}`"
                    filter-key="grade"
                    :items="[
                      { text: `${$t('w.common.item.grade')} (${$t('w.common.all')})`, value: 0 },
                      { text: $t('w.rounds.item.grade.5'), value: 5 },
                      { text: $t('w.rounds.item.grade.4'), value: 4 },
                      { text: $t('w.rounds.item.grade.3'), value: 3 },
                      { text: $t('w.rounds.item.grade.2'), value: 2 },
                    ]"
                  />
                  <list-filter
                    :placeholder="`${$t('w.common.item.tier')}`"
                    filter-key="tier"
                    :items="[
                      { text: `${$t('w.common.item.tier')} (${$t('w.common.all')})`, value: 0 },
                      { text: 'IV', value: 4 },
                      { text: 'III', value: 3 },
                      { text: 'II', value: 2 },
                      { text: 'I', value: 1 },
                    ]"
                  />
                  <list-filter
                    :placeholder="`${$t('w.common.item.enhance')}`"
                    filter-key="enhance"
                    :items="[
                      { text: `${$t('w.common.item.enhance')} (${$t('w.common.all')})`, value: -1 },
                      { text: '+0', value: 0 },
                      { text: '+1', value: 1 },
                      { text: '+2', value: 2 },
                      { text: '+3', value: 3 },
                      { text: '+4', value: 4 },
                      { text: '+5', value: 5 },
                      { text: '+6', value: 6 },
                      { text: '+7', value: 7 },
                      { text: '+8', value: 8 },
                      { text: '+9', value: 9 },
                      { text: '+10', value: 10 },
                      { text: '+11', value: 11 },
                      { text: '+12', value: 12 },
                    ]"
                    style="margin-right: 16px"
                  />
                  <div v-show="false" class="wrap-price-range">
                    <button type="button" class="wrap-price-range__btn" @click="toogleLayerPriceRange">Price Range</button>
                    <div v-if="showLayerPriceRange" class="layer-price-range">
                      <div class="wrap-range">
                        <v-text-field
                          id="inputFrom"
                          v-model="minDraco"
                          type="number"
                          class="input-range"
                          label="From"
                          prepend-inner-icon="mdi-map-marker"
                          dense
                          solo
                          flat
                          hide-spin-buttons
                        />
                        <v-text-field
                          v-model="maxDraco"
                          type="number"
                          class="input-range"
                          label="To"
                          prepend-inner-icon="mdi-map-marker"
                          dense
                          solo
                          flat
                          hide-spin-buttons
                        />
                      </div>
                      <div class="wrap-button">
                        <button type="button" class="btn btn-primary2 btn-sm" :disabled="invalidatePrice" @click="applyPrice">Apply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="wrap-filter-chip">
                <div class="wrap-chips">
                  <v-chip v-if="filter.class !== 0" outlined label @click="resetFilter('class', 0)">
                    {{ $t(`w.rounds.item.class.${filter.class}`) }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <v-chip v-if="filter.itemType !== '0'" outlined label @click="resetFilter('itemType', '0')">
                    {{ $t(`w.exd.item-type.${filter.itemType}${filter.itemType.startsWith('3_') ? '.base' : ''}`) }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <v-chip v-if="filter.grade !== 0" outlined label @click="resetFilter('grade', 0)">
                    {{ $t(`w.rounds.item.grade.${filter.grade}`) }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <v-chip v-if="filter.tier !== 0" outlined label @click="resetFilter('tier', 0)">
                    Tier {{ filter.tier | roman }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <v-chip v-if="filter.enhance !== -1" outlined label @click="resetFilter('enhance', -1)">
                    + {{ filter.enhance }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <v-chip v-if="filter.sort !== 'latest'" outlined label @click="resetFilter('sort', 'latest')">
                    {{ $t(`w.exd.filter.order.${filter.sort}`) }}
                    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
                  </v-chip>

                  <div v-if="hasFilter" class="btn-filter-reset" @click="resetAllFilter(1)">
                    <span>Reset</span>
                    <img src="https://file.mir4global.com/xdraco/img/common/btn-reset-filter.webp" width="16" />
                  </div>

                  <div class="filter-divider"></div>
                </div>
                <list-order collectible />
              </div>
              <!-- Item List -->
              <ul class="list-item wrap-card" :data-empty-message="items && items.length > 0 ? '' : $t('s.exd.sale.no-item')" style="margin-top: 24px">
                <exchange-item
                  v-for="item in items"
                  :key="`exchange-item-${item.tradeUID}`"
                  use-link
                  :exchange-item="item"
                  :card-size="isDesktop ? 'sm' : 'xs'"
                  collectible
                />
              </ul>

              <div v-if="itemsHasMore && !loading" class="wrap-button">
                <button type="button" class="btn-viewmore" @click="fetchCollectibleItems(itemsPage + 1)">VIEW MORE</button>
              </div>
            </div>
          </div>

          <div class="wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BannerCollectibleTop from '@/components/banner/CollectibleTop';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ExchangeItem from '@/components/exd/common/ExchangeItem';
import TopTradedTitle from '@/components/exd/common/TopTradedTitle';
import ListFilter from '@/components/exd/common/ListFilter';
import ListOrder from '@/components/exd/desktop/ListOrder';
import TopTradedWidget from '@/components/exd/common/TopTradedWidget';

const { useState: useSearchState, useMutations: useSearchMutations, useActions: useSearchActions } = createNamespacedHelpers('search');

const {
  useState: useCollectibleState,
  useActions: useCollectibleActions,
  useMutations: useCollectibleMutations,
} = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'CollectibleList',
  meta: {
    title: 'COLLECTIBLES | XDRACO',
    hasSubNav: 'collectibles',
  },
  components: {
    BannerCollectibleTop,
    TopTradedWidget,
    TopTradedTitle,
    ListOrder,
    ListFilter,
    ExchangeItem,
    AccountInfo,
    SidebarContactUs,
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { filter } = useSearchState(['filter']);
    const { setFilter } = useSearchMutations(['setFilter']);
    const { resetAllFilter } = useSearchActions(['resetAllFilter']);

    const showLayerPriceRange = ref(false);
    const {
      loading,
      items,
      itemsHasMore,
      itemsPage,
      itemsTotal,
      topTradedItems: collectiblesTopTradedItems,
      recentlyItems: collectiblesRecentlyItems,
    } = useCollectibleState(['loading', 'items', 'itemsHasMore', 'itemsPage', 'itemsTotal', 'topTradedItems', 'recentlyItems']);
    const { fetchCollectibleItems, fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectibleActions([
      'fetchCollectibleItems',
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);
    const { dracoAccessToken, isDesktop } = useState(['dracoAccessToken', 'isDesktop']);

    const changeSort = ref(false);
    const minDraco = ref('');
    const maxDraco = ref('');

    const refresh = () => {
      fetchCollectibleItems();
      fetchCollectiblesRecently();
      fetchCollectiblesTopTraded();
    };

    onMounted(() => {
      resetAllFilter(1);
      refresh();
    });

    watch(
      () => filter.value,
      (current, before) => {
        if (current.sort !== before.sort) {
          changeSort.value = true;
        }
        fetchCollectibleItems();
      },
    );

    watch(
      () => $i18n.locale,
      () => {
        refresh();
      },
    );

    watch(
      () => dracoAccessToken.value,
      () => {
        refresh();
      },
    );

    const invalidatePrice = computed(() => {
      if (!minDraco.value || !maxDraco.value) {
        return true;
      }
      return Number(maxDraco.value) < Number(minDraco.value);
    });

    const applyPrice = () => {
      if (!invalidatePrice.value) {
        setFilter({ ...filter.value, minPrice: minDraco.value, maxPrice: maxDraco.value });
        showLayerPriceRange.value = false;
      }
    };

    watch(
      () => showLayerPriceRange.value,
      (open) => {
        if (open) {
          minDraco.value = filter.value.minPrice;
          maxDraco.value = filter.value.maxPrice;
        }
      },
    );

    const hasFilter = computed(() => {
      if (filter.value.class !== 0) {
        return true;
      }

      if (filter.value.itemType !== '0') {
        return true;
      }

      if (filter.value.grade !== 0) {
        return true;
      }

      if (filter.value.tier !== 0) {
        return true;
      }

      if (filter.value.enhance !== -1) {
        return true;
      }

      return filter.value.sort !== 'latest';


    });

    const resetFilter = (type, initValue) => {
      const value = { ...filter.value };
      value[type] = initValue;
      setFilter(value);
    };

    return {
      isDesktop,
      filter,
      resetFilter,
      resetAllFilter,
      hasFilter,
      changeSort,
      items,
      itemsHasMore,
      itemsPage,
      itemsTotal,
      fetchCollectibleItems,
      minDraco,
      maxDraco,
      invalidatePrice,
      applyPrice,
      showLayerPriceRange,
      loading,
      collectiblesTopTradedItems,
      collectiblesRecentlyItems,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  methods: {
    toogleLayerPriceRange() {
      this.showLayerPriceRange = !this.showLayerPriceRange;

      setTimeout(() => {
        if (this.showLayerPriceRange) {
          const inputFrom = this.$el.querySelector('#inputFrom');
          inputFrom.focus();
        }
      }, 10);
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/common/pages/collectibles/_collectibles-detail';
@import '~@/assets/sass/components/_list-detail';
</style>
