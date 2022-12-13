<template>
  <dl :class="[klass, 'price']">
    <dt v-show="!hideLabel" :class="[labelClass]">{{ $t('t.exd.purchased.price') }}</dt>
    <dd v-if="!isTopTraded || isDesktop" :class="[primaryClass]">
      <span v-if="isDesktop && isSuggested">{{ $t('t.exd.purchased.price') }}</span>
      <strong class="ico-hydra add-inside" :class="[`ico-${iconSize}`]"
        >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></strong
      >
    </dd>
    <dd v-if="isDesktop && !hideUsd" class="us-dollar">
      {{ formattedUsd[0] }}<small>{{ formattedUsd[1] }}</small>
    </dd>
    <dd v-if="!isDesktop">
      <div :class="[primaryClass]">
        <span class="ico-hydra add-inside" :class="[`ico-${iconSize}`]"></span>
        <span
          >{{ formattedPrice[0] }}<small>{{ formattedPrice[1] }}</small></span
        >
      </div>
      <div v-if="!hideUsd" class="us-dollar">
        {{ formattedUsd[0] }}<small>{{ formattedUsd[1] }}</small>
      </div>
    </dd>
  </dl>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { useState } from "vuex-composition-helpers/dist";
import { useFormattedNumber } from '@/utils/composables/common';
import { useToUsd } from '@/utils/composables/exchange';

export default defineComponent({
  name: 'ExdHydraPrice',
  props: {
    klass: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '0',
    },
    iconSize: {
      type: String,
      default: 'sm',
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
    hideUsd: {
      type: Boolean,
      default: false,
    },
    labelClass: {
      type: String,
      default: '',
    },
    primaryClass: {
      type: String,
      default: '',
    },
    isSuggested: {
      type: Boolean,
      default: false,
    },
    isTopTraded: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const formattedPrice = useFormattedNumber(props.price);
    const { usd, formattedUsd } = useToUsd(props.price);
    const { isDesktop } = useState(['isDesktop']);

    return {
      isDesktop,
      formattedPrice,
      usd,
      formattedUsd,
    };
  },
});
</script>
