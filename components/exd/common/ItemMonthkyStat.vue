<template>
  <div class="item-transprice">
    <span>{{ title }}</span>
    <div class="wrap-price">
      <div class="price">
        <strong class="month">{{ value | currency(0) }}</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ItemMonthlyStat',
  props: {
    title: {
      type: String,
    },
    value: {
      type: Number,
    },
  },
});
</script>


