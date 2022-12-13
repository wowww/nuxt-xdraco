<template>
  <mirage-character :character="character" show-state :hide-score="injured" @click="openCharacterInfo">
    <div v-if="!hideInjured && injured" class="mirage-character__status" :data-character-status="character.State">
      {{ $t(`w.mirage.wound.${character.State}`) }}
    </div>
    <vue-countdown
      v-if="!hideInjured && injured && restRemaining > 0"
      v-slot="{ days, hours, minutes }"
      class="mirage-character__cooltime"
      auto-start
      :time="restRemaining"
    >
      {{ days }}d {{ hours }}h {{ minutes }}m
    </vue-countdown>
    <dl v-if="rankingBonus" class="mirage-character__bonus">
      <dt>{{ $t('w.mirage.ranking.bonus') }}</dt>
      <dd>
        <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-darksteel.webp" width="16" alt="Darksteel" />
        <span>{{ rankingBonus | currency(2) }}</span>
      </dd>
    </dl>
    <div v-if="!hideAction" class="wrap-button">
      <button v-if="injured" type="button" class="btn-mirage btn-recover" @click="openCharacterInfo">
        <span>{{ $t('w.mirage.recover') }}</span>
        <span class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>{{ consumeEnergy }}</em>
        </span>
      </button>
      <button
        v-else-if="sealRemaining <= 0"
        type="button"
        class="btn-mirage btn-primary"
        :style="{ opacity: character.State == MirageCharacterState.ENLISTED ? '0.3' : '1' }"
        @click="openCharacterInfo"
      >
        <span>{{ $t('w.mirage.seal') }}</span>
        <span class="volume">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-energy.webp" width="20" height="20" alt="Energy" />
          <em>
            <template v-if="computedGrade.grade === 5">40</template>
            <template v-else-if="computedGrade.grade === 4">20</template>
            <template v-else-if="computedGrade.grade === 3">10</template>
            <template v-else>5</template>
          </em>
        </span>
      </button>
      <div v-else class="mirage-character__sealed-time" @click="openCharacterInfo">
        <span>Can be sealed after</span>
        <vue-countdown v-slot="{ days, hours, minutes, seconds }" :time="sealRemaining">
          <template v-if="days">{{ days }}d</template>
          <template v-if="hours">{{ hours }}h</template>
          <template v-if="minutes">{{ minutes }}m</template>
          <template v-if="seconds">{{ seconds }}s</template>
        </vue-countdown>
      </div>
    </div>
  </mirage-character>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { computed, defineComponent, reactive } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useMutations } from 'vuex-composition-helpers/dist';

import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';
import MirageCharacterState, { stateTitle } from '@/constants/mirage/mirage-character-state';

export default defineComponent({
  name: 'MirageRosterCharacterItem',
  components: {
    MirageCharacter,
    VueCountdown,
  },
  props: {
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
    rankingBonus: {
      type: Number,
    },
    closed: {
      type: Boolean,
      default: false,
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
    hideInjured: {
      type: Boolean,
      default: false,
    },
  },
  setup({ character, valleyType, serverId, closed }, { root, emit }) {
    const { $i18n } = root;
    const now = useNow({ interval: 1000 });
    const state = reactive({
      loading: false,
    });
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageMutations } = useMirageStore();
    const { visibleRecover, rosters, valleyList } = useMirageState(['visibleRecover', 'rosters', 'valleyList']);
    const { setVisibleRecover, setRecoverCharacterUID, setVisibleEnlist, setEnlistClass, setEnlistServer, setEnlistValley, setModalCharacterInfo } =
      useMirageMutations([
        'setVisibleRecover',
        'setRecoverCharacterUID',
        'setVisibleEnlist',
        'setEnlistClass',
        'setEnlistServer',
        'setEnlistValley',
        'setModalCharacterInfo',
      ]);

    const nowDay = computed(() => {
      return dayjs(now.value);
    });

    const createdAt = dayjs.unix(character.CreatedDT);
    const restAt = dayjs.unix(character.RestDT);

    const sealAvailableAt = createdAt.add(24, 'hour');

    const sealRemaining = computed(() => {
      return sealAvailableAt.diff(nowDay.value);
    });
    const restRemaining = computed(() => {
      return restAt.diff(nowDay.value);
    });

    // console.log('now', now.format());
    // console.log('createdAt', createdAt.format());
    // console.log('restDt', restDt.format());
    // console.log(sealAvailableAt.format());
    // console.log(dayjs.unix(character.CreatedDT).add(5, 'd').format());
    //
    // console.log(sealRemaining);

    const consumeEnergy = computed(() => {
      if (character) {
        const diffTimes = restAt.diff(nowDay.value, 'hour');
        return diffTimes < 0 ? 0 : Math.ceil(diffTimes / 6);
      }

      return 0;
    });

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
      const reinforce = new BigNumber(character.Reinforce || '0');

      const orgScore = new BigNumber(character.CombatPoint).plus(mirax.isGreaterThan(100000) ? 100000 : mirax).pow(2).div(100000)
        .multipliedBy(new BigNumber(character.Reinforce).multipliedBy(0.02).plus(1));
      const mirageScore = new BigNumber(character.MirageScore);

      return (mirageScore.minus(orgScore).div(orgScore).toNumber() * 100) / 100;
    });

    const computedGrade = computed(() => {
      return getCharacterGrade(Number(character.CombatPoint));
    });

    const openCharacterInfo = () => {
      setModalCharacterInfo({
        visible: true,
        characterUID: character.CharacterUID,
        showComputedBonus: false,
      });
    };

    const openSeal = () => {
      if (character.State == MirageCharacterState.ENLISTED) {
        return;
      }
      if (closed) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.seal'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      emit('onSealClick', character.tokenID);
    };

    const openRecover = () => {
      if (closed) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.recover'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

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
      MirageCharacterState,
      now,
      nowDay,
      injured,
      openSeal,
      openRecover,
      openEnlist,
      stateTitle,
      sealRemaining,
      restRemaining,
      valleyList,
      computedBonus,
      computedGrade,
      consumeEnergy,
      openCharacterInfo,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-button';
@import '~@/assets/sass/components/mirage-character';
</style>
