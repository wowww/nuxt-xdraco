<template>
  <v-app id="app">
    <common-header />
    <v-main>
      <v-container id="container" fluid>
        <main class="contents inventory">
          <section class="section">
            <div class="section__inner">
              <div class="subnav-block"></div>
              <div class="wrap-grid">
                <div class="wrap-grid__timeline">
                  <div v-if="!accessToken" class="before-login">
                    <p class="before-login__msg">log in to XDRACO with WEMIX WALLET</p>
                    <div class="before-login__btn"><button type="button" class="btn btn-wemix-login btn-sm btn-max">LOGIN</button></div>
                  </div>
                  <Nuxt v-else/>
                  <modal-account />
                  <modal-wemix-login />
                  <modal-common />
                </div>
                <div class="wrap-grid__side">
                  <aside class="wrap-grid__side__bar">
                    <account-info />
                    <sidebar-contact-us />
                  </aside>
                </div>
              </div>
            </div>
          </section>
          <common-footer />
        </main>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, onMounted, watch, onBeforeMount } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';
import AccountInfo from '~/components/account/AccountInfo';
import SidebarContactUs from '~/components/common/SidebarContactUs';
import CommonFooter from '~/components/common/Footer';
import CommonHeader from '~/components/common/desktop/AppHeader';
import ModalAccount from '~/components/common/modal/ModalAccount';
import ModalCommon from '~/components/common/modal/ModalCommon';
import ModalWemixLogin from '~/components/common/desktop/ModalWemixLogin';


export default defineComponent({
  name: 'InventoryLayout',
  components: {
    CommonFooter,
    SidebarContactUs,
    AccountInfo,
    CommonHeader,
    ModalAccount,
    ModalCommon,
    ModalWemixLogin,
  },
  setup(_, { root }) {
    const { $store } = root;
    const { accessToken } = useState(['accessToken']);

    const login = () => {
      $store.dispatch('wemix/login');
    }

    watch(
      () => accessToken.value,
      () => {
        if (!accessToken.value) {
          login();
        }
      },
    );

    onBeforeMount(() => {
      document.documentElement.classList.add('init-inventory');
    });

    onMounted(() => {
      if (!accessToken.value) {
        login();
      }
    });

    return {
      accessToken,
    };
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  created() {
    if (this.$store.state.accessToken && !this.$store.state.balance) {
      this.$store.dispatch('fetchBalance');
    }
  },
  destroyed() {
    document.documentElement.classList.remove("init-inventory");
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/_inventory-list.scss';
@import '~@/assets/sass/components/_tab-style1.scss';
@import '~@/assets/sass/common/partials/_side.scss';

.inventory {
  .before-login {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 158px 0;

    &__msg {
      font-size: 14px;
      line-height: 1.43;
      letter-spacing: -0.14px;
      color: rgba(255, 255, 255, 0.75);
    }

    &__btn {
      margin-top: 16px;

      button {
        width: 232px;
      }
    }
  }
}
</style>
