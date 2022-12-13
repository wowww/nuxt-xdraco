<template>
  <div ref="section">
    <!-- Data Empty Case for Conquest -->
    <h3 class="title-sub-detail">{{ $t('t.nft.conquest') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div class="character-conquest">
      <ul v-if="building" class="character-conquest--list">
        <li v-for="({ key, className }, idx) in buildingKeys" :key="`conquest-${idx}`" :class="className">
          <dl v-if="building[key * 1000000]" class="level">
            <dt>{{ building[key * 1000000].buildingName }}</dt>
            <dd>{{ building[key * 1000000].buildingLevel }}</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api/dist/vue-composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterConquest',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);

    const state = reactive({
      loading: false,
      buildingKeys: [
        { key: 3, className: 'mine' },
        { key: 2, className: 'forge' },
        { key: 10, className: 'hydra' },
        { key: 1, className: 'conquest' },
        { key: 6, className: 'quintessence' },
        { key: 4, className: 'millennial-tree' },
        { key: 9, className: 'portal' },
        { key: 7, className: 'victory' },
        { key: 5, className: 'training-sanctum' },
        { key: 8, className: 'holy-shrine' },
      ],
      building: null,
    });

    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/building', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.building = data.data;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.building) {
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
      ...toRefs(state),
      section,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>


