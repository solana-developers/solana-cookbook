import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import * as path from "path";


export default defineUserConfig<DefaultThemeOptions> ({
  base: "/",
  lang: "en-US",
  title: "Solana Cookbook",
  themeConfig: {
    locales: {
      '/': {
        navbar:
        [
          {
            text: 'Contribute',
            link: 'https://github.com/solana-dev-adv/solana-cookbook',
          }
        ],
        sidebar: {
          '/recipes/': [
            {
              text: 'Getting Started',
              children: [
                '/recipes/getting-started.md'
              ]
            },
            {
              text: 'Ingredients',
              children: [
                '/recipes/ingredients/get-program-accounts.md'
              ]
            },
            {
              text: 'Recipes',
              children: [
                '/recipes/local-development.md',
                '/recipes/keypairs-and-wallets.md',
                '/recipes/basic-transactions.md',
                '/recipes/accounts.md',
                '/recipes/token.md',
                '/recipes/staking.md',
                '/recipes/offline-transactions.md',
              ]
            }
          ]
        }
      }
    }
  },
  markdown: {
    importCode: {
      handleImportPath: (str) => str.replace(/^@/, path.resolve(__dirname, "../../")),
    },
  },
  plugins: [
    [
      '@vuepress/plugin-google-analytics',
      {
        'id': 'UA-213843360-1'
      }
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          }
        },
        maxSuggestions: 10
      }
    ],
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
});