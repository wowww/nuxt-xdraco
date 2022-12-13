<template>
  <div class="character-status">
    <template v-if="1 < Number(character.State)">
      <div class="mirage-character__status" :data-character-status="character.State">
        {{ $t(`w.mirage.wound.${character.State}`) }}
      </div>
      <div class="dispel-time">
        <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="restRemaining">
          {{ days }}d {{ hours }}h {{ minutes }}m
        </vue-countdown>
        <button type="button" class="btn-charge" @click="openRecover">Recover</button>
      </div>
    </template>
    <template v-else-if="character.buff.length > 0">
      <span class="txt-status cursed">
        {{ $t(`w.mirage.boss-raid.buff-type-${character.buff[0].BuffType}`) }}
      </span>
      <div class="dispel-time">
        <vue-countdown v-slot="{ days, hours, minutes }" class="countdown" :time="buffRemaining">
          {{ days }}d {{ hours }}h {{ minutes }}m
        </vue-countdown>
        <button type="button" class="btn-charge" @click="openDispel">Dispel</button>
      </div>
    </template>
  </div>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { defineComponent } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';

import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageCharacterStatus',
  components: { VueCountdown },
  props: {
    character: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const now = useNow({ interval: 1000 });
    const { useMirageState, useMirageMutations, useMirageActions } = useMirageStore();
    const { setModalCharacterInfo, setVisibleRecover, setVisibleSeal, setVisibleDispel } = useMirageMutations([
      'setModalCharacterInfo',
      'setVisibleRecover',
      'setVisibleSeal',
      'setVisibleDispel',
    ]);

    const nowDay = computed(() => {
      return dayjs(now.value);
    });

    const restAt = computed(() => {
      if (!props.character) return nowDay.value;
      return dayjs.unix(props.character.RestDT);
    });

    const restRemaining = computed(() => {
      return restAt.value.diff(nowDay.value);
    });

    const hasBuff11 = computed(() => {
      if (!props.character || !props.character.buff) {
        return false;
      }

      return !!props.character.buff.find((b) => b.BuffType === '11');
    });

    const buffRemaining = computed(() => {
      if (!props.character || !props.character.buff || !props.character.buff.length) {
        return 0;
      }
      const buff11 = props.character.buff[0];

      return dayjs.unix(buff11.ExpireDT).diff(nowDay.value);
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
      setModalCharacterInfo({
        visible: false,
        characterUID: props.character.CharacterUID,
        showComputedBonus: true,
      });
      setVisibleRecover(true);
    };

    const openDispel = () => {
      setModalCharacterInfo({
        visible: false,
        characterUID: props.character.CharacterUID,
        showComputedBonus: true,
      });
      setVisibleDispel(true);
    };

    return {
      restRemaining,
      hasBuff11,
      buffRemaining,
      openRecover,
      openDispel,
    };
  },
});
</script>
