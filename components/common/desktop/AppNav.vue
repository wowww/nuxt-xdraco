<template>
  <nav id="gnb" class="gnb">
    <div class="gnb__left">
      <h1 class="gnb__bi">
        <nuxt-link to="/" class="link">XDRACO</nuxt-link>
      </h1>
      <v-list class="gnb__list">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :class="{ 'v-item--active': $route.path.startsWith(item.path), 'v-item--new': item.new }"
            :to="item.to"
            :href="item.href"
            :target="item.target"
          >
            <span class="text" :class="item.name">{{ item.name }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
<!--      <NavUi v-if="isDevelopment"></NavUi>-->
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted, watch, reactive, toRefs } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";
// import NavUi from '@/components/common/desktop/NavUi';

export default defineComponent({
  name: 'XdracoNav',
  components: {
    // NavUi,
  },
  setup() {
    const state = reactive({
      items: [
        {
          to: '/coin',
          name: 'coin',
          path: '/coin',
        },
        {
          to: '/exd/list',
          name: 'exd',
          path: '/exd',
        },
        {
          to: '/collectibles',
          name: 'collectible',
          path: '/collectible',
        },
        {
          to: '/nft/list',
          name: 'nft',
          path: '/nft',
        },
        {
          to: '/mirage',
          name: 'mirage',
          path: '/mirage',
          new: false,
        },
        {
          to: '/hsp',
          name: 'hsp',
          path: '/hsp',
          // new: true,
        },
        {
          to: '/dsp/rounds',
          name: 'dsp',
          path: '/dsp',
        },
      ],
    });

    const { hasInventory } = useState(['hasInventory']);

    onMounted(() => {
      if(hasInventory.value) {
        state.items.push({
          to: '/inventory',
          name: 'inventory',
          path: '/inventory',
        });
      }
    });

    watch(() => hasInventory.value,
      () => {
      if(hasInventory.value) {
        state.items.push({
          to: '/inventory',
          name: 'inventory',
          path: '/inventory',
        });
      } else {
        state.items.pop({
          to: '/inventory',
          name: 'inventory',
          path: '/inventory',
        });
      }
    });

    return {
      ...toRefs(state),
    };
  },
  data: () => ({
    isDevelopment: process.env.VUE_APP_DRACO_ENV !== 'production',
  }),
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/desktop/nav';
</style>
