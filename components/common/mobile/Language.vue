<template>
  <v-list class="select-language__list">
    <v-list-item-group color="primary">
      <div v-for="(item, i) in languages" :key="i" class="wrap-item">
        <v-list-item :class="{ 'v-item--active': item.code === locale }" :active="item.code === locale" @click="setLocale(item.code)">
          <span class="text">{{ item.text }}</span>
        </v-list-item>
      </div>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { defineComponent } from '@vue/composition-api/dist/vue-composition-api';

export default defineComponent({
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    languages() {
      return this.$i18n.locales;
    },
  },
  methods: {
    setLocale(locale) {
      this.$emit('close');
      return this.$i18n.setLocale(locale);
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/mobile/_language';
</style>
