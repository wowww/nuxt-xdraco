<template>
  <div ref="tickMirage" class="tick-mirage tick" :class="{ 'tick--smaller': smaller, 'theme-dark': dark, 'theme-purple': themePurple }">
    <div aria-hidden="true" data-repeat="true" data-layout="horizontal left fit">
      <div class="tick-group">
        <div data-key="value" data-repeat="true" data-transform="pad(00) -> split -> delay">
          <span data-view="flip"></span>
        </div>

        <span v-if="tickLabel" data-key="label" data-view="text" class="tick-label" data-transform="value(t)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'MirageCountdown',
  props: {
    targetDate: {
      type: String,
      required: true,
    },
    tickLabel: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    smaller: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    dark: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    themePurple: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    timerValue: [],
  }),
  watch: {
    dark() {
      this.$nextTick(() => {
        // this.createDomFlip();
        this.initCountdown();
      });
    },
  },
  mounted() {
    this.createDomFlip();
    this.initCountdown();
  },
  destroyed() {
    // if (process.client) {
    //   const Tick = document.Tick;
    //   Tick.DOM.destroy(this.$refs.tickMirage);
    // }
  },
  methods: {
    createDomFlip() {
      const { displayFormat } = this;
      const didInit = (tick) => {
        this.tickFlip = tick;
        // console.log(this.tickFlip.root.querySelectorAll('.tick-group .tick-label'));
      };

      if (process.client) {
        const Tick = window.Tick;
        if (!Tick) return;
        Tick.DOM.create(this.$refs.tickMirage, {
          // 시간 단위 갯수가 d-h-m-s 4개라면 0000
          value: '0000',
          didInit,
        });
      }
    },
    initCountdown() {
      const { targetDate } = this;
      const date = dayjs(targetDate).utc().local().toDate(); // 클라이언트의 시간 기준

      console.log('tick', window.Tick);

      if (process.client) {
        const Tick = window.Tick;
        if (!Tick) return;
        this.tickCounter = Tick.count.down(date, {
          format: ['d', 'h', 'm', 's'],
        });
        this.tickCounter.onupdate = (value) => {
          this.timerValue = value;

          if (this.tickFlip) {
            this.tickFlip.value = this.timerValue;
          }
        };
      }
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-countdown';
</style>
