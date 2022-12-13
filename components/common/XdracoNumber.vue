<template>
  <span :class="classNames" v-html="formattedCurrency(value, { decimalPoint, prefix, suffix })"></span>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { formattedCurrency } from '@/utils/filters/numeric';

export default defineComponent({
  name: 'XdracoNumber',
  props: {
    classNames: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    decimalPoint: {
      type: Number,
      default: 4,
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      formattedCurrency,
    };
  },
});
</script>
