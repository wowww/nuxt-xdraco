<template>
  <v-tabs class="tab-rounds no-gutter" :value="roundType - 1">
    <v-tab
      class="tab-rounds__item"
      v-for="roundState in roundStateList.filter((item) => (dracoAccessToken ? item.auth || !item.auth : !item.auth))"
      :key="roundState.type"
      @click="setRoundType(roundState.type)"
    >
      <span>{{ $t(roundState.message) }}</span>
      <span class="tab-rounds__count">{{ roundCount && roundCount[roundState.key] }}</span>
    </v-tab>
  </v-tabs>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, toRefs } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { RoundState } from '@/constants/dsp/dsp-round';

const { useGetters: useDspGetters, useMutations: useDspMutations } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'DspRoundStateTabs',
  setup() {
    getCurrentInstance();
    const state = reactive({
      roundStateList: [
        { type: RoundState.ONGOING, key: 'ongoing', message: 'w.rounds.tab.ongoing', auth: false },
        { type: RoundState.UPCOMING, key: 'upcoming', message: 'w.rounds.tab.upcoming', auth: false },
        { type: RoundState.CLOSED, key: 'closed', message: 'w.rounds.tab.closed', auth: false },
        { type: RoundState.MY, key: 'my', message: 'w.rounds.my', auth: true },
      ],
    });
    const { dracoAccessToken } = useState(['dracoAccessToken']);
    const { roundCount, roundType } = useDspGetters(['roundCount', 'roundType']);
    const { setRoundType } = useDspMutations(['setRoundType']);

    return {
      ...toRefs(state),
      dracoAccessToken,
      roundCount,
      setRoundType,
      roundType,
    };
  },
});
</script>
