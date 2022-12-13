<template>
  <ul class="list-item" data-empty-message="This section will be updated soon"></ul>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    tabMystical: null,
  }),
});
</script>


