const isProd = () => process.env.NODE_ENV === 'production';

require('dotenv').config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'static',

  loadingIndicator: {
    name: 'cube-grid',
    color: '#a0f',
    background: '#020219',
  },

  server: {
    host: '0.0.0.0',
    port: 8081,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'XDRACO',
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Author: Wemade co.' },
      { name: 'format-detection', content: 'telephone=no' },

      { property: 'og:title', content: 'XDRACO' },
      { property: 'og:image', content: 'https://file.mir4global.com/mir4-nft/img/og-image.jpg' },
      { property: 'og:description', content: 'MIR4 X DRACO' },

      { name: 'twitter:title', content: 'XDRACO' },
      { name: 'twitter:image', content: 'https://file.mir4global.com/mir4-nft/img/og-image.jpg' },
      { name: 'twitter:description', content: 'MIR4 X DRACO' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', media: 'screen' },
      { rel: 'preconnect', href: 'https://www.googletagmanager.com', media: 'screen', crossOrigin: true },
      { rel: 'stylesheet', href: 'https://file.mir4global.com/xdraco/external/filp.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css?display=swap', media: 'screen' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Inter:wght@400;500;700&display=swap',
        media: 'screen',
      },
    ],
    script: [
      { src: 'https://file.mir4global.com/xdraco/external/filp.js', defer: true },
      { src: 'https://unpkg.com/axios/dist/axios.min.js', defer: true },
    ],
  },

  badgeMessages: ['Hello, Wemade!'],

  router: {
    middleware: [
      'router',
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'swiper/css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuex-persist.client',
    '@/plugins/virtual-scroller.client',
    '@/plugins/i18n.client',
    '@/plugins/chart.client',
    '@/plugins/swiper.client',
    '@/plugins/xdraco-number',
    '@/plugins/validation',
    '@/plugins/axios',
    '@/plugins/wemix',
    '@/plugins/filters',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/style-resources-module#readme
    '@nuxtjs/style-resources',
    // Docs : https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8',
    // https://image.nuxtjs.org/
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
    // https://github.com/nuxt-community/dayjs-module
    '@nuxtjs/dayjs',
    // https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { filename: isProd() ? '.env.production' : '.env.beta', systemvars: true }],
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { SameSite: 'Strict' }],
    'nuxt-route-meta',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    https: true,
    proxyHeaders: false,
    credentials: false,
    proxy: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    theme: {
      disable: true,
      dark: false,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    parallel: !isProd(),
    devtools: !isProd(),
    extractCSS: true,
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: isProd(),
        },
      },
    },
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type),
    },
    resourceHints: true,
  },

  i18n: {
    locales: [
      {
        code: 'en',
        text: 'English',
        file: 'en.json',
      },
      {
        code: 'zh-Hans',
        text: '中文 简体',
        file: 'zh-Hans.json',
      },
      {
        code: 'zh-Hant',
        text: '中文 繁體',
        file: 'zh-Hant.json',
      },
      {
        code: 'ja',
        text: '日本語',
        file: 'ja.json',
      },
      {
        code: 'th',
        text: 'ไทย',
        file: 'th.json',
      },
      {
        code: 'id',
        text: 'Indonesia',
        file: 'id.json',
      },
      {
        code: 'vi',
        text: 'Tiếng Việt',
        file: 'vi.json',
      },
      {
        code: 'de',
        text: 'Deutsche',
        file: 'de.json',
      },
      {
        code: 'es',
        text: 'Español',
        file: 'es.json',
      },
      {
        code: 'pt',
        text: 'Portugues',
        file: 'pt.json',
      },
      {
        code: 'ru',
        text: 'русский',
        file: 'ru.json',
      },
    ],
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    onLanguageSwitched: (oldLocale, newLocale) => {
      localStorage.setItem('draco-locale', newLocale);
    },
    vueI18n: {
      fallbackLocale: {
        'cn': ['zh-Hans'],
        'tw': ['zh-Hant'],
        'default': ['en'],
      },
    },
  },

  dayjs: {
    locales: ['en', 'zh', 'ja', 'th', 'id', 'vi', 'de', 'es', 'pt', 'ru'],
    defaultLocale: 'en',
    defaultTimeZone: 'Asia/Tokyo',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'duration', // import 'dayjs/plugin/duration'
    ], // Your Day.js plugin
  },

  googleFonts: {
    preconnect: true,
  },
};
