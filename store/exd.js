import { MyItemTab, MyItemTabs } from '@/constants/exchange';

export const namespaced = true;

export const state = () => ({
  loading: false,
  myItemTab: MyItemTab.SALE,
  myItemsOrder: null,
  myItems: [],
  myItemsPage: 1,
  myItemsMore: false,
  myItemsFirstID: null,
  itemFilter: {
    class: 0,
    itemType: '0',
    grade: 0,
    tier: 0,
    enhance: -1,
    minPrice: 0,
    maxPrice: 0,
    sort: 'latest',
    uniqueFlag: 0,
    searchType: 1,
    groupId: 0,
    EXDSearchId: 0,
  },
  recentFilter: {
    class: 0,
    itemType: '0',
    grade: 0,
    tier: 0,
    enhance: -1,
    minPrice: 0,
    maxPrice: 0,
    uniqueFlag: 0,
  },
  items: [],
  itemsHasMore: false,
  itemsPage: 1,
  itemsFirstID: null,
  itemsTotal: 0,
  selectedTab: 0,
  topTradedLoading: false,
  topTradedItems: [],
  topTradedPage: 1,
  recentlyLoading: false,
  recentlyItems: [],
  recentlyMore: false,
  recentlyPage: 0,
  recentlyFirstID: 0,
  recentlyTotal: 0,
  recommendedLoading: false,
  recommendedGrade: 0,
  recommendedItems: [],
  exchangeItem: null,
  exdErrorCode: null,
  openExchange: false,
  myItem: null,
  price: null,
  metaList: [],
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setMyItemTab(state, payload) {
    state.myItemTab = payload;
  },
  setMyItemsOrder(state, payload) {
    state.myItemsOrder = payload;
  },
  setMyItems(state, payload) {
    state.myItems = payload;
  },
  setMyItemsPage(state, payload) {
    state.myItemsPage = payload;
  },
  setMyItemsMore(state, payload) {
    state.myItemsMore = payload;
  },
  setMyItemsFirstID(state, payload) {
    state.myItemsFirstID = payload;
  },
  setItemFilter(state, payload) {
    state.itemFilter = payload;
  },
  setRecentFilter(state, payload) {
    state.recentFilter = payload;
  },
  setItems(state, payload) {
    state.items = payload;
  },
  setItemsHasMore(state, payload) {
    state.itemsHasMore = payload;
  },
  setItemsPage(state, payload) {
    state.itemsPage = payload;
  },
  setItemsTotal(state, payload) {
    state.itemsTotal = payload;
  },
  setSelectedTab(state, payload) {
    state.selectedTab = payload;
  },
  setTopTradedLoading(state, payload) {
    state.topTradedLoading = payload;
  },
  setTopTradedItems(state, payload) {
    state.topTradedItems = payload;
  },
  setTopTradedPage(state, payload) {
    state.topTradedPage = payload;
  },
  setRecentlyLoading(state, payload) {
    state.recentlyLoading = payload;
  },
  setRecentlyItems(state, payload) {
    state.recentlyItems = payload;
  },
  setRecommendedLoading(state, payload) {
    state.recommendedLoading = payload;
  },
  setRecentlyMore(state, payload) {
    state.recentlyMore = payload;
  },
  setRecentlyPage(state, payload) {
    state.recentlyPage = payload;
  },
  setRecentlyFirstID(state, payload) {
    state.recentlyFirstID = payload;
  },
  setRecentlyTotal(state, payload) {
    state.recentlyTotal = payload;
  },
  setRecommendedItems(state, payload) {
    state.recommendedItems = payload;
  },
  setExchangeItem(state, payload) {
    state.exchangeItem = payload;
  },
  setExdErrorCode(state, payload) {
    state.exdErrorCode = payload;
  },
  setMyItem(state, payload) {
    state.myItem = payload;
  },
  setOpenExchange(state, payload) {
    state.openExchange = payload;
  },
  setPrice(state, payload) {
    state.price = payload;
  },
  setItemsFirstID(state, payload) {
    state.itemsFirstID = payload;
  },
  setMetaList(state, payload) {
    state.metaList = payload;
  },
};

export const actions = {
  fetchMyItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: MyItemTabs[state.myItemTab].key, languageCode: this.$i18n.locale, page };

    if (page > 1 && state.myItemsFirstID) {
      params.firstID = state.myItemsFirstID;
    }

    this.$dracoWebApi
      .get('/exd/mylists', { params })
      .then(({ data }) => {
        if (data.code === 200) {
          if (page > 1) {
            commit('setMyItems', [...state.myItems, ...data.data.lists] || []);
          } else {
            commit('setMyItems', data.data.lists || []);
          }
          commit('setMyItemsMore', data.data.more || false);
          commit('setMyItemsFirstID', data.data.firstID || 0);
          commit('setMyItemsPage', page);
        }
      })
      .catch((e) => {
        commit('setMyItems', []);
        commit('setMyItemsMore', false);
        commit('setMyItemsPage', 1);
        commit('setMyItemsFirstID', null);
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },
  fetchTopTraded({ commit, rootState }) {
    commit('setTopTradedLoading', true);
    this.$dracoWebApi
      .get('/exd/lists', { params: { listType: 'topTraded', languageCode: this.$i18n.locale } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setTopTradedItems', data.data.lists || []);
          commit('setTopTradedPage', 1);
        }
      })
      .catch((e) => {
        commit('setTopTradedItems', []);
        commit('setTopTradedPage', 1);
      })
      .finally(() => commit('setTopTradedLoading', false));
  },
  fetchRecently({ commit, state, rootState }, page = 1) {
    commit('setRecentlyLoading', true);
    const filters = { ...rootState.search.filter };
    delete filters.sort;
    const params = { listType: 'recent', languageCode: this.$i18n.locale, page, ...filters };

    if (page > 1 && state.recentlyFirstID) {
      params.firstID = state.recentlyFirstID;
    }

    this.$dracoWebApi
      .get('/exd/lists', { params })
      .then(({ data }) => {
        if (data.code === 200) {
          if (page > 1) {
            commit('setRecentlyItems', [...state.recentlyItems, ...data.data.lists] || []);
          } else {
            commit('setRecentlyItems', data.data.lists || []);
          }
          commit('setRecentlyMore', data.data.more || false);
          commit('setRecentlyFirstID', data.data.firstID || 0);
          commit('setRecentlyPage', page);
          commit('setRecentlyTotal', data.data.totalCount || 0);
        }
      })
      .catch((e) => {
        commit('setRecentlyItems', []);
        commit('setRecentlyMore', false);
        commit('setRecentlyFirstID', 0);
        commit('setRecentlyPage', page);
        commit('setRecentlyTotal', 0);
      })
      .finally(() => commit('setRecentlyLoading', false));
  },
  fetchRecommended({ commit, state, rootState }) {
    commit('setRecommendedLoading', true);
    this.$dracoWebApi
      .get('/exd/lists', {
        params: {
          listType: 'powerScore',
          grade: state.recommendedGrade,
          class: rootState.account.represent ? rootState.account.represent.class : 0,
          languageCode: this.$i18n.locale,
        },
      })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setRecommendedItems', data.data.lists || []);
        }
      })
      .catch((e) => {
        commit('setRecommendedItems', []);
      })
      .finally(() => commit('setRecommendedLoading', false));
  },
  fetchItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'explorer', ...rootState.search.filter, page, languageCode: this.$i18n.locale };

    if (page > 1 && state.itemsFirstID) {
      params.firstID = state.itemsFirstID;
    } else {
      commit('setMyItems', []);
    }

    this.$dracoWebApi
      .get('/exd/lists', { params })
      .then(({ data }) => {

        if (data.code === 200) {
          if (page > 1) {
            commit('setItems', [...state.items, ...data.data.lists] || []);
          } else {
            commit('setItems', data.data.lists || []);
          }
          commit('setItemsHasMore', data.data.more || false);
          commit('setItemsPage', page);
          commit('setItemsTotal', data.data.totalCount || 0);
          if (data.firstID) {
            commit('setItemsFirstID', data.firstID);
          }
        }
      })
      .catch((e) => {
        commit('setItems', []);
        commit('setItemsHasMore', false);
        commit('setItemsFirstID', null);
        commit('setItemsTotal', 0);
      })
      .finally(() => commit('setLoading', false));
  },
  fetchTradeItem({ commit, state, rootState }, tradeUID) {
    if (tradeUID) {
      commit('setLoading', true);
      this.$dracoWebApi
        .get('/exd/tradeitem', { params: { tradeUID, languageCode: this.$i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            commit('setExchangeItem', { ...data.data, tradeUID });
            commit('setExdErrorCode', null);
          } else {
            commit('setExchangeItem', null);
            commit('setExdErrorCode', data.code);
          }
        })
        .catch((e) => {
          commit('setExchangeItem', null);
        })
        .finally(() => commit('setLoading', false));
    }
  },
  fetchMyItem({ commit, state, rootState }, itemUID) {
    if (itemUID) {
      commit('setLoading', true);
      this.$dracoWebApi
        .get('/exd/item', { params: { itemUID, languageCode: this.$i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            commit('setMyItem', data.data);
          }
        })
        .catch((e) => {
          commit('setMyItem', null);
        })
        .finally(() => commit('setLoading', false));
    }
  },
  fetchPrice({ commit }) {
    this.$dracoApi.post(`/wallet/prices/draco/lastest`).then(({ data }) => {
      if (data) {
        commit('setPrice', data.Data);
      }
    });
  },
  resetAllFilter({ commit, state }) {
    commit('setItemFilter', {
      class: 0,
      itemType: '0',
      grade: 0,
      tier: 0,
      enhance: -1,
      minPrice: 0,
      maxPrice: 0,
      sort: 'latest',
      uniqueFlag: 0,
      searchType: state.itemFilter.searchType,
    });
  },
  resetAllRecentFilter({ commit }) {
    commit('setRecentFilter', {
      class: 0,
      itemType: '0',
      grade: 0,
      tier: 0,
      enhance: -1,
      minPrice: 0,
      maxPrice: 0,
      uniqueFlag: 0,
    });
  },
  fetchExdMeta({ commit }) {
    /**
     * {
     *   "EXDSearchId": "211001",
     *   "MainType": "21",
     *   "SubType": "1",
     *   "ItemName_KOR": "체력의 보패",
     *   "ItemName_CHT": "生命值寶牌",
     *   "ItemName_CHS": "生命值宝牌",
     *   "ItemName_JPN": "体力の宝牌",
     *   "ItemName_ENG": "HP Mystical Piece",
     *   "ItemName_THA": "ชิ้นส่วนมายา HP ",
     *   "ItemName_IND": "Kepingan Mistik HP",
     *   "ItemName_VIE": "Mảnh Thần bí HP",
     *   "ItemName_GER": "Mystisches TP-Teil",
     *   "ItemName_SPA": "Pieza mística de PS",
     *   "ItemName_POR": "Pedaço Místico de HP",
     *   "ItemName_RUS": "таинств. фрагмент: ОЗ"
     * }
     */
    this.$dracoWebApi.get('/exd/boxmeta').then(({ data }) => {
      commit('setMetaList',
        data.data.map((item) => ({
            grade: Number(item.Grade || 0),
            exdSearchId: item.EXDSearchId,
            mainType: item.MainType,
            subType: item.SubType,
            itemName: {
              en: item.ItemName_ENG,
              ko: item.ItemName_KOR,
              'zh-Hans': item.ItemName_CHS,
              'zh-Hant': item.ItemName_CHT,
              ja: item.ItemName_JPN,
              th: item.ItemName_THA,
              id: item.ItemName_IND,
              vi: item.ItemName_VIE,
              de: item.ItemName_GER,
              es: item.ItemName_SPA,
              pt: item.ItemName_POR,
              ru: item.ItemName_RUS,
            },
          }),
        ));
    });
  },
};
