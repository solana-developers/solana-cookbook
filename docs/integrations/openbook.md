---
title: Openbook
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Openbook
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Openbook
  - - meta
    - name: description
      content: Openbook is an innovative CLOB on Solana. Learn how to use and build on top of Openbook.
  - - meta
    - name: og:description
      content: Openbook is an innovative CLOB on Solana. Learn how to use and build on top of Openbook.
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

# OpenBook

OpenBook is a community-led fork of the Serum V3 program. OpenBook supports most Solana wallets including web based wallets, app wallets and hardware wallets.

## Initial setup

This section establishes the connection to Solana's testnet, loads the market smart contract, and defines relevant addresses.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/initial-setup/initial-setup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/initial-setup/initial-setup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Order Management

This section illustrates how to retrieve, place, and cancel orders within the market, as well as retrieve open orders by owner.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/order-management/order-management.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/order-management/order-management.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Order Book Interaction

This part of the code demonstrates interaction with the order book, including fetching L2 order book data and displaying detailed information about the full order book.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/order-book-interaction/order-book-interaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/order-book-interaction/order-book-interaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Fill Retrieval and Fund Settlement

This section covers retrieving fills and settling funds after trading operations, transferring funds to specified token accounts.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/fill-and-fund/fill-and-fund.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/fill-and-fund/fill-and-fund.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
