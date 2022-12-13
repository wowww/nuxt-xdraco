<template>
  <div class="mt-6 price--chart">
    <template>
      <v-tabs class="tab-chart" v-model="tabChartPrice" fixed-tabs>
        <v-tab>USD</v-tab>
        <v-tab>WEMIX</v-tab>
      </v-tabs>
      <draco-chart
        :current-currency="currentCurrency"
        field="USDDracoRate"
        currency="USD"
        border-color="rgba(130,0,220,1)"
        bg-color="rgba(130,0,220,0.1)"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import DracoChart from '@/components/coin/common/price/DracoChart';

export default {
  name: 'DracoTabChart',
  components: { DracoChart },
  data: () => ({
    tabChartPrice: null,
  }),
  computed: {
    ...mapGetters(['draco']),
    currentCurrency() {
      return this.tabChartPrice === 0 ? 'usd' : 'wemix';
    },
  },
  methods: {
    changeCurrency(currency) {
      this.currency = currency;
    },
    changePeriod(period) {
      this.period = period;
    },
  },
  mounted() {},
};
</script>


