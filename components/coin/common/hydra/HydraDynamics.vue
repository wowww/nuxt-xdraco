<template>
  <client-only>
    <section class="section dynamics">
      <div class="section__inner">
        <h3 class="dynamics__title" v-html="$t('t.hydra.dynamics.title')"></h3>
        <div class="dynamics__supply">
          <p>
            <span class="dynamics__supply__title" v-html="$t('t.hydra.dynamics.supply')"></span>
            <em class="dynamics__supply__amount">60,000,000</em>
          </p>
        </div>
        <h4 class="dynamics__table__title" v-html="$t('t.hydra.dynamics.allocation')"></h4>
        <table class="dynamics__table">
          <colgroup>
            <col />
            <col v-if="isDesktop" style="width: 40%"/>
            <col v-if="isDesktop" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" v-html="$t('w.hydra.dynamics.division')"></th>
              <th v-if="isDesktop" scope="col" v-html="$t('w.hydra.dynamics.description')"></th>
              <th v-if="isDesktop" scope="col" v-html="$t('w.hydra.dynamics.distribution')"></th>
              <th scope="col" v-html="$t('w.hydra.dynamics.supply')"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isDesktop">
              <td v-html="$t('s.hydra.dynamics.desc1')"></td>
              <td v-html="$t('s.hydra.dynamics.desc2')"></td>
              <td>83.33%</td>
              <td>50,000,000</td>
            </tr>
            <tr v-else>
              <td>
                <p class="dynamics__table--desc" v-html="$t('s.hydra.dynamics.desc1')"></p>
                <p class="dynamics__table--sub-desc" v-html="$t('s.hydra.dynamics.desc2')"></p>
              </td>
              <td>
                <div class="dynamics__table__value">
                  <em class="value">50,000,000</em>
                  <em class="percent">83.33%</em>
                </div>
              </td>
            </tr>
            <tr v-if="isDesktop">
              <td v-html="$t('s.hydra.dynamics.desc3')"></td>
              <td>
                <p v-html="$t('s.hydra.dynamics.desc4')"></p>
                <span class="dynamics__table--warn" v-html="$t('s.hydra.dynamics.warn')"></span>
              </td>
              <td>16.67%</td>
              <td>10,000,000</td>
            </tr>
            <tr v-else>
              <td>
                <p class="dynamics__table--desc" v-html="$t('s.hydra.dynamics.desc3')"></p>
                <p class="dynamics__table--sub-desc" v-html="$t('s.hydra.dynamics.desc4')"></p>
                <span class="dynamics__table--warn" v-html="$t('s.hydra.dynamics.warn')"></span>
              </td>
              <td>
                <div class="dynamics__table__value">
                  <em class="value">10,000,000</em>
                  <em class="percent">16.67%</em>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="dynamics__summary">
          <p>
            <span class="dynamics__summary__title" v-html="$t('w.hydra.dynamics.total')"></span>
            <em class="dynamics__summary--amount">60,000,000</em>
          </p>
        </div>
        <dl class="dynamics__fee">
          <dt v-html="$t('t.hydra.dynamics.fee')"></dt>
          <dd v-html="$t('s.hydra.dynamics.fee')"></dd>
        </dl>
      </div>
    </section>
  </client-only>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'HydraDynamics',
  setup() {
    const { isDesktop } = useState(['isDesktop']);

    return {
      isDesktop,
    };
  },
});
</script>
