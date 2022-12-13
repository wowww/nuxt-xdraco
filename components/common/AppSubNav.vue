<template>
  <div class="subnav" :class="[subNav, $route.path === '/coin/drain' && 'light', isDesktop ? 'subnav--detail' : 'subnav--simple']">
    <div class="wrap-sub">
      <nuxt-link class="logo" :to="'/' + subNav">
        <em class="hidden">{{ subNav }}</em>
      </nuxt-link>

      <v-list id="navDsp" class="nav-dsp">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.path"
            :disabled="item.disabled"
          >
            <span class="text" :class="item.name && item.name.toLowerCase()">{{ $t(item.name) }}</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import { useState, useActions } from 'vuex-composition-helpers/dist';

// for EXCHANGE
const exchangeMenu = [
  {
    app: 'exd',
    path: '/exd/list',
    name: 'w.exd.nav.exd',
    auth: false,
    active: ['/exd/list', '/exd/trade', '/exd/item', '/exd/suggested', '/exd/history'],
  },
  {
    path: '/exd/my-items',
    name: 'w.exd.nav.my-items',
    auth: true,
    active: ['/exd/my-items', '/exd/my-item'],
  },
  {
    path: '/exd/playbook',
    name: 'w.rounds.playbook',
    auth: false,
  },
];

// for DSP
const dspMenu = [
  {
    app: 'dsp',
    path: '/dsp/rounds',
    name: 't.playbook.section3',
  },
  {
    path: '/dsp/playbook',
    name: 'w.rounds.playbook',
  },
];

// for HSP
const hspMenu = [
  {
    app: 'hsp',
    path: '/hsp/stake',
    name: 't.hsp.main.dialog.stake',
  },
  {
    path: '/hsp/playbook',
    name: 'w.rounds.playbook',
    // disabled: true,
  },
];

const nftMenu = [
  {
    app: 'nft',
    path: '/nft/list',
    auth: false,
    name: 'Character NFT',
    active: ['/nft/list', '/nft/trade', '/ntf/item', '/ntf/suggested', '/exd/history'],
  },
  // {
  //   app: 'nft',
  //   path: '/nft/my-items',
  //   auth: true,
  //   name: 'My NFT',
  // },
  {
    path: '/nft/playbook',
    auth: false,
    name: 'w.rounds.playbook',
  },
];

// for Mirage
const mirageMenu = [
  {
    app: 'mirage',
    path: '/mirage/dashboard',
    // name: 't.mirage.page.battle',
    name: 'Battle',
    auth: false,
  },
  {
    path: '/mirage/my',
    name: 'My MIRAGE',
    auth: true,
    // name: 't.mirage.page.my-mirage',
    // disabled: true,
  },
  {
    path: '/mirage/playbook',
    name: 'Playbook',
    // name: 't.mirage.page.playbook',
    auth: false,
    // disabled: true,
  },
  {
    path: '/mirage/MiraX',
    name: 'MiraX',
    auth: false,
    // disabled: true,
  },
];

// for Coin
const coinMenu = [
  {
    app: 'coin',
    path: '/coin/price',
    name: 'PRICE',
    // name: 't.coin.page.battle',
    auth: false,
    // disabled: true,
  },
  {
    path: '/coin/hydra',
    name: 'HYDRA',
    // name: 't.coin.page.battle',
    auth: false,
    // disabled: true,
  },
  {
    path: '/coin/draco',
    name: 'DRACO',
    // name: 't.coin.page.battle',
    auth: false,
    // disabled: true,
  },
  {
    path: '/coin/drain',
    name: 'DRAIN',
    // name: 't.coin.page.battle',
    auth: false,
    // disabled: true,
  },
  {
    path: '/coin/hydrapayments',
    name: 'HYDRA PAYMENTS',
    // name: 't.coin.page.battle',
    auth: false,
    // disabled: true,
  },
];

const inventoryMenu = [];

// for Collectible
const collectibleMenu = [];

export default defineComponent({
  name: 'AppSubNav',
  props: {
    subNav: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const { $route } = root;
    const { accessToken, isDesktop } = useState(['accessToken', 'isDesktop']);

    const items = ref([]);

    const selectItem = computed(() => {
      return items.value.findIndex((item) => item.active && item.active.findIndex((activeItem) => $route.path.startsWith(activeItem)) > -1);
    });

    const refreshItems = () => {
      switch (props.subNav) {
        case 'exd':
          items.value = [...exchangeMenu.filter((item) => (accessToken.value ? item.auth || !item.auth : !item.auth))];
          break;
        case 'dsp':
          items.value = [...dspMenu];
          break;
        case 'nft':
          items.value = [...nftMenu.filter((item) => (accessToken.value ? item.auth || !item.auth : !item.auth))];
          break;
        case 'collectibles':
          items.value = [...collectibleMenu];
          break;
        case 'hsp':
          items.value = [...hspMenu];
          break;
        case 'mirage':
          items.value = [...mirageMenu.filter((item) => (accessToken.value ? item.auth || !item.auth : !item.auth))];
          break;
        case 'coin':
          items.value = [...coinMenu];
          break;
        case 'inventory':
          items.value = [...inventoryMenu];
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      refreshItems();
    });

    watch(
      () => props.subNav,
      () => {
        refreshItems();
      },
    );

    watch(
      () => accessToken.value,
      () => refreshItems(),
    );

    return {
      isDesktop,
      items,
      selectItem,
    };
  },
});
</script>


