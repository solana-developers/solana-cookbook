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
