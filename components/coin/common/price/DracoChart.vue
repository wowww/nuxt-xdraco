<template>
  <div
    class="wrap-chart topless"
  >
    <v-btn-toggle
      class="wrap-button-chart wrap-button-chart justify-end"
      :value="chartPeriod"
      mandatory
      borderless
    >
      <v-btn value="daily" @click="setChartPeriod('daily')">
        <span>1D</span>
      </v-btn>
      <v-btn value="weekly" @click="setChartPeriod('weekly')">
        <span>1W</span>
      </v-btn>
      <v-btn value="monthly" @click="setChartPeriod('monthly')">
        <span>1M</span>
      </v-btn>
      <v-btn value="max" @click="setChartPeriod('max')">
        <span>MAX</span>
      </v-btn>
    </v-btn-toggle>
    <div style="min-height: 280px">
      <client-only>
        <line-chart
          v-if="chartData"
          :styles="{ width: '100%', height: '280px', position: 'relative', padding: !isDesktop && '4px 8px 0' }"
          :chart-data="chartData"
          :options="chartOptions"
          :plugins="chartPlugin"
        />
      </client-only>
    </div>

    <div class="indicator-currency">
      <div class="currency" data-color="red">
        <img
          src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-hydra.webp"
          height="20"
          alt="HYDRA"
        />
        <span class="name">HYDRA</span>
        <span
          class="line"
          style="background-color: rgba(153, 153, 265, 1)"
        ></span>
      </div>
      <div class="currency" data-color="red">
        <img
          src="https://file.mir4global.com/xdraco/img/common/logged-in/logo-draco.webp"
          height="20"
          alt="DRACO"
        />
        <span class="name">DRACO</span>
        <span class="line" style="background-color: #aa00ff"></span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  toRefs,
  watch,
} from '@vue/composition-api';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs';
import { LineChart } from 'vue-chart-3';
import {
  useActions,
  useMutations,
  useState,
} from 'vuex-composition-helpers/dist';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'DracoChart',
  components: { LineChart },
  props: {
    currentCurrency: {
      type: String,
      required: true,
    },
  },
  setup(props, {root}) {
    const { $nextTick } = root;
    const state = reactive({
      chartData: null,
      chartOptions: null,
      chartPlugin: null,
      timer: null,
    });

    const { setChartPeriod } = useMutations(['setChartPeriod']);
    const { fetchDraco, fetchHydra } = useActions(['fetchDraco', 'fetchHydra']);

    const { chartPeriod, draco, hydra, isDesktop } = useState(['chartPeriod', 'draco', 'hydra', 'isDesktop']);

    const generateChartData = () => {
      if (draco.value[chartPeriod.value] && hydra.value[chartPeriod.value]) {
        const datas = draco.value[chartPeriod.value];
        const hydraDatas = [];
        const dracoCurrency =
          props.currentCurrency === 'usd' ? 'USDDracoRate' : 'DracoPrice';
        const hydraCurrency =
          props.currentCurrency === 'usd' ? 'USDHydraRate' : 'HydraPrice';
        const labels = [];
        const priceData = [];
        const priceHydraData = [];
        const now = dayjs().hour(0).minute(0).second(0).millisecond(0);
        const end = now.hour(23).minute(59).second(59).millisecond(0);

        for (let m = now; m.isBefore(end); m = m.add(5, 'minute')) {
          labels.push(m.toISOString());
        }

        const createdDTList = datas.map((item) => item.CreatedDT);

        createdDTList.forEach((dt) => {
          const dtDay = dayjs(`${dt} +00:00`, 'YYYY/MM/DD HH:mm:ss Z');
          const idx = hydra.value[chartPeriod.value].findIndex((item) => dayjs(`${item.CreatedDT} +00:00`, 'YYYY/MM/DD HH:mm:ss Z').isSame(dtDay));

          if (idx === -1) {
            hydraDatas.push({
              CreatedDT: dt,
              HydraPrice: NaN,
              USDHydraRate: NaN,
            });
          } else {
            hydraDatas.push(hydra.value[chartPeriod.value][idx]);
          }
        });

        hydraDatas.forEach((item) => {
          const date = `${item.CreatedDT}`;
          const price = item[hydraCurrency]
            ? item[hydraCurrency]
            : item.HydraPrice;
          const dayjsDate = dayjs(`${date} +00:00`, 'YYYY/MM/DD HH:mm:ss Z');
          const diff = Math.round(dayjsDate.diff(now) / 1000);
          if (
            chartPeriod.value !== 'daily' ||
            (chartPeriod.value === 'daily' && diff >= 0)
          ) {
            priceHydraData.push({
              x: dayjsDate.toISOString(),
              y: price,
              label: `${props.currentCurrency.toUpperCase()} / HYDRA ${Number(
                price,
              ).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}`,
            });
          }
        });
        datas.forEach((item) => {
          const date = `${item.CreatedDT}`;
          const price = item[dracoCurrency]
            ? item[dracoCurrency]
            : item.DracoPrice;
          const dayjsDate = dayjs(`${date} +00:00`, 'YYYY/MM/DD HH:mm:ss Z');
          const diff = Math.round(dayjsDate.diff(now) / 1000);
          if (
            chartPeriod.value !== 'daily' ||
            (chartPeriod.value === 'daily' && diff >= 0)
          ) {
            priceData.push({
              x: dayjsDate.toISOString(),
              y: price,
              label: `${props.currentCurrency.toUpperCase()} / DRACO ${Number(
                price,
              ).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
              })}`,
            });
          }
        });

        // eslint-disable-next-line no-unused-vars
        const minDraco = Math.min.apply(
          null,
          priceData.map((item) => item.y),
        );
        // eslint-disable-next-line no-unused-vars
        const maxDraco = Math.max.apply(
          null,
          priceData.map((item) => item.y),
        );
        // eslint-disable-next-line no-unused-vars
        const minHydra = Math.min.apply(
          null,
          priceHydraData.map((item) => item.y),
        );

        // eslint-disable-next-line no-unused-vars
        const maxHydra = Math.max.apply(
          null,
          priceHydraData.map((item) => item.y),
        );

        state.chartData = {
          labels: chartPeriod.value === 'daily' ? labels : [...priceHydraData],
          datasets: [
            {
              data: [...priceHydraData],
              borderColor: 'rgba(153,153,265,1)',
              hoverBorderColor: 'rgba(153,153,265,1)',
              borderWidth: 1,
              fill: true,
              lineTension: 0,
              pointRadius: 0,
              pointHoverRadius: 10,
              hitRadius: 10,
              yAxisID: 'y',
            },
            {
              data: [...priceData],
              borderColor: 'rgba(130,0,220,1)',
              hoverBorderColor: 'rgba(130,0,220,1)',
              borderWidth: 1,
              fill: true,
              lineTension: 0,
              pointRadius: 0,
              pointHoverRadius: 10,
              hitRadius: 10,
              yAxisID: 'y1',
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
              top: 5,
              bottom: 0,
            },
          },
          elements: {
            line: {
              tension: 0,
            },
          },
          parsing: {
            xAisKey: 'x',
            yAisKey: 'y',
          },
          scales: {
            x: {
              scaleLabel: {
                display: true,
              },
              ticks: {
                callback(val, idx) {
                  if (chartPeriod.value === 'daily' && idx % 72 !== 0) {
                    return '';
                  }
                  return dayjs(this.getLabelForValue(val)).format('HH:mm');
                },
              },
              display: false,
              min:
                chartPeriod.value === 'daily'
                  ? now.toISOString()
                  : datas[0].CreatedDT,
              // max: chartPeriod.value === 'daily' ? now.hour(23).minute(59).second(59).millisecond(0).format('YYYY-MM-DD HH:mm:ss') : datas[datas.length - 1].CreatedDT,
            },
            y: {
              display: true,
              position: 'left',
              ticks: {
                display: true,
                beginAtZero: true,
                color: 'rgba(153,153,265,1)',
                // eslint-disable-next-line no-unused-vars
                // callback(value, index, values) {
                //   return value;
                // }
              },
              grid: {
                display: false,
                color: 'rgba(255, 255, 255, 0.1)',
              },
              suggestMin: 0,
              suggestMax: 4,
            },
            y1: {
              display: true,
              position: 'right',
              ticks: {
                display: true,
                beginAtZero: true,
                color: '#AA00FF',
                // eslint-disable-next-line no-unused-vars
                // callback(value, index, values) {
                //   return value;
                // }
              },
              grid: {
                display: false,
                color: 'rgba(255, 255, 255, 0.1)',
              },
              suggestMin: 0,
              suggestMax: 4,
            },
          },
          animations: {
            duration: 0,
          },
          transitions: {
            show: {
              animations: {
                x: {
                  from: 0,
                },
                y: {
                  from: 0,
                },
              },
            },
            hide: {
              animations: {
                x: {
                  to: 0,
                },
                y: {
                  to: 0,
                },
              },
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
                  return tooltipContext.dataset.data[tooltipContext.dataIndex]
                    .label;
                },
                title(ctx) {
                  // return DateTime.fromFormat(ctx[0].label, 'yyyy-MM-dd HH:mm:ss').toLocaleString(DateTime.DATETIME_FULL);
                  return dayjs(ctx[0].label).format('lll');
                },
              },
              options: {
                padding: 10,
              },
              enabled: true,
              position: 'nearest',
              // external: externalTooltipHandler,
            },
          },
        };

        state.chartPlugin = [
          {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = '#11091C';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            },
          },
        ];
      }
    };

    watch(
      () => props.currentCurrency,
      () => {
        generateChartData();
      },
    );

    watch(
      () => chartPeriod.value,
      () => {
        // if (props.currentCurrency.toLowerCase() === props.currency.toLowerCase()) {
        //   state.chartData = null;
        state.chartData.datasets = [];
        state.chartOptions.scales.y.display = false;

        let callApi = false;

        if (!draco.value[chartPeriod.value]) {
          callApi = true;
        }

        if (callApi) {
          fetchDraco();
          fetchHydra();
        }

        $nextTick(() => {
          generateChartData();
        });
        // }
      },
    );

    watch(() => draco.value && hydra.value,
      () => {
        generateChartData();
    });

    onMounted(() => {
      if (draco.value && hydra.value) {
        generateChartData();
      }

      state.timer = setInterval(() => {
        fetchDraco();
        fetchHydra();
      }, 1000 * 60);
    });

    onUnmounted(() => {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }

      setChartPeriod('daily');
    });

    return {
      ...toRefs(state),
      isDesktop,
      chartPeriod,
      draco,
      hydra,
      generateChartData,
      fetchDraco,
      setChartPeriod,
    };
  },
});
</script>
