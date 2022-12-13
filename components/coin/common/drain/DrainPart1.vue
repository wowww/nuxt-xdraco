<template>
  <div>
    <section class="section section-drain1">
      <div class="section__inner">
        <h2 class="section-drain1__title">
          <span v-html="$t('t.drain-teaser')"></span>
          <span v-html="$t('t.drain-teaser2')"></span>
        </h2>
        <p class="section-drain1__date" v-html="$t('s.drain-teaser.section1.date')"></p>
        <div class="section-drain1__contents">
          <div>
            <div class="section-drain1__contents__img">
              <img src="https://file.mir4global.com/xdraco/img/mobile/drain-teaser/section1-thumb.webp" width="100%" />
              <p class="section-drain1__contents__img--desc">Draining of DRACO</p>
            </div>
            <h3 class="section-drain1__subtitle mobile" v-html="$t('t.drain-teaser.section1')"></h3>
            <p v-html="$t('s.drain-teaser.section1.part1')"></p>
          </div>
          <h3 class="section-drain1__subtitle desktop" v-html="$t('t.drain-teaser.section1')"></h3>
          <p class="part2" v-html="$t('s.drain-teaser.section1.part2')"></p>
          <p v-html="$t('s.drain-teaser.section1.part3')"></p>
        </div>
      </div>
    </section>

    <section class="section section-drain2">
      <div class="section__inner">
        <div class="section-drain2__report">
          <div class="section-drain2__report__title">
            <h2 class="section-drain2__title">{{ $t('t.drain-teaser.section2complete') }}</h2>
          </div>
          <p class="section-drain2--desc" v-html="$t('s.drain-teaser.desc2complete')"></p>
          <div class="section-drain2__purchase">
            <div class="section-drain2__purchase__heading">
              <h4>{{ $t('s.drain-teaser.purchased,.desc') }}</h4>
              <div class="section-drain2__purchase__heading--data">
                <img src="https://file.mir4global.com/xdraco/img/desktop/drain-teaser/img-coin-hydra-big.webp" width="24" alt="" />
                <p>5,168,902<span> /10,000,000</span></p>
              </div>
            </div>
            <ul class="section-drain2__purchase__contents">
              <li class="section-drain2__purchase__contents--item">
                <div class="section-drain2__purchase__contents--subject">
                  <span>{{ $t('s.drain-teaser.drainprice') }}</span>
                </div>
                <div class="section-drain2__purchase__contents--data">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="20" alt="" />
                  <span>0.123</span>
                </div>
              </li>
              <li class="section-drain2__purchase__contents--item">
                <div class="section-drain2__purchase__contents--subject">
                  <span>{{ $t('s.drain-teaser.worth') }}</span>
                </div>
                <div class="section-drain2__purchase__contents--data">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="20" alt="" />
                  <span>635,766<span class="sm">.5542</span></span>
                </div>
              </li>
            </ul>
          </div>
          <dl>
            <dt>{{ $t('s.drain-teaser.subtitle') }}</dt>
            <dd>{{ $t('s.drain-teaser.subdesc') }}</dd>
          </dl>
          <div class="section-drain2__purchase__bottom">
            <div>
              <p class="section-drain2__purchase__bottom--wallet">{{ $t('s.drain-teaser.wallet') }} :</p>
              <p>0x000000000000000000000000000000000000dead</p>
            </div>
            <a href="https://scope.wemixnetwork.com/1003/account/0x000000000000000000000000000000000000dead" target="_blank">{{
              $t('s.drain-teaser.scope')
            }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-drain3">
      <div class="section__inner">
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle" v-html="$t('t.drain-teaser.section3.part1')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part1')"></p>
        </div>
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle" v-html="$t('t.drain-teaser.section3.part2')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part2')"></p>
        </div>
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle" v-html="$t('t.drain-teaser.section3.part3')"></h3>
          <p v-html="$t('s.drain-teaser.section3.part3')"></p>
        </div>
        <div class="section-drain3__remark">
          <p v-html="$t('t.drain-teaser.section3.part4')"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DrainPart1',
  components: {

  },
  setup() {
    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-drain-part1');
      });
    });
  },
  destroyed() {
    document.documentElement.classList.remove('init-drain-part1');
  },
  methods: {
    //
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_drain'; // for Hydra Teaser
</style>
