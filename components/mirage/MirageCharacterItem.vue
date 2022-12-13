<template>
  <div class="mirage-character" :data-character-grade="computedGrade.grade">
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
      <div v-if="injured" class="mirage-character__damage" />
    </div>
    <div v-if="character.State === 1" class="mirage-character__enlisted">Enlisted</div>
    <div class="mirage-character__class" :data-character-class="klass || character.Class" :data-character-status="`${character.State}`" />
    <dl v-if="character.MirageScore" class="mirage-character__score">
      <dt class="hidden">MIRAGE Score</dt>
      <dd>
        <div class="group-score">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-miragescore.webp" width="16" alt="score" />
          <span class="point">{{ character.MirageScore | currency(0) }}</span>
          <span v-if="computedBonus > 0" class="change plus">
            <em ref="mirageScoreChange">{{ computedBonus | currency }}</em
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

    <div class="mirage-character__status" :data-character-status="character.State"></div>
    <!--    <vue-countdown-->
    <!--      class="mirage-character__cooltime"-->
    <!--      :time="convertCooltime"-->
    <!--      v-slot="{ days, hours, minutes }"-->
    <!--      @end="onCooltimeEnd"-->
    <!--      v-if="endCooltime"-->
    <!--    >-->
    <!--      {{ days }}d {{ hours }}h {{ minutes }}m-->
    <!--    </vue-countdown>-->
    <!-- <hr /> -->
    <!--    <dl class="mirage-character__bonus" v-if="rankingBonus">-->
    <!--      <dt>Ranking Bonus</dt>-->
    <!--      <dd>-->
    <!--        <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-darksteel.webp" width="16" alt="Darksteel" />-->
    <!--        <span>{{ rankingBonus | currency(2) }}</span>-->
    <!--      </dd>-->
    <!--    </dl>-->
    <div v-if="!hideAction" class="wrap-button">
      <button v-if="character.State == 0" type="button" class="btn-mirage btn-primary" :disabled="closed" @click="openSeal">
        <span>Seal</span>
        <span class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>20</em>
        </span>
      </button>
      <button v-if="character.State == 1" type="button" class="btn-mirage btn-primary" :disabled="closed" @click="openRetreat">
        <span>Retreat</span>
        <span class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>20</em>
        </span>
      </button>
      <button v-if="injured" type="button" class="btn-mirage btn-recover" :disabled="closed" @click="openRecover">
        <span>Recover</span>
        <span class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>5</em>
        </span>
      </button>
      <button v-if="character.State == -1" type="button" class="btn-mirage btn-reinforce" :disabled="closed" @click="openEnlist">
        <span>{{ assault ? $t('w.mirage.assault') : $t('w.mirage.enlist') }}</span>
        <span v-if="valleyList && valleyType" class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>{{ valleyList[valleyType].VigorAmount }}</em>
        </span>
      </button>
    </div>
    <!--    <div class="mirage-character__sealed-time" v-if="endSealedTime">-->
    <!--      <span>Can be sealed after</span>-->
    <!--      <vue-countdown :time="convertSealedTime" v-slot="{ days, hours, minutes }" @end="onSealedTimeEnd">-->
    <!--        {{ days }}d {{ hours }}h {{ minutes }}m-->
    <!--      </vue-countdown>-->
    <!--    </div>-->
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
  name: 'MirageCharacterItem',
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
      type: String,
      default: '0',
    },
    beforeRank: {
      type: String,
      default: '0',
    },
    mode: {
      type: String,
      default: 'roster',
    },
    hideAction: {
      type: Boolean,
      default: false,
    },
    hideCharacterName: {
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
    closed: {
      type: Boolean,
      default: false,
    },
  },
  setup({ character, valleyType, serverId }, { root, emit }) {
    const state = reactive({
      loading: false,
    });
    const { visibleRecover, rosters, valleyList } = useMirageState(['visibleRecover', 'rosters', 'valleyList']);
    const { setVisibleRecover, setRecoverCharacterUID, setVisibleEnlist, setVisibleRetreat, setEnlistClass, setEnlistServer, setEnlistValley } =
      useMirageMutations([
        'setVisibleRecover',
        'setRecoverCharacterUID',
        'setVisibleEnlist',
        'setVisibleRetreat',
        'setEnlistClass',
        'setEnlistServer',
        'setEnlistValley',
      ]);

    const now = dayjs().utc(true);
    const createdAt = dayjs.unix(character.CreatedDT).utc(true);
    const sealAvailableAt = createdAt.add(5, 'day');
    const sealRemaining = sealAvailableAt.diff(now);

    // console.log(now.format());
    // console.log(createdAt.format());
    // console.log(sealAvailableAt.format());
    // console.log(dayjs.unix(character.CreatedDT).add(5, 'd').format());

    // console.log(sealRemaining);

    const injured = computed(() => {
      if (character.State == 3 || character.State == 7 || character.State == 14) {
        return true;
      }
      return false;
    });

    const computedBonus = computed(() => {
      const orgScore = new BigNumber(character.CombatPoint).pow(2).div(100000);
      const mirageScore = new BigNumber(character.MirageScore);

      return mirageScore.minus(orgScore).div(orgScore).toNumber();
    });

    const computedGrade = getCharacterGrade(character.CombatPoint);

    const openSeal = () => {
      console.log('openSeal', character.tokenID);
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

    const openRetreat = () => {
      setRecoverCharacterUID(character.CharacterUID);
      setEnlistValley(valleyType);
      setEnlistServer(serverId);
      setVisibleRetreat(true);
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
      openRetreat,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-button';
@import '~@/assets/sass/components/mirage-character';
</style>
