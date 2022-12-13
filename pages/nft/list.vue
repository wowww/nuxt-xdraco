<template>
  <main class="contents nft-list">
    <banner-nft-top-video />

    <section class="section">
      <div class="section__inner">
        <div class="wrap-grid">
          <div class="wrap-grid__timeline">
            <div class="exchange-list for-list">
              <h2 class="title-for-list">
                <span>Character NFTs</span>
              </h2>
              <div class="tab-score">
                <div class="tab-score__title">VIEW :</div>
                <div class="tab-score__button">
                  <button type="button" class="button" :class="{ 'button--active': viewMode === 'ps' }" @click="setViewMode('ps')">
                    <img src="https://file.mir4global.com/xdraco/img/common/tab-score/icon-power.webp" class="icon" height="20" alt="Power Score" />
                    <span class="text">Power Score</span>
                  </button>
                  <button type="button" class="button" :class="{ 'button--active': viewMode === 'ms' }" @click="setViewMode('ms')">
                    <img src="https://file.mir4global.com/xdraco/img/common/tab-score/icon-mirage.webp" class="icon" height="20" alt="MIRAGE Score" />
                    <span class="text">MIRAGE Score</span>
                  </button>
                </div>
              </div>
              <nft-list-tab-bar :value="selectedTab" @input="setSelectedTab" />

              <nft-traded-section v-if="selectedTab === 0" :data="topTradedItems" use-rank use-badge />
              <nft-traded-section v-if="selectedTab === 1" :data="recentItems" />

              <nft-list-section-title>{{ $t('t.exd.recommended') }}</nft-list-section-title>

              <ul class="list-item wrap-card" :data-empty-message="recommendedItems.list && recommendedItems.list.length > 0 ? '' : $t('s.nft.empty.sales')">
                <nft-item v-for="item in recommendedItems.list" :key="`nft-recommended-item-${item.seq || item.info.seq}`" :item="item" use-link  :size="isDesktop ? 'sm' : 'xs'"/>
              </ul>

              <nft-list-section-title>
                {{ $t('w.nft.character') }}
                <span v-if="items.totalCount > 0" class="list-bar__total nft">{{ items.totalCount | currency(0) }}</span>
              </nft-list-section-title>

              <nft-list-filter :value="itemsFilter" @change="setItemsFilter" />

              <ul class="list-item wrap-card" :data-empty-message="items.list && items.list.length > 0 ? '' : $t('s.nft.empty.sales')" style="margin-top: 24px">
                <nft-item v-for="item in items.list" :key="`nft-list-item-${item.seq || item.info.seq}`" :item="item" use-link :size="isDesktop ? 'sm' : 'xs'"/>
              </ul>

              <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
                <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
              </div>

              <div v-if="items.more" class="wrap-button">
                <button type="button" class="btn-viewmore" @click="fetchNftItems(items.page + 1)">VIEW MORE</button>
              </div>
            </div>
          </div>

          <!-- 사이드영역 -->
          <div class="wrap-grid__side">
            <aside class="wrap-grid__side__bar">
              <account-info />
              <sidebar-contact-us />
            </aside>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, onMounted, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import AccountInfo from '@/components/account/AccountInfo';
import BannerNftTopVideo from '@/components/banner/NftTopVideo';
import SidebarContactUs from '@/components/common/SidebarContactUs';
import NftItem from '~/components/nft/NftItem';
import NftListSectionTitle from '~/components/nft/NftListSectionTitle';
import NftListTabBar from '~/components/nft/NftListTabBar';
import NftListFilter from '~/components/nft/NftListFilter';
import NftTradedSection from '~/components/nft/NftTradedSection';

const { useState: useNftState, useMutations: useNftMutations, useActions: useNftActions } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftList',
  meta: {
    title: 'NFT | XDRACO',
    hasSubNav: 'nft',
  },
  components: {
    SidebarContactUs,
    NftTradedSection,
    NftListTabBar,
    NftListSectionTitle,
    NftListFilter,
    BannerNftTopVideo,
    NftItem,
    AccountInfo,
  },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const { loading, selectedTab, items, itemsFilter, topTradedItems, recommendedItems, recentItems, viewMode } = useNftState([
      'loading',
      'selectedTab',
      'items',
      'itemsFilter',
      'topTradedItems',
      'recommendedItems',
      'recentItems',
      'viewMode',
    ]);
    const { setSelectedTab, setItemsFilter, setViewMode } = useNftMutations(['setSelectedTab', 'setItemsFilter', 'setViewMode']);
    const { fetchNftItems, fetchNftTopTradedItems, fetchNftRecommendedItems, fetchNftRecentItems } = useNftActions([
      'fetchNftItems',
      'fetchNftTopTradedItems',
      'fetchNftRecommendedItems',
      'fetchNftRecentItems',
    ]);

    onMounted(() => {
      setSelectedTab(0);
      fetchNftItems();
      fetchNftTopTradedItems();
      fetchNftRecommendedItems();
      fetchNftRecentItems();
    });

    watch(
      () => itemsFilter.value,
      () => {
        fetchNftItems();
      },
    );

    return {
      isDesktop,
      loading,
      selectedTab,
      setSelectedTab,
      setItemsFilter,
      setViewMode,
      items,
      itemsFilter,
      topTradedItems,
      recommendedItems,
      recentItems,
      viewMode,
      fetchNftItems,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
  watch: {
    locale() {
      this.$store.dispatch('nft/fetchNftItems');
      this.$store.dispatch('nft/fetchNftTopTradedItems');
      this.$store.dispatch('nft/fetchNftRecommendedItems');
      this.$store.dispatch('nft/fetchNftRecentItems');
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/mixin';
@import '~@/assets/sass/components/tab-score';
@import '~@/assets/sass/components/_list-detail';
</style>
