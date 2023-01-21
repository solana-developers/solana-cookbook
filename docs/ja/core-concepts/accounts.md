---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Accounts
  - - meta
    - name: description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
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

# Accounts

Accounts within Solana are used to store state. They are an essential
building block for developing on Solana.

## Facts

::: tip Fact Sheet

- Accounts are used to store data
- Each account has a unique address
- Accounts have a max size of 10MB (10 Mega Bytes)
- PDA accounts have a max size of 10KB (10 Kilo Bytes)
- PDA accounts can be used to sign on behalf of a program
- Accounts size are fixed at creation time, but can be adjusted using [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Account data storage is paid with rent
- Default account owner is the System Program
  :::

## Deep Dive

### Account Model

There are 3 kinds of accounts on Solana:

- Data accounts store data
- Program accounts store executable programs
- Native accounts that indicate native programs on Solana such as System, Stake, and Vote

Within data accounts, there are 2 types:

- System owned accounts
- PDA (Program Derived Address) accounts

Each account has an address (usually a public key) and an owner
(address of a program account). The full field list an account stores
is found below.

| Field      | Description                                    |
| ---------- | ---------------------------------------------- |
| lamports   | The number of lamports owned by this account   |
| owner      | The program owner of this account              |
| executable | Whether this account can process instructions  |
| data       | The raw data byte array stored by this account |
| rent_epoch | The next epoch that this account will owe rent |

There are a few important ownership rules:

- Only a data account's owner can modify its data and debit lamports
- Anyone is allowed to credit lamports to a data account
- The owner of an account may assign a new owner if the account's data is zeroed out

Program accounts do not store state.

For example, if you have a counter program that lets you increment a counter, you
must create two accounts, one account to store the program's code, and one to store
the counter.

![](./account_example.jpeg)

To prevent an account from being deleted, you must pay rent.

### Rent

Storing data on accounts costs SOL to maintain, and it is funded by what is called
rent. If you maintain a minimum balance equivalent to 2 years of rent payments in an
account, your account will be exempt from paying rent. You can retrieve rent by closing
the account and sending the lamports back to your wallet.

Rent is paid during two different timings:

1. When referenced by a transaction
2. Once an epoch

A percentage of rent collected by accounts is destroyed, while the rest is distributed
to vote accounts at the end of every slot.

If the account does not have enough to pay rent, the account will be deallocated and the data
removed.

It is also important to note that new accounts must be rent exempt.

## Other Resources

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

This core concept is credited to Pencilflip. [Follow him on Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
