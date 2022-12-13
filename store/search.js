export const namespaced = true;

export const state = () => ({
  collectible: false,
  filter: {
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
});

export const getters = {
  fetchPrice({ commit }) {
    this.$dracoApi.post(`/wallet/prices/hydra/lastest`).then(({ data }) => {
      commit('setPrice', data.Data);
    });
  },
  fetchTotal({ commit }) {
    commit('setLoading', true);

    this.$dracoWebApi
      .get('/hsp/stake')
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setTotal', data.data);
        }
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },
  fetchMy({ commit, rootState }) {
    if (rootState.dracoAccessToken) {
      commit('setLoadingMy', true);

      this.$dracoWebApi
        .get('/hsp/mystake')
        .then(({ data }) => {
          if (data.code === 200) {
            console.log(data.data.stakeAmount);
            commit('setMy', data.data);
          } else {
            commit('setMy', {
              stakeAmount: 0,
              claimAmount: 0,
              totalClaimedAmount: 0,
              isCanUnstake: false,
              isCanClaim: false,
              estimateAPR: 0.0,
            });
          }
        })
        .catch((e) => {
          commit('setMy', {
            stakeAmount: 0,
            claimAmount: 0,
            totalClaimedAmount: 0,
            isCanUnstake: false,
            isCanClaim: false,
            estimateAPR: 0.0,
          });
        })
        .finally(() => {
          commit('setLoadingMy', false);
        });
    }
  },
};

export const mutations = {
  setCollectible(state, payload) {
    state.collectible = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
};

export const actions = {
  resetAllFilter({ commit, state }, uniqueFlag = 0) {
    commit('setCollectible', uniqueFlag === 1);
    commit('setFilter', {
      class: 0,
      itemType: '0',
      grade: 0,
      tier: 0,
      enhance: -1,
      minPrice: 0,
      maxPrice: 0,
      sort: 'latest',
      uniqueFlag,
      searchType: state.filter.searchType,
      groupId: 0,
      EXDSearchId: 0,
    });
  },
};
