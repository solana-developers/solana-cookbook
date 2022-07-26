---
title: Mango Markets
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Building on Mango Markets
  - - meta
    - name: og:title
      content: คู่มือ Solana | Building on Mango Markets
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
trade cryptoassets through an on-chain risk engine.
You can connect to Mango's on-chain program using the Client API libraries.
You'll also need the Solana javascript API library.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## How to get a Mango Group

A mango group is a basket of cross-margined tokens. It holds broad market info about tokens, serum dex markets, perp markets, oracles, insurance fund and fees vaults. Each version 
of Mango Markets uses a different Mango Group containing different 
tokens. The current v3 group is `mainnet.1`. Here's a table showing the various groups:


| Group                | Version     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Note
If you wish to use the v2 groups, you'll have to use the v2 client library. You can find it [ที่นี่](https://github.com/blockworks-foundation/mango-client-ts)
:::


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
you to trade that Group’s markets. You can find the reference [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to deposit USDC into a Mango Account
After creating a mango account, you'll need to fund it with tokens for trading. 
You can find the reference for the deposit method [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit). 

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
Mango interacts with Serum Protocol to place spot orders on markets. You can place a spot 
order by doing this. You can find the reference for the placeSpotOrder function [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder). 
Mango has a config file that contains information on groups, markets, tokens and oracles, 
you can find it [ที่นี่](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). We use information from that file to find the right group and market.

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
Mango uses the market information from Serum Protocol to load bids. You can load 
them directly from Serum to work with on Mango. You can find out more about Serum's 
markets [ที่นี่](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

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
Mango uses the market information from Serum Protocol to load asks. 
You can load them directly from Serum to work with on Mango. You can find out more 
about Serum's markets [ที่นี่](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

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

## แหล่งข้อมูลอื่น

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
