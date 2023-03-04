---
title: オフライントランザクションの送信
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sending Offline Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Sending Offline Transactions
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

# オフライントランザクション

## トランザクションの署名

オフライントランザクションを作成するには、トランザクションに署名する必要があります。その後、誰でもネットワーク上でブロードキャストできます。

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

## 部分署名トランザクション

トランザクションに複数の署名が必要な場合は、部分的に署名できます。その後、他の署名者が署名し、ネットワーク上でブロードキャストできます。

これが役立つ場合のいくつかの例:

- 支払いと引き換えにSPLトークンを送信する
- ランザクションに署名して、後でその信頼性を確認できるようにする
- 署名が必要なトランザクションでカスタム プログラムを呼び出す

この例では、BobはAliceに支払いの見返りにSPLトークンを送信します:

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

## 耐久性のあるナンス

`RecentBlockhash`はトランザクションにとって重要な値です。期限切れの最近のブロックハッシュ(150 ブロック後)を使用すると、トランザクションは拒否されます`耐久性のあるナンス`を使用して、期限切れのない最近のブロックハッシュを取得できます。この仕組みを鳥がするには、トランザクションは下記を満たす必要があります。

1. 最近のブロックハッシュとして`nonce account`に保存されている`nonce`を使用する
2. 最初の命令に`nonce advance`操作を入れる

### ナンスアカウントを取得

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

### ナンスアカウントを取得

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

### ナンスアカウントを使用

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
