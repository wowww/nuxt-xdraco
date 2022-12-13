<template>
  <li class="list-item__item">
    <em v-if="useRank" class="rank-badge">
      <template v-if="rank === 0"> 1st</template>
      <template v-if="rank === 1"> 2nd</template>
      <template v-if="rank === 2"> 3rd {{cardSize}}</template>
    </em>
    <item-card
      :item="{ ...exchangeItem.item, tradeUID: exchangeItem.tradeUID }"
      :use-info="useInfo"
      :collectible="collectible"
      :use-link="useLink"
      :size="cardSize"
    />
    <div v-if="!useTop" class="wrap-button">
      <button type="button" class="btn btn-price-exd" @click="goToDetail">
        <exd-hydra-price :price="exchangeItem.price" icon-size="ss" :hide-label="true" :hide-usd="useTop" />
      </button>
    </div>
    <div v-if="useTop" class="wrap-button">
      <nuxt-link to="productId" class="btn btn-price-exd" aria-disabled="true">
        <exd-hydra-price :price="exchangeItem.price" icon-size="ss" :hide-label="true" :hide-usd="useTop" />
        <div class="info">
          <!--          <character-class-thumb :character-class="exchangeItem.seller.class" size="24" />-->
          <strong class="nick">{{ exchangeItem.walletAddress || exchangeItem.seller.walletAddress | truncateMiddle }}</strong>
        </div>
      </nuxt-link>
    </div>
    <div v-if="useTop" class="date-complete-stake">
      <!--      <span>{{ t('t.exd.tx.date') }}</span>-->
      <span v-if="useRelativeDate" class="date">{{ relativeDate }}</span>
      <span v-else class="date">{{ formattedDate }}</span>
    </div>
  </li>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import ItemCard from '@/components/common/item/ItemCard';
import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import { useFormattedNumber } from '@/utils/composables/common';
import { useToUsd } from '@/utils/composables/exchange';
import { dateFormat, fromNow } from '~/utils/filters/date';

const { useState } = createNamespacedHelpers('exd');
const { useState: useHspState } = createNamespacedHelpers('hsp');

export default defineComponent({
  name: 'ExchangeItem',
  components: { ExdHydraPrice, ItemCard },
  props: {
    useRank: {
      type: Boolean,
      default: false,
    },
    rank: {
      type: Number,
      default: 0,
    },
    cardSize: {
      type: String,
      default: '',
    },
    useLink: {
      type: Boolean,
      default: false,
    },
    exchangeItem: {
      type: Object,
      default: () => ({}),
    },
    useTop: {
      type: Boolean,
      default: false,
    },
    useRelativeDate: {
      type: Boolean,
      default: false,
    },
    collectible: {
      type: Boolean,
      default: false,
    },
    useInfo: {
      type: Boolean,
      default: false,
    },
  },
  setup({ exchangeItem, collectible }, { root }) {
    const formattedPrice = useFormattedNumber(exchangeItem.price);
    const { usd } = useToUsd(exchangeItem.price);

    const inCollectible = computed(() => {
      return collectible && root.$route.path.includes('collectible');
    });

    const relativeDate = computed(() => {
      return fromNow(exchangeItem.endTime);
    });

    const formattedDate = computed(() => {
      return dateFormat(exchangeItem.endTime);
    });

    const goToDetail = () => {
      if (inCollectible.value) {
        root.$router.push({
          path: `/collectibles/trade/${exchangeItem.tradeUID}`,
          params: exchangeItem.tradeUID,
        });
      } else {
        root.$router.push({
          path: `/exd/trade/${exchangeItem.tradeUID}`,
          params: exchangeItem.tradeUID,
        });
      }
    };

    return {
      usd,
      inCollectible,
      goToDetail,
      formattedPrice,
      relativeDate,
      formattedDate,
    };
  },
});
</script>
