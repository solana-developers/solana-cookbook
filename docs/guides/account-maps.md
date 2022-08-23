---
title: Account Maps
---

# Account Maps

Maps are data structures we frequently use in programming to associate a **key** with a **value** of some kind. The key and value could be any arbitrary type and the key acts as an identifier for a given value that is being saved. It then, given its key, allows us to efficiently insert, retrieve and update these values efficiently.

Solana's Account model, as we know, requires program data and its relevant state data to be stored in different accounts. These accounts have an address associated with them. This, in itself, acts as a map! Learn more about Solana's Account mode [here][AccountCookbook].

So, it would make sense to store your **values** in separate accounts, with its address being the **key** required to retrieve the value. But this brings up a few issues, such as, 

* The addresses mentioned above are most probably not going to be ideal **keys**, which you could remember and retrieve the required value.

* The addresses mentioned above, referred to public keys of different **Keypairs**, where each public key (or *address*) would have a **private key** associated with it as well. This private key would be required to sign different instructions if and when needed, requiring us to store the private key somewhere, which is most definitely **not** recommended!

This presents a problem many Solana developers face, which is implementing a `Map`-like logic into their programs. Let's look at a couple of way how we would go about this problem,

## Deriving PDAs

PDA stands for [Program Derived Address][PDA], and are in short, addresses **derived** from a set of seeds, and a program id (or _address_). 

The unique thing about PDAs is that, these addresses are **not** associated with any private key. This is because these addresses do not lie on the ED25519 curve. Hence, **only** the program, from which this _address_ was derived, can sign an instruction with the key, provided the seeds as well. Learn more about this [here][CPI].

Now that we have an idea about what PDAs are, let's use them to map some accounts! We'll take an example of a **Blog** program to demonstrate how this would be implemented.

In this Blog program, we would like each `User` to have a single `Blog`. This blog could have any number of `Posts`. That would mean that we are **mapping** each user to a blog, and each post is **mapped** to a certain blog.

In short, there is a `1:1` mapping between a user and his/her blog, whereas a `1:N` mapping between a blog and its posts.

For the `1:1` mapping, we would want a blog's address to be derived **only** from its user, which would allow us to retrieve a blog, given its authority (or _user_). Hence, the seeds for a blog would consist of its **authority's key**, and possibly a prefix of **"blog"**, to act as a type identifier.

For the `1:N` mapping, we would want each post's address to be derived **not only** from the blog which it is associated with, but also another **identifier**, allowing us to differentiate between the `N` number of posts in the blog. In the example below, each post's address is derived from the **blog's key**, a **slug** to identify each post, and a prefix of **"post"**, to act as a type identifier. 

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

  <SolanaCodeGroupItem title="Rust" active>

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

## Single Map Account

Another way to implement mapping would be to have a `BTreeMap` data structure explicitly stored in a single account. This account's address itself could be a PDA, or the public key of a generated Keypair.

This method of mapping accounts is not ideal because of the following reasons,

* You will have to first initialize the account storing the `BTreeMap`, before you can insert the necessary key-value pairs to it. Then, you will also have to store the address of this account somewhere, so as to update it every time.

* There are memory limitations to an account, where an account can have a maximum size of **10 megabytes**, which restricts the `BTreeMap` from storing a large number of key-value pairs.

Hence, after considering your use-case, you can implement this method as shown below,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

The client-side code to test the above program would look like something as shown below,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address