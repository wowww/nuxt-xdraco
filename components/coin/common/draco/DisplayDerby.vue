<template>
  <dl class="display-price">
    <dt>{{ $t('t.home.derby') }}</dt>
    <dd>
      <span v-if="isShowSymbol" class="symbol">
        <img src="https://file.mir4global.com/xdraco/img/desktop/symbol-draco.webp" width="56" alt="DRACO" />
        <span>{{ valueShowSymbol }}</span>
        <span class="eqaul">=</span>
      </span>
      <span class="amount">{{ ds | currency(0) }}</span>
      <sup class="sup">DS</sup>
      <span class="change" :class="{ plus: bonus > 0, minus: bonus < 0 }">
        <template v-if="bonus === 0">+{{ Number(bonus).toFixed(0) }}</template>
        <template v-if="bonus > 0">+{{ Number(bonus).toFixed(0) }}</template>
      </span>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    ds: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
      required: true,
    },
    isShowSymbol: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    valueShowSymbol: {
      type: Number,
      required: false,
      default: () => 1,
    },
  },
};
</script>
