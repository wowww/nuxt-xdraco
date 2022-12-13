<template>
  <li>
    <img v-if="option.optionIconPath" :src="option.optionIconPath" :alt="option.optionName" :width="32" />
    <span class="skill-desc" v-html="option.optionName"></span>
    <strong v-if="option.optionValue && (option.tranceValue || option.optionTranceStep)">{{ itemValue }}{{ option.optionAddFormat || option.optionFormat }}</strong>
    <strong v-else-if="option.optionValue" class="rate">{{ option.optionValue }}{{ option.optionAddFormat || option.optionFormat }}</strong>
  </li>
</template>

<script>
import BigNumber from 'bignumber.js';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ItemOption',
  props: {
    option: {
      type: Object,
      default: () => ({
        optionName: '',
        optionValue: '',
        optionIconPath: '',
      }),
    },
  },
  computed: {
    itemValue() {
      return new BigNumber(this.option.optionValue).plus(this.option.tranceValue || this.option.optionTranceStep);
    },
  },
});
</script>
