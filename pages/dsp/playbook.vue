<template>
  <main class="dsp-playbook">
    <section class="section section-main">
      <div class="section__inner section-main__inner">
        <hgroup class="wrap-title">
          <h2 class="wrap-title__title">{{ $t('t.playbook.section1') }}</h2>
          <h3 class="wrap-title__desc">
            {{ $t('s.playbook.section1.intro1') }}<br/><br/>
            {{ $t('s.playbook.section1.intro2') }}
          </h3>
        </hgroup>
      </div>
    </section>

    <section class="section section-basic">
      <div class="section__inner section-basic__inner">
        <h3 class="section__title">{{ $t('t.playbook.section2') }}</h3>
        <p class="section__desc">
          {{ $t('s.playbook.section2.desc1') }}<br/><br/>
          {{ $t('s.playbook.section2.desc2') }}<br/><br/>
          {{ $t('s.playbook.section2.desc3') }}
        </p>
      </div>
    </section>

    <section class="section section-round">
      <div class="section__inner section-round__inner">
        <h3 class="section__title">{{ $t('t.playbook.section3') }}</h3>
        <ul class="section-round__list">
          <li class="section-round__list__item">
            <h4 class="section-round__list__title">{{ $t('t.playbook.section3.duration') }}</h4>
            <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/round-duration.webp" width="327"
                 alt="Round Duration"/>
            <p class="section-round__list__desc">{{ $t('s.playbook.section3.duration') }}</p>
          </li>
          <li class="section-round__list__item">
            <h4 class="section-round__list__title">{{ $t('t.playbook.section3.entry') }}</h4>
            <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/round-entryfee.webp" width="327"
                 alt="Round Entry Fee"/>
            <p class="section-round__list__desc">{{ $t('s.playbook.section3.entry') }}</p>
          </li>
          <li class="section-round__list__item">
            <h4 class="section-round__list__title">{{ $t('t.playbook.section3.minimum') }}</h4>
            <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/round-minstake.webp" width="327"
                 alt="Round Minimum Stake"/>
            <p class="section-round__list__desc">{{ $t('s.playbook.section3.minimum') }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section section-algorithm">
      <div class="section__inner section-algorithm__inner">
        <h3 class="section__title">{{ $t('t.playbook.section4') }}</h3>
        <p class="section__desc">{{ $t('s.playbook.section4.desc') }}</p>
        <div class="wrap-formula">
          <small>{{ $t('t.playbook.section4.formula') }}</small>
          <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/formula.webp" width="327"
               alt="Fair-time algorithm formula" class="wrap-formula__img"/>
          <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/formula-graph.webp" width="440"
               alt="Fair-time algorithm infograph" class="wrap-formula__infograph"/>
        </div>
      </div>
    </section>

    <section class="section section-winning">
      <div class="section__inner section-winning__inner">
        <h3 class="section__title">{{ $t('t.playbook.section5') }}</h3>
        <p class="section__desc">{{ $t('s.playbook.section5.desc') }}</p>
        <div class="wrap-formula">
          <small>{{ $t('t.playbook.section5.formula') }}</small>
          <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/formula-odds.png" width="254"
               alt="Winning odds formula" class="wrap-formula__img"/>
          <ul class="wrap-graph">
            <li class="wrap-graph__item">
              <p id="oddhigher-description" class="wrap-graph__item__desc">{{ $t('s.playbook.section5.formula1') }}</p>
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/playbook/winning-odd-graph.webp"
                width="335"
                alt="Winning odds higher"
                aria-describedby="oddhigher-description"
              />
            </li>
            <li class="wrap-graph__item">
              <p id="oddincrease-description" class="wrap-graph__item__desc">{{
                  $t('s.playbook.section5.formula2')
                }}</p>
              <img
                src="https://file.mir4global.com/xdraco/img/mobile/playbook/winning-odd-increase.webp"
                width="327"
                alt="Winning Odds increase"
                aria-describedby="oddincrease-description"
              />
            </li>
          </ul>
        </div>
        <div class="wrap-define">
          <dl class="wrap-define__content">
            <dt>{{ $t('t.playbook.section5.prestake') }}</dt>
            <dd>
              <div class="wrap-define__desc">
                {{ $t('s.playbook.section5.prestake1') }}
                <small>{{ $t('s.playbook.section5.prestake2') }}</small>
              </div>
            </dd>
          </dl>
          <dl class="wrap-define__content">
            <dt>{{ $t('t.playbook.section5.stakeearlier') }}</dt>
            <dd>
              <div class="wrap-define__desc">{{ $t('s.playbook.section5.stakeearlier') }}</div>
            </dd>
          </dl>
          <dl class="wrap-define__content">
            <dt>{{ $t('t.playbook.section5.stakemore') }}</dt>
            <dd>
              <div class="wrap-define__desc">{{ $t('s.playbook.section5.stakemore') }}</div>
            </dd>
          </dl>
        </div>
      </div>
    </section>

    <section class="section section-rewards">
      <div class="section__inner">
        <h3 class="section__title">{{ $t('t.playbook.section6') }}</h3>
        <p class="section__desc">{{ $t('s.playbook.section6.intro') }}</p>
        <div class="wrap-define">
          <dl class="wrap-define__content">
            <dt>{{ $t('t.playbook.section6.winnerdraw') }}</dt>
            <dd>
              <div class="wrap-define__desc">{{ $t('s.playbook.section6.winnerdraw') }}</div>
              <div class="wrap-define__img">
                <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/reward-odds.webp" width="440"
                     alt="Round Duration"/>
              </div>
            </dd>
          </dl>
          <dl class="wrap-define__content">
            <dt>{{ $t('t.playbook.section6.rewards') }}</dt>
            <dd>
              <div class="wrap-define__desc">
                {{ $t('s.playbook.section6.rewards1') }}<br/><br/>
                {{ $t('s.playbook.section6.rewards2') }}
              </div>
            </dd>
          </dl>
        </div>
        <div class="wrap-formula">
          <small>{{ $t('t.playbook.section6.formula') }}</small>
          <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/formula-reward.png" width="283"
               alt="Rewards Share Formula" class="wrap-formula__img"/>
          <img src="https://file.mir4global.com/xdraco/img/mobile/playbook/reward-winner.webp" width="441"
               alt="Round Duration" class="wrap-formula__img--winner"/>
        </div>
      </div>
    </section>

    <section class="section-youtube">
      <div class="section-youtube__content">
        <iframe
          width="960"
          height="540"
          src="https://www.youtube.com/embed/eguxHwvKdkU"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </div>
    </section>

  </main>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  meta: {
    title: 'DSP | XDRACO',
    hasSubNav: 'dsp',
  },
  beforeMount() {
    setTimeout(() => {
      document.documentElement.classList.add('init-playbook');
    }, 300);
  },
  mounted() {
    this.setLineBreak('.wrap-title .wrap-title__title', 46);
  },
  beforeUpdate() {
    if (!this.$el.querySelector('.wrap-title wrap-title__title')) {
      return;
    }
    this.$el.querySelector('.wrap-title wrap-title__title').classList.remove('line-break');
  },
  updated() {
    this.setLineBreak('.wrap-title wrap-title__title', 46);
  },
  destroyed() {
    document.documentElement.classList.remove('init-playbook');
  },
  methods: {
    setLineBreak(selector, breakpoint) {
      if (!selector || !this.$el.querySelector(selector)) {
        return;
      }
      if (!breakpoint) {
        breakpoint = 46;
      }

      const properties = this.$el.querySelectorAll(selector);
      [].map.call(properties, (obj) => {
        if (obj.clientHeight >= breakpoint) {
          obj.classList.add('line-break');
        }
      });
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/common/pages/dsp/_dsp-playbook';
</style>
