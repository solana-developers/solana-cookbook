---
title: トークンアカウントとの対話
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

## SPL-Tokens を始めるには何が必要ですか？

毎回Solanaでトークンを操作するたびに、実際にSolana Program Library Token、または SPL-Token標準と対話しています。SPL-Token 標準では、特定のライブラリを使用する必要があり、言語に基づいて以下で見つけることができます。
<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## 新しいトークンを作成する方法

トークンの作成は、いわゆる「mintアカウント」を作成することによって行われます。このmintアカウントは、後でユーザーのトークンアカウントにトークンを作成するために使用されます。

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

## トークンミントの入手方法

トークンがもつ現在の流通数、権限、または桁数を取得するには、トークンミントのアカウント情報を取得する必要があります。

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

## トークンアカウントの作成方法

ユーザーがトークンを保持するには、トークン アカウントが必要で、所有するトークンの種類ごとに少なくとも 1 つのトークンアカウントを持ちます。

関連付けられたトークン アカウントは、キーペアごとに 決定論的に作成されるアカウントです。 ATAは、トークンアカウントを管理するための推奨される方法です。

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

## トークンアカウントの取得方法

すべてのトークンアカウントには、所有者、mint、金額(残高)、桁数などのトークンに関する情報があります。

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

## トークンアカウントの残高を取得する方法

トークン アカウントには、1回の呼び出しで取得できるトークン残高があります。

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
トークン アカウントは 1種類のmintのみを保持できます。トークンアカウントを指定すると、mintも指定されます。
:::

## トークンの発行方法
トークンを作成すると、流通数が増え、新しいトークンが特定のトークンアカウントに転送されます。

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

## トークンの転送方法

あるトークンアカウントから別のトークンアカウントにトークンを転送できます。

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

## トークンのバーン方法

トークンの所有者であれば、トークンをバーンできます。


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

## トークンアカウントを閉じる方法

もう使用したくない場合は、トークンアカウントを閉じることができます。 2つの状況があります:

1. Wrapped SOL - 閉じると、Wrapped SOLがSOLに変換されます
2. その他のトークン - トークン アカウントの残高が0の場合にのみ閉鎖できます

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

## トークンアカウントまたはmintに権限を設定する方法

権限の設定・更新ができます。次の 4 種類があります:

1. MintTokens (mintアカウント)
2. FreezeAccount (mintアカウント)
3. AccountOwner (tokenアカウント)
4. CloseAccount (tokenアカウント)

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

## トークンデリゲートを承認する方法

許可された金額でデリゲートを設定できます。設定後、デリゲートはトークン アカウントの別の所有者のようになります。`トークン アカウントは、同時に 1 つのアカウントにしか委任できません`

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

## トークンデリゲートを取り消す方法

取り消しは、デリゲートをnullに設定し、デリゲート量を0に設定します。

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

## wrapped SOLの管理方法

Wrapped SOLは他のトークンミントと同じです。違いは、`syncNative`を使用していることと、特に`NATIVE_MINT`アドレスでトークンアカウントを作成することです。

### トークンアカウントを取得する

[Create Token Account](#create-token-account)と同様ですが、mintを `NATIVE_MINT`に置き換えます。

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### 残高の追加

Wrapped SOLの残高を追加する方法は2つあります。

#### 1. SOL移行

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

#### 2. トークンの移行

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

## 所有者ごとのすべてのトークンアカウントを取得する方法

所有者ごとにトークン アカウントを取得できます。それには2つの方法があります。

1. すべてのトークン アカウントを取得

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

2. Mintでフィルター

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
