<template>
  <div class="wrap-swiper">
    <swiper ref="swiperRecommended" class="list-item recommended" :options="swiperOptions">
      <swiper-slide v-for="item in recommendedItems" :key="`recommended-item-${item.tradeUID}`" class="list-item__item">
        <item-card :item="item.item" :collectible="!!item.item.uniqueNo" />
        <recommended-widget-button :trade-uid="item.tradeUID" :price="item.price" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';

import ItemCard from '@/components/common/item/ItemCard';
import RecommendedWidgetButton from '@/components/exd/mobile/RecommendedWidgetButton';
import { useFormattedNumber } from '@/utils/composables/common';
import { useToUsd } from '@/utils/composables/exchange';

const { useState: useExdState, useActions: useExdActions, useMutations: useExdMutations } = createNamespacedHelpers('exd');
const { useState: useHspState } = createNamespacedHelpers('hsp');
export default defineComponent({
  name: 'RecommendedWidget',
  components: { RecommendedWidgetButton, ItemCard, Swiper, SwiperSlide },
  setup(props, { root }) {
    const { $i18n } = root;
    const swiperRef = ref();
    const state = reactive({
      swiperOptions: {
        slidesPerView: 'auto',
      },
    });

    const { price: hydraPrice } = useHspState(['price']);

    const { recommendedLoading, recommendedItems, price } = useExdState(['recommendedLoading', 'recommendedItems', 'price']);
    const { fetchRecommended } = useExdActions(['fetchRecommended']);

    onMounted(() => {
      // fetchRecommended();
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchRecommended();
      },
    );

    const goToDetail = (tradeUID) => {
      root.$router.push(`/exd/trade/${tradeUID}`);
    };

    return {
      ...toRefs(state),
      recommendedItems,
      swiperRef,
      price,
      hydraPrice,
      goToDetail,
      useFormattedNumber,
      useToUsd,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    }
  },
});
</script>
