<template>
  <div class="item-info nft-info" :data-item-type="itemCategory">
    <div class="item__layer">
      <div class="item-info__img">
        <img src="https://file.mir4global.com/xdraco/img/common/card/taoist-grade4.webp" class="item" width="56" :alt="itemName" />
      </div>
    </div>
    <div v-if="showType != 'itemonly'" class="item-desc">
      <h4 class="item-info__name">
        strongwarrior
        <p class="item-info__desc">Pw.250,000 Lv.99 ASIA12</p>
        <p class="item-info__desc">NFT ID 100000240002</p>
      </h4>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftItemInfo',
  filters: {
    uppercase(value) {
      if (!value) return '';
      value = value.toString();
      return value.toUpperCase();
    },
  },
  props: {
    itemCategory: {
      type: String,
      required: false,
    },
    itemName: {
      type: String,
      required: false,
      default: () => 'Shineworld Dragon Gloves',
    },
    itemCount: {
      type: String,
      required: false,
    },
    snCode: {
      type: String,
      required: false,
    },
    showType: {
      type: String,
      required: false,
      default: () => 'itemall',
    },
  },
  data: () => ({
    number: 0,
  }),
  mounted() {
    this.randomNum();
  },
  methods: {
    randomNum() {
      const N = Math.floor(Math.random() * 6);
      this.number = N;
      // const type = ['legendary', 'epic', 'rare', 'uncommon', 'common', 'none'];
      const type = ['grade-5', 'grade-4', 'grade-3', 'grade-2', 'grade-1', 'grade-0'];
      this.itemType = type[N];
    },
  },
});
</script>
