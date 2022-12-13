<template>
  <nuxt-link tag="li" :to="`/exd/trade/${suggestItem.tradeUID}`" style="cursor: pointer">
    <exd-hydra-price :hide-label="true" :price="suggestItem.price" icon-size="ss" is-suggested />
    <div class="enhance">
      <span>{{ $t('w.common.item.enhance') }}</span>
      <strong>
        + {{ suggestItem.item.enhance }}
      </strong>
    </div>
    <div class="score">
      <span>Power Score</span
      ><strong>
      <template>
        {{ suggestItem.item.PowerScore | currency(0) }}
      </template>
    </strong>
    </div>
    <div class="seller">
      <span>{{ $t('w.exd.seller') }}</span>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <strong v-bind="attrs" v-on="on">{{ suggestItem.walletAddress | truncateMiddle }}</strong>
        </template>
        <span>{{ suggestItem.walletAddress }}</span>
      </v-tooltip>
    </div>
  </nuxt-link>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api';
import { useMutations, useActions } from 'vuex-composition-helpers/dist';

import ExdHydraPrice from '@/components/exd/common/ExdHydraPrice';
import { MyItemTab } from '@/constants/exchange';

export default defineComponent({
  name: 'SuggestedItem',
  components: { ExdHydraPrice },
  props: {
    suggestItem: {
      type: Object,
      default: () => ({}),
    },
    seller: {
      type: Object,
      default: () => ({}),
    },
  },
  setup({ suggestItem }, { root }) {
    const { $i18n, $router, $dracoWebApi } = root;
    const { setCommonModal } = useMutations(['setCommonModal']);
    const { closeModal } = useActions(['closeModal']);

    const go2Registration = () => {
      $router.push(`/exd/my-items/${suggestItem.itemUID}`);
    };

    const go2Detail = () => {
      $router.push(`/exd/trade/${suggestItem.tradeUID}`);
    };

    const openCancel = () => {
      setCommonModal({
        open: true,
        title: root.$t('s.exd.cancel.item', suggestItem.item.itemName),
        primary: 'Ok',
        secondary: 'Cancel',
        onPrimary: () => {
          $dracoWebApi.delete('/exd/tradeitem', { params: { tradeUID: suggestItem.tradeUID } }).then(({ data }) => {
            console.log(data);
            if (data.code === 200) {
              $router.replace(`/exd/my-items`);
            }
          });
        },
        onSecondary: () => {
          closeModal();
        },
      });
    };

    return {
      MyItemTab,
      go2Registration,
      go2Detail,
      openCancel,
    };
  },
});
</script>
