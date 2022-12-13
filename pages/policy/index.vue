<template>
  <div class="xdraco-policy">
    <main class="contents">
      <section class="top">
        <div class="top__inner">
          <h1>{{ $t(`t.policy.main`) }}</h1>
          <v-spacer></v-spacer>
          <div class="version">
            <v-select
              v-model="version"
              class="version-select"
              :items="versionList"
              outlined
              dense
              :menu-props="{ bottom: true, offsetY: true }"
              :hide-details="true"
            >
              <template #append>
                <img class="arrow" src="https://file.mir4global.com/xdraco/img/common/version-arrow.webp" />
              </template>
            </v-select>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section__inner">
          <p>{{ $t(`s.policy.main.des`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.first`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.first.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.first.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.first.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.first.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.first.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.first.des6`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.first.des6.sub1`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.first.des6.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.first.des6.sub3`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.first.des6.sub4`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.first.des6.sub5`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.first.des6.sub6`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.first.des6.sub7`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.second`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.second.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des6`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des7`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des8`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.second.des9`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.third`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.third.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.third.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.third.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.third.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.third.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.third.des6`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.fourth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.fourth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fourth.des2`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.fourth.des2.sub1`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub3`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub4`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub4-1`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub5`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub6`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub7`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des2.sub8`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.fourth.des2.sub9`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fourth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fourth.des4`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.fourth.des4.sub1`) }}</p>
          <p class="tab double first">{{ $t(`s.policy.version-${version}.fourth.des4.sub1-1`) }}</p>
          <p class="tab double">{{ $t(`s.policy.version-${version}.fourth.des4.sub1-2`) }}</p>
          <p class="tab double">{{ $t(`s.policy.version-${version}.fourth.des4.sub1-3`) }}</p>
          <p class="tab double">{{ $t(`s.policy.version-${version}.fourth.des4.sub1-4`) }}</p>
          <p class="tab double last">{{ $t(`s.policy.version-${version}.fourth.des4.sub1-5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fourth.des5`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.fourth.des5.sub1`) }}</p>
          <p class="tab" v-html="$t(`s.policy.version-${version}.fourth.des5.sub1-1`)"></p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des5.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des5.sub3`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.fourth.des5.sub4`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.fourth.des5.sub5`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.fifth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.fifth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des6`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des7`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des8`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des9`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des10`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.fifth.des11`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.sixth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.sixth.main1`) }}</p>
          <p class="mt-0">{{ $t(`s.policy.version-${version}.sixth.main2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des6`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des7`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des8`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des9`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des10`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des11`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des12`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des13`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des14`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des15`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des16`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des17`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des18`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des19`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.sixth.des20`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.seventh`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.seventh.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.seventh.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.seventh.des3`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.seventh.des3.sub1`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub3`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub4`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub5`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub6`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub7`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub8`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub9`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub10`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub11`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub12`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub13`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub14`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub15`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub16`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub17`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub18`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.seventh.des3.sub19`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.seventh.des3.sub20`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.seventh.des4`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.eighth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.eighth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.eighth.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.eighth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.eighth.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.eighth.des5`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.ninth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.ninth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.ninth.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.ninth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.ninth.des4`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.ninth.des4.sub1`) }}</p>
          <p class="tab" v-html="$t(`s.policy.version-${version}.ninth.des4.sub1-1`)"></p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des4.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des4.sub3`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.ninth.des4.sub4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.ninth.des5`) }}</p>
          <p class="tab first">{{ $t(`s.policy.version-${version}.ninth.des5.sub1`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des5.sub2`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des5.sub3`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des5.sub4`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des5.sub5`) }}</p>
          <p class="tab">{{ $t(`s.policy.version-${version}.ninth.des5.sub6`) }}</p>
          <p class="tab last">{{ $t(`s.policy.version-${version}.ninth.des5.sub7`) }}</p>

          <h2>{{ $t(`t.policy.version-${version}.tenth`) }}</h2>
          <p>{{ $t(`s.policy.version-${version}.tenth.des1`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des2`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des3`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des4`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des5`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des6`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des7`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des8`) }}</p>
          <p>{{ $t(`s.policy.version-${version}.tenth.des9`) }}</p>
        </div>
      </section>
    </main>

  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

export default defineComponent({
  name: 'Policy',
  meta: {
    hideContainer: true,
  },
  setup() {
    const state = reactive({
      version: 1,
      versionList: [{ value: 1, text: '2022-02-25' }],
    });

    return {
      ...toRefs(state),
    };
  },
  data: () => ({
    isDevelopment: process.env.NODE_ENV === 'development',
  }),
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/policy';
</style>
