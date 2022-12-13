<template>
  <div class="wrapper">
    <banner-carousel />
    <section class="coin-price__rolling-board">
      <div class="coin-price__rolling-board--wrapper">
        <rolling-currency-board />
      </div>
    </section>

    <!--    <section class="section section0">-->
    <!--      <div class="section__inner">-->
    <!--        <div class="wrap-video">-->
    <!--          <lazy-youtube src="https://www.youtube.com/embed/DXYSD09JEcI" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </section>-->

    <main class="main">
      <div class="main__wrapper">
        <h1 class="main__wrapper--title">XDRACO</h1>
        <p class="main__wrapper-description" v-html="$t('s.home.section1.introduce')"></p>
      </div>
    </main>

    <section class="contents">
      <div class="contents__wrapper">
        <h2 class="contents--title">Summary of the XDRACO</h2>
        <ul class="contents__summary summary-brand">
          <li class="contents__summary--list contents__summary--list-mirage">
            <figure class="contents__image">
              <img src="https://file.mir4global.com/xdraco/img/desktop/home/bi-mirage.webp" width="27%" alt="" />
              <figcaption class="contents__image--description">
                <span class="line-break">Brand new character staking game</span>
                <span class="line-break">Welcome to the Golden Age, MIRAGE.</span>
              </figcaption>
            </figure>
            <p class="contents__description">
              <strong class="contents__description--gradient">Join Hidden Valley Capture</strong>
              <span class="contents__description--gradient">
                <em>{{ joinDragonians | currency(0) }}</em>
                <span>Dragonians are currently engaged in battle</span>
              </span>
            </p>
            <div class="contents__link">
              <span class="contents__link--button">MIRAGE</span>
            </div>
            <nuxt-link to="/mirage" class="contents__link--area">MIR4NFT</nuxt-link>
          </li>
          <li class="contents__summary--list contents__summary--list-hsp">
            <figure class="contents__image">
                <img src="https://file.mir4global.com/xdraco/img/desktop/home/bi-hsp.webp" width="50%" alt="" />
              <figcaption class="contents__image--description">
                <span v-html="$t('s.home.section2.hsp.desc')"></span>
              </figcaption>
            </figure>
            <div class="contents__description">
              <span class="contents__description--name">Total Value Locked</span>
              <span class="contents__description--coin">
                <img src="https://file.mir4global.com/xdraco/img/desktop/home/ico-hydra-gold.webp" width="40" alt="" />
                <em class="contents__description--coin-num">
                  {{ formattedStakedAmount[0] }}
                  <small v-if="formattedStakedAmount[1]" class="contents__description--coin-decimal">{{ formattedStakedAmount[1] }}</small>
                </em>
              </span>
              <span class="contents__description--coin contents__description--coin-locked">
                <img src="https://file.mir4global.com/xdraco/img/desktop/home/logo-wemix.webp" width="16" alt="" />
                <em>{{formattedStakeWemix[0]}}<span v-if="formattedStakeWemix[1]" class="decimal">{{ formattedStakedAmount[1] }}</span></em>
              </span>
            </div>
            <div class="contents__link wrap-button">
              <span class="contents__link--button">HSP</span>
            </div>
            <nuxt-link to="/hsp" class="contents__link--area">HSP</nuxt-link>
          </li>
          <li class="contents__summary--list contents__summary--list-exd">
            <figure class="contents__image">
              <img src="https://file.mir4global.com/xdraco/img/common/banner/exd-top/bi-exd.webp" width="126" height="26%" alt="" />
              <figcaption class="contents__image--description">

                <span v-html="$t('s.home.section2.exchange.desc')"></span>
              </figcaption>
            </figure>
            <div class="contents__link wrap-button">
              <span class="contents__link--button">Exchange By DRACO</span>
            </div>
            <nuxt-link to="/exd/list" class="contents__link--area">Exchange By DRACO</nuxt-link>
          </li>
          <li class="contents__summary--list contents__summary--list-nft">
            <figure class="contents__image define">
              <img src="https://file.mir4global.com/xdraco/img/desktop/home/summary-bi-nft.webp" width="24%" alt="" />
              <figcaption class="contents__image--description" v-html="$t('s.home.section2.nft.desc')"></figcaption>
            </figure>
            <div class="contents__link wrap-button">
              <span class="contents__link--button">Character NFT</span>
            </div>
            <nuxt-link to="/nft" class="contents__link--area">MIR4NFT</nuxt-link>
          </li>
          <li class="contents__summary--list contents__summary--list-dsp-end">
            <figure class="contents__image">
              <img src="https://file.mir4global.com/xdraco/img/desktop/home/summary-bi-dsp.webp" width="28%" alt="" />
              <figcaption class="contents__image--description">
                <span>DSP Season 3 will return with more unique</span>
                <span>XDRACO items!</span>
              </figcaption>
            </figure>
            <div class="contents__link wrap-button">
              <span class="contents__link--button">DSP ROUND LIST</span>
            </div>
            <nuxt-link to="/dsp/rounds" class="contents__link--area">DSP</nuxt-link>
          </li>
          <li class="contents__summary--list contents__summary--list-drain">
            <figure class="contents__image">
                <img src="https://file.mir4global.com/xdraco/img/desktop/home/bi-drain.webp" width="37%" alt="" />
              <figcaption class="contents__image--description">
                <span>Be Hydrated.</span>
                <span>The Mystery Trader will appear.</span>
              </figcaption>
            </figure>
            <div class="contents__link wrap-button">
              <span class="contents__link--button">Learn more</span>
            </div>
            <a href="https://mir4draco.com/drain" class="contents__link--area"></a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, computed, onBeforeMount, onMounted, onUnmounted } from '@vue/composition-api';
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";

