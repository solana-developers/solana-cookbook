import * as path from 'path';
import { defineUserConfig } from 'vuepress';

import type { DefaultThemeOptions } from "vuepress";
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
                "/es/guides/get-program-accounts.md",
                "/es/guides/serialization.md",
                "/es/guides/data-migration.md",
                "/es/guides/account-maps.md",
                "/es/guides/retrying-transactions.md",
                "/es/guides/debugging-solana-programs.md",
                "/es/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Referencias",
              children: [
                '/es/references/local-development.md',
                '/es/references/keypairs-and-wallets.md',
                '/es/references/basic-transactions.md',
                '/es/references/accounts.md',
                '/es/references/programs.md',
                '/es/references/token.md',
                '/es/references/staking.md',
                '/es/references/nfts.md',
                '/es/references/offline-transactions.md',
                '/es/references/name-service.md',
              ],
            },
          ],
        },
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
      "/th/": {
        selectLanguageName: "ไทย",
        navbar: [
          {
            text: "ร่วมกันเขียน",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
          {
            text: "การใช้งาน",
            link: "/th/integrations",
          },
        ],
        sidebar: {
          "/th/": [
            {
              text: "เริ่มต้น",
              children: ["/th/", "/th/getting-started/installation.md"],
            },
            {
              text: "แนวความคิดหลัก",
              children: [
                "/th/core-concepts/accounts.md",
                "/th/core-concepts/programs.md",
                "/th/core-concepts/transactions.md",
                "/th/core-concepts/pdas.md",
              ],
            },
            {
              text: "แนวทาง",
              children: [
                "/th/guides/get-program-accounts.md",
                "/th/guides/serialization.md",
                "/th/guides/data-migration.md",
                "/th/guides/account-maps.md",
                "/th/guides/retrying-transactions.md",
                "/th/guides/debugging-solana-programs.md",
                "/th/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "อ้างอิง",
              children: [
                "/th/references/local-development.md",
                "/th/references/keypairs-and-wallets.md",
                "/th/references/basic-transactions.md",
                "/th/references/accounts.md",
                "/th/references/programs.md",
                "/th/references/token.md",
                "/th/references/staking.md",
                "/th/references/nfts.md",
                "/th/references/offline-transactions.md",
                "/th/references/name-service.md",
              ],
            },
          ],
          "/th/integrations": [
            {
              text: "การใช้งาน",
              children: [
                "/th/integrations",
                "/th/integrations/serum.md",
                "/th/integrations/pyth.md",
                "/th/integrations/switchboard.md",
                "/th/integrations/mango.md",
                "/th/integrations/strata.md",
                "/th/integrations/web3auth.md",
                "/th/integrations/react-native.md",
                "/th/integrations/jupiter.md",

              ],
            },
          ],
        },
      },
      "/fr/": {
        selectLanguageName: "Français",
        navbar: [
          {
            text: "Contribuer",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
          {
            text: "Intégrations",
            link: "/fr/integrations",
          },
        ],
        sidebar: {
          "/fr/": [
            {
              text: "Pour Commencer",
              children: ["/fr/", "/fr/getting-started/installation.md"],
            },
            {
              text: "Concepts Fondamentaux",
              children: [
                "/fr/core-concepts/accounts.md",
                "/fr/core-concepts/programs.md",
                "/fr/core-concepts/transactions.md",
                "/fr/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/fr/guides/get-program-accounts.md",
                "/fr/guides/serialization.md",
                "/fr/guides/data-migration.md",
                "/fr/guides/account-maps.md",
                "/fr/guides/retrying-transactions.md",
                "/fr/guides/debugging-solana-programs.md",
                "/fr/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Références",
              children: [
                "/fr/references/local-development.md",
                "/fr/references/keypairs-and-wallets.md",
                "/fr/references/basic-transactions.md",
                "/fr/references/accounts.md",
                "/fr/references/programs.md",
                "/fr/references/token.md",
                "/fr/references/staking.md",
                "/fr/references/nfts.md",
                "/fr/references/offline-transactions.md",
                "/fr/references/name-service.md",
              ],
            },
          ],
          "/fr/integrations": [
            {
              text: "Intégrations",
              children: [
                "/fr/integrations",
                "/fr/integrations/serum.md",
                "/fr/integrations/pyth.md",
                "/fr/integrations/switchboard.md",
                "/fr/integrations/mango.md",
                "/fr/integrations/strata.md",
                "/fr/integrations/web3auth.md",
                "/fr/integrations/react-native.md",
                "/fr/integrations/jupiter.md",

              ],
            },
          ],
        },
      },
      "/id/": {
        selectLanguageName: "Bahasa Indonesia",
        navbar: [
          {
            text: "Kontribusi",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
          {
            text: "Integrasi",
            link: "/id/integrations",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Memulai",
              children: ["/id/", "/id/getting-started/installation.md"],
            },
            {
              text: "Konsep Utama",
              children: [
                "/id/core-concepts/accounts.md",
                "/id/core-concepts/programs.md",
                "/id/core-concepts/transactions.md",
                "/id/core-concepts/pdas.md",
              ],
            },
            {
              text: "Panduan",
              children: [
                "/id/guides/get-program-accounts.md",
                "/id/guides/serialization.md",
                "/id/guides/data-migration.md",
                "/id/guides/account-maps.md",
                "/id/guides/retrying-transactions.md",
                "/id/guides/debugging-solana-programs.md",
                "/id/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Referensi",
              children: [
                "/id/references/local-development.md",
                "/id/references/keypairs-and-wallets.md",
                "/id/references/basic-transactions.md",
                "/id/references/accounts.md",
                "/id/references/programs.md",
                "/id/references/token.md",
                // "/id/references/anchor.md",
                "/id/references/staking.md",
                "/id/references/nfts.md",
                "/id/references/offline-transactions.md",
                "/id/references/name-service.md",
              ],
            },
          ],
          "/id/integrations": [
            {
              text: "Integrasi",
              children: [
                "/id/integrations",
                "/id/integrations/serum.md",
                "/id/integrations/pyth.md",
                "/id/integrations/switchboard.md",
                "/id/integrations/mango.md",
                "/id/integrations/strata.md",
                "/id/integrations/web3auth.md",
                "/id/integrations/react-native.md",
                "/id/integrations/jupiter.md",
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
    "/th/": {
      lang: "th-TH",
      title: "คู่มือ Solana",
    },
    "/fr/": {
      lang: "fr-FR",
      title: "Solana Cookbook",
    },
    "/id/": {
      lang: "id-ID",
      title: "Buku Panduan Solana",
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
          "/th/": {
            placeholder: "ค้นหา",
          },
          "/fr/": {
            placeholder: "Rechercher",
          },
          "/id/": {
            placeholder: "Cari",
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
          "/th/": {
            placeholder: "ค้นหา",
            translations: {
              button: {
                buttonText: "ค้นหา",
              },
            },
          },
          "/fr/": {
            placeholder: "Rechercher",
            translations: {
              button: {
                buttonText: "Rechercher",
              },
            },
          },
          "/id/": {
            placeholder: "Cari",
            translations: {
              button: {
                buttonText: "Cari",
              },
            },
          },
        },
      },
    ],
  ],
});
