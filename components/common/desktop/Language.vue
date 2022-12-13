<template>
  <v-menu attach="#header" content-class="select-language" offset-y>
    <template #activator="{ on, attrs }">
      <button type="button" class="btn-open-list btn-language" :class="{ 'btn-string': isStringMenu }" v-bind="attrs" v-on="on">
        <img src="https://file.mir4global.com/xdraco/img/desktop/header-v2/icon-language.webp" class="icon" width="24" height="24" alt="language" />
        <span v-if="isStringMenu">Language</span>
      </button>
    </template>
    <v-list class="select-language__list">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in languages"
          :key="i"
          :class="{ 'v-item--active': item.code === locale }"
          :active="item.code === locale"
          @click="setLocale(item.code)"
        >
          <span class="text">{{ item.text }}</span>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Language',
  props: {
    isStringMenu: {
      type: Boolean,
      required: false,
    },
  },
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
      return this.$i18n.setLocale(locale);
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/partials/desktop/_language';
</style>
