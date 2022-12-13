<template>
  <v-chip outlined label @click="$emit('click')">
    <slot />
    <img src="https://file.mir4global.com/xdraco/img/desktop/dsp/ico-close.webp" />
  </v-chip>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NftListFilterChip',
});
</script>


