<template>
  <div ref="section">
    <h3 v-show="histories && histories.length > 0" class="title-sub-detail">{{ $t('t.nft.price.history') }}</h3>
    <div v-if="loading" :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#f0f0f0" indeterminate />
    </div>
    <div v-else-if="!loading && histories && histories.length > 0" class="price-history">
      <div class="display-price">
        <span class="label">{{ $t('w.nft.avg.price') }}</span>
        <span class="ico-wemixcredit ico-sm add-inside">{{ avg | currency(0) }}</span>
      </div>
      <div v-if="chartData" v-show="false" class="wrap-chart">
        <div style="height: 200px">
          <line-chart
            :styles="{ width: '100%', height: '200px', position: 'relative' }"
            :chart-data="chartData"
            :options="chartOptions"
            :plugins="chartPlugins"
          />
        </div>
      </div>
      <div class="list-sale-history">
        <a
          v-for="(history, historyIdx) in histories"
          :key="`nft-trade-history-${historyIdx}`"
          class="list-sale-history__item"
          target="_blank"
          :href="`https://scope.wemixnetwork.com/1003/nft/${item.contractAddress}/${item.nftID}`"
        >
          <dl class="obj">
            <dt>{{ $t('w.nft.seller.address') }}</dt>
            <dd>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{ history.sellUserAddress | truncateMiddle(10) }}</span>
                </template>
                <span>{{ history.sellUserAddress }}</span>
              </v-tooltip>
            </dd>
          </dl>
          <dl class="obj">
            <dt>{{ $t('w.nft.tx.date') }}</dt>
            <dd>{{ history.tradeTS | dateFormat }}</dd>
          </dl>
          <dl class="obj">
            <dt>{{ $t('w.nft.tx.price') }}</dt>
            <dd>
              <span class="ico-wemixcredit ico-xs add-inside">{{ history.price | currency(0) }}</span>
            </dd>
          </dl>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, reactive, ref, toRefs } from '@vue/composition-api';
import { useIntersectionObserver } from '@vueuse/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LineChart } from 'vue-chart-3';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { useDay } from '~/utils/composables/round';
import { currency } from '~/utils/filters/numeric';

const { useState: useNftState } = createNamespacedHelpers('nft');

export default defineComponent({
  name: 'NftCharacterPriceHistory',
  components: {
    LineChart,
  },
  setup(props, { root }) {
    const { $i18n, $dracoWebApi } = root;
    const { item } = useNftState(['item']);
    const section = ref(null);
    const state = reactive({
      loading: false,
      histories: null,
      chartData: null,
      chartOptions: null,
      chartPlugins: [
        ChartDataLabels,
        {
          id: 'custom_canvas_background_color',
          beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            const { canvas } = chart;
            const { chartArea } = chart;

            // Chart background
            const gradientBack = canvas.getContext('2d').createLinearGradient(0, 0, 0, 250);
            gradientBack.addColorStop(0, 'rgba(60, 174, 163, 0.7)');
            gradientBack.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
            gradientBack.addColorStop(1, 'rgba(32, 99, 155, 0.7)');

            ctx.fillStyle = gradientBack;
            ctx.fillRect(chartArea.left, chartArea.bottom, chartArea.right - chartArea.left, chartArea.top - chartArea.bottom);
          },
        },
      ],
      avg: null,
    });
    const fetchApi = () => {
      console.log('fetchHistory');
      state.loading = true;
      $dracoWebApi
        .get('/nft/character/tradehistory', { params: { tokenID: item.value.nftID, languageCode: $i18n.locale } })
        .then(({ data }) => {
          if (data.code === 200) {
            console.log('histories', data.data.lists);
            state.histories = data.data.lists || [];
            state.avg = data.data.avg || 0;

            if (state.histories.length > 0) {
              console.log();

              const labels = ['', '', '', '', ''];

              state.histories
                .slice(-5)
                .reverse()
                .forEach((h, hIdx) => {
                  labels[hIdx] = useDay(h.tradeTS).locale($i18n.locale).format('MMM. DD');
                });

              state.chartData = {
                labels: [...labels],
                datasets: [
                  {
                    data: [
                      ...state.histories
                        .slice(-5)
                        .reverse()
                        .map((i) => i.price),
                    ],
                    backgroundColor: 'rgba(200,200,200,0.05)',
                    borderColor: 'rgba(255,60, 60, 1)',
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                  },
                ],
              };

              state.chartOptions = {
                maintainAspectRatio: false,
                fill: false,
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    top: 15,
                    bottom: 5,
                  },
                },
                parsing: {
                  xAisKey: 'x',
                  yAisKey: 'y',
                },
                scales: {
                  x: {
                    display: true,
                    // min: datas[0].CreatedDT,
                  },
                  y: {
                    // min: minPrice / 1.1,
                    // max: maxPrice * 1.1,
                    display: true,
                    ticks: {
                      display: false,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: false,
                    },
                    scaleLabel: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  datalabels: {
                    offset: 0,
                    align: 'top',
                    anchor: 'end',
                    textAlign: 'center',
                    color() {
                      return '#fff';
                    },
                    font(context) {
                      const w = context.chart.width;
                      return {
                        // eslint-disable-next-line no-nested-ternary
                        size: 12,
                        weight: 'bold',
                      };
                    },
                    formatter(value, context) {
                      const price = context.chart.data.datasets[context.datasetIndex].data[context.dataIndex];
                      return price > 0 ? currency(price, 0) : '';
                    },
                  },
                  tooltip: {
                    displayColors: false,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    titleColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                      weight: 'normal',
                      size: 10,
                    },
                    titleAlign: 'center',
                    bodyColor: 'rgba(0, 0, 0, 0.8)',
                    bodyFont: {
                      weight: 'bold',
                      size: 14,
                    },
                    bodyAlign: 'center',
                    bodySpacing: 5,
                    // callbacks: {
                    //   label(tooltipContext) {
                    //     console.log(tooltipContext);
                    //     return tooltipContext.dataset.data[tooltipContext.dataIndex].label;
                    //   },
                    //   title(ctx) {
                    //     console.log(ctx, ctx[0].label);
                    //     return DateTime.fromFormat(ctx[0].label, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' }).toLocaleString(DateTime.DATETIME_FULL);
                    //   },
                    // },
                    options: {
                      padding: 10,
                    },
                    enabled: true,
                    position: 'nearest',
                    // external: externalTooltipHandler,
                  },
                },
              };
            }
          }
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const { stop } = useIntersectionObserver(section, ([{ isIntersecting }]) => {
      console.log(isIntersecting, item.value);
      if (isIntersecting && item.value && item.value.nftID && !state.histories) {
        fetchApi();
      }
    });

    onUnmounted(() => {
      stop();
    });

    return {
      section,
      ...toRefs(state),
      item,
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },
});
</script>
