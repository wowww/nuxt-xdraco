<template>
  <div v-if="price.length > 1" class="wrap-price-history">
    <div class="chart-header">
      <h2 class="title">{{ $t('t.exd.avg-price.chart') }}</h2>
    </div>

    <line-chart
      class="price-chart"
      :styles="{ width: '100%', height: '280px', position: 'relative' }"
      :chart-data="chartData"
      :options="chartOptions"
      :plugins="chartPlugin"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch } from '@vue/composition-api';
import { LineChart } from 'vue-chart-3';

export default defineComponent({
  name: 'ExdDailyAvgPriceChart',
  components: {
    LineChart,
  },
  props: {
    itemId: {
      type: String,
      default: '',
    },
    enhance: {
      type: Number,
      default: 0,
    },
    grade: {
      type: Number,
      default: 2,
    },
  },
  setup(props, { root }) {
    const state = reactive({
      price: [],
      chartData: null,
      chartOptions: null,
      chartPlugin: null,
    });

    const fetchPriceHistory = () => {
      root.$dracoWebApi.get('/exd/sameitem/price', { params: { type: 'avg', itemID: props.itemId, enhance: props.enhance } }).then(({ data }) => {
        state.price = data.data;

        const labels = [];
        const priceData = [];

        /*
          {
            "CreateDate": "2022-01-07",
            "TotalVolume": "4",
            "TotalPrice": "471.000000000000000000",
            "AvgPrice": 117.75
          }
           */
        data.data.reverse().forEach((priceItem) => {
          priceData.push({
            x: priceItem.CreateDate,
            y: priceItem.AvgPrice,
            label: `${Number(priceItem.AvgPrice).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} HYDRA`,
          });
        });

        let color = '';

        switch (props.grade) {
          case 5:
            color = '130,0,220';
            break;
          case 4:
            color = '255,0,46';
            break;
          case 3:
            color = '51,145,255';
            break;
          case 2:
          default:
            color = '0,178,103';
            break;
        }

        state.chartData = {
          labels,
          datasets: [
            {
              data: [...priceData],
              backgroundColor: `rgba(${color},0.1)`,
              borderColor: `rgba(${color},1)`,
              borderWidth: 1,
              fill: true,
              lineTension: 0,
              pointRadius: 0,
              pointHoverRadius: 10,
              hitRadius: 10,
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
                  return '';
                },
              },
              display: false,
              // max: dracoPeriod.value === 'daily' ? now.hour(23).minute(59).second(59).millisecond(0).format('YYYY-MM-DD HH:mm:ss') : datas[datas.length - 1].CreatedDT,
            },
            y: {
              display: true,
              ticks: {
                display: true,
                beginAtZero: true,
                // eslint-disable-next-line no-unused-vars
                // callback(value, index, values) {
                //   return value;
                // }
              },
              grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)',
              },
              scaleLabel: {
                display: false,
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
      });
    };

    watch(
      () => props.itemId,
      () => {
        console.log('price watch', props);
        fetchPriceHistory();
      },
    );

    onMounted(() => {
      console.log(props.itemId);
      fetchPriceHistory();
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
.wrap-price-history {
  position: relative;
  padding: 48px 0 0;
  min-height: 100px;

  .price-chart {
    margin-top: 18px;
  }
}
</style>
