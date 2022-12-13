<template>
  <header id="header" class="header" height="auto" dark tile app>
    <div class="header__inner">
      <div class="header__left">
        <div class="header__left--detail">
          <app-nav />
        </div>
        <div class="header__left--simple">
          <v-btn class="header__gnb-menu" icon elevation="0" @click="isOpenNav = !isOpenNav"></v-btn>
          <!-- <h1 class="header-bi" :class="this.currentRouterName">{{ this.currentRouterName }}</h1> -->
          <h1 v-if="$route.path.includes('dsp')" class="header__gnb-menu__bi dsp">DSP</h1>
          <h1 v-else-if="$route.path.includes('exd')" class="header__gnb-menu__bi exd">EXD</h1>
          <h1 v-else-if="$route.path.includes('nft')" class="header__gnb-menu__bi mir4nft">mir4nft</h1>
          <h1 v-else-if="$route.path.includes('collectible')" class="header__gnb-menu__bi collectible">collectible</h1>
          <h1 v-else-if="$route.path.includes('hsp')" class="header__gnb-menu__bi hsp">HSP</h1>
          <h1 v-else-if="$route.path.includes('mirage')" class="header__gnb-menu__bi mirage">MIRAGE</h1>
          <h1 v-else-if="$route.path.includes('inventory')" class="header__gnb-menu__bi inventory">inventory</h1>
          <h1 v-else class="header__gnb-menu__bi home">xdraco</h1>
          <!--          <div style="position: absolute; top: 8px; left: 202px">-->
          <!--            <nav-ui v-if="isDevelopment" />-->
          <!--          </div>-->
        </div>
      </div>
      <div class="header__right">
        <div class="header__right--detail">
          <app-profile />
          <app-external-menu />
          <language />
        </div>
        <div class="header__right--simple">
          <a href="https://cs.mir4global.com/customer?category=191" class="btn-header" target="_blank">
            <img src="https://file.mir4global.com/xdraco/img/common/ico-contact-us.svg" height="25" alt="contact us" />
          </a>
          <!-- <a href="https://discord.gg/mir4global" class="btn-header discord" target="_blank">Discord</a> -->
          <!-- <v-btn class="btn-gnb-language" icon elevation="0" @click="setIsOpenSelectLanguage(!isOpenSelectLanguage)"></v-btn> -->
          <v-btn class="header__gnb-language" icon elevation="0" @click="toggleSetLanguage(true)"></v-btn>
          <simple-profile />
        </div>
      </div>
    </div>
    <xdraco-notification v-if="notification" :notification="notification" @on-closed="clearNotification()" />
    <app-sub-nav v-if="hasSubNav" :sub-nav="hasSubNav" />

    <!-- 네비게이션 -->
    <v-navigation-drawer v-model="isOpenNav" app class="mobile-nav">
      <v-btn icon elevation="0" color="white" class="btn-close" @click="isOpenNav = !isOpenNav">
        <v-icon large>mdi-close</v-icon>
      </v-btn>

      <simple-nav @close="isOpenNav = false"></simple-nav>
    </v-navigation-drawer>

    <!-- 언어 선택 -->
    <v-navigation-drawer v-model="selectLanguage" class="select-language mobile" app right>
      <!-- <v-btn icon elevation="0" color="white" class="btn-close" @click="setIsOpenSelectLanguage(!isOpenSelectLanguage)"> -->
      <v-btn icon elevation="0" color="white" class="btn-close" @click="toggleSetLanguage(false)">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
      <div class="mobile-header__gnb-language">
        <span class="v-btn__content"></span>
      </div>

      <simple-language @close="closeLanguageModal"/>
      <simple-profile />
    </v-navigation-drawer>
  </header>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import {useActions, useState} from 'vuex-composition-helpers/dist';

import AppSubNav from '@/components/common/AppSubNav';
import AppExternalMenu from '@/components/common/desktop/AppExternalMenu';
import AppNav from '@/components/common/desktop/AppNav';
import AppProfile from '@/components/common/desktop/AppProfile';
import XdracoNotification from '@/components/common/XdracoNotification';
import Language from '~/components/common/desktop/Language';
import SimpleLanguage from '~/components/common/mobile/Language';
import SimpleProfile from '~/components/common/mobile/Profile';
import SimpleNav from '~/components/common/mobile/Nav';

export default defineComponent({
  name: 'AppHeader',
  components: {
    XdracoNotification,
    AppProfile,
    AppNav,
    AppExternalMenu,
    Language,
    AppSubNav,
    SimpleLanguage,
    SimpleProfile,
    SimpleNav,
  },
  setup(_, { root }) {
    const { $route, $nextTick } = root;
    const state = reactive({
      groupNav: null,
      hasSubNav: '',
      isUiPage: false,
      notification: null,
      isOpenNav: false,
      lockLanguageElem: null,
      selectLanguage: false,
    });

    const { notifications } = useState(['notifications']);
    const { fetchIsDesktop, fetchHasInventory } = useActions(['fetchIsDesktop', 'fetchHasInventory']);

    const getIsUiPage = (path) => {
      return path.includes('ui-');
    };
    const setShowDspNav = (meta) => {
      if (!meta) {
        return;
      }
      state.hasSubNav = meta.hasSubNav;
    };

    const checkAndSetNotification = () => {
      if (notifications.value == null)
        return false;
      if (notifications.value?.length === 0) {
        state.notification = null;
      }

      const filteredNotifications = notifications.value.filter((item) => {
        if (item.id === '1509564297461960710') {
          return false;
        }

        return !localStorage.getItem(`xdraco-noti-${item.id}`);
      });

      if (filteredNotifications.length > 0) {
        state.notification = filteredNotifications[0];
      }
    };

    const toggleSetLanguage = (isOpen) => {
      if (isOpen === undefined) {
        isOpen = true;
      }
      state.selectLanguage = isOpen;
    }

    const closeLanguageModal = () => {
      state.selectLanguage = false;
    }

    watch(
      () => $route.path,
      () => {
        checkAndSetNotification();
      },
    );

    watch(
      () => notifications.value,
      () => {
        checkAndSetNotification();
      },
    );

    const clearNotification = () => {
      state.notification = null;

      $nextTick(() => {
        checkAndSetNotification();
      });
    };

    onMounted(() => {
      setShowDspNav($route.meta);
      fetchIsDesktop();
      fetchHasInventory();
    });

    window.onresize = () => {
      fetchIsDesktop();
      fetchHasInventory();
    }

    return {
      ...toRefs(state),
      getIsUiPage,
      setShowDspNav,
      clearNotification,
      toggleSetLanguage,
      closeLanguageModal,
    };
  },
  watch: {
    $route(to) {
      this.setShowDspNav(to.meta);
    },
  }
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/partials/desktop/header';
@import '~@/assets/sass/_mixin.scss';
@import '~@/assets/sass/common/partials/nav-dsp';
</style>
