<template>
  <div v-if="accountInfo" class="mirage-dashboard">
    <ul class="mirage-dashboard__list">
      <li>
        <h4 class="mirage-dashboard__title">{{ $t('w.mirage.draksteel') }}</h4>
        <span>
          <em class="mirage-dashboard__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-darksteel.webp" width="20" />
            {{ accountInfo.BlackIronAmount | currency(0) }}
          </em>
        </span>
      </li>
      <li>
        <h4 class="mirage-dashboard__title">{{ $t('w.mirage.septaria') }}</h4>
        <span>
          <em class="mirage-dashboard__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-septaria.webp" width="20" />
            {{ accountInfo.SeptariaAmount | currency(0) }}
          </em>
        </span>
      </li>
      <li>
        <h4 class="mirage-dashboard__title">MIRAGE Scroll</h4>
        <span>
          <em class="mirage-dashboard__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/img-24-mirage-scroll.webp" width="24" alt="" />
            {{ accountInfo.ScrollAmount | currency(0) }}
          </em>
          <button type="button" class="btn btn-enhance" @click="goToEnhance">Enhance</button>
        </span>
      </li>
      <li>
        <h4 class="mirage-dashboard__title">{{ $t('w.mirage.vigor') }}</h4>
        <span>
          <em class="mirage-dashboard__value">
            <img src="https://file.mir4global.com/xdraco/img/common/mirage/ico-20-energy.webp" width="20" />
            {{ accountInfo.VigorAmount | currency(0) }}
          </em>
          <button type="button" class="btn btn-charge" @click="openChargeVigor()">{{ $t('w.mirage.charge') }}</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, watch } from '@vue/composition-api';
import { createNamespacedHelpers, useMutations, useState } from 'vuex-composition-helpers/dist';

import { useMirageStore } from '@/utils/composables/mirage';

export default defineComponent({
  name: 'MirageSummary',
  props: {
    closed: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { root }) {
    const { $i18n, $router, $route } = root;
    const { accessToken } = useState(['accessToken']);
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { useMirageState, useMirageGetters, useMirageMutations, useMirageActions } = useMirageStore();
    const { accountInfo, accountServerInfo, rosters } = useMirageState(['accountInfo', 'accountServerInfo', 'rosters']);
    const { mirageLock } = useMirageGetters(['mirageLock']);
    const { setVisibleChargeVigor } = useMirageMutations(['setVisibleChargeVigor']);
    const { fetchAccountInfo, fetchMyMirageCurrentTab } = useMirageActions(['fetchAccountInfo', 'fetchMyMirageCurrentTab']);

    const enlisted = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => Number(roster.State) === 1).length;
      }

      return 0;
    });

    const wounded = computed(() => {
      if (rosters.value) {
        return rosters.value.filter((roster) => [3, 7, 14].includes(Number(roster.State))).length;
      }

      return 0;
    });

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

    watch(
      () => accessToken.value,
      () => {
        if (accessToken.value) {
          fetchAccountInfo();
        }
      },
    );

    return {
      accountInfo,
      accountServerInfo,
      setVisibleChargeVigor,
      enlisted,
      wounded,
      rosters,
      openChargeVigor,
      goToEnhance,
    };
  },
});
</script>

<style lang="scss">
@import '~@/assets/sass/components/mirage-dashboard';
</style>
