<template>
  <button
    type="button"
    class="btn"
    :class="{
      'btn-primary': not || (more && possibleMore),
      'btn-primary2': !not && !possibleMore,
    }"
    :disabled="!not && !possibleMore"
    @click="openRoundModal(round.dspID)"
  >
    <template v-if="more">
      <template v-if="possibleMore">STAKE MORE</template>
      <span v-else class="btn-message">You can stake more at {{ availableSkateDate }}</span>
    </template>
    <template v-else-if="staking"> PRE-STAKE </template>
    <template v-else>STAKE EARLIER</template>
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { getStakeMoreTime, useDay, useRoundModal, useRoundParticipate, useRoundState, useTime } from '@/utils/composables/round';

export default defineComponent({
  name: 'RoundFooterButtonOngoing',
  props: {
    round: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  setup({ round }, { root }) {
    const { $i18n } = root;
    const timestamp = useTime();

    const { staking } = useRoundState(round);

    let availableSkateDate = useDay(round.startDate).format(`${root.$t('w.rounds.date.format')}`);

    if (round.myinfo && round.myinfo.prevStakeDT) {
      availableSkateDate = useDay(round.myinfo.prevStakeDT).add(getStakeMoreTime(), 's').format(`${root.$t('w.rounds.date.format')}`);
    }

    const { openRoundModal } = useRoundModal(root);

    return {
      timestamp,
      openRoundModal,
      availableSkateDate,
      ...useRoundParticipate(round),
      staking,
    };
  },
});
</script>
