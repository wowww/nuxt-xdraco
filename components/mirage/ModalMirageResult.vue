<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage valley-capture-result"
    :value="visibleMyResult"
    :width="isDesktop ? '960px' : '100%'"
    :fullscreen="!isDesktop"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent
  >
    <div class="valley-capture-result__contents">
      <div class="valley-capture-result__header">
        {{ $t('t.mirage.valley.result') }}
        <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleMyResult(false)" />
      </div>
      <div v-if="valleyResult && valleyList" class="wrap-content">
        <div>
          <div class="valley-info">
            <div>
              <h4 class="valley-info__name">Valley</h4>
              <div class="valley-info__day">
                <p>Day {{ valleyResult.beforeSchedule.Daily }} /</p>
                <p class="half">
                  {{ valleyResult.beforeSchedule.Battle === '1' ? '1st Half' : '2nd Half' }}
                </p>
              </div>
            </div>
            <p class="valley-info__date">{{ valleyResult.beforeSchedule.EndDT | dateFormat }}</p>
          </div>
          <ul class="wrap-total">
            <li class="wrap-total__item">
              <span>Total gained Darksteel</span>
              <em>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-40-darksteel.webp" :width="isDesktop ? 40 : 24" />
                {{ mintingAmount | currency(0) }}
              </em>
            </li>
            <li class="wrap-total__item">
              <span>Total gained Septaria</span>
              <em>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-40-septaria-dark.webp" :width="isDesktop ? 40 : 24" />
                {{ septaria }}
              </em>
            </li>
          </ul>
          <div class="wrap-play">
            <div v-if="valleyResult.Valley['3']">
              <div class="wrap-play__title">
                <h4>{{ $t('t.mirage.valley-type.3') }}</h4>
                <em>
                  <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />
                  {{ valleyResult.Valley['3'].TotalBlackIronAmount | currency(0) }}
                </em>
              </div>
              <ul class="wrap-play__list">
                <li>
                  <span class="wrap-play__subtitle">Mined Amount</span>
                  <div class="wrap-play__amount">
                    <em>
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                      {{ valleyResult.Valley['3'].TotalBlackIronAmount | currency(0) }}
                      <small>/{{ valleyList['3'].MaxBlackIronAmount | currency(0) }}</small>
                    </em>
                    <span>
                      {{ ((Number(valleyResult.Valley['3'].TotalBlackIronAmount) / Number(valleyList['3'].MaxBlackIronAmount)) * 100) | currency(2) }}<small>%</small>
                    </span>
                  </div>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Ranking Bonus</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                    {{ valleyResult.Valley['3'].TotalRankBonusAmount | currency(0) }}
                  </em>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Gained Septaria</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-septaria.webp" width="16" />
                    {{ valleyResult.Valley['3'].SeptariaAmount }}
                  </em>
                </li>
              </ul>
            </div>
            <div v-if="valleyResult.Valley['2']">
              <div class="wrap-play__title">
                <h4>{{ $t('t.mirage.valley-type.2') }}</h4>
                <em>
                  <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />
                  {{ valleyResult.Valley['2'].TotalBlackIronAmount | currency(0) }}
                </em>
              </div>
              <ul class="wrap-play__list">
                <li>
                  <span class="wrap-play__subtitle">Mined Amount</span>
                  <div class="wrap-play__amount">
                    <em>
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                      {{ valleyResult.Valley['2'].TotalBlackIronAmount | currency(0) }}
                      <small>/{{ valleyList['2'].MaxBlackIronAmount | currency(0) }}</small>
                    </em>
                    <span>
                      {{ ((Number(valleyResult.Valley['2'].TotalBlackIronAmount) / Number(valleyList['2'].MaxBlackIronAmount)) * 100) | currency(2) }}<small>%</small>
                    </span>
                  </div>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Ranking Bonus</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                    {{ valleyResult.Valley['2'].TotalRankBonusAmount | currency(0) }}
                  </em>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Gained Septaria</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-septaria.webp" width="16" />
                    {{ valleyResult.Valley['2'].SeptariaAmount }}
                  </em>
                </li>
              </ul>
            </div>
            <div v-if="valleyResult.Valley['1']">
              <div class="wrap-play__title">
                <h4>{{ $t('t.mirage.valley-type.1') }}</h4>
                <em>
                  <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />
                  {{ valleyResult.Valley['1'].TotalBlackIronAmount | currency(0) }}
                </em>
              </div>
              <ul class="wrap-play__list">
                <li>
                  <span class="wrap-play__subtitle">Mined Amount</span>
                  <div class="wrap-play__amount">
                    <em>
                      <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                      {{ valleyResult.Valley['1'].TotalBlackIronAmount | currency(0) }}
                      <small>/{{ valleyList['1'].MaxBlackIronAmount | currency(0) }}</small>
                    </em>
                    <span>
                      {{ ((Number(valleyResult.Valley['1'].TotalBlackIronAmount) / Number(valleyList['1'].MaxBlackIronAmount)) * 100) | currency(2) }}<small>%</small>
                    </span>
                  </div>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Ranking Bonus</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-darksteel.webp" width="16" />
                    {{ valleyResult.Valley['1'].TotalRankBonusAmount | currency(0) }}
                  </em>
                </li>
                <li>
                  <span class="wrap-play__subtitle">Gained Septaria</span>
                  <em>
                    <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/ico-16-septaria.webp" width="16" />
                    {{ valleyResult.Valley['1'].SeptariaAmount }}
                  </em>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-if="valleyResult.MyRank && valleyResult.MyRank.length > 0" class="wrap-ranking">
          <div class="wrap-ranking__header">
            <h3 class="wrap-ranking__header__title">My Ranking</h3>
            <div class="wrap-ranking__header__amount">
              <span>Total Ranking Bonus</span>
              <em>
                <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="17" height="17" />
                {{ rankingBonus | currency(0) }}
              </em>
            </div>
          </div>
          <ul class="char-list">
            <li v-for="(rankItem, rankItemIdx) in valleyResult.MyRank" :key="`mirage-my-rank-${rankItemIdx}`">
              <mirage-rank-character-item
                :key="`mirage-my-rank-character-${rankItemIdx}-${rankItem.CharacterUID}`"
                :character="{
                  ...rankItem,
                  State: MirageCharacterState.READY,
                }"
                :current-rank="rankItem.Ranking"
                :rank-change="Number(rankItem.RankChange || 0)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { computed } from '@vue/composition-api/dist/vue-composition-api';
import { useState } from "vuex-composition-helpers/dist";
import { each } from 'lodash';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';
import MirageRankCharacterItem from '@/components/mirage/MirageRankCharacterItem';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalMirageResult',
  components: { MirageRankCharacterItem },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const { valleyList, visibleMyResult, valleyResult } = useMirageState(['valleyList', 'visibleMyResult', 'valleyResult']);
    const { setVisibleMyResult } = useMirageMutations(['setVisibleMyResult']);

    const mintingAmount = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.TotalBlackIronAmount);
        });

        return sum;
      }

      return 0;
    });

    const rankingBonus = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.TotalRankBonusAmount);
        });

        return sum;
      }

      return 0;
    });

    const septaria = computed(() => {
      if (valleyResult.value) {
        let sum = 0;
        each(valleyResult.value.Valley, (v) => {
          sum += Number(v.SeptariaAmount);
        });

        return sum;
      }

      return 0;
    });

    return {
      isDesktop,
      visibleMyResult,
      setVisibleMyResult,
      MirageCharacterState,
      valleyList,
      valleyResult,
      mintingAmount,
      rankingBonus,
      septaria,
    };
  },
});
</script>


