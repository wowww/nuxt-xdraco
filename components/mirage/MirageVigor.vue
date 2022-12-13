<template>
  <div v-if="accountInfo" class="remain-energy">
    <span class="remain">{{ accountInfo.VigorAmount | currency(0) }}</span>
    <button type="button" class="btn-charge" @click="openChargeVigor">Charge</button>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageVigor',
  setup() {
    const { useMirageState, useMirageMutations } = useMirageStore();

    const { accountInfo, visibleSeal, rosters, modalCharacterInfo } = useMirageState(['accountInfo', 'visibleSeal', 'rosters', 'modalCharacterInfo']);
    const { setVisibleSeal, setVisibleChargeVigor } = useMirageMutations(['setVisibleSeal', 'setVisibleChargeVigor']);

    const openChargeVigor = () => {
      // if (props.closed) {
      //   setCommonModal({
      //     open: true,
      //     title: t('t.mirage.harvest.lockout'),
      //     desc: t('s.mirage.message.lockout.vigor'),
      //     primary: 'OK',
      //     onPrimary() {},
      //     onClose() {},
      //   });
      //   return;
      // }

      setVisibleChargeVigor(true);
    };

    return {
      accountInfo,
      openChargeVigor,
    };
  },
});
</script>
