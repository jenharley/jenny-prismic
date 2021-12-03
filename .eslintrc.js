module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        camelcase: 'off',
        indent: ['error', 4],
        'react/prop-types': 'off',
        semi: ['error', 'always']
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
