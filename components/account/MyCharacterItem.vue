<template>
  <li>
    <div class="list-content">
      <!-- 아직 공용으로 쓰일만한 요소는 없음 -->
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
          :checked="character.represent === 1"
          @change="changeRepresentCharacter(character.characterUID)"
          @click="changeRepresentCharacter(character.characterUID)"
        />
        <label :for="character.characterUID" class="input-label">{{ $t('w.rounds.main.character') }}</label>
      </span>
    </div>
  </li>
</template>

<script>
import { defineComponent, getCurrentInstance } from '@vue/composition-api';
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';

const { useState, useActions } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'MyCharacterItem',
  components: { CharacterClassThumb },
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
  },
  setup() {
    const { loading } = useState(['loading']);
    const { changeRepresentCharacter } = useActions(['changeRepresentCharacter']);

    return {
      loading,
      changeRepresentCharacter,
    };
  },
});
</script>
