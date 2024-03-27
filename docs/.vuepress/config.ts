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
    contributors: true,
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
                "/core-concepts/cpi.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/guides/get-program-accounts.md",
                "/guides/serialization.md",
                "/guides/data-migration.md",
                "/guides/account-maps.md",
                "/guides/debugging-solana-programs.md",
                "/guides/feature-parity-testing.md",
                "/guides/versioned-transactions.md"
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
                {
                  text: "Gaming",
                  collapsible: true,
                  children: [
                    "/gaming/intro.md",
                    "/gaming/game-sdks.md",
                    "/gaming/nfts-in-games.md",
                    "/gaming/hello-world.md",
                    "/gaming/store-sol-in-pda.md",
                    "/gaming/saving-game-state.md",
                    "/gaming/energy-system.md",
                    "/gaming/interact-with-tokens.md",
                    "/gaming/porting-anchor-to-unity.md",
                    "/gaming/distribution.md",
                    "/gaming/game-examples.md",
                  ],                  
                },
              ],
            },
                        
          ],
        },
      },
      "/zh/": {
        selectLanguageName: "中文（简体）",
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
              "/zh/guides/get-program-accounts.md",
              "/zh/guides/serialization.md",
              "/zh/guides/data-migration.md",
              "/zh/guides/account-maps.md",
              "/zh/guides/debugging-solana-programs.md",
              "/zh/guides/feature-parity-testing.md",
            ],
          },
          {
            text: "参考",
            children: [
              "/zh/references/local-development.md",
              "/zh/references/keypairs-and-wallets.md",
              "/zh/references/basic-transactions.md",
              "/zh/references/accounts.md",
              "/zh/references/programs.md",
              "/zh/references/token.md",
              "/zh/references/anchor.md",
              "/zh/references/staking.md",
              "/zh/references/nfts.md",
              "/zh/references/offline-transactions.md",
              "/zh/references/name-service.md",
            ],
          },
        ],
      },
	  "/zh_t/": {
        selectLanguageName: "中文（繁体）",
        navbar: [
          {
            text: "貢獻代碼",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: [
          {
            text: "開始使用",
            children: ["/zh_t/", "/zh_t/getting-started/installation.md"],
          },
          {
            text: "核心概念",
            children: [
              "/zh_t/core-concepts/accounts.md",
              "/zh_t/core-concepts/programs.md",
              "/zh_t/core-concepts/transactions.md",
              "/zh_t/core-concepts/pdas.md",
            ],
          },
          {
            text: "指南",
            children: [
              "/zh_t/guides/get-program-accounts.md",
              "/zh_t/guides/serialization.md",
              "/zh_t/guides/data-migration.md",
              "/zh_t/guides/account-maps.md",
              "/zh_t/guides/debugging-solana-programs.md",
              "/zh_t/guides/feature-parity-testing.md",
            ],
          },
          {
            text: "參考",
            children: [
              "/zh_t/references/local-development.md",
              "/zh_t/references/keypairs-and-wallets.md",
              "/zh_t/references/basic-transactions.md",
              "/zh_t/references/accounts.md",
              "/zh_t/references/programs.md",
              "/zh_t/references/token.md",
              "/zh_t/references/anchor.md",
              "/zh_t/references/staking.md",
              "/zh_t/references/nfts.md",
              "/zh_t/references/offline-transactions.md",
              "/zh_t/references/name-service.md",
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
      "/de/": {
        selectLanguageName: "Deutsch",
        navbar: [
          {
            text: "Kontributor",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Für Beginner",
              children: ["/de/", "/de/getting-started/installation.md"],
            },
            {
              text: "Fundamentale Konzepte",
              children: [
                "/de/core-concepts/accounts.md",
                "/de/core-concepts/programs.md",
                "/de/core-concepts/transactions.md",
                "/de/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/de/guides/get-program-accounts.md",
                "/de/guides/serialization.md",
                "/de/guides/data-migration.md",
                "/de/guides/account-maps.md",
                "/de/guides/debugging-solana-programs.md",
                "/de/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Referenzen",
              children: [
                "/de/references/local-development.md",
                "/de/references/keypairs-and-wallets.md",
                "/de/references/basic-transactions.md",
                "/de/references/accounts.md",
                "/de/references/programs.md",
                "/de/references/token.md",
                "/de/references/staking.md",
                "/de/references/nfts.md",
                "/de/references/offline-transactions.md",
                "/de/references/name-service.md",
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
        },
      },
      "/th/": {
        selectLanguageName: "ไทย",
        navbar: [
          {
            text: "ร่วมกันเขียน",
            link: "https://github.com/solana-developers/solana-cookbook",
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
                "/th/guides/debugging-solana-programs.md",
                "/th/guides/feature-parity-testing.md",
                "/th/guides/versioned-transactions.md",
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
        },
      },
      "/fr/": {
        selectLanguageName: "Français",
        navbar: [
          {
            text: "Contribuer",
            link: "https://github.com/solana-developers/solana-cookbook",
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
                "/fr/core-concepts/cpi.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/fr/guides/get-program-accounts.md",
                "/fr/guides/serialization.md",
                "/fr/guides/data-migration.md",
                "/fr/guides/account-maps.md",
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
                {
                  text: "Gaming",
                  collapsible: true,
                  children: [
                    "/fr/gaming/intro.md",
                    "/fr/gaming/game-sdks.md",
                    "/fr/gaming/nfts-in-games.md",
                    "/fr/gaming/hello-world.md",
                    "/fr/gaming/store-sol-in-pda.md",
                    "/fr/gaming/saving-game-state.md",
                    "/fr/gaming/energy-system.md",
                    "/fr/gaming/interact-with-tokens.md",
                    "/fr/gaming/porting-anchor-to-unity.md",
                    "/fr/gaming/distribution.md",
                    "/fr/gaming/game-examples.md",
                  ],                  
                },
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
        },
      },
      "/pt/": {
        selectLanguageName: "Português",
        navbar: [
          {
            text: "Contribuir",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Primeiros pasos",
              children: ["/pt/", "/pt/getting-started/installation.md"],
            },
            {
              text: "Conceitos chaves",
              children: [
                "/pt/core-concepts/accounts.md",
                "/pt/core-concepts/programs.md",
                "/pt/core-concepts/transactions.md",
                "/pt/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guias",
              children: [
                "/pt/guides/get-program-accounts.md",
                "/pt/guides/serialization.md",
                "/pt/guides/data-migration.md",
                "/pt/guides/account-maps.md",
                "/pt/guides/debugging-solana-programs.md",
                "/pt/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Referências",
              children: [
                '/pt/references/local-development.md',
                '/pt/references/keypairs-and-wallets.md',
                '/pt/references/basic-transactions.md',
                '/pt/references/accounts.md',
                '/pt/references/programs.md',
                '/pt/references/token.md',
                '/pt/references/staking.md',
                '/pt/references/nfts.md',
                '/pt/references/offline-transactions.md',
                '/pt/references/name-service.md',
              ],
            },
          ],
        },
      },
      "/tr/": {
        selectLanguageName: "Türkçe",
        navbar: [
          {
            text: "Katkı yapmak",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/tr/": [
            {
              text: "Başlarken",
              children: ["/tr/", "/tr/getting-started/installation.md"],
            },
            {
              text: "Temel Kavramlar",
              children: [
                "/tr/core-concepts/accounts.md",
                "/tr/core-concepts/programs.md",
                "/tr/core-concepts/transactions.md",
                "/tr/core-concepts/pdas.md",
              ],
            },
            {
              text: "Kılavuzlar",
              children: [
                "/tr/guides/get-program-accounts.md",
                "/tr/guides/serialization.md",
                "/tr/guides/data-migration.md",
                "/tr/guides/account-maps.md",
                "/tr/guides/debugging-solana-programs.md",
                "/tr/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Referanslar",
              children: [
                '/tr/references/local-development.md',
                '/tr/references/keypairs-and-wallets.md',
                '/tr/references/basic-transactions.md',
                '/tr/references/accounts.md',
                '/tr/references/programs.md',
                '/tr/references/token.md',
                '/tr/references/staking.md',
                '/tr/references/nfts.md',
                '/tr/references/offline-transactions.md',
                '/tr/references/name-service.md',
              ],
            },
          ],
        },
      },
      "/kr/": {
        selectLanguageName: "한국어",
        navbar: [
          {
            text: "Contribute",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Getting Started",
              children: ["/kr/", "/kr/getting-started/installation.md"],
            },
            {
              text: "Core Concepts",
              children: [
                "/kr/core-concepts/accounts.md",
                "/kr/core-concepts/programs.md",
                "/kr/core-concepts/transactions.md",
                "/kr/core-concepts/pdas.md",
              ],
            },
            {
              text: "Guides",
              children: [
                "/kr/guides/get-program-accounts.md",
                "/kr/guides/serialization.md",
                "/kr/guides/data-migration.md",
                "/kr/guides/account-maps.md",
                "/kr/guides/debugging-solana-programs.md",
                "/kr/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "References",
              children: [
                "/kr/references/local-development.md",
                "/kr/references/keypairs-and-wallets.md",
                "/kr/references/basic-transactions.md",
                "/kr/references/accounts.md",
                "/kr/references/programs.md",
                "/kr/references/token.md",
                "/kr/references/staking.md",
                "/kr/references/nfts.md",
                "/kr/references/offline-transactions.md",
                "/kr/references/name-service.md",
              ],
            },
          ],
        },
      },
      "/ja/": {
        selectLanguageName: "日本語",
        navbar: [
          {
            text: "コントリビュート",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "はじめに",
              children: ["/ja/", "/ja/getting-started/installation.md"],
            },
            {
              text: "コアコンセプト",
              children: [
                "/ja/core-concepts/accounts.md",
                "/ja/core-concepts/programs.md",
                "/ja/core-concepts/transactions.md",
                "/ja/core-concepts/pdas.md",
                "/ja/core-concepts/cpi.md",
              ],
            },
            {
              text: "ガイド",
              children: [
                "/ja/guides/get-program-accounts.md",
                "/ja/guides/serialization.md",
                "/ja/guides/data-migration.md",
                "/ja/guides/account-maps.md",
                "/ja/guides/debugging-solana-programs.md",
                "/ja/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "リファレンス",
              children: [
                "/ja/references/local-development.md",
                "/ja/references/keypairs-and-wallets.md",
                "/ja/references/basic-transactions.md",
                "/ja/references/accounts.md",
                "/ja/references/programs.md",
                "/ja/references/token.md",
                "/ja/references/staking.md",
                "/ja/references/nfts.md",
                "/ja/references/offline-transactions.md",
                "/ja/references/name-service.md",
              ],
            },
          ],
        },
      },
      "/fil/": {
        selectLanguageName: "Filipino",
        navbar: [
          {
            text: "Pag-ambag",
            link: "https://github.com/solana-developers/solana-cookbook",
          },
        ],
        sidebar: {
          "/": [
            {
              text: "Pagsisimula",
              children: ["/fil/", "/fil/getting-started/installation.md"],
            },
            {
              text: "Mga pangunahing konsepto",
              children: [
                "/fil/core-concepts/accounts.md",
                "/fil/core-concepts/programs.md",
                "/fil/core-concepts/transactions.md",
                "/fil/core-concepts/pdas.md",
              ],
            },
            {
              text: "Mga Gabay",
              children: [
                "/fil/guides/get-program-accounts.md",
                "/fil/guides/serialization.md",
                "/fil/guides/data-migration.md",
                "/fil/guides/account-maps.md",
                "/fil/guides/debugging-solana-programs.md",
                "/fil/guides/feature-parity-testing.md",
              ],
            },
            {
              text: "Mga sanggunian",
              children: [
                "/fil/references/local-development.md",
                "/fil/references/keypairs-and-wallets.md",
                "/fil/references/basic-transactions.md",
                "/fil/references/accounts.md",
                "/fil/references/programs.md",
                "/fil/references/token.md",
                // "/id/references/anchor.md",
                "/fil/references/staking.md",
                "/fil/references/nfts.md",
                "/fil/references/offline-transactions.md",
                "/fil/references/name-service.md",
              ],
            },
          ],
        },
      }
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
    "/pt/": {
      lang: "pt-BR",
      title: "Solana Cookbook",
    },
    "/de/": {
      lang: "de-DE",
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
    "/kr/": {
      lang: "kr-KR",
      title: "Solana Cookbook"
    },
    "/tr/": {
      lang: "tr-TR",
      title: "Solana Cookbook"
    },
    "/ja/": {
      lang: "ja-JP",
      title: "Solana Cookbook"
    },
    "/fil/": {
      lang: "fil-PH",
      title: "Solana Cookbook"
    }
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
          "/pt/": {
            placeholder: "Buscar",
          },
          "/id/": {
            placeholder: "Cari",
          },
          "/kr/": {
            placeholder: "검색",
          },
          "/ja/": {
            placeholder: "検索",
          },
          "/fil/": {
            placeholder: "Maghanap",
          }
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
          "/pt/": {
            placeholder: "Buscar",
            translations: {
              button: {
                buttonText: "Buscar",
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
          "/kr/": {
            placeholder: "검색",
            translations: {
              button: {
                buttonText: "검색",
              },
            },
          },
          "/ja/": {
            placeholder: "検索",
            translations: {
              button: {
                buttonText: "検索",
              },
            },
          },
          "/fil/": {
            placeholder: "Maghanap",
            translations: {
              button: {
                buttonText: "Maghanap",
              }
            }
          }
        },
      },
    ],
  ],
});
