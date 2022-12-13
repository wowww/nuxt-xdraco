import BigNumber from 'bignumber.js';
import goTo from 'vuetify/lib/services/goto';
import dayjs from 'dayjs';
import { dracoStorage } from '@/utils/baseUtil';
import { STORAGE_KEY } from '@/constants/accounts';

export const namespaced = true;

const INIT_MODAL = () => ({
  className: '',
  open: false,
  title: '',
  desc: '',
  primary: '',
  secondary: '',
  onPrimary: null,
  onSecondary: null,
  onClose: null,
});

export const state = () => ({
  loading: false,
  afterLogin: false,
  now: dayjs().utcOffset(8).unix(),
  defaultNumberDigits: 4,
  openDracoLogin: false,
  openLogin: false,
  openAccount: false,
  openEvent: false,
  openNavMore: false,
  dracoAccessToken: undefined,
  accessToken: undefined,
  walletAddress: undefined,

  userInfo: null,
  userId: undefined,
  balanceLoading: false,
  balance: null,
  commonModal: INIT_MODAL(),
  devMode: process.env.NODE_ENV,
  cookieNotAvailable: false,

  smeltingFee: 50,
  derby: [],
  hydraSupply: null,

  dracoRate: null,
  hydraRate: null,

  chartPeriod: 'daily',

  draco: {
    daily: null,
    weekly: null,
    monthly: null,
    max: null,
  },
  hydra: {
    daily: null,
    weekly: null,
    monthly: null,
    max: null,
  },

  openTermsOfUse: false,
  drainPart: 'part2',
  notifications: [],

  isDesktop: false,
  hasInventory: false,
});

