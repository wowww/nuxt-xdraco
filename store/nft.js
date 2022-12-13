import CharacterClass, { findLowercaseKey } from '@/constants/character/character-class';
import CharacterGrade, { calcByPowerScore } from '@/constants/character/character-grade';
import { STORAGE_KEY } from '~/constants/accounts';
import { dracoStorage } from '~/utils/baseUtil';

export const namespaced = true;

export const state = () => ({
  loading: false,
  item: null,
  itemError: null,
  inventoryList: null,
  inventoryItem: null,
  inventoryItemTab: null,
  inventoryItemIdx: null,
  inventoryItemOpen: false,
  openQR: false,
  items: {
    list: [],
    current: null,
    more: false,
    firstID: null,
    totalCount: 0,
  },
  itemsFilter: {
    class: 0,
    levMin: 0,
    levMax: 0,
    powerMin: 0,
    powerMax: 0,
    priceMin: 0,
    priceMax: 0,
    sort: 'latest',
  },
  historyFilter: {
    class: 0,
    levMin: 0,
    levMax: 0,
    powerMin: 0,
    powerMax: 0,
    priceMin: 0,
    priceMax: 0,
  },
  myItems: {
    tab: 0,
    list: [],
    current: null,
    more: false,
    firstID: null,
  },
  selectedTab: 0,
  activeScoreView: 'power',
  topTradedItems: {
    list: [],
    current: null,
    more: false,
    firstID: null,
  },
  recommendedItems: {
    list: [],
    current: null,
    more: false,
    firstID: null,
  },
  recentItems: {
    list: [],
    current: null,
    more: false,
    firstID: null,
  },
  recentHistoryItems: {
    list: [],
    current: null,
    more: false,
    firstID: null,
  },
  viewMode: 'ps',
});

export const getters = {
  nftGrade: (state) => {
    if (!state.item || !state.item.character) {
      return CharacterGrade.COMMON;
    }
    const { powerScore } = state.item.character;
    return calcByPowerScore(powerScore);
  },
  characterClass: (state) => {
    if (!state.item || !state.item.character) {
      return findLowercaseKey(CharacterClass.ALL);
    }
    return findLowercaseKey(state.item.character.class);
  },
};

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setItem(state, payload) {
    state.item = payload;
  },
  setItemError(state, payload) {
    state.itemError = payload;
  },
  setOpenQR(state, payload) {
    state.openQR = payload;
  },
  setInventoryList(state, payload) {
    state.inventoryItem = payload;
  },
  setInventoryItem(state, payload) {
    state.inventoryItem = payload;
  },
  setInventoryItemTab(state, payload) {
    state.inventoryItemTab = payload;
  },
  setInventoryItemIdx(state, payload) {
    state.inventoryItemIdx = payload;
  },
  setInventoryItemOpen(state, payload) {
    state.inventoryItemOpen = payload;
  },
  setItems(state, payload) {
    state.items = payload;
  },
  setItemsFilter(state, payload) {
    state.itemsFilter = payload;
  },
  setHistoryFilter(state, payload) {
    state.historyFilter = payload;
  },
  setMyItems(state, payload) {
    state.myItems = payload;
  },
  setSelectedTab(state, payload) {
    state.selectedTab = payload;
  },
  setTopTradedItems(state, payload) {
    state.topTradedItems = payload;
  },
  setRecommendedItems(state, payload) {
    state.recommendedItems = payload;
  },
  setRecentItems(state, payload) {
    state.recentItems = payload;
  },
  setRecentHistoryItems(state, payload) {
    state.recentHistoryItems = payload;
  },
  setActiveScoreView(state, payload) {
    state.activeScoreView = payload;
  },
  setViewMode(state, payload) {
    state.viewMode = payload;
    dracoStorage.set(STORAGE_KEY.NFT_VIEW_MODE, payload);
  },
};

