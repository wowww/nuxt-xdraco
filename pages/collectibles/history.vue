<template>
  <main class="contents collectible-history">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="exd-ranking exchange-list myitem-list for-list">
              <v-tabs :value="selectedTab" class="tab-rounds" background-color="transparent" @change="setSelectedTab">
                <v-tab class="tab-rounds__item">{{ $t('t.exd.top.traded') }}</v-tab>
                <v-tab class="tab-rounds__item">{{ $t('t.exd.recent.traded') }}</v-tab>
              </v-tabs>
              <div v-if="selectedTab === 0" class="exd-ranking-list">
                <top-traded-item
                  v-for="(item, itemIdx) in topTradedItems.slice(0, topTradedPage * 10)"
                  :key="`collectible-top-traded-item-${itemIdx}`"
                  :rank="itemIdx"
                  :top-traded-item="item"
                />
                <ul v-if="topTradedItems.length === 0" class="list" :data-empty-message="$t('s.exd.sale.no-item')"></ul>

                <div v-if="topTradedPage * 10 < topTradedItems.length && topTradedPage < 10" class="wrap-button">
                  <button type="button" class="btn-viewmore" @click="setTopTradedPage(topTradedPage + 1)">VIEW MORE</button>
                </div>
              </div>

              <div v-else class="wrap-suggest">
                <div id="wrapFilterList" class="wrap-filter">
                  <div class="wrap-filter__inner">
                    <list-filter
                      :placeholder="$t('w.common.item.class')"
                      filter-key="class"
                      :items="[
                        { text: `${$t('w.common.item.class')} (${$t('w.common.all')})`, value: 0 },
                        { text: $t('w.rounds.item.class.1'), value: 1 },
                        { text: $t('w.rounds.item.class.2'), value: 2 },
                        { text: $t('w.rounds.item.class.3'), value: 3 },
                        { text: $t('w.rounds.item.class.5'), value: 5 },
                        { text: $t('w.rounds.item.class.4'), value: 4 },
                      ]"
                      collectible
                    />
                    <list-filter
                      :placeholder="$t('w.common.item.type')"
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
                      collectible
                    />
                    <list-filter
                      :placeholder="$t('w.common.item.grade')"
                      filter-key="grade"
                      :items="[
                        { text: `${$t('w.common.item.grade')} (${$t('w.common.all')})`, value: 0 },
                        { text: $t('w.rounds.item.grade.5'), value: 5 },
                        { text: $t('w.rounds.item.grade.4'), value: 4 },
                        { text: $t('w.rounds.item.grade.3'), value: 3 },
                        { text: $t('w.rounds.item.grade.2'), value: 2 },
                      ]"
                      collectible
                    />
                    <list-filter
                      :placeholder="$t('w.common.item.tier')"
                      filter-key="tier"
                      :items="[
                        { text: `${$t('w.common.item.tier')} (${$t('w.common.all')})`, value: 0 },
                        { text: 'IV', value: 4 },
                        { text: 'III', value: 3 },
                        { text: 'II', value: 2 },
                        { text: 'I', value: 1 },
                      ]"
                      collectible
                    />
                    <list-filter
                      :placeholder="$t('w.common.item.enhance')"
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
                      collectible
                      style="margin-right: 16px"
                    />
                    <div v-show="false" class="wrap-price-range">
                      <button type="button" class="wrap-price-range__btn" @click="showLayerPriceRange = !showLayerPriceRange">Price Range</button>
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
                </div>
                <div class="wrap-suggest__contents">
                  <ul class="wrap-suggest__list" :data-empty-message="$t('s.exd.sale.no-item')">
                    <li v-for="(item, itemIdx) in recentlyItems" :key="`collectibles-recently-${itemIdx}`" @click="showItemCard(itemIdx)">
                      <item-info :item="item.item" use-info />
                      <dl class="price">
                        <dt>{{ $t('t.exd.purchased.price') }}</dt>
                        <dd>
                          <strong class="ico-hydra ico-ss add-inside"
                          ><span>{{ item.price | currency(2) }}</span></strong
                          >
                        </dd>
                      </dl>
                      <dl class="seller">
                        <dt>{{ $t('w.exd.seller') }}</dt>
                        <dd>
                          <v-tooltip bottom>
                            <template #activator="{ on, attrs }">
                              <div v-bind="attrs" v-on="on">{{ item.walletAddress || item.seller.walletAddress | truncateMiddle }}</div>
                            </template>
                            <div>{{ item.walletAddress || item.seller.walletAddress }}</div>
                          </v-tooltip>
                        </dd>
                      </dl>
                      <dl class="date">
                        <dt>{{ $t('t.exd.tx.date') }}</dt>
                        <dd>{{ item.endTime | fromNow(locale) }}</dd>
                      </dl>
                    </li>
                  </ul>
                  <div v-if="recentlyMore" class="wrap-button">
                    <button type="button" class="btn-viewmore" @click="fetchCollectiblesRecently(recentlyPage + 1)">VIEW MORE</button>
                  </div>
                  <v-dialog v-model="openCard" content-class="dialog-card">
                    <v-card v-if="recentlyItems.length > 0 && selectedItemIdx > -1">
                      <item-card
                        ref="card"
                        :item="recentlyItems[selectedItemIdx].item"
                        use-info
                        :collectible="!!recentlyItems[selectedItemIdx].item.uniqueNo"
                      />
                      <button type="button" class="btn-close-dialog" @click="cardClose">Close Dialog</button>
                    </v-card>
                  </v-dialog>
                </div>
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
import { defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch, onBeforeMount } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import ItemCard from '@/components/common/item/ItemCard';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import ItemInfo from '@/components/exd/common/ItemInfo';
import ListFilter from '@/components/exd/common/ListFilter';
import TopTradedItem from '@/components/exd/desktop/TopTradedItem';

