module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/valid-attribute-name': 'off',
    'vue/valid-model-definition': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/no-reserved-component-names': 'off',
    'import/default': 'off',
    'vue/no-v-html': 'off',
    // TODO: remove below
    eqeqeq: 'off',
    'no-unused-vars': 'off',
    'nuxt/no-globals-in-created': 'off',
  },
};
