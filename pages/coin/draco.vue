<template>
  <div class="intro-draco">
    <div class="wrap-intro-banner">
      <!--      <intro-drain/>-->
    </div>

    <section class="section">
      <div class="section__title">
        <h2 v-html="$t('s.home.info')"></h2>
      </div>
      <div class="intro-draco__youtube" :class="{ 'intro-draco__youtube--open': isOpen }">
        <div class="section__inner">
          <iframe
            src="https://www.youtube.com/embed/Q9n5kE-7G9A?VQ=HD720"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <p class="intro-draco__desc">{{ $t('s.home.description') }}</p>
      <div class="intro-draco__desc__process"></div>
      <div class="intro-draco__desc__exchange">
        <a
          href="https://en.bithumb.com/trade/order/WEMIX_KRW" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-bithumb.webp" height="24" alt="bithumb"/>
        </a>
        <a href="https://www.gate.io/trade/WEMIX_USDT" class="intro-draco__desc__exchange--icon" target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-gate.webp" height="26" alt="gate.io"/>
        </a>
        <a
          href="https://www.mexc.com/ko-KR/exchange/WEMIX_USDT" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-mexc.webp" height="17" alt="MEXC Global"/>
        </a>
        <a
          href="https://exchange.korbit.co.kr/markets/?market=wemix-krw" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-korbit.webp" height="21" alt=""/>
        </a>
        <a href="https://www.lbank.info/exchange/wemix/usdt" class="intro-draco__desc__exchange--icon" target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-lbank.webp" height="21" alt="lbank"/>
        </a>
        <a
          href="https://www.bybit.com/en-US/trade/spot/WEMIX/USDT" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-bybit.webp" height="28" alt="bybit"/>
        </a>
        <a
          href="https://coinone.co.kr/exchange/trade/wemix/krw" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-coinone.webp" height="29" alt="coinone"/>
        </a>
        <a
          href="https://www.probit.com/app/exchange/WEMIX-USDT" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-probit.webp" height="36" alt="probit"/>
        </a>
        <a
          href="https://www.okx.com/markets/prices/wemix-token-wemix" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-okx.webp" height="32" alt="okx"/>
        </a>
        <a
          href="https://www.huobi.com/en-us/exchange/wemix_usdt/" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-huobi.webp" height="28" alt="huobi"/>
        </a>
        <a
          href="https://upbit.com/exchange?code=CRIX.UPBIT.KRW-WEMIX" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit"/>
          <span class="nation">KOREA</span>
        </a>
        <a
          href="https://id.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit"/>
          <span class="nation">INDONESIA</span>
        </a>
        <a
          href="https://th.upbit.com/exchange?code=CRIX.UPBIT.BTC-WEMIX" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-upbit.webp" height="20" alt="upbit"/>
          <span class="nation">THAILAND</span>
        </a>
        <a
          href="https://crypto.com/exchange/trade/spot/WEMIX_USDT" class="intro-draco__desc__exchange--icon"
          target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-crypto.webp" height="26" alt="crypto"/>
        </a>
        <!-- <a href="https://www.biki.cc/ko_KR/trade/WEMIX_USDT" class="exchange" target="_blank">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/bi-biki.webp" height="16" alt="" />
        </a> -->
      </div>
    </section>

    <section class="section-smelt">
      <h3 class="section-smelt__title derby-title">{{ $t('t.home.smelt.exchange') }}</h3>
      <div class="section-smelt__derby derby">
        <div>
          <display-derby
            v-if="derby && Array.isArray(derby) && derby.length > 0"
            :set="(today = derby[derby.length - 1])"
            :ds="Number(today.DS)"
            :bonus="Number(today.BonusYield)"
          />
          <display-derby-empty v-else/>
          <display-smelting-cost
            v-if="derby && Array.isArray(derby) && derby.length > 0"
            :today="derby.slice(-1)[0]"
            :yesterday="derby.slice(-2, -1)[0]"
          />
          <display-smelting-cost-empty v-else/>
        </div>
        <div v-if="derby && Array.isArray(derby) && derby.length > 0" class="derby__date">
          {{ $t('s.smelting-cost.updated2') }}
        </div>
      </div>

      <div class="section-smelt__description">
        <h4 class="section-smelt__description__title">DERBY</h4>
        <p>
          {{ $t('s.home.derby.primary') }}
        </p>
        <p class="small">* {{ $t('s.home.derby.secondary') }}</p>
        <div class="section-smelt__description__formula">
          <img src="https://file.mir4global.com/xdraco/img/mobile/draco/derbyformula.webp" width="100%" alt=""/>
          <p>
            Mn = Day n's mined Darksteel<br/>
            <span class="date">Start date = August 26th 2021</span>
          </p>
        </div>
        <h4 class="section-smelt__description__title">{{ $t('t.home.draco') }}</h4>
        <ul>
          <li>
            <span>Smelting</span>
            <p>{{ $t('s.home.draco.smelting') }}</p>
          </li>
          <li>
            <span>{{ $t('t.home.draco.fee') }}</span>
            <p>{{ $t('s.home.draco.sfree') }}</p>
            <p v-show="false" class="desc-info">{{ $t('s.intro-trinity.algorithm3') }}</p>
            <div class="section__trinity">
              <p class="section__trinity__title">{{ $t('t.intro-trinity.what') }}</p>
              <div class="section__trinity__desc">
                <p>{{ $t('s.intro-trinity.what') }}</p>
              </div>
              <a href="https://www.youtube.com/watch?v=YEArXJfX21s" target="_blank"
              ><span>{{ $t('s.intro-trinity.algorithm4') }}</span></a
              >
            </div>
          </li>
          <li>
            <span>{{ $t('t.home.draco.limit') }}</span>
            <p>{{ $t('s.home.draco.limit') }}</p>
          </li>
        </ul>
        <h4 class="section-smelt__description__title">{{ $t('t.home.darksteel') }}</h4>
        <p>
          {{ $t('s.home.darksteel') }}
        </p>
        <h4 class="section-smelt__description__title mt-80">{{ $t('t.draco.coins.material') }}</h4>
        <div class="section-smelt__description__material">
          <img
            src="https://file.mir4global.com/xdraco/img/desktop/draco/coins.webp" width="245"
            alt=""/>
          <span>
            <p>{{ $t('s.draco.coins.desc') }}</p>
            <nuxt-link to="/coin/hydra" class="section-smelt__description--link">{{ $t('w.draco.coins.more') }}</nuxt-link>
          </span>
        </div>
      </div>
    </section>

    <section class="section-characterisric">
      <h3 class="section-characterisric__title">{{ $t('t.home.draco.characteristics') }}</h3>

      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('t.home.draco.utility.coin') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>{{ $t('s.home.draco.utility.coin') }}</p>
            <div class="wrap-image">
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/draco/dracochaacteristics-1.webp" width="240"
                alt=""/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('t.home.draco.mobility.coin') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ $t('s.home.draco.mobility.coin') }}
            </p>
            <div class="wrap-image">
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/draco/dracochaacteristics-2.webp" width="240"
                alt=""/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('t.home.draco.intrinsic.value') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ $t('s.home.draco.intrinsic.value') }}
            </p>
            <div class="wrap-image">
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/draco/dracochaacteristics-3.webp" width="240"
                alt=""/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('t.home.draco.real.value') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ $t('s.home.draco.real.value') }}
            </p>
            <div class="wrap-image">
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/draco/dracochaacteristics-4.webp" width="240"
                alt=""/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t('t.home.draco.investment.value') }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <p>
              {{ $t('s.home.draco.investment.value1') }}
              <br/><br/>
              {{ $t('s.home.draco.investment.value2') }}
            </p>
            <div class="wrap-image">
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/draco/dracochaacteristics-5.webp" width="240"
                alt=""/>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </section>

    <section class="section-smeltery">
      <h3 class="section-smeltery__title">{{ $t('t.guide.smeltery') }}</h3>
      <p>
        {{ $t('s.guide.smeltery.desc') }}
      </p>
      <div class="section-smeltery__derby derby">
        <div>
          <DisplayDerby
            v-if="derby && derby.length > 0"
            :set="(today = derby[derby.length - 1])"
            :ds="Number(today.DS)"
            :bonus="Number(today.BonusYield)"
          />
          <DisplayDerbyEmpty v-else/>
          <DisplaySmeltingCost v-if="derby && derby.length > 0"/>
          <DisplaySmeltingCostEmpty v-else/>
        </div>
        <div class="derby__date">{{ $t('s.smelting-cost.updated2') }}</div>
      </div>
      <p>
        {{ $t('s.intro-trinity.algorithm') }}
      </p>
    </section>

    <section class="section solo guide-draco">
      <div class="section__trinity">
        <p class="section__trinity__title">{{ $t('t.intro-trinity.algorithm') }}</p>
        <div class="section__trinity__desc">
          <p>{{ $t('s.intro-trinity.algorithm5') }}</p>
        </div>
        <div class="section__trinity__circle">
          <span class="section__trinity__circle--green">{{ $t('w.intro-trinity.holder') }}</span>
          <span class="section__trinity__circle--blue">{{ $t('w.intro-trinity.earner') }}</span>
          <span class="section__trinity__circle--red">{{ $t('w.intro-trinity.player') }}</span>
          <span class="section__trinity__circle--white">{{ $t('w.intro-trinity.triangulation') }}</span>
        </div>
        <a href="https://www.youtube.com/watch?v=YEArXJfX21s" target="_blank"
        ><span>{{ $t('s.intro-trinity.algorithm4') }}</span></a
        >
      </div>
    </section>

    <section class="section-step">
      <ul v-viewer="viewerOption">
        <li>
          <h4 class="section-step__title">{{ $t('t.guide.smeltery.step.1') }}</h4>
          <p class="section-step__desc space" v-html="$t('s.guide.smeltery.step.type2')"></p>
          <div>
            <figure class="section-step__img by-viewer">
              <img src="https://file.mir4global.com/xdraco/img/mobile/draco/step1c.webp" alt="Game menu"/>
              <figcaption>Game menu</figcaption>
            </figure>
            <figure class="section-step__img by-viewer desktop">
              <img src="https://file.mir4global.com/xdraco/img/mobile/draco/step2a.webp" alt=""/>
              <figcaption>{{ $t('t.guide.smeltery') }}</figcaption>
            </figure>
          </div>
        </li>
        <li>
          <h4 class="section-step__title">{{ $t('t.guide.smeltery.step.2') }}</h4>
          <div>
            <span>
              <em>Smelting Darksteel into DRACO</em>
              <p class="section-step__desc">{{ $t('s.intro-trinity.algorithm2') }}</p>
              <p class="section-step__desc">{{ $t('s.guide.smeltery.step.2.1.content.3') }}</p>
              <p class="section-step__desc">{{ $t('s.guide.smeltery.step.2.1.content.4') }}</p>
            </span>
            <span>
              <em>Exchanging DRACO for Darksteel</em>
              <p class="section-step__desc">{{ $t('s.guide.smeltery.step.2.2.content.1') }}</p>
              <p class="section-step__desc">{{ $t('s.guide.smeltery.step.2.2.content.2') }}</p>
              <p class="section-step__desc">{{ $t('s.guide.smeltery.step.2.2.content.3') }}</p>
            </span>
          </div>
          <figure class="section-step__img by-viewer mobile">
            <img src="https://file.mir4global.com/xdraco/img/mobile/draco/step2a.webp" alt=""/>
            <figcaption>{{ $t('t.guide.smeltery') }}</figcaption>
          </figure>
          <p v-show="false" class="desc-info">{{ $t('s.intro-trinity.algorithm3') }}</p>
        </li>
        <li>
          <div>
            <h4 class="section-step__title">{{ $t('t.guide.smeltery.step.3') }}</h4>
            <p class="section-step__desc space">
              {{ $t('s.guide.smeltery.setp.3.content.1') }}
              {{ $t('s.guide.smeltery.setp.3.content.2') }}
            </p>
          </div>
          <v-carousel
            class="section-step__img--list"
            :show-arrows="isDesktop"
            height="auto"
            delimiter-icon="mdi-rhombus"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item eager>
              <figure class="section-step__img by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/mobile/draco/connect-process1a.webp"
                  alt="Connect Process Step#1"/>
                <figcaption>{{ $t('s.guide.smeltery.step.3.screen.1') }}</figcaption>
              </figure>
            </v-carousel-item>
            <v-carousel-item eager>
              <figure class="section-step__img by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/mobile/draco/connect-process2a.webp"
                  alt="Connect Process Step#2"/>
                <figcaption>{{ $t('s.guide.smeltery.step.3.screen.2') }}</figcaption>
              </figure>
            </v-carousel-item>
            <v-carousel-item eager>
              <figure class="section-step__img by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/mobile/draco/connect-process3a.webp"
                  alt="Connect Process Step#3"/>
                <figcaption>{{ $t('s.guide.smeltery.step.3.screen.3') }}</figcaption>
              </figure>
            </v-carousel-item>
            <v-carousel-item eager>
              <figure class="section-step__img by-viewer">
                <img
                  src="https://file.mir4global.com/xdraco/img/mobile/draco/connect-process4a.webp"
                  alt="Connect Process Step#4"/>
                <figcaption>{{ $t('s.guide.smeltery.step.3.screen.4') }}</figcaption>
              </figure>
            </v-carousel-item>
          </v-carousel>
        </li>
      </ul>
    </section>

    <div class="float-bottom desktop">
      <v-carousel
