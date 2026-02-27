/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2024 TypeFox and others.
 * Licensed under the MIT License. See LICENSE in the package root for license information.
 * ------------------------------------------------------------------------------------------ */

import { defineConfig } from 'vite-plus';
import fs from 'node:fs';
import * as path from 'node:path';
import vsixPlugin from '@codingame/monaco-vscode-rollup-vsix-plugin';

const clangdWasmLocation = 'packages/examples/resources/clangd/wasm/clangd.wasm';

/// <reference lib="rolldown-vite/config" />

export const definedViteConfig = defineConfig({
  lint: {
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "plugins": [
      "typescript"
    ],
    "categories": {
      "correctness": "error"
    },
    "env": {
      "builtin": true,
      "es2022": true,
      "browser": true,
      "node": true
    },
    "ignorePatterns": [
      "**/.chrome/**/*",
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/lib/**/*",
      "**/out/**/*",
      "**/bin/**/*",
      "**/resources/**/*",
      "**/production/**/*",
      "**/public/**/*",
      "**/.next/**/*",
      "**/*env.d.ts",
      "**/.pnp.cjs"
    ],
    "rules": {
      "eqeqeq": "error",
      // currently in oxlint's nursery (=under development)
      "constructor-super": "error",
      // currently unsupported by oxlint
      "dot-notation": "error",
      "for-direction": "error",
      // currently in oxlint's nursery (=under development)
      "getter-return": "error",
      "guard-for-in": "error",
      // currently unsupported by oxlint
      "new-parens": "error",
      "no-async-promise-executor": "error",
      "no-bitwise": "error",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-const-assign": "error",
      "no-constant-binary-expression": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      // currently unsupported by oxlint
      "no-dupe-args": "error",
      "no-dupe-class-members": "error",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-empty-static-block": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-explicit-any": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-import-assign": "error",
      "no-inner-declarations": "off",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-labels": "error",
      "no-loss-of-precision": "error",
      // currently in oxlint's nursery (=under development)
      "no-misleading-character-class": "error",
      // currently unsupported by oxlint
      "no-multiple-empty-lines": ["error", {
          "max": 1
      }],
      "no-new-native-nonconstructor": "error",
      "no-new-wrappers": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-obj-calls": "error",
      // currently unsupported by oxlint
      "no-octal": "error",
      "no-prototype-builtins": "error",
      "no-redeclare": "error",
      "no-regex-spaces": "error",
      "no-self-assign": "error",
      "no-setter-return": "error",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-this-before-super": "error",
      "no-throw-literal": "error",
      // currently unsupported by oxlint
      "no-trailing-spaces": "error",
      // currently in oxlint's nursery (=under development)
      "no-undef": "off",
      "no-unexpected-multiline": "error",
      // currently in oxlint's nursery (=under development)
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "no-unused-vars": [
        "error",
        {
          "caughtErrorsIgnorePattern": "^_",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "no-useless-backreference": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-var": "error",
      "no-var-requires": "error",
      "no-with": "error",
      // currently unsupported by oxlint
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      // currently unsupported by oxlint
      "quotes": [2, "single", {
        "avoidEscape": true
      }],
      "require-yield": "error",
      // currently unsupported by oxlint
      "semi": [2, "always"],
      // currently unsupported by oxlint
      "space-before-function-paren": ["error", {
          "anonymous": "never",
          "asyncArrow": "always",
          "named": "never"
      }],
      "use-isnan": "error",
      "valid-typeof": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "no-array-constructor": "error",
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": [
        "error",
        {
          "default": "array-simple"
        }
      ],
      "@typescript-eslint/no-duplicate-enum-values": "error",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
      "@typescript-eslint/prefer-for-of": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-this-alias": "error",
      "@typescript-eslint/no-unnecessary-type-constraint": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/parameter-properties": "error",
      "@typescript-eslint/prefer-as-const": "error",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/triple-slash-reference": "error",
    }
  },
  build: {
      rolldownOptions: {
          input: {
              index: path.resolve(__dirname, 'index.html'),
              json_classic: path.resolve(__dirname, 'packages/examples/json_classic.html'),
              json: path.resolve(__dirname, 'packages/examples/json.html'),
              browser: path.resolve(__dirname, 'packages/examples/browser.html'),
              langium_extended: path.resolve(__dirname, 'packages/examples/langium_extended.html'),
              statemachine: path.resolve(__dirname, 'packages/examples/statemachine.html'),
              python: path.resolve(__dirname, 'packages/examples/python.html'),
              groovy: path.resolve(__dirname, 'packages/examples/groovy.html'),
              clangd: path.resolve(__dirname, 'packages/examples/clangd.html'),
              appPlayground: path.resolve(__dirname, 'packages/examples/appPlayground.html'),
              twoLangaugeClients: path.resolve(__dirname, 'packages/examples/two_langauge_clients.html'),
              reactAppPlayground: path.resolve(__dirname, 'packages/examples/react_appPlayground.html'),
              reactStatemachine: path.resolve(__dirname, 'packages/examples/react_statemachine.html'),
              reactPython: path.resolve(__dirname, 'packages/examples/react_python.html'),
              tsExtHost: path.resolve(__dirname, 'packages/examples/tsExtHost.html')
          }
      }
  },
  server: {
      port: 20001,
      cors: {
          origin: '*'
      },
      headers: {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp',
      },
      watch: {
          ignored: [
              '**/.chrome/**/*',
              './verify/**/*'
          ]
      }
  },
  optimizeDeps: {
      include: [
          '@codingame/monaco-vscode-standalone-languages',
          '@codingame/monaco-vscode-standalone-css-language-features',
          '@codingame/monaco-vscode-standalone-html-language-features',
          '@codingame/monaco-vscode-standalone-json-language-features',
          '@codingame/monaco-vscode-standalone-typescript-language-features',
          '@testing-library/react',
          'langium',
          'langium/lsp',
          'langium/grammar',
          'vscode/localExtensionHost',
          'vscode-jsonrpc',
          'vscode-languageclient',
          'vscode-languageserver',
          'vscode-languageserver/browser.js',
          'vscode-languageserver-protocol'
      ]
  },
  plugins: [
      {
          // For the *-language-features extensions which use SharedArrayBuffer
          name: 'configure-response-headers',
          apply: 'serve',
          configureServer: (server) => {
              server.middlewares.use((_req, res, next) => {
                  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless')
                  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
                  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
                  next()
              })
          }
      },
      vsixPlugin()
  ],
  define: {
      rootDirectory: JSON.stringify(__dirname),
      // Server-provided Content-Length header may be gzipped, get the real size in build time
      __WASM_SIZE__: fs.existsSync(clangdWasmLocation) ? fs.statSync(clangdWasmLocation).size : 0
  },
  worker: {
      format: 'es'
  }
});

export default definedViteConfig;
