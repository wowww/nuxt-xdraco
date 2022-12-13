<template>
  <v-dialog
    v-model="open"
    content-class="dialog-account"
    persistent
    :fullscreen="!isDesktop"
    :transition="!isDesktop ? 'scale-transition' : 'dialog-bottom-transition'"
  >
    <div class="content">
      <v-btn class="btn-close" fab plain x-small @click="setOpen(false)">
        <v-icon color="#000" size="26">mdi-close</v-icon>
      </v-btn>
      <div class="dialog-header">
        <h3 class="title">
          <strong>{{ $t('w.rounds.account.info') }}</strong>
        </h3>
      </div>
      <v-tabs v-model="active" class="tabs" grow>
        <v-tabs-slider></v-tabs-slider>
        <v-tab @click="setActive(0)">{{ $t('w.rounds.my.character') }}</v-tab>
        <v-tab @click="setActive(1)">{{ $t('w.rounds.my.wallet') }}</v-tab>
        <v-tab @click="setActive(2)">{{ $t('w.rounds.activity') }}</v-tab>
        <v-tabs-items v-model="active">
          <v-tab-item>
            <account-my-character />
          </v-tab-item>
          <v-tab-item>
            <account-my-wallet />
          </v-tab-item>
          <v-tab-item>
            <account-history />
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import AccountHistory from '@/components/account/AccountHistory';
import AccountMyCharacter from '@/components/account/AccountMyCharacter';
import AccountMyWallet from '@/components/account/AccountMyWallet';

const { useState, useMutations, useActions } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'ModalAccount',
  components: { AccountHistory, AccountMyWallet, AccountMyCharacter },
  setup() {
    const { open, active, represent, isDesktop } = useState(['open', 'active', 'represent', 'isDesktop']);
    const { setOpen, setActive, setSelectedWorldName } = useMutations(['setOpen', 'setActive', 'setSelectedWorldName']);
    const { fetchUserCharacter, fetchChannelUserCharacter } = useActions(['fetchUserCharacter', 'fetchChannelUserCharacter']);

    watch(
      () => open.value,
      () => {
        if (open.value) {
          if (represent.value && represent.value.worldName) {
            setSelectedWorldName([represent.value.worldName]);
          }
          fetchUserCharacter();
        }
      },
    );

    return {
      isDesktop,
      open,
      active,
      setOpen,
      setActive,
    };
  },
});
</script>
