<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-bidding"
    :value="modalBossRaid.visible"
    scrollable
    :max-width="isDesktop ? '760px' : '100%'"
    :transition="!isDesktop? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div v-if="accountInfo" class="content">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close" />
      <div class="dialog-header">
        {{ assault ? $t('w.mirage.assault') : $t('w.mirage.enlist') }}
        <p class="available">
          {{ $t('s.mirage.available.nft') }}<span>{{ availableCharacters.length }}</span>
        </p>
      </div>
      <div class="chr-info">
        <div class="job">
          <span class="icon-job" :data-character-class="modalBossRaid.class"></span>
          <dl>
            <dt>{{ $t(`w.rounds.item.class.${modalBossRaid.class}`) }}</dt>
            <dd>Choose a character to be enlisted for the Boss Raid</dd>
          </dl>
        </div>
      </div>
      <div
        class="chr-content"
        :class="{ emptyRoster: availableCharacters.length === 0 }"
        :data-empty-message="'You do not have this type of NFT available in your roster.'"
      >
        <swiper v-if="availableCharacters.length > 0" ref="swiperEnlist" :options="swiperOptions">
          <swiper-slide v-for="rosterIdx in slots" :key="`enlist-${enlistClass}-roster-${rosterIdx}`">
            <template v-if="availableCharacters[rosterIdx]">
              <input
                :id="`enlist-${availableCharacters[rosterIdx].CharacterUID}`"
                type="radio"
                name="enlist-select"
                :disabled="1 < Number(availableCharacters[rosterIdx].State)"
                @change="selectCharacter(availableCharacters[rosterIdx].CharacterUID)"
              />
              <label :for="`enlist-${availableCharacters[rosterIdx].CharacterUID}`">
                <mirage-character :character="{ State: 0, ...availableCharacters[rosterIdx] }">
                  <mirage-character-status :character="availableCharacters[rosterIdx]" />
                </mirage-character>
              </label>
            </template>
            <span v-else class="no-character" :data-character-class="modalBossRaid.class"></span>
          </swiper-slide>
        </swiper>
        <div v-show="availableCharacters.length > 0" slot="button-prev" class="swiper-button-prev"></div>
        <div v-show="availableCharacters.length > 0" slot="button-next" class="swiper-button-next"></div>
        <validation-observer ref="form">
          <validation-provider
            v-slot="{ errors, failedRules }"
            :rules="{
              required: true,
              between: [
                Number(currentBossRaidInfo ? currentBossRaidInfo['VigorAmount'] : '1'),
                Number(accountInfo ? accountInfo['VigorAmount'] - 1 : 0),
              ],
            }"
          >
            <div class="item-input-wrap" :class="{ error: errors.length }">
              <div class="info-area">
                <p class="info-desc">
                  <span class="icon-info">info</span>
                  <span class="info-txt">
                    <template v-if="failedRules.hasOwnProperty('required')">Input your bid amount</template>
                    <template v-else-if="failedRules.hasOwnProperty('between')">{{ $t('s.hsp.main.input-stake.lack') }}</template>
                    <template v-else-if="failedRules.hasOwnProperty('decimal4')">{{ $t('s.hsp.main.add-stake.info') }}</template>
                    <template v-else>Input your bid amount</template>
                  </span>
                </p>
                <div class="remain-energy">
                  <span class="remain">{{ accountInfo.VigorAmount | currency(0) }}</span>
                  <button type="button" class="btn-charge" @click="setVisibleChargeVigor">Charge</button>
                </div>
              </div>
              <div class="field">
                <div class="input-area">
                  <div class="input-box">
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-energy-gold.webp" class="symbol" width="32" />
                    <v-text-field class="input" type="tel" v-model="stake" dense solo flat :hide-details="true" />
                    <div class="add-vigor">
                      <em class="add">+</em>
                      <span class="standard-value"
                      ><img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-energy-gold.webp" class="symbol" width="32" />1</span
                      >
                      <em class="fee">(Entry fee)</em>
                    </div>
                    <div class="btn-wrap">
                      <v-btn class="min" @click="setMin">MIN</v-btn>
                      <v-btn class="max" @click="setMax">{{ $t('w.hsp.main.un-stake.max') }}</v-btn>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-mirage btn-bid"
                  :class="{ error: errors.length > 0 }"
                  @click="confirmStake(loading || errors.length > 0 || !selectedCharacterUID)"
                >
                  BID NOW
                </button>
              </div>
            </div>
          </validation-provider>
        </validation-observer>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { range } from 'lodash';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import {useMutations, useState} from 'vuex-composition-helpers/dist';

