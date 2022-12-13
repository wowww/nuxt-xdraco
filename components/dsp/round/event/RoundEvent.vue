<template>
  <div class="dsp-preround">
    <button v-if="accessToken" type="button" class="btn btn-sm btn-logout" @click="logOut">Logout</button>
    <h2 class="title"><em class="hidden">DSP Preparation Event</em></h2>
    <h3 class="desc" v-html="$t('s.rounds.event.description.1')"></h3>

    <div class="wrap-button">
      <p class="deadline">
        <time datetime="2021-11-08T:23:59:59+08:00">{{ $t('s.rounds.event.description.2') }}</time>
      </p>
      <button v-if="!accessToken" type="button" class="btn-wemix" @click.stop="setOpenLogin(true)"><em class="hidden">WEMIX </em>LOGIN</button>
      <template v-else>
        <button v-if="validAll" type="button" class="btn btn-secondary" @click.stop="openEvenJoin()">JOIN NOW</button>
        <button v-else-if="joinable.period === 0" type="button" class="btn" disabled="disabled">
          {{ $t('s.rounds.event.early.end') }}
        </button>
        <button v-else-if="joinable.nonJoin === 0" type="button" class="btn btn-disabled" @click.stop="openError(60306)">
          {{ $t('s.rounds.event.message.already') }}
        </button>
        <button v-else type="button" class="btn btn-disabled" @click.stop="openEvenJoin()">
          <span class="btn-message">
            <template v-if="joinable.period === 0">{{ $t('s.rounds.event.early.end') }}</template>
            <template v-else-if="joinable.nonJoin === 0">{{ $t('s.rounds.event.message.already') }}</template>
            <template v-else>{{ $t('s.rounds.event.message.requirement') }}</template>
          </span>
        </button>
      </template>
    </div>
    <v-dialog v-model="openEvent" content-class="dialog-launch theme-dark" max-width="720" persistent :fullscreen="!isDesktop">
      <div class="content">
        <v-btn class="btn-close" fab plain x-small @click="closeEvent()">
          <v-icon color="#fff" size="26">mdi-close</v-icon>
        </v-btn>
        <div class="dialog-header">
          <h4 class="title"><em class="hidden">DSP KICKOFF EVENT, We've Got You CoVered!</em></h4>
          <div class="desc">
            <p v-html="$t('s.rounds.event.message.welcome')"></p>

            <small>{{ $t('s.rounds.event.message.only-once') }}</small>
          </div>
        </div>
        <div class="event-content">
          <template v-if="!joinComplete">
            <strong v-if="!validAll" class="notice alert">
              <template v-if="!validDraco">{{ $t('s.rounds.event.message.not-enuogh-draco') }}<br /></template>
              <template v-if="!validAccount">{{ $t('s.rounds.event.mssage.not-linked') }}<br /></template>
              <template v-if="!validLimit">{{ $t('s.rounds.event.message.exhauted') }}<br /></template>
            </strong>
            <strong v-else class="notice">{{ $t('s.rounds.event.message.allpass') }}</strong>
            <ul class="event-step">
              <li class="step1" :class="{ alert: !validDraco }">
                <div class="wrap-detail">
                  <span v-if="!validDraco" class="ico-close-point"><em class="hidden">Not Yet</em></span>
                  <span v-else class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <strong class="ico-darco ico-sm add-inside">10</strong>
                  </div>
                  <div class="condition">
                    {{ $t('s.rounds.event.info.draco') }}
                  </div>
                </div>
              </li>
              <li class="step2" :class="{ alert: !validAccount }">
                <div class="wrap-detail">
                  <span v-if="!validAccount" class="ico-close-point"><em class="hidden">Not Yet</em></span>
                  <span v-else class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <strong class="ico-wemixbox ico-sm"></strong>
                    <strong class="ico-mir4box ico-sm"></strong>
                  </div>
                  <div class="condition" v-html="$t('s.rounds.event.info.account')"></div>
                </div>
              </li>
              <li class="step3" :class="{ alert: !validLimit }">
                <div class="wrap-detail">
                  <span v-if="!validLimit" class="ico-close-point"><em class="hidden">Not Yet</em></span>
                  <span v-else class="ico-checked"><em class="hidden">Checked</em></span>
                  <div class="goal">
                    <div class="membercount">
                      <small>Current Participant</small>
                      <strong>{{ joinParticipant | currency(0) }}</strong>
                    </div>
                  </div>
                  <div class="condition" v-html="$t('s.rounds.event.info.participant')"></div>
                </div>
              </li>
            </ul>
          </template>
          <div v-else class="wrap-reward">
            <img src="https://file.mir4global.com/xdraco/img/desktop/promotion/2111/reward-1draco.webp" width="293" alt="REWARD 1DRACO" class="ticket" />
            <h4 class="message" v-html="$t('s.rounds.event.message.complete')"></h4>
            <p class="desc" v-html="$t('s.rounds.event.message.reward')"></p>
          </div>

          <div class="wrap-button">
            <template v-if="!joinComplete">
              <p class="deadline">
                <time datetime="2021-11-08T:23:59:59+08:00" v-html="$t('s.rounds.event.description.2')" />
              </p>
              <button v-if="!validAll" type="button" aria-disabled="true" class="btn">
                <template v-if="joinable.nonJoin === 0">{{ $t('s.rounds.event.message.already') }}</template>
                <template v-else>{{ $t('s.rounds.event.message.requirement') }}</template>
              </button>
              <button v-else type="button" class="btn btn-secondary" :disabled="loading" @click="postEventAirDrop">
                <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
                <template v-else>JOIN NOW</template>
              </button>
            </template>
            <button v-else type="button" class="btn btn-primary2" :disabled="loading" @click="joinOk">
              <v-progress-circular v-if="loading" class="ml-2" :size="16" :width="2" color="#fff" indeterminate></v-progress-circular>
              <template v-else>OK</template>
            </button>
          </div>
        </div>
      </div>
    </v-dialog>
    <v-dialog v-model="eventError" content-class="dialog-common" max-width="480" persistent>
      <div class="content">
        <v-btn class="btn-close" fab plain x-small @click="eventError = 0">
          <v-icon color="#000" size="26">mdi-close</v-icon>
        </v-btn>
        <!-- dialogTitle이 있는 경우 대비 -->
        <div class="dialog-header">&nbsp;</div>
        <div class="wrap-notice">
          <div class="msgbox vcenter">
            <div>
              <h4 class="title">Error</h4>
              <div v-if="eventErrorCode === 60306" class="desc" v-html="$t('s.rounds.event.message.already')"></div>
              <div v-else class="desc">
                {{ $t('s.rounds.event.message.requirement') }}
                <template v-if="eventErrorCode > 0">({{ eventErrorCode }})</template>
              </div>
              <div class="wrap-button">
                <button type="button" class="btn btn-primary btn-sm" @click="eventError = 0">{{ $t('w.dsp.common.close') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'RoundEvent',
  setup(props, { root }) {
    const { $dracoWebApi } = root;
    const state = reactive({
      joinCheck: false,
      joinParticipant: 0,
      joinable: {
        character: 0,
        limit: 0,
        period: 1,
        nonBlock: 0,
        nonJoin: 1,
      },
      loading: false,
      joinComplete: false,
      eventError: 0,
      eventErrorCode: 0,
    });

    const { accessToken, userInfo, balance, openEvent, isDesktop } = useState(['accessToken', 'userInfo', 'balance', 'openEvent', 'isDesktop']);
    const { setAccessToken, setOpenLogin, setOpenEvent } = useMutations(['setAccessToken', 'setOpenLogin', 'setOpenEvent']);
    const { postLogin, fetchBalance, logOut } = useActions(['postLogin', 'fetchBalance', 'logOut']);

    const validDraco = computed(() => {
      if (!balance.value || !balance.value.DRACO) {
        return false;
      }

      return balance.value.DRACO >= 10;
    });

    const validAccount = computed(() => {
      const { joinable } = state;
      return joinable.character === 1 && joinable.nonBlock === 1;
    });

    const validLimit = computed(() => {
      const { joinable } = state;
      return joinable.limit === 1;
    });

    const validAll = computed(() => {
      return validDraco.value && validAccount.value && validLimit.value && state.joinable.nonJoin === 1 && state.joinable.period === 1;
    });

    const openError = (code = 0) => {
      state.eventError = true;
      state.eventErrorCode = code;
    };

    const fetchEventAirDrop = () => {
      if (!userInfo.value) return;

      state.loading = true;

      $dracoWebApi
        .get('/event/airdrop', {
          params: {
            scope: 'joinstate',
            walletaddress: userInfo.value.address,
          },
        })
        .then(({ data }) => {
          state.loading = false;
          if (data.data) {
            state.joinParticipant = data.data.joinParticipant;
            state.joinable = { ...data.data.joinable };
          }
        })
        .catch(() => {
          state.loading = false;
          state.joinParticipant = 0;
          state.joinable = {
            character: 0,
            limit: 0,
            period: 0,
            nonBlock: 0,
            nonJoin: 0,
          };
        });
    };
    const postEventAirDrop = () => {
      if (!userInfo.value) return;
      state.loading = true;

      $dracoWebApi
        .post('/event/airdrop', {
          walletaddress: userInfo.value.address,
        })
        .then(({ data }) => {
          state.loading = false;

          if (data.code === 200) {
            state.joinComplete = true;
          } else {
            state.eventError = true;
            state.eventErrorCode = data.code;
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };
    const joinOk = () => {
      setOpenEvent(false);
      state.joinComplete = false;
      fetchEventAirDrop();
    };

    const openEvenJoin = () => {
      state.eventDialog = true;
      if (!state.joinCheck) state.joinCheck = true;

      setOpenEvent(true);
      fetchEventAirDrop();
    };

    const closeEvent = () => {
      setOpenEvent(false);
    };

    watch(userInfo, () => fetchEventAirDrop());

    onMounted(() => {
      if (!state.joinCheck) {
        fetchEventAirDrop();
      }

      if (accessToken) {
        fetchBalance();
      }
    });

    return {
      ...toRefs(state),
      isDesktop,
      accessToken,
      userInfo,
      balance,
      validDraco,
      validAccount,
      validLimit,
      validAll,
      setAccessToken,
      openEvent,
      setOpenLogin,
      setOpenEvent,
      postLogin,
      fetchBalance,
      joinOk,
      fetchEventAirDrop,
      postEventAirDrop,
      openEvenJoin,
      closeEvent,
      openError,
      logOut,
    };
  },
  methods: {
    login() {
      return this.$store.dispatch('wemix/open');
    },
  },
});
</script>
