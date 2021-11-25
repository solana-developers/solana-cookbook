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


## Mint Token

## Transfer Token

## Burn Token

## Wrapped SOL

### Create Wrapped SOL Token Account

### Add Balance
