<template>
  <nav id="gnb" class="mobile-nav__gnb">
    <div>
      <v-list class="mobile-nav__gnb__list">
        <v-list-item-group color="primary">
          <div v-for="(item, i) in items" :key="i" class="mobile-nav__gnb__list__item">
            <v-list-item active="false" :to="item.to" :href="item.href" :target="item.target" :class="{ 'v-item--new': item.new }" @click="$emit('close')">
              <span class="text" :class="item.name">{{ item.name }}</span>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </div>
    <div>
      <ul class="mobile-nav__gnb__list--external">
        <li>
          <a :href="getDracoHost" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/mobile/header/link-draco.webp" width="118" alt="Hydra &amp; Draco" />
          </a>
        </li>
        <li>
          <a href="https://mir4global.com" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/mobile/header/bi-mir4.webp" width="56" alt="MIR4" />
          </a>
        </li>
        <li>
          <a href="https://wemixnetwork.com" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/mobile/header/bi-wemix.webp" width="67" alt="WEMIX" />
          </a>
        </li>
        <li>
          <a href="https://discord.gg/mir4global" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/mobile/header/bi-discord.webp" height="14" alt="DISCORD" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/mir4xdraco" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/mobile/header/icon-twitter.svg" width="20" alt="Twitter" />
            <span>@mir4xdraco</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
  setup(props, { root }) {
    const items = [
      {
        to: '/',
        name: 'home',
      },
      {
        to: '/coin',
        name: 'coin',
      },
      {
        to: '/exd/list',
        name: 'exd',
      },
      {
        to: '/collectibles',
        name: 'collectible',
      },
      {
        to: '/nft/list',
        name: 'nft',
      },
      {
        to: '/dsp/rounds',
        name: 'dsp',
      },
      {
        to: '/hsp',
        name: 'hsp',
        // new: true,
      },
      {
        to: '/mirage',
        name: 'mirage',
      },
      {
        to: '/inventory',
        name: 'inventory',
      },
    ];

    const selectedItem = computed(() => items.findIndex((item) => root.$route.path.includes(item.name)));

    return {
      items,
      selectedItem,
    };
  },
  computed: {
    getDracoHost() {
      return process.env.VUE_APP_DRACO_HOST;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/mobile/_nav';
</style>
