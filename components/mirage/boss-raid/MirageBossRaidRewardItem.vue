<template>
  <div class="item-info" :data-item-type="`grade-${item ? item.grade : '2'}`">
    <item-icon
      v-if="item"
      :grade="item.grade"
      :img-path="item.imgPath || item.itemPath"
      :name="item.itemName || item.name"
      :unique-no="`${item.uniqueNo || ''}`"
    />
    <div v-else-if="itemIdx == '0'" class="item__layer">
      <span class="by-what draco"></span>
      <div class="item-info__img">
        <img src="https://file.mir4global.com/xdraco/img/common/mirage-playbook/img-mirage-scroll.webp" alt="mirage scroll" />
      </div>
    </div>
    <div v-if="!hideLabel && item" class="item-info__desc">
      <div class="item-category">{{ $t(`w.exd.item-type.${item.itemType}`, [item.class > 0 ? $t(`w.rounds.item.class.${item.class}`) : '']) }}</div>
      <div class="item-name">{{ item.itemName }}</div>
    </div>
    <div v-else-if="!hideLabel && fallbackItem" class="item-info__desc">
      <div class="item-category">{{ fallbackItem.category }}</div>
      <div class="item-name">{{ fallbackItem.itemName }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import ItemIcon from '@/components/exd/common/ItemIcon';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidRewardItem',
  components: { ItemIcon },
  props: {
    itemIdx: {
      type: String,
      default: '0',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    fallbackItem: {
      type: Object,
      default: null,
    },
  },
  setup({ itemIdx }) {
    const state = reactive({
      loading: false,
    });

    const { useMirageState, useMirageActions } = useMirageStore();
    const { items } = useMirageState(['items']);
    const { fetchItem } = useMirageActions(['fetchItem']);

    const item = computed(() => {
      return items.value.find((i) => i.itemID === itemIdx);
    });

    onMounted(() => {
      fetchItem(itemIdx);
    });

    return {
      ...toRefs(state),
      item,
    };
  },
});
</script>


