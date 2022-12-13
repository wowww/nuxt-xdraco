<template>
  <div class="wrap-dropdown">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <button type="button" class="wrap-dropdown__btn" dark v-bind="attrs" v-on="on">
          <span class="wrap-dropdown__btn__name">
            {{ currentSeason && currentSeason['seasonName'] }}
            <span
              class="wrap-dropdown__btn__status"
              v-if="currentSeason && (currentSeason.state === 0 || seasonFinished)"
            >
              {{ $t('w.rounds.tab.closed') }}
            </span>
          </span>
        </button>
      </template>
      <v-list class="dropdown">
        <v-list-item-group class="dropdown__list" color="primary">
          <v-list-item v-for="season in seasons" :key="season.seasonID" :value="season.seasonID" @click="setCurrentSeason(season.seasonID)">
            <span class="text">{{ season['seasonName'] }}</span>
            <span class="status" :aria-label="season['state'] === 1 ? 'open' : ''">{{
              season['state'] === 1 ? 'OPEN' : $t('w.rounds.tab.closed')
            }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { RoundState } from '@/constants/dsp/dsp-round';

const { useGetters, useActions, useMutations } = createNamespacedHelpers('dsp');

export default defineComponent({
  name: 'SeasonSelector',
  setup() {
    const { seasons, currentSeason, rounds } = useGetters(['seasons', 'currentSeason', 'rounds']);
    const { setCurrentSeason } = useMutations(['setCurrentSeason']);
    const { fetchSeasons, fetchRounds } = useActions(['fetchSeasons', 'fetchRounds']);

    onMounted(() => {
      fetchSeasons();
    });

    watch(
      () => currentSeason.value,
      (current, before) => {
        if (current && (!before || before.seasonID !== current.seasonID)) {
          fetchRounds();
        }
      },
    );

    const seasonFinished = computed(() => {
      return rounds.value.length === rounds.value.filter((round) => round.state === RoundState.CLOSED).length;
    });

    return {
      seasons,
      currentSeason,
      fetchSeasons,
      fetchRounds,
      setCurrentSeason,
      seasonFinished,
    };
  },
});
</script>
