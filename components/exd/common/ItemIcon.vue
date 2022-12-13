<template>
  <div class="item__layer">
    <span class="by-what" :class="{ draco: uniqueNo === '', 'draco-nft': uniqueNo !== '' }"></span>
    <div class="item-info__img">
      <img :src="imgPath" class="item" width="48" :alt="name" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ItemIcon',
  props: {
    imgPath: {
      type: String,
    },
    name: {
      type: String,
      required: false,
      default: () => 'Shineworld Dragon Gloves',
    },
    uniqueNo: {
      type: String,
      default: '',
    },
  },
});
</script>


