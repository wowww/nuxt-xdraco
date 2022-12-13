import Vue from 'vue';
import { dracoStorage } from '@/utils/baseUtil';
import { STORAGE_KEY } from '@/constants/accounts';

export default function({ $axios, redirect, store, $config }, inject) {
  console.log('env:', process.env.NODE_ENV);

  const wemixApiAxios = $axios.create({
    baseURL: process.env.VUE_APP_WEMIX_WALLET_ENTRY_POINT,
  });

  wemixApiAxios.interceptors.request.use(
    (request) => {
      const storedAccessToken = store.state.accessToken;
      const storageAccessToken = dracoStorage.get(STORAGE_KEY.WEMIX_TOKEN);
      const accessToken = storedAccessToken || storageAccessToken;
      request.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
      return request;
    },
    (error) => {
      console.log('wemix api error occured', error);
      if (error && error.response && error.response.status === 401) {
        store.dispatch('logOut');
      }
      return Promise.reject(error);
    },
  );

  const dracoWebApi = $axios.create({
    baseURL: process.env.VUE_APP_DRACO_WEB_API_ENTRY_POINT || 'http://127.0.0.1',
  });

  dracoWebApi.interceptors.request.use(
    (request) => {
      const storedDracoAccessToken = store.state.dracoAccessToken;
      const storageDracoAccessToken = dracoStorage.get(STORAGE_KEY.DRACO_TOKEN);
      const dracoAccessToken = storedDracoAccessToken || storageDracoAccessToken;
      request.headers.Authorization = dracoAccessToken ? `Bearer ${dracoAccessToken}` : '';
      request.withCredentials = true;

      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const dracoApi = $axios.create({
    baseURL: process.env.VUE_APP_DRACO_API_ENTRY_POINT,
  });

  $axios.onError = (error) => {
    console.log('wemix api error occured', error);
    const code = parseInt(error && error.response && error.response.code);
    switch (code) {
      case 400:
        redirect('/400');
        break;
      case 401:
        store.dispatch('logOut');
        break;
    }
  };

  Vue.$wemixApi = wemixApiAxios;
  Vue.prototype.$wemixApi = wemixApiAxios;
  inject('wemixApi', wemixApiAxios);

  Vue.$dracoWebApi = dracoWebApi;
  Vue.prototype.$dracoWebApi = dracoWebApi;
  inject('dracoWebApi', dracoWebApi);

  Vue.$dracoApi = dracoApi;
  Vue.prototype.$dracoApi = dracoApi;
  inject('dracoApi', dracoApi);
}
