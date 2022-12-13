<template>
  <div class="collectible-main-banner">
    <div class="collectible-main-banner__inner">
      <div class="wrap-message">
        <h2 class="subject">Collectibles</h2>
        <p>
          Certain XDRACO items obtained through EXD, AXD, and other gameplays are especially rare and valuable with their own designated unique
          numbers. These special items are known as Collectibles and can be characterized by the <em>‘Three Beyonds’</em>.
        </p>
      </div>
      <swiper ref="swiperBanner" :options="swiperOptions" :breakpoints="swiperOptions.breakpoints">
        <swiper-slide>
          <div class="mobile-size--slide wrap-define">
            <dl class="define type1">
              <dt>Beyond Expectation</dt>
              <dd>
                Unlike regular XDRACO items of the same type, Collectibles have their own distinctive and differentiating features and qualities that
                make them superior compared with regular items such as; higher safety enhancement segment(+6) for equipment and better stats on
                Outfits or Mounts.
              </dd>
            </dl>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wrap-define">
            <dl class="define type2">
              <dt>Beyond Game</dt>
              <dd>
                From in-game items, to virtual assets, Collectibles are minted NFTs in which digital game items have evolved into virtual assets.
                These Collectibles will truly innovate your virtual asset ownership by providing you total control.
              </dd>
            </dl>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="wrap-define">
            <dl class="define type3">
              <dt>Beyond MIR4</dt>
              <dd>
                Collectibles will be transferable to items of similar value in other future games scheduled to be released via the WEMIX platform.
                This innovation will be key to maturing and expanding the blockchain gaming economy of the future, thereby not only maintaining but
                also increasing the potential value of Collectibles derived from such utility and cross-game compatibility.
              </dd>
            </dl>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-container swiper-pagination-container">
        <div id="swiperPaginationBanner" slot="pagination" class="swiper-pagination"></div>
      </div>
    </div>
    <div class="wrap-video">
      <video id="videoBgCollectible" class="video" loop muted playsinline>
        <!-- <source src="https://file.mir4global.com/xdraco/video/desktop/bg-collectible-banner.mp4" type="video/mp4" />
        <source src="https://file.mir4global.com/xdraco/video/mobile/bg-collectible-banner.mp4" type="video/mp4" /> -->
        <source :src="staticHost + '/xdraco-dsp/video/desktop/bg-collectible-banner.mp4'" type="video/mp4" />
        <source :src="staticHost + '/xdraco-dsp/video/mobile/bg-collectible-banner.mp4'" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { defineComponent, onBeforeMount } from '@vue/composition-api';
import 'swiper/css/swiper.css';

export default defineComponent({
  name: 'CollectibleTop',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    onBeforeMount(() => {
      document.documentElement.classList.add('init--collectible-banner');
    });
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    staticHost: process.env.VUE_APP_STATIC_HOST,

    // for swiper
    swiperOptions: {
      slidesPerView: 1,
      pagination: {
        el: '#swiperPaginationBanner',
        clickable: true,
      },
      breakpoints: {
        900: {
          slidesPerView: 3,
          simulateTouch:false,
          touchRatio: 0,
        }
      },
    },
  }),
  computed: {
    swiperBanner() {
      return this.$refs.swiperBanner.$swiper;
    },
  },
  mounted() {
    setTimeout(() => {
      if (!document.querySelector('#videoBgCollectible')) {
        return;
      }
      const video = document.querySelector('#videoBgCollectible');
      video.play();
    }, 1000);
  },
  destroyed() {
    document.documentElement.classList.remove('init--collectible-banner');
  },
});
</script>

<style lang="scss">
@import '@/assets/sass/common/pages/collectibles/_collectibles-banner.scss';
</style>
