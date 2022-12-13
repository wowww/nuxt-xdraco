const environment = {
  local: {
    webauth: 'https://alpha-webauth.wemix.co',
    oauth: 'https://alpha-oauth.wemix.co',
    wallet: 'http://localhost:8080',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  alpha: {
    webauth: 'https://alpha-webauth.wemix.co',
    oauth: 'https://alpha-oauth.wemix.co',
    wallet: 'https://alpha-dapp.wemix.co',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  dev: {
    webauth: 'https://dev-webauth.wemix.co',
    oauth: 'https://dev-oauth.wemix.co',
    wallet: 'https://dev-dapp.wemix.co',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  stage: {
    webauth: 'https://stg-webauth.wemixnetwork.com',
    oauth: 'https://stg-oauth.wemixnetwork.com',
    wallet: 'https://stg-dapp.wemixnetwork.com',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  'stage-mir4': {
    // https://stg-wallet-sdk-front.wemixnetwork.com/
    webauth: 'https://stg-webauth.wemixnetwork.com',
    oauth: 'https://stg-oauth.wemixnetwork.com',
    wallet: 'https://stg-dapp.wemixnetwork.com',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  'production-mir4': {
    webauth: 'https://webauth.wemixnetwork.com',
    oauth: 'https://oauth.wemixnetwork.com',
    wallet: 'https://dapp.wemixnetwork.com',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
  production: {
    webauth: 'https://webauth.wemixnetwork.com',
    oauth: 'https://oauth.wemixnetwork.com',
    wallet: 'https://dapp.wemixnetwork.com',
    binder: {},
    client_id: process.env.VUE_APP_WEMIX_SDK_CLIENT_ID,
  },
};
export default environment;
