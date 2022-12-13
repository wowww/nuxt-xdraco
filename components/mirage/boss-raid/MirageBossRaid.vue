<template>
  <section class="mirage-boss-raid">
    <div class="mirage-boss-raid__header">
      <h2 class="mirage-boss-raid__title">{{ $t('t.mirage.boss-raid') }}</h2>
      <p v-if="currentRaid" class="mirage-boss-raid__header__desc">
        <em>
          '{{ $t(`w.mirage.boss-raid.name-type-${currentRaid.RaidType}`) }}
          {{ $t(`w.mirage.boss-raid.type-${currentRaid.RaidType}`) }}'
        </em>
        {{ $t('w.mirage.boss-raid.round') }}
        {{ $t('s.mirage.boss-raid.round.desc', [currentRaid.Battle]) }}
      </p>
    </div>
    <div class="mirage-boss-raid__body">
      <mirage-boss-raid-item
        :item="bossRaids.length > 0 && currentRaidType11Idx > -1 ? bossRaids[currentRaidType11Idx] : { RaidType: 11 }"
        :before-item="beforeRaidType11"
      />
      <mirage-boss-raid-item
        :item="bossRaids.length > 0 && currentRaidType12Idx > -1 ? bossRaids[currentRaidType12Idx] : { RaidType: 12 }"
        :before-item="beforeRaidType12"
      />
    </div>
  </section>
</template>

<script>
import { defineComponent, computed, onMounted } from '@vue/composition-api';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';

import MirageBossRaidItem from '@/components/mirage/boss-raid/MirageBossRaidItem';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaid',
  components: { MirageBossRaidItem },
  setup() {
    const now = useNow({ interval: 1000 });
    const { useMirageState, useMirageActions } = useMirageStore();
    const { bossRaids } = useMirageState(['bossRaids']);
    const { fetchBossRaidList } = useMirageActions(['fetchBossRaidList']);

    const currentRaid = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.find((raid) => raid.StartDT <= timestamp && timestamp <= raid.EndDT);
      }

      return null;
    });

    const currentRaidType11Idx = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.findIndex((raid) => timestamp < raid.EndDT && raid.RaidType === 11);
      }
      return -1;
    });

    const currentRaidType12Idx = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs(now.value).unix();
        return bossRaids.value.findIndex((raid) => timestamp < raid.EndDT && raid.RaidType === 12);
      }
      return -1;
    });

    const findBeforeRaid = (type) => {
      if (!bossRaids.value || bossRaids.value.length <= 0) return null;
      const items = bossRaids.value.filter((raid) => raid.RaidType === type);
      const timestamp = dayjs(now.value).unix();
      const current = bossRaids.value.find((raid) => timestamp < raid.EndDT && raid.RaidType === type);
      if(current) {
        const currentIndex = items.findIndex((raid) => raid === current);
        return items[currentIndex - 1];
      }
      return null;
    }

    const beforeRaidType11 = computed(() => {
      return findBeforeRaid(11);
    });

    const beforeRaidType12 = computed(() => {
      return findBeforeRaid(12);
    });

    onMounted(() => {
      fetchBossRaidList();
    });

    return {
      bossRaids,
      currentRaid,
      fetchBossRaidList,
      currentRaidType11Idx,
      currentRaidType12Idx,
      beforeRaidType11,
      beforeRaidType12,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-boss-raid';
@import '~@/assets/sass/components/mirage-button';
</style>
