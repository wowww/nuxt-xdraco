<template>
  <li>
    <div class="list-content">
      <div class="char-info">
        <div class="thumb">
          <character-class-thumb :character-class="character.class" :size="64" />
        </div>
        <div class="info">
          <strong class="nick">{{ character.characterName }}</strong>
          <span class="lv">Lv.{{ character.lv }}</span>
          <span class="category">{{ $t(`w.rounds.item.class.${character.class}`) }}</span>
        </div>
      </div>
    </div>
    <div class="fnc">
      <span class="radio-box">
        <input
          :id="character.characterUID"
          :disabled="loading"
          type="radio"
          class="input-radio"
          :name="character.characterName"
          :checked="selected"
          @change="selectCharacter(character.characterUID)"
        />
        <label :for="character.characterUID" class="input-label"></label>
      </span>
    </div>
  </li>
</template>

<script>
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { defineComponent } from '@vue/composition-api';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';

const { useState, useActions } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'WinnerCharacterItem',
  components: {
    CharacterClassThumb,
  },
  props: {
    character: {
      type: Object,
      default: () => ({
        characterUID: 0,
        characterName: '',
        class: 1,
        lv: 0,
        represent: 0,
      }),
    },
    selected: Boolean,
  },
  setup({ character }, { emit }) {

    const { loading } = useState(['loading']);

    const selectCharacter = (characterUID) => {
      emit('select-character', characterUID);
    };

    return {
      loading,
      selectCharacter,
    };
  },
});
</script>
