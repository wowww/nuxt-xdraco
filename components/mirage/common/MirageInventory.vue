<template>
  <ul v-if="accountInfo" class="mirage-inventory">
    <li v-if="isDesktop" class="mirage-inventory__item">
       <span class="mirage-inventory__item-count">
          <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" height="20" alt="darksteel" />
          <em class="mirage-inventory__item__value">{{ accountInfo && accountInfo.BlackIronAmount | currency(0) }}</em>
       </span>
    </li>
    <li v-if="isDesktop" class="mirage-inventory__item">
      <span class="mirage-inventory__item-count">
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-septaria.webp" width="20" height="20" alt="septaria" />
        <em class="mirage-inventory__item__value">{{ accountInfo && accountInfo.SeptariaAmount | currency(0) }}</em>
      </span>
    </li>
    <li class="mirage-inventory__item">
      <span class="mirage-inventory__item-count">
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-24-mirage-scroll.webp" width="24" height="22" alt="enhance" />
        <em class="mirage-inventory__item__value">{{ accountInfo && accountInfo.ScrollAmount | currency(0) }}</em>
      </span>
      <button type="button" class="btn-enhance" @click="goToEnhance">Enhance</button>
    </li>
    <li class="mirage-inventory__item">
      <span class="mirage-inventory__item-count">
        <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-energy.webp" width="20" height="20" alt="energy" />
        <em class="mirage-inventory__item__value">{{ accountInfo && accountInfo.VigorAmount | currency(0) }}</em>
      </span>
      <button type="button" class="btn-charge" @click="openChargeVigor">Charge</button>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import {useMutations, useState} from 'vuex-composition-helpers/dist';

import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageInventory',
  setup(_, { root }) {
    const { $i18n, $router, $route } = root;
    const { isDesktop } = useState(['isDesktop']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { accountInfo } = useMirageState(['accountInfo']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { setVisibleChargeVigor } = useMirageMutations(['setVisibleChargeVigor']);
    const { fetchMyMirageCurrentTab } = useMirageActions(['fetchMyMirageCurrentTab']);

    const openChargeVigor = () => {
      if (mirageLock.value) {
        setCommonModal({
          open: true,
          title: root.$t('t.mirage.harvest.lockout'),
          desc: root.$t('s.mirage.message.lockout.vigor'),
          primary: 'OK',
          onPrimary() {},
          onClose() {},
        });
        return;
      }

      setVisibleChargeVigor(true);
    };

    const goToEnhance = () => {
      if(!$route.path.includes('/mirage/my')) {
        $router.replace('/mirage/my');
      }
      fetchMyMirageCurrentTab(1);
    }

    return {
      isDesktop,
      accountInfo,
      openChargeVigor,
      goToEnhance,
    };
  },
});
</script>


