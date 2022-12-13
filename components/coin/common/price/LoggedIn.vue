<template>
  <div class="logged-in">
    <div class="logged-in__header">
      <h2 class="logged-in--title">My Wallet</h2>
    </div>

    <div v-if="balance" class="balance__wrapper">
      <ul class="balance">
        <li>
          <h3 class="balance--title">HYDRA Balance</h3>
        </li>
        <li class="balance--description">
          <div class="balance--volume">
            <img src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-hydra.webp" class="balance--logo" alt="HYDRA" />
            <xdraco-number :value="balance['HYDRA']" />
          </div>
          <div class="exchange--volume">
            <span>USD ${{ (balance['HYDRA'] * hydraUsd) | currency(0) }}</span>
            <span>WEMIX {{ (balance['HYDRA'] * hydraWemix) | currency(0) }}</span>
          </div>
        </li>
      </ul>

      <ul class="balance">
        <li class="balance--title">
          <h3>DRACO Balance</h3>
        </li>
        <li class="balance--description">
          <div class="balance--volume">
            <img src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-draco.webp" class="balance--logo" alt="DRACO" />
            <xdraco-number :value="balance['DRACO']" />
          </div>
          <div class="exchange--volume">
            <span>USD ${{ (balance['DRACO'] * dracoUsd) | currency(0) }}</span>
            <span>WEMIX {{ (balance['DRACO'] * dracoWemix) | currency(0) }}</span>
          </div>
        </li>
      </ul>

      <ul class="balance">
        <li>
          <h3 class="balance--title">WEMIX CREDIT Balance</h3>
        </li>
        <li class="balance--description">
          <div class="balance--volume">
            <img src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-wemixc.webp" class="balance--logo" alt="WEMIX CREDIT" />
            <xdraco-number :value="balance['WEMIX CREDIT']" />
          </div>
          <div class="exchange--volume">
            <span>USD ${{ (balance['WEMIX CREDIT'] * Number(dracoRate ? dracoRate.USDWemixRate : 0)) | currency(0) }}</span>
          </div>
        </li>
      </ul>

      <ul class="balance">
        <li>
          <h3 class="balance--title">
            WEMIX Balance
          </h3>
        </li>
        <li class="balance--description">
          <div class="balance--volume">
            <img src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-wemix.webp" class="balance--logo" alt="WEMIX" />
            <xdraco-number :value="balance['WEMIX']" />
          </div>
          <div class="exchange--volume">
            <span>USD ${{ (balance['WEMIX'] * Number(dracoRate ? dracoRate.USDWemixRate : 0)) | currency(0) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="wrap-copy-code">
      <button id="btnCopyCode" type="button" class="btn-copy-code" @click="copyToClipboard">
        <!-- <span class="value" v-if="userInfo">{{ userInfo.address }}</span> -->
        <span class="value">{{ userInfo ? userInfo.address : '' }}</span>
      </button>
    </div>

    <div class="trade">
      <v-dialog v-model="dialogTradeCoin" content-class="dialog-trade-coin" max-width="520" persistent>
        <template #activator="{ on, attrs }">
          <button type="button" class="trade--button" v-bind="attrs" v-on="on">
            <span class="trade--button-text">Trade with WEMIX WALLET</span>
          </button>
        </template>
        <div class="content">
          <v-btn class="btn-close" fab plain large @click="dialogTradeCoin = false">
            <v-icon color="#000" size="40">mdi-close</v-icon>
          </v-btn>
          <h3 class="bi-wemix">WEMIX</h3>
          <p v-html="$t('s.price.trade.message')"></p>
          <div class="wrap-link">
            <img src="https://file.mir4global.com/xdraco/img/desktop/qr-wallet-google.webp" width="160" alt="WEMIX Wallet Google QR" />
            <img src="https://file.mir4global.com/xdraco/img/desktop/qr-wallet-apple.webp" width="160" alt="WEMIX Wallet Apple QR" />
          </div>
        </div>
      </v-dialog>
    </div>

    <v-snackbar v-model="isCopiedCode" :timeout="2500" top>
      <span>Copied</span>
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="isCopiedCode = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from '@vue/composition-api';
import { useActions, useGetters, useState } from 'vuex-composition-helpers/dist';
import clipboardCopy from 'clipboard-copy';

export default defineComponent({
  name: 'LoggedIn',
  setup() {
    const { accessToken, userInfo, balance, dracoRate } = useState(['accessToken', 'userInfo', 'balance', 'dracoRate']);
    const { dracoAmount, dracoDate, dracoUsd, dracoWemix, hydraUsd, hydraWemix } = useGetters([
      'dracoAmount',
      'dracoDate',
      'dracoUsd',
      'dracoWemix',
      'hydraUsd',
      'hydraWemix',
    ]);

    const { fetchBalance, fetchDracoLastest, fetchDraco, fetchDerby, fetchCurrent, postLogin, logOut } = useActions([
      'fetchBalance',
      'fetchDracoLastest',
      'fetchDraco',
      'fetchDerby',
      'fetchCurrent',
      'postLogin',
      'logOut',
    ]);

    const state = reactive({
      selectedChart: 'usd',

      // for tab
      tabChartPrice: null,

      // for dialog
      dialogExchange: false,
      dialogTradeCoin: false,

      // for btn-copy-code
      isCopiedCode: false,
    });

    const copyToClipboard = () => {
      if (!userInfo) {
        return;
      }
      clipboardCopy(userInfo.value && userInfo.value.address);
      // clipboardCopy('0x89808ca091d7cb1ee8e2790fgf5023a0b15e2356');
      state.isCopiedCode = true;
    };

    onMounted(() => {
      postLogin();
      fetchDracoLastest();
      fetchDraco();
      fetchDerby();
      fetchBalance();
    });

    return {
      ...toRefs(state),
      accessToken,
      dracoRate,
      userInfo,
      balance,
      dracoAmount,
      dracoDate,
      dracoUsd,
      dracoWemix,
      copyToClipboard,
      fetchBalance,
      fetchDracoLastest,
      fetchDraco,
      fetchDerby,
      fetchCurrent,
      postLogin,
      logOut,
      hydraUsd,
      hydraWemix,
    };
  },
  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/_logged-in.scss';
</style>
