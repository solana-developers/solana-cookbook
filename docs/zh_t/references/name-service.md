---
title: 命名服務
head:
  - - meta
    - name: title
      content: Solana祕籍 | 命名服務
  - - meta
    - name: og:title
      content: Solana祕籍 | 命名服務
  - - meta
    - name: description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse/Subdomain look up, more about Name Service and references at The Solana cookbook.
  - - meta
    - name: og:description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse, Subdomain look up, more about Name Service and references at The Solana cookbook.
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

# 命名服務

## 名稱註冊表

名稱註冊表存儲與域名有關的信息。它由兩部分組成：

- 頭部 (Header)
- 數據 (Data)

域名的數據始終以頭部爲前綴。以下是頭部在 JavaScript 中的結構：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 解析SOL域名

.SOL 域名是獨特的、易於理解的域名，可以轉換爲公鑰。許多錢包使用它們作爲發送代幣或 SOL 的另一種選項。你可以使用以下方法將 .SOL 域名轉換爲對應的公鑰：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 反向查找 

這可以用於從公鑰解析域名。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 子域名查找

爲了解析一個子域名，你需要：

1. 域名的密鑰
2. 域名的密鑰
3. 檢索賬戶信息

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 查找由公鑰擁有的所有域名

你可以通過使用帶有`memcmp`過濾器的`getProgramAccounts`請求來檢索錢包的所有域名。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 解析一個Twitter用戶名

Twitter用戶名可以在 [Solana名稱服務上註冊](https://naming.bonfida.org/#/twitter-registration 並可以像.SOL域名一樣使用。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Twitter用戶名的反向查找

爲了找到與Twitter用戶名相關聯的SOL地址，你可以進行反向查找。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
