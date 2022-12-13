<template>
  <div ref="target" class="round" :aria-current="win ? 'won' : ''">
    <dsp-round-inner :tag="!isDesktop ? false : 'div'" :class="{ round__inner: isDesktop }">
      <dsp-item-card :item="source.item" :smaller="!isDesktop ? 'sm' : ''" />
      <dsp-round-number :value="source.roundNum" />
      <div class="round__detail">
        <round-body-title v-if="ongoing && isDesktop" :item="source.item" />
        <div class="round__info">
          <h3 v-if="upcoming || staking" class="round__info__msg">{{ $t('w.rounds.start.on', [source.roundNum]) }}</h3>
          <p v-if="upcoming" class="round__info__date--upcoming">
            {{ source.startDate | dateFormat }}
          </p>
          <div v-else-if="staking" class="wrap-tick">
            <!--            <round-body-flip-count-down :target-date="source.startDate" :dsp-id="source.dspID" />-->
            <!-- <round-body-count-down :targetDate="source.startDate" /> -->
          </div>
          <template v-if="closed">
            <h3 class="round__info__msg">{{ $t('w.rounds.finish', [source.roundNum]) }}</h3>
            <p class="round__info__date--closed">{{ source.startDate | dateFormat }}</p>
            <div class="wrap-balance horizontal">
              <dl class="wrap-balance__define">
                <dt>{{ $t('w.rounds.total.stake') }}</dt>
                <dd class="draco">
                  <span>{{ source.totalStake | currency(0) }}</span>
                </dd>
              </dl>
              <dl class="wrap-balance__define">
                <dt>{{ $t('w.rounds.participants') }}</dt>
                <dd>
                  <span>{{ source.joinedParticipants | currency(0) }}</span>
                </dd>
              </dl>
            </div>
          </template>
          <p v-if="upcoming || staking">{{ $t('w.rounds.open.after', [remainDays]) }}</p>
          <p v-if="closed && win" class="message-result">{{ $t('w.rounds.win') }}</p>
          <h3 v-if="closed && join && source.winner" class="title-define-balance">{{ $t('w.rounds.winner') }}</h3>
          <round-body-winner v-if="closed && join && source.winner" :winner="source.winner" />

          <h3 v-if="closed && join && !win" class="title-define-balance">{{ $t('w.rounds.my') }}</h3>
          <round-body-my-round v-if="closed && join && !win" :my-info="source.myinfo" />

          <div v-if="ongoing" class="block-border" style="width: 100%">
            <div class="wrap-define-balance">
              <dl class="wrap-balance__define">
                <dt>{{ $t('w.rounds.until.end') }}</dt>
                <dd>
                  <round-body-flip-count-down :target-date="source.endDate" smaller :dsp-id="source.dspID" />
                  <!-- <round-body-count-down :targetDate="source.endDate" smaller /> -->
                </dd>
              </dl>
              <dl class="wrap-balance__define">
                <dt>{{ $t('w.rounds.participants') }}</dt>
                <dd>
                  <!-- <round-body-flip-count-up :target-value="source.joinedParticipants" smaller /> -->
                  <round-body-number-image :target-value="source.joinedParticipants" smaller />
                </dd>
              </dl>
            </div>
          </div>

          <round-body-status
            v-if="staking || ongoing"
            :ongoing="ongoing"
            :total="source.totalStake"
            :my="source.myinfo && source.myinfo.currentStake ? source.myinfo.currentStake : 0"
            :odds="source.myinfo && source.myinfo.currentOdds ? source.myinfo.currentOdds : 0"
          />
        </div>
      </div>
      <div v-if="closed && !win && !join">
        <h3 v-if="closed && !win" class="title-define-balance">{{ $t('w.rounds.winner') }}</h3>
        <round-body-winner v-if="closed && source.winner && !win" :winner="source.winner" />
      </div>
      <dsp-round-footer v-if="!closed || (closed && join)" :round="source" :join="join" />
    </dsp-round-inner>
  </div>
</template>

<script>
import { computed, defineComponent, onUnmounted, ref, watch } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';
import { useIntersectionObserver } from '@vueuse/core';
import dayjs from 'dayjs';

import RoundBodyMyRound from '@/components/dsp/round/body/RoundBodyMyRound';
import RoundBodyNumberImage from '@/components/dsp/round/body/RoundBodyNumberImage';
import RoundBodyStatus from '@/components/dsp/round/body/RoundBodyStatus';
import RoundBodyTitle from '@/components/dsp/round/body/RoundBodyTitle';
import RoundBodyWinner from '@/components/dsp/round/body/RoundBodyWinner';
import DspItemCard from '@/components/dsp/round/DspItemCard';
import DspRoundFooter from '@/components/dsp/round/DspRoundFooter';
import DspRoundInner from '@/components/dsp/round/DspRoundInner';
import DspRoundNumber from '@/components/dsp/round/DspRoundNumber';
import { RoundState } from '@/constants/dsp/dsp-round';
import { useRoundParticipate, useRoundState } from '@/utils/composables/round';

export default defineComponent({
  name: 'DspRound',
  components: {
    DspRoundInner,
    RoundBodyNumberImage,
    RoundBodyStatus,
    RoundBodyTitle,
    RoundBodyMyRound,
    RoundBodyWinner,
    DspRoundFooter,
    DspRoundNumber,
    DspItemCard,
  },
  props: {
    index: {
      type: Number,
      default: 0,
    },
    source: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ source, active }) {
    const { ongoing, staking, upcoming, closed } = useRoundState(source);
    const { isDesktop } = useState(['isDesktop']);
    const { win, join } = useRoundParticipate(source);

    const timestamp = ref(dayjs().utcOffset(8).unix());

    const remainDays = computed(() => Math.floor((source.endDate - source.startDate) / 60 / 60 / 24));

    const target = ref(null);
    const targetIsVisible = ref(false);

    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
      targetIsVisible.value = isIntersecting;
    });

    watch(
      () => targetIsVisible.value,
      (visible) => {
        if (visible) {
          // resume();
        } else {
          // pause();
        }
      },
    );

    onUnmounted(() => {
      stop();
    });

    return {
      timestamp,
      target,
      targetIsVisible,
      RoundState,
      isDesktop,
      ongoing,
      upcoming,
      staking,
      closed,
      win,
      join,
      remainDays,
    };
  },
});
</script>
