<template>
  <div>
    <div class="section-dashboard">
      <h2 class="section__title">{{ $t('t.mirage.dashboard') }}</h2>
      <ul v-if="accessToken" class="section-dashboard__roster">
        <li class="section-dashboard__roster__item">
          <span class="section-dashboard__roster__title">Enlisted</span>
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/logo-20-mirage.webp" width="20" height="20" alt="mirage" />
          <span class="section-dashboard__roster__value"
          >{{ enlisted }}<span class="section-dashboard__roster__value--max max-volume"> / {{ rosters.length }}</span></span
          >
        </li>
        <li class="section-dashboard__roster__item">
          <span class="section-dashboard__roster__title">Wounded</span>
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-damage.webp" width="20" height="20" alt="wound" />
          <span class="section-dashboard__roster__value">{{ wounded }}</span>
        </li>
        <li class="section-dashboard__roster__item">
          <nuxt-link class="section-dashboard__roster__link" to="/mirage/my">Roster</nuxt-link>
        </li>
      </ul>
    </div>

    <mirage-summary v-if="accessToken" />
    <mirage-hidden-valley-capture />
    <mirage-boss-raid-season-closed v-if="isBossRaidClosed" />

    <h2 class="section__title" style="margin-top: 24px">MIRAGE Log</h2>
    <div v-if="mirageLock" class="mirage-hidden-valley-play">
      <div class="result--disabled">
        <div class="result__contents">
          <p>{{ $t('s.mirage.lock-up.log') }}</p>
        </div>
      </div>
    </div>
    <div v-else class="mirage-battle-report">
      <ul v-if="allLogList && allLogList.length > 0" class="mirage-battle-report__list">
        <mirage-log-item v-for="(log, idx) in logList" :key="`mirage-log-item-${idx}-${log.LogDT}`" :log="log" />
      </ul>
      <div v-if="hasMoreLog" class="wrap-button">
        <div class="btn-viewmore" style="cursor: pointer" @click="logViewLimit += 20">View More</div>
      </div>
    </div>

    <div v-if="false" class="wrap-my-mirage">
      <div class="list-bar">
        <h2 class="section-title">{{ $t('t.mirage.recommend.ntfs') }}</h2>
        <nuxt-link to="/nft/list" class="list-bar__more">{{ $t('w.rounds.view.more') }}</nuxt-link>
      </div>
      <ul
        class="list-card-nft recommend"
        :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')"
      >
        <nft-item v-for="item in recommendedItems.list" :key="`nft-recommended-item-${item.seq || item.info.seq}`" :item="item" use-link />
      </ul>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, onMounted, reactive, toRefs, watch} from '@vue/composition-api';
import {useNow} from '@vueuse/core';
import dayjs from 'dayjs';
import {createNamespacedHelpers, useState} from 'vuex-composition-helpers/dist';
import MirageBossRaidSeasonClosed from '@/components/mirage/boss-raid/MirageBossRaidSeasonClosed';
import MirageHiddenValleyCapture from '@/components/mirage/MirageHiddenValleyCapture';
import MirageLogItem from '@/components/mirage/MirageLogItem';
import MirageSummary from '@/components/mirage/MirageSummary';
import NftItem from '@/components/nft/NftItem';
import {useMirageStore} from '@/utils/composables/mirage';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'MirageDashboardPage',
  components: {
    MirageLogItem,
    NftItem,
    MirageBossRaidSeasonClosed,
    MirageSummary,
    MirageHiddenValleyCapture
  },
  layout: 'mirage',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  setup() {
    const now = useNow({ interval: 1000 });
    const state = reactive({
      test: '',
      logViewLimit: 20,
    });

    const { accessToken } = useState(['accessToken']);
    const { useMirageState, useMirageGetters, useMirageActions } = useMirageStore();
    const { mirageStatus, mirageLock, bossRaidSeasonEndDate, bossRaidSeasonStartDate } = useMirageGetters(['mirageStatus', 'mirageLock', 'bossRaidSeasonEndDate', 'bossRaidSeasonStartDate']);
    const { valleyCapture, allLogList, bossRaids, rosters } = useMirageState([
      'valleyCapture',
      'allLogList',
      'bossRaids',
      'rosters',
    ]);
    const { fetchAccountInfo, fetchAllLog, fetchBossRaidList, fetchMyCharacters } =
      useMirageActions([
        'fetchAccountInfo',
        'fetchAllLog',
        'fetchBossRaidList',
        'fetchMyCharacters',
      ]);
    const { recommendedItems } = useNftState(['recommendedItems']);
    const { fetchNftRecommendedItems } = useNftActions(['fetchNftRecommendedItems']);

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    onBeforeMount(() => {
      document.documentElement.classList.add('boss-raid-season-end');
    });

    onMounted(() => {
      fetchNftRecommendedItems();
      fetchAllLog();
      fetchBossRaidList();
      fetchMyCharacters();
    });

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const isBossRaidClosed = computed(() => {
      const now = dayjs();
      const seasonEnd = dayjs('2022-09-03 00:00');
      const seasonStart = dayjs('2022-09-09 00:00');
      return now.isSameOrAfter(seasonEnd) && now.isSameOrBefore(seasonStart);
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      return nowDay.value.diff(endDay.value, 'minute');
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    watch(
      () => accessToken.value,
      () => {
        if (accessToken.value) {
          fetchAccountInfo();
        }
      },
    );

    const logList = computed(() => {
      return allLogList.value.filter((item, idx) => idx < state.logViewLimit);
    });

    const hasMoreLog = computed(() => {
      return state.logViewLimit < allLogList.value.length;
    });

    const futureEunSilRaids = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs().unix();
        return bossRaids.value.filter((raid) => timestamp < raid.StartDT && raid.RaidType === 11);
      }

      return [];
    });

    const futureHorangRaids = computed(() => {
      if (bossRaids.value) {
        const timestamp = dayjs().unix();
        return bossRaids.value.filter((raid) => timestamp < raid.StartDT && raid.RaidType === 12);
      }

      return [];
    });

    const enlisted = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => roster.DetailType !== '0').length;
      }

      return 0;
    });

    const wounded = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => Number(roster.State) > 1).length;
      }

      return 0;
    });

    return {
      ...toRefs(state),
      recommendedItems,
      closed,
      accessToken,
      allLogList,
      logList,
      hasMoreLog,
      bossRaids,
      isBossRaidClosed,
      futureEunSilRaids,
      futureHorangRaids,
      rosters,
      enlisted,
      wounded,
      mirageStatus,
      mirageLock,
    };
  },
  destroyed() {
    document.documentElement.classList.remove('boss-raid-season-end');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/components/mirage-battle-report';
@import '~@/assets/sass/components/mirage-hidden-valley-play';

.section {
  margin: 0 !important;
  width: 100% !important;
}
</style>
