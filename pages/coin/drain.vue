<template>
  <div :class="`drain-${drainPart}`">
    <drain-part1 v-if="drainPart === 'part1'" />
    <drain-part2 v-if="drainPart === 'part2'" />

    <div v-if="drainPart === 'part1'" class="change-contents">
      <div class="change-contents__inner">
        <img src="https://file.mir4global.com/xdraco/img/desktop/drain-part2/symbol-hydra.webp" class="change-contents__symbol" alt="HYDRA" />
        <h3 class="change-contents__title">DRAIN : Be Hydrated</h3>
        <p>DRACO Initiative, Be Hydrated by WEST</p>
      </div>
      <button type="button" class="change-contents__link" @click="changeContents('part2', '#header')">Change Contents</button>
    </div>
    <div v-if="drainPart === 'part2'" class="change-contents">
      <div class="change-contents__inner">
        <img src="https://file.mir4global.com/xdraco/img/desktop/drain-part2/symbol-draco.webp" class="change-contents__symbol" alt="DRACO" />
        <h3 class="change-contents__title">DRAIN : Buyback &amp; Burn</h3>
        <p>Our contribution for your satisfaction.</p>
      </div>
      <button type="button" class="change-contents__link" @click="changeContents('part1', '#header')">Change Contents</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';
import { useActions, useState } from "vuex-composition-helpers/dist";

import DrainPart1 from '~/components/coin/common/drain/DrainPart1';
import DrainPart2 from '~/components/coin/common/drain/DrainPart2';

export default defineComponent({
  name: 'DrainPage',
  meta: {
    hasSubNav: 'coin',
    className: 'drain',
  },
  components: {
    DrainPart1,
    DrainPart2,
  },
  setup() {
    const { drainPart } = useState(['drainPart']);
    const { fetchDrainPart } = useActions(['fetchDrainPart']);

    const changeContents = (targetContents, targetSelector) => {
      fetchDrainPart({targetContents, targetSelector});
    };

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-drain');
      });
    });

    return {
      drainPart,
      changeContents,
    };
  },
  destroyed() {
    document.documentElement.classList.remove('init-drain');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_drain.scss';
</style>
