<template>
  <div class="mirage-boss-raid-result">
    <div class="section-title-bar">
      <h2 class="section-title">
        <template v-if="bossRaidStatus.locked">Top Raiders</template>
        <template v-else>Raid Result</template>
      </h2>
      <div class="result-msg">
        <span class="txt-msg">Ranking Info</span>
        <v-tooltip content-class="mirage-tooltip" attach=".result-msg" max-width="320" top>
          <template #activator="{ on, attrs }">
            <v-icon v-bind="attrs" class="icon-mirage-tooltip" v-on="on">icon</v-icon>
          </template>
          <div class="mirage-tooltip-title" v-html="$t('t.mirage.boss-raid.result.ranking')"></div>
          <div class="mirage-tooltip-desc" v-html="$t('s.mirage.boss-raid.result.ranking')"></div>
        </v-tooltip>
      </div>
    </div>
    <div v-if="false && mirageLock" class="caution-update">
      <p class="caution-txt">The results will be open on {{ bossRaid.schedule[0].EndDT | dateFormat }}</p>
    </div>
    <mirage-boss-raid-result-list :items="resultItems" is-top />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';

import MirageBossRaidResultList from '@/components/mirage/boss-raid/MirageBossRaidResultList';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidResult',
  components: {
    MirageBossRaidResultList,
  },
  props: {
    isInBattle: {
      type: Boolean,
      required: false,
    },
  },
  setup(_, { root }) {
    const { $dracoWebApi } = root;

    const state = reactive({
      resultItems: [],
    });

    const { useMirageState, useMirageGetters, useMirageMutations } = useMirageStore();
    const { bossRaid } = useMirageState(['bossRaid']);
    const { mirageStatus, bossRaidStatus, mirageLock } = useMirageGetters(['mirageStatus', 'bossRaidStatus', 'mirageLock']);

    const schedule = computed(() => {
      if (!bossRaid.value || !bossRaid.value.schedule) {
        return null;
      }

      return bossRaid.value.schedule[0];
    });

    const fetchResult = () => {
      if (!schedule.value) {
        return;
      }
      $dracoWebApi
        .get('/bossraid/result', { params: { scheduleUID: schedule.value.ScheduleUID, raidType: schedule.value.RaidType } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.resultItems = data.data.ranking ? data.data.ranking.slice(0, 10) : [];
            state.resultItems.sort((a, b) => Number(b.MirageScore) - Number(a.MirageScore));
          }
        });
    };

    watch(
      () => schedule.value,
      () => {
        console.log(schedule.value);
        fetchResult();
      },
    );

    onMounted(() => {
      fetchResult();
    });

    return {
      ...toRefs(state),
      bossRaid,
      bossRaidStatus,
      mirageLock,
      schedule,
    };
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-boss-raid-result';
</style>
