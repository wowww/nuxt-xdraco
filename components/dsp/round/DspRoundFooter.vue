<template>
  <div class="wrap-button">
    <round-footer-button-upcoming v-if="upcoming" :dsp-id="round.dspID" :pre-start-date="round.preStartDate" :my-info="round.myinfo" />
    <round-footer-button-ongoing v-else-if="ongoing || staking" :round="round" />
    <round-footer-button-closed v-else-if="closed && join" :dsp-id="round.dspID" :myinfo="round.myinfo" :win="win" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import RoundFooterButtonClosed from '@/components/dsp/round/footer/RoundFooterButtonClosed';
import RoundFooterButtonOngoing from '@/components/dsp/round/footer/RoundFooterButtonOngoing';
import RoundFooterButtonUpcoming from '@/components/dsp/round/footer/RoundFooterButtonUpcoming';
import { getStakeMoreTime, useDay, useRoundParticipate, useRoundState, useTime } from '@/utils/composables/round';

export default defineComponent({
  name: 'DspRoundFooter',
  components: { RoundFooterButtonClosed, RoundFooterButtonOngoing, RoundFooterButtonUpcoming },
  props: {
    round: {
      type: Object,
      required: true,
      default: () => {},
    },
    join: Boolean,
  },
  setup({ round }, { root }) {
    const { $i18n } = root;
    const timestamp = useTime();
    const { win } = useRoundParticipate(round);
    const { stakeMoreTime } = getStakeMoreTime();

    let availableSkateDate = useDay(round.preStartDate).format(`${root.$t('w.rounds.date.format')}`);

    if (round.myinfo && round.myinfo.prevStakeDT) {
      availableSkateDate = useDay(round.myinfo.prevStakeDT).add(Number(stakeMoreTime), 'ms').format(`${root.$t('w.rounds.date.format')}`);
    }

    return {
      ...useRoundState(round),
      win,
      timestamp,
      availableSkateDate,
    };
  },
});
</script>