const {
  useState: useSearchState,
  useGetters: useSearchGetters,
  useMutations: useSearchMutations,
  useActions: useSearchActions,
} = createNamespacedHelpers('search');

const {
  useState: useCollectiblesState,
  useActions: useCollectiblesActions,
  useMutations: useCollectiblesMutations,
} = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'CollectibleItem',
  meta: {
    title: 'COLLECTIBLES | XDRACO',
    hasSubNav: 'collectibles',
    hasBottomSticky: 'type1',
  },
  components: { ItemCard, ItemInfo, BackButton, TopTradedItem, AccountInfo, SidebarContactUs, ListFilter },
  setup(_, { root }) {
    const { $i18n } = root;
    const card = ref(null);
    const state = reactive({
      openCard: false,
      selectedItemIdx: -1,
      showLayerPriceRange: false,
    });
    const { filter } = useSearchState(['filter']);
    const { hasFilter } = useSearchGetters(['hasFilter']);
    const { setFilter } = useSearchMutations(['setFilter']);
    const { resetAllFilter } = useSearchActions(['resetAllFilter']);

    const { selectedTab, topTradedLoading, topTradedItems, topTradedPage, recentlyItems, recentlyMore, recentlyPage } = useCollectiblesState([
      'selectedTab',
      'topTradedLoading',
      'topTradedItems',
      'topTradedPage',
      'recentlyItems',
      'recentlyMore',
      'recentlyPage',
    ]);
    const { fetchCollectiblesTopTraded, fetchCollectiblesRecently } = useCollectiblesActions([
      'fetchCollectiblesTopTraded',
      'fetchCollectiblesRecently',
    ]);
    const { setSelectedTab, setTopTradedPage } = useCollectiblesMutations(['setSelectedTab', 'setTopTradedPage']);

    watch(
      () => $i18n.locale,
      () => {
        fetchCollectiblesTopTraded();
        fetchCollectiblesRecently();
      },
    );

    const showItemCard = (idx) => {
      state.selectedItemIdx = idx;
      if (card.value && card.value.reset) {
        card.value.reset();
      }
      state.openCard = true;
    };

    const cardClose = () => {
      state.openCard = false;
      if (card.value.reset) {
        card.value.reset();
      }
    };

    watch(
      () => filter.value,
      (current, before) => {
        fetchCollectiblesRecently();
      },
    );

    const resetFilter = (type, initValue) => {
      const value = { ...filter.value };
      value[type] = initValue;
      setFilter(value);
    };

    onBeforeMount(() => {
      document.documentElement.classList.add('init--collectible-banner');
    });

    onMounted(() => {
      resetAllFilter(1);

      if (!topTradedItems.value || topTradedItems.value.length === 0) {
        fetchCollectiblesTopTraded();
      }

      if (!recentlyItems.value || recentlyItems.value.length === 0) {
        fetchCollectiblesRecently();
      }
    });

    onUnmounted(() => {
      resetAllFilter(1);
    });

    return {
      topTradedItems,
      topTradedPage,
      setTopTradedPage,
      recentlyItems,
      selectedTab,
      setSelectedTab,
      ...toRefs(state),
      showItemCard,
      recentlyMore,
      recentlyPage,
      fetchCollectiblesRecently,
      card,
      cardClose,
      filter,
      setFilter,
      hasFilter,
      resetFilter,
      resetAllFilter,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  destroyed() {
    document.documentElement.classList.remove('init--collectible-banner');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/collectibles/_collectibles-history.scss';
@import '~@/assets/sass/common/pages/nft/_nft-history.scss';
</style>
