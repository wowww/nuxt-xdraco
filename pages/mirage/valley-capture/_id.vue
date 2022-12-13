<template>
  <div class="mirage-valley-capture">
    <div class="my-mirage">
      <div class="my-mirage__list">
        <back-button/>
        <mirage-inventory/>
      </div>
    </div>
    <mirage-valley-info v-if="serverInfo" :server-info="serverInfo" :closed="mirageLock"/>
    <div class="mirage-hidden-valley-play">
      <v-expansion-panels v-model="panel" accordion multiple>
        <mirage-valley-item :server-info="serverInfo" valley-type="3" :closed="mirageLock"/>
        <mirage-valley-item :server-info="serverInfo" valley-type="2" :closed="mirageLock"/>
        <mirage-valley-item :server-info="serverInfo" valley-type="1" :closed="mirageLock"/>
      </v-expansion-panels>
      <mirage-valley-result :closed="mirageLock"/>
    </div>
    <hr/>
    <h2 v-if="logList && logList.length > 0" class="section-title">Battle Report</h2>
    <mirage-battle-report/>
    <modal-enlist-character/>
    <modal-enlist-result/>
  </div>
</template>

<script>
import {computed, defineComponent, onBeforeMount, onMounted, reactive, toRefs, watch} from '@vue/composition-api';
import {useNow} from '@vueuse/core';
import dayjs from 'dayjs';
import {useMutations, useState} from 'vuex-composition-helpers/dist';

import BackButton from '@/components/common/BackButton';
import MirageInventory from '@/components/mirage/common/MirageInventory';
import MirageBattleReport from '@/components/mirage/MirageBattleReport';
import MirageValleyInfo from '@/components/mirage/MirageValleyInfo';
import MirageValleyItem from '@/components/mirage/MirageValleyItem';
import MirageValleyResult from '@/components/mirage/MirageValleyResult';
import ModalEnlistCharacter from '@/components/mirage/ModalEnlistCharacter';
import ModalEnlistResult from '@/components/mirage/ModalEnlistResult';
import {useMirageStore} from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageValleyPage',
  components: {
    MirageInventory,
    ModalEnlistResult,
    BackButton,
    MirageBattleReport,
    MirageValleyResult,
    ModalEnlistCharacter,
    MirageValleyItem,
    MirageValleyInfo,
  },
  layout: 'mirage',
  meta: {
    title: 'MIRAGE | XDRACO',
    hasSubNav: 'mirage',
    hasBottomSticky: 'type1',
  },
  setup(_, {root}) {
    const {$route, $router, $i18n} = root;
    const serverId = $route.params.id;
    const now = useNow({interval: 1000});
    const {useMirageState, useMirageMutations, useMirageActions, useMirageGetters} = useMirageStore();
    const {accessToken} = useState(['accessToken']);
    const {setCommonModal} = useMutations(['setCommonModal']);
    const {valleyResult} = useMirageState(['valleyResult']);
    const {mirageStatus, mirageLock} = useMirageGetters(['mirageStatus', 'mirageLock']);

    const {accountInfo, stakeInfo, valleyList, valleyCapture, logList} = useMirageState([
      'accountInfo',
      'stakeInfo',
      'valleyList',
      'valleyCapture',
      'logList',
    ]);

    const {setVisibleChargeVigor} = useMirageMutations(['setVisibleChargeVigor']);
    const {
      fetchAccountInfo,
      fetchStakeInfo,
      fetchLastResult,
      fetchRank,
      fetchLog,
      fetchServerInfo,
      openModalEnlistResult
    } = useMirageActions([
      'fetchAccountInfo',
      'fetchStakeInfo',
      'fetchLastResult',
      'fetchRank',
      'fetchLog',
      'fetchServerInfo',
    ]);

    const state = reactive({
      loading: false,
      valleyMeta: null,
      valleyList: [],
      panel: [0, 1, 2],
    });

    const closedDuration = Number(process.env.VUE_APP_MIRAGE_CLOSED_DURATION);

    const serverInfo = computed(() => {
      if (valleyCapture.value && valleyCapture.value.serverInfo) {
        return valleyCapture.value.serverInfo.find((item) => item.ServerID === serverId);
      }

      return null;
    });

    onBeforeMount(() => {
      document.documentElement.classList.add('init-mirage-valley');
    })

    onMounted(() => {
      if (!accessToken.value) {
        $router.replace('/mirage/dashboard');
        return;
      }

      fetchAccountInfo();
      fetchStakeInfo(serverId);
      fetchLastResult(serverId);
      fetchRank(serverId);
      fetchLog(serverId);
      fetchServerInfo();
    });

    const startDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.StartDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const endDay = computed(() => {
      if (valleyCapture.value && valleyCapture.value.schedule) {
        return dayjs.unix(valleyCapture.value.schedule.EndDT).utcOffset(8, false);
      }

      return dayjs();
    });

    const nowDay = computed(() => {
      return dayjs(now.value).utcOffset(8, false);
    });

    const startDiff = computed(() => {
      return nowDay.value.diff(startDay.value, 'minute');
    });

    const closedDiff = computed(() => {
      const diff = nowDay.value.diff(endDay.value, 'minute');

      if (diff === 0) {
        // fetchStakeInfo($route.params.serverId);
      }

      return diff;
    });

    const closed = computed(() => {
      return Math.abs(closedDiff.value) < closedDuration || Math.abs(startDiff.value) < closedDuration;
    });

    const openChargeVigor = () => {
      if (closed.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {
          },
          onClose() {
          },
        });
        return;
      }

      setVisibleChargeVigor(true);
    };

    watch(
      () => accessToken.value,
      () => {
        if (!accessToken.value) {
          $router.replace('/mirage');
        }
      },
    );

    return {
      serverInfo,
      ...toRefs(state),
      valleyResult,
      accountInfo,
      stakeInfo,
      logList,
      valleyList,
      startDay,
      endDay,
      nowDay,
      startDiff,
      closedDiff,
      closed,
      setVisibleChargeVigor,
      openChargeVigor,
      mirageStatus,
      mirageLock,
    };
  },
  destroyed() {
    document.documentElement.classList.remove('init-mirage-valley')
  }
});
</script>
<style lang="scss">
@import '~@/assets/sass/common/app';
@import '~@/assets/sass/components/mirage-dialog';
@import '~@/assets/sass/common/pages/mirage/play';
@import '~@/assets/sass/common/pages/mirage/mirage-list';
@import '~@/assets/sass/components/mirage-hidden-valley-capture';
@import '~@/assets/sass/components/mirage-hidden-valley-play';
</style>
