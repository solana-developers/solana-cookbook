---
title: Serum
head:
  - - meta
    - name: title
      content: Buku Memasak Solana | Building on Serum
  - - meta
    - name: og:title
      content: Buku Memasak Solana | Building on Serum
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

Serum is a protocol for decentralized exchanges built on Solana. You
can use Serum to create new markets, get order books, trade, and more.

## How to get a Serum market

A market on Serum contains all the orders and capabilities to make orders
on Serum. For everything you do on Serum you need to know the market you
are working with.

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

## How to get Serum order books

Serum markets consist of orderbooks which have bids and asks. You can
query this information so you can see what is going on on the market and
act accordingly.

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

## How to get current open orders

As a trader, you will want to know what current open orders you have
on a market. You can query your or anyone else's open orders on a market
with Serum.

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