import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import * as path from 'path';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  title: 'Solana Cookbook',
  head: [
      ['link', { rel: 'icon', href: '/solana_cookbook_lightmode.svg' }],
      ['script', { 'data-domain': "solanacookbook.com", src: "https://plausible.io/js/plausible.js"}]
  ],
  themeConfig: {
    logo: '/solana_cookbook_lightmode.svg',
    logoDark: '/solana_cookbook_darkmode.svg',
    locales: {
      '/': {
        navbar: [
          {
            text: 'Contribute',
            link: 'https://github.com/solana-dev-adv/solana-cookbook',
          },
        ],
        sidebar: [
          {
            text: 'Getting Started',
            children: [
              '/',
              '/getting-started/installation.md'
            ],
          },
          {
            text: 'Core Concepts',
            children: [
              '/core-concepts/accounts.md', 
              '/core-concepts/programs.md', 
              '/core-concepts/transactions.md',
            ]
          },
          {
            text: 'Ingredients',
            children: [
              '/ingredients/get-program-accounts.md',
              '/ingredients/serialization.md',
            ],
          },
          {
            text: 'Recipes',
            children: [
              '/recipes/local-development.md',
              '/recipes/websocket.md',
              '/recipes/keypairs-and-wallets.md',
              '/recipes/basic-transactions.md',
              '/recipes/accounts.md',
              '/recipes/programs.md',
              '/recipes/token.md',
              '/recipes/staking.md',
              '/recipes/nfts.md',
              '/recipes/offline-transactions.md',
              '/recipes/name-service.md',
            ],
          },
        ],
      },
    },
  },
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@/, path.resolve(__dirname, '../../')),
    },
  },
  plugins: [
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'UA-213843360-1',
      },
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
        maxSuggestions: 10,
      },
    ],
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ],
});
