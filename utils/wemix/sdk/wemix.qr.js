/* eslint-disable */
import Wemix from './wemix.base';
import i18n from './language/i18n';
// import html from './templete/qr/qr.htm';
// import mobileHtml from './templete/qr/mobile/mobile.htm';
import qrcode from 'qrcode';
import Device from './device';
import { STORAGE_KEY } from '~/constants/accounts';
import { dracoStorage } from '~/utils/baseUtil';

Wemix.prototype.openQR = async function(type, req, success, fail, cancel, xdracoType, xdracoPayload) {
  const templetes = [
    'qr.title.prefix',
    'qr.title.suffix',
    'qr.remain',
    'qr.text1',
    'qr.text2',
    'qr.step1',
    'qr.step2',
    'qr.step3',
    'qr.step1.mobile',
    'qr.step2.mobile',
    'qr.step3.mobile',
    'qr.other1',
    'qr.allow.popup.mobile',
  ];
  // let bind = html;

  if (Device.isMobile()) {
    // bind = mobileHtml;
    require('./templete/qr/mobile/mobile.css');
  } else {
    require('./templete/qr/qr.scss');
  }

  templetes.forEach((element) => {
    const v = i18n.t(element);
    // bind = bind.replace('${' + element + '}', v);
  });

  // document.body.insertAdjacentHTML('afterend', bind);

  let self = this;
  let modal = document.querySelector('.wemix__modal');
  let canvas = document.querySelector('.wemix__qr-canvas');
  let btnClose = document.querySelector('.wemix__modal-close');
  let remainSec = document.querySelector('.wemix__modal-qrcode-remain');
  let refreshIcon = document.querySelector('.wemix__modal-qrcode-image-refresh');
  if (refreshIcon != null) {
    refreshIcon.onclick = function() {
      self.getQR().btnClose.click();
      self.openQR(type, req, success, fail, cancel, xdracoType, xdracoPayload);
    };
  }
  btnClose.onclick = function(e) {
    clearInterval(self.getQR().timer);
    modal.parentNode.removeChild(modal);

    if (e.isTrusted && cancel) {
      cancel();
    }
  };

  const qr = {
    canvas: canvas,
    remainSec,
    btnClose,
    req,
    refreshIcon,
  };
  this.getQR = function() {
    return qr;
  };
  const prepare = await this.authPrepare(type, req);
  if (Device.isMobile()) {
    window.open(prepare.url, 'WEMIX Authentication');
  }
  qr.request_id = prepare.request_id;
  qr.expires_in = prepare.expires_in;
  qr.type = type;
  qr.timer = this._listenQR(qr, success, fail, xdracoType, xdracoPayload);
  qr.decreaseRemain = function(sec) {
    this.expires_in = this.expires_in - 1;
    let second = this.expires_in;
    if (sec != undefined) {
      second = sec;
    }
    if (second > 0) {
      const mm = parseInt(((second % 3600) / 60).toString()).toString();
      const ss = parseInt((second % 60).toString()).toString();
      let format = i18n.t('qr.remain.format').replace('${mm}', mm).replace('${ss}', ss);
      this.remainSec.innerText = format;
    } else {
      this.remainSec.innerText = i18n.t('qr.expired');
      if (refreshIcon != null) refreshIcon.style.setProperty('display', 'block');
    }
  };
  qr.decreaseRemain();
};

Wemix.prototype.qr = {
  canvas: null,
  remainSec: 0,
  btnClose: null,
  req: null,
};

Wemix.prototype._listenQR = function(qr, success, fail, type, payload) {
  let self = this;
  let request_id = qr.request_id;

  console.log(request_id);
  const timer = setInterval(() => {
    self.getQR().decreaseRemain();
    const task = self.axios.get(self.env().oauth + '/api/v2/a2a/result?client_id=' + self.env().client_id + '&request_id=' + encodeURIComponent(request_id));
    task.then((result) => {
      const status = result.data.status;
      if (status !== 'prepare' && status !== 'pending') {
        clearInterval(timer);
        if (status == 'confirm') {
          if (self.getQR().type === 'auth') {
            const token = self
              .requestTokenFunction({
                client_id: self.env().client_id,
                code: result.data.result,
                grant_type: 'code',
              })
              .then(async (c) => {
                const dracoAccessToken = c.data.data.accessToken;
                const accessToken = c.data.data.wemix.access_token;
                const walletAddress = c.data.data.wemix.address;

                if (self.store) {
                  self.store.commit('setAccessToken', accessToken);
                  self.store.commit('setDracoAccessToken', dracoAccessToken);
                  self.store.commit('setWalletAddress', walletAddress);
                }

                if (c.data.data.game) {
                  self.store.commit('account/setExist', c.data.data.game.accountExists || 0);
                  if (c.data.data.game.representCharacter) {
                    self.store.commit('account/setRepresent', c.data.data.game.representCharacter);
                  }
                }

                await self.login('ko');
                success(c);
                self.getQR().btnClose.click();
              })
              .catch((err) => {
                fail(err);
              });
          } else {
            const hashes = self.getQR().req.req.hashData;
            const types = self.getQR().req.req.type;
            const signatures = JSON.parse(result.data.result);
            if (signatures.length != hashes.length) {
              alert('not match signature and hashes');
            }
            const allTask = self.sendSignedTxs(hashes, signatures, types, type, payload);
            console.log(allTask);
            allTask
              .then((all) => {
                console.log('qr.all', all);
                let r = true;
                for (let i = 0; i < all.length; i++) {
                  const { code, data } = all[i];
                  if (code !== 200 || (data && data.Result != 0)) {
                    fail(all);
                    r = false;
                  }
                }
                if (r) {
                  success(all);
                }
              })
              .catch((err) => {
                fail(allTask, err);
              });
            self.getQR().btnClose.click();
          }
        }
      } else if (status == 'pending') {
        if (qr.refreshIcon != null) qr.refreshIcon.style.setProperty('display', 'block');
      }
    })
      .catch((error) => {
        clearInterval(timer);
        self.getQR().decreaseRemain(0);
        fail(error.toJSON());
      });
  }, 1000);
  return timer;
};
Wemix.prototype.setRequestTokenFunction = function(func) {
  this.requestTokenFunction = func;
};
Wemix.prototype.setRequestPreparedFunction = function(func) {
  this.requestPreparedFunction = func;
};
Wemix.prototype.authPrepare = async function(type, req) {
  const param = { client_id: this.env().client_id, type };

  if (type == 'sign') {
    param.data = req.jwt;
  }

  const result = await this.requestPreparedFunction(param);

  let url = this.makeQRValue(result.data.data.request_id, type, null) + '&client_id=' + this.env().client_id; //+"&redirect_uri="+location.href;
  /*
  사용안함.
  if (type == 'sign') {
    url += '&query=' + req.jwt;
  }
  */
  qrcode.toCanvas(this.getQR().canvas, url, { width: 300, errorCorrectionLevel: 'L' });

  const authQrResult = {
    url,
    expires_in: result.data.data.expires_in,
    request_id: result.data.data.request_id,
  };
  return authQrResult;
};
Wemix.prototype.makeQRValue = function(request_id, type) {
  let path = '';
  if (type == 'auth') path = 'authentication';
  else if (type == 'sign') path = 'signature';

  return this.env().oauth + '/api/v2/a2a/launch/' + path + '?request_id=' + request_id;
};

Wemix.prototype.dec2hex = function(number) {
  let hexString = number.toString(16);
  return hexString;
};
Wemix.prototype.hex2dec = function(hexString) {
  let yourNumber = parseInt(hexString, 16);
  return yourNumber;
};
