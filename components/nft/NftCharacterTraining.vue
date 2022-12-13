<template>
  <div ref="section">
    <h3 v-if="trainings && Object.keys(trainings).length > 0" class="title-sub-detail">{{ $t('t.nft.training') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-if="!loading && trainings && Object.keys(trainings).length > 0" class="training">
      <div class="character-training">
        <div class="training-sold">
          <div class="training-item" v>
            <div class="training-dec">
              <p>{{ trainings.consitutionName }}</p>
            </div>
            <div class="training-tier">
              <span>Tier</span>
              <p>{{ trainings.consitutionLevel }}</p>
            </div>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['0'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['0'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['1'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['1'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['2'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['2'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['3'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['3'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['4'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['4'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-item">
          <div class="training-dec">
            <p>{{ trainings['5'].forceName }}</p>
          </div>
          <div class="training-tier">
            <span>Tier</span>
            <p>{{ trainings['5'].forceLevel }}</p>
          </div>
        </div>
        <div class="training-sold">
          <div class="training-item">
            <div class="training-dec">
              <p>{{ $t('s.nft.training.collectName') || '' }}</p>
              <p>{{ trainings.collectName }}</p>
            </div>
            <div class="training-tier">
              <span>Tier</span>
              <p>{{ trainings.collectLevel }}</p>
            </div>
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
  name: 'NftCharacterTraining',
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      trainings: null,
      error: null,
    });
    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/training', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            state.trainings = data.data;
          } else {
            state.trainings = null;
            state.error = data.code;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.trainings) {
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
