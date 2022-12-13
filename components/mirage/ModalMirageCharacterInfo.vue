<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-character-info"
    :value="modalCharacterInfo.visible"
    :width="isDesktop ? '720px' : '100%'"
    :fullscreen="!isDesktop"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    scrollable
    persistent
  >
    <div class="dialog-mirage-character-info__header">
      Character Info
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="close"></v-btn>
    </div>
    <div v-if="character" class="dialog-mirage-character-info__contents">
      <mirage-character :character="character" />
      <div class="wrap-info">
        <div v-if="isDesktop" class="wrap-info__score info-score">
          <div class="wrap-info__score__mirage">
            <span class="wrap-info__score__mirage__value">{{ computedMirageScore | currency(0) }}</span>
            <span v-if="computedBonus > 0 && modalCharacterInfo.showComputedBonus" class="change">+{{ computedBonus | currency(0) }}%</span>
          </div>
          <div class="wrap-info__score__mirax info-wrap-mirax">
            <span class="wrap-info__title">MiraX</span>
            <span class="wrap-info__value">{{ character.MiraX | currency(0) }}</span>
          </div>
        </div>
        <div class="wrap-info__level">
          <div class="wrap-info__level__item">
            <span class="wrap-info__title">Power Score</span>
            <em class="wrap-info__value">{{ character.CombatPoint | currency(0) }}</em>
          </div>
          <div v-if="character.Lv" class="wrap-info__level__item">
            <span class="wrap-info__title">Level</span>
            <span class="wrap-info__value">{{ character.Lv }}</span>
          </div>
        </div>
        <div v-if="character.DetailType === '1' || character.DetailType === '2' || character.DetailType === '3'" class="wrap-info__enlisted">
          <h4 class="wrap-info__enlisted__title">Enlisted</h4>
          <ul>
            <li>
              <span class="wrap-info__value">Hidden Vally Capture / {{ valleyName }} / {{ $t(`t.mirage.valley-type.${character.DetailType}`) }}</span>
              <button
                type="button"
                class="btn btn-xs"
                @click="openModalRetreat({ characterId: character && character.CharacterUID, serverId: character && character.WorldUID, valleyId: character.DetailType })"
              >
                Retreat
              </button>
            </li>
            <li v-if="character.DetailType === '1' || character.DetailType === '2' || character.DetailType === '3'">
              <span class="wrap-info__title">Sanctuary of HYDRA</span>
              <span class="wrap-info__enlisted__stage">
                stage
                <em>{{ character.SanctuaryOfHydraLevel }}</em>
              </span>
            </li>
            <li v-if="false">
              <span class="wrap-info__title">Septaria Harvest</span>
              <span class="wrap-info__value septaria">7</span>
            </li>
          </ul>
        </div>
        <div v-if="character.DetailType === '11' || character.DetailType === '12'" class="wrap-info__enlisted">
          <h4 class="wrap-info__enlisted__title">Enlisted</h4>
          <ul>
            <li>
              <span class="wrap-info__value">
                BOSS RAID / {{ $t(`w.mirage.boss-raid.name-type-${character.DetailType}`) }}
                {{ $t(`w.mirage.boss-raid.type-${character.DetailType}`) }}
              </span>
              <button
                v-if="character.buff && character.buff.length > 0"
                type="button"
                class="btn btn-xs"
                @click="openModalRetreat({ characterId: character && character.CharacterUID, serverId: character && character.WorldUID, valleyId: character.DetailType })"
              >
                Retreat
              </button>
            </li>
            <li v-if="false">
              <span class="wrap-info__title">Bid Price</span>
              <span class="wrap-info__value vigor">130</span>
            </li>
          </ul>
        </div>
        <div v-if="Number(character.State) > 1 || hasBuff11 || hasBuff12" class="wrap-info__damaged">
          <div v-if="Number(character.State) > 1" class="wrap-info--curse">
            <span class="wrap-info__damaged__title">Wound</span>
            <div class="wrap-info__damaged__item">
              <div>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/ico-damage.webp" width="28" height="28" alt="" />
                <div class="wrap-info__damaged__status">
                  <span class="wrap-info__title color-damage">{{ $t(`w.mirage.wound.${character.State}`) }}</span>
                  <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="restRemaining">
                    {{ days }}d {{ hours }}h {{ minutes }}m
                  </vue-countdown>
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openRecover">Recover</button>
            </div>
          </div>
          <div v-if="hasBuff11 || hasBuff12" class="wrap-info--curse">
            <span class="wrap-info__damaged__title">Curse</span>
            <div v-if="hasBuff11" class="wrap-info__damaged__item">
              <div class="flex-row-item__wrapper">
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/img-32-scissors.webp" width="32" alt="" />
                <div v-if="buff11Remaining" class="wrap-info__damaged__status">
                  <span class="wrap-info__title color-cursed" v-html="$t('w.mirage.boss-raid.buff-type-11')"></span>
                  <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="buff11Remaining">
                    {{ days }}d {{ hours }}h {{ minutes }}m
                  </vue-countdown>
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openDispel">Dispel</button>
            </div>
            <div v-if="hasBuff12" class="wrap-info__damaged__item">
              <div class="flex-row-item__wrapper">
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-character/img-32-stink.webp" width="32" height="32" alt="" />
                <div class="wrap-info__damaged__status">
                  <span class="wrap-info__title color-cursed" v-html="$t('w.mirage.boss-raid.buff-type-12')"></span>
                  <div v-if="buff12Remaining" class="wrap-countdown">
                    <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="buff12Remaining">
                      {{ days }}d {{ hours }}h {{ minutes }}m
                    </vue-countdown>
                  </div>
                </div>
              </div>
              <button type="button" class="btn btn-xs" @click="openDispel">Dispel</button>
            </div>
          </div>
        </div>
        <div class="wrap-info__sealed">
          <span class="wrap-info__title">
            <template v-if="sealRemaining > 0">
              <span>Can be sealed after</span>
              <vue-countdown v-slot="{ days, hours, minutes, seconds }" class="wrap-info__sealed__countdown" :time="sealRemaining">
                <template v-if="days">{{ days }}d</template>
                <template v-if="hours">{{ hours }}h</template>
                <template v-if="minutes">{{ minutes }}m</template>
                <template v-if="seconds">{{ seconds }}s</template>
              </vue-countdown>
            </template>
            <template v-else-if="Number(character.State) > 1 || character.buff.length > 0"
            >NFT sealing is unavailable while Wounds or Curses remain active.
            </template
            >
            <template v-else-if="character.DetailType !== '0'">NFT sealing is unavailable.</template>
            <template v-else>{{ $t('s.mirage.seal.play') }}</template>
          </span>
          <button
            type="button"
            class="btn btn-red-mirage"
            :disabled="sealRemaining > 0 || Number(character.State) > 1 || character.DetailType !== '0' || character.buff.length > 0"
            @click="openSeal"
          >
            <span>Seal</span>
            <span class="seal">{{ computedSealVigor }}</span>
          </button>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { computed, defineComponent } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";
