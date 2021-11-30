---
title: Interacting with Tokens
---

# Token

## Create Token

Creating tokens is done by creating what is called a "mint account".
This mint account is later used to mint tokens to a token account and
create the initial supply.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/token/create-mint-account/create-mint-account.sh)

  </CodeGroupItem>
</CodeGroup>

## Get Token Mint

In order to get the current supply, authority, or decimals a token has,
you will need to get the account info for the token mint.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Create Token Account

A token account is required in order to hold tokens. Every token mint
has a different token account associated with it.

There are two ways you can create token account.

### Ancillary Token Accounts

Ancillary Token Accounts are accounts that you manage by creating the
specific keypair for them. Using a keypair on creation allows you to
pick the specific public key you want for your token account.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-token-account/random.en.ts)

  </CodeGroupItem>
</CodeGroup>

### Associated Token Account (ATA)

Associated Token Accounts are deterministicly created
accounts for every keypair. ATAs are the recommended method
of managing token accounts.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-token-account/ata.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Get Token Account

Every token account has information on the token such as the owner,
mint, amount, and decimals.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Get Token Balance

The token account has the token balance, which can be retrieved with a
single call.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </CodeGroupItem>
</CodeGroup>

::: tip
A token account can only hold one kind of mint. When you specify a token
account, you also specific a mint too.
:::

## Mint Token

When you mint tokens, you increase the supply and transfer the new tokens
to a specific token account.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Transfer Token

You can transfer tokens from one token account to another token account.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Burn Token

You can burn token if you are the token owner.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Close Token Account

You can close a token account if you don't want to use it anymore.
There are two situations:

1. Wrapped SOL - Closing converts Wrapped SOL to SOL
2. Other Tokens - You can close it only if token account's balance is 0.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Set Authority

You can set/update authority. There are 4 types:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/set-authority/main.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Approve (Delegate)

You can set a delegate with an allowed amount. After you setting, the delegate is like an another owner of your token account. `A token account can only delegate to one account at the same time`

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/approve/main.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Revoke (Delegate)

Revoke will set delegate to null and set delegated amount to 0.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/revoke/main.en.ts)

  </CodeGroupItem>
</CodeGroup>


## Wrapped SOL

Wrapped SOL just like any other token mint. The difference is using `syncNative`
and creating token accounts specifically on the `NATIVE_MINT` address.

### Create Token Account

Like [Create Token Account](#create-token-account) but replace mint with `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Add Balance

There are two ways to add balance for Wrapped SOL

#### 1. By SOL Transfer

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </CodeGroupItem>
</CodeGroup>


#### 2. By Token Transfer

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Get Token Account By Owner

You can fetch token accounts by owner. There are two ways to do it.

1. Get All Token Account

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </CodeGroupItem>
</CodeGroup>


2. Filter By Mint

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </CodeGroupItem>
</CodeGroup>
