<template>
  <div class="derby summary-coin">
    <div v-if="derby && Array.isArray(derby) && derby.length > 0" class="no-gutter__inner coin-content__info">
      <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-derby :set="(today = derby[derby.length - 1])" :ds="Number(today.DS)" :bonus="Number(today.BonusYield)" />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost />
        </v-carousel-item>
        <v-carousel-item>
          <draco-derby :set="(today = derby[derby.length - 1])" :ds="Number(today.DS)" :bonus="Number(today.BonusYield)" />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost />
        </v-carousel-item>
      </v-carousel>
      <dl class="display-data">
        <dt>{{ $t('w.price.bonus') }}</dt>
        <dd>
          <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
            <v-carousel-item> {{ Number(today.BonusYield) > 0 ? '+' : '' }}{{ Number(today.BonusYield) | currency }} DS </v-carousel-item>
          </v-carousel>
        </dd>
      </dl>
      <dl class="display-data">
        <dt>{{ $t('w.price.smelted.draco') }}</dt>
        <dd>{{ today.DracoIssuance | currency(0) }} DRACO</dd>
      </dl>
      <div class="updated-date">{{ $t('s.smelting-cost.updated') }}</div>
    </div>
    <div v-else class="no-gutter__inner coin-content__info">
      <v-carousel height="auto" :show-arrows="false" interval="5000" cycle vertical hide-delimiters>
        <v-carousel-item>
          <draco-derby-empty />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost-empty />
        </v-carousel-item>
        <v-carousel-item>
          <draco-derby-empty />
        </v-carousel-item>
        <v-carousel-item>
          <draco-smelting-cost-empty />
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { useState } from 'vuex-composition-helpers/dist';

import DracoDerby from '@/components/coin/common/price/DracoDerby';
import DracoDerbyEmpty from '@/components/coin/common/price/DracoDerbyEmpty';
import DracoSmeltingCost from '@/components/coin/common/price/DracoSmeltingCost';
import DracoSmeltingCostEmpty from '@/components/coin/common/price/DracoSmeltingCostEmpty';

export default defineComponent({
  name: 'CardTodayDerby',
  components: {
    DracoDerbyEmpty,
    DracoDerby,
    DracoSmeltingCost,
    DracoSmeltingCostEmpty,
  },
  setup() {
    const { derby } = useState(['derby']);

    return {
      derby,
    };
  },
});
</script>