v-if="dracoRate" height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical
                  hide-delimiters>
        <v-carousel-item>
          <draco-usd-draco/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-wemix-draco/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-usd-draco/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-wemix-draco/>
        </v-carousel-item>
      </v-carousel>

      <v-carousel v-if="dracoRate" height="auto" class="part" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-today-derby/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-today-derby/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost/>
        </v-carousel-item>
      </v-carousel>
    </div>

    <template v-if="dracoRate && derby">
      <v-carousel class="float-bottom mobile" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-usd-draco/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-wemix-draco/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-today-derby/>
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost/>
        </v-carousel-item>
      </v-carousel>
    </template>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  toRefs,
} from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';
import { useState, useActions } from 'vuex-composition-helpers/dist';

import DisplayDerby from '@/components/coin/common/draco/DisplayDerby';
import DisplayDerbyEmpty from '@/components/coin/common/draco/DisplayDerbyEmpty';
import DisplaySmeltingCost from '@/components/coin/common/draco/DisplaySmeltingCost';
import DisplaySmeltingCostEmpty from '@/components/coin/common/draco/DisplaySmeltingCostEmpty';
import IntroDrain from '@/components/coin/IntroDrain';
import DracoSmeltingCost from '@/components/coin/mobile/draco/DracoSmeltingCost';
import DracoTodayDerby from '@/components/coin/mobile/draco/DracoTodayDerby';
import DracoUsdDraco from '@/components/coin/mobile/draco/DracoUsdDraco';
import DracoWemixDraco from '@/components/coin/mobile/draco/DracoWemixDraco';

