<template>
  <div class="contents hsp">
    <banner-hsp-top />
    <section class="section hsp--area">
      <div class="section__inner hsp__wrapper">
        <div class="wrap-grid">
          <div class="grid-timeline wrap-grid__timeline">
            <div class="hsp--main">
              <div class="hsp--info">
                <div class="hsp--info-list">
                  <dl class="define-value">
                    <dt class="minted">
                      {{ $t('t.hsp.main.value1') }}
                      <v-tooltip content-class="hydra-tooltip" attach=".minted" top>
                        <template #activator="{ on, attrs }">
                          <v-icon color="primary" dark v-bind="attrs" v-on="on"> icon</v-icon>
                        </template>
                        <div class="tooltip-wrap">
                          <div class="tit">{{ $t('t.hsp.main.tooltip.title1') }}</div>
                          <ul class="desc">
                            <li>{{ $t('s.hsp.main.tooltip.desc1') }}</li>
                            <li>{{ $t('s.hsp.main.tooltip.desc2') }}</li>
                            <li>{{ $t('s.hsp.main.tooltip.desc3') }}</li>
                          </ul>
                        </div>
                      </v-tooltip>
                    </dt>
                    <dd v-if="isPreStake">
                      <div>
                        <p class="date">Reward HYDRA minting will begin on<br />{{ startStake.utcOffset(8).format(t('w.rounds.date.format')) }}</p>
                      </div>
                    </dd>
                    <dd v-if="!isPreStake">
                      <div class="hydra-gold__wrapper">
                        <p class="icon-hydra-gold">
                          {{ formattedMinAmount[0] }}<em v-if="formattedMinAmount[1]">{{ formattedMinAmount[1] }}</em>
                        </p>
                        <v-btn width="24" height="24" fab icon :disabled="loading" @click="fetchTotal">
                          <img class="icon-refresh" :class="{ on: loading }" src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/ico-refresh.webp" />
                        </v-btn>
                      </div>
                      <hsp-exchange-rate v-if="total && total.totalMintAmount" :amount="total.totalMintAmount" />
                    </dd>
                    <div v-if="!isPreStake" class="graph-wrap">
                      <em class="percent">{{ ((Number(total.totalMintAmount) / 1000000) * 100).toFixed(2) }}%</em>
                      <div class="graph">
                        <span class="bar" :style="{ width: `${((Number(total.totalMintAmount) / 1000000) * 100).toFixed(2)}%` }"></span>
                      </div>
                    </div>
                  </dl>
                </div>
                <div class="hsp--info-list">
                  <dl class="define-value">
                    <dt class="total">
                      {{ $t('t.hsp.tvs') }}
                      <v-tooltip content-class="hydra-tooltip" attach=".total" top>
                        <template #activator="{ on, attrs }">
                          <v-icon color="primary" dark v-bind="attrs" v-on="on"> icon</v-icon>
                        </template>
                        <div class="tooltip-wrap">
                          <div class="tit">{{ $t('t.hsp.main.value2') }}</div>
                          <ul class="desc">
                            <li>{{ $t('s.hsp.main.tooltip.desc4') }}</li>
                          </ul>
                        </div>
                      </v-tooltip>
                    </dt>
                    <dd>
                      <div class="hydra-gold__wrapper">
                        <p class="icon-hydra-gold">
                          {{ formattedStakedAmount[0] }}<em v-if="formattedStakedAmount[1]">{{ formattedStakedAmount[1] }}</em>
                        </p>
                        <v-btn width="24" height="24" fab icon @click="fetchTotal">
                          <img
                            class="icon-refresh"
                            :class="{ on: loading }"
                            src="https://file.mir4global.com/xdraco/img/common/hsp-dialog/ico-refresh.webp"
                            alt="Refresh TVS"
                          />
                        </v-btn>
                      </div>
                      <hsp-exchange-rate v-if="total && total.totalStakedAmount" :amount="total.totalStakedAmount" />
                    </dd>
                    <div class="total-avr">
                      <div><span v-html="formattedApr"></span><em>APR</em></div>
                      <v-divider vertical />
                      <div><span v-html="formattedApy"></span><em>APY</em></div>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- My Stake -->
              <hsp-my-stake :pre-stake="isPreStake" :apr="formattedApr" :apy="formattedApy" />

              <!-- Notice -->
              <div class="hsp--notice">
                <dl class="meaning">
                  <dt class="meaning--title" v-html="$t('t.hsp-teaser.caution.title')"></dt>
                  <dd class="meaning--description" v-html="$t('s.hsp-teaser.caution.content')"></dd>
                </dl>
                <ul class="caution">
                  <li class="caution--list" v-html="$t('s.hsp-teaser.caution.desc1')"></li>
                  <li class="caution--list" v-html="$t('s.hsp-teaser.caution.desc2')"></li>
                  <li class="caution--list" v-html="$t('s.hsp-teaser.caution.desc3')"></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="grid-side wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { computed, defineComponent, onMounted, onBeforeMount, reactive, toRefs, watch } from '@vue/composition-api';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BannerHspTop from '@/components/banner/HspTop';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import HspExchangeRate from '@/components/hsp/HspExchangeRate';
