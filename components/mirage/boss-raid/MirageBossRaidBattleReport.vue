<template>
  <div class="mirage-battle-report">
    <div v-if="mirageLock" class="mirage-battle-report--caution pa-10">
      <p class="caution-txt">{{ $t('s.mirage.lock-up.log') }}</p>
    </div>
    <ul v-else class="mirage-battle-report__list">
      <mirage-boss-raid-battle-report-item v-for="(log, idx) in bossRaidLogs" :key="`mbri-${log.LogType}-${log.LogDT}-${idx}`" :log="log" />
    </ul>
    <div v-if="bossRaidLogPageID * 10 < bossRaidLogCount" class="wrap-button">
      <div class="btn-viewmore" @click="fetchBossRaidLogs(bossRaidLogPageID + 1)">Report More</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, watch } from '@vue/composition-api';

import MirageBossRaidBattleReportItem from '@/components/mirage/boss-raid/MirageBossRiadBattleReportItem';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidBattleReport',
  components: {
    MirageBossRaidBattleReportItem,
  },
  props: {
    //
  },
  setup() {
    const { useMirageState, useMirageGetters, useMirageActions, useMirageMutations } = useMirageStore();
    const { bossRaid, bossRaidLogs, bossRaidLogCount, bossRaidLogPageID } = useMirageState([
      'bossRaid',
      'bossRaidLogs',
      'bossRaidLogCount',
      'bossRaidLogPageID',
    ]);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { fetchBossRaidLogs } = useMirageActions(['fetchBossRaidLogs']);
    const { setBossRaidLogs, setBossRaidLogCount, setBossRaidLogPageId } = useMirageMutations([
      'setBossRaidLogs',
      'setBossRaidLogCount',
      'setBossRaidLogPageId',
    ]);

    onMounted(() => {
      if (bossRaid.value) {
        fetchBossRaidLogs();
      }
    });

    watch(
      () => bossRaid.value,
      () => {
        fetchBossRaidLogs();
      },
    );

    onUnmounted(() => {
      setBossRaidLogs([]);
      setBossRaidLogCount(0);
      setBossRaidLogPageId(1);
    });

    return {
      bossRaid,
      bossRaidLogs,
      mirageStatus,
      mirageLock,
      bossRaidLogPageID,
      fetchBossRaidLogs,
      bossRaidLogCount,
    };
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-battle-report';
</style>
