<template>
  <section class="section section-summoning">
    <div class="section__inner">
      <h3 class="section-summoning__title">{{ $t('t.hydra-teaser.summoning') }}</h3>
      <div class="section-summoning__contents">
        <div class="section-summoning__refining">
          <div class="section-summoning__refining__item">
            <p>{{ $t('s.hydra-refining.base') }}</p>
            <div>
              <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/refining-draco.webp"/>
              <p class="section-summoning__refining__item--amount">x<strong>20</strong></p>
            </div>
            <span class="section-summoning__refining__item--subscript">{{ $t('s.hydra-refining.base.materials') }}</span>
          </div>
          <span class="plus">+</span>
          <div class="section-summoning__refining__item">
            <p>
              <span v-html="$t('t.hydra-summoning.metaporphic')"></span><span>{{ hydraStage }}</span>
            </p>
            <div class="section-summoning__refining__item__fee">
              <span>{{ $t('s.hydra-refining.fee') }}</span>
              <div>
                <span class="draco"><span class="hidden">Draco</span>{{ Math.round(refiningFee) - baseDraco }}</span>
                <span class="plus">+</span>
                <span class="septaria"><span class="hidden">Septaria</span>{{ hydraStage }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="section-summoning__metamorphic">
          <h4>{{ $t('t.hydra-refining.metamorphic') }}</h4>
          <p>
            {{ $t('s.hydra-refining.metamorphic.dsc1') }}
          </p>
          <p>
            {{ $t('s.hydra-refining.metamorphic.dsc2') }}
          </p>
        </div>
        <div class="section-summoning__btns">
          <refining-calculator/>
        </div>
        <ul class="section-summoning__define">
          <li>
            <span>{{ $t('t.hydra-refining.define') }}</span>
            <p>{{ $t('s.hydra-refining.define.dec1') }}</p>
            <div class="section-summoning__define__formula">
              <p>{{ $t('s.hydra-refining.define.dec2') }}</p>
              <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/refining-reqdraco.webp"/>
            </div>
          </li>
          <li>
            <div>
              <span>{{ $t('t.hydra-refining.septarium') }}</span>
              <p>{{ $t('s.hydra-refining.septarium.dec1') }}</p>
            </div>
            <div class="section-summoning__define__formula">
              <p>{{ $t('s.hydra-refining.septarium.dec2') }}</p>
              <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/refining-rep.webp"/>
            </div>
          </li>
        </ul>
        <div class="section-summoning__caution">
          <dl>
            <dt>{{ $t('t.hydra-teaser.summoning.caution') }}</dt>
            <dd>{{ $t('s.hydra-teaser.summoning.caution') }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {defineComponent, computed, reactive, toRefs} from '@vue/composition-api';
import {useState} from 'vuex-composition-helpers/dist';

import RefiningCalculator from '~/components/coin/common/RefiningCalculator';

export default defineComponent({
  name: 'HydraSummoning',
  components: {
    RefiningCalculator,
  },
  setup() {
    const {hydraSupply} = useState(['hydraSupply']);

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


