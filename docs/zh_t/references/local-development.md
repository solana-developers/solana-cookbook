---
title: 本地開發
head:
  - - meta
    - name: title
      content: Solana祕籍 | 本地開發
  - - meta
    - name: og:title
      content: Solana祕籍 | 本地開發
  - - meta
    - name: description
      content: Setup Local Validator for local developer environment and Airdrop SOL. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Setup Local Validator and Airdrop SOL for building on Solana Locally. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
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

# 本地開發

## 開啓本地驗證器

在本地測試驗證器比在開發網絡(devnet)上進行測試更可靠，並且可以幫助你在開發網絡上運行之前進行測試。

你可以通過安裝 [solana工具套件](/getting-started/installation.md#install-cli)
並運行以下命令來設置本地測試驗證器：

```console
solana-test-validator
```

使用本地測試驗證器的好處包括：

- 無RPC速率限制
- 無空投限制
- 直接在鏈上部署程序（`--bpf-program ...`）
- 從公共集羣克隆賬戶，包括程序（`--clone ...`）
- 可配置的事務歷史保留（`--limit-ledger-size ...`）
- 可配置的紀元長度（`--slots-per-epoch ...`）
- 跳轉到任意槽位（`--warp-slot ...`）

## 連接到不同環境 

當你進行Solana開發時，你需要連接到特定的RPC API端點。Solana有三個公共的開發環境：
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

最後，你還可以連接到私有集羣，無論是本地的還是遠程運行的，使用以下方式：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 訂閱事件

Websockets提供了一種發佈/訂閱接口，你可以在其中監聽特定的事件。與在固定時間間隔內對典型的HTTP端點進行輪詢以獲取頻繁的更新不同，你可以僅在事件發生時才接收這些更新。

Solana的web3[`連接`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) 在底層生成一個websocket端點，並在創建新的`Connection`實例時註冊一個websocket客戶端（請參閱 [此處](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)) 的源代碼）。

`Connection`類提供了發佈/訂閱方法，它們都以`on`開頭，類似於事件發射器。當您調用這些監聽器方法時，它會在該`Connection`實例的websocket客戶端中註冊一個新的訂閱。下面我們使用的示例發佈/訂閱方法是[`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange)。 回調函數將通過參數提供更新的狀態數據（例如，查看A[`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) 作爲示例）。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 獲取測試用的SOL

你在本地工作時，爲了發送交易，你需要一些 SOL。在非主網環境中，你可以向你的地址空投 SOL，獲取SOL。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 使用主網 （Mainnet) 賬戶和程序

本地測試通常依賴於僅在主網上可用的程序和賬戶。Solana CLI 提供了以下兩個功能：

*下載程序和賬戶
*將程序和賬戶加載到本地驗證器中


### 如何從主網加載賬戶

可以將SRM代幣的鑄造(mint)賬戶下載到文件中：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

然後，通過在啓動驗證器時傳遞該賬戶文件和目標地址（在本地集羣上）你可以將其加載到本地網絡：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何從主網加載程序

同樣地，我們可以下載Serum Dex v3程序：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

然後，在啓動驗證器時，通過傳遞程序的文件和目標地址（在本地集羣上）來將其加載到本地網絡：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
