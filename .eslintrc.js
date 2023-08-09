module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    // override/add rules settings here, such as:
    // "vue/no-unused-vars": "error",
    'func-call-spacing': 'off',
    'vue/attribute-hyphenation': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
