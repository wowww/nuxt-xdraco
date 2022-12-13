<template>
  <div class="mirage-battle-report">
    <ul class="mirage-battle-report__list">
      <mirage-battle-report-item v-for="(log, idx) in viewLogList" :key="`mbri-${log.LogType}-${log.LogDT}-${idx}`" :log="log" />
    </ul>
    <div v-if="hasMoreLog" class="wrap-button">
      <div class="btn-viewmore" style="cursor: pointer" @click="logViewLimit += pageSize">View More</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import {createNamespacedHelpers, useState} from 'vuex-composition-helpers/dist';

import MirageBattleReportItem from '@/components/mirage/MirageBattleReportItem';

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageBattleReport',
  components: { MirageBattleReportItem },
  setup(_, { root }) {
    const { isDesktop } = useState(['isDesktop']);

    const pageSize = isDesktop ? 20 : 10;

    const state = reactive({
      logViewLimit: isDesktop ? 20 : 10,
    });
    const { logList } = useMirageState(['logList']);

    const viewLogList = computed(() => {
      return logList.value.filter((item, idx) => idx < state.logViewLimit);
    });

    const hasMoreLog = computed(() => {
      return state.logViewLimit < logList.value.length;
    });

    return {
      isDesktop,
      logList,
      viewLogList,
      ...toRefs(state),
      hasMoreLog,
      pageSize,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-battle-report';
</style>
