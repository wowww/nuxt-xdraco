<template>
  <div class="item-ranking nft-ranking">
    <div v-if="rank > 0" class="item-ranking__rank">
      <em class="number">{{ rank }}</em>
      <template v-if="rank % 10 === 1">st</template>
      <template v-else-if="rank % 10 === 2">nd</template>
      <template v-else-if="rank % 10 === 3">rd</template>
      <template v-else>th</template>
    </div>
    <nuxt-link :to="`/nft/trade/${item.info.seq}`">
      <nft-card
        :item="{
          ...item.info,
          seller: item.seller,
        }"
        non-flipped
      />
    </nuxt-link>
    <div class="item-ranking__content">
      <div class="item-ranking__name">
        <div class="item-name">{{ item.info.characterName }}</div>
        <div class="item-category">{{ item.info.worldName }}</div>
      </div>
      <div class="wrap-define-detail">
        <dl class="define-detail">
          <dt>{{ $t(`w.rounds.item.class.${item.info.class}`) }}</dt>
          <dd>
            <character-class-thumb :character-class="item.info.class" size="40" type="icon" />
          </dd>
        </dl>
        <dl class="define-detail">
          <dt>{{ $t('w.rounds.level') }}</dt>
          <dd>{{ item.info.lv }}</dd>
        </dl>
        <dl class="define-detail">
          <dt>{{ $t('t.exd.power.score') }}</dt>
          <dd>{{ item.info.powerScore | currency(0) }}</dd>
        </dl>
      </div>
      <div class="wrap-define-trade">
        <dl class="define-trade price">
          <dt>{{ $t('t.exd.purchased.price') }}</dt>
          <dd class="price">{{ item.info.price | currency(0) }}</dd>
        </dl>
        <dl class="define-trade seller">
          <!--          <dd class="character">-->
          <!--            <character-class-thumb :character-class="item.seller.class" :size="32" />-->
          <!--          </dd>-->
          <dt>{{ $t('w.exd.seller') }}</dt>
          <dd>
            <span>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ item.seller.userAddress | truncateMiddle }}</span>
                </template>
                <span>{{ item.seller.userAddress }}</span>
              </v-tooltip>
            </span>
          </dd>
        </dl>
        <dl class="define-trade">
          <dt>{{ $t('t.exd.tx.date') }}</dt>
          <dd>{{ item.info.tradeDT | fromNow }}</dd>
        </dl>
        <ul class="define-scorp">
          <li>
            <a :href="`https://scope.wemixnetwork.com/1003/nft/0xc234e58cb077ccf4fbe57d3ac27db0d1cdfe0473/${item.info.nftID}`" target="_blank"
              >WEMIX SCOPE</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import CharacterClassThumb from '~/components/common/CharacterClassThumb';
import NftCard from '~/components/nft/NftCard';

export default defineComponent({
  name: 'NftTopTradedItem',
  components: {
    CharacterClassThumb,
    NftCard,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    rank: {
      type: Number,
      default: 0,
    },
  },
});
</script>
