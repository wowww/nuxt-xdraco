<template>
  <div class="rolling-board">
    <nuxt-link to="/coin/hydra" class="rolling-board__link">
      <h3 class="rolling-board__title">
        <img src="https://file.mir4global.com/xdraco/img/common/rolling-board/bi-hydra.webp" width="72" alt="hydra" />
      </h3>
      <swiper ref="currencyInfo" class="rolling-board__swiper swiper" :options="swiperOptions">
        <swiper-slide>
          <dl v-if="hydraWemix" class="exchange">
            <dt>WEMIX / HYDRA</dt>
            <dd>
              <span class="amount wemix">{{ formattedHydraWemix }}</span>
              <span class="change" :class="{ plus: hydraWemixChange > 0, minus: hydraWemixChange < 0 }">
                {{ hydraWemixChange > 0 ? '+' : '' }}{{ hydraWemixChange.toFixed(2) }}%
              </span>
            </dd>
          </dl>
        </swiper-slide>
        <swiper-slide>
          <dl v-if="hydraUsd" class="exchange">
            <dt>USD / HYDRA</dt>
            <dd>
              <span class="amount">${{ formattedHydraUsd }}</span>
              <span class="change" :class="{ plus: hydraUsdChange > 0, minus: hydraUsdChange < 0 }">
                {{ hydraUsdChange > 0 ? '+' : '' }}{{ hydraUsdChange.toFixed(2) }}%
              </span>
            </dd>
          </dl>
        </swiper-slide>
      </swiper>
    </nuxt-link>
    <nuxt-link to="/coin/draco" class="rolling-board__link">
      <h3 class="rolling-board__title">
        <img src="https://file.mir4global.com/xdraco/img/common/rolling-board/bi-draco.webp" width="72" alt="draco" />
      </h3>
      <swiper ref="currencyInfo" class="rolling-board__swiper swiper" :options="swiperOptions">
        <swiper-slide>
          <dl v-if="dracoWemix" class="exchange">
            <dt>WEMIX / DRACO</dt>
            <dd>
              <span class="amount wemix">{{ formattedDracoWemix }}</span>
              <span class="change" :class="{ plus: dracoWemixChange > 0, minus: dracoWemixChange < 0 }">
                {{ hydraWemixChange > 0 ? '+' : '' }}{{ hydraWemixChange.toFixed(2) }}%
              </span>
            </dd>
          </dl>
        </swiper-slide>
        <swiper-slide>
          <dl v-if="dracoUsd" class="exchange">
            <dt>USD / DRACO</dt>
            <dd>
              <span class="amount">${{ formattedDracoUsd }}</span>
              <span class="change" :class="{ plus: dracoUsdChange > 0, minus: dracoUsdChange < 0 }">
                {{ dracoUsdChange > 0 ? '+' : '' }}{{ dracoWemixChange.toFixed(2) }}%
              </span>
            </dd>
          </dl>
        </swiper-slide>
      </swiper>
    </nuxt-link>
    <nuxt-link to="/coin" class="rolling-board__link link">
      <span class="img-link">
        <img src="https://file.mir4global.com/xdraco/img/common/rolling-board/bi-hydra-draco.webp" width="104" alt="hydra&amp;draco" />
      </span>
    </nuxt-link>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from '@vue/composition-api';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { createNamespacedHelpers, useActions, useGetters, useState } from 'vuex-composition-helpers/dist';
import { currency } from '@/plugins/filters';

const { useState: useMirageState, useActions: useMirageActions } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'RollingCurrencyBoard',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const state = reactive({
      timer: null,
      swiperOptions: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
        allowTouchMove: false,
        direction: 'vertical',
      },
    });
    const { dracoRate, hydraRate } = useState(['dracoRate', 'hydraRate']);
    const { dracoUsd, dracoWemix, dracoUsdChange, dracoWemixChange, hydraUsd, hydraWemix, hydraUsdChange, hydraWemixChange } = useGetters([
      'dracoUsd',
      'dracoWemix',
      'dracoUsdChange',
      'dracoWemixChange',
      'hydraUsd',
      'hydraWemix',
      'hydraUsdChange',
      'hydraWemixChange',
    ]);
    const { fetchDracoLastest, fetchHydraLastest } = useActions(['fetchDracoLastest', 'fetchHydraLastest']);

    onMounted(() => {
      if (!dracoRate.value) {
        fetchDracoLastest();
      }

      if (!hydraRate.value) {
        fetchHydraLastest();
      }

      state.timer = setInterval(() => {
        fetchDracoLastest();
        fetchHydraLastest();
      }, 1000 * 60 * 5);
    });

    onUnmounted(() => {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }
    });

    return {
      ...toRefs(state),
      dracoUsd,
      dracoUsdChange,
      dracoWemix,
      dracoWemixChange,
      hydraUsd,
      hydraWemix,
      hydraUsdChange,
      hydraWemixChange,
    };
  },
  computed: {
    formattedDracoUsd() {
      return currency(this.dracoUsd, 4);
    },
    formattedDracoWemix() {
      return currency(this.dracoWemix, 4);
    },
    formattedHydraUsd() {
      return currency(this.hydraUsd, 4);
    },
    formattedHydraWemix() {
      return currency(this.hydraWemix, 4);
    },
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/rolling-board';
</style>
