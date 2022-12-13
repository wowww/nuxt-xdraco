<template>
  <section class="section section-spectrum">
    <div class="section__inner">
      <div class="section-spectrum__contents">
        <h3>{{ $t('t.hydra-teaser.spectrums') }}</h3>
        <ul>
          <li class="section-spectrum__contents--tied">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part1') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part1') }}</p>
          </li>
          <li class="section-spectrum__contents--synthetic">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part2') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part2') }}</p>
          </li>
          <li class="section-spectrum__contents--diplomatic">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part3') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part3') }}</p>
          </li>
          <li class="section-spectrum__contents--governance">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part4') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part4') }}</p>
          </li>
          <li class="section-spectrum__contents--defi">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part5') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part5') }}</p>
          </li>
          <li class="section-spectrum__contents--tradable">
            <div class="section-spectrum__contents__title">{{ $t('t.hydra-teaser.spectrums.part6') }}</div>
            <p>{{ $t('s.hydra-teaser.spectrums.part6') }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraSpectrums',
});
</script>


