<template>
  <div class="round__number">
    <span class="round__number__name">ROUND</span>
    <strong class="round__number__value">{{ value }}</strong>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DspRoundNumber',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
});
</script>
