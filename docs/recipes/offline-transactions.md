---
title: Sending Offline Transactions
---

# Offline Transaction

## Sign Transaction

To create an offline transaction, you have to sign the transaction and then
anyone can broadcast it on the network.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Durable Nonce

`RecentBlockhash` is an important value for a transaction. Your transaction will be rejected if you use an expired recent blockhash (after 150 blocks). You can use `durable nonce` to get a never expired recent blockhash. To trigger this mechanism, your transaction must

1. use a `nonce` stored in `nonce account` as a recent blockhash
2. put `nonce advance` operation in the first instruciton

### Create Nonce Account

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </CodeGroupItem>
</CodeGroup>

### Get Nonce Account

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </CodeGroupItem>
</CodeGroup>

### Use Nonce Account

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </CodeGroupItem>
</CodeGroup>