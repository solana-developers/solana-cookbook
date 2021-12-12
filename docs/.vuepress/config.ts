import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import * as path from 'path';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  title: 'Solana Cookbook',
  themeConfig: {
    head: [
      ['meta', { name: 'og:title', content: 'Solana Cookbook | Home to Solana References' }],
      ['meta', { name: 'og:description', content: 'The Solana cookbook is a collection of useful examples and references for building on Solana' }],
      ['meta', { name: 'og:image', content: 'https://solanacookbook.com/solana-card.jpeg' }],
      ['meta', { name: 'og:image:alt', content: 'Solana splash card' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:site', content: '@solanacookbook' }],
      ['meta', { name: 'robots', content: 'index,follow,noodp' }],
      ['meta', { name: 'googlebot', content: 'index,follow' }],
    ],
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
            children: ['/getting-started/installation.md'],
          },
          {
            text: 'Core Concepts',
            children: ['/core-concepts/accounts.md', '/core-concepts/programs.md']
          },
          {
            text: 'Ingredients',
            children: ['/ingredients/get-program-accounts.md'],
          },
          {
            text: 'Recipes',
            children: [
              '/recipes/local-development.md',
              '/recipes/keypairs-and-wallets.md',
              '/recipes/basic-transactions.md',
              '/recipes/accounts.md',
              '/recipes/programs.md',
              '/recipes/token.md',
              '/recipes/staking.md',
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
