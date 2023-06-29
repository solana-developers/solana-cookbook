---
title: Migrating Program Data Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: og:title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
  - - meta
    - name: og:description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
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

# Migrating a Programs Data Accounts

## How can you migrate a program's data accounts?

When you create a program, each data account associated with that
program will have a specific data structure. If you ever need
to upgrade a program derived account, you end up having a bunch
of leftover program derived accounts with the old structure.

With account versioning, you can upgrade your old accounts to
the new structure.

:::tip Note
This is only one of many ways to migrate data in Program Owned Accounts (POA).
:::

## Scenario

To version and migrate our account data, we will be providing an **id** for each
account. This id will allow us to identify the account version when
we pass it to the program, and thus handle the account correctly.

Take the following account state and program:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

In our first version of an account, we are doing the following:

| ID | Action |
| - | - |
|1| Include a 'data version' field in your data. It can be a simple incrementing ordinal (e.g. u8) or something more sophisticated
|2| Allocating enough space for data growth
|3| Initializing a number of constants to be used across program versions
|4| Add an update account function under `fn conversion_logic` for future upgrades

Let's say we want to upgrade our program's accounts now to include
a new required field, the `somestring` field.

If we didn't allocate extra space on the previous account, we could
not upgrade the account and be stuck.

## Upgrading the Account

In our new program we want to add a new property for the content state.
The changes that follow are how we leveraged the initial program
constructs as they come into use now.

### 1. Add account conversion logic

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Line(s) | Note |
| ------- | - |
| 6 | We've added Solana's `solana_program::borsh::try_from_slice_unchecked` to simplify reading subsets of data from the larger data block
| 13-26| Here we've preserved the old content structure, `AccountContentOld` line 24, before extending the `AccountContentCurrent` starting in line 17.
| 60 | We bump the `DATA_VERSION` constant
| 71 | We now have a 'previous' version and we want to know it's size
| 86 | The Coup de grâce is adding the plumbing to upgrade the previous content state to the new (current) content state

We then update our instructions, to add a new one for updating `somestring`, and processor for handling the new instruction. Note that the 'upgrading' the data structure is encapsulated behind `pack/unpack`

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

After building and submitting an instruction: `VersionProgramInstruction::SetString(String)` we now have the following 'upgraded' account data layout

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)