<template>
  <main class="contents">
    <div :style="{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10rem auto' }">
      <v-progress-circular class="ml-2" :size="24" :width="4" color="#fff" indeterminate />
    </div>
  </main>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted } from '@vue/composition-api';
import qs from 'qs';
import Vue from 'vue';
import { useState } from 'vuex-composition-helpers/dist';

export default defineComponent({
  name: 'AuthCallback',
  setup() {
    const instance = getCurrentInstance();
    const vm = instance?.proxy || new Vue({});

    const { accessToken, dracoAccessToken } = useState(['accessToken', 'dracoAccessToken']);

    onMounted(() => {
      const query = qs.parse(vm.$route.query);

      console.log(query);
    });

    return {
      accessToken,
      dracoAccessToken,
    };
  },
});
</script>
