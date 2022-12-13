<template>
  <div class="item__layer">
    <div class="wrap-item">
      <img
        v-if="nftClass === 1"
        :src="`https://file.mir4global.com/xdraco/img/common/card/warrior-grade${nftGrade}.webp`"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 2"
        :src="`https://file.mir4global.com/xdraco/img/common/card/sorcerer-grade${nftGrade}.webp`"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 3"
        :src="`https://file.mir4global.com/xdraco/img/common/card/taoist-grade${nftGrade}.webp`"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 4"
        :src="`https://file.mir4global.com/xdraco/img/common/card/arbalist-grade${nftGrade}.webp`"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
      <img
        v-if="nftClass === 5"
        :src="`https://file.mir4global.com/xdraco/img/common/card/lancer-grade${nftGrade}.webp`"
        class="item"
        :width="size"
        :alt="`${nftClass}-${nftGrade}`"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftIcon',
  props: {
    nftClass: {
      type: Number,
      default: 0,
    },
    nftGrade: {
      type: Number,
      default: 2,
    },
    size: {
      type: Number,
      default: 56,
    },
  },
});
</script>


