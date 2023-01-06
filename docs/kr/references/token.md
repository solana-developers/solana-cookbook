---
title: Interacting with Tokens
head:
  - - meta
    - name: title
      content: Solana Cookbook | Interacting with Tokens
  - - meta
    - name: og:title
      content: Solana Cookbook | Interacting with Tokens
  - - meta
    - name: description
      content: Learn how to use, transfer, and more with tokens on Solana
  - - meta
    - name: og:description
      content: Learn how to use, transfer, and more with tokens on Solana
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

# Token

## What do I need to get started with SPL-Tokens?

Solana에서 당신이 Token들과 통신할 때, 당신은 실제로는 SPL-Token standard 라고도 하는 Solana Program Library Token과 통신하는 것입니다.
SPL-Token standard를 사용하기 위해서는 특정 라이브러리가 필요합니다. 아래에서 언어에 따라 찾을 수 있습니다.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## How to create a new Token

Token을 생성하는 것은 "mint account"라고 불리는 것을 생성하는 것으로 이뤄집니다.
이 mint Account는 나중에 사용자의 token Account에 token들을 mint 할 때 사용됩니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get a token mint

현재 Token이 가진 Token의 양, 권한 또는 decimal들을 알기 위해서는 token mint에 대한 Account 정보를 얻을 필요가 있을 것입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to create a token account

Token Account를 만들기 위해서는 Token들을 가지고 있을 사용자가 필요합니다.

사용자는 그들이 소유한 모든 종류의 Token 마다 최소한 하나의 Token Account를 가질 것입니다.

Associated Token Account는 모든 키쌍마다 생성된 Account들입니다.
ATA들은 Token Account들을 관리하기 위해 추천되는 방법입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get a Token Account

모든 Token Account는 소유자, mint, 양(balance), decimals와 같은 정보를 가집니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get a token account's balance

모든 Token Account는 Token balance를 가지고, 이것은 하나의 호출을 통해 조회할 수 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Token Account는 오직 한 종류의 mint를 쥐고 있을 수 있습니다.
당신이 Token Account를 명세할 때, mint 또한 해야 합니다.
:::

## How to mint tokens

당신이 Token들을 mint 할 때, 당신은 공급을 증가시키고 새로운 Token들을 특정 Token Account에 전송합니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to transfer tokens

당신은 Token들을 하나의 Token Account에서 다른 Token Account로 전송할 수 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to burn tokens

만약 당신이 Token 소유자라면 token을 태울 수 있습니다.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to close token accounts

만약 당신이 Token Account를 더 이상 사용하고 싶지 않다면, 당신은 Token Account를 닫을 수 있습니다.
두 가지 상황이 있습니다.

1. Wrapped SOL - 닫는 것은 Wrapped SOL을 SOL로 전환시킵니다.
2. Other Tokens - Token Account의 balance가 0일 때만 닫을 수 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to set authority on token accounts or mints

당신은 권한을 설정하거나 업데이트할 수 있습니다. 여기엔 4 가지 종류가 있습니다:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to approve a token delegate

당신은 허락된 양에 대해 위임자를 지정할 수 있습니다. 지정하고 나면 위임자는 당신의 Token Account의 또 다른 소유자와 같습니다.
`Token Account는 한 번에 오직 하나의 Account에 위임할 수 있다`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to revoke a token delegate

철회는 위임자에게 null을 설정할 것이고 위임된 양을 0으로 만들 것입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to manage wrapped SOL

Wrapped SOL은 다른 Token mint와 같습니다. 차이는 `syncNative`를 사용하는 것과 `NATIVE_MINT` 주소에 구체적으로 Token Account들을 생성하는 것입니다.

### Create Token Account

[Create Token Account](#create-token-account)와 같지만 `NATIVE_MINT`로 바꿔봅시다.

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Add Balance

Wrapped SOL에 balance를 추가하는 두 가지 방법이 있습니다.

#### 1. By SOL Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. By Token Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get all token accounts by owner

당신은 소유자 값으로 모든 Token Account들을 조회할 수 있습니다. 여기엔 두 가지 방법이 있습니다.

1. Get All Token Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Filter By Mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
