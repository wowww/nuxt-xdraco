<template>
  <div id="contents" class="contents mirage-mirax">
    <main class="banner">
      <div class="banner__wrapper">
        <h1 class="banner--title">MiraX</h1>
        <p class="banner--description" v-html="$t('s.mirax-guide.top.desc1')"></p>
      </div>
    </main>
    <div class="contents">
      <div class="contents__wrapper">
        <section class="concept">
          <div class="concept__wrapper">
            <h2 class="concept--title">MiraX</h2>
            <p class="concept--description" v-html="$t('s.mirax-guide.concept.desc1')"></p>
          </div>
        </section>
        <div class="intro">
          <h2 class="intro--title" v-html="$t('t.mirax-guide.intro')"></h2>
          <p class="desc" v-html="$t('s.mirax-guide.intro.desc1')"></p>
          <p class="desc" v-html="$t('s.mirax-guide.intro.desc2')"></p>
        </div>
        <div class="define__wrapper is-reverse">
          <dl class="define">
            <dt class="define--title" v-html="$t('t.mirax-guide.obtaining')"></dt>
            <dd class="desc" v-html="$t('s.mirax-guide.obtaining.desc1')"></dd>
          </dl>
          <div class="wrap-img">
            <img class="mobile-image" src="https://file.mir4global.com/xdraco/img/mobile/mirage-mirax/img-obtaining.webp" alt="" />
            <img class="desktop-image" src="https://file.mir4global.com/xdraco/img/desktop/mirage-mirax/img-obtaining.webp" alt="" />
          </div>
        </div>
        <div class="define__wrapper">
          <dl class="define">
            <dt class="define--title" v-html="$t('t.mirax-guide.maximum')"></dt>
            <dd class="define--description desc" v-html="$t('s.mirax-guide.maximum.desc1')"></dd>
          </dl>
          <div class="wrap-img no-background-color">
            <img class="mobile-image" src="https://file.mir4global.com/xdraco/img/mobile/mirage-mirax/img-maximum.webp" alt="" />
            <img class="desktop-image" src="https://file.mir4global.com/xdraco/img/desktop/mirage-mirax/img-maximum.webp" alt="" />
          </div>
        </div>
        <dl class="define">
          <dt class="define--title" v-html="$t('t.mirax-guide.applying')"></dt>
          <dd>
            <p class="desc" v-html="$t('s.mirax-guide.applying.desc1')"></p>
            <p class="desc" v-html="$t('s.mirax-guide.applying.desc2')"></p>
            <figure class="figure-img no-gutter">
              <figcaption v-html="$t('w.mirage-playbook.sec2.part2.caption')"></figcaption>
              <img src="https://file.mir4global.com/xdraco/img/common/mirage-mirax/img-mirage-score-formula.webp" alt="MIRAGE Score formula" />
            </figure>
            <p class="caution" v-html="$t('s.mirax-guide.applying.caution1')"></p>
            <div class="applying-step">
              <div class="wrap-step step1">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl v-if="!isDesktop" class="mirage-score">
                    <dt class="mirage-score--title" v-html="$t('w.mirage.score')"></dt>
                    <dd class="mirage-score--value">380,632</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd class="mirax--value">0</dd>
                  </dl>
                </div>
                <div v-if="isDesktop" class="step-desc" v-html="$t('s.mirax-guide.applying.desc3-br')"></div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong v-if="isDesktop" class="txt" v-html="$t('w.mirax-guide.import')"></strong>
                  <strong v-else class="txt" v-html="$t('s.mirax-guide.applying.desc3')"></strong>
                </div>
              </div>
              <div class="wrap-step step2">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score">
                    <dt class="mirage-score--title" v-html="$t('w.mirage.score')"></dt>
                    <dd class="mirage-score--value">380,632</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd class="mirax--value">0</dd>
                  </dl>
                </div>
                <div v-if="isDesktop" class="step-desc" v-html="$t('s.mirax-guide.applying.desc4-br')"></div>
                <div v-else class="step-desc" v-html="$t('s.mirax-guide.applying.desc4')"></div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong class="txt gain">
                    <span class="icon-mirax">MiraX</span>
                    <strong class="gain-value">+100</strong>
                  </strong>
                </div>
              </div>
              <div class="wrap-step step3">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl class="mirage-score">
                    <dt class="mirage-score--title" v-html="$t('w.mirage.score')"></dt>
                    <dd class="mirage-score--value">381,022</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd class="mirax--value">100</dd>
                  </dl>
                  <div v-if="!isDesktop" class="step-desc">
                    <span v-html="$t('w.mirage.score')"></span><br />
                    <em>+590</em>
                  </div>
                </div>
                <div v-if="isDesktop" class="step-desc">
                  <span v-html="$t('w.mirage.score')"></span><br />
                  <em>+590</em>
                </div>
              </div>
              <div class="summary">
                <div class="summary__inner">
                  <strong v-if="!isDesktop" class="txt" v-html="$t('s.mirax-guide.applying.desc5')"></strong>
                  <strong v-if="isDesktop" class="txt" v-html="$t('w.mirage.seal')"></strong>
                </div>
              </div>
              <div class="wrap-step step4">
                <div class="image"></div>
                <div class="wrap-score">
                  <dl v-if="!isDesktop" class="mirage-score">
                    <dt class="mirage-score--title" v-html="$t('w.mirage.score')"></dt>
                    <dd class="mirage-score--value">381,022</dd>
                  </dl>
                  <dl class="mirax">
                    <dt>MiraX</dt>
                    <dd class="mirax--value">100</dd>
                  </dl>
                </div>
                <div v-if="isDesktop" class="step-desc" v-html="$t('s.mirax-guide.applying.desc5-br')"></div>
              </div>
            </div>
          </dd>
        </dl>
        <div class="section-remark">
          <strong v-html="$t('s.mirax-guide.remark')"></strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useState } from "vuex-composition-helpers/dist";

export default defineComponent({
  name: 'MirageMiraX',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
  },
  setup() {
    const { isDesktop } = useState(['isDesktop']);

    return {
      isDesktop,
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  })
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/mirage-mirax';
</style>
