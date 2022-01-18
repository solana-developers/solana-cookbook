---
title: Account Maps
---

# Account Maps

If you're coming from Ethereum, you must be familiar with Solidity's `mapping` data structure which allows you to map key-value pairs of different types. This mapping is stored in the smart contract's data, and is very similar to other `Map`-like data structures.

Solana's Account model, as we know, unlike Ethereum, separates program data and its state into different accounts. Learn more about Solana's Account model [here][AccountCookbook].

This presents us with a problem many Solana developers face, which is implementing a `Map`-like logic into their programs. One way to do this is using [PDAs][CreatePDA], or Program Derived Addresses.

## Deriving Accounts using PDAs

In this method, we can use an account's public key as a seed to derive the account it is mapped to. 

We'll take an example of a **Blog** program to demonstrate how this would be implemented.

In this example, we're going to assume that a `User` can have one `Blog`, and each Blog can have **n** `Posts`. This would mean that each `Blog` account's key is a **PDA** derived from the `User`'s public key, giving us the following seeds, `[b"blog".as_ref(), authority.key().as_ref()]`.

In the case of a `1:n` mapping between `Blog` and `Post`, we would require some sort of identifier for every `Post`. Hence, we could use a `slug` to identify each post. Now, each `Post`'s key would be a **PDA** derived from the seeds, `[b"post".as_ref(), blog.key().as_ref(), b"slug".as_ref()]`.

The code is as shown below, 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Vanilla Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

On the client-side, you can use `PublicKey.findProgramAddress()` to obtain the required `Blog` and `Post` account address, which you can pass into `connection.getAccountInfo()` to fetch the account data. An example is shown below, 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[CreatePDA]: http://localhost:8080/references/programs.html#create-a-program-derived-address