export const getters = {
  now(state) {
    return state.now;
  },
  defaultNumberDigits(state) {
    return state.defaultNumberDigits;
  },
  userId: (state) => state.userId,
  userInfo: (state) => state.userInfo,
  smeltingCost(state) {
    if (state.derby.length > 0) {
      const today = state.derby.slice(-1)[0];
      return Number(today.DS) + (today.SmeltingCost ? Number(today.SmeltingCost) : state.smeltingFee);
    }

    return 100000;
  },
  dracoUsd: (state) => {
    return Number(state.dracoRate ? state.dracoRate.USDDracoRate : 0);
  },
  dracoUsdPrev: (state) => {
    const prev = Number(state.dracoRate ? state.dracoRate.USDDracoRatePrev : 0);
    if (prev === 0) {
      return Number(1.79297417);
    }
    return prev;
  },
  dracoUsdChange: (state, getters) => {
    const { dracoUsd: current, dracoUsdPrev: prev } = getters;
    return ((current - prev) / prev) * 100;
  },
  dracoWemix: (state) => {
    return Number(state.dracoRate ? state.dracoRate.DracoPrice : 0);
  },
  dracoWemixPrev: (state) => {
    return Number(state.dracoRate ? state.dracoRate.DracoPricePrev : 0);
  },
  dracoWemixChange: (state, getters) => {
    const { dracoWemix: current, dracoWemixPrev: prev } = getters;
    return ((current - prev) / prev) * 100;
  },
  hydraUsd: (state) => {
    return Number(state.hydraRate ? state.hydraRate.USDHydraRate : 0);
  },
  hydraUsdPrev: (state) => {
    return Number(state.hydraRate ? state.hydraRate.USDHydraRatePrev : 0);
  },
  hydraUsdChange: (state, getters) => {
    const { hydraUsd: current, hydraUsdPrev: prev } = getters;
    return ((current - prev) / prev) * 100;
  },
  hydraWemix: (state) => {
    return Number(state.hydraRate ? state.hydraRate.HydraPrice : 0);
  },
  hydraWemixPrev: (state) => {
    return Number(state.hydraRate ? state.hydraRate.HydraPricePrev : 0);
  },
  hydraWemixChange: (state, getters) => {
    const { hydraWemix: current, hydraWemixPrev: prev } = getters;
    return ((current - prev) / prev) * 100;
  },
};

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setSeasons(state, payload) {
    state.seasons = { ...payload };
  },
  setRounds(state, payload) {
    state.rounds = { ...payload };
  },
  setCurrentSeason(state, payload) {
    if (state.seasons.items.length > 0) {
      state.seasons = {
        ...state.seasons,
        current: state.seasons.items.find((item) => `${item.seasonID}` === payload),
      };
    }
  },
  setRoundType(state, payload) {
    state.rounds.type = payload;
  },
  setOpen(state, payload) {
    state.open = payload;
  },
  setCurrentRound(state, payload) {
    state.rounds = {
      ...state.rounds,
      current: state.rounds.items.find((item) => item.dspID === payload),
    };
  },
  setDspId(state, payload) {
    state.dspId = payload;
  },
  setOpenWinner(state, payload) {
    state.openWinner = payload;
  },
  setOpenReward(state, payload) {
    state.openReward = payload;
  },
  setDracoRate(state, payload) {
    state.dracoRate = payload;
  },
  setHydraRate(state, payload) {
    state.hydraRate = payload;
  },
  setDrainPart(state, payload) {
    state.drainPart = payload;
  },
  setAfterLogin(state, payload) {
    state.afterLogin = payload;
  },
  setNow(state) {
    state.now = dayjs().utc().unix();
  },
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    if (accessToken) {
      dracoStorage.set(STORAGE_KEY.WEMIX_TOKEN, accessToken);
    } else {
      dracoStorage.remove(STORAGE_KEY.WEMIX_TOKEN);
    }
  },
  setDracoAccessToken(state, payload) {
    state.dracoAccessToken = payload;
    if (payload) {
      dracoStorage.set(STORAGE_KEY.DRACO_TOKEN, payload);
    } else {
      dracoStorage.remove(STORAGE_KEY.DRACO_TOKEN);
    }
  },
  setWalletAddress(state, payload) {
    state.walletAddress = payload;

    if (payload) {
      dracoStorage.set(STORAGE_KEY.DRACO_WALLET, payload);
    } else {
      dracoStorage.remove(STORAGE_KEY.DRACO_WALLET);
    }
  },
  setUserId(state, userId) {
    this.userId = userId;

    if (userId) {
      dracoStorage.set(STORAGE_KEY.WEMIX_USER_ID, userId);
    } else {
      dracoStorage.remove(STORAGE_KEY.WEMIX_USER_ID);
    }
  },
  setBalanceLoading(state, payload) {
    state.balanceLoading = payload;
  },
  setBalance(state, payload) {
    state.balance = payload;
  },
  setUserInfo(state, payload) {
    state.userInfo = { ...payload };
  },
  setOpenDracoLogin(state, payload) {
    state.openDracoLogin = payload;
  },
  setOpenLogin(state, payload) {
    state.openLogin = payload;
  },
  setOpenEvent(state, payload) {
    state.openEvent = payload;
  },
  setCommonModal(state, payload) {
    state.commonModal = { ...payload };
  },
  setCookieNotAvailable(state, payload) {
    state.cookieNotAvailable = payload;
  },
  setOpenNavMore(state) {
    state.openNavMore = !state.openNavMore;
  },
  setDerby(state, payload) {
    state.derby = payload;
  },
  setHydraSupply(state, payload) {
    state.hydraSupply = payload;
  },
  setChartPeriod(state, payload) {
    state.chartPeriod = payload;
  },
  setDraco(state, payload) {
    state.draco = payload;
  },
  setHydra(state, payload) {
    state.hydra = payload;
  },
  setOpenTermsOfUse(state, payload) {
    state.openTermsOfUse = payload;
  },
  setNotifications(state, payload) {
    state.notifications = payload;
  },

  setIsDesktop(state, payload) {
    state.isDesktop = payload;
  },
  setHasInventory(state, payload) {
    state.hasInventory = payload;
  },
};

