<template>
  <div class="item-info" :data-item-type="`grade-${item.grade}`">
    <item-icon
      :grade="item.grade"
      :img-path="item.imgPath || item.itemPath"
      :name="item.itemName || item.name"
      :unique-no="`${item.uniqueNo || ''}`"
    />
    <div v-if="showType !== 'itemonly'" class="item-info__desc">
      <div class="category">
        <span v-if="item.grade > 0" :class="`grade-${item.grade}`">
          <template v-if="item.grade == 5">LEGENDARY</template>
          <template v-else-if="item.grade == 4">EPIC</template>
          <template v-else-if="item.grade == 3">RARE</template>
          <template v-else-if="item.grade == 2">UNCOMMON</template>
        </span>
        <span class="tire">TIER {{ Number(item.tier) | roman }}</span>
      </div>
      <h4 class="item-info__name">
        {{ item.itemName || item.name || '' }}<em v-if="showEnhance && Number(item.enhance) > 0">+{{ item.enhance }}</em>
      </h4>
      <h5 v-if="item.uniqueNo" class="sncode">{{ $t('w.exd.unique.no.with-value', [item.uniqueNo || '-']) }}</h5>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@vue/composition-api';

import ItemIcon from '@/components/exd/common/ItemIcon';

export default defineComponent({
  name: 'ItemInfo',
  components: { ItemIcon },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    showEnhance: {
      type: Boolean,
      default: true,
    },
    showType: {
      type: String,
      required: false,
      default: () => 'itemall',
    },
    tradeUID: {
      type: String,
      default: '',
    },
    hideUniqueNo: {
      type: Boolean,
      default: false,
    },
    useInfo: {
      type: Boolean,
      default: false,
    },
  },
});
</script>


