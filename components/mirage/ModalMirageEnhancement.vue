<template>
  <v-dialog
    :value="visibleEnhanceResult"
    content-class="dialog-mirage dialog-enhancement-result"
    scrollable
    persistent
    :max-width="isDesktop ? '720px' : '100%'"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
  >
    <div class="enhancement__modal content" :class="isEnhancementSuccess ? 'success-enhancement' : 'fail-enhancement'">
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="closeModalEnhanceResult" />
      <h3 class="enhancement__modal--title">{{ selectedCharacter && selectedCharacter.CharacterName }}</h3>
      <div class="mirage-character" :data-character-grade="`${computedGrade.grade}`">
        <div
          v-if="selectedCharacter"
          class="mirage-character__class"
          :data-character-class="selectedCharacter.Class"
          :data-character-status="enhancement.AfterReinforce === '0' && 13 || 0"
        >
          <div v-if="selectedCharacter.State !== -1" class="mirage-character__enhancement" :data-character-reinforce="selectedCharacter.Reinforce">
            + {{ enhancement && enhancement.AfterReinforce }}
          </div>
        </div>
      </div>
      <p class="enhancement__modal--message result-msg">{{ isEnhancementSuccess && $t('t.mirage.my.enhance-result.success') || $t('t.mirage.my.enhance-result.fail') }}</p>
      <ul class="enhancement__modal--result">
        <li class="enhancement__modal--result-list">
          <h4 class="enhancement__modal--result-list-title">{{ $t('t.mirage.my.enhance-table.enhancement') }}</h4>
          <span class="enhancement__modal--result-list-num enhancement__modal--result-list-num-first">{{
              enhancement && enhancement.BeforeReinforce
            }}</span>
          <span class="enhancement__modal--result-list-num">{{ enhancement && enhancement.AfterReinforce }}</span>
        </li>
        <li class="enhancement__modal--result-list">
          <h4 class="enhancement__modal--result-list-title">{{ $t('t.mirage.my.enhance-table.mirage-score') }}</h4>
          <p class="enhancement__modal--result-list-num enhancement__modal--result-list-num-first">{{ computedMirageScoreBefore }}</p>
          <p class="enhancement__modal--result-list-num">{{ computedMirageScoreAfter }}</p>
        </li>
      </ul>
      <button class="enhancement__modal--confirm-button" type="button" @click="closeModalEnhanceResult">OK</button>
    </div>
  </v-dialog>
</template>

<script>
import { computed, reactive, watch, toRefs } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";

import BigNumber from 'bignumber.js';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';
import { currency } from '@/plugins/filters';

export default {
  name: 'ModalMirageEnhancement',
  setup(props) {
    const { useMirageState, useMirageActions } = useMirageStore();
    const state = reactive({
      selectedCharacter: null,
    });

    const { isDesktop } = useState(['isDesktop']);

    const {
      rosters,
      visibleEnhanceResult,
      selectedEnhanceUID,
      enhancement,
    } = useMirageState(['rosters', 'visibleEnhanceResult', 'selectedEnhanceUID', 'enhancement']);
    const { closeModalEnhanceResult } = useMirageActions(['closeModalEnhanceResult']);

    const isEnhancementSuccess = computed(() => {
      if (!enhancement.value) return false;
      const { BeforeReinforce, AfterReinforce } = enhancement.value;
      return BeforeReinforce < AfterReinforce;
    });

    const computedGrade = computed(() => {
      if(selectedEnhanceUID.value) {
        return getCharacterGrade(state.selectedCharacter.CombatPoint);
      }
      return {
        grade: 1,
      };
    });

    const calculateMirageScore = (reinforce) => {
      if (!state.selectedCharacter) {
        return 0;
      }
      return new BigNumber(state.selectedCharacter.CombatPoint)
        .plus(new BigNumber(state.selectedCharacter.MiraX || '0'))
        .pow(2)
        .div(100000)
        .multipliedBy((100 + reinforce * 2) / 100)
        .toNumber();
    };

    const computedMirageScoreBefore = computed(() => {
      if (selectedEnhanceUID.value) {
        return currency(calculateMirageScore(enhancement.value.BeforeReinforce), 0);
      }
      return null;
    });

    const computedMirageScoreAfter = computed(() => {
      if (selectedEnhanceUID.value) {
        return currency(calculateMirageScore(enhancement.value.AfterReinforce), 0);
      }
      return null;
    });

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
      isDesktop,
      enhancement,
      visibleEnhanceResult,
      closeModalEnhanceResult,
      isEnhancementSuccess,
      computedMirageScoreBefore,
      computedMirageScoreAfter,
      computedGrade,
    };
  },
};
</script>
