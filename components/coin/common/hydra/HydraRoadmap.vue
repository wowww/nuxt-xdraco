<template>
  <section class="section section-roadmap">
    <div class="section__inner">
      <div class="section-roadmap__contents">
        <h3 class="section-roadmap__title">{{ $t('t.hydra.roadmap') }}</h3>
        <ol class="section-roadmap__roadmap">
          <li class="section-roadmap__step1">
            <em class="section-roadmap--date">{{ $t('s.hydra-teaser.roadmap.part1.date') }}</em>
            <dl class="section-roadmap__step1--detail">
              <dt v-html="$t('t.hydra-teaser.roadmap.part2')"></dt>
              <dd>{{ $t('s.hydra-teaser.roadmap.part2') }}</dd>
            </dl>
          </li>
          <li class="section-roadmap__step2">
            <em class="section-roadmap--date" v-html="$t('s.hydra-teaser.roadmap.part2.date')"></em>
            <dl class="section-roadmap__step2--detail">
              <dt>HSP</dt>
              <dd v-html="$t('s.hydra-roadmap.part2')"></dd>
            </dl>
          </li>
          <li class="section-roadmap__step3">
            <em class="section-roadmap--date" v-html="$t('s.hydra-teaser.roadmap.part4.date')"></em>
            <dl class="section-roadmap__step3--detail">
              <dt v-html="$t('t.hydra.roadmap.part3')"></dt>
              <dd>{{ $t('s.hydra.roadmap.part3') }}</dd>
            </dl>
          </li>
          <li class="section-roadmap__step4">
            <em class="section-roadmap--date" v-html="$t('w.hydra.roadmap.part4.date')"></em>
            <dl class="section-roadmap__step4--detail">
              <dt>HSP101</dt>
              <dd>{{ $t('s.hydra-teaser.roadmap.part3') }}</dd>
            </dl>
          </li>
          <li class="section-roadmap__step5">
            <dl class="section-roadmap__step5--detail">
              <dt>AXD</dt>
              <dd>{{ $t('s.hydra.roadmap.part5') }}</dd>
            </dl>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraRoadmap',
});
</script>


