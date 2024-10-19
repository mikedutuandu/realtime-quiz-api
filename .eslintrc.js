module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-return-await': ['error'],
        'no-console': ['error'],
        'max-len': ['error', { code: 120, ignorePattern: '^import .*' }],
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'variableLike', format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'allow' },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', argsIgnorePattern: '_', ignoreRestSiblings: true },
        ],
    },
};
