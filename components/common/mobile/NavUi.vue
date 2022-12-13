<template>
  <v-menu content-class="nav-ui" max-height="500" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn dark icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" active="false" :to="item.path">
          <span class="text">{{ item.name }}</span>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 0, // 선택된 항목

    items: [
      // {
      //   path: '/ui-popup-dsp',
      //   name: 'PopupDsp',
      // },
    ],
  }),
};
</script>
<style lang="scss" scoped>
.nav-ui {
  .v-list-item {
    min-height: 36px;
    font-size: 12px;
  }
}
</style>
