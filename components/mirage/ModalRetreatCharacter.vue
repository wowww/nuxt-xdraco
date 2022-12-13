<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-staked"
    :value="visibleRetreat"
    :width="isDesktop ? '720px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="dialog-mirage-staked__contents">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="closeModalRetreat" />
      <div v-if="isDesktop" class="dialog-header">Enlisted</div>
      <div class="wrap-info">
        <div v-if="stakeInfoLoading" class="d-flex justify-center align-center">
          <v-progress-circular class="ma-5" :size="32" :width="4" color="#fff" indeterminate />
        </div>
        <template v-else>
          <mirage-valley-character-item v-if="retreatCharacter" :character="retreatCharacter" hide-action hide-mirage-score />
          <div v-if="retreatCharacter" class="staked-info">
            <div class="staked-info__score">
              <div class="staked-info__score__mirage">
                <em>
                  {{ retreatCharacter.MirageScore | currency(0) }}
                </em>
                <span v-if="computedBonus > 0" class="change">+{{ computedBonus | currency(2) }}%</span>
              </div>
              <div class="staked-info__score__mirax">
                <span>MiraX</span>
                <em>{{ retreatCharacter.MiraX | currency(0) }}</em>
              </div>
            </div>
            <ul class="staked-area">
              <li>
                <span>{{ $t('t.mirage.sanctuary') }}</span>
                <span class="stage">
                  {{ $t('w.mirage.stage') }}
                  <em>{{ retreatCharacter.SanctuaryOfHydraLevel }}</em>
                </span>
              </li>
              <li>
                <span>Today’s Septaria</span>
                <em class="septaria">{{ computedSeptaria }}</em>
              </li>
            </ul>
            <ul class="staked-area">
              <li class="power-score">
                <span>Power Score</span>
                <em class="score">{{ retreatCharacter.CombatPoint | currency(0) }}</em>
              </li>
              <li v-if="retreatCharacter.Level" class="level">
                <span>Level</span>
                <em>{{ retreatCharacter.Level }}</em>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <p v-if="mirageLock" class="txt-noti" v-html="$t('s.mirage.notice.cannot.retreat')"></p>
      <button type="button" :disabled="stakeInfoLoading || loading || mirageLock" class="btn btn-black-mirage" @click="confirmDelete">
        <span>{{ $t('w.mirage.retreat') }}</span>
      </button>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import BigNumber from 'bignumber.js';
import { useMutations, useState } from 'vuex-composition-helpers/dist';
import MirageValleyCharacterItem from '@/components/mirage/MirageValleyCharacterItem';
import { useMirageStore } from '@/utils/composables/mirage';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

export default defineComponent({
  name: 'ModalRetreatCharacter',
  components: { MirageValleyCharacterItem },
  setup(_, { root }) {
    const { $dracoWebApi, $i18n } = root;
    const state = reactive({
      loading: false,
    });

    const { isDesktop } = useState(['isDesktop']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { stakeInfoLoading, stakeInfo, rosters, visibleRetreat, valleyCapture, modalSelectedCharacterUID, modalSelectedValley } = useMirageState([
      'stakeInfoLoading',
      'stakeInfo',
      'rosters',
      'visibleRetreat',
      'valleyCapture',
      'modalSelectedCharacterUID',
      'modalSelectedValley',
    ]);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { setVisibleRetreat } = useMirageMutations(['setVisibleRetreat']);
    const { fetchStakeInfo, closeModalRetreat, fetchMyCharacters } = useMirageActions(['fetchStakeInfo', 'closeModalRetreat', 'fetchMyCharacters']);

    const valley = computed(() => {
      if (!stakeInfo.value || !stakeInfo.value.Valley) {
        return null;
      }

      if (!modalSelectedValley.value || !modalSelectedValley.value.valleyId) {
        return null;
      }

      return stakeInfo.value.Valley[modalSelectedValley.value.valleyId];
    });

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
      let errorTitle = root.$t('t.mirage.action.failed');
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = root.$t('t.mirage.action.failed');
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const retreatCharacter = computed(() => {
      if (!stakeInfo.value || !valley.value) {
        return null;
      }

      return valley.value.Character.find((item) => item.CharacterUID == modalSelectedCharacterUID.value);
    });

    const close = () => {
      setVisibleRetreat(false);
    };

    const deleteStake = () => {
      state.loading = true;
      $dracoWebApi
        .delete('/mirage/stake', {
          params: {
            serverID: modalSelectedValley.value.serverId,
            valley: modalSelectedValley.value.valleyId,
            characterUID: retreatCharacter.value.CharacterUID,
          },
        })
        .then(({ data }) => {
          if (data.code !== 200) {
            showErrorModal(data);
            return;
          }

          setTimeout(() => {
            fetchStakeInfo(modalSelectedValley.value.serverId);
            fetchMyCharacters();
          }, [500]);

          close();
        })
        .catch((e) => {
          console.log(e);
          showErrorModal({ code: 500 });
        });
    };

    const computedBonus = computed(() => {
      if (retreatCharacter.value) {
        const mirax = new BigNumber(retreatCharacter.value.MiraX || '0');
        const orgScore = new BigNumber(retreatCharacter.value.CombatPoint)
          .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
          .pow(2)
          .div(100000);
        const mirageScore = new BigNumber(retreatCharacter.value.MirageScore);
        return (Math.round(mirageScore.minus(orgScore).div(orgScore).toNumber() * 100) / 100) * 100;
      }

      return 0;
    });

    const computedSeptaria = computed(() => {
      if (retreatCharacter.value) {
        let level = 0;
        switch (Number(retreatCharacter.value.SanctuaryOfHydraLevel)) {
          case 1:
            level = 1;
            break;
          case 2:
            level = 2;
            break;
          case 3:
            level = 5;
            break;
          case 4:
            level = 6;
            break;
          case 5:
            level = 7;
            break;
          case 6:
            level = 10;
            break;
          case 7:
            level = 11;
            break;
          case 8:
            level = 12;
            break;
          case 9:
            level = 15;
            break;
          case 10:
            level = 16;
            break;
          case 11:
            level = 17;
            break;
          case 12:
            level = 20;
            break;
          case 13:
            level = 21;
            break;
          case 14:
            level = 22;
            break;
          case 15:
            level = 25;
            break;
          default:
            level = 0;
            break;
        }

        return level;
      }

      return 0;
    });

    const confirmDelete = () => {
      setCommonModal({
        open: true,
        title: root.$t('t.mirage.message.confirm.retreat'),
        desc: '',
        primary: root.$t('w.mirage.retreat'),
        secondary: root.$t('t.exd.sales.cancel'),
        onPrimary() {
          deleteStake();
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
      () => visibleRetreat.value,
      () => {
        if (!visibleRetreat.value) {
          state.loading = false;
        } else if (modalSelectedValley.value) {
          fetchStakeInfo(modalSelectedValley.value.serverId);
        }
      },
    );

    return {
      ...toRefs(state),
      isDesktop,
      MirageCharacterState,
      stakeInfoLoading,
      visibleRetreat,
      setVisibleRetreat,
      deleteStake,
      retreatCharacter,
      computedBonus,
      computedSeptaria,
      confirmDelete,
      valleyCapture,
      closeModalRetreat,
      mirageLock,
      modalSelectedCharacterUID,
    };
  },
});
</script>


