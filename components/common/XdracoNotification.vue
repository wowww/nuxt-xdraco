<template>
  <div class="notification-global">
    <button type="button" class="btn-close-dialog" @click="close">Close Notification</button>
    <a :href="`https://twitter.com/tweet/status/${notification.id}`" class="link-external" target="_blank">go to twitter</a>
    <div class="sns-bi">
      <!-- <span class="twitter">by Twitter</span> -->
      <img v-if="birdIndex === -1 || birdIndex === 0" src="https://file.mir4global.com/xdraco/img/common/notification-global/twitter-ani.gif" width="24" alt="by Twitter" />
      <img
        v-if="birdIndex === -1 || birdIndex === 1"
        src="https://file.mir4global.com/xdraco/img/common/notification-global/twitter-ani-crane.gif"
        width="36"
        alt="by Twitter"
      />
      <img
        v-if="birdIndex === -1 || birdIndex === 2"
        src="https://file.mir4global.com/xdraco/img/common/notification-global/twitter-ani-eagle.gif"
        width="36"
        alt="by Twitter"
      />
      <img
        v-if="birdIndex === -1 || birdIndex === 3"
        src="https://file.mir4global.com/xdraco/img/common/notification-global/twitter-ani-eagle2.gif"
        width="36"
        alt="by Twitter"
      />
      <img
        v-if="birdIndex === -1 || birdIndex === 4"
        src="https://file.mir4global.com/xdraco/img/common/notification-global/twitter-ani-pigeon.gif"
        width="24"
        alt="by Twitter"
      />
    </div>
    <p class="message" v-html="notification.text"></p>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'XdracoNotification',
  props: {
    inDetail: {
      type: Boolean,
      required: false,
    },
    notification: {
      type: Object,
      default: () => ({
        id: '',
        text: '',
        entities: {
          urls: [],
          hashtags: [],
        },
      }),
    },
  },
  setup({ notification }, { root, emit }) {
    const state = reactive({
      weights: [0.2, 0.2, 0.2, 0.2, 0.2],
      birdIndex: -1,
    });

    const drawBirds = () => {
      const cumulativeWeights = [];
      for (let i = 0; i < state.weights.length; i += 1) {
        cumulativeWeights[i] = state.weights[i] + (cumulativeWeights[i - 1] || 0);
      }

      const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
      const randomNumber = maxCumulativeWeight * Math.random();

      for (let itemIndex = 0; itemIndex < state.weights.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex] >= randomNumber) {
          state.birdIndex = itemIndex;
          break;
        }
      }
    };

    const close = () => {
      console.log('close', notification.id);
      localStorage.setItem(`xdraco-noti-${notification.id}`, true);

      emit('on-closed');
    };

    onMounted(() => {
      document.documentElement.classList.add('show-notification-global');
      drawBirds();
    });

    onUnmounted(() => {
      document.documentElement.classList.remove('show-notification-global');
    });

    return {
      ...toRefs(state),
      close,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/notification-global';
</style>
