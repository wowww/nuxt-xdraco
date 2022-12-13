<template>
  <div class="inventory">
    <v-tabs class="tab-style1">
      <v-tab @click="currentTab = 0">
        <span>Inventory</span>
        <v-tooltip bottom attach=".inventory .v-tabs">
          <template #activator="{ on, attrs }">
            <v-icon color="primary" dark v-bind="attrs" v-on="on"> icon</v-icon>
          </template>
          <div class="tooltip-wrap">
            <div class="tit">Inventory</div>
            <p class="desc">
              {{ $t('s.inventory.info') }}
            </p>
          </div>
        </v-tooltip>
      </v-tab>
      <v-tab @click="currentTab = 1">
        <span>MIR4 Warehouse</span>
      </v-tab>
      <v-tab @click="currentTab = 2">
        <span>Listed</span>
      </v-tab>
    </v-tabs>

    <div v-if="currentTab === 0" class="exchange-list for-list">
      <div class="list-bar">
        <div class="list-bar__title">
          <strong>{{ $t('w.rounds.item') }}</strong>
          <em>{{ xdracoItems.length }}</em>
        </div>
      </div>
      <!-- Filter -->
      <div id="wrapFilterList" class="wrap-filter">
        <div class="wrap-filter__inner">
          <list-unique-filter/>
          <list-filter
            :key="`filter-${filter.searchType}-class`"
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
          />
          <list-filter
            :key="`filter-${filter.searchType}-type`"
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
              { text: $t('w.exd.item-type.4_4'), value: '4_4' },
              // { text: $t('w.exd.item-type.6_33'), value: '6_33' },
              { text: $t('w.exd.item-type.8_1'), value: '8_1' },
              { text: $t('w.exd.item-type.8_2'), value: '8_2' },
              { text: $t('w.exd.item-type.8_3'), value: '8_3' },
              { text: $t('w.exd.item-type.8_4'), value: '8_4' },
              { text: $t('w.exd.item-type.8_5'), value: '8_5' },
              { text: $t('w.exd.item-type.8_6'), value: '8_6' },
              { text: $t('w.exd.item-type.8_7'), value: '8_7' },
              { text: $t('w.exd.item-type.8_8'), value: '8_8' },
              { text: $t('w.exd.item-type.17_2'), value: '17_2' },
              { text: $t('w.exd.item-type.20_1'), value: '20_1' },
              // { text: $t('w.exd.item-type.21_1'), value: '21_1' },
              // { text: $t('w.exd.item-type.21_2'), value: '21_2' },
            ]"
          />
          <list-filter
            :key="`filter-${filter.searchType}-grade`"
            :placeholder="$t('w.common.item.grade')"
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
            :key="`filter-${filter.searchType}-tier`"
            :placeholder="$t('w.common.item.tier')"
            filter-key="tier"
            :items="[
              { text: `${$t('w.common.item.tier')} (${$t('w.common.all')})`, value: 0 },
              { text: 'IV', value: 4 },
              { text: 'III', value: 3 },
              { text: 'II', value: 2 },
              { text: 'I', value: 1 },
            ]"
          />
        </div>

        <div class="wrap-filter-chip">
          <div class="wrap-chips">
            <v-chip v-if="filter.uniqueFlag !== 0" outlined label @click="resetFilter('uniqueFlag', 0)">
              {{ $t('w.exd.collectible') }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>
            <v-chip v-if="filter.class !== 0" outlined label @click="resetFilter('class', 0)">
              {{ $t(`w.rounds.item.class.${filter.class}`) }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <v-chip v-if="filter.itemType !== '0'" outlined label @click="resetFilter('itemType', '0')">
              {{ $t(`w.exd.item-type.${filter.itemType}${filter.itemType.startsWith('3_') ? '.base' : ''}`) }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <v-chip v-if="filter.grade !== 0" outlined label @click="resetFilter('grade', 0)">
              {{ $t(`w.rounds.item.grade.${filter.grade}`) }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <v-chip v-if="filter.tier !== 0" outlined label @click="resetFilter('tier', 0)">
              Tier {{ filter.tier | roman }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <v-chip v-if="filter.enhance !== -1" outlined label @click="resetFilter('enhance', -1)">
              + {{ filter.enhance }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <v-chip v-if="filter.sort !== 'latest'" outlined label @click="resetFilter('sort', 'latest')">
              {{ $t(`w.exd.filter.order.${filter.sort}`) }}
              <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp"/>
            </v-chip>

            <div v-if="hasFilter" class="btn-filter-reset" @click="resetAllFilter(0)">
              <span>Reset</span>
              <img src="https://file.mir4global.com/xdraco/img/common/btn-reset-filter.webp" width="16"/>
            </div>

            <div class="filter-divider"></div>
          </div>
          <list-order v-if="false" hide-price/>
        </div>
      </div>

      <div v-if="loading" class="d-flex justify-center align-center py-10">
        <v-progress-circular class="ma-5" :size="32" :width="4" color="#fff" indeterminate/>
      </div>

      <ul
        class="list-item wrap-card"
        :data-empty-message="xdracoItems && xdracoItems.length > 0 ? '' : $t('s.inventory.empty-inventory')">
        <li v-for="(item, itemIdx) in xdracoItems" :key="`inventory-item-${itemIdx}`">
          <div @click="fetchItem(item.ItemUID)">
            <item-card :item="item.item" :class="isDesktop ? 'card--sm' : 'card--xs'"
                       :collectible="!!item.item.uniqueNo" prevent-flip/>
          </div>

          <div class="wrap-card__btn">
            <button type="button" class="btn btn-primary-exd" :disabled="exist === 0"
                    @click="openModalSend({ itemUID: item.ItemUID, ...item.item })">
              SEND
            </button>
            <nuxt-link :to="`/inventory/${item.ItemUID}`" class="btn btn-primary-exd">SELL</nuxt-link>
          </div>
        </li>
      </ul>

      <v-dialog v-model="open" content-class="dialog-card">
        <v-card v-if="item">
          <item-card :ref="card" :item="item" use-info :collectible="!!item.uniqueNo"/>
          <button type="button" class="btn-close-dialog" @click="closeCard">Close Dialog</button>
        </v-card>
      </v-dialog>

      <div v-if="xdracoMore" class="wrap-button">
        <!-- <button type="button" class="btn-viewmore">VIEW MORE</button> -->
        <nuxt-link class="btn-viewmore" to="/view-more">VIEW MORE</nuxt-link>
      </div>
      <modal-send :visible="visibleSend" :item="sendItem" @close="closeModalSend" @success="onSuccessToSend"/>
    </div>
    <div v-else-if="currentTab === 1" class="exchange-list">
      <div v-if="exist === 0" class="not-login">
        <p>{{ $t('s.inventory.sync.account') }}</p>
        <div class="bottom-btns">
          <a href="https://mir4global.com" target="_blank">PLAY NOW</a>
        </div>
      </div>
      <template v-else>
        <div class="list-bar">
          <div class="list-bar__title">
            <strong>{{ $t('w.rounds.item') }}</strong>
            <em>{{ mir4Items.length }}</em>
          </div>
        </div>
        <div v-if="loading" class="d-flex justify-center align-center py-10">
          <v-progress-circular class="ma-5" :size="32" :width="4" color="#fff" indeterminate/>
        </div>
        <div v-if="!loading && (!mir4Items || mir4Items.length === 0)"
             class="d-flex justify-center align-center py-16 white--text">
          {{ $t('s.inventory.empty-warehouse') }}
        </div>
        <ul class="myitem-list__items">
          <li v-for="(item, itemIdx) in mir4Items" :key="`mir4-items-${itemIdx}`">
            <item-info :item="item"/>
            <div class="myitem-list__items__btn">
              <button type="button" class="btn btn-primary-exd" @click="openModalImport(item.itemUID)">Import</button>
            </div>
          </li>
        </ul>
        <div v-if="mir4More" class="wrap-button">
          <a href="/view-more" class="btn-viewmore">VIEW MORE</a>
        </div>
        <modal-import
          :visible="visibleImport" :item-u-i-d="importItemUID" @close="closeModalImport"
          @success="onSuccessToImport"
        />
      </template>
    </div>
    <div v-else class="exchange-list myitem-list">
      <div class="wrap-list">
        <div class="list-bar">
          <div class="list-bar__title">
            <strong>{{ $t('w.rounds.item') }}</strong>
            <em>{{ myItems.length }}</em>
          </div>
        </div>
        <div v-if="exdLoading" class="d-flex justify-center align-center py-10">
          <v-progress-circular class="ma-5" :size="32" :width="4" color="#fff" indeterminate/>
        </div>
        <div v-if="!loading && (!myItems || myItems.length === 0)"
             class="d-flex justify-center align-center py-16 white--text">
          {{ $t('s.exd.sale.no-item') }}
        </div>
        <ul class="myitem-list__items">
          <li v-for="(item, itemIdx) in myItems" :key="`my-items-${itemIdx}`">
            <my-item :tab-type="0" :my-item="item"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, onUnmounted, reactive, toRefs, watch} from '@vue/composition-api';
import {ref} from '@vue/composition-api/dist/vue-composition-api';
import {createNamespacedHelpers, useState} from 'vuex-composition-helpers/dist';

import Headroom from '~/node_modules/headroom.js/dist/headroom';
import ItemCard from '@/components/common/item/ItemCard';
import ItemInfo from '@/components/exd/common/ItemInfo';
import MyItem from '@/components/exd/common/MyItem';
import ListOrder from '@/components/exd/desktop/ListOrder';
import ListUniqueFilter from '@/components/exd/desktop/ListUniqueFilter';
import ListFilter from '@/components/exd/common/ListFilter';
import ModalImport from '@/components/inventory/ModalImport';
import ModalSend from '@/components/inventory/ModalSend';

const {
  useState: useSearchState,
  useGetters: useSearchGetters,
  useMutations: useSearchMutations,
  useActions: useSearchActions,
} = createNamespacedHelpers('search');

const {
  useState: useExdState,
  useActions: useExdActions,
  useMutations: useExdMutations
} = createNamespacedHelpers('exd');
const {useState: useAccountState} = createNamespacedHelpers('account');

export default defineComponent({
  name: 'InventoryItemPage',
  components: {
    ModalSend,
    ItemCard,
    ModalImport,
    MyItem,
    ItemInfo,
    ListOrder,
    ListFilter,
    ListUniqueFilter,
  },
  layout: 'inventory',
  meta: {
    title: 'Inventory | XDRACO',
    hasSubNav: 'inventory',
    auth: true,
  },
  setup(_, {root}) {
    const { $dracoWebApi, $i18n } = root;
    const { filter } = useSearchState(['filter']);
    const { hasFilter } = useSearchGetters(['hasFilter']);
    const { setFilter } = useSearchMutations(['setFilter']);
    const { resetAllFilter } = useSearchActions(['resetAllFilter']);

    const { exist, represent } = useAccountState(['exist', 'represent']);

    const { loading: exdLoading, myItems } = useExdState(['loading', 'myItems']);
    const { fetchMyItems } = useExdActions(['fetchMyItems']);
    const { setMyItemTab } = useExdMutations(['setMyItemTab']);

    const { isDesktop } = useState(['isDesktop']);

    const card = ref(null);
    const state = reactive({
      currentTab: 0,
      loading: false,
      xdracoItems: [],
      xdracoMore: false,
      mir4Items: [],
      mir4More: false,
      visibleImport: false,
      importItem: null,
      importItemUID: '',
      visibleSend: false,
      sendItem: null,
      open: false,
      item: null,
    });

    const resetFilter = (type, initValue) => {
      const value = {...filter.value};
      value[type] = initValue;
      setFilter(value);
    };

    const fetchItemList = (type = 'inventory') => {
      if (type === 'seal' && exist.value === 0) {
        return;
      }

      const params = {listType: type, languageCode: $i18n.locale};

      if (type === 'inventory') {
        Object.assign(params, {...params, ...filter.value});
      }

      state.loading = true;
      root.$nextTick(() => {
        $dracoWebApi
          .get('/warehouse/lists', {params})
          .then(({data}) => {
            if (state.currentTab === 0) {
              state.xdracoItems = data.data.lists || [];
            }

            if (state.currentTab === 1) {
              state.mir4Items = data.data.lists || [];
            }
          })
          .finally(() => {
            state.loading = false;
          });
      });
    };

    const fetchItem = (itemUID) => {
      $dracoWebApi
        .get('/exd/item', {
          params: {itemUID, languageCode: $i18n.locale},
        })
        .then(({data}) => {
          if (data.code === 200) {
            state.item = data.data.item;
            state.open = true;
          } else {
            state.item = null;
            state.open = false;
          }
        })
        .catch(() => {
          state.item = null;
          state.open = false;
        });
    };

    const closeCard = () => {
      state.open = false;
      state.item = null;
      if (card.value) {
        card.value.reset();
      }
    };

    const openModalImport = (itemUID) => {
      state.importItemUID = itemUID;
      state.visibleImport = true;
    };

    const closeModalImport = () => {
      state.importItemUID = '';
      state.visibleImport = false;
    };

    const openModalSend = (item) => {
      state.sendItem = item;
      state.visibleSend = true;
    };

    const closeModalSend = () => {
      state.visibleSend = false;
    };

    const onSuccessToImport = () => {
      state.mir4Items = [];
      fetchItemList('seal');
    };

    const onSuccessToSend = () => {
      state.xdracoItems = [];
      fetchItemList('inventory');
    };

    const refresh = () => {
      if (state.currentTab === 0) {
        state.xdracoItems = [];
        fetchItemList('inventory');
      }

      if (state.currentTab === 1) {
        state.mir4Items = [];
        fetchItemList('seal');
      }

      if (state.currentTab === 2) {
        fetchMyItems();
      }
    };

    watch(
      () => filter.value,
      () => {
        fetchItemList('inventory');
      },
    );

    watch(
      () => state.currentTab,
      () => {
        refresh();
      },
    );

    watch(
      () => represent.value,
      (current, before) => {
        if (`${current.worldName}${current.characterName}` !== `${before.worldName}${before.characterName}`) {
          refresh();
        }
      },
    );

    onMounted(() => {
      resetAllFilter();
      setMyItemTab(0);
      fetchItemList();
    });

    onUnmounted(() => {
      resetAllFilter();
    });

    return {
      card,
      ...toRefs(state),
      filter,
      isDesktop,
      hasFilter,
      resetFilter,
      resetAllFilter,
      openModalImport,
      closeModalImport,
      exist,
      openModalSend,
      closeModalSend,
      onSuccessToImport,
      onSuccessToSend,
      myItems,
      exdLoading,
      represent,
      fetchItem,
      closeCard,
    };
  },
  mounted() {
    this.setHeadroom();
  },
  methods: {
    setHeadroom() {
      if (!document.querySelector('#header')) {
        return;
      }
      const target = document.querySelector('#header');
      this.headroom = new Headroom(target, this.optionsHeadroom);
      this.headroom.init();
    },
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/pages/_exchange-list';
</style>
