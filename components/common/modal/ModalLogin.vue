<template>
  <v-dialog content-class="dialog-login" v-model="openDracoLogin" max-width="360" persistent>
    <div class="content">
      <v-btn class="btn-close" @click="setOpenDracoLogin(false)" fab plain x-small>
        <v-icon color="#000" size="26">mdi-close</v-icon>
      </v-btn>
      <h3 class="title"><em>Mir4</em></h3>
      <h4 class="sub-title">Please log in to use the MIR4 X DRACO</h4>

      <div class="sns-provider">
        <template v-if="cookieNotAvailable">
          <h4 class="accept-cookie-title">We use cookies</h4>
          <p class="accept-desc">
            Browser setting error.<br />
            Please log in again after changing your browser setting.
          </p>
        </template>
        <template v-else>
          <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </template>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from '@vue/composition-api';
import Cookies from 'js-cookie';
import qs from 'qs';
import Vue from 'vue';
import { useMutations, useState } from 'vuex-composition-helpers/dist';

import { dracoStorage } from '@/utils/baseUtil';

export default defineComponent({
  name: 'ModalLogin',
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    const cookieAccept = ref(false);

    const appleBtn = ref(null);

    const instance = getCurrentInstance();
    const vm = instance?.proxy || new Vue({});

    const { openDracoLogin, cookieNotAvailable } = useState(['openDracoLogin', 'cookieNotAvailable']);
    const { setOpenDracoLogin } = useMutations(['setOpenDracoLogin']);

    const googleLogin = () => {
      const CLIENT_ID = '413577644384-7dp0qc878r83ri254s2j6mljm3fsakuk.apps.googleusercontent.com';
      const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';

      const queryStr = qs.stringify({
        client_id: CLIENT_ID,
        redirect_uri: `${process.env.VUE_APP_DRACO_REDIRECT_URI}/google`,
        response_type: 'code',
        scope: 'profile email',
      });

      const loginUrl = `${AUTHORIZE_URI}?${queryStr}`;

      Cookies.set('xdraco-prev-path', root.$route.path);

      window.location.assign(loginUrl);
    };

    const uuidv4 = () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        // eslint-disable-next-line no-bitwise
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
      );
    };

    const appleLogin = () => {
      Cookies.set('xdraco-prev-path', root.$route.path);
      document.getElementById('appleid-signin').click();
    };

    const fbLogin2 = () => {
      Cookies.set('xdraco-prev-path', root.$route.path);
      window.location.href = `https://www.facebook.com/v12.0/dialog/oauth?${qs.stringify({
        client_id: '419848625819718',
        redirect_uri: `${process.env.VUE_APP_DRACO_REDIRECT_URI}/facebook`,
        state: uuidv4(),
      })}`;
    };

    const agreeCookie = () => {
      dracoStorage.set('draco-cookie-accept', true, { expires: 365 });
      cookieAccept.value = true;
    };

    onMounted(() => {});

    watch(
      () => openDracoLogin.value,
      () => {
        if (openDracoLogin.value) {
          cookieAccept.value = dracoStorage.get('draco-cookie-accept') ? dracoStorage.get('draco-cookie-accept') === 'true' : false;
        }
      },
    );

    return {
      cookieNotAvailable,
      cookieAccept,
      agreeCookie,
      appleBtn,
      openDracoLogin,
      setOpenDracoLogin,
      googleLogin,
      appleLogin,
      fbLogin2,
    };
  },
});
</script>
