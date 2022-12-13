<template>
  <div class="mirage-result-list" :class="{ 'is-battle': bossRaidStatus.locked && isTop }">
    <div class="list-header mobile-disable">
      <div class="col-rank">Final Loot Chance Ranking</div>
      <div class="col-score">
        <em>MIRAGE Score</em>
        <small>Rank / Loot Chance</small>
      </div>
      <div class="col-price">
        <em>Bid Registered</em>
        <small>Rank / Buff</small>
      </div>
      <template v-if="bossRaidStatus.locked && isTop">
        <div class="col-battle"></div>
      </template>
      <template v-else>
        <div class="col-wound">Wound Status</div>
        <div class="col-reward">Treasures & Rewards</div>
      </template>
    </div>
    <ul class="list-raid-result">
      <li
        v-for="(item, idx) in items"
        :key="`${item.CharacterUID}-${idx}`"
        :data-character-class="item.Class"
        :data-damage-type="item.damage"
        :class="{ 'is-highlight': roasterUids.includes(item.CharacterUID) }"
      >
        <div class="col-rank">
          <span class="rank">{{ isMyRanking ? item.Ranking : `${idx + 1}` }}</span>
          <div class="wrap-value">
            <span class="name">{{ item.CharacterName }}</span>
            <em v-if="item.chanceBuff">{{ item.chanceBuff }}%</em>
          </div>
        </div>
        <div class="col-score">
          <span class="col-title">
            <em>MIRAGE Score</em>
            <small>Rank / Loot Chance</small>
          </span>
          <div class="wrap-value">
            <span class="mirage-score">{{ item.MirageScore | currency(0) }}</span>
            <div class="bid-register">
              <span v-if="Number(idx + 1) <= 10" class="bid-rank">
                <template v-if="idx + 1 === 1">1st</template>
                <template v-else-if="idx + 1 === 2">2nd</template>
                <template v-else-if="idx + 1 === 3">3rd</template>
                <template v-else>{{ idx + 1 }}th</template>
              </span>
              <span v-if="Number(idx + 1) <= 10" class="txt-buff">
                <em>{{ 40 - (2 * idx) }}%</em>
              </span>
            </div>
          </div>
        </div>
        <div class="col-price">
          <span class="col-title">
            <em>Bid Registered</em>
            <small>Rank / Buff</small>
          </span>
          <div class="wrap-value">
            <span class="price-vigor">{{ item.TotalBidPrice | currency(0) }}</span>
            <div class="bid-register">
              <span v-if="Number(item.Ranking) <= 10" class="bid-rank">
                <template v-if="Number(item.Ranking) === 1">1st</template>
                <template v-else-if="Number(item.Ranking) === 2">2nd</template>
                <template v-else-if="Number(item.Ranking) === 3">3rd</template>
                <template v-else>{{ item.Ranking }}th</template>
              </span>
              <span v-if="Number(item.Ranking) <= 10" class="txt-buff">
                <em>{{ 30 - (3 * (Number(item.Ranking) - 1)) }}%</em>
              </span>
            </div>
          </div>
        </div>
        <template v-if="bossRaidStatus.locked && isTop">
          <div class="col-battle">
            <span class="damaged"><img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-40-battle.webp" width="24" height="24" alt="" />IN BATTLE</span>
          </div>
        </template>
        <template v-else>
          <div v-if="item.WoundType === '3'" class="col-wound">
            <span class="col-title">Wound Status</span>
            <span class="damaged"><img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Wounded</span>
          </div>
          <div v-else-if="item.WoundType === '7'" class="col-wound">
            <span class="col-title">Wound Status</span>
            <span class="damaged"><img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Seriously Wounded</span>
          </div>
          <div v-else-if="item.WoundType === '14'" class="col-wound">
            <span class="col-title">Wound Status</span>
            <span class="damaged"><img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-24-damage.webp" width="24" alt="" />Critically Wounded</span>
          </div>
          <div v-else class="col-wound">
            <span class="col-title">Wound Status</span>
            <span class="damaged">-</span>
          </div>
          <div class="col-reward">
            <span class="col-title">Treasures & Reward</span>
            <div class="col-reward--items">
              <mirage-boss-raid-reward-item
                v-for="(reward, rewardIdx) in item.RewardItemInfos"
                :key="`${item.CharacterUID}-${idx}-${rewardIdx}`"
                :item-idx="reward.RewardItemIdx"
                hide-label
              />
            </div>
          </div>
        </template>
      </li>
    </ul>
    <v-dialog v-model="dialogItemCard" content-class="dialog-card">
      <v-card>
        <Card item-type="epic"></Card>
        <button type="button" class="btn-close-dialog" @click="dialogItemCard = false">Close Dialog</button>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {computed, defineComponent, reactive, toRefs} from '@vue/composition-api';

import Card from '@/components-ui/common/Card';
import MirageBossRaidRewardItem from '@/components/mirage/boss-raid/MirageBossRaidRewardItem';
import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageBossRaidResultList',
  components: {
    MirageBossRaidRewardItem,
    Card,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isMyRanking: {
      type: Boolean,
      default: false,
    },
    isTop: {
      type: Boolean,
      default: false,
    }
  },
  setup({ item }, { root }) {
    const { $dracoWebApi } = root;
    const state = reactive({
      resultItems: [],
    });

    const { useMirageState, useMirageGetters } = useMirageStore();
    const { rosters } = useMirageState(['rosters']);
    const { bossRaidStatus } = useMirageGetters(['bossRaidStatus']);

    const roasterUids = computed(() => {
      if (rosters.value) {
        return rosters.value.map((roster) => roster.CharacterUID);
      }

      return [];
    });

    return {
      item,
      ...toRefs(state),
      bossRaidStatus,
      rosters,
      roasterUids,
    };
  },
  data: () => ({
    dialogItemCard: false,
  }),
  methods: {
    openItemCard() {
      this.dialogItemCard = true;
    },
  },
});
</script>
<style lang="scss">
@import '~@/assets/sass/components/mirage-result-list';
</style>
