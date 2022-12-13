<template>
  <div v-if="valleyCapture && valleyCapture.schedule" class="mirage-valley" :class="{ 'is-locked': mirageLock }">
    <div class="mirage-valley__header">
      <h2 class="mirage-valley__title">{{ $t('t.mirage.valley-capture') }}</h2>
      <div
        v-if="valleyCapture.schedule && valleyCapture.schedule.Daily === '1' && valleyCapture.schedule.Battle === '1' && !isDesktop"
        class="valley-notice"
      >
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-newseason.webp" class="valley-notice__icon" width="40" alt="" />
        <p class="valley-notice__desc" v-html="$t('t.mirage-notice.season.start')" />
        <span class="valley-notice__date">{{ valleyCapture.schedule.StartDT | dateFormat }}</span>
      </div>
      <ul class="mirage-valley__count-down">
        <li>
          <h4>Day</h4>
          <div class="mirage-valley__count-down__day">
            <span>{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(0, 1) }}</span>
            <span>{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(1) }}</span>
          </div>
        </li>
        <li>
          <h4>
            <span class="icon-battle">{{ $t(`w.mirage.${valleyCapture.schedule.Battle}.half`) }}</span>
          </h4>
          <div class="count">
            <MirageCountdown
              v-if="currentBattleEndDate"
              :target-date="currentBattleEndDate.toString()"
              class="hidden-day hidden-second"
              :smaller="isDesktop"
              :dark="mirageLock"
            />
            <span v-if="isLocked" class="icon-locked"></span>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="valleyCapture.schedule && valleyCapture.schedule.Daily === '1' && valleyCapture.schedule.Battle === '1' && isDesktop"
      class="valley-notice"
    >
      <div>
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-newseason.webp" class="valley-notice__icon" width="40" alt="" />
        <p class="valley-notice__desc" v-html="$t('t.mirage-notice.season.start')" />
      </div>
      <span class="valley-notice__date">{{ valleyCapture.schedule.StartDT | dateFormat }}</span>
    </div>
    <div v-if="valleyCapture && valleyCapture.serverInfo" class="mirage-valley__contents">
      <template v-for="serverIdx in serverList">
        <mirage-valley-server-item
          v-if="valleyCapture.serverInfo[serverIdx]"
          :key="`valley-server-${valleyCapture.serverInfo[serverIdx].ServerID}-${serverIdx}`"
          :server-item="valleyCapture.serverInfo[serverIdx]"
        />
        <div v-else :key="`valley-server-empty-${serverIdx}`" class="server-info empty"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, watch } from '@vue/composition-api';
import dayjs from 'dayjs';
import { range } from 'lodash';
import { useState } from 'vuex-composition-helpers/dist';
import MirageValleyServerItem from '@/components/mirage/MirageValleyServerItem';
import { useMirageStore } from '@/utils/composables/mirage';

import MirageCountdown from '@/components/mirage/MirageCountdown';

export default defineComponent({
  name: 'MirageHiddenValleyCapture',
  components: {
    MirageValleyServerItem,
    MirageCountdown,
  },
  props: {
    isLocked: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(_, { root }) {
    const { $i18n } = root;
    const { accessToken, isDesktop } = useState(['accessToken', 'isDesktop']);
    const { useMirageState, useMirageGetters, useMirageActions } = useMirageStore();
    const { valleyCapture } = useMirageState(['valleyCapture']);
    const { mirageStatus, mirageLock } = useMirageGetters(['mirageStatus', 'mirageLock']);
    const { fetchServerInfo, fetchAccountServerInfo } = useMirageActions(['fetchServerInfo', 'fetchAccountServerInfo']);

    const serverList = computed(() => {
      const columnLength = isDesktop.value ? 4 : 2;
      const rest = valleyCapture.value.serverInfo.length % columnLength !== 0 ?
      columnLength - valleyCapture.value.serverInfo.length % columnLength : 0;
      const total = valleyCapture.value.serverInfo.length + rest;

      if (!isDesktop) {
        return range(total);
      }

      let cnt = Math.floor(total / 2);
      const remainder = total % 2;

      if (remainder !== 0) {
        cnt += 1;
      }

      return range((cnt === 0 ? 1 : cnt) * 2);
    });

    const currentBattleEndDate = computed(() => {
      if (valleyCapture.value) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).toDate();
      }

      return null;
    });

    const endDateFormatted = computed(() => {
      if (valleyCapture.value) {
        const now = dayjs();
        const startDay = dayjs.unix(valleyCapture.value.schedule.StartDT);
        const endDay = dayjs.unix(valleyCapture.value.schedule.EndDT);

        if (endDay.diff(now, 'm') < 60) {
          return endDay
            .add(1, 'hour')
            .locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale)
            .format('lll');
        }

        if (now.diff(startDay, 'm') < 60) {
          return startDay
            .add(1, 'hour')
            .locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale)
            .format('lll');
        }
      }
      return '';
    });

    onMounted(() => {
      fetchServerInfo();
    });

    watch(
      () => accessToken.value,
      () => {
        fetchServerInfo();

        if (accessToken.value) {
          fetchAccountServerInfo();
        }
      },
    );

    return {
      isDesktop,
      valleyCapture,
      currentBattleEndDate,
      endDateFormatted,
      serverList,
      mirageStatus,
      mirageLock,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-hidden-valley-capture';
</style>
