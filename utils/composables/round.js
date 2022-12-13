import { computed } from '@vue/composition-api/dist/vue-composition-api';
import dayjs from 'dayjs';
import { createNamespacedHelpers, useActions, useMutations, useState } from 'vuex-composition-helpers/dist';

export const getStakeMoreTime = () => {
  return Number(process.env.VUE_APP_DSP_STAKE_MORE_TIME);
};

export const useDay = (t) => {
  if (t) {
    return dayjs(t * 1000).utcOffset(8);
  }
  return dayjs().utcOffset(8);
};

export const useTime = (t) => {
  if (t) {
    return useDay(t).unix();
  }
  return useDay().unix();
};

export const useRoundState = (round) => {
  const timestamp = useTime();

  const ongoing = computed(() => round && round.startDate < timestamp && timestamp < round.endDate);
  const staking = computed(() => round && round.preStartDate < timestamp && timestamp < round.startDate);
  const upcoming = computed(() => round && timestamp < round.preStartDate);
  const closed = computed(() => round && round.endDate < timestamp);

  return {
    ongoing,
    staking,
    upcoming,
    closed,
  };
};

export const usePossibleMore = (prevStakeDT) => {
  const prev = useTime(prevStakeDT);
  const time = useTime();
  const moreTime = getStakeMoreTime();
  console.log(time - prev, moreTime);
  return prev < time && time - prev > moreTime;
};

export const useRoundParticipate = (round) => {
  const win = computed(() => round && round.myinfo && round.myinfo.reward && round.myinfo.reward.state === 2);
  const join = computed(() => round && round.myinfo && round.myinfo.currentStake > 0);
  const not = computed(() => round && (!round.myinfo || (round.myinfo && round.myinfo.prevStake === 0)));
  const more = computed(() => round && round.myinfo && round.myinfo.prevStake > 0 && round.myinfo.prevStakeDT);
  const possibleMore = round && round.myinfo && usePossibleMore(round.myinfo.prevStakeDT);

  return {
    win,
    join,
    not,
    more,
    possibleMore,
  };
};

export const useWemixLogin = (root) => {

  const wemixLogin = () => root.$store.dispatch('wemix/login');

  return { wemixLogin };
};

export const useRoundModal = (root) => {
  const { useState: useDspState, useMutations: useDspMutations } = createNamespacedHelpers('dsp');
  const { useState: useAccountState, useMutations: useAccountMutations } = createNamespacedHelpers('account');
  const { dracoAccessToken, accessToken, walletAddress } = useState(['dracoAccessToken', 'accessToken', 'walletAddress']);

  const { setAccessToken, setOpenDracoLogin, setCommonModal } = useMutations(['setAccessToken', 'setOpenDracoLogin', 'setCommonModal', 'setOpen']);

  const { fetchBalance } = useActions(['fetchBalance']);

  const { exist, represent } = useAccountState(['exist', 'represent']);
  const { setOpen: setAccountOpen } = useAccountMutations(['setOpen']);

  const { setOpen, setCurrentRound } = useDspMutations(['setOpen', 'setCurrentRound']);

  const { wemixLogin } = useWemixLogin(root);

  const openRoundModal = (dspId) => {
    if (!accessToken.value) {
      wemixLogin();
      return;
    }

    // if (exist.value === 0) {
    //   setCommonModal({
    //     open: true,
    //     title: 'MIR4 account',
    //     desc: 'Create a MIR4 account for full access to XDRACO services',
    //     primary: 'OK',
    //   });
    //   return;
    // }
    //
    // if (!represent.value) {
    //   setCommonModal({
    //     open: true,
    //     title: i18n.t('s.account.message.select-represent'),
    //     primary: 'Settings',
    //     onPrimary() {
    //       setAccountOpen(true);
    //     },
    //   });
    //
    //   return;
    // }

    setCurrentRound(dspId);
    setOpen(true);
  };

  return {
    openRoundModal,
  };
};
