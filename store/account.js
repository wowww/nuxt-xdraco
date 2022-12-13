import { STORAGE_KEY } from '@/constants/accounts';
import { dracoStorage } from '@/utils/baseUtil';

export const namespaced = true;

export const state = () => ({
  loading: false,
  open: false,
  active: 0,
  exist: 0,
  worldNames: [],
  selectedWorldName: '',
  allCharacters: [],
  characters: [],
  notifies: [],
  represent: dracoStorage.get(STORAGE_KEY.DRACO_CHARACTER) ? JSON.parse(dracoStorage.get(STORAGE_KEY.DRACO_CHARACTER)) : null,
});

export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
  setOpen(state, payload) {
    state.open = payload;
  },
  setActive(state, payload) {
    state.active = payload;
  },
  setExist(state, paylaod) {
    state.exist = paylaod;
  },
  setWorldNames(state, payload) {
    state.worldNames = payload;
  },
  setSelectedWorldName(state, payload) {
    state.selectedWorldName = payload;
  },
  setAllCharacters(state, payload) {
    state.allCharacters = payload;
  },
  setCharacters(state, payload) {
    state.characters = payload;
  },
  setNotifies(state, payload) {
    state.notifies = payload;
  },
  setRepresent(state, payload) {
    state.represent = payload;

    if (payload) {
      dracoStorage.set(STORAGE_KEY.DRACO_CHARACTER, JSON.stringify(payload));
    } else {
      dracoStorage.remove(STORAGE_KEY.DRACO_CHARACTER);
    }
  },
};

export const actions = {
  fetchRepCharacter({ commit, rootState }) {
    this.$dracoWebApi
      .get('/login/repcharacter')
      .then(({ data }) => {
        if (data.code === 200) {
          if (data.data.game) {
            commit('setExist', data.data.game.accountExists || 0);
            if (data.data.game.representCharacter) {
              commit('setRepresent', data.data.game.representCharacter);
            }
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },
  fetchUserCharacter({ state, commit, dispatch, rootState }, characterUID = '') {
    commit('setLoading', true);
    this.$dracoWebApi
      .get('/user/characters')
      .then(({ data }) => {
        commit('setLoading', false);
        if (!rootState.devMode && (data.code === 60002 || data.code === 60003)) {
          commit('setOpen', false);
        }

        if (data.code === 200 && data.data) {
          const worldName = [];
          data.data.forEach((item) => {
            worldName.push(Object.keys(item));
          });
          commit('setWorldNames', worldName);
          if (!state.selectedWorldName) {
            commit('setSelectedWorldName', [state.represent.worldName || worldName[0]]);
          }
          // commit('setAllCharacters', data.data);

          for (let i = 0; i < data.data.length; i += 1) {
            const keys = Object.keys(data.data[i]);
            for (let j = 0; j < keys.length; j += 1) {
              const characters = data.data[i][keys[j]];

              for (let k = 0; k < characters.length; k += 1) {
                if (`${characters[k].characterUID}` === characterUID) {
                  console.log(keys[j]);
                  commit('setSelectedWorldName', [keys[j]]);
                }
              }
            }
          }
        }
      })
      .catch((e) => {
        if (!rootState.devMode && e.response.code === 401) {
          commit('setOpen', false);
        }
        commit('setLoading', true);
      });
  },
  fetchChannelUserCharacter({ state, commit, dispatch, rootState }) {
    commit('setLoading', true);
    this.$dracoWebApi
      .get('/user/currentcharacters', { params: { worldName: state.selectedWorldName[0] || state.represent.worldName } })
      .then(({ data }) => {
        console.log('get current characters', data);
        if (!rootState.devMode && (data.code === 60002 || data.code === 60003)) {
          commit('setOpen', false);
        }
        if (data.code === 200 && data.data) {
          console.log(data.data);
          commit('setCharacters', data.data[state.selectedWorldName[0] || state.represent.worldName]);
          // commit('setAllCharacters', [...state.allCharacters.filter((item) => !Object.keys(item).includes(state.selectedWorldName[0])), data.data]);

          const keys = Object.keys(data.data);
          for (let j = 0; j < keys.length; j += 1) {
            const characters = data.data[keys[j]];

            for (let k = 0; k < characters.length; k += 1) {
              if (characters[k].represent === 1) {
                let needUpdate = false;
                if (state.represent.worldName !== keys[j]) {
                  needUpdate = true;
                }

                if (state.represent.characterName !== characters[k].characterName) {
                  needUpdate = true;
                }

                if (state.represent.lv !== characters[k].lv) {
                  needUpdate = true;
                }

                if (state.represent.class !== characters[k].class) {
                  needUpdate = true;
                }

                if (needUpdate) {
                  dispatch('changeRepresentCharacter', characters[k].characterUID);
                }

                commit('setRepresent', {
                  ...characters[k],
                  worldName: keys[j],
                });
              }
            }
          }
        }
      })
      .catch((e) => {
        if (!rootState.devMode && e.response.code === 401) {
          commit('setOpen', false);
        }
      })
      .finally(() => {
        commit('setLoading', false);
      });
  },
  changeRepresentCharacter({ commit, rootState, dispatch }, characterUID) {
    commit('setLoading', true);
    this.$dracoWebApi
      .patch('/user/representcharacter', { characterUID })
      .then(({ data }) => {
        commit('setLoading', false);
        if (!rootState.devMode && (data.code === 60002 || data.code === 60003)) {
          commit('setOpen', false);
        }
        if (data.data) {
          commit('setRepresent', data.data.representCharacter);

          dispatch('fetchChannelUserCharacter');
        }
      })
      .catch((e) => {
        if (!rootState.devMode && e.response.code === 401) {
          commit('setOpen', false);
        }
        commit('setLoading', false);
      });
  },
  fetchNotifies({ rootState, commit }) {
    // if (!rootState.dracoAccessToken) {
    //   return;
    // }

    commit('setLoading', true);
    this.$dracoWebApi
      .get('/user/notifies', { params: { languageCode: this.$i18n.locale } })
      .then(({ data }) => {
        commit('setLoading', false);
        if (!rootState.devMode && (data.code === 60002 || data.code === 60003)) {
          commit('setOpen', false);
        }

        if (data.data) {
          commit('setNotifies', data.data);
        }
      })
      .catch((e) => {
        if (!rootState.devMode && e.response.code === 401) {
          commit('setOpen', false);
        }
        commit('setLoading', false);
      });
  },
};
