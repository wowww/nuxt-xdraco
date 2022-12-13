<template>
  <li>
    <div class="list-content">
      <div class="active-info">
        <div class="thumb">
          <template v-if="history.type === 1006">
            <img
              v-if="`${history.winner.class}` === '1'"
              src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-warrior.webp"
              width="48"
              height="48"
              alt="warrior"
            />
            <img
              v-else-if="`${history.winner.class}` === '2'"
              src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-sorcerer.webp"
              width="48"
              height="48"
              alt="sorcerer"
            />
            <img
              v-else-if="`${history.winner.class}` === '3'"
              src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-taoist.webp"
              width="48"
              height="48"
              alt="taoist"
            />
            <img
              v-else-if="`${history.winner.class}` === '5'"
              src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-lancer.webp"
              width="48"
              height="48"
              alt="lancer"
            />
            <img
              v-else-if="`${history.winner.class}` === '4'"
              src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-arbalist.webp"
              width="48"
              height="48"
              alt="arbalist"
            />
          </template>
          <!--          <item-info v-else-if="history.type > 2000 && history.item" :show-type="'itemonly'" />-->
          <img v-else-if="history.type > 2000 && history.type < 3000" src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-exd.webp" width="48" alt="EXD" />
          <img v-else-if="history.type >= 3000 && history.type < 5000" src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-hydra.webp" width="48" alt="HYDRA" />
          <img v-else-if="history.type > 5000 && history.type < 6000" src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-exd.webp" width="48" alt="EXD" />
          <img v-else-if="history.type > 6000 && history.type < 7000" src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-mirage.webp" width="48" alt="MIRAGE" />
          <img v-else src="https://file.mir4global.com/xdraco/img/desktop/popup/profile-draco.webp" width="48" height="48" alt="DRACO" />
        </div>
        <div class="info">
          <span class="time">{{ history.date | fromNow }}</span>
          <div v-if="history.type === 1001" class="desc">{{ $t('s.account.history.stake', [history.seasonID, history.roundID]) }}</div>
          <div v-else-if="history.type === 1002" class="desc">{{ $t('s.account.history.stake-more', [history.seasonID, history.roundID]) }}</div>
          <div v-else-if="history.type === 1003" class="desc">{{ $t('s.account.history.pre-stake', [history.seasonID, history.roundID]) }}</div>
          <div v-else-if="history.type === 1004" class="desc">{{ $t('s.account.history.stake-more', [history.seasonID, history.roundID]) }}</div>
          <div v-else-if="history.type === 1005" class="desc">{{ $t('s.account.history.round.closed', [history.seasonID, history.roundID]) }}</div>
          <div v-if="history.type === 1006" class="desc">
            {{ $t('s.account.history.round.win', [history.seasonID, history.roundID, history.winner.worldName, history.winner.characterName]) }}
          </div>
          <div v-else-if="history.type === 1007" class="desc">
            {{ $t('s.account.history.obtained.reward', [history.seasonID, history.roundID, history.reward.refund, history.reward.reward]) }}
          </div>
          <div
            v-else-if="history.type === 2001 || history.type === 5001"
            class="desc"
            v-html="$t('s.exd.history.purchased', [history.itemName])"
          ></div>
          <div v-else-if="history.type === 2002 || history.type === 5002" class="desc" v-html="$t('s.exd.history.sell', [history.itemName])"></div>
          <div v-else-if="history.type === 2003 || history.type === 5003" class="desc" v-html="$t('s.exd.history.cancel', [history.itemName])"></div>
          <div v-else-if="history.type === 2004 || history.type === 5004" class="desc" v-html="$t('s.exd.history.listing', [history.itemName])"></div>
          <div v-else-if="history.type === 3001" class="desc" v-html="$t('w.hsp.history.success-stake', [history.itemName])"></div>
          <div v-else-if="history.type === 3002" class="desc" v-html="$t('w.hsp.history.success-unstake', [history.itemName])"></div>
          <div v-else-if="history.type === 3003" class="desc" v-html="$t('w.hsp.history.success-reward', [history.itemName])"></div>
          <div v-else-if="history.type === 6001" class="desc" v-html="$t('w.mirage.smelt.draco')"></div>
          <div v-else-if="history.type === 6002" class="desc" v-html="$t('w.mirage.refine.hydra')"></div>
          <div v-else-if="history.type === 6003" class="desc" v-html="$t('w.mirage.charge.vigor')"></div>
          <div class="history">
            <template v-if="history.type === 1007">
              <em>Refund</em>
              <!-- <span class="ico-darco ico-xs"></span> -->
              <span class="ico-darco ico-xs add-inside">{{ history.reward.refund }}</span>
              <em> + Reward</em>
              <span class="ico-darco ico-xs add-inside">{{ history.reward.reward }}</span>
            </template>
            <template v-else-if="history.type === 2001">
              - <span v-if="history.price" class="ico-darco ico-xs add-inside">{{ history.price | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 2002">
              + <span v-if="history.price" class="ico-darco ico-xs add-inside">{{ history.price | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 5001">
              - <span v-if="history.price" class="ico-hydra ico-xs add-inside">{{ history.price | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 5002">
              + <span v-if="history.price" class="ico-hydra ico-xs add-inside">{{ history.price | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 6001">
              <span class="ico-darco ico-xs add-inside">{{ history.amount | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 6002">
              <span class="ico-hydra ico-xs add-inside">{{ history.amount | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <template v-else-if="history.type === 6003">
              <span class="ico-vigor ico-xs add-inside">{{ history.amount | currency(2) }}</span>
              <template v-if="history.activityStatus === 0"> (Failed)</template>
              <template v-else-if="history.activityStatus === 2"> (Pending)</template>
            </template>
            <!--            <strong v-else-if="history.type === 1006">‘{{ history.winner.itemName }}’</strong>-->
            <template v-else>
              <span
                v-if="history.amount || history.claimAmount"
                class="ico-xs add-inside"
                :class="{
                  'history-alert': history.activityStatus === 0,
                  'ico-darco': Math.floor(history.type / 1000) <= 2,
                  'ico-hydra': Math.floor(history.type / 3000) === 1,
                }"
              >
                {{ history.type === 3003 ? history.claimAmount : history.amount }}
                <template v-if="history.activityStatus === 0"> (Failed)</template>
                <template v-else-if="history.activityStatus === 2"> (Pending)</template>
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { useDay } from '@/utils/composables/round';

export default defineComponent({
  name: 'HistoryItem',
  props: {
    history: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ history }, { root }) {
    const historyDate = useDay(history.date).format(root.$t('w.rounds.date.format'));

    return {
      historyDate,
    };
  },
});
</script>

<style lang="scss">
.history-alert {
  color: #ff0000;
}
</style>
