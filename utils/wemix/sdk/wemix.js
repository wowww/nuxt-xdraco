/* eslint-disable */
import Wemix from './wemix.base';
import './wemix.qr';
import './wemix.tx';
import './wemix.view';

Wemix.prototype.setStorage = function (storage, key) {
  this.storage().storage = storage;
  this.storage().key = key;
};
Wemix.prototype.getStorage = function () {
  return this.storage().storage;
};
Wemix.prototype.setEnv = function (env) {
  Object.keys(env).forEach((k) => {
    this.env()[k] = env[k];
  });

  // this.env = env;
  if (this.storage().storage == null) {
    console.info('you can set wemix storage with setStorage(storage,key) function');
    return;
  }

  if (this.storage().getKeyValue() != null) {
    // this.axios.setAccessToken(this.storage(), this.storage().getKeyValue());
    this.login('ko');
  }
};

Wemix.prototype.verify = async function () {
  // eslint-disable-next-line no-return-await
  return await this.axios.post(`${this.env().wallet}/verify`);
};

Wemix.prototype.login = async function (lang) {
  if (lang == null) {
    lang = 'en';
  }
  const task = Vue.axios.post(`${this.env().wallet}/login`, { lang });

  task.then((result) => {
    this.address = result.data.address;
    this.tokens = [];
    result.data.tokens.forEach((row) => {
      this.tokens[row.symbol] = row;
    });
  });
  // eslint-disable-next-line no-return-await
  return await task;
};

Wemix.prototype.walletAddress = function () {
  return this.address;
};

Wemix.prototype.token = function (symbol) {
  return this.tokens[symbol];
};
Wemix.prototype.tokenAll = function () {
  return this.tokens;
};

Wemix.prototype.balance = async function (symbol) {
  // eslint-disable-next-line no-return-await
  return await this.axios.post(`${this.env().wallet}/balance/balance`, { symbol, owner: '0x0000000000000000000000000000000000000000' });
};

Wemix.prototype.balanceAll = async function () {
  // eslint-disable-next-line no-return-await
  return await this.axios.post(`${this.env().wallet}/balance/balanceAll`, {});
};

Wemix.prototype.priceAll = async function () {
  // eslint-disable-next-line no-return-await
  return await this.axios.post(`${this.env().wallet}/price/all`, {});
};

const wemix = new Wemix();

export default wemix;
