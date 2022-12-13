<template>
  <li :class="{ 'list-item__item': !isDesktop }">
    <nuxt-link :to="`/nft/trade/${item.seq}`" class="link">
      <nft-card :size="size" :item="item" :non-flipped="true" />
    </nuxt-link>
    <div class="wrap-button">
      <button type="button" class="btn btn-price btn-primary-nft" @click="go2Detail">
        <em class="price">
          <strong class="ico-wemixcredit ico-ss add-inside">{{ item.price | currency(0) }}</strong>
          <span class="rate">$ {{ (item.price * Number(price.USDWemixRate)) | currency(0, true) }}</span>
        </em>
      </button>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import NftCard from '~/components/nft/NftCard';
import { isNew } from '@/utils/filters/date';

const { useState } = createNamespacedHelpers('exd');

export default defineComponent({
  name: 'MirageNftItem',
  components: { NftCard },
  props: {
    item: {
      type: Object,
      default: () => ({
        CharacterLev: 0,
        CharacterClass: 0,
        CharacterName: '',
        CharacterWorldID: '',
        PowerScore: '',
        TokenID: '',
      }),
    },
    rank: {
      type: Number,
      default: 0,
    },
    useLink: {
      type: Boolean,
      default: false,
    },
    traded: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'sm',
      required: false,
    },
  },
  setup({ item }, { root }) {
    const { price, isDesktop } = useState(['price', 'isDesktop']);
    const go2Detail = () => {
      root.$router.push(`/nft/trade/${item.seq}`);
    };
    return {
      isDesktop,
      isNew,
      price,
      go2Detail,
    };
  },
  computed: {
    getDracoHost() {
      return process.env.VUE_APP_DRACO_HOST;
    },
  },
});
</script>
