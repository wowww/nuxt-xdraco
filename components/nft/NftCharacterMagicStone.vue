<template>
  <div ref="section">
    <h3 class="title-sub-detail">
      {{ $t('t.nft.magic.stone') }}
      <span v-if="!loading && magicStones" class="sub">
        {{ $t('w.nft.detail.representative.deck', [magicStones.activeDeck]) }}
      </span>
    </h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-if="error">Error : {{ error }}</div>
    <div v-if="!loading && magicStones" class="character-spirit">
      <v-tabs v-model="selectedDeck">
        <v-tab v-for="(deck, deckIdx) in decks" :key="`magicstone-deck-${deckIdx}`" class="tab-spirit-item">
          <span>Deck {{ deck }}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedDeck" class="wrap-tabs-item">
        <v-tab-item v-for="(deck, deckIdx) in decks" :key="`magic-stone-deck-slot-${deckIdx}`" class="wrap-item-circle size-md no-gutters">
          <ul class="list-item">
            <li
              v-for="slot in slots"
              :key="`magicstone-${deck}-${slot}`"
              :class="`${magicStones.equipItem[deck] && magicStones.equipItem[deck][slot] ? `grade-${magicStones.equipItem[deck][slot].grade}` : ''}`"
            >
              <div class="wrap-thumb">
                <span class="bg">
                  <img
                    v-if="magicStones.equipItem[deck] && magicStones.equipItem[deck][slot]"
                    :src="magicStones.equipItem[deck][slot].itemPath"
                    width="64"
                    alt=""
                  />
                  <span
                    v-if="magicStones.equipItem[deck] && magicStones.equipItem[deck][slot] && magicStones.equipItem[deck][slot].tier > 1"
                    class="tier-badge"
                  >
                    {{ Number(magicStones.equipItem[deck][slot].tier) | roman }}
                  </span>
                  <span
                    v-if="magicStones.equipItem[deck] && magicStones.equipItem[deck][slot] && magicStones.equipItem[deck][slot].tranceStep > 0"
                    class="stone-grade"
                  >
                    +{{ magicStones.equipItem[deck][slot].tranceStep }}
                  </span>
                </span>
              </div>
              <div class="desc">
                <span class="name">
                  <template v-if="magicStones.equipItem[deck] && magicStones.equipItem[deck][slot]">
                    {{ magicStones.equipItem[deck][slot].itemName }}
                  </template>
                  <template v-else> - </template>
                </span>
              </div>
            </li>
          </ul>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs } from '@vue/composition-api';
import { watch } from '@vue/composition-api/dist/vue-composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');
export default defineComponent({
  name: 'NftCharacterMagicStone',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      decks: ['1', '2', '3', '4', '5'],
      slots: ['1', '2', '3', '4', '5', '6', '7'],
      selectedDeck: 0,
      loading: false,
      magicStones: null,
      error: null,
    });
    const fetchApi = () => {
      console.log('fetchMagicStone', item.value);
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/magicstone', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.error = null;
            state.magicStones = data.data;
          } else {
            state.error = data.code;
            state.magicStones = null;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.magicStones) {
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


