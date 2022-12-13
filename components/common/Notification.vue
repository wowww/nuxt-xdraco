<template>
  <div class="notification-global">
    <button type="button" class="btn-close-dialog" @click="testAlert('close~~')">Close Notification</button>
    <a href="https://twitter.com/henryjgbanayat/status/1509008301769768966" class="link-external" target="_blank">go to twitter</a>
    <div class="sns-bi">
      <span class="twitter">by Twitter</span>
    </div>
    <p class="message">
      <em>#TAG_NAME</em> / Lorem ipsum dolor sit amet, <a href="https://wemade.com" target="_blank">https://wemade.com</a> consectetur adipiscing
      elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Notification',
  components: {
    //
  },
  props: {
    inDetail: {
      type: Boolean,
      required: false,
    },
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    isOpen: false,
  }),
  mounted() {
    document.documentElement.classList.add('show-notification-global');
  },
  destroyed() {
    document.documentElement.classList.remove('show-notification-global');
  },
  methods: {
    testAlert(value) {
      alert(value);
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/notification-global';
</style>