// import LazyYoutube from 'vue-lazy-youtube-video';
// import 'vue-lazy-youtube-video/dist/style.css';
import RollingCurrencyBoard from '@/components/price/RollingCurrencyBoard';
import BannerCarousel from '@/components/banner/home/BannerCarousel';
import { separateDecimalPoint } from "~/utils/filters/numeric";

const { useState: useHspState, useActions: useHspActions } = createNamespacedHelpers('hsp');
const { useState: useMirageState, useActions: useMirageActions } = createNamespacedHelpers('mirage');

export default defineComponent({
  components: {
    RollingCurrencyBoard,
    BannerCarousel,
    // LazyYoutube,
  },
  setup() {
    const { total, price } = useHspState(['total', 'price']);
    const { fetchTotal, fetchPrice } = useHspActions(['fetchTotal', 'fetchPrice']);
    const { valleyCapture } = useMirageState(['valleyCapture']);
    const { fetchServerInfo } = useMirageActions(['fetchServerInfo']);

    const formattedStakedAmount = computed(() => {
      return separateDecimalPoint(total.value ? total.value.totalStakedAmount : '');
    });

    const formattedStakeWemix = computed(() => {
      return separateDecimalPoint(total.value && price.value ? Number(total.value.totalStakedAmount) * Number(price.value.HydraPrice) : '');
    });

    const joinDragonians = computed(() => {
      if (valleyCapture.value) {
        let dragonians = 0;
        valleyCapture.value.serverInfo.forEach((item) => {
          if (item && item.CurrentSlotCnt) {
            dragonians += Number(item.CurrentSlotCnt);
          }
        });

        return dragonians;
      }
      return 0;
    });

    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-home');
      }, 500);
    });

    onMounted(() => {
      fetchTotal();
      fetchPrice();
      fetchServerInfo();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('init-home');
    });

    return {
      formattedStakedAmount,
      formattedStakeWemix,
      joinDragonians,
    };
  },
});
</script>

<style lang="scss" scoped>
//@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/home';
</style>
