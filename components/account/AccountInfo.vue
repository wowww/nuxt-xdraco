<template>
  <div class="account-info">
    <template v-if="!accessToken">
      <div class="wrap-signin">
        <div class="info-char">
          <div class="char">
            <div class="wrap-thumb-profile by-wemix">
              <span class="base-profile" />
            </div>
          </div>
        </div>
        <span class="desc" v-html="$t('s.rounds.login-wemix')" />
        <div class="wrap-button">
          <button type="button" class="btn btn-wemix-login btn-sm btn-max" @click="login">LOGIN</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="wrap-member">
        <v-menu offset-y left>
          <template #activator="{ on, attrs }">
            <button type="button" class="btn-more" :class="{ active: openMore }" v-bind="attrs" v-on="on">
              <em class="hidden">MyAccount More</em>
            </button>
          </template>
          <v-list class="dropdown">
            <v-list-item-group class="dropdown__list" color="primary">
              <v-list-item @click="openAccount(0)">
                <span class="text">{{ $t('w.rounds.my.character') }}</span>
              </v-list-item>
              <v-list-item @click="openAccount(1)">
                <span class="text">{{ $t('w.rounds.my.wallet') }}</span>
              </v-list-item>
              <v-list-item @click="openAccount(2)">
                <span class="text">{{ $t('w.rounds.activity') }}</span>
              </v-list-item>
              <v-list-item @click="goInventory">
                <span class="text">Inventory</span>
              </v-list-item>
              <v-list-item @click="logOut">
                <span class="text">Logout</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <template v-if="exist === 1 && represent && represent.characterName">
          <div class="info-char">
            <div class="char">
              <div class="wrap-thumb-profile">
                <character-class-thumb :character-class="represent && represent.class" :size="120" />
                <span class="base-profile"></span>
              </div>
              <strong class="nick">{{ represent && represent.characterName }}</strong>
              <span class="server">{{ represent && represent.worldName }}</span>
            </div>
          </div>
          <div class="info-mychar">
            <ul>
              <li class="class">
                <em>Class</em>
                <strong>{{ represent && represent.class ? $t(`w.rounds.item.class.${represent.class}`) : $t('s.account.message.select-represent') }}</strong>
              </li>
              <li class="level">
                <em>Level</em>
                <strong>{{ represent.lv }}</strong>
              </li>
            </ul>
          </div>
          <div v-if="!$route.path.includes('inventory')" class="wrap-button">
            <nuxt-link to="/inventory" class="btn btn-primary2 btn-sm" style="width: 100%">XDRACO Inventory</nuxt-link>
          </div>
        </template>
        <template v-if="exist === 1 && represent && !represent.characterName">
          <div class="info-char">
            <div class="char">
              <div class="wrap-thumb-profile"><span class="base-profile"></span></div>
            </div>
          </div>
          <div class="set-mainchar">
            <div @click="openAccount(0)">{{ $t('s.account.message.select-represent') }}</div>
          </div>
        </template>
        <template v-if="exist === 0">
          <div class="info-char">
            <div class="char">
              <!-- no image show mir4 brand-logo -->
              <div class="wrap-thumb-profile by-wemix">
                <span class="base-profile" />
              </div>
              <div class="without-game-account">
                <div class="nick">{{ walletAddress && `${walletAddress.slice(0, 6)}...${walletAddress.slice(-6)}` }}</div>
                <p class="desc">{{ $t('s.common.mir4.account') }}</p>
                <a href="https://mir4global.com" class="link-play-mir4" target="_blank">PLAY MIR4</a>
              </div>
            </div>
            <div v-if="!$route.path.includes('inventory')" class="wrap-button">
              <nuxt-link to="/inventory" class="btn btn-primary2 btn-sm" style="width: 100%">XDRACO Inventory</nuxt-link>
            </div>
          </div>
        </template>
        <div v-if="walletAddress && !accessToken" class="wrap-button">
          <button type="button" class="btn btn-primary btn-sm btn-max btn-wemix" @click="login"><em class="hidden">WEMIX </em>LOGIN</button>
        </div>
      </div>
      <div v-if="!walletAddress" class="wallet-link">
        <p class="desc">{{ $t('s.rounds.event.message.not-linked') }}</p>
        <a href="https://forum.mir4global.com/post/53" target="_blank">{{ $t('s.account.message.wemix-guide') }}</a>
      </div>

      <div v-if="accessToken" class="list-balance">
        <div v-if="balanceLoading" style="height: 150px; display: flex; flex-direction: column; justify-content: center; align-items: center">
          <v-progress-circular class="ml-2" :size="32" :width="4" color="#fff" indeterminate />
        </div>
        <ul v-if="balance" class="list">
          <li>
            <div class="list-content">
              <div class="credit-info">
                <div class="category">DRACO Balance</div>
                <div class="info">
                  <span class="ico-darco ico-xs add-inside">
                    {{ formattedDraco[0] }}<small>{{ formattedDraco[1] }}</small>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-content">
              <div class="credit-info">
                <div class="category">HYDRA Balance</div>
                <div class="info">
                  <span class="ico-hydra ico-xs add-inside">
                    {{ formattedHydra[0] }}<small>{{ formattedHydra[1] }}</small>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="list-content">
              <div class="credit-info">
                <div class="category">WEMIX CREDIT Balance</div>
                <div class="info">
                  <span class="ico-wemixcredit ico-xs add-inside">
                    {{ formattedWemix[0] }}<small>{{ formattedWemix[1] }}</small>
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

import CharacterClassThumb from '@/components/common/CharacterClassThumb';
import { useFormattedRefNumber } from '@/utils/composables/common';

const { useState: useAccountState, useActions: useAccountActions, useMutations: useAccountMutations } = createNamespacedHelpers('account');

export default defineComponent({
  name: 'AccountInfo',
  components: { CharacterClassThumb },
  setup(props, { root }) {
    const { $route, $router } = root;
    const state = reactive({
      openMore: false,
    });
    const { dracoAccessToken, accessToken, walletAddress, balance, balanceLoading } = useState([
      'dracoAccessToken',
      'accessToken',
      'walletAddress',
      'balance',
      'balanceLoading',
    ]);
    const { setOpenDracoLogin } = useMutations(['setOpenDracoLogin']);
    const { logOut } = useActions(['logOut']);

    const { exist, represent } = useAccountState(['exist', 'represent']);
    const { setOpen, setActive } = useAccountMutations(['setOpen', 'setActive']);
    const { fetchChannelUserCharacter } = useAccountActions(['fetchChannelUserCharacter']);

    const openAccount = (active) => {
      setActive(active);
      setOpen(true);
    };

    const goInventory = () => {
      if (!$route.path.includes('inventory')) {
        $router.push('/inventory');
      }
    };

    onMounted(() => {
      if (dracoAccessToken.value && represent.value && represent.value.characterName) {
        fetchChannelUserCharacter();
      }
    });

    const formattedDraco = useFormattedRefNumber(balance, 'DRACO', 4);
    const formattedHydra = useFormattedRefNumber(balance, 'HYDRA', 4);
    const formattedWemix = useFormattedRefNumber(balance, 'WEMIX CREDIT', 4);

    return {
      ...toRefs(state),
      dracoAccessToken,
      accessToken,
      walletAddress,
      balanceLoading,
      balance,
      setOpenDracoLogin,
      exist,
      represent,
      openAccount,
      logOut,
      formattedDraco,
      formattedHydra,
      formattedWemix,
      goInventory,
    };
  },
  methods: {
    login() {
      this.$store.dispatch('wemix/login');
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/components/_account-info.scss';
</style>
