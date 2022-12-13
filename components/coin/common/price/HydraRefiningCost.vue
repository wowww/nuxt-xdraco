<template>
  <dl class="display-price">
    <dt>
      <span>{{ $t('t.price.refining.hydra') }}</span>
      <span class="sub-title">Refining Stage {{ hydraStage }}</span>
    </dt>
    <dd>
      <div class="wrap-refining-hydra">
        <span class="amount draco">{{ Math.round(refiningFee) }}</span>
        <span class="symbol-plus">+</span>
        <span class="amount septaria">{{ hydraStage }} <sup class="sup">Septaria</sup></span>
      </div>
    </dd>
  </dl>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'HydraRefiningCost',
  props: {
    isShowSymbol: {
      type: Boolean,
      default: false,
    },
    valueShowSymbol: {
      type: Number,
      required: false,
      default: () => 1,
    },
  },
  setup() {
    const { hydraSupply } = useState(['hydraSupply']);

    const state = reactive({
      baseDraco: 20,
      coefficient: 0.6,
    });

    const calcFee = (n) => {
      return state.coefficient / (Math.log(n + 1) / Math.log(3.7));
    };

    const sumFee = (n) => {
      if (Number(n) && Number(n) <= 500) {
        return Array.from(Array(Number(n)).keys()).reduce((a, b) => {
          return a + calcFee(b + 1);
        }, 0);
      }
      return 0;
    };

    const hydraStage = computed(() => {
      if (hydraSupply.value && Number(hydraSupply.value.HydraSupply) > 0) {
        return Math.floor(Number(hydraSupply.value.HydraSupply) / 100000) + 1;
      }

      return 1;
    });

    const refiningFee = computed(() => {
      if (state.baseDraco) {
        return state.baseDraco + sumFee(hydraStage.value);
      }
      return 0;
    });

    return {
      ...toRefs(state),
      calcFee,
      sumFee,
      refiningFee,
      hydraSupply,
      hydraStage,
    };
  },
});
</script>
