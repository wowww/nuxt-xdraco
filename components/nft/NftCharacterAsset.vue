<template>
  <div ref="section">
    <h3 class="title-sub-detail">{{ $t('t.nft.asset') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-else-if="!loading && assets" class="asset">
      <div class="character-asset">
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-coin.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.copper') }}</p>
            <p class="asset-data">{{ (assets.copper || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-spirit.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.energy') }}</p>
            <p class="asset-data">{{ (assets.energy || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-blackIron.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.darksteel') }}</p>
            <p class="asset-data">{{ (assets.darksteel || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-skillstone.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.dragon-jade') }}</p>
            <p class="asset-data">{{ (assets.dragonjade || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-speedup.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.speed-ups') }}</p>
            <p class="asset-data">{{ (assets.speedups || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-guildcoin.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.ancient-coins') }}</p>
            <p class="asset-data">{{ (assets.acientcoins || 0) | currency(0) }}</p>
          </div>
        </div>
        <div class="asset-info-box">
          <img src="https://file.mir4global.com/xdraco/img/common/nft-detail/icon-dragonsteel.webp" width="40" alt="image" />
          <div class="asset-desc">
            <p class="asset-name">{{ $t('w.nft.asset.dragon-steel') }}</p>
            <p class="asset-data">{{ (assets.dragonsteel || 0) | currency(0) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterAsset',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      error: null,
      assets: null,
    });
    const fetchApi = () => {
      console.log('fetchAsset');
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/assets', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.assets = data.data;
            state.error = null;
          } else {
            state.error = data.code;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.assets) {
        fetchApi();
      }
    });

    watch(
      () => $i18n.locale,
      () => {
        fetchApi();
      },
    );

    onUnmounted(() => {
      stop();
    });
    return {
      section,
      ...toRefs(state),
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>


