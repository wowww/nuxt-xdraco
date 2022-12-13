<template>
  <div class="service-help">
    <header><img src="https://file.mir4global.com/xdraco/img/bi-xdraco-xs.webp" width="108" alt="XDraco" /></header>
    <div class="help-404">
      <img src="https://file.mir4global.com/xdraco/img/desktop/etc/ico-404.webp" width="60" alt="help for error" />
      <h2 class="title">404</h2>
      <h3 class="desc">{{ $t('s.etc.404') }}</h3>

      <div class="wrap-button">
        <button type="button" class="btn" @click="$router.go(-1)">BACK</button>
      </div>
    </div>

    <footer class="footer">
      <div class="footer__inner">
        <p class="copyright">&copy; Wemade Co., Ltd. All rights reserved.</p>
        <p class="powered-by">Powered by WEMIX</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
// eslint-disable-next-line import/extensions
export default defineComponent({
  name: 'Notfound',
  components: {
    //
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  methods: {
    //
  },
});
</script>

<style lang="scss" scoped>
@import '~@/assets/sass/_block.scss';
</style>
