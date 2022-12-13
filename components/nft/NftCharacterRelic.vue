<template>
  <div ref="section" class="relic">
    <h3 class="relic__title title-sub-detail">
       {{ $t('t.nft.relic') }}
    </h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-if="!loading && relics.length > 0" class="wrap-spirit relic-item__container">
      <ul class="relic-item__contents">
        <li
          v-for="(relic, imgIdx) in relics"
          :key="`relic-list-${imgIdx}`"
          class="relic-item__contents--list">
          <div class="relic-item__contents--image">
            <img :src="staticHost + '/xdraco/img/common/nft-detail/img-relic-0' + (relic.id) + '.webp'" alt="">
          </div>
          <div class="relic-item__contents--info">
            <h4 class="relic-item__contents--title">{{ relic.title }}</h4>
            <div class="relic-item__contents--level">{{ relic.Grade || '0' }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, watch} from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterSpirit',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);

    const state = reactive({
      relics: [
        {
          id: '1',
          title: 'Unicorn Lion Mystique',
        },
        {
          id: '2',
          title: 'Vermilion Bird Mystique',
        },
        {
          id: '3',
          title: 'Black Tortoise Mystique',
        },
        {
          id: '4',
          title: 'White Tiger Mystique',
        },
        {
          id: '5',
          title: 'Blue Dragon Mystique',
        },
      ],
      loading: false,
      error: null,
    });

    const fetchApi = () => {
      state.loading = true;

      $dracoWebApi
        .get('/nft/character/holystuff', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            for(const [key, value] of Object.entries(data.data)) {
              const idx = state.relics.findIndex((i) => i.id === key);
              state.relics[idx] = {
                ...state.relics[idx],
                title: value.HolyStuffName,
                Grade: value.Grade,
              }
            }
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.relics.Grade) {
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
  data: () => ({
    staticHost: process.env.VUE_APP_STATIC_HOST,
  }),
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
