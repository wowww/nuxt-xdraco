<template>
  <div class="list-bar">
    <div class="list-bar__title">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftListSectionTitle',
});
</script>


