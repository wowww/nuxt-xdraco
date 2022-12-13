/* eslint-disable */
import Wemix from './wemix.base';
import jwt from './crypto/jwt';

/*
컨트랙트의 단순 조회 메소드를 호출 할 경우 사용합니다.
*/
Wemix.prototype.contractCall = async function (chain, contract, method, ...args) {
  return await this.axios.post(`${this.env().wallet}/contract/call`, { chain, contract, method, args: args.map((c) => c.toString()) });
};

Wemix.prototype.contractAddress = async function (chain, contractName) {
  return await this.axios.post(`${this.env().wallet}/contract/address`, { chain, contract: contractName });
};
