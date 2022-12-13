<template>
  <div class="mirage-notice-inlist">
    <p class="message" v-html="$t('s.mirage.lock-up')"></p>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MirageLockNotice',
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-notice-inlist';
</style>
