<template>
  <div ref="section">
    <h3 class="title-sub-detail">{{ $t('t.nft.stat') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-else-if="!loading && stats" class="character-stat">
      <div class="character-stat__inner">
        <ul class="list-stat">
          <li v-if="item" class="total">
            <span class="subject">{{ $t('t.exd.power.score') }}</span>
            <strong class="value">{{ item.character.powerScore | currency(0) }}</strong>
          </li>
          <li v-for="(stat, statIdx) in stats.mainstats" :key="`stat-summary-${statIdx}`">
            <img :src="stat.iconPath" :alt="stat.statName" width="32" class="icon-subject" />
            <span class="subject">{{ stat.statName }}</span>
            <strong class="value">{{ stat.statValue }}</strong>
          </li>
        </ul>
        <div v-if="item" class="wrap-score">
            <div class="score-item">
              <span>MIRAGE Score</span>
              <em class="volume score">{{ computedMirageScore | currency(0) }}</em>
            </div>
            <div class="score-item">
              <span>MiraX</span>
              <em class="volume">{{ item.character.MiraX }}</em>
            </div>
            <div class="score-item">
              <span>Enhancement</span>
              <em :data-character-reinforce="item.character.Reinforce" class="volume enhancement">+{{ item.character.Reinforce || '0' }}</em>
            </div>
          </div>
        <div class="wrap-btn">
            <v-dialog v-model="dialogStatInfo" content-class="dialog-stat-info theme-dark" max-width="720" persistent>
              <template #activator="{ on, attrs }">
                <button type="button" v-bind="attrs" class="btn" v-on="on">
                  <span>{{ $t('w.nft.skill.detail') }}</span>
                </button>
              </template>
              <div class="content">
                <v-btn class="btn-close" fab plain x-small @click="dialogStatInfo = false">
                  <v-icon color="#fff" size="26">mdi-close</v-icon>
                </v-btn>
                <!-- dialogTitle이 있는 경우 대비 -->
                <div class="dialog-header">
                  <h2 class="title">Info</h2>
                </div>

                <div class="dialog-content">
                  <ul class="list-stat-info">
                    <li v-for="(stat, statIdx) in stats.lists" :key="`stat-detail-${statIdx}`">
                      <img :src="stat.iconPath" :alt="stat.statName" width="32" class="icon-subject" />
                      <span class="subject">{{ stat.statName }}</span>
                      <strong class="value">{{ stat.statValue }}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </v-dialog>
          </div>
      </div>

      <div v-if="!loadInfo" class="data-empty" :data-empty-message="$t('s.nft.trade-type.playing')"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterStat',
  components: {
    // DspNav,
  },
  props: {
    loadInfo: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      error: null,
      stats: null,
    });
    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/stats', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          console.log('data', data);
          if (data.code === 200) {
            state.stats = data.data;
            state.error = null;
          } else {
            state.stats = null;
            state.error = data.code;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.stats) {
        fetchApi();
      }
    });

    const computedMirageScore = computed(() => {
      if (item.value) {
        const mirax = new BigNumber(item.value.character.MiraX || '0');
        const reinforce = new BigNumber(item.value.character.Reinforce || '0');

        return new BigNumber(item.value.character.powerScore)
          .plus(mirax.isGreaterThan(100000) ? 100000 : mirax)
          .pow(2)
          .div(100000)
          .multipliedBy(reinforce.multipliedBy(0.02).plus(1))
          .toNumber();
      }

      return 0;
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
      item,
      computedMirageScore,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    dialogStatInfo: false,
  }),
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
