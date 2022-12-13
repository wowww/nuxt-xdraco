<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="wrap-links">
        <a href="/policy" class="link" target="_blank" v-html="$t('t.policy.main')"></a>
        <a href="https://forum.mir4global.com/policy/terms" class="link" target="_blank" v-html="$t('w.mirage.footer.terms')"></a>
      </div>
      <div class="bottom">
        <p class="copyright">&copy; Wemade Co., Ltd. All rights reserved.</p>
        <p class="powered-by">Powered on <em class="brand-identity">WEMIX</em></p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'AppFooter',
  data: () => ({
    //
  }),
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/footer';
</style>
