<template>
  <div class="enhance">
    <div class="enhance__character">
      <div class="enhance__scroll">
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-64-mirage-scroll.webp" alt="mirage-scroll" />
        <strong v-if="selectedCharacter">x{{ computedCost }}</strong>
      </div>
      <div class="mirage-character" :data-character-grade="`${computedGrade.grade}`">
        <div
          v-if="selectedCharacter"
          class="mirage-character__class"
          :data-character-class="selectedCharacter.Class"
          :data-character-status="0"
        >
          <div
            v-if="selectedCharacter && selectedCharacter.State !== -1" class="mirage-character__enhancement"
            :data-character-reinforce="selectedCharacter.Reinforce">
            +{{ selectedCharacter.Reinforce }}
          </div>
        </div>
      </div>
      <span class="mirage-character__name">{{ selectedCharacter && selectedCharacter.CharacterName || $t('s.mirage.my.character-choice') }}</span>
      <button type="button" class="enhance__character--change" :disabled="!rosters || rosters.length <= 0" @click="$emit('openEnhance')">
        {{ selectedCharacter ? $t('w.mirage.enhance.character.change') : $t('w.mirage.enhance.character.select') }}
      </button>
    </div>
    <div class="enhance__info">
      <table class="enhance__info--table">
        <thead class="enhance__info--table-heading">
          <tr>
            <th scope="col">
              <h2>{{ $t('t.mirage.my.enhance-table.enhancement') }}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="enhance__info--table-cell">
            <th scope="row" class="enhance__info--title">
              <span>{{ $t('t.mirage.my.enhance-table.enhancement') }}</span>
            </th>
            <td class="enhance__info--level">
              <span :data-character-reinforce="selectedCharacter && selectedCharacter.Reinforce" class="enhance__info--level-num">
                {{ selectedCharacter && '+' + selectedCharacter.Reinforce || '' }}
              </span>
              <i class="arrow"></i>
              <span :data-character-reinforce="selectedCharacter && Number(selectedCharacter.Reinforce) + 1" class="enhance__info--level-num">
                {{ selectedCharacter && selectedCharacter.Reinforce !== '8' ? '+' + (Number(selectedCharacter.Reinforce) + 1) : '' }}
              </span>
            </td>
          </tr>
          <tr class="enhance__info--table-cell">
            <th scope="row" class="enhance__info--title">
              <span>{{ $t('t.mirage.my.enhance-table.mirage-score') }}</span>
            </th>
            <td class="enhance__info--contents">
              <span class="enhance__info__score--before">
                {{ computedMirageScoreBefore && selectedCharacter.Reinforce !== '8' ? computedMirageScoreBefore : '-' }}
              </span>
              <i class="arrow"></i>
              <span class="enhance__info__score--after">
                <em>{{ computedMirageScoreAfter && selectedCharacter.Reinforce !== '8' ? computedMirageScoreAfter : '-' }}</em>
                <strong v-if="calculateDifference">(<i class="ico-up"></i>{{ calculateDifference }})</strong>
              </span>
            </td>
          </tr>
          <tr class="enhance__info--table-cell">
            <th scope="row" class="enhance__info--title">
              <span>{{ $t('t.mirage.my.enhance-table.success-chance') }}</span>
            </th>
            <td>
              <span class="enhance__info--rate-num">{{ computedRate }}%</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button :disabled="!selectedCharacter || selectedCharacter.Reinforce === '8' || Number(scrollInfo.ScrollAmount) < computedCost" type="button" class="enhance-btn" @click="showCheckModal">
        <strong>{{ $t('t.mirage.my.enhance-table.enhance') }}</strong>
        <span v-if="selectedCharacter">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-64-mirage-scroll.webp" alt="" />
          <em>{{ computedCost }}</em>
        </span>
      </button>
    </div>
    <modal-mirage-enhancement />
  </div>
</template>

<script>
import { computed, reactive, watch, toRefs } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import { useMutations } from 'vuex-composition-helpers/dist';
import { getCharacterGrade, getEnhancementCost, getEnhancementSuccessRate, useMirageStore } from '@/utils/composables/mirage';
import { currency } from '~/plugins/filters';
import ModalMirageEnhancement from '~/components/mirage/ModalMirageEnhancement';

