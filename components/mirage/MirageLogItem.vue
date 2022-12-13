<template>
  <li :data-report-type="`${log.LogType}${log.VictimCharacterName !== '' ? 'kick' : ''}`">
    <img
      v-if="log.LogType === '30101' && log.VictimCharacterName === ''"
      src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-mirage-symbol.webp"
      class="icon-report"
      width="40"
      alt=""
    />
    <img
      v-else-if="log.LogType === '30101' && log.VictimCharacterName !== ''"
      src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-battle.webp"
      class="icon-report"
      width="40"
      alt=""
    />
    <img v-else-if="log.LogType === '30102'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-battle.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="log.LogType === '30103'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-mirage-symbol.webp" class="icon-report" width="40" alt="" />
    <!--    <img v-else-if="log.LogType === '30202' && rewardItem" :src="rewardItem.itemPath" class="icon-report" width="40" alt="" />-->
    <img v-else-if="log.LogType === '30202'" src="https://file.mir4global.com/xdraco/img/common/mirage/img-rewardbox-40.webp" class="icon-report" width="40" alt="" />
    <div class="mirage-battle-report__desc report-desc">
      <div class="mirage-battle-report__info report-info">
        <span v-if="log.LogType.startsWith('301')" class="mode-name">HIDDEN VALLEY CAPTURE</span>
        <span v-else-if="log.LogType.startsWith('302')" class="mode-name">BOSS RAID</span>
        <span v-if="log.LogType.startsWith('301') && log.ServerID" class="server-name">{{ serverName }}</span>
      </div>
      <div
        v-if="log.LogType === '30101' && log.VictimCharacterName === ''"
        v-html="$t('s.mirage.log.vc.30101', [$t(`t.mirage.valley-type.${log.ValleyType}`), log.CharacterName, log.Vigor])"
      />
      <div
        v-else-if="log.LogType === '30101' && log.VictimCharacterName !== '' && log.WoundType === '0'"
        v-html="
          $t('s.mirage.log.vc.30101.kick', [
            $t(`t.mirage.valley-type.${log.ValleyType}`),
            log.CharacterName,
            log.VictimCharacterName,
            log.WoundType !== '0' ? $t(`w.mirage.log.wound.${log.WoundType}`) : '',
            log.Vigor,
          ])
        "
      />
      <div
        v-else-if="log.LogType === '30101' && log.VictimCharacterName !== '' && log.WoundType !== '0'"
        v-html="
          $t('s.mirage.log.vc.30101.kick.wound', [
            $t(`t.mirage.valley-type.${log.ValleyType}`),
            log.CharacterName,
            log.VictimCharacterName,
            $t(`w.mirage.log.wound.${log.WoundType}`),
          ])
        "
      />
      <div
        v-else-if="log.LogType === '30102'"
        v-html="$t('s.mirage.log.vc.30102', [$t(`t.mirage.valley-type.${log.ValleyType}`), log.CharacterName])"
      />
      <div
        v-else-if="log.LogType === '30103'"
        v-html="$t('s.mirage.log.default.retreat', [$t(`t.mirage.valley-type.${log.ValleyType}`), log.CharacterName, log.Vigor])"
      />
      <div
        v-else-if="log.LogType === '30202'"
        v-html="
          $t('s.mirage.boss-raid.log.30201', [
            log.CharacterName,
            rewardItem ? rewardItem.itemName : log.ItemIdx,
            $t(`w.mirage.boss-raid.type-${log.RaidType}`),
            log.Battle,
          ])
        "
      />
    </div>
    <span class="mirage-battle-report__time-stamp">{{ log.LogDT | fromNow }}</span>
  </li>
</template>

<script>
import { defineComponent, computed, watch, onMounted, reactive } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import { useMirageStore } from '@/utils/composables/mirage';
import { currency } from '@/utils/filters/numeric';

export default defineComponent({
  name: 'MirageLogItem',
  props: {
    log: {
      type: Object,
      default: () => ({
        LogType: '',
        LogDT: '',
        ValleyType: '',
        VictimCharacterName: '',
        OffenderCharacterName: '',
        WoundType: '',
        BetVigor: '',
        Vigor: '',
        Battle: '',
        Daily: '',
        Amount: '',
      }),
    },
  },
  setup({ log }) {
    const { useMirageState, useMirageActions } = useMirageStore();
    const { valleyCapture, items } = useMirageState(['valleyCapture', 'items']);
    const { fetchItem } = useMirageActions(['fetchItem']);

    const serverName = computed(() => {
      if (valleyCapture.value) {
        const valley = valleyCapture.value.serverInfo.find((item) => item.ServerID === log.ServerID);

        if (valley) {
          return valley.ServerName;
        }
      }

      return '';
    });

    const rewardItem = computed(() => {
      if (log.LogType !== '30202') return null;

      return items.value.find((i) => i.itemIdx == log.ItemIdx);
    });

    onMounted(() => {
      if (log && log.ItemIdx) {
        fetchItem(log.ItemIdx);
      }
    });

    return {
      currency,
      serverName,
      rewardItem,
    };
  },
});
</script>
