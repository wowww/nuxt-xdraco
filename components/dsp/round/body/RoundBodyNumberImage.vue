<template>
  <div class="number-image" :class="{ 'number-image--smaller': smaller }"></div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundBodyNumberImage',
  props: {
    targetValue: {
      type: Number,
      required: true,
    },
    smaller: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    arrayDom: [],
  }),
  beforeMount() {
    this.arrayDom = this.getReplaceArray();
  },
  mounted() {
    this.insertDom(this.arrayDom);
  },
  methods: {
    getReplaceArray() {
      const step1 = Number(this.targetValue).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      const step2 = step1.split('');
      const step3 = step2.map((x) => {
        const className = x === ',' ? `comma` : `num${x}`;
        return `<span class="${className}">${x}</span>`;
      });

      return step3;
    },
    insertDom(target) {
      for (let i = 0; i < target.length; i += 1) {
        this.$el.insertAdjacentHTML('beforeend', target[i]);
      }
    },
  },
});
</script>


