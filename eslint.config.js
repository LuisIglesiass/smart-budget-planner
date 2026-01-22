// eslint.config.js (minimal + esencial)
import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';

import vueI18n from '@intlify/eslint-plugin-vue-i18n';
import i18nJson from 'eslint-plugin-i18n-json';
import jsoncParser from 'jsonc-eslint-parser';
import prettierPlugin from 'eslint-plugin-prettier';

// Define the custom plugin object
const sbpPlugin = {
    rules: {
        'key-pattern': {
            meta: {
                type: 'problem',
                schema: [
                    {
                        type: 'object',
                        properties: {
                            pattern: { type: 'string' },
                            allowNestedObjects: { type: 'boolean' }
                        },
                        additionalProperties: false
                    }
                ],
                messages: {
                    invalidKey: "Key '{{key}}' does not match required pattern {{pattern}}."
                }
            },
            create(context) {
                const { pattern = String.raw`^[a-z]+(\.[a-z0-9_]+){2,6}$` } = context.options?.[0] || {};
                const regex = new RegExp(pattern);

                return {
                    JSONProperty(node) {
                        if (!node.key || node.key.type !== 'JSONLiteral') return;
                        const key = String(node.key.value);
                        if (!regex.test(key)) {
                            context.report({ node: node.key, messageId: 'invalidKey', data: { key, pattern } });
                        }
                    }
                };
            }
        }
    }
};

export default [
    // 1) ignores
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            '**/.nuxt/**',
            '**/.output/**',
            '**/coverage/**',
            '**/*.stories.ts',
            '**/strapi_schema.ts',
            '**/*.d.*'
        ]
    },

    // 2) base configs
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...vue.configs['flat/recommended'],

    // 3) globals + settings generales
    {
        files: ['**/*.{js,cjs,mjs,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: { ...globals.browser, ...globals.node }
        }
    },

    // 4) vue-i18n settings
    {
        files: ['**/*.{js,ts,vue}'],
        settings: {
            'vue-i18n': { localeDir: './locales/*.json', messageSyntaxVersion: 'v9' }
        }
    },

    // 5) locales/*.json rules (JSON + i18n)
    {
        files: ['locales/*.json'],
        languageOptions: { parser: jsoncParser },
        plugins: {
            'i18n-json': i18nJson,
            'sbp-i18n': sbpPlugin // Reference the object defined above
        },
        rules: {
            'i18n-json/valid-json': 'error',
            'i18n-json/valid-message-syntax': ['error', { syntax: 'icu' }],
            'i18n-json/identical-keys': 'error',
            'i18n-json/identical-placeholders': 'error',
            'sbp-i18n/key-pattern': ['error', { pattern: String.raw`^[a-z]+(\.[a-z0-9_]+){2,6}$` }]
        }
    },

    // 6) Typed lint (solo donde lo necesitas)
    {
        files: [
            'nuxt.config.*',
            '*.d.ts',
            'types/**/*.{ts,d.ts}',
            'app/**/*.{ts,vue}',
            'server/**/*.{ts,vue}',
            'helpers/**/*.ts'
        ],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: ['.vue'],
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: {
            vue,
            '@typescript-eslint': tseslint.plugin,
            prettier: prettierPlugin,
            'vue-i18n': vueI18n
        },
        rules: {
            // essentials
            'vue-i18n/no-missing-keys': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
            eqeqeq: 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'prettier/prettier': ['error', {}, { usePrettierrc: true }],

            'vue/no-mutating-props': 'error',
            'vue/no-use-v-if-with-v-for': 'error',
            'vue/multi-word-component-names': 'off'
        }
    },

    // 7) Untyped TS
    {
        files: ['statics/**/*.ts'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
        },
        plugins: { '@typescript-eslint': tseslint.plugin, prettier: prettierPlugin },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            eqeqeq: 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'prettier/prettier': ['error', {}, { usePrettierrc: true }]
        }
    },

    // 8) Prettier collisions off
    eslintConfigPrettier,

    {
        files: ['app/components/base/**/*.vue'],
        rules: { 'vue/require-default-prop': 'off' }
    }
];
