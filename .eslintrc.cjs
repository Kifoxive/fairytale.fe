module.exports = {
    root: true,
    env: {
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'simple-import-sort', 'react-hooks'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended',
    ],
    ignorePatterns: ['dist'],
    rules: {
        /**
         * Rule for sorting imports.
         * @see {@link https://github.com/lydell/eslint-plugin-simple-import-sort/}
         */
        'simple-import-sort/imports': [
            'warn',
            {
                /**
                 * Groups of regular expressions that determine order of imports
                 * A new row is inserted in between the groups.
                 * Imports in one group are not divided by empty rows.
                 */
                groups: [
                    ['^\\u0000'],
                    // Imports of side effects
                    [
                        '^react',
                        // Import for react
                        '^@?\\w', // Starts with any character in a word or with @
                    ],
                    [
                        '^[^.]',
                        // Anything that does not start with dot
                        '^\\.', // Anything that starts with dot
                    ],
                    ['module\\.scss$'], // Anything that ends with module.scss (i.e. styles)
                ],
            },
        ],

        /** Rule for sorting exports.*/
        'simple-import-sort/exports': 'warn',
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^(TData|TValue)',
            },
        ],
        'react-hooks/exhaustive-deps': 'off',
    },
};
