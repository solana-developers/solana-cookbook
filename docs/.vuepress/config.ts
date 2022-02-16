import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import * as path from 'path';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  lang: 'en-US',
  title: 'Solana Cookbook',
  head: [
    ['link', { rel: 'icon', href: '/solana_cookbook_lightmode.svg' }],
    ['script', { 'data-domain': "solanacookbook.com", src: "https://plausible.io/js/plausible.js" }]
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
              '/core-concepts/pdas.md',
            ]
          },
          {
            text: 'Guides',
            children: [
              '/guides/get-program-accounts.md',
              '/guides/serialization.md',
              '/guides/data-migration.md',
              '/guides/account-maps.md',
              '/guides/retrying-transactions.md',
              '/guides/debugging-solana-programs.md',
              '/guides/feature-parity-testing.md',
            ],
          },
          {
            text: 'References',
            children: [
              '/references/local-development.md',
              '/references/keypairs-and-wallets.md',
              '/references/basic-transactions.md',
              '/references/accounts.md',
              '/references/programs.md',
              '/references/token.md',
              '/references/anchor.md',
              '/references/staking.md',
              '/references/nfts.md',
              '/references/offline-transactions.md',
              '/references/name-service.md',
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
