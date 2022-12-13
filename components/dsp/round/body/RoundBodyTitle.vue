<template>
  <div class="round__title">
    <div class="round__title__category">
      <span v-if="item.grade === 3" class="round__title__category--rare">{{ $t('w.rounds.item.grade.3') }}</span>
      <span v-else-if="item.grade === 4" class="round__title__category--epic">{{ $t('w.rounds.item.grade.4') }}</span>
      <span v-else-if="item.grade === 5" class="round__title__category--legendary">{{ $t('w.rounds.item.grade.5') }}</span>
      <span class="round__title__category--tier">TIER {{ item.tier | roman }}</span>
    </div>
    <h4 class="round__title__item-name">
      {{ item.name }}<em v-if="item.enhance > 0">+{{ item.enhance }}</em>
    </h4>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundBodyTitle',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
});
</script>


