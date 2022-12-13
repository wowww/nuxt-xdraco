<template>
  <div ref="section">
    <h3 class="title-sub-detail">
      {{ $t('t.nft.dragon.artifact') }}
    </h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div>
    <ul v-if="!loading && item.equipItem" class="character-dragon">
      <li
        v-for="(slot, slotIdx) in slots"
        :key="`grade-${slotIdx}`"
        :class="item.equipItem[slot] && item.equipItem[slot].grade ? `grade-${item.equipItem[slot].grade}` : ''"
      >
        <div class="bg">
          <img v-if="item.equipItem[slot] && item.equipItem[slot].itemPath" class="bg__item" :src="item.equipItem[slot].itemPath" alt="dragon-scepter" width="40"/>
          <img v-else class="bg__item--empty" :src="'https://file.mir4global.com/xdraco/img/common/nft-detail/img-dragon-' + type[slotIdx] + '.webp'" :alt="type[slotIdx]" width="80"/>
          <span v-if="item.equipItem[slot] && Number(item.equipItem[slot].tier) > 1" class="tier-badge">
            {{ Number(item.equipItem[slot].tier) | roman }}
          </span>
          <span v-if="item.equipItem[slot] && Number(item.equipItem[slot].enhance) > 0" class="grade">
            +{{ item.equipItem[slot].enhance }}
          </span>
        </div>
        <div class="desc">
          <span class="desc__name">
            {{ item.equipItem[slot] && item.equipItem[slot].itemName || '-' }}
          </span>
          <span class="desc__category">{{ $t(`w.nft.dragon.${type[slotIdx]}`) }}</span>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch} from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterGodDragon',
  setup(props, { root }) {
    const { item } = useNftState(['item']);
    const section = ref(null);

    const state = reactive({
      loading: false,
      type: ['scepter', 'cape', 'crown', 'seal', 'tome'],
      slots: [11, 12, 13, 14, 15],
    });

    return {
      section,
      item,
      ...toRefs(state),
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
