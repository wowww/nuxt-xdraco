<template>
  <v-dialog
    :value="open"
    attach="#contents"
    content-class="dialog-mirage dialog-mirage-raid-info"
    scrollable
    :max-width="isDesktop ? '960px' : '100%'"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    >
    <div class="dialog-header">
      My Boss Raid Enlist History
      <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="$emit('close')"></v-btn>
    </div>
    <div class="content">
      <div v-for="(item, itemIdx) in schedules" :key="itemIdx" class="wrap-round-raid-info">
        <div class="wrap-raid-info">
          <div class="mirage-round-raid-info">
            <span class="raid-round">Round {{ item.Battle }}</span>
            <span class="boss-name" v-html="$t(`t.mirage.boss-raid.type-${item.RaidType}`)"></span>
            <span class="raid-date">{{ item.EndDT | dateFormat }}</span>
          </div>
        </div>
        <mirage-boss-raid-result-list :items="resultItems" is-my-ranking />
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { computed, reactive, toRefs, onMounted, watch } from "@vue/composition-api";
import { useState } from "vuex-composition-helpers/dist";
import { useMirageStore } from "~/utils/composables/mirage";
import MirageBossRaidResultList from "~/components/mirage/boss-raid/MirageBossRaidResultList";

export default {
  name: "ModalBossRaidHistory",
  components: {
    MirageBossRaidResultList,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { root }) {
    const { isDesktop } = useState(['isDesktop']);

    const { $dracoWebApi } = root;

    const state = reactive({
      resultItems: [],
      schedules: [],
    });

    const { useMirageState } = useMirageStore();
    const { bossRaid } = useMirageState(['bossRaid']);

    const schedule = computed(() => {
      if (!bossRaid.value || !bossRaid.value.schedule) {
        return null;
      }

      return bossRaid.value.schedule[0];
    });

    const fetchResult = () => {
      if (!schedule.value) {
        return;
      }
      $dracoWebApi
        .get('/bossraid/myresult', { params: { scheduleUID: schedule.value.ScheduleUID } })
        .then(({ data }) => {
          if (data.code === 200) {
            if(data.data && data.data.lists[0].myRanking) {
              data.data.lists.forEach((item) => {
                state.resultItems.push(item.myRanking[0]);
                state.schedules.push(item.schedule[0]);
              });
            }
          }
        });
    };

    watch(
      () => schedule.value,
      () => {
        fetchResult();
      },
    );

    onMounted(() => {
      fetchResult();
    });

    return {
      ...toRefs(state),
      isDesktop,
    }
  },
}
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-latest-raid-result';
@import '~@/assets/sass/components/mirage-round-raid-info';
@import '~@/assets/sass/components/mirage-result-list';
@import '~@/assets/sass/components/_mirage-boss-raid-enlist-history';
</style>
