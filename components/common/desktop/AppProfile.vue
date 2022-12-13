<template>
  <v-menu attach="#header" content-class="profile-header" offset-y>
    <template #activator="{ on, attrs }">
      <button v-if="accessToken" type="button" class="btn-login" data-get-activity="true" v-bind="attrs" v-on="on">
        <span class="text">
          <template v-if="exist === 1 && represent && represent.characterName">{{ represent.characterName }}</template>
          <template v-else>{{ `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}` }}</template>
        </span>
        <span class="thumbs">
          <character-class-thumb v-if="represent.characterName" :character-class="represent.class" :size="32" />
          <img v-else src="https://file.mir4global.com/xdraco/img/common/profile/thumb-no-character.webp" width="32" alt="" />
        </span>
      </button>
      <button v-else type="button" class="btn-login" @click="login">
        <span class="text">Login</span>
        <span class="thumbs"></span>
      </button>
    </template>

    <v-list class="profile-header__list">
      <v-list-item-group color="primary">
        <v-list-item @click="openAccountModal(0)">
          <span class="text">{{ $t('w.rounds.my.character') }}</span>
        </v-list-item>
        <v-list-item @click="openAccountModal(1)">
          <span class="text">{{ $t('w.rounds.my.wallet') }}</span>
        </v-list-item>
        <v-list-item @click="openAccountModal(2)">
          <span class="text">{{ $t('w.rounds.activity') }}</span>
        </v-list-item>
        <v-list-item class="emp" @click="logOut">
          <span class="text">Logout</span>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useState, useMutations } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import { useWemixLogin } from '@/utils/composables/round';

const { useState: useAccountState, useMutations: useAccountMutations } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'AppProfile',
  components: {
    CharacterClassThumb,
  },
  setup(_, { root }) {
    const { accessToken, dracoAccessToken, walletAddress } = useState(['accessToken', 'dracoAccessToken', 'walletAddress']);
    const { setOpenLogin, setOpenDracoLogin } = useMutations(['setOpenLogin', 'setOpenDracoLogin']);
    const { logOut } = useActions(['logOut']);
    const { wemixLogin } = useWemixLogin(root);

    const { open, active, represent, exist } = useAccountState(['open', 'active', 'represent', 'exist']);
    const { setOpen, setActive } = useAccountMutations(['setOpen', 'setActive']);

    const openAccountModal = (tabIdx) => {
      setActive(tabIdx);
      setOpen(true);
    };

    return {
      accessToken,
      dracoAccessToken,
      walletAddress,
      setOpenLogin,
      setOpenDracoLogin,
      logOut,
      openAccountModal,
      represent,
      exist,
      wemixLogin,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    isShowLoginLayer: false,
  }),
  methods: {
    login() {
      this.$store.dispatch('wemix/login');
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/desktop/profile';
</style>
