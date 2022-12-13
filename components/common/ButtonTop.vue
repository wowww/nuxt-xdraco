<template>
  <button
    type="button"
    class="btn-top"
    :class="{ 'btn-offset-y': hasBottomSticky === 'type1', 'btn-offset-y2': hasBottomSticky === 'type2' }"
    @click="goToTop"
  >
    Go to Top
  </button>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import goTo from 'vuetify/lib/services/goto';

export default defineComponent({
  name: 'ButtonTop',
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    pageScrollY: 0,
    duration: 500,
    offset: 0,
    hasBottomSticky: '',
  }),
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    $route(to) {
      this.setBottomStickyStyle(to.meta);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
      };
    },
  },
  methods: {
    setBottomStickyStyle(meta) {
      if (!meta) {
        return;
      }
      if (meta.hasBottomSticky) {
        this.hasBottomSticky = meta.hasBottomSticky;
      }
    },
    handleScroll() {
      this.pageScrollY = window.scrollY;
      if (this.pageScrollY > 500) {
        this.$el.classList.add('btn-activated');
      } else {
        this.$el.classList.remove('btn-activated');
      }
    },
    goToTop() {
      // const target = ev.target.getAttribute('href');
      const target = 0;

      goTo(target, this.options);
    },
  },
});
</script>