export const actions = {
  fetchNftItem({ commit, state, rootState }, seq) {
    commit('setLoading', true);
    console.log('fetch item', seq);
    this.$dracoWebApi
      .get('/nft/character/summary', { params: { seq, languageCode: this.$i18n.locale } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setItem', data.data);
          commit('setItemError', null);
        } else {
          commit('setItem', null);
          commit('setItemError', data.code);
        }
      })
      .catch((e) => {
        commit('setItem', null);
        commit('setItemError', 500);
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },
  fetchNftItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'sale', ...state.itemsFilter, page, languageCode: this.$i18n.locale };

    if (page > 1 && state.items.firstID) {
      params.firstID = state.items.firstID;
    }

    if (page === 1) {
      commit('setItems', []);
    }

    this.$dracoWebApi
      .get('/nft/lists', { params })
      .then(({ data }) => {
        console.log('nft list result', data);
        const list = page > 1 ? [...state.items.list, ...data.data.lists] : [...data.data.lists];
        console.log('nft items', list);
        commit('setItems', {
          ...state.items,
          list,
          page,
          more: data.data.more || false,
          firstId: data.data.firstID || null,
          totalCount: data.data.totalCount || 0,
        });
      })
      .catch((e) => {
        console.error('nft list error', e);
        commit('setItems', {
          ...state.items,
          list: [],
          page: 1,
          more: false,
          firstID: null,
        });
      })
      .finally(() => commit('setLoading', false));
  },
  fetchNftTopTradedItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'topTraded', page, languageCode: this.$i18n.locale };

    if (page > 1 && state.topTradedItems.firstID) {
      params.firstID = state.topTradedItems.firstID;
    }

    this.$dracoWebApi
      .get('/nft/lists', { params })
      .then(({ data }) => {
        if (data.code === 200) {
          const list = page > 1 ? [...state.topTradedItems.list, ...data.data.lists] : [...data.data.lists];
          commit('setTopTradedItems', {
            ...state.topTradedItems,
            list,
            page,
            more: data.data.more || false,
            firstId: data.data.firstID || null,
          });
        }
      })
      .catch((e) => {
        commit('setTopTradedItems', {
          ...state.topTradedItems,
          list: [],
          page: 1,
          more: false,
          firstID: null,
        });
      })
      .finally(() => commit('setLoading', false));
  },
  fetchNftRecommendedItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'recommended', page, languageCode: this.$i18n.locale };

    if (page > 1 && state.recommendedItems.firstID) {
      params.firstID = state.recommendedItems.firstID;
    }

    this.$dracoWebApi
      .get('/nft/lists', { params })
      .then(({ data }) => {
        if (data.code === 200) {
          const list = page > 1 ? [...state.recommendedItems.list, ...data.data.lists] : [...data.data.lists];
          commit('setRecommendedItems', {
            ...state.recommendedItems,
            list,
            page,
            more: data.data.more || false,
            firstId: data.data.firstID || null,
          });
        }
      })
      .catch((e) => {
        commit('setRecommendedItems', {
          ...state.recommendedItems,
          list: [],
          page: 1,
          more: false,
          firstID: null,
        });
      })
      .finally(() => commit('setLoading', false));
  },
  fetchNftRecentItems({ commit, state, rootState }) {
    commit('setLoading', true);
    const params = { listType: 'recent', page: 1, languageCode: this.$i18n.locale };

    this.$dracoWebApi
      .get('/nft/lists', { params })
      .then(({ data }) => {
        console.log('nft recent items', data);
        if (data.code === 200) {
          commit('setRecentItems', {
            ...state.recentItems,
            list: data.data.lists,
            more: data.data.more || false,
            firstId: data.data.firstID || null,
          });
        }
      })
      .catch((e) => {
        console.log('nft recent items error', e);
        commit('setRecentItems', {
          ...state.recentItems,
          list: [],
          page: 1,
          more: false,
          firstID: null,
        });
      })
      .finally(() => commit('setLoading', false));
  },
  fetchNftRecentHistoryItems({ commit, state, rootState }, page = 1) {
    commit('setLoading', true);
    const params = { listType: 'recent', page, ...state.historyFilter, languageCode: this.$i18n.locale };

    if (page > 1 && state.recentHistoryItems.firstID) {
      params.firstID = state.recentHistoryItems.firstID;
    }

    this.$dracoWebApi
      .get('/nft/lists', { params })
      .then(({ data }) => {
        if (data.code === 200) {
          const list = page > 1 ? [...state.recentHistoryItems.list, ...data.data.lists] : [...data.data.lists];
          commit('setRecentHistoryItems', {
            ...state.recentHistoryItems,
            list,
            page,
            more: data.data.more || false,
            firstId: data.data.firstID || null,
          });
        }
      })
      .catch((e) => {
        commit('setRecentHistoryItems', {
          ...state.recentHistoryItems,
          list: [],
          page: 1,
          more: false,
          firstID: null,
        });
      })
      .finally(() => commit('setLoading', false));
  },
  fetchNftInventoryList({ commit, state, rootState }) {
    const { item } = state;
    const typeFilter = [[2, 3, 4], [5, 7, 9], [8, 21], [17], [6, 10, 11, 12, 13, 14, 16, 18, 19, 20]];

    this.$axios
      .$get('/api/axios-web/nft/character/inven', { params: { transportID: item.character.transportID, languageCode: this.$i18n.locale } })
      .then((data) => {
        if (data.code === 200) {
          const filteredList = [];

          typeFilter.forEach((mainTypes) => {
            const mainTypesItems = [];
            data.data.forEach((i) => {
              if (mainTypes.includes(i.mainType)) {
                mainTypesItems.push(i);
              }
            });

            mainTypesItems.sort((a, b) => {
              return a.mainType - b.mainType || a.subType - b.subType || b.grade - a.grade;
            });

            filteredList.push(mainTypesItems);
          });

          commit('setInventoryList', filteredList);
        } else {
          commit('setInventoryList', null);
        }
      })
      .catch(() => {
        commit('setInventoryList', null);
      });
  },
  fetchNftInventoryItem({ commit, state, rootState }, itemUID, tabIdx, idx) {
    const { item } = state;

    if (item) {
      this.$dracoWebApi
        .get('/nft/character/itemdetail', {
          params: {
            transportID: item.character.transportID,
            class: item.character.class,
            itemUID,
            languageCode: this.$i18n.locale,
          },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            commit('setInventoryItem', data.data);
            commit('setInventoryItemTab', tabIdx);
            commit('setInventoryItemIdx', idx);

            commit('setInventoryItemOpen', true);
          } else {
            commit('setInventoryItem', null);
            commit('setInventoryItemTab', null);
            commit('setInventoryItemIdx', null);
            commit('setInventoryItemOpen', false);
          }
        })
        .catch(() => {
          commit('setInventoryItem', null);
          commit('setInventoryItemTab', null);
          commit('setInventoryItemIdx', null);
          commit('setInventoryItemOpen', false);
        });
    }
  },
};
