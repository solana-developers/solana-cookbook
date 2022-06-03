---
title: Switchboard
head:
  - - meta
    - name: title
      content: Solana Cookbook | Using Switchboard to create Onchain data feeds
  - - meta
    - name: og:title
      content: Solana Cookbook | Using Switchboard to create Onchain data feeds
  - - meta
    - name: description
      content: Switchboard allows builders to unlock the power of Solana by creating high performance data feeds from any API.
  - - meta
    - name: og:description
      content: Switchboard allows builders to unlock the power of Solana by creating high performance data feeds from any API.
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

# Switchboard

Switchboard is a protocol that allows builders to unlock the power of Solana by creating high performance data feeds from any API. Switchboard can be used for various applications like getting current price of an asset for lending, getting the current weath or flight data and determining current NBA match status.

## How to use Switchboard on Client Side

Switchboard provides a JavaScript/TypeScript library called **@switchboard-xyz/switchboard-v2**
. This library can be used to reach On-chain data from existing data feeds or publish your own custom feeds. Learn more about this [here](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### Read data from an aggregator feed

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Create a new aggregator feed

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## How to use switchboard in programs
Switchboard provides a crate called **switchboard_v2**
Learn more about this [here](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)

### Read data from an aggregator feed in program

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

<!-- ## Other Resources

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example) -->
