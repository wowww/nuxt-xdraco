<template>
  <section class="section section-video">
    <div class="section__inner">
      <div class="section-video__contents" :class="{ 'wrap-video--open': isOpen }">
        <iframe
          src="https://www.youtube.com/embed/ObbtiIcflVA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraYoutubeVideo',
  data: () => ({
    isOpen: false,
  }),
  mounted() {
    setTimeout(() => {
      this.isOpen = !this.isOpen;
    }, 400);
  },
});
</script>


