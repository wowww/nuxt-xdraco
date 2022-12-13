<template>
  <dl class="display-price">
    <dt>{{ $t('t.home.derby') }}</dt>
    <dd>
      <span v-if="isShowSymbol" class="symbol">
        <img src="https://file.mir4global.com/xdraco/img/desktop/symbol-draco.webp" width="56" alt="DRACO" />
        <span>{{ valueShowSymbol }}</span>
        <span class="eqaul">=</span>
      </span>
      <span class="amount"> -- </span>
      <sup class="sup">DS</sup>
      <span class="change"> -- </span>
      <!-- <span class="change minus">-3</span> -->
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
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
