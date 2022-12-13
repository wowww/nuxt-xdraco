import { RoundState } from '@/constants/dsp/dsp-round';

export const namespaced = true;

export const state = () => ({
  loading: false,
  open: false,
  openWinner: false,
  openReward: false,
  seasons: {
    current: null,
    loading: false,
    items: [],
    error: null,
  },
  dspId: null,
  rounds: {
    type: RoundState.ONGOING,
    loading: false,
    current: null,
    items: [],
    count: {
      ongoing: 0,
      upcoming: 0,
      closed: 0,
      my: 0,
    },
    error: null,
  },
});

export const getters = {
  seasons: (state) => state.seasons.items,
  seasonLoading: (state) => state.seasons.loading,
  currentSeason: (state) => state.seasons.current,
  roundLoading: (state) => state.rounds.loading,
  roundType: (state) => state.rounds.type,
  roundCount: (state) => state.rounds.count,
  rounds: (state) => state.rounds.items,
  currentRound: (state) => state.rounds.current,
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
};

export const actions = {
  fetchSeasons({ state, commit }) {
    commit('setSeasons', { ...state.seasons, loading: true });

    if (process.env.NODE_ENV === 'local') {
      commit('setSeasons', {
        current: { seasonId: 1, seasonName: 'SEASON 1', state: 1 },
        loading: false,
        items: [{ seasonId: 1, seasonName: 'SEASON 1', state: 1 }],
        error: null,
      });
      return;
    }

    this.$dracoWebApi
      .get('/dsp/seasons')
      .then(({ data }) => {
        const items = [];

        if (data.data) {
          data.data.forEach((item) => items.push(item));
        }
        const activeSeasons = items.find((item) => item.state === 1);

        commit('setSeasons', {
          current: activeSeasons || items[items.length - 1] || null,
          loading: false,
          items: [...items.sort((a, b) => (a.seasonID > b.seasonID ? -1 : 1))],
          error: null,
        });
      })
      .catch((e) => {
        commit('setSeasons', {
          current: null,
          loading: false,
          items: [],
          error: '통신에 실패했습니다.',
        });
      });
  },
  fetchRounds({ state, commit, rootState }) {
    commit('setRounds', { ...state.rounds, loading: true, items: [] });

    this.$dracoWebApi
      .get(rootState.dracoAccessToken ? '/dsp/myrounds' : '/dsp/rounds', {
        params: {
          seasonID: state.seasons.current.seasonID,
          type: state.rounds.type,
          languageCode: this.$i18n.locale,
        },
      })
      .then(({ data }) => {
        const timestamp = this.$dayjs().utcOffset(8).unix();

        let myRound = 0;

        if (data.data.roundList) {
          data.data.roundList.forEach((round) => {
            if (round.endDate < timestamp) {
              round.state = RoundState.CLOSED;
            } else if (round.startDate < timestamp) {
              round.state = RoundState.ONGOING;
            } else if (round.preStartDate < timestamp) {
              round.state = RoundState.ONGOING;
            } else {
              round.state = RoundState.UPCOMING;
            }

            if (round.myinfo && round.myinfo.currentStake > 0) {
              myRound += 1;
            }

            if (round.item.passiveOption && round.item.passiveOption.desc) {
              round.item.passiveOption.desc = round.item.passiveOption.desc.replaceAll('\\r\\n', '<br>');
            }

            if (round.item.itemNote) {
              round.item.itemNote = round.item.itemNote.replaceAll('\\r\\n', '<br>');
            }
          });
        }

        commit('setRounds', {
          type: state.rounds.type,
          loading: false,
          items: data.data.roundList || [],
          count: {
            ongoing: data.data.count.ongoing || 0,
            upcoming: data.data.count.upcoming || 0,
            closed: data.data.count.closed || 0,
            my: myRound || 0,
          },
          error: null,
        });

        // commit('setCurrentRound', data.data.roundList[0].dspID);
        // commit('setOpenWinner', true);
      })
      .catch((e) => {
        commit('setRounds', {
          type: state.rounds.type,
          loading: false,
          items: [],
          error: e.response.message || '통신에 실패했습니다.',
        });
      });
  },
};
