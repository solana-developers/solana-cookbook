---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
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

# Mango Markets

Mango provides a single venue to lend, borrow, swap, and leverage 
trade cryptoassets through a powerful risk engine. With lightning-speed
trade execution, up to 5x leverage, near-zero fees, and attractive
interest rates for lenders, the Mango Markets experience competes
head on with centralized exchanges without any compromise.
You can connect to the Mango Program using the Client API libraries.

## How to get a Mango Group

A mango group is a basket of cross-margined tokens. Each version 
of Mango Markets uses a different Mango Group containing different 
tokens. The current v3 group is `mainnet.1`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## How to create a Mango Account

A Mango Account is associated with a Mango Group, and it holds your tokens and allows 
you to trade that Group’s markets. You can find the reference [here](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount). 
This snippet uses the @solana/wallet-adapter packages.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to deposit USDC into a Mango Account
After creating a mango account, you'll need to fund it with tokens for trading. 
You can find the reference for the deposit method [here](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit). 
This snippet uses the @solana/wallet-adapter packages

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to place a spot order
Mango uses Serum DEX for spot markets. You can place a spot order by doing this. 
You can find the reference for the placeSpotOrder function [here](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to load bids
You can load bids from a Market. Mango uses Serum DEX for markets. You can find out more about Serum's markets [here](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to load asks
You can load asks from a Market. Mango uses Serum DEX for markets. ou can find out more 
about Serum's markets [here](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>