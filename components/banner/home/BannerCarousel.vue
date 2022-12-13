<template>
  <swiper ref="swiperTop" class="swiper" :options="swiperOptions">
    <swiper-slide>
      <banner-reflect-alliance />
    </swiper-slide>
    <swiper-slide>
      <banner-nft-enhancement />
    </swiper-slide>
<!--  시즌 2 종료로 인한 제거  -->
<!--    <swiper-slide>-->
<!--      <banner-boss-raid2 />-->
<!--    </swiper-slide>-->
    <swiper-slide>
      <banner-wemix />
    </swiper-slide>
    <swiper-slide>
      <banner-mirax />
    </swiper-slide>
    <swiper-slide>
      <banner-hsp-staking />
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
  </swiper>
</template>

<script>
import 'swiper/css/swiper.css';
import '@/assets/sass/common/pages/_main-swiper.scss';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import BannerReflectAlliance from '@/components/banner/home/BannerReflectAlliance';
import BannerWemix from '@/components/banner/home/BannerWemix';
import BannerBossRaid2 from '@/components/banner/home/BannerBossRaid2';
import BannerMirax from '@/components/banner/home/BannerMirax';
import BannerHspStaking from '@/components/banner/home/HspStaking';
import BannerNftEnhancement from "~/components/banner/home/BannerNftEnhancement";

export default {
  name: 'BannerCarousel',
  components: {
    Swiper,
    SwiperSlide,
    BannerReflectAlliance,
    BannerWemix,
    BannerBossRaid2,
    BannerMirax,
    BannerHspStaking,
    BannerNftEnhancement,
  },
  computed: {
    swiperOptions() {
      return ({
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        effect: 'fade',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      });
    },
  },
};
</script>
