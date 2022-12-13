export const namespaced = true;

export const state = () => ({
  loading: false,
  itemFilter: {
    class: 0,
    itemType: '0',
    grade: 0,
    tier: 0,
    enhance: -1,
    minPrice: 0,
    maxPrice: 0,
    sort: 'latest',
    uniqueFlag: 1,
  },
  items: [],
  itemsHasMore: false,
  itemsPage: 1,
  itemsFirstID: null,
  itemsTotal: 0,
  item: null,
  errorCode: null,
  selectedTab: 0,
  topTradedLoading: false,
  topTradedItems: [],
  topTradedPage: 1,
  recentlyLoading: false,
  recentlyItems: [],
  recentlyMore: false,
  recentlyPage: 0,
  recentlyFirstID: 0,
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setItemFilter(state, payload) {
    state.itemFilter = payload;
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
  setItemsFirstID(state, payload) {
    state.itemsFirstID = payload;
  },
  setItemsTotal(state, payload) {
    state.itemsTotal = payload;
  },
  setItem(state, payload) {
    state.item = payload;
  },
  setErrorCode(state, payload) {
    state.errorCode = payload;
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
  setRecentlyMore(state, payload) {
    state.recentlyMore = payload;
  },
  setRecentlyPage(state, payload) {
    state.recentlyPage = payload;
  },
  setRecentlyFirstID(state, payload) {
    state.recentlyFirstID = payload;
  },
};

export const actions = {
  fetchCollectibleItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'explorer', ...rootState.search.filter, page, languageCode: this.$i18n.locale };

    if (page > 1 && state.itemsFirstID) {
      params.firstID = state.itemsFirstID;
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
  fetchCollectibleItem({ commit, state, rootState }, tradeUID) {
    if (tradeUID) {
      commit('setLoading', true);
      this.$dracoWebApi
        .get('/exd/tradeitem', { params: { tradeUID, languageCode: this.$i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            commit('setItem', { ...data.data, tradeUID });
            commit('setErrorCode', null);
          } else {
            commit('setItem', null);
            commit('setErrorCode', data.code);
          }
        })
        .catch((e) => {
          commit('setItem', null);
        })
        .finally(() => commit('setLoading', false));
    }
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
      uniqueFlag: 1,
    });
  },
  fetchCollectiblesTopTraded({ commit, rootState }) {
    commit('setTopTradedLoading', true);
    this.$dracoWebApi
      .get('/exd/lists', { params: { listType: 'topTraded', uniqueFlag: 1, languageCode: this.$i18n.locale } })
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
  fetchCollectiblesRecently({ commit, state, rootState }, page = 1) {
    commit('setRecentlyLoading', true);
    const filters = { ...rootState.search.filter };
    delete filters.sort;
    const params = { listType: 'recent', uniqueFlag: 1, languageCode: this.$i18n.locale, page, ...filters };

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
        }
      })
      .catch((e) => {
        commit('setRecentlyItems', []);
        commit('setRecentlyMore', false);
        commit('setRecentlyFirstID', 0);
        commit('setRecentlyPage', page);
      })
      .finally(() => commit('setRecentlyLoading', false));
  },
};
