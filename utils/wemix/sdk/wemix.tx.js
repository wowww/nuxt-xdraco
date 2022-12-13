/* eslint-disable */
import Wemix from './wemix.base';
import jwt from './crypto/jwt';
import web3Utils from 'web3-utils';

Wemix.prototype.makeUnsignedTx = async function (txtype, chain, to, token_approved, value, method, args) {
  const unsignedTx = {
    txtype,
    chain,
    nonce: -1,
    to,
    value,
    method,
    args,
  };
  if (token_approved !== '') {
    unsignedTx['token_approved'] = token_approved;
  }
  return await this.requestMakeUnsignedTxFunction(unsignedTx);
};
Wemix.prototype.findAddressByName = async function (chain, contract) {
  return await this.axios.post(this.env().wallet + '/contract/address', { chain, contract });
};

Wemix.prototype.unsignedTokenTransfer = async function (symbol, to, amount, fee) {
  const token = this.token(symbol);
  let txtype = 49;
  let value = 0;
  let method = 'transferToken';
  let args = [];
  let toAddress = to;
  let token_approved = '';
  if (symbol === 'KLAY') {
    txtype = 9;
    value = amount;
    method = '';
    args = [];
  } else if (token.chain == 'wemix') {
  } else {
    token_approved = token.address;
    toAddress = (await this.findAddressByName(token.chain, 'TokenTransfer')).data.address;
    args = [token.address, to, amount, fee];
  }

  const unsignedTx = {
    txtype,
    chain: token.chain,
    nonce: -1,
    to: toAddress,
    value,
    method,
    args,
  };
  if (token_approved !== '') {
    unsignedTx['token_approved'] = token_approved;
  }
  return this.requestMakeUnsignedTxFunction(unsignedTx);
};

Wemix.prototype.requestSignature = function (hashes, messages) {
  let type = hashes.map((c) => 3);
  let hashData = hashes.map((c) => ({ hash: c }));
  let theme = ['none'];
  if (messages != null) {
    if (Array.isArray(messages)) {
      type = type.concat(messages.map((c) => 2));
      hashData = hashData.concat(messages);
    } else {
      type.push(2);
      hashData.push(messages);
    }
  }

  const req = {
    address: this.address,
    hashData: hashData,
    type: type,
    theme: theme,
  };

  const jwtToken = jwt.createJWTByHS256(req);

  return {
    req,
    jwt: jwtToken,
  };
};

// memo: title
// theme: none, yellow,green,red
Wemix.prototype.requestMessageSignature = function (memo, theme, messages) {
  let type = [];
  let hashData = [];

  if (messages != null) {
    if (Array.isArray(messages)) {
      type.push(2);
      hashData = hashData.concat(messages);
    } else {
      type.push(2);
      hashData.push(messages);
    }

    hashData = [{ hash: web3Utils.soliditySha3(...hashData) }];
  }

  const req = {
    address: this.address,
    hashData: hashData,
    type: type,
  };
  if (theme != null && theme.length != 0) {
    req['theme'] = theme;
  }
  if (memo != null && memo.length != 0) {
    req['memo'] = memo;
  }

  const jwtToken = jwt.createJWTByHS256(req);

  return {
    req,
    jwt: jwtToken,
  };
};

Wemix.prototype.requestSignatureWithMemo = function (memo, theme, hashes, messages) {
  let type = hashes.map((c) => 3);
  let hashData = hashes.map((c) => ({ hash: c }));

  if (messages != null) {
    if (Array.isArray(messages)) {
      type.push(2);
      hashData = hashData.concat(messages);
    } else {
      type.push(2);
      hashData.push(messages);
    }
    hashData = [{ hash: web3Utils.soliditySha3(...hashData) }];
  }

  const req = {
    address: this.address,
    hashData: hashData,
    type: type,
    memo: memo,
    theme: theme,
  };

  const jwtToken = jwt.createJWTByHS256(req);

  return {
    req,
    jwt: jwtToken,
  };
};

Wemix.prototype.sendSignedTx = async function (hash, signature, type, xtype, payload) {
  return this.requestSendSignedTxFunction(hash, signature, type, xtype, payload);
};

Wemix.prototype.sendSignedTxs = async function (hashes, signature, types, type, payload) {
  let all = [];
  for (let i = 0; i < signature.length; i++) {
    if (hashes[i].hash != undefined) {
      all.push((await this.sendSignedTx(hashes[i].hash, signature[i], types[i], type, payload)).data);
    } else {
      all.push((await this.sendSignedTx(hashes[i], signature[i], types[i], type, payload)).data);
    }
  }
  return all;
};

Wemix.prototype.setRequestMakeUnsignedTx = function (func) {
  this.requestMakeUnsignedTxFunction = func;
};
Wemix.prototype.setRequestSendSignedTx = function (func) {
  this.requestSendSignedTxFunction = func;
};
