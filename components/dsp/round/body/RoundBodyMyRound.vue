<template>
  <div class="wrap-balance">
    <dl class="wrap-balance__define">
      <dt>{{ $t('w.rounds.my.rewards') }}</dt>
      <dd class="draco">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <em v-bind="attrs" v-on="on">{{ Number(myInfo.reward.rewardDraco) | currency(4) }}</em>
          </template>
          <span>{{ Number(myInfo.reward.rewardDraco) }}</span>
        </v-tooltip>
      </dd>
    </dl>
    <dl class="wrap-balance__define">
      <dt>{{ $t('w.rounds.my.stake') }}</dt>
      <dd class="draco">
        <span>{{ myInfo.currentStake | currency(0) }}</span>
      </dd>
    </dl>
    <dl class="wrap-balance__define">
      <dt>{{ $t('w.rounds.my.odds') }}</dt>
      <dd class="odds">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">{{ myInfo.currentOdds | currency(4) }}</span
            >%
          </template>
          <span>{{ myInfo.currentOdds }}</span>
        </v-tooltip>
      </dd>
    </dl>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundBodyMyRound',
  props: {
    myInfo: {
      type: Object,
      default: () => ({
        currentStake: 100, // 내가 현재까지 넣은 스테이크 수. 0이아니면 Stake More로 표기
        currentOdds: 0.1123, // 현재까지 넣은 금액의 확률 ///추가스테이크시 추가되는 확률은 변동해야하므로 라운드정보의 odds * 추가예치할draco로 계산해서 표기
        prevStake: 100, // 내가 직전에 넣은 스테이크 수 (Stake More에서 prevStake+최소예치금액(minStakeAmount)로 자동입력될때 필요). 계산한값보다 적게 입력시 오류표기
        prevStakeDT: 1319231200, // timestamp UTC+0 ,직전스테이크 시간(24시간이 지났으면 more 활성화)
        reward: {
          refundDraco: 0,
          rewardDraco: 0, // 0이아니면 출력해줘야함
          rewarded: 0, // 1:받지않음 / 0:받음 <-- state가 1,2인경우에만 확인
          state: 0, // 0:리워드없음 ,1:리워드 ,2:승리
        },
      }),
    },
  },
});
</script>
