<template>
  <button type="button" class="btn" disabled="disabled">
    <span class="btn-message">
      {{ preStartDate | dfFromTimestamp($t('w.rounds.date.format'), 'w.rounds.pre.stake.date.format') }}
    </span>
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundFooterButtonUpcoming',
  props: {
    preStartDate: Number,
  },
});
</script>
