<template>
  <div>
    <!--    <div v-if="derby.error" class="p-10 flex justify-center items-center text-white">{{ derby.error }}</div>-->
    <bar-chart
      v-if="chartData"
      :styles="{ height: '280px', position: 'relative' }"
      :chart-data="chartData"
      :options="chartOptions"
      :plugins="chartPlugins"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import { BarChart } from 'vue-chart-3';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'DerbyChart',
  components: { BarChart },
  setup() {
    const state = reactive({
      chartData: null,
      chartOptions: null,
      chartPlugins: [ChartDataLabels],
    });

    const { derby } = useState(['derby']);

    const generateChartData = () => {
      if (!derby.value) {
        return;
      }
      const dsData = [];
      const bonusData = [];

      const items = derby.value.slice(-10);

      const minDS = Math.min.apply(
        null,
        items.map((item) => parseInt(item.DS, 10)),
      );

      const maxDS = Math.max.apply(
        null,
        items.map((item) => parseInt(item.DS, 10)),
      );

      const range = maxDS - minDS;
      const max = range * 2 + 5;

      const maxBonus = Math.max.apply(
        null,
        items.map((item) => parseInt(item.BonusYield, 10)),
      );

      items.forEach((item) => {
        const date = dayjs(item.CreatedDate).format('LL');

        const bonus = parseInt(item.BonusYield, 10);

        dsData.push({
          x: date,
          y: item.DS - minDS + range,
          bonus,
          label: `DERBY ${Number(item.DS).toLocaleString(undefined, { maximumFractionDigits: 0 })} DS`,
        });
        bonusData.push({
          x: date,
          y: range * (bonus / maxBonus),
          bonus,
          label: `Bonus by Yield ${Number(item.BonusYield) > 0 ? '+' : ''}${item.BonusYield}`,
        });
      });

      state.chartData = {
        labels: [...dsData.map((item) => item.x)],
        datasets: [
          {
            type: 'line',
            data: [...dsData],
            backgroundColor: 'rgba(200,200,200,0.05)',
            borderColor: 'rgba(200,200,200,0.5)',
            borderWidth: 1,
            fill: false,
            lineTension: 0,
            pointRadius: 4,
            pointHoverRadius: 10,
            yAxisId: 'derby-ds',
            datalabels: {
              display: false,
            },
          },
          {
            barPercentage: 0.98,
            categoryPercentage: 1.0,
            borderColor: '#15041A',
            backgroundColor: 'rgba(255,60,60,0.8)',
            yAxisId: 'derby-bonus',
            data: [...bonusData],
          },
        ],
      };

      state.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        fill: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        layout: {
          padding: {
            top: 10,
            bottom: 10,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            min: 0,
            max,
          },
        },
        plugins: {
          legend: {
            display: false,
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
            callbacks: {
              label(tooltipContext) {
                return tooltipContext.dataset.data[tooltipContext.dataIndex].label;
              },
              title(ctx) {
                return ctx[0].label;
              },
            },
            options: {
              padding: 10,
            },
            enabled: true,
            position: 'nearest',
            // external: externalTooltipHandler,
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
                size: w < 512 ? (bonusData.length > 9 ? 8 : 10) : 14,
                weight: 'bold',
              };
            },
            formatter(value, context) {
              const labelData = context.chart.data.datasets[context.datasetIndex].data[context.dataIndex];
              const data = dayjs(labelData.x).format('MMM. D');
              const bonus = Number(labelData.bonus);
              return `${data}\n${bonus > 0 ? '+' : ''}${bonus}`;
            },
          },
        },
      };
    };

    watch(derby, () => {
      generateChartData();
    });

    watch(
      () => state.selectedUsdChartPeriod,
      () => {
        generateChartData();
      },
    );

    return {
      ...toRefs(state),
      derby,
      generateChartData,
    };
  },
  data() {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
    };
  },
});
</script>
