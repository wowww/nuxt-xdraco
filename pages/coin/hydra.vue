<template>
  <div class="hydra">
    <hydra-main />
    <hydra-youtube-video />
    <hydra-prologue />
    <hydra-chronicles />
    <hydra-dynamics />
    <hydra-spectrums />
    <hydra-defi />
    <hydra-roadmap />
    <hydra-summoning />
    <hydra-refinery />

    <div v-if="isDesktop" class="float-bottom">
      <v-carousel height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <wemix-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <usd-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <wemix-hydra />
        </v-carousel-item>
        <v-carousel-item>
          <usd-hydra />
        </v-carousel-item>
      </v-carousel>

      <hydra-refining-cost class="part" />
    </div>

    <v-carousel v-if="hydraRate && !isDesktop" class="float-bottom" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
      <home-usd-hydra />
      <home-wemix-hydra />
      <home-refining-cost />
    </v-carousel>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted } from '@vue/composition-api';
import { useActions, useState } from 'vuex-composition-helpers/dist';

import HomeRefiningCost from '@/components/coin/mobile/hydra/HomeRefiningCost';
import HomeUsdHydra from '@/components/coin/mobile/hydra/HomeUsdHydra';
import HomeWemixHydra from '@/components/coin/mobile/hydra/HomeWemixHydra';
import HydraRefiningCost from '@/components/coin/common/HydraRefiningCost';
import HydraChronicles from '~/components/coin/common/hydra/HydraChronicles';
import HydraDefi from '~/components/coin/common/hydra/HydraDefi';
import HydraDynamics from '~/components/coin/common/hydra/HydraDynamics';
import HydraMain from '~/components/coin/common/hydra/HydraMain';
import HydraPrologue from '~/components/coin/common/hydra/HydraPrologue';
import HydraRefinery from '~/components/coin/common/hydra/HydraRefinery';
import HydraRoadmap from '~/components/coin/common/hydra/HydraRoadmap';
import HydraSpectrums from '~/components/coin/common/hydra/HydraSpectrums';
import HydraSummoning from '~/components/coin/common/hydra/HydraSummoning';
import HydraYoutubeVideo from '~/components/coin/common/hydra/HydraYoutubeVideo';
import UsdHydra from '@/components/coin/desktop/hydra/UsdHydra';
import WemixHydra from '@/components/coin/desktop/hydra/WemixHydra';

export default defineComponent({
  name: 'HydraPage',
  meta: {
    hasSubNav: 'coin',
    className: 'hydra',
  },
  components: {
    HomeRefiningCost,
    HomeWemixHydra,
    HomeUsdHydra,
    HydraMain,
    HydraYoutubeVideo,
    HydraPrologue,
    HydraChronicles,
    HydraDynamics,
    HydraSpectrums,
    HydraDefi,
    HydraRoadmap,
    HydraSummoning,
    HydraRefinery,
    HydraRefiningCost,
    UsdHydra,
    WemixHydra,
  },
  setup() {
    const { hydraRate, isDesktop } = useState(['hydraRate', 'isDesktop']);
    const { fetchHydra, fetchHydraLastest, fetchIsDesktop } = useActions(['fetchHydra', 'fetchHydraLastest', 'fetchIsDesktop']);

    window.onresize = () => {
      fetchIsDesktop();
    }

    onMounted(() => {
      fetchHydra();
      fetchHydraLastest();
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-intro-hydra');
      }, 1500);
    });

    onMounted(() => {
      fetchIsDesktop();
    });

    return {
      isDesktop,
      hydraRate,
    };
  },
  destroyed() {
    document.documentElement.classList.remove('init-intro-hydra');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_hydra.scss';
</style>
