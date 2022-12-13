<template>
  <div v-if="accountInfo" class="float-bottom mirage-bottom">
    <div class="mirage-bottom__inner">
      <ul class="mirage-bottom__list">
        <li>
          <span class="mirage-bottom__list__title">DRACO Balance</span>
          <em class="mirage-bottom__list__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-draco-sm.webp" width="20" />
            {{ formattedDraco[0] }}
            <small>{{ formattedDraco[1] }}</small>
          </em>
        </li>
        <li>
          <span class="mirage-bottom__list__title">HYDRA Balance</span>
          <em class="mirage-bottom__list__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-hydra-sm.webp" width="20" />
            {{ formattedHydra[0] }}
            <small>{{ formattedHydra[1] }}</small>
          </em>
        </li>
        <li v-if="isDesktop">
          <span class="mirage-bottom__list__title">Darksteels</span>
          <em class="mirage-bottom__list__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage-popup/icon-darksteel-sm.webp" width="20" />
            {{ accountInfo.BlackIronAmount | currency(0) }}
          </em>
        </li>
        <li v-if="isDesktop">
          <span class="mirage-bottom__list__title">Septaria</span>
          <em class="mirage-bottom__list__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-septaria.webp" width="20" />
            {{ accountInfo.SeptariaAmount | currency(0) }}
          </em>
        </li>
      </ul>
      <div class="wrap-buy">
        <button v-if="!closed" type="button" class="btn" @click="openMinting(0)">
          <img v-show="isDesktop" src="https://file.mir4global.com/xdraco/img/common/mirage/img-draco-gold.webp" width="56" />{{ $t('w.mirage.smelt.draco') }}
        </button>
        <button v-if="!closed" type="button" class="btn" @click="openMinting(1)">
          <img v-show="isDesktop" src="https://file.mir4global.com/xdraco/img/common/mirage/img-hydra-gold.webp" width="56" />{{ $t('w.mirage.refine.hydra') }}
        </button>

        <small v-if="closed">
          {{ $t('s.mirage.harvest.lockout.minting2') }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useState } from 'vuex-composition-helpers/dist';

import { useFormattedRefNumber } from '@/utils/composables/common';

const { useState: useMirageState, useMutations: useMirageMutations } = createNamespacedHelpers('mirage');

export default defineComponent({
  name: 'MirageFooter',
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { balance, isDesktop } = useState(['balance', 'isDesktop']);
    const { accountInfo, valleyCapture } = useMirageState(['accountInfo', 'valleyCapture']);
    const { setVisibleMinting, setMintingSymbolIdx } = useMirageMutations(['setVisibleMinting', 'setMintingSymbolIdx']);

    const formattedDraco = useFormattedRefNumber(balance, 'DRACO', 4);
    const formattedHydra = useFormattedRefNumber(balance, 'HYDRA', 4);

    const openMinting = (mintingIndex) => {
      setMintingSymbolIdx(mintingIndex);
      setVisibleMinting(true);
    };

    return {
      openMinting,
      isDesktop,
      balance,
      formattedDraco,
      formattedHydra,
      accountInfo,
      valleyCapture,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-bottom';
</style>
