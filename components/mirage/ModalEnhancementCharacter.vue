<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-enhancement-character"
    :value="visibleEnhance"
    :width="isDesktop ? '960px' : '100%'"
    scrollable
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div v-if="accountInfo" class="enhancement">
      <div class="enhancement__header">
        <v-btn class="btn-close modal__close--button" fab plain x-small @click="close" />
        <div class="enhancement__header--title">
          <h2 class="enhancement__header--title-heading">Enhancement</h2>
        </div>
      </div>

      <div class="enhancement__contents">
        <div class="enhancement__description">
          <p  class="enhancement__description--paragraph">Choose the NFT character you want to enhance.</p>
        </div>
        <div
          class="enhancement__wrapper enlist-content chr-content"
          :class="{ emptyRoster: availableCharacters.length === 0 }"
          :data-empty-message="'You do not have this type of NFT available in your roster.'"
        >
          <div class="enhancement__wrapper--contents">
            <ul v-if="availableCharacters.length > 0" class="enhancement__character">
            <li v-for="rosterIdx in slots" :key="`roster-${rosterIdx}`" class="enhancement__character-list">
              <template v-if="availableCharacters[rosterIdx]">
                <input
                  :id="`enlist-${availableCharacters[rosterIdx].CharacterUID}`"
                  type="radio"
                  name="enlist-select"
                  @change="selectCharacter(availableCharacters[rosterIdx].CharacterUID)"
                />
                <label :for="`enlist-${availableCharacters[rosterIdx].CharacterUID}`">
                  <mirage-character :character="{ State: 0, ...availableCharacters[rosterIdx] }" />
                  <div class="character-status"></div>
                </label>
              </template>
              <span v-else class="enhancement__character-list--empty"></span>
            </li>
            </ul>
          </div>
          <button type="submit" class="btn btn-red-mirage" @click="close">Select</button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";
import { range } from 'lodash';

import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { useMirageStore } from '@/utils/composables/mirage';
import { findLowercaseKey } from '@/constants/character/character-class';

export default defineComponent({
  name: 'ModalEnhancementCharacter',
  components: {
    MirageCharacter,
  },
  setup(props , { root }) {
    const state = reactive({
      loading: false,
      selectedUID: '',
    });

    const { isDesktop } = useState(['isDesktop']);
    const { useMirageState, useMirageActions } = useMirageStore();

    const { accountInfo, rosters, visibleEnhance } = useMirageState([
      'accountInfo',
      'rosters',
      'visibleEnhance',
    ]);
    const { fetchMyCharacters, fetchAccountInfo, closeModalEnhance, fetchSelectedEnhanceUID } = useMirageActions([
      'fetchMyCharacters',
      'fetchAccountInfo',
      'closeModalEnhance',
      'fetchSelectedEnhanceUID'
    ]);

    onMounted(() => {
      fetchAccountInfo();
      fetchMyCharacters();
    });

    const selectCharacter = (v) => {
      state.selectedUID = v;
    };

    const slots = computed(() => {
      const slot = isDesktop.value ? 5 : 3;
      return range(Math.floor(rosters.value.length / slot + 1) * slot);
    });

    const close = () => {
      fetchSelectedEnhanceUID(state.selectedUID);
      closeModalEnhance();
    }

    const availableCharacters = computed(() => {
      return rosters.value.filter(
        (roster) =>
          roster.State !== "1"
      );
    });

    return {
      ...toRefs(state),
      isDesktop,
      rosters,
      visibleEnhance,
      selectCharacter,
      accountInfo,
      slots,
      findLowercaseKey,
      close,
      availableCharacters,
    };
  },
});
</script>
