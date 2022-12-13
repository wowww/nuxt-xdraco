<template>
  <div class="mirage-character" :data-character-grade="computedGrade.grade">
    <h2 class="mirage-character__name">
      <span>{{ character.CharacterName }}</span>
    </h2>
    <div class="wrap-info">
      <div class="wrap-rank">
        <div v-if="currentRank > 0" class="mirage-character__rank">
          <em class="level-rank">{{ currentRank }}</em>
          <span v-if="rankChange > 0" class="change" :class="{ plus: rankChange > 0, minus: rankChange < 0 }">{{ rankChange }}</span>
        </div>
        <div v-if="beforeRank > 0" class="mirage-character__rank">
          <em class="level-rank2">{{ beforeRank }}</em>
          <span class="change minus">{{ rankChange }}</span>
        </div>
      </div>
    </div>
    <div v-if="character.State === 1" class="mirage-character__enlisted">Enlisted</div>
    <div class="mirage-character__class" :data-character-class="klass || character.Class" :data-character-status="`${character.State}`" />
    <dl v-if="character.MirageScore" class="mirage-character__score">
      <dt>MIRAGE Score</dt>
      <dd>
        <div class="group-score">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-miragescore.webp" width="16" alt="score" />

          <span class="point">{{ character.MirageScore | currency(0) }}</span>
          <span v-if="computedBonus > 0" class="change plus">
            <em ref="mirageScoreChange">+{{ computedBonus | currency(0) }}</em
            >%
          </span>
        </div>
      </dd>
    </dl>
    <dl v-if="character.RankBonusAmount" class="mirage-character__bonus">
      <dt>Ranking Bonus</dt>
      <dd>
        <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-darksteel.webp" width="16" alt="Darksteel" />
        <span>{{ character.RankBonusAmount | currency(0) }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { getCharacterGrade } from '@/utils/composables/mirage';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageResultCharacterItem',
  props: {
    klass: {
      type: String,
      default: '',
    },
    character: {
      type: Object,
      default: () => ({
        tokenID: '',
        CharacterUID: '',
        CharacterName: '',
        Class: '',
        CombatPoint: '',
        MirageScore: '',
        SanctuaryOfHydraLevel: 0,
        CreatedDT: 0,
        State: 0, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0,
      }),
    },
    currentRank: {
      type: Number,
      default: 0,
    },
    rankChange: {
      type: Number,
      default: 0,
    },
    beforeRank: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      default: 'roster',
    },
    hideAction: {
      type: Boolean,
      default: false,
    },
    serverId: {
      type: String,
      default: '',
    },
    valleyType: {
      type: String,
      default: '',
    },
    assault: {
      type: Boolean,
      default: false,
    },
  },
  setup({ character, valleyType, serverId }, { root, emit }) {
    const state = reactive({
      loading: false,
    });
    const { visibleRecover, rosters, valleyList } = useMirageState(['visibleRecover', 'rosters', 'valleyList']);
    const { setVisibleRecover, setRecoverCharacterUID, setVisibleEnlist, setEnlistClass, setEnlistServer, setEnlistValley } = useMirageMutations([
      'setVisibleRecover',
      'setRecoverCharacterUID',
      'setVisibleEnlist',
      'setEnlistClass',
      'setEnlistServer',
      'setEnlistValley',
    ]);

    const now = dayjs().utc(true);
    const createdAt = dayjs.unix(character.CreatedDT).utc(true);
    const sealAvailableAt = createdAt.add(5, 'day');
    const sealRemaining = sealAvailableAt.diff(now);

    const injured = computed(() => {
      if (character.State == 3 || character.State == 7 || character.State == 14) {
        return true;
      }
      return false;
    });

    const computedBonus = computed(() => {
      const orgScore = new BigNumber(character.CombatPoint)
        .plus(new BigNumber(character.MiraX || '0'))
        .pow(2)
        .div(100000);
      const mirageScore = new BigNumber(character.MirageScore);

      return mirageScore.minus(orgScore).div(orgScore).multipliedBy(100).toNumber();
    });

    const computedGrade = getCharacterGrade(character.CombatPoint);

    const openSeal = () => {
      emit('onSealClick', character.tokenID);
    };

    const openRecover = () => {
      setRecoverCharacterUID(character.CharacterUID);
      setVisibleRecover(true);
    };

    const openEnlist = () => {
      setEnlistClass(Number(character.Class));
      setEnlistValley(valleyType);
      setEnlistServer(serverId);
      setVisibleEnlist(true);
    };

    return {
      now,
      injured,
      openSeal,
      openRecover,
      openEnlist,
      valleyList,
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
