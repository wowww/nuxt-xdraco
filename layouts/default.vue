<template>
  <v-app id="app">
    <v-main>
      <div v-if="!isHiddenHeader">
        <common-header />
      </div>
      <v-container id="container" fluid>
        <Nuxt />
        <modal-account />
        <modal-wemix-login />
        <modal-common />
      </v-container>
      <common-footer />
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import Headroom from 'headroom.js/dist/headroom';
import CommonHeader from '@/components/common/desktop/AppHeader';

import ModalAccount from '@/components/common/modal/ModalAccount';
import ModalWemixLogin from '@/components/common/desktop/ModalWemixLogin';
import ModalCommon from '@/components/common/modal/ModalCommon';
import CommonFooter from '@/components/common/Footer';

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    CommonHeader,
    ModalAccount,
    ModalCommon,
    ModalWemixLogin,
    CommonFooter,
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
    isHiddenHeader() {
      return this.$route.meta.hideHeader;
    },
    optionsHeadroom() {
      return {
        offset: {
          up: 100,
          down: this.isMobile ? 100 : 130,
        },
      };
    },
  },
  created() {
    this.$store.dispatch('exd/fetchPrice');
    this.$store.dispatch('hsp/fetchPrice');

    if (this.accessToken) {
      this.$store.dispatch('account/fetchRepCharacter');
    }
    if (this.$store.state.dracoAccessToken && !this.$store.state.account.represent) {
      this.$store.dispatch('account/fetchUserCharacter');
    }
    if (this.$store.state.accessToken && !this.$store.state.balance) {
      this.$store.dispatch('fetchBalance');
    }
    if (this.$store.state.walletAddress && !this.$store.state.wemix.wallet) {
      this.$store.dispatch('wemix/walletLogin');
    }
  },
  mounted() {
    this.setHeadroom();
  },
  beforeMount: () => {
    setTimeout(() => {
      document.documentElement.classList.add('init-app');
    }, 10);
  },
  methods: {
    setHeadroom() {
      if (!document.querySelector('#header')) {
        return;
      }
      const target = document.querySelector('#header');
      this.headroom = new Headroom(target, this.optionsHeadroom);
      this.headroom.init();
    },
  },
});
</script>