import { useNow } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import MirageCharacter from '@/components/mirage/common/MirageCharacter';
import { getCharacterGrade, useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'ModalMirageCharacterInfo',
  components: { MirageCharacter, VueCountdown },
  setup() {
    const now = useNow({ interval: 1000 });
    const { isDesktop } = useState(['isDesktop']);
    const { useMirageState, useMirageMutations, useMirageActions } = useMirageStore();
    const { rosters, modalCharacterInfo, valleyCapture } = useMirageState(['rosters', 'modalCharacterInfo', 'valleyCapture']);
    const { setModalCharacterInfo, setVisibleRecover, setVisibleSeal, setVisibleDispel } = useMirageMutations([
      'setModalCharacterInfo',
      'setVisibleRecover',
      'setVisibleSeal',
      'setVisibleDispel',
    ]);
    const { openModalRetreat } = useMirageActions(['openModalRetreat']);

    const close = () => {
      setModalCharacterInfo({
        visible: false,
        characterUID: '',
        showComputedBonus: true,
      });
    };

    const nowDay = computed(() => {
      return dayjs(now.value);
    });

    const character = computed(() => {
      if (!rosters.value || rosters.value.length === 0 || modalCharacterInfo.value.characterUID === '') {
        return null;
      }

      return rosters.value.find((c) => c.CharacterUID === modalCharacterInfo.value.characterUID);
    });

    const createdAt = computed(() => {
      if (!character.value) return nowDay.value;
      return dayjs.unix(character.value.CreatedDT);
    });

    const restAt = computed(() => {
      if (!character.value) return nowDay.value;
      return dayjs.unix(character.value.RestDT);
    });

    const sealAvailableAt = computed(() => {
      return createdAt.value.add(24, 'hour');
    });

    const sealRemaining = computed(() => {
      return sealAvailableAt.value.diff(nowDay.value);
    });
    const restRemaining = computed(() => {
      return restAt.value.diff(nowDay.value);
    });

    const computedMirageScore = computed(() => {
      if (!character.value) {
        return 0;
      }
      const mirax = new BigNumber(character.value.MiraX || '0');
      const reinforce = new BigNumber(character.value.Reinforce || '0');

      return new BigNumber(character.value.CombatPoint)
        .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
      .pow(2).
        div(100000).multipliedBy(reinforce.multipliedBy(0.02).plus(1)).
        toNumber();
    });

    const computedBonus = computed(() => {
      if (!character.value) {
        return 0;
      }

      const orgScore = new BigNumber(character.value.CombatPoint)
      .plus(character.value.MiraX).
        pow(2).
        div(100000).
        multipliedBy(new BigNumber(character.value.Reinforce).multipliedBy(0.02).plus(1));
      const mirageScore = new BigNumber(character.value.MirageScore);

      return mirageScore.minus(orgScore).div(orgScore).toNumber() * 100;
    });

    const computedGrade = computed(() => {
      if (!character.value) {
        return 1;
      }
      return getCharacterGrade(Number(character.value.CombatPoint));
    });

    const computedSealVigor = computed(() => {
      if (computedGrade.value.grade === 5) {
        return 40;
      }
      if (computedGrade.value.grade === 4) {
        return 20;
      }
      if (computedGrade.value.grade === 3) {
        return 10;
      }

      return 5;
    });

    const valleyName = computed(() => {
      if (!valleyCapture.value && character.value) {
        return '';
      }

      const server = valleyCapture.value.serverInfo.find((s) => s.ServerID === character.value.WorldUID);

      if (!server) {
        return '';
      }

      return server.ServerName;
    });

    const hasBuff11 = computed(() => {
      if (!character.value || !character.value.buff) {
        return false;
      }

      return !!character.value.buff.find((b) => b.BuffType === '11');
    });

    const buff11Remaining = computed(() => {
      if (!character.value) {
        return null;
      }
      const buff11 = character.value.buff.find((b) => b.BuffType === '11');

      if (!buff11) {
        return null;
      }

      return dayjs.unix(buff11.ExpireDT).diff(nowDay.value);
    });

    const hasBuff12 = computed(() => {
      if (!character.value || !character.value.buff) {
        return false;
      }

      return !!character.value.buff.find((b) => b.BuffType === '12');
    });

    const buff12Remaining = computed(() => {
      if (!character.value) {
        return null;
      }
      const buff12 = character.value.buff.find((b) => b.BuffType === '12');

      if (!buff12) {
        return null;
      }

      return dayjs.unix(buff12.ExpireDT).diff(nowDay.value);
    });

    const openRecover = () => {
      /*
      if (closed) {
        setCommonModal({
          open: true,
          title: t('t.mirage.harvest.lockout'),
          desc: t('s.mirage.message.lockout.recover'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }
      */
      setVisibleRecover(true);
    };

    const openDispel = () => {
      setVisibleDispel(true);
    };

    const openSeal = () => {
      setVisibleSeal(true);
    };

    return {
      isDesktop,
      now,
      modalCharacterInfo,
      close,
      character,
      computedMirageScore,
      computedBonus,
      openModalRetreat,
      valleyName,
      openRecover,
      openSeal,
      openDispel,
      sealRemaining,
      restRemaining,
      computedSealVigor,
      hasBuff11,
      hasBuff12,
      buff11Remaining,
      buff12Remaining,
    };
  },
});
</script>
<style scoped lang="scss">

</style>
