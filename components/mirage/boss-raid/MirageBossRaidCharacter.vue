<template>
  <div class="mirage-character" :data-character-grade="`${character.grade}`">
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
      <div class="mirage-character__damage">
        <span v-if="1 < Number(character.State)" class="wound"></span>
        <span v-if="character.BuffType && character.BuffType === 11" class="scissors"></span>
        <span v-if="character.BuffType && character.BuffType === 12" class="stink"></span>
      </div>
    </div>
    <div v-if="false && character.State === 1" class="mirage-character__enlisted">Enlisted</div>
    <div
      class="mirage-character__class"
      :data-character-class="klass || character.Class"
      :data-character-status="`${character.State || MirageCharacterState.ENLISTED}`"
    ></div>
    <dl v-if="character.MirageScore" class="mirage-character__score">
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

    <div class="mirage-character__status" :data-character-status="character.WoundType"></div>
    <vue-countdown
      v-if="endCooltime"
      v-slot="{ days, hours, minutes }"
      class="mirage-character__cooltime"
      :time="convertCooltime"
      @end="onCooltimeEnd"
    >
      {{ days }}d {{ hours }}h {{ minutes }}m
    </vue-countdown>
    <!-- <hr /> -->
    <dl v-if="rankingBonus" class="mirage-character__bonus">
      <dt>Ranking Bonus</dt>
      <dd>
        <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-darksteel.webp" width="16" alt="Darksteel" />
        <span>{{ rankingBonus | currency(2) }}</span>
      </dd>
    </dl>
    <div v-if="buttonType" class="wrap-button">
      <button type="button" class="btn-mirage" :class="`btn-${buttonType}`" :disabled="disabledButton">
        <span v-if="buttonType === 'primary'">Seal</span>
        <span v-if="buttonType === 'recover'">Recover</span>
        <span v-if="buttonType === 'reinforce'">Reinforce</span>
        <span v-if="buttonType === 'assault'">Assault</span>
        <span v-if="buttonType === 'enlisted'">Enlisted<br />Valley02/Red Moon</span>
        <span v-if="!disabledButton && buttonType !== 'enlisted'" class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>5</em>
        </span>
      </button>
    </div>
    <div v-if="endSealedTime" class="mirage-character__sealed-time">
      <span>Can be sealed after</span>
      <vue-countdown v-slot="{ days, hours, minutes }" :time="convertSealedTime" @end="onSealedTimeEnd">
        {{ days }}d {{ hours }}h {{ minutes }}m
      </vue-countdown>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import BigNumber from 'bignumber.js';

import { getCharacterGrade } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidCharacter',
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
  },
  setup({ character }) {
    const computedBonus = computed(() => {
      const mirax = new BigNumber(character.MiraX || '0');
      const orgScore = new BigNumber(character.CombatPoint)
        .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
        .pow(2)
        .div(100000);
      const mirageScore = new BigNumber(character.MirageScore);
      return (Math.round(mirageScore.minus(orgScore).div(orgScore).toNumber() * 100) / 100) * 100;
    });

    const computedGrade = getCharacterGrade(character.CombatPoint);

    return {
      computedBonus,
      computedGrade,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-button';
@import '~@/assets/sass/components/mirage-character';
</style>
