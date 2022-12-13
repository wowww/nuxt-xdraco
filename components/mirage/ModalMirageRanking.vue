<template>
  <v-dialog
    attach="#contents"
    content-class="dialog-mirage valley-capture-result"
    :value="visibleRanking"
    :width="isDesktop ? '960px' : '100%'"
    :fullscreen="!isDesktop"
    :transition="!isDesktop ? 'dialog-bottom-transition' : 'scale-transition'"
    persistent>
    <div v-if="valleyRank" class="valley-capture-result__contents">
      <div class="valley-capture-result__header">
        {{ $t('t.mirage.valley.result') }}
        <v-btn class="btn-close btn-miragepop-close" fab plain x-small @click="setVisibleRanking(false)" />
      </div>
      <div class="valley-info">
        <div>
          <h4 class="valley-info__name">Valley</h4>
          <div class="valley-info__day">
            <p>Day {{ valleyRank.schedule.Daily }} /</p>
            <p class="half">
              {{ $t(`w.mirage.${valleyRank.schedule.Battle}.half`) }}
            </p>
          </div>
        </div>
        <p class="valley-info__date">{{ valleyRank.schedule.EndDT | dateFormat }}</p>
      </div>
      <div class="wrap-desc">
        <p class="wrap-desc__info">{{ $t('s.mirage.message.ranking-bonus') }}</p>
        <div class="wrap-desc__amount">
          <span>Total Darksteel Ranking Bonus</span>
          <em>
            <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />
            {{ valleyRank.TotalBonusAmount | currency(0) }}
          </em>
        </div>
      </div>
      <div v-if="valleyRank" class="wrap-ranking ranking-result">
        <ul class="char-list">
          <li v-for="(rankItem, rankItemIdx) in rankList" :key="`mirage-rank-${rankItemIdx}`">
            <mirage-rank-character-item
              v-if="rankItemIdx < 50"
              :key="`mirage-rank-character-${rankItemIdx}-${rankItem.CharacterUID}`"
              :character="{
                ...rankItem,
                State: MirageCharacterState.READY,
              }"
              :current-rank="Number(rankItem.Ranking)"
              :rank-change="Number(rankItem.RankChange || 0)"
            />
          </li>
        </ul>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import {createNamespacedHelpers, useState} from 'vuex-composition-helpers/dist';
import MirageRankCharacterItem from '@/components/mirage/MirageRankCharacterItem';
import MirageCharacterState from '@/constants/mirage/mirage-character-state';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'ModalMirageRanking',
  components: { MirageRankCharacterItem },
  setup() {
    const { isDesktop } = useState(['isDesktop']);
    const { visibleRanking, valleyRank } = useMirageState(['visibleRanking', 'valleyRank']);
    const { setVisibleRanking } = useMirageMutations(['setVisibleRanking']);

    return {
      isDesktop,
      MirageCharacterState,
      visibleRanking,
      setVisibleRanking,
      valleyRank,
    };
  },
  computed: {
    rankList() {
      const valleyRank = this.$store.state.mirage.valleyRank;
      const data = valleyRank && valleyRank.Rank ? valleyRank.Rank.slice() : [];
      return data.sort((a, b) => a.Ranking - b.Ranking);
    },
  },
});
</script>


