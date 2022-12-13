<template>
  <v-dialog
    v-model="openWinner"
    :content-class="`dialog-stake theme-dark ${step === 0 ? 'winner' : ''}`"
    max-width="640"
    persistent
    :fullscreen="!isDesktop"
  >
    <div class="content">
      <v-btn class="btn-close" fab plain x-small @click="close">
        <v-icon color="#fff" size="26">mdi-close</v-icon>
      </v-btn>
      <div v-if="currentRound" class="dialog-header">
        <div class="info-round">
          <dsp-round-number :value="currentRound.roundNum" />
          <round-body-title :item="currentRound.item" />
        </div>
      </div>
      <winner-item-card :round="currentRound" :season="currentSeason" @process-next="processNext" />
      <winner-character-selector v-if="step === 1" :round="currentRound" />
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import RoundBodyTitle from '@/components/dsp/round/body/RoundBodyTitle';
import DspRoundNumber from '@/components/dsp/round/DspRoundNumber';
import WinnerCharacterSelector from '@/components/dsp/round/modal/WinnerCharacterSelector';
import WinnerItemCard from '@/components/dsp/round/modal/WinnerItemCard';

const { useGetters: useDspGetters, useState: useDspState, useActions, useMutations: useDspMutations } = createNamespacedHelpers('dsp');
const { useActions: useAccountActions } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalDspWinner',
  components: { WinnerItemCard, WinnerCharacterSelector, DspRoundNumber, RoundBodyTitle },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const step = ref(0);
    const { currentRound, currentSeason } = useDspGetters(['currentRound', 'currentSeason']);
    const { openWinner } = useDspState(['openWinner']);
    const { setOpenWinner } = useDspMutations(['setOpenWinner']);

    const { fetchUserCharacter, fetchChannelUserCharacter } = useAccountActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);

    watch(
      () => openWinner.value,
      (current) => {
        if (current) {
          fetchUserCharacter();
        }
      },
    );

    const close = () => {
      setOpenWinner(false);
      step.value = 0;
    };

    const processNext = () => {
      step.value = 1;
    };

    return {
      isDesktop,
      step,
      currentSeason,
      currentRound,
      openWinner,
      close,
      processNext,
    };
  },
});
</script>
