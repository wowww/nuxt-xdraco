<template>
  <div class="mirage-character" :data-character-grade="`${computedGrade.grade}`" @click="$emit('click')">
    <h2 v-if="!hideCharacterName" class="mirage-character__name">
      <span>{{ character.CharacterName }}</span>
    </h2>
    <div class="wrap-info">
      <div class="wrap-rank">
        <div v-if="Number(currentRank) > 0" class="mirage-character__rank">
          <em class="level-rank">{{ currentRank }}</em>
          <span class="change plus">{{ 1 }}</span>
        </div>
        <div v-if="Number(beforeRank) > 0" class="mirage-character__rank">
          <em class="level-rank2">{{ beforeRank }}</em>
          <span class="change minus">{{ 1 }}</span>
        </div>
      </div>
      <div v-if="!hideBuff" class="mirage-character__damage">
        <span v-if="1 < Number(character.State)" class="wound"></span>
        <span v-if="hasBuff11" class="scissors"></span>
        <span v-if="hasBuff12" class="stink"></span>
      </div>
    </div>
    <div v-if="showState && character.DetailType !== '0'" class="mirage-character__enlisted">Enlisted</div>
    <div
      class="mirage-character__class"
      :data-character-class="klass || character.Class"
      :data-character-status="`${character.State || MirageCharacterState.ENLISTED}`"
    >
      <div v-if="character.State !== -1" class="mirage-character__enhancement" :data-character-reinforce="character.Reinforce">
        +{{ character.Reinforce }}
      </div>
    </div>
    <dl v-if="character.MirageScore && !hideScore" class="mirage-character__score">
      <dt class="hidden">MIRAGE Score</dt>
      <dd>
        <div class="group-score">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-miragescore.webp" width="16" alt="score" />
          <span class="point">{{ character.MirageScore | currency(0) }}</span>
          <span v-if="computedBonus > 0" class="change plus">
            <em ref="mirageScoreChange">+{{ computedBonus | currency(0) }}</em
            >%
          </span>
        </div>
        <div v-if="character.MiraX" class="mirax">
          <span>MiraX</span>
          <span class="volume">{{ character.MiraX }}</span>
        </div>
      </dd>
    </dl>
    <!-- <div class="mirage-character__display">
    </div> -->

    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';
import BigNumber from 'bignumber.js';

import { getCharacterGrade } from '@/utils/composables/mirage';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

export default defineComponent({
  name: 'MirageCharacter',
  props: {
    klass: {
      type: String,
      default: '',
    },
    character: {
      type: Object,
      default: () => ({}),
    },
    currentRank: {
      type: String,
      default: '0',
    },
    beforeRank: {
      type: String,
      default: '0',
    },
    hideCharacterName: {
      type: Boolean,
      default: false,
    },
    showState: {
      type: Boolean,
      default: false,
    },
    hideScore: {
      type: Boolean,
      default: false,
    },
    hideBuff: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const computedBonus = computed(() => {
      const mirax = new BigNumber(props.character.MiraX || '0');
      const reinforce = new BigNumber(props.character.Reinforce || '0');
      const orgScore = new BigNumber(props.character.CombatPoint)
        .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
        .pow(2)
        .div(100000)
        .multipliedBy(reinforce.multipliedBy(0.02).plus(1));
      const mirageScore = new BigNumber(props.character.MirageScore);
      return (Math.round(mirageScore.minus(orgScore).div(orgScore).toNumber() * 100) / 100) * 100;
    });

    const computedGrade = computed(() => {
      return getCharacterGrade(props.character.CombatPoint);
    });

    const hasBuff11 = computed(() => {
      if (!props.character.buff) {
        return false;
      }

      return !!props.character.buff.find((b) => b.BuffType === '11');
    });

    const hasBuff12 = computed(() => {
      if (!props.character.buff) {
        return false;
      }

      return !!props.character.buff.find((b) => b.BuffType === '12');
    });

    return {
      computedBonus,
      computedGrade,
      hasBuff11,
      hasBuff12,
      MirageCharacterState,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-button';
@import '~@/assets/sass/components/mirage-character';
</style>
