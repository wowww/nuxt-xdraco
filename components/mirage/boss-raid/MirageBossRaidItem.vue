<template>
  <div
    class="wrap-boss"
    :class="{'eunsil-vacation' : 'ongoing' !== status && current.RaidType}"
    :data-raid-type="`${current.RaidType}`">
    <div class="wrap-boss__header">
      <div class="wrap-boss__title" v-html="$t(`t.mirage.boss-raid.type-${current.RaidType}`)"></div>
      <div v-if="current.Battle" class="wrap-boss__round">
        {{ $t('w.mirage.boss-raid.round') }}<em>{{ current.Battle }}</em>
      </div>
    </div>
    <div class="wrap-boss__bottom boss-bottom">

      <div class="wrap-boss__next">
        <span class="wrap-boss__next__msg wrap-boss__next__msg--vacation">Boss Raid has come to an end</span>
      </div>

    </div>
  </div>
</template>

<script>
import {defineComponent, computed, onUnmounted, onMounted} from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import { useState, createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import MirageBossRaidCountDown from '@/components/mirage/boss-raid/MirageBossRaidCountDown';
import { useMirageStore } from '@/utils/composables/mirage';
import { useWemixLogin } from '@/utils/composables/round';

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageBossRaidItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    beforeItem: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { root }) {
    const now = useNow({ interval: 1000 });

    const { wemixLogin } = useWemixLogin(root);

    const { accessToken, isDesktop } = useState(['accessToken', 'isDesktop']);
    const { useMirageGetters } = useMirageStore();
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { bossRaidStatus } = useMirageGetters(['bossRaidStatus']);
    const { battleTypes } = useMirageState('raidType');

    const nowDay = computed(() => dayjs(now.value));

    const current = computed(() => {
      if (Object.keys(props.item) === ['RaidType'] && props.beforeItem) {
        return props.beforeItem;
      }

      if (nowDay.value.unix() < dayjs.unix(props.item.StartDT).unix()) {
        return props.beforeItem;
      }

      return props.item;
    });

    const startDay = computed(() => {
      if (current.value) {
        return dayjs.unix(current.value.StartDT);
      }

      return nowDay.value;
    });

    const endDay = computed(() => {
      if (current.value) {
        return dayjs.unix(current.value.EndDT);
      }

      return nowDay.value;
    });

    const nextRound = computed(() => {
      if (nowDay.value.unix() < dayjs.unix(props.item.StartDT).unix()) {
        return dayjs.unix(props.item.StartDT);
      }
      return dayjs.unix(current.value.StartDT);
    });

    const status = computed(() => {
      if (!current.value) {
        return 'closed';
      }

      if (startDay.value.unix() <= nowDay.value.unix() && nowDay.value.unix() <= endDay.value.unix()) {
        if (endDay.value.unix() - nowDay.value.unix() < 3600) {
          return 'locked';
        }
        return 'ongoing';
      }

      return 'ready';
    });

    const goRaidPage = () => {
      if (!accessToken.value) {
        wemixLogin();
        return;
      }

      root.$router.push(`/mirage/boss-raid/${current.value.ScheduleUID}`);
    };

    return {
      isDesktop,
      now,
      current,
      nowDay,
      startDay,
      endDay,
      status,
      goRaidPage,
      mirageLock,
      nextRound,
    };
  },
});
</script>
