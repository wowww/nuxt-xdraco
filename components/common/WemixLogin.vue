<template>
  <div :class="{ 'login no-gutter': !isDesktop, login__box: isDesktop }">
    <p :class="{ 'mb-6': !isDesktop, message: isDesktop }">{{ $t('s.price.login.message') }}</p>
    <a class="login--button" @click="login">
      <img v-if="!isDesktop" src="https://file.mir4global.com/xdraco/img/desktop/price/bi-wemix.webp" width="119" alt="WEMIX" />
      <img v-else src="https://file.mir4global.com/xdraco/img/mobile/price/bi-wemix.webp" width="119" alt="WEMIX" />
      <span class="login--text">Login</span>
    </a>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { mapActions, mapGetters, mapMutations } from 'vuex';

import { useState } from "vuex-composition-helpers/dist";
import { useWemixLogin } from '@/utils/composables/round';

export default defineComponent({
  name: 'WemixLogin',
  setup(_, { root }) {
    const { isDesktop } = useState(['isDesktop']);
    return {
      isDesktop,
      ...useWemixLogin(root),
    };
  },
  data: () => ({
    dialog: null,
    url: `${process.env.VUE_APP_WEMIX_AUTH_ENTRY_POINT}`,
    iframe: null,
    listenerCount: 0,
    listener: null,
  }),
  computed: {
    ...mapGetters(['accessToken']),
    authUrl() {
      const redirectUri = `${window.location.protocol}//${window.location.host}${this.$router.currentRoute.path}`;
      return `${this.url}${redirectUri}`;
    },
  },
  methods: {
    ...mapMutations(['setAccessToken']),
    ...mapActions(['postLogin', 'fetchBalance']),
    login() {
      this.$store.dispatch('wemix/login');
    },
    loginPopup() {
      if (this.iframe === null || this.iframe === undefined) {
        const auth = document.createElement('iframe');

        this.iframe = auth;
        auth.className = 'draco-wemix-login-popup';
        auth.src = `${process.env.VUE_APP_WEMIX_AUTH_ENTRY_POINT}/run`;
        auth.style.width = '100%';
        auth.style.minWidth = '100%';
        auth.style.maxWidth = '100%';
        auth.style.height = '100%';
        auth.style.borderStyle = 'none';
        document.body.appendChild(auth);
        if (this.listenerCount === 0) {
          window.addEventListener('message', this.authListener);
          console.log('ready to listen message');
        }
        this.listenerCount += 1;
      } else {
        this.iframe.style.display = 'block';
      }

      disableBodyScroll(this.iframe);
    },
    authListener(e) {
      if (e.origin === this.url) {
        if (e.data.Result === 0) {
          const token = e.data.m_AccessToken;
          this.setAccessToken(token);
          this.postLogin();
          this.fetchBalance();
        } else if (e.data.name === '_closeModal') {
          this.dialog = false;
          enableBodyScroll(this.iframe);
        }
      }
    },
  },
  mounted() {
    window.addEventListener('message', this.authListener);
  },
  destroyed() {
    if (this.iframe) {
      this.iframe.style.display = 'none';
      this.iframe.remove();
    }
    // if (this.listenerCount > 0) {
    window.removeEventListener('message', this.authListener);
    // }
  },
});
</script>

<style lang="scss">
.draco-wemix-login-popup {
  width: 100%;
  height: 100%;
}
</style>
