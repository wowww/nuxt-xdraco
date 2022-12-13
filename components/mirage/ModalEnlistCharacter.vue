<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-enlist"
    :value="visibleEnlist"
    :width="isDesktop ? '760px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div v-if="accountInfo && stakeInfo && modalSelectedValley.valleyId != '0'" class="dialog-mirage-enlist__contents">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close"/>
      <div class="dialog-mirage-enlist__header">
        {{ assault ? $t('w.mirage.assault') : $t('w.mirage.enlist') }}
        <p class="dialog-mirage-enlist__header__count">
          {{ $t('s.mirage.available.nft') }}<span>{{ availableCharacters.length }}</span>
        </p>
        <div class="wrap-charge">
          <p class="wrap-charge__vigor">{{ accountInfo.VigorAmount | currency(0) }}</p>
          <button type="button" class="btn btn-charge" @click="setVisibleChargeVigor">Charge</button>
        </div>
      </div>
      <div v-if="valley && Number(valley.Info.CurrentSlotCnt) >= Number(valleyMetaInfo.MaxSlotCnt)" class="enlist-noti">
        <p>{{ $t('s.mirage.valley.full', [$t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`)]) }}</p>
      </div>
      <ul v-if="valley" class="enlist-info">
        <li class="enlist-info__item">
          <h4>{{ $t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`) }}</h4>
          <span v-if="valley">
            {{ valley.Info.CurrentSlotCnt }}
            <small>/{{ valleyMetaInfo.MaxSlotCnt }}</small>
          </span>
        </li>
        <li class="enlist-info__item job">
          <span class="icon-job" :data-character-class="modalSelectedValley.klass"></span>
          <div>
            <span>{{ $t(`w.rounds.item.class.${modalSelectedValley.klass}`) }}</span>
            <small>
              {{
                $t(`s.mirage.valley.${modalSelectedValley.valleyId}.grade`, [$t(`t.mirage.valley-type.${modalSelectedValley.valleyId}`)])
              }}
            </small>
          </div>
        </li>
      </ul>
      <div
        class="enlist-content chr-content"
        :class="{ emptyRoster: availableCharacters.length === 0 }"
        :data-empty-message="'You do not have this type of NFT available in your roster.'"
      >
        <swiper v-if="availableCharacters.length > 0" ref="swiperEnlist"
                :options="isDesktop ? swiperOptions : swiperMobileOptions">
          <swiper-slide v-for="rosterIdx in slots" :key="`enlist-${modalSelectedValley.klass}-roster-${rosterIdx}`">
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
                  <mirage-character-status :character="availableCharacters[rosterIdx]"/>
                </mirage-character>
              </label>
            </template>
            <span v-else class="no-character" :data-character-class="modalSelectedValley.klass"></span>
          </swiper-slide>
        </swiper>
        <div v-show="availableCharacters.length > 0" slot="button-prev" class="swiper-button-prev"></div>
        <div v-show="availableCharacters.length > 0" slot="button-next" class="swiper-button-next"></div>
        <button
          v-if="modalSelectedValley.valleyId && availableCharacters.length > 0"
          type="button"
          class="btn btn-red-mirage"
          :disabled="loading || !selectedCharacterUID"
          @click="confirmStake"
        >
          <span v-if="!assault">{{ $t('w.mirage.enlist') }}</span>
          <span v-else>{{ $t('w.mirage.assault') }}</span>
          <span v-if="valley && valleyMetaInfo" class="enlist">
            <template v-if="assault">{{ valleyMetaInfo.KickVigorAmount }}</template>
            <template v-else>{{ valleyMetaInfo.VigorAmount }}</template>
          </span>
        </button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import {computed, defineComponent, reactive, toRefs, watch} from '@vue/composition-api';
import {range} from 'lodash';
import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
import {useMutations, useState} from 'vuex-composition-helpers/dist';

import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import MirageCharacterStatus from '@/components/mirage/common/MirageCharacterStatus';
import {useMirageStore} from '@/utils/composables/mirage';
import {findLowercaseKey} from '@/constants/character/character-class';
import 'swiper/css/swiper.css';

export default defineComponent({
  name: 'ModalEnlistCharacter',
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
  setup(_, {root}) {
    const { $dracoWebApi } = root;
    const state = reactive({
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
      swiperMobileOptions: {
        slidesPerView: 'auto',
        resistance: true,
        resistanceRatio: 0,
        observer: true,
        observeParents: true,
      },
      loading: false,
      selectedCharacterUID: '',
      stakeRosters: [],
    });

    const {isDesktop} = useState(['isDesktop']);
    const {setCommonModal} = useMutations(['setCommonModal']);
    const {useMirageState, useMirageMutations, useMirageActions} = useMirageStore();

    const {modalSelectedValley, visibleEnlist, valleyList, accountInfo, stakeInfo, rosters} = useMirageState([
      'modalSelectedValley',
      'visibleEnlist',
      'valleyList',
      'accountInfo',
      'stakeInfo',
      'rosters',
    ]);
    const {setVisibleChargeVigor} = useMirageMutations(['setVisibleChargeVigor']);
    const {
      fetchMyCharacters,
      fetchAccountInfo,
      fetchStakeInfo,
      closeModalEnlist,
      openModalEnlistResult
    } = useMirageActions([
      'fetchMyCharacters',
      'fetchAccountInfo',
      'fetchStakeInfo',
      'closeModalEnlist',
      'openModalEnlistResult',
    ]);

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
      const {code: errorCode} = errorResponse;
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

    const valley = computed(() => {
      if (!stakeInfo.value || !stakeInfo.value.Valley) {
        return null;
      }

      if (!modalSelectedValley.value || !modalSelectedValley.value.valleyId) {
        return null;
      }

      return stakeInfo.value.Valley[modalSelectedValley.value.valleyId];
    });

    const valleyMetaInfo = computed(() => {
      if (!valleyList.value || !modalSelectedValley.value.valleyId) {
        return null;
      }

      return valleyList.value[modalSelectedValley.value.valleyId];
    });

    const close = () => {
      closeModalEnlist();
      fetchStakeInfo(modalSelectedValley.value.serverId);
    };

    const minPowerScore = computed(() => {
      if (!modalSelectedValley.value) {
        return 100000;
      }
      if (modalSelectedValley.value.valleyId === '3') {
        return 170000;
      }

      if (modalSelectedValley.value.valleyId === '2') {
        return 135000;
      }

      return 100000;
    });

    const assault = computed(() => {
      if (!valley.value || !valleyMetaInfo.value) {
        return false;
      }

      return Number(valley.value.Info.CurrentSlotCnt) === Number(valleyMetaInfo.value.MaxSlotCnt);
    });

    const availableCharacters = computed(() => {
      return rosters.value.filter(
        (roster) =>
          `${roster.Class}` === `${modalSelectedValley.value.klass}` &&
          minPowerScore.value <= Number(roster.CombatPoint) &&
          roster.DetailType === '0',
      );
    });

    const fetchStake = () => {
      $dracoWebApi
        .get('/mirage/stake')
        .then(({data}) => {
          if (data.code === 200) {
            state.stakeRosters = data.data;
          } else {
            state.stakeRosters = [];
          }
        })
        .catch(() => {
          state.stakeRosters = [];
        });
    };

    const postStake = () => {
      const amount = assault.value ? valleyMetaInfo.value.KickVigorAmount : valleyMetaInfo.value.VigorAmount;

      $dracoWebApi
        .post('/mirage/stake', {
          serverID: modalSelectedValley.value.serverId,
          valley: modalSelectedValley.value.valleyId,
          characterUID: state.selectedCharacterUID,
          consumeEnergy: amount,
        })
        .then(({data}) => {
          if (data.code !== 200) {
            showErrorModal(data);
            return;
          }

          openModalEnlistResult({characterId: state.selectedCharacterUID, data: data.data});

          setTimeout(() => {
            fetchStakeInfo(modalSelectedValley.value.serverId);
          }, [1000]);

          root.$nextTick(() => {
            close();
          });
        })
        .catch((e) => {
          showErrorModal({code: 500});
        });
    };

    const selectCharacter = (v) => {
      state.selectedCharacterUID = v;
    };

    const slots = computed(() => {
      return range(Math.floor(availableCharacters.value.length / 3 + 1) * 3);
    });

    const confirmStake = () => {
      const amount = assault.value ? valleyMetaInfo.value.KickVigorAmount : valleyMetaInfo.value.VigorAmount;

      if (Number(accountInfo.value.VigorAmount) < Number(amount)) {
        setCommonModal({
          open: true,
          title: root.$t('s.mirage.message.not-enough.vigor'),
          desc: root.$t('s.mirage.message.charge.vigor'),
          primary: 'OK',
          onPrimary() {
            state.loading = false;
          },
          onClose() {
            state.loading = false;
          },
        });
        return;
      }

      setCommonModal({
        open: true,
        title: assault.value ? root.$t('t.mirage.message.confirm.assault') : root.$t('t.mirage.message.confirm.enlist'),
        desc: '',
        primary: assault.value ? root.$t('w.mirage.assault') : root.$t('w.mirage.enlist'),
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
    };

    watch(
      () => visibleEnlist.value,
      () => {
        if (visibleEnlist.value) {
          fetchAccountInfo();
          fetchMyCharacters();
          fetchStake();
        } else {
          state.selectedCharacterUID = '';
          state.loading = false;
          state.rosters = [];
        }
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      visibleEnlist,
      close,
      modalSelectedValley,
      valley,
      valleyMetaInfo,
      availableCharacters,
      selectCharacter,
      postStake,
      stakeInfo,
      valleyList,
      accountInfo,
      setVisibleChargeVigor,
      slots,
      findLowercaseKey,
      assault,
      confirmStake,
      closeModalEnlist,
      minPowerScore,
    };
  },
});
</script>
