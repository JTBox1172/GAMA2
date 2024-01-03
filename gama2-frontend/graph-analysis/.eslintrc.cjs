/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'linebreak-style': 0,
        'no-unused-vars': 'off',
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
            },
        ],
        'no-multiple-empty-lines': 'off',
    },
    plugins: ['prettier'],
}
