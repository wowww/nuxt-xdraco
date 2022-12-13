<template>
  <main class="contents nft" :class="`market single bg-grade-${nftGrade}`">
    <section class="section">
      <div class="section__inner">
        <div class="subnav-block"></div>
        <back-button />

        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="exchange-market">
              <div v-if="loading" class="wrap-addition wrap-addition__detail">
                <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
                  <v-progress-circular class="ml-2" size="24" width="4" color="#f0f0f0" indeterminate />
                </div>
              </div>
              <div v-else-if="!loading && item" class="wrap-addition__detail">
                <nft-character-equipment :load-info="loadInfo" />
                <nft-character-description :item="item" />
              </div>
              <div v-else-if="!loading && itemError" class="wrap-addition__detail">Error: {{ itemError }}</div>

              <template v-if="item">
                <nft-character-stat :load-info="loadInfo" />
                <nft-character-skill v-show="loadInfo" />
                <nft-character-spirit v-show="loadInfo" />
                <nft-character-god-dragon v-show="loadInfo" />
                <nft-character-magic-stone v-show="loadInfo" />
                <nft-character-mystical-pieces v-show="loadInfo" />
                <nft-character-training v-show="loadInfo" />
                <nft-character-conquest v-show="loadInfo" />
                <nft-character-relic v-show="loadInfo" />
                <nft-character-asset v-show="loadInfo" />
                <nft-character-codex v-show="loadInfo" />
                <nft-character-inventory v-show="loadInfo" />
                <nft-character-price-history />
              </template>
            </div>
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
    <nft-bottom-fixed-bar
      :item="item"
      :price-rate="price"
      :character-class="characterClass"
      :character-grade="nftGrade"
    />
    <modal-wemix-login-nft />
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BackButton from '@/components/common/BackButton';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import NftBottomFixedBar from '~/components/nft/NftBottomFixedBar';
import NftCharacterAsset from '~/components/nft/NftCharacterAsset';
import NftCharacterCodex from '~/components/nft/NftCharacterCodex';
import NftCharacterConquest from '~/components/nft/NftCharacterConquest';
import NftCharacterDescription from '~/components/nft/NftCharacterDescription';
import NftCharacterMagicStone from '~/components/nft/NftCharacterMagicStone';
import NftCharacterSkill from '~/components/nft/NftCharacterSkill';
import NftCharacterStat from '~/components/nft/NftCharacterStat';
import NftCharacterMysticalPieces from '~/components/nft/NftCharacterMysticalPieces';
import NftCharacterTraining from '~/components/nft/NftCharacterTraining';
import NftCharacterInventory from '~/components/nft/NftCharacterInventory';
import NftCharacterPriceHistory from '~/components/nft/NftCharacterPriceHistory';
import NftCharacterSpirit from '~/components/nft/NftCharacterSpirit';
import NftCharacterRelic from "~/components/nft/NftCharacterRelic";
import NftCharacterEquipment from '~/components/nft/NftCharacterEquipment';
import ModalWemixLoginNft from "~/components/common/desktop/ModalWemixLoginNft";
import NftCharacterGodDragon from "~/components/nft/NftCharacterGodDragon";

const { useState: useExdState } = createNamespacedHelpers('exd');

const { useState: useNftState, useGetters: useNftGetters, useActions: useNftActions, useMutations: useNftMutations } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftTradeItem',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
  },
  components: {
    ModalWemixLoginNft,
    NftCharacterGodDragon,
    NftCharacterSpirit,
    NftCharacterRelic,
    NftCharacterPriceHistory,
    NftCharacterCodex,
    NftCharacterInventory,
    NftCharacterAsset,
    NftCharacterConquest,
    NftCharacterTraining,
    NftCharacterMagicStone,
    NftCharacterMysticalPieces,
    NftCharacterSkill,
    NftCharacterStat,
    NftCharacterDescription,
    NftCharacterEquipment,
    NftBottomFixedBar,
    AccountInfo,
    BackButton,
    SidebarContactUs,
  },
  setup(props, { root }) {
    const { $i18n, $route, $device, $store } = root;
    const seq = $route.params.id;
    const { price } = useExdState(['price']);
    const qrRef = ref(null);
    const state = reactive({
      isOpen: false,
      loadInfo: false,
    });

    const {
      loading,
      item,
      itemError,
      openQR,
    } = useNftState(['loading', 'item', 'itemError', 'openQR']);

    const { nftGrade, characterClass } = useNftGetters(['nftGrade', 'characterClass']);

    const { fetchNftItem } = useNftActions(['fetchNftItem']);
    const { setOpenQR } = useNftMutations(['setOpenQR']);

    onMounted(() => {
      fetchNftItem(seq);
      document.documentElement.classList.add('init-nft-trade');
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchNftItem(seq);
      },
    );

    watch(
      () => item.value,
      () => {
        if (item.value) {
          state.loadInfo = item.value.tradeType === 1 || Object.keys(item.value.equipItem).length > 0;
        }
      },
    );

    return {
      loading,
      nftGrade,
      characterClass,
      price,
      item,
      itemError,
      openQR,
      setOpenQR,
      qrRef,
      seq,
      ...toRefs(state),
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  destroyed() {
    document.documentElement.classList.remove('init-nft-trade');
  }
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';

// NFT 상품상세
@import '~@/assets/sass/common/pages/nft/_nft-detail.scss';
@import '~@/assets/sass/common/pages/_popup-nft.scss';
</style>
