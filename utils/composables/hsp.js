import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

export const useHspStore = () => {
  const {
    useState: useHspState,
    useGetters: useHspGetters,
    useMutations: useHspMutations,
    useActions: useHspActions,
  } = createNamespacedHelpers('hsp');

  return {
    useHspState,
    useHspGetters,
    useHspMutations,
    useHspActions,
  };
};
