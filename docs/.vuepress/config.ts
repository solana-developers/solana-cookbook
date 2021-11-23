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
                '/recipes/keypairs-and-wallets.md',
                '/recipes/local-development.md'
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
});