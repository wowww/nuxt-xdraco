/* eslint-disable */
import axios from '~/utils/wemix/sdk/axios';

axios.setAccessToken = function (wemixstorage, token) {
  const { key } = wemixstorage;
  const { storage } = wemixstorage;

  axios.defaults.headers.post.Authorization = `Bearer ${token && token}`;
  axios.defaults.headers.get.Authorization = `Bearer ${token && token}`;
  if (storage != null && key != null) {
    storage.setItem(key, token);
  } else {
    console.info('you can set wemix storage with setStorage(storage,key) function');
  }
};
axios.getAccessToken = function (token) {
  return axios.defaults.headers.post.Authorization.replace('Bearer', '').replace(' ', '');
};
export default axios;
