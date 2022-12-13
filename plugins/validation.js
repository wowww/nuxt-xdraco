import Vue from 'vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule]);
});

extend('decimal2', (v) => {
  if (Math.floor(Number(v)) === Number(v)) {
    return true;
  }

  return (v.toString().split('.')[1].length || 0) <= 2;
});

extend('decimal4', (v) => {
  if (Math.floor(Number(v)) === Number(v)) {
    return true;
  }

  return (v.toString().split('.')[1].length || 0) <= 4;
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
