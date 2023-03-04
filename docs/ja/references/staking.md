---
title: ステーキング
head:
  - - meta
    - name: title
      content: Solana Cookbook | Staking
  - - meta
    - name: og:title
      content: Solana Cookbook | Staking
  - - meta
    - name: description
      content: stake SOL and earn rewards for helping secure the network.
  - - meta
    - name: og:description
      content: Stake SOL and earn rewards for helping secure the network. Learn more about Creating Stake Accounts, Delegate Stake, Withdraw Stake and more references for Building on Solana at The Solana cookbook.
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

# ステーキング
## 現在のバリデータを取得

SOLをステークして、ネットワークの安全を確保するための報酬を得ることができます。ステークするには、トランザクションを処理するバリデーターにSOLを委任します。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## ステークアカウントの作成

ステーキングに関するすべてのインストラクションは[Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program)によって処理されます。まず、標準の[system account](accounts.md#create-a-system-account)とは異なる方法で作成、管理される[Stake Account](https://docs.solana.com/staking/stake-accounts)を作成します。特に、アカウントの`Stake Authority`と`Withdrawal Authority`を設定する必要があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ステークの委任

ステークアカウントに資金が提供されると、`Stake Authority`はそれをバリデーターに委任できます。各ステークアカウントは、一度に 1 つのバリデーターにのみ委任できます。さらに、アカウント内のすべてのトークンは、委任されているか、委任されていない必要があります。委任されると、ステークアカウントがアクティブになるまでに数エポックがかかります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## バリデーターによるデリゲーターの取得

複数のアカウントが特定のバリデータ アカウントにステークしている可能性があります。すべてのステーカーを取得するには、`getProgramAccounts`または `getParsedProgramAccounts` API を使用します。詳細については、[ガイド](/guides/get-program-accounts.html)を参照してください。ステーク アカウントの長さは 200 バイトで、投票者の公開鍵は 124 バイトから始まります。 [参照](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ステークを無効にする

ステークアカウントが委任された後はいつでも、`Stake Authority`はアカウントを非アクティブ化することを選択できます。非アクティブ化は、SOLが引き出される前に必要で、完了するまでに数エポックかかる場合があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ステークを引き出す
非アクティブ化されると、`Withdrawal Authority`はSOLをシステムアカウントに戻すことができます。ステークアカウントが委任されなくなり、残高が 0 SOL になると、実質的に破棄されます。

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
