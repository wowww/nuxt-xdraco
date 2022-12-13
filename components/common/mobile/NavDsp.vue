<template>
  <div class="subnav">
    <div class="wrap-sub">
      <v-list id="navDsp" class="nav-dsp">
        <!-- <v-list-item-group v-model="selectedItem"> -->
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" active="false" :to="item.path">
            <span class="text" :class="item.name">{{ item.name }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'FlipCountup',
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    items: [
      {
        path: '/rounds',
        name: 'DSP Rounds',
      },
      {
        path: '/playbook',
        name: 'DSP Playbook',
      },
    ],
    // selectedItem: 0,
  }),
});
</script>
