import { computed } from '@vue/composition-api';

import { countDigits, currency } from '@/utils/filters/numeric';

export const useFormatted = (v, exactlyDigits, digits = 2) => {
  const orgValues = v.toString().replace(/,/gi, '').split('.');
  const chgValues = ['', ''];

  digits = exactlyDigits > digits ? digits : exactlyDigits;

  chgValues[0] = !Number.isNaN(Number(orgValues[0])) ? currency(Number(orgValues[0]), 0) : '--';
  chgValues[1] = orgValues.length > 1 && digits > 0 ? `.${orgValues[1].slice(0, digits)}` : '';

  return chgValues;
};

export const useFormattedNumber = (v = 0) => {
  return computed(() => {
    return useFormatted(v, countDigits(v));
  });
};

export const useFormattedRefNumber = (refObj, key = 'price', digits = 2) => {
  return computed(() => {
    const v = refObj.value ? refObj.value[key] : '0';
    return useFormatted(v, countDigits(v), digits);
  });
};