export default defineComponent({
  name: 'DracoPage',
  meta: {
    hasSubNav: 'coin',
    className: 'draco',
  },
  components: {
    DracoWemixDraco,
    DracoSmeltingCost,
    DracoTodayDerby,
    DracoUsdDraco,
    IntroDrain,
    DisplaySmeltingCostEmpty,
    DisplaySmeltingCost,
    DisplayDerbyEmpty,
    DisplayDerby,
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup () {
    const { derby, dracoRate, draco, isDesktop } = useState(['derby', 'dracoRate', 'draco']);
    const { fetchDracoLastest, fetchDraco, fetchDerby } = useActions(['fetchDracoLastest', 'fetchDraco', 'fetchDerby']);
    const state = reactive({
      isOpen: false,
      viewerOption: {
        toolbar: false,
        title: false,
        filter (img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-intro-draco');
      }, 1500);
    });

    onMounted(() => {
      fetchDracoLastest();
      fetchDerby();
      fetchDraco();

      setTimeout(() => {
        state.isOpen = !state.isOpen;
      }, 400);
    });

    return {
      isDesktop,
      ...toRefs(state),
      fetchDracoLastest,
      fetchDraco,
      fetchDerby,
      derby,
      dracoRate,
      draco,
    };
  },
  destroyed() {
    document.documentElement.classList.remove('init-intro-draco');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/components/_derby.scss';
@import '~@/assets/sass/common/pages/coin/_draco.scss';
</style>
