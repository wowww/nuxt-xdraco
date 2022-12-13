<template>
  <div class="item-manual">
    <h2 class="item-manual__title">{{ item.itemName || item.name || '' }}</h2>
    <h3 class="item-manual__subtitle">{{ $t(`w.exd.item-type.${item.itemType}`, [$t(`w.rounds.item.class.${item.class}`)]) }}</h3>
    <ul class="item-manual__detail">
      <li class="rank">
        <span>{{ $t('w.common.item.grade') }}</span>
        <strong v-if="item.grade === 5" class="legendary">{{ $t('w.rounds.item.grade.5') }}</strong>
        <strong v-else-if="item.grade === 4" class="epic">{{ $t('w.rounds.item.grade.4') }}</strong>
        <strong v-else-if="item.grade === 3" class="rare">{{ $t('w.rounds.item.grade.3') }}</strong>
        <strong v-else-if="item.grade === 2" class="uncommon">{{ $t('w.rounds.item.grade.2') }}</strong>
      </li>
      <li v-if="['2', '3', '4', '20'].includes(item.itemType && item.itemType.split('_')[0])" class="tire">
        <span>{{ $t('w.common.item.tier') }}</span>
        <strong>{{ item.tier | roman }}</strong>
      </li>
      <li v-if="['2', '3', '4', '20'].includes(item.itemType && item.itemType.split('_')[0])" class="enhance">
        <span>{{ $t('w.common.item.enhance') }}</span>
        <strong>+ {{ item.enhance }}</strong>
      </li>
      <li v-if="item.uniqueNo" class="sncode">
        <span>{{ $t('w.exd.unique.no') }}</span>
        <strong>{{ item.uniqueNo || '-' }}</strong>
      </li>
    </ul>
    <ul v-if="showType == 'noprice'" class="item-manual__detail">
      <li class="rank">
        <span>Rank</span>
        <strong v-if="item.grade == 5" class="legendary">LEGENDARY</strong>
        <strong v-if="item.grade == 4" class="epic">EPIC</strong>
        <strong v-if="item.grade == 3" class="rare">RARE</strong>
        <strong v-if="item.grade == 2" class="rare">UNCOMMON</strong>
      </li>
      <li class="tire">
        <span>Tier</span>
        <strong>IV</strong>
      </li>
      <li class="enhance">
        <span>Enhance</span>
        <strong>+10</strong>
      </li>
    </ul>
    <ul v-if="showType == 'allrank'" class="item-manual__detail">
      <li class="rank">
        <span>Rank</span>
        <strong class="legendary">LEGENDARY</strong>
      </li>
      <li class="rank">
        <span>Rank</span>
        <strong class="epic">EPIC</strong>
      </li>
      <li class="rank">
        <span>Rank</span>
        <strong class="rare">RARE</strong>
      </li>
      <li class="tire">
        <span>Tier</span>
        <strong>IV</strong>
      </li>
      <li class="enhance">
        <span>Enhance</span>
        <strong>+10</strong>
      </li>
    </ul>
    <ul v-if="showType == 'rankonly'" class="item-manual__detail">
      <li class="rank">
        <span>Rank</span>
        <strong v-if="rankType == 'legendary'" class="legendary">LEGENDARY</strong>
        <strong v-if="rankType == 'epic'" class="epic">EPIC</strong>
        <strong v-if="rankType == 'rare'" class="rare">RARE</strong>
      </li>
    </ul>

    <div class="item-manual__desc" v-html="item.itemNote" />
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ExchangeItemDescription',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    showType: {
      type: String,
      default: '',
    },
  },
  setup({ item }) {
    const itemType = computed(() => item.itemType && item.itemType.split('_'));
    const hasEnhance = computed(() => ['2', '3', '4', '20'].includes(itemType.value[0]));
    const hasPowerScore = computed(() => ['2', '3', '4', '8', '20'].includes(itemType.value[0]));

    return {
      hasEnhance,
    };
  },
});
</script>
