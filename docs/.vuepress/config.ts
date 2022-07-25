import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import * as path from "path";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",
  lang: "en-US",
  title: "Solana Cookbook",
  head: [
    ["link", { rel: "icon", href: "/solana_cookbook_lightmode.svg" }],
    [
      "script",
      {
        "data-domain": "solanacookbook.com",
        src: "https://plausible.io/js/plausible.js",
      },
    ],
  ],
  themeConfig: {
    logo: "/solana_cookbook_lightmode.svg",
    logoDark: "/solana_cookbook_darkmode.svg",
    contributors: false,
    algolia: {
      apiKey: "1831a64a81ffef4f85d5c0aa28cb801f",
      indexName: "solanacookbook",
      // If Algolia did not provided you any `appId`, use `BH4D9OD16A` or remove this option
      appId: "QMKSKREFKN",
      algoliaOptions: {
        hitsPerPage: 10,
      },
    },
    locales: {
      "/": {
        navbar: [
          {
            text: "Contribute",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
          {
            text: "Integrations",
            link: "/integrations",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Getting Started",
              children: ["/", "/getting-started/installation.md"],
            },
            {
              text: "Core Concepts",
              children: [
                "/core-concepts/accounts.md",
                "/core-concepts/programs.md",
                "/core-concepts/transactions.md",
                "/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/guides/get-program-accounts.md",
                "/guides/serialization.md",
                "/guides/data-migration.md",
                "/guides/account-maps.md",
                "/guides/retrying-transactions.md",
                "/guides/debugging-solana-programs.md",
                "/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "References",
              children: [
                "/references/local-development.md",
                "/references/keypairs-and-wallets.md",
                "/references/basic-transactions.md",
                "/references/accounts.md",
                "/references/programs.md",
                "/references/token.md",
                "/references/staking.md",
                "/references/nfts.md",
                "/references/offline-transactions.md",
                "/references/name-service.md",
              ],
            },
          ],
          "/integrations": [
            {
              text: "Integrations",
              children: [
                "/integrations",
                "/integrations/serum.md",
                "/integrations/pyth.md",
                "/integrations/switchboard.md",
                "/integrations/mango.md",
                "/integrations/strata.md",
                "/integrations/web3auth.md",
                "/integrations/react-native.md",
                "/integrations/jupiter.md",

              ],
            },
          ],
        },
      },
      "/zh/": {
        selectLanguageName: "中文",
        navbar: [
          {
            text: "贡献代码",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: [
          {
            text: "开始使用",
            children: ["/zh/", "/zh/getting-started/installation.md"],
          },
          {
            text: "核心概念",
            children: [
              "/zh/core-concepts/accounts.md",
              "/zh/core-concepts/programs.md",
              "/zh/core-concepts/transactions.md",
              "/zh/core-concepts/pdas.md",
            ],
          },
          {
            text: "指南",
            children: [
              // '/zh/guides/get-program-accounts.md',
              // '/zh/guides/serialization.md',
              // '/zh/guides/data-migration.md',
              // '/zh/guides/account-maps.md',
              // '/zh/guides/retrying-transactions.md',
              // '/zh/guides/debugging-solana-programs.md',
              // '/zh/guides/feature-parity-testing.md',
            ],
          },
          {
            text: "参考",
            children: [
              // '/zh/references/local-development.md',
              // '/zh/references/keypairs-and-wallets.md',
              // '/zh/references/basic-transactions.md',
              // '/zh/references/accounts.md',
              // '/zh/references/programs.md',
              // '/zh/references/token.md',
              // '/zh/references/anchor.md',
              // '/zh/references/staking.md',
              // '/zh/references/nfts.md',
              // '/zh/references/offline-transactions.md',
              // '/zh/references/name-service.md',
            ],
          },
        ],
      },
      "/es/": {
        selectLanguageName: "Spanish",
        navbar: [
          {
            text: "Contribuir",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Primeros pasos",
              children: ["/es/", "/es/getting-started/installation.md"],
            },
            {
              text: "Conceptos clave",
              children: [
                "/es/core-concepts/accounts.md",
                "/es/core-concepts/programs.md",
                "/es/core-concepts/transactions.md",
                "/es/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guías",
              children: [
                // '/es/guides/get-program-accounts.md',
                // '/es/guides/serialization.md',
                // '/es/guides/data-migration.md',
                // '/es/guides/account-maps.md',
                // '/es/guides/retrying-transactions.md',
                // '/es/guides/debugging-solana-programs.md',
                // '/es/guides/feature-parity-testing.md',
              ],
            },
            {
              text: "Referencias",
              children: [
                // '/es/references/local-development.md',
                // '/es/references/keypairs-and-wallets.md',
                // '/es/references/basic-transactions.md',
                // '/es/references/accounts.md',
                // '/es/references/programs.md',
                // '/es/references/token.md',
                // '/es/references/anchor.md',
                // '/es/references/staking.md',
                // '/es/references/nfts.md',
                // '/es/references/offline-transactions.md',
                // '/es/references/name-service.md',
              ],
            },
          ],
        }
      },
      "/vi/": {
        selectLanguageName: "Tiếng Việt",
        navbar: [
          {
            text: "Đóng góp",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
          {
            text: "Tích hợp",
            link: "/vi/integrations",
          },
        ],
        sidebar: {
          "/vi/": [
            {
              text: "Mở đầu",
              children: ["/vi/", "/vi/getting-started/installation.md"],
            },
            {
              text: "Khái niệm căn bản",
              children: [
                "/vi/core-concepts/accounts.md",
                "/vi/core-concepts/programs.md",
                "/vi/core-concepts/transactions.md",
                "/vi/core-concepts/pdas.md",
              ],
            },
            {
              text: "Hướng dẫn",
              children: [
                "/vi/guides/get-program-accounts.md",
                "/vi/guides/serialization.md",
                "/vi/guides/data-migration.md",
                "/vi/guides/account-maps.md",
                "/vi/guides/retrying-transactions.md",
                "/vi/guides/debugging-solana-programs.md",
                "/vi/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Tham khảo",
              children: [
                "/vi/references/local-development.md",
                "/vi/references/keypairs-and-wallets.md",
                "/vi/references/basic-transactions.md",
                "/vi/references/accounts.md",
                "/vi/references/programs.md",
                "/vi/references/token.md",
                "/vi/references/staking.md",
                "/vi/references/nfts.md",
                "/vi/references/offline-transactions.md",
                "/vi/references/name-service.md",
              ],
            },
          ],
          "/vi/integrations": [
            {
              text: "Tích hợp",
              children: [
                "/vi/integrations",
                "/vi/integrations/serum.md",
                "/vi/integrations/pyth.md",
                "/vi/integrations/switchboard.md",
                "/vi/integrations/mango.md",
                "/vi/integrations/strata.md",
                "/vi/integrations/web3auth.md",
                "/vi/integrations/react-native.md",
                "/vi/integrations/jupiter.md",
              ],
            },
          ],
        },
      },
    },
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US",
      title: "Solana Cookbook",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Solana秘籍",
    },
    "/es/": {
      lang: "es",
      title: "Solana Cookbook",
    },
    "/vi/": {
      lang: "vi-VN",
      title: "Toàn tập Solana",
    },
  },
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@/, path.resolve(__dirname, "../../")),
    },
  },
  plugins: [
    [
      "@vuepress/plugin-google-analytics",
      {
        id: "UA-213843360-1",
      },
    ],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
          "/zh/": {
            placeholder: "搜索",
          },
          "/vi/": {
            placeholder: "Tìm kiếm",
          },
        },
        maxSuggestions: 10,
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
      },
    ],
    [
      "@vuepress/docsearch",
      {
        apiKey: "1831a64a81ffef4f85d5c0aa28cb801f",
        indexName: "solanacookbook",
        appId: "QMKSKREFKN",
        algoliaOptions: {
          hitsPerPage: 10,
        },
        locales: {
          "/": {
            placeholder: "Search",
            translations: {
              button: {
                buttonText: "Search",
              },
            },
          },
          "/zh/": {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索文档",
              },
            },
          },
          "/vi/": {
            placeholder: "Tìm kiếm",
            translations: {
              button: {
                buttonText: "Tìm kiếm",
              },
            },
          },
        },
      },
    ],
  ],
});
