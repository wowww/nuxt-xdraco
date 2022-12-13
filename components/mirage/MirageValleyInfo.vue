<template>
  <div class="mirage-valley-info" :class="{ 'is-locked': closed }">
    <h2 class="mirage-valley-info__title">{{ serverInfo.ServerName }}</h2>
    <div class="mirage-valley-info__header">
      <ul v-if="valleyCapture" class="mirage-valley-info__countdown">
        <li class="mirage-valley-info__countdown__text">Day</li>
        <li>
          <div class="wrap-flip">
            <span class="wrap-flip__item">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(0, 1) }}</span>
            <span class="wrap-flip__item">{{ valleyCapture.schedule.Daily.padStart(2, '0').slice(1) }}</span>
          </div>
        </li>
        <li class="mirage-valley-info__countdown__text half">
          <span class="icon-battle">
            {{ $t(`w.mirage.${valleyCapture.schedule.Battle}.half`) }}
          </span>
        </li>
        <li>
          <mirage-countdown v-if="endDate" :target-date="endDate.toString()" :dark="closed" class="hidden-day"/>
        </li>
      </ul>
        <div v-if="valleyCapture" class="mirage-valley-info__desc">
          <p v-if="closed" class="ico-locked">
            {{ $t('s.mirage.date.locked', [lockEndDateFormatted]) }}
          </p>
          <p v-else>{{ $t('s.mirage.date.in-calc', [endDateFormatted]) }}</p>
          <v-tooltip content-class="wrap-tooltip" attach=".dashboard-info" top max-width="240">
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">icon</v-icon>
            </template>
            <div class="wrap-tooltip__msg">
              <p>{{ $t('s.mirage.message.lock') }}</p>
            </div>
          </v-tooltip>
        </div>
    </div>
    <div v-if="stakeInfo" class="mirage-valley-info__contents">
      <ul v-if="stakeInfo.Valley && stakeInfo.Valley.Sum" class="mirage-valley-info__contents__list">
        <li>
          <span>{{ $t('w.mirage.total.minting.rate') }}</span>
          <em>{{ miningRate[0] }}<small>{{ miningRate[1] }}</small><span class="decimal">%</span></em>
        </li>
        <li>
          <span>{{ $t('w.mirage.total.ds.mined') }}</span>
          <em>
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-24-darksteel.webp" width="24"/>
            {{ stakeInfo.Valley.Sum.Info.BlackIron | currency(0) }}
          </em>
        </li>
        <li>
          <span>{{ $t('w.mirage.total.septaria') }}</span>
            <em><img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-24-septaria.webp" width="24"/>
              {{ stakeInfo.Valley.Sum.Info.Septaria }}
            </em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import { currency } from '@/plugins/filters';

import MirageCountdown from '@/components/mirage/MirageCountdown';
import { useFormattedNumber } from "~/utils/composables/common";

const { useState: useMirageState } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageValleyInfo',
  components: { MirageCountdown },
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
    serverInfo: {
      type: Object,
      default: () => ({
        ServerName: '',
      }),
    },
  },
  setup(_, {root}) {
    const {$i18n} = root;
    const { valleyCapture, valleyList, stakeInfo } = useMirageState(['valleyCapture', 'valleyList', 'stakeInfo']);

    const endDate = computed(() => {
      if (valleyCapture.value) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).toDate();
      }

      return null;
    });

    const endDateFormatted = computed(() => {
      if (valleyCapture.value) {
        const endDay = dayjs.unix(valleyCapture.value.schedule.EndDT);
        return endDay.locale($i18n.locale.startsWith('zh') ? 'zh' : $i18n.locale).format('lll');
      }
      return '';
    });

    const lockEndDateFormatted = computed(() => {
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

    const miningRate = computed(() => {
      if (stakeInfo.value) {
        const mining = currency(new BigNumber(stakeInfo.value.Valley.Sum.Info.BlackIron).div(new BigNumber(75000000).times(3)).toNumber() * 100, 2);
        return useFormattedNumber(mining).value;
      }
      return 0;
    });

    return {
      valleyCapture,
      valleyList,
      stakeInfo,
      endDate,
      endDateFormatted,
      lockEndDateFormatted,
      miningRate,
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
@import '~@/assets/sass/components/_mirage-valley-info';
</style>