import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import MirageCharacterStatus from '@/components/mirage/common/MirageCharacterStatus';

import { useMirageStore } from '@/utils/composables/mirage';
import { findLowercaseKey } from '@/constants/character/character-class';

export default defineComponent({
  name: 'ModalMirageBossRaidEnlist',
  components: {
    MirageCharacterStatus,
    MirageCharacter,
    Swiper,
    SwiperSlide,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    klass: {
      type: Number,
      default: 0,
    },
  },
  setup(_, { root }) {
    const { $dracoWebApi, $nextTick } = root;
    const form = ref(null);
    const { isDesktop } = useState(['isDesktop']);
    const state = reactive({
      stake: '',
      bossRaidMetaInfo: null,
      swiperOptions: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
      },
      loading: false,
      selectedCharacterUID: '',
    });

    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageMutations, useMirageActions, useMirageGetters } = useMirageStore();

    const {
      visibleEnlist,
      enlistMode,
      enlistClass,
      enlistServer,
      enlistValley,
      valleyList,
      accountInfo,
      stakeInfo,
      modalBossRaid,
      rosters,
      bossRaid,
    } = useMirageState([
      'visibleEnlist',
      'enlistMode',
      'enlistClass',
      'enlistServer',
      'enlistValley',
      'valleyList',
      'accountInfo',
      'stakeInfo',
      'modalBossRaid',
      'bossRaid',
      'rosters',
    ]);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const {
      setVisibleEnlist,
      setEnlistClass,
      setEnlistServer,
      setEnlistValley,
      setVisibleChargeVigor,
      setEnlistResultResponse,
      setVisibleEnlistResult,
      setEnlistCharacterUID,
      setModalBossRaid,
      setModalCharacterInfo,
      setVisibleRecover,
      setVisibleSeal,
      setVisibleDispel,
    } = useMirageMutations([
      'setVisibleEnlist',
      'setEnlistClass',
      'setEnlistServer',
      'setEnlistValley',
      'setVisibleChargeVigor',
      'setEnlistResultResponse',
      'setVisibleEnlistResult',
      'setEnlistCharacterUID',
      'setModalBossRaid',
      'setModalCharacterInfo',
      'setVisibleRecover',
      'setVisibleSeal',
      'setVisibleDispel',
    ]);
    const { fetchMyCharacters, fetchAccountInfo, fetchStakeInfo } = useMirageActions(['fetchMyCharacters', 'fetchAccountInfo', 'fetchStakeInfo']);

    const schedule = computed(() => {
      if (!bossRaid.value) {
        return null;
      }

      return bossRaid.value.schedule[0];
    });

    const inputStake = (v) => {
      if (state.stake) {
        state.stake = state.stake.replace(/[^\d.]/g, '');
      }
    };

    const clearStake = () => {
      state.stake = '';
    };

    const currentBossRaidInfo = computed(() => {
      if (!state.bossRaidMetaInfo || !state.bossRaidMetaInfo.length) {
        return null;
      }
      return state.bossRaidMetaInfo.find((raid) => raid.RaidType == schedule.value.RaidType);
    });

    const setMin = () => {
      if (!state.bossRaidMetaInfo || !schedule.value.RaidType) {
        state.stake = '1';
        return;
      }

      if (!currentBossRaidInfo.value) {
        state.stake = '1';
        return;
      }

      state.stake = currentBossRaidInfo.value.VigorAmount || '1';
    };

    const setMax = () => {
      state.stake = accountInfo.value ? `${Math.floor((Number(accountInfo.value.VigorAmount) - 1) * 10000) / 10000}` : '';
    };

    const alertModal = (title, desc) => {
      setCommonModal({
        open: true,
        title,
        desc,
        primary: 'OK',
        onPrimary() {
          state.loading = false;
        },
        onClose() {
          state.loading = false;
        },
      });
    };

    const showErrorModal = (errorResponse) => {
      const { code: errorCode } = errorResponse;
      let errorTitle = 'Enlist was unsuccessful';
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = 'Enlist was unsuccessful';
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const close = () => {
      setModalBossRaid({
        visible: false,
      });
    };

    const assault = computed(() => {
      if (stakeInfo.value && valleyList.value && stakeInfo.value.Valley && stakeInfo.value.Valley[enlistValley.value]) {
        return stakeInfo.value.Valley[enlistValley.value].Info.CurrentSlotCnt == valleyList.value[enlistValley.value].MaxSlotCnt;
      }
      return false;
    });

    const availableCharacters = computed(() => {
      return rosters.value.filter(
        (roster) =>
          `${roster.Class}` === `${modalBossRaid.value.class}` &&
          roster.DetailType === '0' &&
          (!roster.buff || roster.buff.filter((b) => b.BuffType == schedule.value.RaidType).length === 0), // &&
        // Number(roster.State) < 1,
      );
    });

    const fetchStake = () => {
      $dracoWebApi
        .get('/mirage/stake')
        .then(({ data }) => {
          if (data.code === 200) {
            state.rosters = data.data;
          } else {
            state.rosters = [];
          }
        })
        .catch(() => {
          state.rosters = [];
        });
    };

    const fetchBossRaidMetaInfo = () => {
      $dracoWebApi
        .get('/bossraid/meta/raid')
        .then(({ data }) => {
          if (data.code === 200) {
            state.bossRaidMetaInfo = data.data;
          }
        })
        .catch(() => {
          state.bossRaidMetaInfo = null;
        });
    };

    const postStake = (notPassed) => {
      // const amount = assault.value ? valleyList.value[enlistValley.value].KickVigorAmount : valleyList.value[enlistValley.value].VigorAmount;

      $dracoWebApi
        .post('/bossraid/stake', {
          scheduleUID: schedule.value.ScheduleUID,
          raidType: schedule.value.RaidType,
          characterUID: state.selectedCharacterUID,
          entryFee: '1',
          betVigorAmount: state.stake,
        })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal(data);
            return;
          }

          setEnlistCharacterUID(state.selectedCharacterUID);
          setEnlistResultResponse(data.data);
          setVisibleEnlistResult(true);

          $nextTick(() => {
            close();
            fetchAccountInfo();
          });
        })
        .catch((e) => {
          console.log(e);
          showErrorModal({ code: 500 });
        });
    };

    const selectCharacter = (v) => {
      state.selectedCharacterUID = v;
    };

    const slots = computed(() => {
      return range(Math.floor(availableCharacters.value.length / 3 + 1) * 3);
    });

    const confirmStake = (notPassed) => {
      if (notPassed) {
        return;
      }

      form.value.validate().then((passed) => {
        if (!passed) {
          return;
        }
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.message.confirm.bid'),
          desc: '',
          primary: 'BID NOW',
          secondary: root.$t('t.exd.sales.cancel'),
          onPrimary() {
            postStake();
          },
          onSecondary() {
            state.loading = false;
          },
          onClose() {
            state.loading = false;
          },
        });
      });
    }

    watch(
      () => modalBossRaid.value,
      () => {
        if (modalBossRaid.value.visible) {
          fetchAccountInfo();
          fetchMyCharacters();
          // fetchStake();
          fetchBossRaidMetaInfo();
        } else {
          state.selectedCharacterUID = '';
          state.loading = false;
          state.stake = '';
        }
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      visibleEnlist,
      form,
      close,
      enlistMode,
      enlistClass,
      availableCharacters,
      selectCharacter,
      postStake,
      enlistValley,
      stakeInfo,
      valleyList,
      accountInfo,
      setVisibleChargeVigor,
      slots,
      findLowercaseKey,
      assault,
      confirmStake,
      modalBossRaid,
      setMin,
      setMax,
      currentBossRaidInfo,
      schedule,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~@/assets/sass/components/_mirage-boss-raid-enlist.scss';
</style>
