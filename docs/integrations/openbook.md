---
title: OpenBook
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on OpenBook
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on OpenBook
  - - meta
    - name: description
      content: OpenBook is an innovative DEX on Solana. Learn how to use and build on top of OpenBook.
  - - meta
    - name: og:description
      content: OpenBook is an innovative DEX on Solana. Learn how to use and build on top of OpenBook.
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

OpenBook is a decentralized exchange (DEX) built on Solana. You can use OpenBook to trade various tokens, provide liquidity, and access decentralized finance (DeFi) services on the Solana blockchain.

## Prerequisites

Before diving into OpenBook integration, ensure you have the following:

- A Solana wallet.
- SOL tokens for transaction fees.
- OpenBook tokens for trading.

## Getting Started

### Connecting to Solana

To begin, you need to connect your Solana wallet to the Solana blockchain. Ensure your wallet is properly configured.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/connecting-solana/connecting-solana.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/connecting-solana/connecting-solana.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Depositing Funds

Deposit the tokens you intend to trade into your Solana wallet.

## Trading on OpenBook

### Selecting a Market

Choose the market and trading pair you want to trade. OpenBook offers a variety of markets; make sure to select the one that suits your trading needs.

### Placing an Order
Place a buy or sell order with the desired price and quantity. Below is an example in TypeScript:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/placing-order/placing-order.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/placing-order/placing-order.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Executing Trades

Confirm and execute the trade using the following TypeScript code:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/executing-trades/executing-tradesr.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/executing-trades/executing-trades.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Providing Liquidity

If you wish to provide liquidity to OpenBook's liquidity pools, follow these steps:

### Selecting a Liquidity Pool

Choose a liquidity pool that you want to contribute assets to.

### Adding Liquidity

Deposit equal amounts of two tokens into the selected pool. Here's an example in TypeScript:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/openbook/adding-liquidity/adding-liquidity.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/openbook/adding-liquidity/adding-liquidity.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Building on OpenBook

Developers can extend the functionality of OpenBook by accessing the OpenBook API and documentation on the [OpenBook Developer Portal](https://openbook.dev/).

## Conclusion

OpenBook offers a decentralized and efficient way to trade and participate in DeFi on the Solana blockchain. Explore the platform, try out trading, or contribute to its ecosystem as a developer.