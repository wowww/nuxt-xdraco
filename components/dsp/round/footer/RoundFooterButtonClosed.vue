<template>
  <button
    type="button"
    :disabled="myinfo.reward.rewarded > 0"
    class="btn btn-sm"
    :class="{ 'btn-secondary': win && myinfo.reward.rewarded === 0, 'btn-primary2': !win && myinfo.reward.rewarded === 0 }"
    @click="openModal"
  >
    <template v-if="win">
      <template v-if="myinfo.reward.rewarded === 0">
        <span>{{ $t('w.rounds.win.prize') }}</span>
        <span class="emp">{{ $t('w.rounds.claim', [availableEndDate]) }}</span>
      </template>
      <template v-else>{{ $t('w.rounds.obtained') }}</template>
    </template>
    <template v-else>
      <template v-if="myinfo.reward.rewarded === 0">
        <span>{{ $t('w.rounds.refund.rewards') }}</span>
        <span class="emp">{{ $t('w.rounds.claim', [availableEndDate]) }}</span>
      </template>
      <template v-else> {{ $t('w.rounds.refund.success') }}</template>
    </template>
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { RoundState } from '@/constants/dsp/dsp-round';
import { useDay, useWemixLogin } from '@/utils/composables/round';

const { useState: useDspState, useMutations: useDspMutations } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'RoundFooterButtonClosed',
  props: {
    dspId: {
      type: Number,
      default: -1,
    },
    win: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: Number,
      default: 0,
    },
    myinfo: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  setup({ dspId, win, startDate, endDate, myInfo }, { root }) {
    const { $i18n } = root;
    const { wemixLogin } = useWemixLogin(root);

    const { accessToken } = useState(['accessToken']);
    const { setCurrentRound, setOpenWinner, setOpenReward } = useDspMutations(['setOpenWinner', 'setOpenReward', 'setCurrentRound']);
    const availableEndDate = useDay(endDate).add(1, 'year').format(`${root.$t('w.rounds.date.format')}`);

    const openModal = () => {
      if (win) {
        if (!accessToken.value) {
          wemixLogin();
          return;
        }

        setCurrentRound(dspId);
        setOpenWinner(true);
      } else {
        setCurrentRound(dspId);
        setOpenReward(true);
      }
    };

    return {
      RoundState,
      availableEndDate,
      openModal,
    };
  },
});
</script>
