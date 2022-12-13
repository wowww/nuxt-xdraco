<template>
  <mirage-character :character="character" @click="open">
    <div v-if="valleyType" class="wrap-button">
      <button
        v-if="character.State === -1"
        type="button"
        :disabled="closed"
        class="btn-mirage btn-reinforce"
        :class="{ 'btn-assault': assault }"
        @click="open"
      >
        <span v-if="!closed">{{ assault ? $t('w.mirage.assault') : $t('w.mirage.enlist') }}</span>
        <span v-if="!closed && valleyList && valleyType" class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em v-if="assault">{{ valleyList[valleyType].KickVigorAmount }}</em>
          <em v-else>{{ valleyList[valleyType].VigorAmount }}</em>
        </span>
      </button>
    </div>
  </mirage-character>
</template>

<script>
import { computed, defineComponent, reactive, watch } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';

import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

export default defineComponent({
  name: 'MirageValleyCharacterItem',
  components: { MirageCharacter },
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
        Class: '', // 1: 전사 2: 술사 3: 도사 4: 석궁사 5: 무사
        CombatPoint: '',
        MirageScore: '', // 채굴력
        SanctuaryOfHydraLevel: 0, // 해룡 안식처 레벨
        CreatedDT: 0, // 캐릭터를 불러 온 일시(UTC)
        State: 0, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
        RestDT: 0, // 부상 완치시간(UTC)
      }),
    },
    currentRank: {
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
    hideCharacterName: {
      type: Boolean,
      default: false,
    },
    hideMirageScore: {
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
  setup({ character, valleyType, serverId, assault, closed, hideAction }, { root, emit }) {
    const { now } = useNow({ interval: 1000 });
    const state = reactive({
      loading: false,
    });
    const { useMirageState, useMirageMutations, useMirageActions } = useMirageStore();
    const { visibleRecover, rosters, valleyList } = useMirageState(['visibleRecover', 'rosters', 'valleyList']);
    const {
      setVisibleRecover,
      setRecoverCharacterUID,
      setVisibleEnlist,
      setEnlistMode,
      setEnlistClass,
      setEnlistServer,
      setEnlistValley,
      setVisibleRetreat,
    } = useMirageMutations([
      'setVisibleRecover',
      'setRecoverCharacterUID',
      'setVisibleEnlist',
      'setEnlistMode',
      'setEnlistClass',
      'setEnlistServer',
      'setEnlistValley',
      'setVisibleRetreat',
    ]);
    const { openModalEnlist, openModalRetreat } = useMirageActions(['openModalEnlist', 'openModalRetreat']);

    const nowDay = computed(() => dayjs(now.value));
    const createdAt = dayjs.unix(character.CreatedDT).utc(true);
    const sealAvailableAt = createdAt.add(5, 'day');

    const injured = computed(() => {
      switch (Number(character.State)) {
        case MirageCharacterState.INJURED_SLIGHTLY:
        case MirageCharacterState.INJURED_SERIOUSLY:
        case MirageCharacterState.INJURED_CRITICALLY:
          return true;
        default:
          return false;
      }
    });

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

    const open = () => {
      if (closed || hideAction) {
        return;
      }

      if (character.State === MirageCharacterState.EMPTY_SLOT) {
        openModalEnlist({ characterId: character.CharacterUID, serverId, valleyId: valleyType, klass: Number(character.Class), isAssault: assault });
        return;
      }

      if (character.State === MirageCharacterState.ENLISTED) {
        openModalRetreat({ characterId: character.CharacterUID, serverId, valleyId: valleyType });
      }
    };

    watch(
      () => assault,
      () => {
        console.log(assault);
      },
    );

    return {
      MirageCharacterState,
      now,
      injured,
      valleyList,
      computedBonus,
      computedGrade,
      open,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-button';
@import '~@/assets/sass/components/mirage-character';
</style>
