<template>
  <section class="section section-prologue">
    <div class="section__inner">
      <div class="section-prologue__contents">
        <h3>{{ $t('t.hydra-teaser.prologue') }}</h3>
        <p>{{ $t('s.hydra-teaser.prologue.desc') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc2') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc3') }}</p>
        <p>{{ $t('s.hydra-teaser.prologue.desc4') }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraPrologue',
});
</script>


