---
title: Sending Offline Transactions
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Sending Offline Transactions
  - - meta
    - name: og:title
      content: คู่มือ Solana | Sending Offline Transactions
  - - meta
    - name: description
      content: After signing the Offline Transaction, anyone สามารถ broadcast it on the network. เรียนรู้เกี่ยวกับ Sending Offline Transactions และ references ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: After signing the Offline Transaction, anyone สามารถ broadcast it on the network. เรียนรู้เกี่ยวกับ Sending Offline Transactions และ references ได้ที่คู่มือ Solana.
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

# Offline Transaction

## Sign Transaction

To create an offline transaction, you have to sign the transaction และ then
anyone สามารถ broadcast it on the network.

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

## Partial Sign Transaction

When a transaction requires multiple signatures, you สามารถ partially sign it.
The other signers สามารถ then sign และ broadcast it on the network.

Some examples of when this is useful:

- Send an SPL token in return for payment
- Sign a transaction so that you สามารถ later verify its authenticity
- Call custom programs in a transaction that require your signature

In this example Bob sends Alice an SPL token in return for her payment:

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

## Durable Nonce

`RecentBlockhash` is an important value for a transaction. Your transaction will be rejected if you use an expired recent blockhash (after 150 blocks). You สามารถ use `durable nonce` to get a never expired recent blockhash. To trigger this mechanism, your transaction must

1. use a `nonce` stored in `nonce account` as a recent blockhash
2. put `nonce advance` operation in the first instruciton

### Create Nonce Account

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

### Get Nonce Account

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

### Use Nonce Account

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
