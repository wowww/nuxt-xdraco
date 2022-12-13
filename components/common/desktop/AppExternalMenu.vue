<template>
  <!-- <v-menu attach="#header" content-class="extra-menu" :value="openNavMore" offset-y> -->
  <v-menu attach="#header" content-class="extra-menu" offset-y>
    <template #activator="{ on, attrs }">
      <button type="button" class="btn-open-list btn-extra-menu" v-bind="attrs" v-on="on" @click="setOpenNavMore">
        <span>Toggle Nav More</span>
      </button>
    </template>
    <v-list class="extra-menu__list">
      <v-list-item-group class="" color="primary">
        <v-list-item href="https://cs.mir4global.com/customer?category=191" target="_blank">
          <span class="wrap-menu">
            <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/icon-contact-us.svg" height="25" alt="contact us" />
            <em class="menu-string">Customer Service</em>
          </span>
        </v-list-item>
        <v-list-item href="https://mir4global.com" target="_blank">
          <span class="wrap-menu">
            <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/bi-mir4-header.webp" height="23" alt="MIR4" />
          </span>
        </v-list-item>
        <v-list-item href="https://wemixnetwork.com" target="_blank">
          <span class="wrap-menu">
            <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/bi-wemix.webp" height="22" alt="WEMIX" />
          </span>
        </v-list-item>
        <v-list-item href="https://discord.gg/mir4global" target="_blank">
          <span class="wrap-menu">
            <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/bi-discord.webp" height="18" alt="Discord" />
          </span>
        </v-list-item>
        <v-list-item href="https://twitter.com/mir4xdraco" target="_blank">
          <span class="wrap-menu small">
            <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/icon-twitter.svg" height="20" alt="Twitter" />
            <em class="menu-string">@mir4xdraco</em>
          </span>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useState, useMutations } from 'vuex-composition-helpers/dist';

const { useState: useAccountState, useMutations: useAccountMutations } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'AppExternalMenu',
  components: {
    //
  },
  setup() {
    const { accessToken, dracoAccessToken, openNavMore } = useState(['accessToken', 'dracoAccessToken', 'openNavMore']);
    const { setOpenLogin, setOpenDracoLogin, setOpenNavMore } = useMutations(['setOpenLogin', 'setOpenDracoLogin', 'setOpenNavMore']);
    const { logOut } = useActions(['logOut']);

    const { open, active, represent } = useAccountState(['open', 'active', 'represent']);
    const { setOpen, setActive } = useAccountMutations(['setOpen', 'setActive']);

    const openAccountModal = (tabIdx) => {
      setActive(tabIdx);
      setOpen(true);
    };

    return {
      accessToken,
      dracoAccessToken,
      openNavMore,
      setOpenLogin,
      setOpenDracoLogin,
      setOpenNavMore,
      logOut,
      openAccountModal,
      represent,
    };
  },
  data: () => ({
    isDevelopment: process.env.VUE_APP_DRACO_ENV !== 'production',
  }),
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/desktop/extra-menu';
</style>
