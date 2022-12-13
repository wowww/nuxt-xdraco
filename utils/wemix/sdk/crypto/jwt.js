import base64js from 'base64-js';
import CryptoJS from 'crypto-js';

export class JWT {
  createJWTByHS256(_obj) {
    const headerStruct = {
      typ: 'JWT',
      alg: 'HS256',
    };

    const header = this.Base64Encode(JSON.stringify(headerStruct)).replace(/[=]/g, '');

    const payload = this.Base64Encode(JSON.stringify(_obj)).replace(/[=]/g, '');

    const signature = this.GenerateHMAC('sha256', header + payload);

    return `${header}.${payload}.${signature}`;
  }

  // eslint-disable-next-line class-methods-use-this
  Base64Encode(str, encoding = 'utf-8') {
    const bytes = new TextEncoder().encode(str);
    return base64js.fromByteArray(bytes);
  }

  // eslint-disable-next-line class-methods-use-this
  Base64Decode(str, encoding = 'utf-8') {
    const bytes = base64js.toByteArray(str);
    return new TextDecoder(encoding).decode(bytes);
  }

  // eslint-disable-next-line class-methods-use-this
  GenerateHMAC(key, payload) {
    const timestamp = new Date().getTime();
    const message = btoa(payload + timestamp);
    const hash = CryptoJS.HmacSHA256(message, key);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
}

const jwt = new JWT();
export default jwt;
