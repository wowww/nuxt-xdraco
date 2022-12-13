<template>
  <li :data-report-type="reportType">
    <img v-if="reportType === 'default'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-mirage.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="reportType === 'battle'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-battle.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="reportType === 'damage'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-damage.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="log.LogType === '30201'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-darksteel.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="log.LogType === '30202'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-septaria.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="log.LogType === '30203'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-ranking-bonus.webp" class="icon-report" width="40" alt="" />
    <img v-else-if="log.LogType === '30204'" src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-mirax.webp" class="icon-report" width="40" alt="" />
    <p
      v-if="reportType === 'default' && log.LogType === '30101'"
      class="mirage-battle-report__desc"
      v-html="$t('s.mirage.log.default.enlist', [$t(`t.mirage.valley-type.${log.ValleyType}`), log.CharacterName, log.Vigor])"
    />
    <p
      v-if="reportType === 'default' && log.LogType === '30103'"
      class="mirage-battle-report__desc"
      v-html="$t('s.mirage.log.default.retreat', [$t(`t.mirage.valley-type.${log.ValleyType}`), log.CharacterName, log.Vigor])"
    />
    <p
      v-if="reportType === 'battle'"
      class="mirage-battle-report__desc"
      v-html="
        $t(log.WoundType !== '0' ? 's.mirage.log.battle.assault' : 's.mirage.log.battle', [
          $t(`t.mirage.valley-type.${log.ValleyType}`),
          log.CharacterName,
          log.VictimCharacterName,
          log.WoundType !== '0' ? $t(`w.mirage.log.wound.${log.WoundType}`) : '',
          log.Vigor,
        ])
      "
    />
    <p
      v-else-if="reportType === 'damage'"
      class="mirage-battle-report__desc"
      v-html="
        $t(log.WoundType !== '0' ? 's.mirage.log.damage.wound' : 's.mirage.log.damage', [
          log.OffenderCharacterName,
          $t(`t.mirage.valley-type.${log.ValleyType}`),
          log.CharacterName,
          $t(`w.mirage.log.wound.${log.WoundType}`),
        ])
      "
    />
    <p
      v-if="log.LogType === '30201'"
      class="mirage-battle-report__desc"
      v-html="
        $t('s.mirage.log.gain.30201', [
          log.ValleyType ? $t(`t.mirage.valley-type.${log.ValleyType}`) : '',
          log.Daily,
          $t(`w.mirage.${log.Battle}.half`),
          currency(log.Amount, 0),
        ])
      "
    />
    <p
      v-if="log.LogType === '30202'"
      class="mirage-battle-report__desc"
      v-html="
        $t('s.mirage.log.gain.30202', [
          log.ValleyType ? $t(`t.mirage.valley-type.${log.ValleyType}`) : '',
          log.Daily,
          $t(`w.mirage.${log.Battle}.half`),
          currency(log.Amount, 0),
        ])
      "
    />
    <p
      v-if="log.LogType === '30203'"
      class="mirage-battle-report__desc"
      v-html="
        $t('s.mirage.log.gain.30203', [
          log.ValleyType ? $t(`t.mirage.valley-type.${log.ValleyType}`) : '',
          log.Daily,
          $t(`w.mirage.${log.Battle}.half`),
          currency(log.Amount, 0),
          '',
        ])
      "
    />
    <p
      v-if="log.LogType === '30204'"
      class="mirage-battle-report__desc"
      v-html="
        $t('s.mirage.log.gain.30204', [
          log.Daily,
          $t(`w.mirage.${log.Battle}.half`),
          log.DetailType ? $t(`t.mirage.valley-type.${log.DetailType}`) : '',
          log.CharacterName,
          log.MiraX,
          log.TotalMiraX,
        ])
      "
    />
    <span class="mirage-battle-report__time-stamp">{{ log.LogDT | fromNow }}</span>
  </li>
</template>

<script>
import { defineComponent, computed, watch } from '@vue/composition-api';

import { currency } from '@/utils/filters/numeric';

export default defineComponent({
  name: 'MirageBattleReportItem',
  props: {
    log: {
      type: Object,
      default: () => ({
        LogType: '',
        LogDT: '',
        ValleyType: '',
        DetailType: '',
        VictimCharacterName: '',
        OffenderCharacterName: '',
        WoundType: '',
        BetVigor: '',
        Vigor: '',
        Battle: '',
        Daily: '',
        Amount: '',
        MiraX: '',
        TotalMiraX: '',
      }),
    },
  },
  setup({ log }, { root }) {
    const reportType = computed(() => {
      if (log) {
        if (log.LogType === '30101') {
          if (log.VictimCharacterName) {
            return 'battle';
          }

          return 'default';
        }

        if (log.LogType === '30102') {
          if (log.WoundType) {
            return 'damage';
          }
        }

        if (log.LogType === '30103') {
          return 'default';
        }
      }

      return '';
    });

    return {
      reportType,
      currency,
    };
  },
});
</script>
