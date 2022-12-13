import BigNumber from 'bignumber.js';

export const namespaced = true;

// const hydraBlock = new BigNumber(1000002).div(30000000).times(0.93);
const hydraBlock = 1000002 / 30000000 * 93 / 100;

export const state = () => ({
  loading: false,
  loadingMy: false,
  loadingStake: false,
  price: null,
  total: {
    totalMintAmount: 0,
    totalStakedAmount: 0,
    totalClaimedAmount: 0,
  },
  my: {
    stakeAmount: 0,
    claimAmount: 0,
    totalClaimedAmount: 0,
    isCanUnstake: false,
    isCanClaim: false,
    estimateAPR: 0.0,
  },
});

export const getters = {
  apr(state) {
    if (state.total.totalStakedAmount === 0) {
      return 0;
    }
    const result = 1 / state.total.totalStakedAmount * hydraBlock * 31536000;
    if (result !== Number.MAX_VALUE) {
      return result;
    }
    const bigHydraBlock = new BigNumber(1000002).div(30000000).times(0.93);
    return new BigNumber(1).div(new BigNumber(state.total.totalStakedAmount)).times(bigHydraBlock).times(31536000).toNumber();
  },
  apy(state, getters) {
    if (getters.apr === 0) {
      return 0;
    }
    const result = (1 + getters.apr / 8760 * 95 / 100) ** 8760 - 1;
    if (result !== Number.MAX_VALUE) {
      return result;
    }
    const one = new BigNumber(1);
    const apr = new BigNumber(getters.apr);

    return one.plus(apr.div(8760).times(0.95)).pow(8760).minus(1).toNumber();
  },
};

export const mutations = {
  setPrice(state, payload) {
    state.price = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setLoadingMy(state, payload) {
    state.loadingMy = payload;
  },
  setLoadingStake(state, payload) {
    state.loadingStake = payload;
  },
  setTotal(state, payload) {
    state.total = payload;
  },
  setMy(state, payload) {
    state.my = payload;
  },
};

export const actions = {
  fetchPrice({ commit }) {
    this.$dracoApi.post(`/wallet/prices/hydra/lastest`).then(({ data }) => {
      if (data) {
        const { Data } = data;
        commit('setPrice', Data);
      }
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
            commit('setMy', data.data);
          } else {
            commit('setMy', {
              stakeAmount: 0, claimAmount: 0, totalClaimedAmount: 0, isCanUnstake: false, isCanClaim: false, estimateAPR: 0.0,
            });
          }
        })
        .catch((e) => {
          commit('setMy', {
            stakeAmount: 0, claimAmount: 0, totalClaimedAmount: 0, isCanUnstake: false, isCanClaim: false, estimateAPR: 0.0,
          });
        })
        .finally(() => {
          commit('setLoadingMy', false);
        });
    }
  },
};
