import { dracoStorage } from '@/utils/baseUtil';
import { STORAGE_KEY } from '@/constants/accounts';

export default ({ store }) => {
  store.commit('setAccessToken', dracoStorage.get(STORAGE_KEY.WEMIX_TOKEN));
  store.commit('setUserId', dracoStorage.get(STORAGE_KEY.WEMIX_USER_ID));
  store.commit('setDracoAccessToken', dracoStorage.get(STORAGE_KEY.DRACO_TOKEN));
  store.commit('setWalletAddress', dracoStorage.get(STORAGE_KEY.DRACO_WALLET));
  store.commit('nft/setViewMode', dracoStorage.get(STORAGE_KEY.NFT_VIEW_MODE));
  const characterInfo = dracoStorage.get(STORAGE_KEY.DRACO_CHARACTER)
  if (characterInfo) {
    store.commit('account/setExist', 1);
    store.commit('account/setRepresent', JSON.parse(characterInfo));
  }
}
