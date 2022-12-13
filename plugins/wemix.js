import Vue from 'vue';
import web3Utils from 'web3-utils';
import jwt from '@/utils/wemix/sdk/crypto/jwt';

const Wemix = ({ $dracoWebApi, $wemixApi, state }) => ({
  clientSecret: process.env.VUE_APP_WEMIX_SDK_CLIENT_SECRET,
  clientId: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  makeUnsignedTx: (txtype, chain, to, tokenApproved, value, method, args) => {
    const unsignedTx = {
      txtype,
      chain,
      nonce: -1,
      to,
      value,
      method,
      args,
    };
    if (tokenApproved !== '') {
      unsignedTx.token_approved = tokenApproved;
    }
    return this.$dracoWebApi.post(`/dsp/makeunsignedtx/${unsignedTx.method}`, unsignedTx);
  },
  api: {
    prepare: (param) => {
      return $dracoWebApi.post('/wemix/auth/prepare', {
        ...param,
        client_id: Wemix.clientId,
        client_secret: Wemix.clientSecret,
      });
    },
    findAddressByName: (chain, contract) => {
      return $wemixApi.post('/contract/address', { chain, contract });
    },
    balance: (symbol) => {
      return $wemixApi.post('/balance/balance', { symbol, owner: '0x0000000000000000000000000000000000000000' });
    },
    balanceAll: () => {
      return $wemixApi.post('/balance/balanceAll');
    },
    priceAll: () => {
      return $wemixApi.post('/price/all');
    },
    requestToken: (param) =>
      $dracoWebApi.post(`/login/wemix`, {
        client_id: Wemix.clientId,
        client_secret: Wemix.clientSecret,
        ...param,
      }),
    sendUnsignedTransaction: (param) => $dracoWebApi.post(`/dsp/makeunsignedtx/${param.method}`, param),
    sendSignedTransaction: (kind, param) => {
      const { hash, signature, signType, payload } = param;
      console.log('send signed transaction', param);
      if (kind === 'exd') {
        if (signType === 2) {
          return $dracoWebApi.post(`/exd/trade`, {
            tradeUID: payload.tradeUID,
            characterUID: payload.characterUID,
            languageCode: payload.languageCode,
            itemName32: payload.itemName32,
            hash,
            sign: signature,
          });
        } else if (signType === 3) {
          return $dracoWebApi.post(`/exd/approvedSign`, { hash, sign: signature });
        }
      } else if (kind === 'mirage-energy') {
        if (signType === 2) {
          return $dracoWebApi.post(`/mirage/energy`, {
            TicketID: payload.TicketID,
            ProductID: payload.ProductID,
            hash,
            userSig: signature,
          });
        } else if (signType === 3) {
          return $dracoWebApi.post(`/mirage/approve`, { hash, sign: signature });
        }
      } else if (kind === 'mirage-draco') {
        if (signType === 2) {
          return $dracoWebApi.post(`/mirage/exchange`, {
            token: 'draco',
            amount: payload.amount,
            hash,
            userSig: signature,
            nonce: payload.nonce,
          });
        } else if (signType === 3) {
          return $dracoWebApi.post(`/mirage/approve`, { hash, sign: signature });
        }
      } else if (kind === 'mirage-hydra') {
        if (signType === 2) {
          return $dracoWebApi.post(`/mirage/exchange`, {
            token: 'hydra',
            amount: payload.amount,
            hash,
            userSig: signature,
            nonce: payload.nonce,
          });
        } else if (signType === 3) {
          return $dracoWebApi.post(`/mirage/approve`, { hash, sign: signature });
        }
      } else if (kind === 'mirage-unseal') {
        return $dracoWebApi.post(`/mirage/import`, { tokenID: payload.TokenID, userSig: signature, nonce: payload.nonce });
      } else if (kind === 'mirage-seal') {
        return $dracoWebApi.post(`/mirage/seal`, { tokenID: payload.tokenID, userSig: signature, nonce: payload.nonce });
      } else if (kind === 'hsp') {
        return $dracoWebApi.post(`/hsp/transaction`, { hash, sign: signature });
      } else {
        return $dracoWebApi.post(`/dsp/sendsignedtx`, { hash, sign: signature });
      }
    },
  },
  transaction: {
    makeUnsignedTx: (txtype, chain, to, tokenApproved, value, method, args) => {
      const unsignedTx = {
        txtype,
        chain,
        nonce: -1,
        to,
        value,
        method,
        args,
      };
      if (tokenApproved !== '') {
        unsignedTx.token_approved = tokenApproved;
      }
      return this.requestMakeUnsignedTxFunction(unsignedTx);
    },
    unsignedTokenTransfer: async (symbol, to, amount, fee) => {
      const token = this.token(symbol);
      let txtype = 49;
      let value = 0;
      let method = 'transferToken';
      let args = [];
      let toAddress = to;
      let tokenApproved = '';
      if (symbol === 'KLAY') {
        txtype = 9;
        value = amount;
        method = '';
        args = [];
      } else {
        tokenApproved = token.address;
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
      if (tokenApproved !== '') {
        unsignedTx.token_approved = tokenApproved;
      }
      return this.requestMakeUnsignedTxFunction(unsignedTx);
    },
    requestSignature: (hashes, messages) => {
      console.log('request signature', state.walletAddress);
      let type = hashes.map((c) => 3);
      let hashData = hashes.map((c) => ({ hash: c }));
      const theme = ['none'];
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
        address: state.walletAddress,
        hashData,
        type,
        theme,
      };

      const jwtToken = jwt.createJWTByHS256(req);

      return {
        req,
        jwt: jwtToken,
      };
    },
    requestMessageSignature: (memo, theme, messages) => {
      console.log('request message signature', state.walletAddress);
      const type = [];
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
        address: state.walletAddress,
        hashData,
        type,
      };
      if (theme != null && theme.length !== 0) {
        req.theme = theme;
      }
      if (memo != null && memo.length !== 0) {
        req.memo = memo;
      }

      const jwtToken = jwt.createJWTByHS256(req);

      return {
        req,
        jwt: jwtToken,
      };
    },
    requestSignatureWithMemo: (memo, theme, hashes, messages) => {
      const type = hashes.map((c) => 3);
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
        address: state.walletAddress,
        hashData,
        type,
        memo,
        theme,
      };

      const jwtToken = jwt.createJWTByHS256(req);

      return {
        req,
        jwt: jwtToken,
      };
    },
  },
});

export default function({ store, wemixApi }, inject) {
  const wemix = Wemix(store);
  wemix.axios = wemixApi;
  Vue.$wemix = wemix;
  Vue.prototype.$wemix = wemix;
  inject('wemix', wemix);
};
