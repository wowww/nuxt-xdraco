import WemixConstants from '@/utils/wemix/constants';

export const namespaced = true;

const createRequestUrl = (oAuth, requestId, clientId, type) => {
  const convert = (type) => {
    switch (type) {
      case WemixConstants.TYPE.AUTH:
        return 'authentication';
      case WemixConstants.TYPE.SIGN:
        return 'signature';
      default:
        return 'error';
    }
  };
  return `${oAuth}/api/v2/a2a/launch/${convert(type)}?request_id=${requestId}&client_id=${clientId}`;
};

const createResultUrl = (oAuth, requestId, clientId) => {
  return `${oAuth}/api/v2/a2a/result?request_id=${encodeURIComponent(requestId)}&client_id=${clientId}`;
};

export const state = () => ({
  wallet: undefined,
  information: {
    oAuth: process.env.VUE_APP_WEMIX_OAUTH_ENTRY_POINT,
    clientId: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
    url: '',
    expiresIn: 0,
    requestId: '',
  },
  modal: {
    permission: false,
    open: false,
    openLink: false,
    remainTime: 0,
    refreshable: false,
    type: undefined,
    kind: undefined,
    url: undefined,
    request: undefined,
    response: undefined,
    onSuccess: (params) => {
      // do something in the future
    },
    onFailed: (params) => {
      // do something in the future
    },
  },
  timer: undefined,
  loginResult: undefined,
});

export const mutations = {
  setInformation(state, payload) {
    state.information = payload;
  },
  setModal(state, payload) {
    state.modal = payload;
  },
  setOpenLink(state, payload) {
    state.modal.openLink = payload;
  },
  setTimer(state, payload) {
    state.timer = payload;
  },
  setLoginResult(state, payload) {
    state.loginResult = payload;
  },
  setWallet(state, payload) {
    state.wallet = payload;
  },
  setResult(state, payload) {
    state.result = payload;
  },
};

export const actions = {
  prepare({ state, commit }) {
    const { type, request } = state.modal;
    const { oAuth, clientId } = state.information;
    const { jwt } = request || {};

    this.$wemix.api.prepare(
      {
        type,
        data: jwt,
      })
      .then(({ data: { data } }) => {
        if (!data) return;
        const requestUrl = state.modal.url || createRequestUrl(oAuth, data.request_id, clientId, type);

        console.log('request url', requestUrl);

        commit('setInformation', {
          ...state.information,
          clientId,
          url: requestUrl,
          expiresIn: data.expires_in,
          requestId: data.request_id,
        });
        commit('setModal', { ...state.modal, remainTime: data.expires_in, openLink: this.$device.isMobile });
      });
  },
  login({ commit }) {
    commit('setModal', { open: true, type: WemixConstants.TYPE.AUTH });
  },
  sendTransaction({ state, commit }, payload) {
    commit('setModal', { ...payload, open: true, type: WemixConstants.TYPE.SIGN });
  },
  mirage({ state, commit }, payload) {
    commit('setModal', { ...payload, open: true });
  },
  transactionUnsigned({ state, commit }) {
    commit('setModal', { ...state.modal, open: false });
    if (state.modal.onSuccess) {
      state.modal.onSuccess(state.modal.response);
    }
  },
  transactionSigned({ state, commit }) {
    commit('setModal', { ...state.modal, open: false });
    if (state.modal.onSuccess) {
      state.modal.onSuccess(state.modal.response);
    }
  },
  close({ state, commit }) {
    clearInterval(state.timer);
    commit('setModal', { open: false, remainTime: 0 });
  },
  checkStatus({ state, commit, dispatch }) {
    const { status } = state.modal.response || {};
    if (status === 'confirm') {
      return;
    }

    const { oAuth, requestId, clientId } = state.information;
    const checkResultUrl = createResultUrl(oAuth, requestId, clientId);
    this.$axios.$get(checkResultUrl)
      .then((response) => {
        commit('setModal', { ...state.modal, response });
      })
      .catch(() => {
        dispatch('clearCountdown');
      });
  },
  executeTransaction({ state, commit }) {
    const { kind, request, response } = state.modal;
    const { req, payload } = request || {};
    const { hashData, type } = req || {};
    const { result } = response;
    const [hash] = hashData;
    const [signType] = type;
    const [signature] = JSON.parse(result);
    this.$wemix.api.sendSignedTransaction(kind, {
      hash: hash.hash || hash,
      signature,
      signType,
      payload: { ...payload, languageCode: this.$i18n.locale },
    })
      .then(({ data }) => {
        commit('setModal', { ...state.modal, open: false });
        if (state.modal.onSuccess) {
          state.modal.onSuccess(data);
        }
      });
  },
  getToken({ state, commit, dispatch }) {
    this.$wemix.api.requestToken({
      code: state.modal.response.result,
      grant_type: 'code',
    }).then(({ data }) => {
      const dracoAccessToken = data.accessToken || data.data.accessToken;
      const wemix = data.wemix || data.data.wemix;
      const wemixAccessToken = wemix.access_token || wemix.accessToken;
      const wemixWalletAddress = wemix.address || wemix.walletAddress;
      commit('setAccessToken', wemixAccessToken, { root: true });
      commit('setDracoAccessToken', dracoAccessToken, { root: true });
      commit('setWalletAddress', wemixWalletAddress, { root: true });

      const game = data.game || data.data.game;
      if (game) {
        commit('account/setExist', game.accountExists || 0, { root: true });
        if (game.representCharacter) {
          commit('account/setRepresent', game.representCharacter, { root: true });
        }
      }
      commit('setModal', { ...state.modal, open: false, result: data });
      dispatch('walletLogin');
    }).catch((error) => {
      commit('setModal', { ...state.modal, open: false });
      commit('setCommonModal', { open: true, message: this.$t('s.xdraco.common.err.message') + `(${error.code})` }, { root: true });
    });
  },
  walletLogin({ commit, dispatch }) {
    const locale = this.$i18n.locale;
    const locales = ['en', 'ko', 'cn', 'tw'];
    const defaultLocale = 'en';
    this.$wemixApi.post('/login', { lang: locales.includes(locale) ? locale : defaultLocale }).then(({ data }) => {
      commit('setWallet', data);
      dispatch('fetchBalance', null, { root: true });
    }).catch(({ response }) => {
      console.log('wemix wallet login failed', response);
      if (response.status === 401) {
        dispatch('logOut', null, { root: true });
      }
    });
  },
  setCountdown({ state, commit }, timer) {
    commit('setTimer', timer);
  },
  clearCountdown({ state, commit }) {
    commit('setModal', { ...state.modal, remainTime: 0 });
    clearInterval(state.timer);
  },
  decreaseRemain({ state, commit }) {
    if (state.modal.remainTime <= 0) {
      clearInterval(state.timer);
    } else {
      commit('setModal', { ...state.modal, remainTime: state.modal.remainTime - 1 });
    }
  },
  fetchModal({ state, commit }, data) {
    commit('setModal', { ...state.modal, ...data });
  },
};
