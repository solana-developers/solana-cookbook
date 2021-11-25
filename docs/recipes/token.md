---
title: Interacting with Tokens
---

# Token

## Create Mint Account

You can treat a mint as a ERC-20 token. Like SRM, RAY, USDC ... all of them are mints

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/token/create-mint-account/create-mint-account.sh)

  </CodeGroupItem>
</CodeGroup>

## Get Mint Account

You can get mint account info.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Create Token Account

You need a token account to hold token(mint). Different token need different token account to hold it.
In the other words, `your USDC token account and SRM token account have different address`.

There are two ways you can create token account.

### Random

Old school. Make addresses manaing more difficult.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-token-account/random.en.ts)

  </CodeGroupItem>
</CodeGroup>

### Associated Token Account (ATA)

Strongly Recommend. You can know all token address by SOL address.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/create-token-account/ata.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Get Token Account

You can fetch token account's detail.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Get Token Balance

If you only care about balance, you can just get its balance.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </CodeGroupItem>
</CodeGroup>

::: tip
Token account can only hold one kind of mint. When you sprcific a token account, you also specific a mint too.
:::

## Mint Token

Mint token to your token account. After you finishing, you can get mint account info and token account info again to watch the changes.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Transfer Token

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

You can close a token account if you don't want to use it anymore. There are two situations:

1. Wrapped SOL

you can close it directly.

2. Other Tokens

you can close it only if token account's balance is 0.

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

## Wrapped SOL

Wrapped SOL is a kind of mint.

### Create Account

Like [Create Token Account](#create-token-account) but replace mint with `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Add Balance

There are two ways to add balance for Wrapped SOL

#### 1.By SOL Transfer

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </CodeGroupItem>
</CodeGroup>


#### 2.By Token Transfer

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

### Transfer

Like [Token Transfer](#transfer-token)
