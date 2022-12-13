<template>
  <section class="section section-refinery">
    <div class="section__inner">
      <h3 class="section-refinery__title" v-html="$t('t.hydra-refinery.title')"></h3>
      <p class="section-refinery__headline" v-html="$t('s.hydra-refinery.desc1')"></p>
      <div class="section-refinery__contents" v-viewer="viewerOption">
        <ul class="section-refinery__step">
          <li>
            <div class="section-refinery__step--desc">
              <h3 v-html="$t('t.hydra-refinery.step1.title')"></h3>
              <p v-html="$t('s.hydra-refinery.step1.desc1')"></p>
            </div>
          </li>
          <li>
            <div class="section-refinery__step__img">
              <ol>
                <li>
                  <span class="section-refinery__step__img--level">Lv.1 (Lv.60) ➝</span>
                  <span class="section-refinery__step__img--quantity">1</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.2 (Lv.65) ➝</span>
                  <span class="section-refinery__step__img--quantity">2</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.3 (Lv.70) ➝</span>
                  <span class="section-refinery__step__img--quantity">5</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.4 (Lv.75) ➝</span>
                  <span class="section-refinery__step__img--quantity">6</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.5 (Lv.80) ➝</span>
                  <span class="section-refinery__step__img--quantity">7</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.6 (Lv.85) ➝</span>
                  <span class="section-refinery__step__img--quantity">10</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.7 (Lv.90) ➝</span>
                  <span class="section-refinery__step__img--quantity">11</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.8 (Lv.95) ➝</span>
                  <span class="section-refinery__step__img--quantity">12</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.9 (Lv.100) ➝</span>
                  <span class="section-refinery__step__img--quantity">15</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.10 (Lv.110) ➝</span>
                  <span class="section-refinery__step__img--quantity">16</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.11 (Lv.120) ➝</span>
                  <span class="section-refinery__step__img--quantity">17</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.12 (Lv.130) ➝</span>
                  <span class="section-refinery__step__img--quantity">20</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.13 (Lv.140) ➝</span>
                  <span class="section-refinery__step__img--quantity">21</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.14 (Lv.150) ➝</span>
                  <span class="section-refinery__step__img--quantity">22</span>
                </li>
                <li>
                  <span class="section-refinery__step__img--level">Lv.15 (Lv.160) ➝</span>
                  <span class="section-refinery__step__img--quantity">25</span>
                </li>
              </ol>
              <div class="section-refinery__step__img--caption" v-html="$t('w.hydra-refinery.step1.caption')"></div>
            </div>
          </li>
        </ul>
        <ul class="section-refinery__step">
          <li class="section-refinery__step--desc">
            <h3 v-html="$t('t.hydra-refinery.step2.title')"></h3>
            <p v-html="$t('s.hydra-refinery.step2.desc1')"></p>
            <p v-html="$t('s.hydra-refinery.step2.desc2')"></p>
          </li>
          <li>
            <div class="section-refinery__step__img">
              <div>
                <figure class="section-refinery__step__img--by-viewer">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/img-game-menu1.webp" :alt="$t('s.guide.smeltery.step.1.screen.2')" />
                </figure>
                <figcaption v-html="$t('s.guide.smeltery.step.1.screen.2')"></figcaption>
              </div>
            </div>
          </li>
        </ul>
        <ul class="section-refinery__step">
          <li class="section-refinery__step--desc">
            <h3 v-html="$t('t.hydra-refinery.step3.title')"></h3>
            <p v-html="$t('s.hydra-refinery.step3.desc1')"></p>
            <p v-html="$t('s.hydra-refinery.step3.desc2')"></p>
            <p v-html="$t('s.hydra-refinery.step3.desc3')"></p>
            <div class="section-refinery__step__btn">
              <refining-calculator />
            </div>
          </li>
          <li>
            <div class="section-refinery__step__img">
              <div>
                <figure class="section-refinery__step__img--by-viewer by-viewer">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/img-game-menu2.webp" :alt="$t('w.hydra-refinery.step3.caption')" />
                </figure>
                <figcaption v-html="$t('w.hydra-refinery.step3.caption')"></figcaption>
              </div>
            </div>
          </li>
        </ul>
        <ul class="section-refinery__step">
          <li class="section-refinery__step--desc">
            <h3 v-html="$t('t.hydra-refinery.step4.title')"></h3>
            <p v-html="$t('s.hydra-refinery.step4.desc1')"></p>
            <strong class="section-refinery__step--caution" v-html="$t('s.hydra-refinery.step4.caution')"></strong>
          </li>
          <li>
            <div class="section-refinery__step__img">
              <div>
                <figure class="section-refinery__step__img--by-viewer by-viewer">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/img-game-menu3.webp" :alt="$t('w.home.wallet')" />
                </figure>
                <figcaption v-html="$t('w.home.wallet')"></figcaption>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { directive as viewer } from 'v-viewer';

import RefiningCalculator from '~/components/coin/common/RefiningCalculator';
import 'viewerjs/dist/viewer.css';

export default defineComponent({
  name: 'HydraRefinery',
  components: {
    RefiningCalculator,
  },
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  setup() {
    const state = reactive({
      viewerOption: {
        toolbar: false,
        title: false,
        filter(img) {
          return img.parentNode.classList.contains('by-viewer');
        },
      },
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>


