// ESLint configuration
// http://eslint.org/docs/user-guide/configuring

module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:flowtype/recommended',
        'prettier',
        'prettier/flowtype'
    ],
    plugins: ['flowtype', 'jsx-a11y', 'prettier'],
    env: {
        node: true,
        es6: true
    },
    rules: {
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info']
            }
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
                aspects: ['noHref', 'invalidHref', 'preferButton']
            }
        ],
        'prettier/prettier': 'error',
        'no-unused-vars': 1
    },
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules']
            }
        }
    }
};
