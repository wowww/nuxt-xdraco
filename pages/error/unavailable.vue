<template>
  <div class="unavailable-xdraco">
    <h1 class="header">
      <img src="https://file.mir4global.com/xdraco/img/public/unavailable/bi-xdraco.webp" class="bi" alt="XDRACO" />
    </h1>

    <div class="contents">
      <svg class="identity" width="80" height="64" viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M.902 63.5 40 .943 79.098 63.5H.902z" stroke="#fff" />
        <g clip-path="url(#rdelumwhja)">
          <g clip-path="url(#dqruwbn5yb)" fill="#fff">
            <path
              d="M34.111 32.065a5.822 5.822 0 0 1 5.815-5.815 5.821 5.821 0 0 1 5.815 5.815v5.605H43.78v-5.605a3.857 3.857 0 0 0-3.853-3.853 3.857 3.857 0 0 0-3.853 3.853v5.605l-1.962.032v-5.637z"
            />
            <path
              d="M39.927 34.8a9.725 9.725 0 1 0 0 19.45 9.725 9.725 0 0 0 0-19.45zm1.672 13.395h-3.345l.649-3.53a2.041 2.041 0 0 1-.422-3.212 2.044 2.044 0 0 1 3.216 2.465c-.179.31-.437.568-.747.748l.649 3.529z"
            />
          </g>
        </g>
        <defs>
          <clipPath id="rdelumwhja">
            <path fill="#fff" transform="translate(26 26.25)" d="M0 0h28v28H0z" />
          </clipPath>
          <clipPath id="dqruwbn5yb">
            <path fill="#fff" transform="translate(30.2 26.25)" d="M0 0h19.451v28H0z" />
          </clipPath>
        </defs>
      </svg>
      <h2 class="title-page">Page Unavailable</h2>
      <p>Services offered through this site are not available in your region.</p>
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
  name: 'Unavailable',
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

<style lang="scss">
@import '~@/assets/sass/block';
</style>
