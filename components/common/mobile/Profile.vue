<template>
  <v-menu attach="#app .header" content-class="profile" origin="top right" nudge-top="-10" nudge-right="-198" offset-y offset-x>
    <template #activator="{ on, attrs }">
      <!-- Before Login -->
      <button v-if="!accessToken" type="button" class="btn-header account" data-get-activity="false" v-bind="attrs" v-on="on" @click="wemixLogin">
        My Account
      </button>

      <!-- After Login -->
      <template v-else>
        <!-- 사용자의 activity가 발생한 경우 data-get-activity="true" 어트리뷰트 설정 -->
        <button
          v-if="exist === 1 && represent && represent.characterName"
          type="button"
          class="btn-header account"
          data-get-activity="true"
          v-bind="attrs"
          v-on="on"
        >
          <character-class-thumb :character-class="represent.class" />
        </button>

        <button v-else type="button" class="btn-login" data-has-represent="false" v-bind="attrs" v-on="on">
          <span class="thumbs">
            <img src="https://file.mir4global.com/xdraco/img/common/profile/thumb-no-character.webp" width="32" alt="" />
          </span>
        </button>
      </template>
    </template>
    <v-list class="dropdown">
      <v-list-item-group class="dropdown__list" color="primary">
        <template v-if="dracoAccessToken">
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
        </template>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useState, useMutations } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '~/components/common/CharacterClassThumb';
import { useWemixLogin } from '~/utils/composables/round';

const { useState: useAccountState, useMutations: useAccountMutations } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'Profile',
  components: {
    CharacterClassThumb,
  },
  setup(_, { root }) {
    const { accessToken, dracoAccessToken } = useState(['accessToken', 'dracoAccessToken']);
    const { logOut } = useActions(['logOut']);

    const { exist, represent } = useAccountState(['exist', 'represent']);
    const { setOpen, setActive } = useAccountMutations(['setOpen', 'setActive']);

    const { wemixLogin } = useWemixLogin(root);

    const openAccountModal = (tabIdx) => {
      setActive(tabIdx);
      setOpen(true);
    };

    return {
      accessToken,
      dracoAccessToken,
      logOut,
      openAccountModal,
      exist,
      represent,
      wemixLogin,
    };
  },
});
</script>
