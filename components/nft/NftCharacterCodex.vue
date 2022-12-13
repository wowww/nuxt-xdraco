<template>
  <div ref="section">
    <h3 class="title-sub-detail">{{ $t('t.nft.codex') }}</h3>
    <div class="circle-progress codex">
      <div class="wrap-item-chart">
        <div v-for="(cd, cdIdx) in codex" :key="`codex-${cdIdx}`" class="chart-item">
          <div class="circle-area">
            <doughnut-chart :chart-data="cd.chartData" />
          </div>
          <div class="cirin-data">
            <p class="minmax">{{ `${cd.item.inProgress + cd.item.completed}/${cd.item.total}` }}</p>
            <p class="percent">{{ (((cd.item.inProgress + cd.item.completed) / cd.item.total) * 100) | currency(2) }}%</p>
          </div>
          <p class="name">{{ cd.item.name }}</p>
          <p class="progress">
            {{ $t('w.nft.trade.codex.state1') }}<span>{{ cd.item.inProgress }}</span>
          </p>
          <p class="completed">
            {{ $t('w.nft.trade.codex.state2') }}<span>{{ cd.item.completed }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import { DoughnutChart } from 'vue-chart-3';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterCodex',
  components: {
    DoughnutChart,
  },
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      codex: null,
    });
    const fetchApi = () => {
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/codex', { params: { transportID: item.value.character.transportID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            const codex = [];

            Object.keys(data.data).forEach((k) => {
            const c = data.data[k];

            const total = Number(c.totalCount);
            const completed = Number(c.completed);
            const inProgress = Number(c.inprogress);

            codex.push({
              item: {
                name: c.codexName,
                total,
                completed,
                inProgress,
              },
              chartData: {
                datasets: [
                  {
                    data: [inProgress, completed, total - (inProgress + completed)],
                    borderWidth: 0,
                    backgroundColor: ['#2354ff', '#23b0ff', '#000000'],
                    circumference: 360,
                    cutout: '90%',
                  },
                ],
              },
            });
          });

          state.codex = codex;
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      if (isIntersecting && item.value && item.value.character.transportID && !state.codexs) {
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
