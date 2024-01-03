/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'prettier',
        '@vue/eslint-config-prettier',
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
        'no-multiple-empty-lines': ['error', { max: 4 }],
    },
    plugins: ['prettier'],
}
