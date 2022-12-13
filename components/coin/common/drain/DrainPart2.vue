<template>
  <div>
    <section class="section section-drain1">
      <div class="section__inner">
        <h2 class="section-drain1__title">
          <img src="https://file.mir4global.com/xdraco/img/mobile/drain-part2/section1-title-new.webp" alt="DRACO Initiative" />
        </h2>
        <!--        <p class="available-date">{{ $t('s.drain-teaser2.section1.date.des') }}<br />{{ $t('s.drain-teaser2.section1.date') }}</p>-->
        <div class="section-drain1__image">
          <img src="https://file.mir4global.com/xdraco/img/mobile/drain-part2/section1-thumb.webp" width="380" alt="" />
          <p class="section-drain1__contents__img--desc">Hydration</p>
        </div>
      </div>
    </section>
    <section class="section section-drain2">
      <div class="section__inner">
        <div class="section-drain2__report">
          <div class="section-drain2__report__title">
            <h2 class="section-drain2__title">Hydration Report</h2>
          </div>
          <p class="section-drain2--desc" v-html="$t('s.coin.drain.hydration-report.part1')"></p>
          <div class="section-drain2__purchase">
            <ul class="section-drain2__purchase__contents">
              <li class="section-drain2__purchase__contents--item">
                <div class="section-drain2__purchase__contents--subject mt-4">
                  <span>Procured HYDRAs</span>
                </div>
                <div class="section-drain2__purchase__contents--data">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/drain-part2/coin-hydra.webp" width="24" alt="HYDRA" />
                  <span>921,856</span>
                </div>
              </li>
              <li class="section-drain2__purchase__contents--item">
                <div class="section-drain2__purchase__contents--subject mt-4">
                  <span>Total Purchase Value</span>
                </div>
                <div class="section-drain2__purchase__contents--data">
                  <img src="https://file.mir4global.com/xdraco/img/desktop/drain-teaser/img-wmcr-symbol-sm.webp" width="24" alt="" />
                  <span>4,000,000</span>
                </div>
              </li>
            </ul>
            <div class="section-drain2__purchase__period"><span class="section-drain2__purchase__period--title">Hydration Period : </span> Feb. 16th, 2022 to May. 20th, 2022</div>
          </div>
          <dl>
            <dt>{{ $t('s.drain-teaser.subtitle') }}</dt>
            <dd v-html="$t('s.coin.drain.hydration-report.part2-1')"></dd>
            <dd style="margin-top: 12px" v-html="$t('s.coin.drain.hydration-report.part2-2')"></dd>
          </dl>
          <div class="section-drain2__purchase__bottom">
            <div>
              <p>{{ $t('s.drain-teaser.wallet') }} :</p>
              <p>0x05f9123cb8d60b20368067e979309e9b54bf60a5</p>
            </div>
            <a href="https://scope.wemixnetwork.com/1003/account/0x05f9123cb8d60b20368067e979309e9b54bf60a5" target="_blank">{{
                $t('s.drain-teaser.scope')
              }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-drain1">
      <div class="section__inner">
        <div class="section-drain1__contents">
          <div>
            <div class="section-drain1__contents__img">
              <img src="https://file.mir4global.com/xdraco/img/mobile/drain-part2/section1-thumb.webp" width="380" alt="" />
              <p class="section-drain1__contents__img--desc">Hydration</p>
            </div>
            <h3 class="section-drain1__subtitle mobile" v-html="$t('t.drain-teaser.section1')"></h3>
            <p v-html="$t('s.drain-teaser2.section1.des1')"></p>
          </div>
          <h3 class="section-drain1__subtitle desktop" v-html="$t('t.drain-teaser.section1')"></h3>
          <p v-html="$t('s.drain-teaser2.section1.des2')"></p>
          <p v-html="$t('s.drain-teaser2.section1.des3')"></p>
          <p v-html="$t('s.drain-teaser2.section1.des4')"></p>
        </div>
      </div>
    </section>

    <section class="section section-drain3">
      <div class="section__inner">
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle">{{ $t('t.drain-teaser2.section1.sub1') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des1')"></p>
        </div>
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle">{{ $t('t.drain-teaser2.section1.sub2') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des2')"></p>
        </div>
        <div class="section-drain3__part">
          <h3 class="section-drain3__subtitle">{{ $t('t.drain-teaser2.section1.sub3') }}</h3>
          <p v-html="$t('s.drain-teaser2.section1.sub.des3')"></p>
        </div>
        <div class="section-drain3__remark">
          <p v-html="$t('s.drain-teaser2.section1.comment')"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from '@vue/composition-api';

export default defineComponent({
  name: 'DrainPart2',
  setup() {
    onBeforeMount(() => {
      setTimeout(() => {
        document.documentElement.classList.add('init-drain-part2');
      });
    });
  },
  destroyed() {
    document.documentElement.classList.remove('init-drain-part2');
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/app.scss';
@import '~@/assets/sass/common/pages/coin/_drain';
</style>
