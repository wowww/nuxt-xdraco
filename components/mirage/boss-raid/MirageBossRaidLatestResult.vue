<template>
  <div v-if="beforeSchedule" class="mirage-latest-raid-result">
    <div class="section-title-bar">
      <h2 class="section-title">Latest Raid Result</h2>
      <span v-if="!isDesktop" class="raid-date">{{ beforeSchedule && beforeSchedule.EndDT | dateFormat }}</span>
    </div>
    <div class="wrap-round-raid-info">
      <img v-if="beforeSchedule.RaidType === 12" src="https://file.mir4global.com/xdraco/img/common/mirage/img-eunsil-40.webp" width="40" alt="" />
      <img v-if="beforeSchedule.RaidType === 11" src="https://file.mir4global.com/xdraco/img/common/mirage/thumb-40-horang.webp" width="40" alt="" />
      <div class="mirage-round-raid-info">
        <span class="raid-round">Round {{ beforeSchedule.Battle }}</span>
        <span class="boss-name" v-html="$t(`t.mirage.boss-raid.type-${beforeSchedule.RaidType}`)"></span>
        <span class="raid-date">{{ beforeSchedule.EndDT | dateFormat }}</span>
      </div>

      <div class="wrap-btn">
        <button v-if="beforeSchedule" type="button" class="btn-mirage btn-primary" @click="openPopup = true">Ranking</button>
        <!-- Ranking Dialog -->
        <v-dialog
          v-model="openPopup"
          attach="#contents"
          content-class="dialog-mirage dialog-mirage-raid-info"
          scrollable
          :width="isDesktop ? '960px' : '100%'"
          :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
          persistent
        >
          <div class="dialog-header">
            Latest Raid Result Ranking
            <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="openPopup = false"></v-btn>
          </div>
          <div class="content">
            <div class="wrap-raid-info">
              <img v-if="beforeSchedule.RaidType === 12" src="https://file.mir4global.com/xdraco/img/common/mirage/thumb-boss-raid-horang.webp" width="96" alt="" />
              <img v-if="beforeSchedule.RaidType === 11" src="https://file.mir4global.com/xdraco/img/common/mirage/thumb-boss-raid-eunsil.webp" width="96" alt="" />
              <div class="mirage-round-raid-info">
                <span class="raid-round">Round {{ beforeSchedule.Battle }}</span>
                <span class="boss-name" v-html="$t(`t.mirage.boss-raid.type-${beforeSchedule.RaidType}`)"></span>
                <span class="raid-date">{{ beforeSchedule.EndDT | dateFormat }}</span>
              </div>
            </div>
            <mirage-boss-raid-result-list :open="openPopupHistory" :items="beforeItems" />
          </div>
        </v-dialog>
      </div>
      <!-- //Ranking Dialog -->
    </div>

    <div v-if="mirageLock" class="caution-update mt-1 pa-10">
      <p class="caution-txt">{{ $t('s.mirage.lock-up.log') }}</p>
    </div>
    <div v-else-if="resultItems.length === 0" class="caution-update mt-1 pa-10">
      <p class="caution-txt">{{ $t('s.mirage.message.no-enlisted') }}</p>
    </div>
    <mirage-boss-raid-result-list v-else :items="resultItems" is-my-ranking />
    <div class="wrap-button" v-if="false">
      <button class="btn-mirage-history" type="button" @click="openPopupHistory = true">My Boss Raid History</button>
    </div>
    <hr />
    <modal-boss-raid-history :open="openPopupHistory" @close="closePopup"/>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import { onMounted } from '@vue/composition-api/dist/vue-composition-api';
import {useState} from "vuex-composition-helpers/dist";
import MirageBossRaidResultList from '@/components/mirage/boss-raid/MirageBossRaidResultList';
import { useMirageStore } from '@/utils/composables/mirage';
import ModalBossRaidHistory from "~/components/mirage/boss-raid/ModalBossRaidHistory";

export default defineComponent({
  name: 'MirageBossRaidLatestResult',
  components: {
    ModalBossRaidHistory,
    MirageBossRaidResultList,
  },
  props: {
    isInBattle: {
      type: Boolean,
      required: false,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(_, { root }) {
    const { $dracoWebApi } = root;

    const state = reactive({
      resultItems: [],
      beforeSchedule: null,
      beforeItems: [],
      openPopup: false,
      openPopupHistory: false,
    });

    const { isDesktop } = useState(['isDesktop']);

    const { useMirageState, useMirageGetters, useMirageMutations } = useMirageStore();
    const { bossRaid } = useMirageState(['bossRaid']);
    const { mirageStatus, bossRaidStatus, mirageLock } = useMirageGetters(['mirageStatus', 'bossRaidStatus', 'mirageLock']);

    const schedule = computed(() => {
      if (!bossRaid.value || !bossRaid.value.schedule) {
        return null;
      }

      return bossRaid.value.schedule[0];
    });

    const fetchLastResult = () => {
      if (!schedule.value) {
        return;
      }
      $dracoWebApi
        .get('/bossraid/lastresult', { params: { scheduleUID: schedule.value.ScheduleUID, raidType: schedule.value.RaidType } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.resultItems = data.data && data.data.myRanking ? data.data.myRanking : [];
            if (data.data.beforeSchedule) {
              state.beforeSchedule = data.data.beforeSchedule[0];
            }
          }
        });
    };

    const fetchResult = () => {
      if (!state.beforeSchedule) {
        return;
      }
      $dracoWebApi
        .get('/bossraid/result', { params: { scheduleUID: state.beforeSchedule.ScheduleUID, raidType: schedule.value.RaidType } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.beforeItems = data.data.ranking ? data.data.ranking.slice(0, 10) : [];
            state.beforeItems.sort((a, b) => Number(b.MirageScore) - Number(a.MirageScore));
          }
        });
    };

    const closePopup = () => {
      state.openPopupHistory = false;
    }

    watch(
      () => schedule.value,
      () => {
        fetchLastResult();
      },
    );

    watch(
      () => state.openPopup,
      () => {
        if (state.openPopup) {
          fetchResult();
        }
      },
    );

    onMounted(() => {
      fetchResult();
    });

    return {
      ...toRefs(state),
      isDesktop,
      bossRaid,
      bossRaidStatus,
      schedule,
      mirageLock,
      closePopup,
    };
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-latest-raid-result';
@import '~@/assets/sass/components/mirage-round-raid-info';
</style>