export const actions = {
  logOut({ commit }) {
    commit('setAccessToken', null);
    commit('setDracoAccessToken', null);
    commit('setUserInfo', null);
    commit('setUserId', null);
    commit('setWalletAddress', null);

    commit('account/setRepresent', null);
    commit('mirage/setAccountInfo', null);

    dracoStorage.remove(STORAGE_KEY.WEMIX_TOKEN);
    dracoStorage.remove(STORAGE_KEY.WEMIX_USER_ID);
    dracoStorage.remove(STORAGE_KEY.DRACO_TOKEN);
    dracoStorage.remove(STORAGE_KEY.DRACO_CHARACTER);
  },
  closeModal({ commit }) {
    commit('setCommonModal', INIT_MODAL());
  },
  wemixLogout({ commit }) {
    commit('setAccessToken', null);
    dracoStorage.remove(STORAGE_KEY.WEMIX_TOKEN);
    dracoStorage.remove(STORAGE_KEY.WEMIX_USER_ID);
  },
  postLogin({ state, dispatch, commit }) {
    if (state.accessToken && state.accessToken !== 'test') {
      this.$wemixApi.post('/login', { lang: this.$i18n.locale }).then(({ data }) => {
        commit('setUserInfo', {
          id: data.userID,
          address: data.address,
          tokens: data.tokens,
        });
        commit('setWalletAddress', data.address);
      });
      dispatch('fetchBalance');
    }
  },
  fetchPrice({ state }) {
    if (state.accessToken) {
      this.$wemixApi
        .post(`/price/all`, {})
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  // eslint-disable-next-line no-unused-vars
  fetchCurrent({ state }, symbol) {
    if (state.accessToken && state.accessToken !== 'test') {
      this.$wemixApi
        .post('/chart/current', {})
        .then((data) => {
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  fetchBalance({ commit, state, dispatch }) {
    if (!state.accessToken) {
      return;
    }

    commit('setBalanceLoading', true);
    commit('setBalance', null);

    this.$wemixApi
      .post('/balance/balanceAll')
      .then(({ data }) => {
        console.log('fetch balance', data);
        const rest = 10 ** 18;

        const balanceData = {};

        Object.entries(data.balances).forEach(([key, value]) => {
          const nv = new BigNumber(value).div(rest).toNumber();

          balanceData[key] = Number(nv.toFixed(6));
        });

        commit('setBalance', balanceData);
      })
      .catch(() => {
        dispatch('logOut');
        commit('setBalance', null);
      })
      .finally(() => {
        commit('setBalanceLoading', false);
      });
  },
  fetchWalletAddress({ state, commit }) {
    if (state.dracoAccessToken && !state.walletAddress) {
      this.$dracoWebApi
        .get('/login/gamewalletaddress')
        .then(({ data }) => {
          if (data.code === 200) {
            commit('setDracoWalletAddress', data.data.walletAddress);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  fetchDerby({ commit }) {
    this.$dracoApi
      .post('/wallet/prices/derby')
      .then(({ data }) => {
        commit('setDerby', data.Data || []);
      })
      .catch((e) => {
        commit('setDerby', []);
      });
  },
  fetchHydraSupply({ commit }) {
    this.$dracoApi
      .post('/wallet/prices/hydra')
      .then(({ data }) => {
        console.log(data);
        if (data.Code === 200) {
          commit(
            'setHydraSupply',
            data.Data.length > 0
              ? data.Data[data.Data.length - 1]
              : {
                CreatedDate: '',
                HydraSupply: 0,
                PrevHydraSupply: 0,
                TotalSupply: 0,
              },
          );
        } else {
          commit('setHydraSupply', {
            CreatedDate: '',
            HydraSupply: 0,
            PrevHydraSupply: 0,
            TotalSupply: 0,
          });
        }
      })
      .catch(() => {
        commit('setHydraSupply', null);
      });
  },
  fetchDracoLastest({ commit }) {
    this.$dracoApi
      .post(`/wallet/prices/draco/lastest`)
      .then(({ data }) => {
        commit('setDracoRate', data.Data);
      })
      .catch(() => {
        commit('setDracoRate', null);
      });
  },
  fetchHydraLastest({ commit }) {
    this.$dracoApi
      .post(`/wallet/prices/hydra/lastest`)
      .then(({ data }) => {
        commit('setHydraRate', data.Data);
      })
      .catch(() => {
        commit('setHydraRate', null);
      });
  },
  fetchDraco({ commit, state }) {
    const option = state.chartPeriod ? state.chartPeriod : 'daily';

    this.$dracoApi
      .post(`/wallet/prices/draco/${option}`)
      .then(({ data }) => {
        const chartData = { ...state.draco };
        chartData[option] = data.Data;

        commit('setDraco', { ...chartData });
      })
      .catch((e) => {
        const chartData = { ...state.draco };
        chartData[option] = null;

        commit('setDraco', { ...chartData });
      });
  },
  fetchHydra({ commit, state }) {
    const option = state.chartPeriod ? state.chartPeriod : 'daily';

    this.$dracoApi
      .post(`/wallet/prices/hydra/${option}`)
      .then(({ data }) => {
        const chartData = { ...state.hydra };
        chartData[option] = data.Data;

        commit('setHydra', { ...chartData });
      })
      .catch((e) => {
        const chartData = { ...state.hydra };
        chartData[option] = null;

        commit('setHydra', { ...chartData });
      });
  },
  fetchTwitterNotification({ commit }) {
    this.$dracoApi
      .get('/noti', { params: { start_time: dayjs().subtract(1, 'day').toISOString() } })
      .then(({ data }) => {
        if (data.code === 200) {
          commit('setNotifications', data.data);
        }
      })
      .catch(() => {
        commit('setNotifications', []);
      });
  },
  fetchDrainPart({ commit }, { targetContents, targetSelector }) {
    commit('setDrainPart', targetContents);
    goTo(targetSelector, {});
  },

  fetchIsDesktop({ commit }) {
    commit('setIsDesktop', window.innerWidth >= 900);
  },
  fetchHasInventory({ commit }) {
    commit('setHasInventory', window.innerWidth >= 960 && window.innerWidth < 1240);
  }
};
