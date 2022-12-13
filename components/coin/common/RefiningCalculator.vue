<template>
  <v-dialog v-model="refiningPop" content-class="refining-dialog" :transition="!isDesktop ? 'dialog-bottom-transition' : ''">
    <template #activator="{ on, attrs }">
      <button type="button" v-bind="attrs" class="refining-dialog__btn-calc" v-on="on">
        <span>{{ $t('t.hydra-refiningpop.tit') }}</span>
      </button>
    </template>

    <validation-observer v-slot="{ invalid }" tag="div" class="refining-dialog__contents">
      <v-btn class="refining-dialog__btn-close" fab plain x-small @click="refiningPop = false">close</v-btn>
      <div class="refining-dialog__title">{{ $t('t.hydra-refiningpop.tit') }}</div>
      <validation-provider tag="div" rules="required|min_value:1|max_value:500" class="refining-dialog__text">
        <div class="refining-dialog__text__input">
          <span>{{ $t('t.hydra-refiningpop.subscript') }}: </span>
          <input v-model="stage" type="text" placeholder="1~500" @input="inputOnlyNum" />
        </div>
        <!--        <a href="#" class="btn-calc">CALC</a>-->
      </validation-provider>
      <div class="refining-dialog__info" :class="{ empty: invalid }" :data-empty-message="$t('t.hydra-refiningpop.empty')">
        <p v-show="!invalid" class="refining-dialog__info--number">{{ $t('w.hydra-refiningpop.number') }} {{ stage }}</p>
        <ul v-show="!invalid" class="refining-dialog__info__list">
          <li>
            <span>{{ $t('t.hydra-refiningpop.cumulative') }}</span>
            <div>
              <p class="volume-hydra">{{ ((stage - 1) * 100000 + 1) | currency(0) }}</p>
              <span class="syn">~</span>
              <p class="volume-hydra">{{ (stage * 100000) | currency(0) }}</p>
            </div>
          </li>
          <li>
            <span>{{ $t('t.hydra-refiningpop.total') }}</span>
            <div>
              <p class="volume-draco">{{ Math.round(refiningFee) }}</p>
              <span class="syn">+</span>
              <p class="volume-septarium">{{ stage }}</p>
            </div>
          </li>
        </ul>
      </div>
    </validation-observer>
  </v-dialog>
</template>

<script>
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";

export default defineComponent({
  name: 'RefiningCalculator',
  components: {
    //
  },
  props: {
    //
  },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const state = reactive({
      stage: null,
      baseDraco: 20,
      coefficient: 0.6,
      isOpen: false,
      refiningPop: false,
      isDevelopment: process.env.NODE_ENV === 'development',
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

    const inputOnlyNum = () => {
      const num = state.stage.replace(/[^0-9]/g, '');

      if (Number(num)) {
        state.stage = `${Number(num)}`;
      } else {
        state.stage = num;
      }
    };

    const refiningFee = computed(() => {
      if (state.baseDraco) {
        return state.baseDraco + sumFee(state.stage);
      }
      return 0;
    });

    watch(
      () => state.refiningPop,
      () => {
        if (!state.refiningPop) {
          state.stage = null;
        }
      },
    );

    return {
      ...toRefs(state),
      calcFee,
      sumFee,
      refiningFee,
      inputOnlyNum,
      isDesktop,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/pages/coin/_refining-calculator.scss';
</style>
