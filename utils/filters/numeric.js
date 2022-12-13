import BigNumber from 'bignumber.js';
import web3Utils from 'web3-utils';

BigNumber.config({ ROUNDING_MODE: 4 });

export const countDigits = (v) => {
  if (!v) return 0;
  const nv = Number(v.toString().replace(/,/gi, ''));
  if (Math.floor(nv) === nv) return 0;

  return nv.toString().split('.')[1].length || 0;
};

export const currency = (value, digits = 2, round = false) => {
  const exactlyDigits = countDigits(value);
  digits = exactlyDigits > digits ? digits : exactlyDigits;

  return new BigNumber(value).toFormat(digits);
};

export const formattedCurrency = (v, opt = { decimalPoint: 4, prefix: '', suffix: '' }) => {
  const exactlyDigits = countDigits(v);
  const digits = exactlyDigits > opt.decimalPoint ? opt.decimalPoint : exactlyDigits;

  const sv = new BigNumber(v).toFormat(digits).split('.');
  const integer = sv[0];
  const decimal = sv.length > 1 ? `<small>.${sv[1]}</small>` : '';
  return `${opt.prefix} ${integer}${decimal} ${opt.suffix}`.trim();
};

export const hydra = (v, oracle) => {
  return new BigNumber(v).times(new BigNumber(1).div(oracle).times(0.95)).toFormat(4, BigNumber.ROUND_DOWN);
};

export const bn = (v, decimal = 2) => {
  return new BigNumber(v).toFormat(decimal);
};

export const floor = (num) => {
  return Math.floor(num);
};

export const roman = (num) => {
  if (typeof num !== 'number') return false;

  const digits = String(+num).split('');
  const key = [
    '',
    'C',
    'CC',
    'CCC',
    'CD',
    'D',
    'DC',
    'DCC',
    'DCCC',
    'CM',
    '',
    'X',
    'XX',
    'XXX',
    'XL',
    'L',
    'LX',
    'LXX',
    'LXXX',
    'XC',
    '',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
  ];
  let romanNum = '';
  let i = 3;
  // eslint-disable-next-line no-plusplus
  while (i--) romanNum = (key[+digits.pop() + i * 10] || '') + romanNum;
  return Array(+digits.join('') + 1).join('M') + romanNum;
};

export const fromWei = (v) => {
  return web3Utils.fromWei(v, 'ether');
};

export const separateDecimalPoint = (v) => {
  const orgValues = v.toString().split('.');
  const chgValues = ['', ''];

  chgValues[0] = !Number.isNaN(Number(orgValues[0])) ? currency(Number(orgValues[0]), 0) : '--';
  chgValues[1] = orgValues.length > 1 ? `.${orgValues[1].slice(0, 4)}` : '';

  return chgValues;
};
