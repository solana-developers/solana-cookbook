---
title: Serum
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Serum
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Serum
  - - meta
    - name: description
      content: Serum is an innovative CLOB on Solana. Learn how to use and build on top of Serum.
  - - meta
    - name: og:description
      content: Serum is an innovative CLOB on Solana. Learn how to use and build on top of Serum.
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
---

# Serum

Serumは、Solana 上に構築された分散型取引所のプロトコルです。 Serumを使用して、新しい市場の作成、オーダーブックの取得、取引などを行うことができます。

## Serumマーケットの取得方法

Serumのマーケットには、Serumで注文するためのすべての注文と機能が含まれています。 Serumで行うすべてのことについて、作業しているマーケットを知る必要があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Serumオーダーブックの入手方法

Serumマーケットは、ビッドとアスクを含むオーダーブックで構成されています。この情報を照会して、市場で何が起こっているかを確認し、それに応じて行動することができます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 現在のオープンの注文を取得する方法

トレーダーとして、市場で現在開いている注文を知りたいと思うでしょう。Serumを使用して、市場での自分または他の誰かのオープン注文を照会できます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>