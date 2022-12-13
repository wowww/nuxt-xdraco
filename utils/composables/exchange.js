import { computed } from '@vue/composition-api';
import { ref } from '@vue/composition-api/dist/vue-composition-api';
import BigNumber from 'bignumber.js';
import { createNamespacedHelpers } from 'vuex-composition-helpers/dist';

import { useFormatted } from '@/utils/composables/common';
import { countDigits } from '@/utils/filters/numeric';

export const useItemInfo = (item) => {
  const itemImagePath = ref('');
  const itemName = ref('');

  if (item.imgPath) {
    itemImagePath.value = item.imgPath;
  }

  if (item.itemPath) {
    itemImagePath.value = item.itemPath;
  }

  if (item.itemName) {
    itemName.value = item.itemName;
  }

  if (item.name) {
    itemName.value = item.name;
  }

  return {
    itemImagePath,
    itemName,
  };
};

export const useToUsd = (val, useFormat = false) => {
  const { useState: useHspState } = createNamespacedHelpers('hsp');
  const { price } = useHspState(['price']);

  const usd = computed(() => {
    if (val && price.value) {
      return new BigNumber(val).times(price.value.USDHydraRate).toFormat(2);
    }

    return 0;
  });

  const formattedUsd = computed(() => {
    return useFormatted(usd.value, countDigits(usd.value));
  });

  return {
    usd,
    formattedUsd,
  };
};

export const useHydraToUsd = (refObj, key) => {
  const { useState: useHspState } = createNamespacedHelpers('hsp');
  const { price } = useHspState(['price']);

  const usd = computed(() => {
    if (refObj.value && price.value) {
      return new BigNumber(refObj.value[key]).times(price.value.USDHydraRate).toFormat(2);
    }

    return 0;
  });

  const formattedUsd = computed(() => {
    console.log(usd.value);
    return useFormatted(usd.value, countDigits(usd.value));
  });

  return {
    usd,
    formattedUsd,
  };
};

export const useExhToUsd = () => {
  const { useState: useExdState } = createNamespacedHelpers('exd');
  const { useState: useHspState } = createNamespacedHelpers('hsp');
  const { exchangeItem } = useHspState(['exchangeItem']);
  const { price } = useHspState(['price']);

  const usd = computed(() => {
    if (exchangeItem.value && price.value) {
      return new BigNumber(exchangeItem.value.price).times(price.value.USDHydraRate).toFormat(2);
    }

    return 0;
  });

  return {
    usd,
  };
};
