---
title: 程序
head:
  - - meta
    - name: title
      content: Solana祕籍 | 程序
  - - meta
    - name: og:title
      content: Solana祕籍 | 程序
  - - meta
    - name: description
      content: 程序，也稱爲智能合約，是所有鏈上活動的基礎。在Solana祕籍可以學習程序以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 程序，也稱爲智能合約，是所有鏈上活動的基礎。在Solana祕籍可以學習程序以及其他一些核心概念。
  - - meta
    - name: og:image
      content: https://solanacookbook.com/cookbook-sharing-card.png
  - - meta
    - name: og:image:alt
      content: Solana splash card
  - - meta
    - name: twitter:card
      content: summary
  - - meta
    - name: twitter:site
      content: "@solanacookbook"
  - - meta
    - name: twitter:image
      content: "https://solanacookbook.com/cookbook-sharing-card.png"
  - - meta
    - name: robots
      content: index,follow,noodp
  - - meta
    - name: googlebot
      content: index,follow
footer: MIT Licensed
---

# 程序

任何開發者都可以在Solana鏈上編寫以及部署程序。Solana程序（在其他鏈上叫做智能合約），是所有鏈上活動的基礎。
鏈上的一切活動，從去中心化金融（DeFi），到非同質化代幣（NFT），再到社交媒體，鏈上游戲，都由Solana程序所驅動。

## 綜述

::: tip 要點
- 程序可以處理來自用戶和其他程序的[指令](./transactions)
- 所有的程序都是**無狀態**的：所有的和程序交互的數據都是存儲在獨立的[賬戶](./accounts.md)中。執行時，這些賬戶藉由指令傳入程序
- 程序本身存儲在標記爲`executable`（可執行）的賬戶中。
- 任何程序的所有者都是[BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) and executed by the [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- 開發者通常使用Rust或C++來編寫程序，也可以採用任何其他可以編譯爲[LLVM](https://llvm.org/)的[BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)後端的語言
- 所有的程序都有一個單獨的入口點，指令的執行就是從這裏開始的（亦即`process_instruction`）。參數須包括：
    - `program_id`: `pubkey` （公鑰）
    - `accounts`: `array` （數組）
    - `instruction_data`: `byte array` （字節數組）
:::

## 深入

與其他鏈不同，Solana將代碼與數據完全分開。
程序需要訪問的全部數據都存儲在獨立的賬戶中，在指令中這些賬戶需要以引用的方式傳入。
這種模式使得一個通用的程序可以在不同的賬戶上運行，而不用爲此額外部署程序。
這種模式的例子很常見，包括了"原生程序"以及"SPL程序"等。

### 原生程序和Solana程序庫（SPL）

Solana自帶一系列程序，這些程序是鏈上交互的核心構成要素。
這些程序分爲[原生程序](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)
和[Solana程序庫（SPL程序）](https://spl.solana.com/)

原生程序提供了運行驗證節點（validator）所需的功能。原生程序中最廣爲人知的是[System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program)。
這個程序負責管理建立新賬戶以及在兩個賬戶之間轉賬SOL。

SPL程序定義了一系列的鏈上活動，其中包括針對代幣的創建，交換，借貸，以及創建質押池，維護鏈上域名解析服務等。
[SPL Token Program（SPL代幣程序）](https://spl.solana.com/token)可以直接在命令行調用，其他的一些，如
[Associated Token Account Program（關聯代幣賬戶程序）](https://spl.solana.com/associated-token-account)，
則常被用於編寫其他定製程序。

### 編寫程序

編寫Solana程序常用的是Rust和C++，但是也可以使用其他可以編譯爲LLVM的BPF後端的語言。
最近[Neon Labs](https://neon-labs.org/)和[Solang](https://solang.readthedocs.io/en/latest/)發起了一個項目，
旨在建立Solana的[EVM](https://ethereum.org/en/developers/docs/evm/)兼容性，進而讓開發者可以使用Solidity編寫程序。

大部分Rust編寫的程序遵循以下架構：

| 文件           | 描述                                   |
|----------------|-----------------------------------------------|
| lib.rs         | 註冊模塊                           |
| entrypoint.rs  | 程序的入口點                     |
| instruction.rs | 程序的API, 對指令的數據進行序列化與反序列化 |
| processor.rs   | 程序的業務邏輯                                 |
| state.rs       | 程序對象，對狀態進行反序列化        |
| error.rs       | 程序中制定的錯誤                    |

最近，[Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)逐漸成爲了一個廣受歡迎的Solana程序開發框架。
Anchor是一個有態度的框架，與Ruby on Rails相似，這個框架旨在減少模式化的代碼，將Rust開發流程中的序列化與反序列化過程流水線化。

在部署到Testnet（測試網）和Mainnet（主網）之前，程序在開發和測試階段經常使用Localhost和Devnet（開發網）環境。
Solana支持以下的幾個環境：

| 集羣環境              | RPC連接URL                                                                 |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | 默認端口：8899（例如，http://localhost:8899，http://192.168.1.88:8899）      |

部署到一個環境之後，客戶端就可以通過對應集羣的[RPC連接](https://docs.solana.com/developing/clients/jsonrpc-api)與鏈上程序進行交互。

### 部署程序

開發者可以使用[命令行](https://docs.solana.com/cli/deploy-a-program)部署程序：

```bash
solana program deploy <PROGRAM_FILEPATH>
```

部署程序的時候，程序會被編譯爲包含BPF字節碼的[ELF共享對象](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)，並上傳到Solana集羣上。
和Solana上其他的任何東西一樣，程序儲存在賬戶當中。唯一的特殊之處是，這些賬戶標記爲`executable`（可執行），並且其所有者是"BPF Loader（BPF加載器）"。
這個賬戶的地址被稱爲`program_id`，在後面的一切交易當中，用於指代這個程序。

Solana支持多種BPF加載器，最新的是[Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111)。
BPF加載器負責管理程序賬戶，讓客戶端可以通過其`program_id`對程序進行訪問。每個程序都只有一個入口點，這裏對指令進行處理。這裏的參數須包括：
- `program_id`: `pubkey`（公鑰）
- `accounts`: `array`（數組）
- `instruction_data`: `byte array`（字節數組）

當程序被調用時，會在Solana運行庫中被執行。

## 其他資料

- [官方文檔](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL文檔](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://hackmd.io/@ironaddicteddog/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)
