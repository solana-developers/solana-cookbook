---
title: ネームサービス
head:
  - - meta
    - name: title
      content: Solana Cookbook | Name Service
  - - meta
    - name: og:title
      content: Solana Cookbook | Name Service
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

# ネームサービス

## ネームレジストリ

ネーム レジストリには、ドメイン名に関する情報が格納され、下記の二つから成り立ちます:

- ヘッダー
- データ

ドメイン名のデータには、常にヘッダーがプレフィックスとして付けられます。以下は、JS のヘッダーの構造です。:

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

## SOLドメインの解決

.SOLドメインは、publicKeys に変換される一意のわかりやすいドメイン名です。 多くのウォレットは、トークンまたは SOL を送信するための別のオプションとしてこれらを使用します。次の方法で、.SOLドメインをpublicKeyに変換できます。

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

## 逆引き

これは、公開鍵からドメイン名を解決するために使用できます。

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

## サブドメインの検索

サブドメインを解決するには、次のことが必要です:

1. 親ドメインキーを取得する
2. サブドメインキーを取得する
3. アカウント情報を取得する

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

## 公開鍵が所有するすべてのドメイン名を見つける

`memcmp`フィルタを指定して`getProgramAccounts`リクエストを実行すると、ウォレットのすべてのドメイン名を取得できます。

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

## Twitter handleを解決する

Twitter handleは[Solanaネーム サービスに登録でき](https://naming.bonfida.org/#/twitter-registration)、.SOLドメイン名のように使用できます

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

## Twitter handleの逆引き

Twitter handleに関連付けられた SOLアドレスを見つけるには、逆引きを実行できます。

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
