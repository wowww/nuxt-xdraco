import { computed } from '@vue/composition-api';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

export const calcFee = (n) => {
  return 0.6 / (Math.log(n + 1) / Math.log(3.7));
};

export const sumFee = (n) => {
  if (Number(n) && Number(n) <= 500) {
    return Array.from(Array(Number(n)).keys()).reduce((a, b) => {
      return a + calcFee(b + 1);
    }, 0);
  }
  return 0;
};

export const getCharacterGrade = (powerScore) => {
  const ps = Number(powerScore);

  if (ps >= 205000) {
    return { grade: 5, gradeName: 'legendary' };
  }

  if (ps >= 170000) {
    return { grade: 4, gradeName: 'epic' };
  }

  if (ps >= 135000) {
    return { grade: 3, gradeName: 'rare' };
  }

  if (ps >= 100000) {
    return { grade: 2, gradeName: 'uncommon' };
  }

  return { grade: 1, gradeName: 'common' };
};

// FIXME: 함수 이름이 마음에 들지 않음.
export const makeCharacterInfo = (characters, klass) => {
  const defaultInfo = {
    tokenID: '',
    CharacterUID: '',
    CharacterName: '',
    Class: klass,
    CombatPoint: '0',
    MirageScore: '',
    SanctuaryOfHydraLevel: 0,
    CreatedDT: 0,
    State: -1, // 0: Ready, 1: Stake,  3: 경상, 7 : 중상, 14: 치명상
    RestDT: 0,
  };
  // eslint-disable-next-line eqeqeq
  const character = computed(() => {
    const characterInfo = characters.find((item) => item.Class == klass);

    if (characterInfo) {
      return { ...characterInfo, ...getCharacterGrade(characterInfo.CombatPoint) };
    }

    return defaultInfo;
  });

  return { character };
};

export const useMirageStore = () => {
  const {
    useState: useMirageState,
    useGetters: useMirageGetters,
    useMutations: useMirageMutations,
    useActions: useMirageActions,
  } = createNamespacedHelpers('mirage');

  return {
    useMirageState,
    useMirageGetters,
    useMirageMutations,
    useMirageActions,
  };
};
