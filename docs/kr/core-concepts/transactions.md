---
title: Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transaction are bundles of Multiple operational units on Solana. Learn more about Transaction and Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Multiple operational units on Solana can be bundled into a single unit called Transaction. Learn more about Core Concepts at The Solana cookbook.
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

# Transactions

Clients can invoke [programs](./programs.md) by submitting a transaction to a cluster. A single transaction can include multiple instructions, each targeting its own program. When a transaction is submitted, the Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) will process its instructions in order and atomically. If any part of an instruction fails, the entire transaction will fail.

## Facts

::: tip Fact Sheet
- Instructions are the most basic operational unit on Solana
- Each instruction contains:
    - The `program_id` of the intended program
    - An array of all `accounts` it intends to read from or write to
    - An `instruction_data` byte array that is specific to the intended program
- Multiple instructions can be bundled into a single transaction
- Each transaction contains:
    - An array of all `accounts` it intends to read from or write to
    - One or more `instructions`
    - A recent `blockhash`
    - One or more `signatures`
- Instructions are processed in order and atomically
- If any part of an instruction fails, the entire transaction fails.
- Transactions are limited to 1232 bytes
:::

## Deep Dive

The Solana Runtime requires both instructions and transactions to specify a list of all accounts they intended to read from or write to. By requiring these accounts in advance, the runtime is able to parallelize execution across all transactions.

When a transaction is submitted to a cluster, the runtime will process its instructions in order and atomically. For each instruction, the receiving program will interpret its data array and operate on its specified accounts. The program will either return successfully or with an error code. If an error is returned, the entire transaction will fail immediately.

Any transaction that aims to debit an account or modify its data requires the signature of its account holder. Any account that will be modified is marked as `writable`. An account can be credited without the holder’s permission so long as the transaction fee payer covers the necessary rent and transaction fees.

Before submission, all transactions must reference a [recent blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). The blockhash is used to prevent duplications and eliminate stale transactions. The max age of a transaction's blockhash is 150 blocks, or about ~1 minute 19 seconds as of the time of this writing.

### Fees

The Solana network collects two types of fees:
- [Transaction fees](https://docs.solana.com/transaction_fees) for propagating transactions (aka “gas fees”)
- [Rent fees](https://docs.solana.com/developing/programming-model/accounts#rent) for storing data on-chain 

In Solana, transaction fees are deterministic: there is no concept of a fee market in which users can pay higher fees to increase their chances of being included in the next block. At the time of this writing, transaction fees are determined only by the number of signatures required (i.e. `lamports_per_signature`), not by the amount of resources used. This is because there is currently a hard cap of 1232 bytes on all transactions.

All transactions require at least one `writable` account to sign the transaction. Once submitted, the writable signer account that is serialized first will be the fee payer. This account will pay for the cost of the transaction regardless of whether the transaction succeeds or fails. If the fee payer does not have a sufficient balance to pay the transaction fee, the transaction will be dropped.

At the time of this writing, 50% of all transaction fees are collected by the validator that produces the block, while the remaining 50% are burned. This structure works to incentivize validators to process as many transactions as possible during their slots in the leader schedule.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
