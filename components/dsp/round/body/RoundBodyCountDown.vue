<template>
  <vue-countdown
    v-slot="{ days, hours, minutes, seconds }"
    class="round-countdown"
    :class="{ 'round-countdown--smaller': smaller }"
    :time="getTimeCountdown"
    :transform="transformSlotProps"
  >
    <span class="round-countdown__time">{{ days }}d</span>
    <span class="round-countdown__time">{{ hours }}h</span>
    <span class="round-countdown__time">{{ minutes }}m</span>
    <span class="round-countdown__time">{{ seconds }}s</span>
  </vue-countdown>
</template>

<script>
import VueCountdown from '@chenfengyuan/vue-countdown';
import { defineComponent } from '@vue/composition-api';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'RoundBodyCountDown',
  components: {
    VueCountdown,
  },
  props: {
    targetDate: {
      type: Number,
      required: true,
    },
    smaller: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data: () => {
    return {
      isDevelopment: process.env.NODE_ENV === 'development',
    };
  },
  computed: {
    getTimeCountdown() {
      if (!this.targetDate) {
        return null;
      }

      // const convertMs = this.targetDate * 1000;
      // const result = new Date(convertMs) - new Date();

      const date = dayjs.unix(this.targetDate).utcOffset(8).toDate();
      const now = dayjs().utcOffset(8).toDate();
      const result = date - now;

      return result;
    },
  },
  methods: {
    transformSlotProps(props) {
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
});
</script>


