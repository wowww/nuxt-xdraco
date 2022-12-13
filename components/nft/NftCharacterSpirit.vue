<template>
  <div ref="section">
    <h3 class="title-sub-detail">
      {{ $t('t.nft.spirit') }}
    </h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-if="!loading && spirits" class="character-spirit">
      <v-tabs v-model="selectedDeck">
        <v-tab v-for="(deck, deckIdx) in decks" :key="`spirit-deck-${deckIdx}`" class="tab-spirit-item">
          <span>Deck {{ deck }}</span>
        </v-tab>
        <v-tab v-if="spirits && spirits.inven.length > 0" class="tab-spirit-item">
          <span>{{ $t('t.nft.owned.spirit') }}</span>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="selectedDeck" class="wrap-tabs-item">
        <v-tab-item v-for="(deck, deckIdx) in decks" :key="`spirit-deck-slot-${deckIdx}`" class="wrap-item-circle">
          <ul class="list-item">
            <li
              v-for="slot in slots"
              :key="`spirit-${deck}-${slot}`"
              :class="`${spirits.equip[deck] && spirits.equip[deck][slot] ? `grade-${spirits.equip[deck][slot].grade}` : ''}`"
            >
              <div class="wrap-thumb">
                <span class="bg">
                  <img v-if="spirits.equip[deck] && spirits.equip[deck][slot]" :src="spirits.equip[deck][slot].iconPath" width="72" alt="" />
                  <span v-if="spirits.equip[deck] && spirits.equip[deck][slot] && spirits.equip[deck][slot].transcend > 1" class="tier-badge">
                    {{ spirits.equip[deck][slot].transcend | roman }}
                  </span>
                  <span v-show="false" v-if="spirits.equip[deck] && spirits.equip[deck][slot] && spirits.equip[deck][slot].enhance > 0" class="grade">
                    +{{ spirits.equip[deck][slot].enhance }}
                  </span>
                </span>
              </div>
              <div class="desc">
                <span class="name">
                  <template v-if="spirits.equip[deck] && spirits.equip[deck][slot]">
                    {{ spirits.equip[deck][slot].petName }}
                  </template>
                  <template v-else> - </template>
                </span>
                <span v-if="spirits.equip[deck] && spirits.equip[deck][slot]" class="category">
                  {{ spirits.equip[deck][slot].petOrigin }}
                </span>
              </div>
            </li>
          </ul>
        </v-tab-item>

        <v-tab-item v-if="spirits && spirits.inven.length > 0" class="wrap-item-square">
          <ul class="list-item">
            <li v-for="(item, itemIdx) in spirits.inven" :key="`spirits-inven-${itemIdx}`" :class="`grade-${item.grade}`">
              <img :src="item.iconPath" width="82" :alt="item.petName" />
              <span v-if="item.transcend > 1" class="tier">{{ item.transcend | roman }}</span>
            </li>
          </ul>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
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
      decks: ['1', '2', '3', '4', '5'],
      slots: ['1', '2', '3', '4', '5'],
      loading: false,
      selectedDeck: 0,
      spirits: null,
      error: null,
    });
    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/spirit', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.spirits = {
              equip: data.data.equip,
              inven: data.data.inven.sort((a, b) => b.grade - a.grade),
            };
            state.error = null;
          } else {
            state.spirits = null;
            state.error = data.code;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.spirits) {
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


