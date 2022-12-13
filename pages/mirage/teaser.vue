<template>
  <main id="contents" class="contents mirage-teaser">
    <banner-mirage-teaser-top />

    <section class="section section-video">
      <div class="section__inner">
        <div class="wrap-video" :class="{ 'wrap-video--open': isOpenVideo }">
          <iframe
            src="https://www.youtube.com/embed/m05v3jHvL6E"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section section-intro">
      <div class="section__inner">
        <h2 class="section-title">
          <img src="https://file.mir4global.com/xdraco/img/desktop/mirage/img-mirage-title.webp" width="193" :alt="$t('t.mirage-teaser.main')" />
        </h2>
        <figure class="intro">
          <span class="subject" v-html="$t('t.mirage-teaser.intro')"></span>
          <div class="part">
            <p class="new-line" v-html="$t('s.mirage-teaser.intro.part1.desc1')"></p>
            <p v-html="$t('s.mirage-teaser.intro.part1.desc2')"></p>
            <p v-html="$t('s.mirage-teaser.intro.part1.desc3')"></p>
          </div>
          <div class="part">
            <p v-html="$t('s.mirage-teaser.intro.part2.desc1')"></p>
            <p v-html="$t('s.mirage-teaser.intro.part2.desc2')"></p>
            <p class="new-line" v-html="$t('s.mirage-teaser.intro.part2.desc3')"></p>
          </div>
          <div class="part">
            <p v-html="$t('s.mirage-teaser.intro.part3.desc1')"></p>
            <p v-html="$t('s.mirage-teaser.intro.part3.desc2')"></p>
            <p class="new-line" v-html="$t('s.mirage-teaser.intro.part3.desc3')"></p>
          </div>
          <p class="remark" v-html="$t('s.mirage-teaser.intro.remark')"></p>
          <figcaption>
            <span class="txt-caption" v-html="$t('t.mirage-teaser.intro.caption')"></span>
          </figcaption>
        </figure>
        <span class="divider"></span>
      </div>
    </section>

    <section class="section section-define">
      <div class="section__inner">
        <h3 class="section-title" v-html="$t('t.mirage-teaser.define')"></h3>
        <p v-html="$t('s.mirage-teaser.define.desc1')"></p>
        <p v-html="$t('s.mirage-teaser.define.desc2')"></p>
        <p v-html="$t('s.mirage-teaser.define.desc3')"></p>
        <p v-html="$t('s.mirage-teaser.define.desc4')"></p>
        <strong class="remark" v-html="$t('s.mirage-teaser.define.remark')"></strong>
      </div>
    </section>

  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import BannerMirageTeaserTop from '@/components/banner/MirageTeaserTop';

export default defineComponent({
  name: 'MirageTeaser',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
  },
  components: {
    BannerMirageTeaserTop,
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
    isOpenVideo: false,
  }),
  mounted() {
    setTimeout(() => {
      this.isOpenVideo = !this.isOpenVideo;
    }, 400);
  },
});
</script>

<style lang="scss">
  @import '~@/assets/sass/common/app.scss';
  @import '~@/assets/sass/common/pages/mirage-teaser';
</style>
