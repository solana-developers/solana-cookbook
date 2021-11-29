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
        sidebar: {
          '/recipes/': [
            {
              text: 'Getting Started',
              children: [
                '/recipes/getting-started.md'
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
      '@vuepress/google-analytics',
      {
        'id': 'UA-213843360-1'
      }
    ]
  ],
});