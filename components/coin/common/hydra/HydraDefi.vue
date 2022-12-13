<template>
  <section class="section section-defi">
    <div class="section__inner">
      <h3 class="section-title" v-html="$t('t.hydra-defi.title')"></h3>
      <dl class="section-defi__contents">
        <div>
          <dt>
            <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/img-hsp-black.webp" width="108" alt="HSP" />
          </dt>
          <dd>
            <p v-html="$t('s.hydra-defi.hsp.desc1')"></p>
            <nuxt-link to="/hsp" class="section-defi__contents--link"><p v-html="$t('s.notice.hsp-open.link')" /></nuxt-link>
          </dd>
        </div>
        <div>
          <dt>
            <img src="https://file.mir4global.com/xdraco/img/desktop/hydra/img-hsp-101-black.webp" width="154" alt="HSP101" />
          </dt>
          <dd>
            <p v-html="$t('s.hydra-defi.hsp101.desc2')"></p>
            <span class="section-defi__contents--soon" v-html="$t('s.hydra-defi.hsp101.link')"></span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'HydraDefi',
  computed: {
    getXDracoHost() {
      return process.env.VUE_APP_XDRACO_HOST;
    },
  },
});
</script>


