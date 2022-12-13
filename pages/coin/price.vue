<template>
  <div class="price">
    <section v-if="!accessToken" class="login__wrapper">
      <div class="inner--width">
        <h3 class="login--title">My Wallet</h3>
        <wemix-login />
      </div>
    </section>
    <section v-else class="logged-in__wrapper">
      <logged-in />
    </section>

    <div class="coin-price--table">
      <section v-if="hydraRate" class="coin-content">
        <div class="coin-content__wrapper derby summary-coin">
          <div class="coin-content__info">
            <h3 class="coin-content--title">
              <img src="https://file.mir4global.com/xdraco/img/common/price/bi-hydra-gold.webp" height="24" alt="HYDRA" />
            </h3>
            <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
              <price-usd-hydra />
              <price-wemix-hydra />
              <price-usd-hydra />
              <price-wemix-hydra />
            </v-carousel>

            <dl class="display-data">
              <dt>
                <span>{{ $t('w.price.previous.wemix') }}</span>
                <span class="date">00:00(UTC+0)</span>
              </dt>
              <dd>
                <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
                  <price-usd-hydra-prev />
                  <price-wemix-hydra-prev />
                  <price-usd-hydra-prev />
                  <price-wemix-hydra-prev />
                </v-carousel>
              </dd>
            </dl>

            <dl v-if="hydraRate" class="display-data">
              <dt>
                <span>{{ $t('w.price.volume') }}</span>
                <span class="date">00:00(UTC+0) ~</span>
              </dt>
              <dd>{{ hydraRate.HydraAmount | currency(0) }} HYDRAs</dd>
            </dl>
            <div v-if="hydraRate" class="updated-date">{{ $t('date.format.decoration', [dateFormatFromString(hydraRate.CreatedDT)]) }}</div>
          </div>
        </div>
        <div class="coin-content__wrapper derby summary-coin">
          <div class="coin-content__info">
            <hydra-refining-cost />

            <dl class="display-data">
              <dt>
                <span>{{ $t('t.price.refining.hydra.desc') }}</span>
              </dt>
              <dd>
                <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
                  <v-carousel-item>
                    {{ (hydraSupply ? hydraSupply.TotalSupply : 0) | currency(4) }}
                  </v-carousel-item>
                </v-carousel>
              </dd>
            </dl>
            <dl class="display-data">
              <dt>
                <span>{{ $t('t.price.refining.hydra.desc2') }}</span>
              </dt>
              <dd>Stage {{ hydraSupply ? Math.floor(Number(hydraSupply.HydraSupply) / 100000) + 1 : 1 }}</dd>
            </dl>
            <div class="updated-date">{{ $t('s.smelting-cost.updated') }}</div>
          </div>
        </div>
      </section>
      <section v-if="dracoRate" class="coin-content">
        <div class="derby summary-coin">
          <div class="coin-content__info">
            <h3 class="coin-content--title">
              <img src="https://file.mir4global.com/xdraco/img/common/price/bi-draco-gold.webp" height="24" alt="DRACO" />
            </h3>
            <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
              <price-usd-draco />
              <price-wemix-draco />
              <price-usd-draco />
              <price-wemix-draco />
            </v-carousel>

            <dl class="display-data">
              <dt>
                <span>{{ $t('w.price.previous.wemix') }}</span>
                <span class="date">00:00(UTC+0)</span>
              </dt>
              <dd>
                <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
                  <price-usd-draco-prev />
                  <price-wemix-draco-prev />
                  <price-usd-draco-prev />
                  <price-wemix-draco-prev />
                </v-carousel>
              </dd>
            </dl>

            <dl v-if="dracoRate" class="display-data">
              <dt>
                <span>{{ $t('w.price.volume') }}</span>
                <span class="date">00:00(UTC+0) ~</span>
              </dt>
              <dd>{{ dracoRate.DracoAmount | currency(0) }} DRACO</dd>
            </dl>
            <div v-if="dracoRate" class="updated-date">{{ $t('date.format.decoration', [dateFormatFromString(dracoRate.CreatedDT)]) }}</div>
          </div>
        </div>
        <card-today-derby />
      </section>
    </div>
    <price-chart />
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeMount } from '@vue/composition-api';

import { useActions, useState } from 'vuex-composition-helpers/dist';

import HydraRefiningCost from '@/components/coin/common/price/HydraRefiningCost';
import LoggedIn from '@/components/coin/common/price/LoggedIn';
import PriceUsdDraco from '@/components/coin/common/price/PriceUsdDraco';
import PriceUsdDracoPrev from '@/components/coin/common/price/PriceUsdDracoPrev';
import PriceUsdHydra from '@/components/coin/common/price/PriceUsdHydra';
import PriceUsdHydraPrev from '@/components/coin/common/price/PriceUsdHydraPrev';
import PriceWemixDraco from '@/components/coin/common/price/PriceWemixDraco';
import PriceWemixDracoPrev from '@/components/coin/common/price/PriceWemixDracoPrev';
import PriceWemixHydra from '@/components/coin/common/price/PriceWemixHydra';
import PriceWemixHydraPrev from '@/components/coin/common/price/PriceWemixHydraPrev';
import CardTodayDerby from '@/components/coin/mobile/price/CardTodayDerby';
import PriceChart from '@/components/coin/mobile/price/PriceChart';
import WemixLogin from '@/components/common/WemixLogin';
import { dateFormatFromString } from '@/utils/filters/date';

export default defineComponent({
  name: 'PricePage',
  meta: {
    hasSubNav: 'coin',
    className: 'price',
  },
  components: {
    CardTodayDerby,
    PriceWemixDracoPrev,
    PriceWemixDraco,
    PriceUsdDraco,
    HydraRefiningCost,
    PriceWemixHydraPrev,
    PriceUsdHydraPrev,
    PriceUsdDracoPrev,
    PriceWemixHydra,
    PriceUsdHydra,
    LoggedIn,
    WemixLogin,
    PriceChart,
  },
  setup() {
    const { accessToken, dracoRate, hydraRate, hydraSupply, derby } = useState(['accessToken', 'dracoRate', 'hydraRate', 'hydraSupply', 'derby']);
    const { fetchDraco, fetchDerby, fetchHydra, fetchDracoLastest, fetchHydraLastest, fetchHydraSupply } = useActions([
      'fetchDraco',
      'fetchDerby',
      'fetchHydra',
      'fetchDracoLastest',
      'fetchHydraLastest',
      'fetchHydraSupply',
    ]);

    onMounted(() => {
      fetchDraco();
      fetchHydra();
      fetchDerby();
      fetchDracoLastest();
      fetchHydraLastest();
      fetchHydraSupply();
    });

    return {
      accessToken,
      dracoRate,
      hydraRate,
      hydraSupply,
      derby,
      dateFormatFromString,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/components/_derby.scss';
@import '~@/assets/sass/components/_summary-coin.scss';
@import '~@/assets/sass/common/pages/coin/price';
</style>
