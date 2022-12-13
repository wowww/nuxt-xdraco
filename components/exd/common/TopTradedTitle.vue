<template>
  <div class="list-bar">
    <v-tabs class="list-bar__traded" background-color="transparent" :value="collectibles ? collectiblesSelectedTab : exdSelectedTab" @change="change">
      <v-tab>{{ $t('t.exd.top.traded') }}</v-tab>
      <v-tab>{{ $t('t.exd.recent.traded') }}</v-tab>
    </v-tabs>
    <nuxt-link :to="collectibles ? '/collectibles/history' : '/exd/history'" class="list-bar__more">{{ $t('w.rounds.view.more') }}</nuxt-link>
  </div>
</template>

<script>
import { defineComponent, onActivated, onMounted } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState: useExdState, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useCollectiblesState, useMutations: useCollectiblesMutations } = createNamespacedHelpers('collectible');

export default defineComponent({
  name: 'TopTradedTitle',
  props: {
    collectibles: {
      type: Boolean,
      default: false,
    },
  },
  setup({ collectibles }) {
    const { selectedTab: exdSelectedTab } = useExdState(['selectedTab']);
    const { setSelectedTab: setExdSelectedTab } = useExdMutations(['setSelectedTab']);

    const { selectedTab: collectiblesSelectedTab } = useCollectiblesState(['selectedTab']);
    const { setSelectedTab: setCollectiblesSelectedTab } = useCollectiblesMutations(['setSelectedTab']);

    const change = (v) => {
      if (collectibles) {
        setCollectiblesSelectedTab(v);
      } else {
        setExdSelectedTab(v);
      }
    };

    onMounted(() => {
      change(0);
    });

    onActivated(() => {
      change(0);
    });

    return {
      change,
      exdSelectedTab,
      setExdSelectedTab,
      collectiblesSelectedTab,
      setCollectiblesSelectedTab,
    };
  },
});
</script>
