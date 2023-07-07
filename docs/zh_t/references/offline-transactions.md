---
title: 發送離線交易
head:
  - - meta
    - name: title
      content: Solana祕籍 | 發送離線交易
  - - meta
    - name: og:title
      content: Solana祕籍 | 發送離線交易
  - - meta
    - name: description
      content: After signing the Offline Transaction, anyone can broadcast it on the network. Learn more about Sending Offline Transactions and references at The Solana cookbook.
  - - meta
    - name: og:description
      content: After signing the Offline Transaction, anyone can broadcast it on the network. Learn more about Sending Offline Transactions and references at The Solana cookbook.
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

# 發送離線交易

## 簽署交易

要創建離線交易，你需要簽署交易，然後任何人都可以在網絡上廣播它。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 部分簽署交易

當一個交易需要多個簽名時，你可以部分簽署它。其他簽署者隨後可以簽署並在網絡上廣播該交易。

以下是一些有用的情況示例：

- 用支付作爲交換髮送 SPL 代幣
- 簽署交易以便以後驗證其真實性
- 在需要你簽名的自定義程序中調用交易

在這個例子中，Bob給Alice發送了一個 SPL 代幣，回報Alice的付款：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 耐久性的 Nonce

`RecentBlockhash`對於交易非常重要。如果你使用一個過期的最近區塊哈希（在150個區塊後），你的交易將被拒絕。你可以使用耐久性Nonce來獲取一個永不過期的最近區塊哈希。要觸發這種機制，你的交易必須：

1. 使用存儲在`nonce`賬戶中的`nonce`作爲最近的區塊哈希。
2. 將`nonce advance`操作放在第一個指令中。

### 創建Nonce賬戶

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 獲取Nonce賬戶

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 使用Nonce賬戶

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