import HspMyStake from '@/components/hsp/HspMyStake';
import { separateDecimalPoint } from '@/utils/filters/numeric';
import { useHspStore } from '@/utils/composables/hsp';

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'HspStake',
  meta: {
    title: 'HSP | XDRACO',
    hasSubNav: 'hsp',
  },
  components: {
    HspExchangeRate,
    AccountInfo,
    BannerHspTop,
    SidebarContactUs,
    HspMyStake,
  },
  setup() {
    const startStake = dayjs('2022-01-28 16:00').utc(true);
    const { accessToken } = useState(['accessToken']);
    const { useHspState, useHspGetters, useHspActions } = useHspStore();
    const { loading, total, my, price } = useHspState(['loading', 'total', 'my', 'price']);
    const { apr, apy } = useHspGetters(['apr', 'apy']);
    const { fetchTotal, fetchMy } = useHspActions(['fetchTotal', 'fetchMy']);

    const state = reactive({
      aprBigNumber: null,
      apr: Number(0),
      apy: Number(0),
      formattedApr: '--%',
      formattedApy: '--%',
    });

    const isPreStake = computed(() => {
      return dayjs().utc().isBefore(startStake);
    });

    const formattedMinAmount = computed(() => {
      return separateDecimalPoint(total.value ? total.value.totalMintAmount : '');
    });

    const formattedStakedAmount = computed(() => {
      return separateDecimalPoint(total.value ? total.value.totalStakedAmount : '');
    });

    onMounted(() => {
      fetchTotal();
      fetchMy();
    });

    watch(
      () => accessToken.value,
      () => {
        fetchTotal();
        fetchMy();
      },
    );

    const formattedApr = computed(() => {
      if (loading.value) {
        return '--%';
      }
      const sApr = new BigNumber(apr.value).times(100).toFormat(2).split('.');
      const point = sApr.length > 1 ? `<small class="point">.${sApr[1]}</small>` : '';
      return `${sApr[0]}${point}%`;
    });

    const formattedApy = computed(() => {
      if (loading.value || !apy.value) {
        return '--%';
      }
      const sApy = new BigNumber(apy.value).times(100).toFormat(2).split('.');
      const point = sApy.length > 1 ? `<small class="point">.${sApy[1]}</small>` : '';
      return `${sApy[0]}${point}%`;
    });

    return {
      ...toRefs(state),
      total,
      my,
      loading,
      fetchTotal,
      fetchMy,
      price,
      isPreStake,
      startStake,
      formattedMinAmount,
      formattedStakedAmount,
      formattedApr,
      formattedApy,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/pages/hsp';
@import '~@/assets/sass/components/hsp-common';
</style>
