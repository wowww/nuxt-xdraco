<template>
  <li @click="goDetail">
    <nft-info
      :character-name="item.characterName"
      :character-class="item.class"
      :world-name="item.worldName"
      :power-score="item.powerScore"
      :lv="item.lv"
      :nft-id="item.nftID"
      :reinforce="item.Reinforce"
    />
    <dl class="price">
      <dt>{{ $t('t.exd.purchased.price') }}</dt>
      <dd>
        <strong class="ico-wemixcredit ico-ss add-inside"
          ><span>{{ item.price | currency(0) }}</span></strong
        >
      </dd>
    </dl>
    <dl class="date">
      <dt>{{ $t('w.exd.seller') }}</dt>
      <dd>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ item.seller.userAddress | truncateMiddle }}</span>
          </template>
          <span>{{ item.seller.userAddress }}</span>
        </v-tooltip>
        <!--        <div class="char-info">-->
        <!--          <div class="thumb">-->
        <!--            <character-class-thumb :character-class="item.class" :size="48" />-->
        <!--          </div>-->
        <!--          <div class="info">-->
        <!--            <strong class="nick">{{ item.seller.characterName }}</strong>-->
        <!--            <span class="server">Lv.{{ item.seller.lv }} {{ item.seller.worldName }}</span>-->
        <!--          </div>-->
        <!--        </div>-->
      </dd>
    </dl>
    <dl class="date">
      <dt>{{ $t('t.exd.tx.date') }}</dt>
      <dd>{{ item.tradeDT | fromNow }}</dd>
    </dl>
    <div class="scope">
      <a :href="`https://scope.wemixnetwork.com/1003/nft/0xc234e58cb077ccf4fbe57d3ac27db0d1cdfe0473/${item.nftID}`" target="_blank"></a>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import NftInfo from '~/components/nft/NftInfo';

export default defineComponent({
  name: 'NftRecentItem',
  components: { NftInfo },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    openCard: {
      type: Function,
      default: () => {},
    },
  },
  setup({ item }, { root }) {
    const goDetail = () => {
      root.$router.push(`/nft/trade/${item.seq}`);
    };
    return {
      goDetail,
    };
  },
});
</script>