export default {
  name: 'MirageEnhance',
  components: { ModalMirageEnhancement },
  setup(_, { root }) {
    const { $dracoWebApi } = root;
    const { useMirageState, useMirageActions, useMirageMutations, useMirageGetters } = useMirageStore();
    const state = reactive({
      selectedCharacter: null,
    });

    const { setCommonModal } = useMutations(['setCommonModal']);
    const { setEnhancement } = useMirageMutations(['setEnhancement']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { rosters, scrollInfo, selectedEnhanceUID } = useMirageState([
      'rosters',
      'scrollInfo',
      'selectedEnhanceUID',
    ]);

    const {
      openModalEnhanceResult,
      fetchMyCharacters,
      fetchAccountInfo,
      fetchScrollInfo,
    } = useMirageActions(['openModalEnhanceResult', 'fetchMyCharacters', 'fetchAccountInfo', 'fetchScrollInfo']);

    const computedGrade = computed(() => {
      if (selectedEnhanceUID.value && state.selectedCharacter) {
        return getCharacterGrade(state.selectedCharacter.CombatPoint);
      }
      return {
        grade: 1,
      };
    });

    const computedCost = computed(() => {
      if (selectedEnhanceUID.value && state.selectedCharacter) {
        const characterGrade = getCharacterGrade(state.selectedCharacter.CombatPoint);
        return getEnhancementCost(characterGrade);
      }
      return '';
    });

    const computedRate = computed(() => {
      if (selectedEnhanceUID.value) {
        const characterGrade = getCharacterGrade(state.selectedCharacter.CombatPoint);

        if (state.selectedCharacter.Reinforce !== '8') {
          return getEnhancementSuccessRate(characterGrade);
        }
      }
      return '- ';
    });

    const calculateMirageScore = (reinforce) => {
      return new BigNumber(state.selectedCharacter.CombatPoint)
        .plus(new BigNumber(state.selectedCharacter.MiraX || '0'))
        .pow(2)
        .div(100000)
        .multipliedBy((100 + reinforce * 2) / 100)
        .toNumber();
    };

    const computedMirageScoreBefore = computed(() => {
      if (state.selectedCharacter) {
        return currency(state.selectedCharacter.MirageScore, 0);
      }
      return null;
    });

    const computedMirageScoreAfter = computed(() => {
      if (selectedEnhanceUID.value && state.selectedCharacter) {
        return currency(calculateMirageScore(Number(state.selectedCharacter.Reinforce) + 1), 0);
      }
      return null;
    });

    const calculateDifference = computed(() => {
      if (selectedEnhanceUID.value && state.selectedCharacter) {
        if (state.selectedCharacter.Reinforce !== '8') {
          return currency(new BigNumber(calculateMirageScore(Number(state.selectedCharacter.Reinforce) + 1))
            .minus(calculateMirageScore(state.selectedCharacter.Reinforce))
            .toNumber(), 0);
        }
      }
      return null;
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
      let errorTitle = 'Enhance was unsuccessful';
      let errorMessage = '';

      switch (errorCode) {
        case 500:
          errorMessage = root.$t('s.exd.purchase.failed.network');
          break;
        default:
          errorTitle = 'Enhance was unsuccessful';
          errorMessage = `${root.$t('s.xdraco.common.err.message')}${errorCode ? `(Error Code: ${errorCode})` : ''}`;
          break;
      }

      alertModal(errorTitle, errorMessage);
    };

    const showCheckModal = () => {
      setCommonModal({
        open: true,
        title: root.$t('t.mirage.my.enhance.check'),
        desc: root.$t('s.mirage.my.enhance.check.desc'),
        primary: root.$t('w.mirage.my.enhance.check.open'),
        secondary: root.$t('w.mirage.my.enhance.check.close'),
        onPrimary() {
          postEnhance();
        },
        onClose() {},
      });
    };

    const postEnhance = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.import'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
      } else {
        $dracoWebApi
          .post('/mirage/nftenhance', { CharacterUID: selectedEnhanceUID.value })
          .then(({ data }) => {
            if (data.code === 200) {
              fetchMyCharacters();
              fetchAccountInfo();
              fetchScrollInfo();
              setEnhancement(data.enhance);
              openModalEnhanceResult();
            } else {
              showErrorModal(data);
            }
          })
          .catch((e) => {
            showErrorModal({ code: 500 });
          });
      }
    };

    watch(() => selectedEnhanceUID.value,
      () => {
        state.selectedCharacter = rosters.value.find((item) => item.CharacterUID === selectedEnhanceUID.value);
      });

    watch(() => rosters.value,
      () => {
        state.selectedCharacter = rosters.value.find((item) => item.CharacterUID === selectedEnhanceUID.value);
      });

    return {
      ...toRefs(state),
      rosters,
      scrollInfo,
      computedGrade,
      computedCost,
      computedRate,
      computedMirageScoreBefore,
      computedMirageScoreAfter,
      calculateDifference,
      showCheckModal,
    };
  },
};
</script>
