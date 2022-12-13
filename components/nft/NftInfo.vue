<template>
  <div class="item-info nft-info" :data-item-type="`grade-${nftGrade}`" @click="go2detail(seq)">
    <nft-icon :nft-class="characterClass" :nft-grade="nftGrade" />
    <div class="item-info__desc" v-if="iconOnly === false">
      <div class="enhance__info">
        <h4 class="item-info__name">
          {{ characterName }}
        </h4>
        <em :data-character-reinforce="reinforce" class="enhance__info--level-num">
        +{{ reinforce || '0' }}
      </em>
      </div>
      <p class="sub">
        <span>PS.{{ powerScore | currency(0) }}</span> <span>Lv.{{ lv }} {{ worldName }}</span>
      </p>
      <h5 class="sncode">NFT ID {{ nftId }}</h5>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import NftIcon from '~/components/nft/NftIcon';

export default defineComponent({
  name: 'NftInfo',
  components: { NftIcon },
  props: {
    iconOnly: {
      type: Boolean,
      default: false,
    },
    characterClass: {
      type: Number,
      default: 0,
    },
    characterName: {
      type: String,
      default: '',
    },
    worldName: {
      type: String,
      default: '',
    },
    lv: {
      type: Number,
      default: 0,
    },
    powerScore: {
      type: Number,
      default: 0,
    },
    nftId: {
      type: String,
      default: '',
    },
    seq: {
      type: String,
      default: '',
    },
    reinforce: {
      type: String,
      default: '',
    },
  },
  computed: {
    nftGrade() {
      if (this.powerScore > 205000) {
        return 5;
      }

      if (this.powerScore > 170000) {
        return 4;
      }

      if (this.powerScore > 135000) {
        return 3;
      }

      return 2;
    },
  },
  setup(_, { root }) {
    const go2detail = (seq) => {
      if (seq) {
        root.$router.push(`/nft/trade/${seq}`);
      }
    };

    return {
      go2detail,
    };
  },
  mounted() {
    console.log("reinforce >>>> ", this.reinforce);
  },
});
</script>


