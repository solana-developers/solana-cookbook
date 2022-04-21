---
title: Jupiter
head:
  - - meta
    - name: title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: og:title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
  - - meta
    - name: og:description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
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

# Jupiter

Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.

## How to use Jupiter Core Library

Jupiter Core SDK is used to interact with the Jupiter on-chain programs, which gives us a list of best possible routes for performing a token swap.

### Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### Fetching Token list from Jupiter

The List of Tokens are being fetched from Jupiter for a specific ENV like mainnet-beta or devnet.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Loading the Jupiter instance

Jupiter instace is being created with the provided configurations. There are alot of options present to know more about it. [link](https://docs.jup.ag/jupiter-core/full-guide)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## How to use Jupiter in Client

## How to use Jupiter API

## Other Resources

<!-- - [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example) -->
