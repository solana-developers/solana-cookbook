---
title: Pyth
head:
  - - meta
    - name: title
      content: Solana Cookbook | Using Pyth to get OnChain data
  - - meta
    - name: og:title
      content: Solana Cookbook | Using Pyth to get OnChain data
  - - meta
    - name: description
      content: Pyth is an Oracle used to get real-word financial data onChain.
  - - meta
    - name: og:description
      content: Pyth is an Oracle used to get real-word financial data onChain.
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

# Pyth

Pyth is an Oracle used to get real-world financial and crypto market data. Pyth Oracle can be used by OnChain programs for consuming data for a variety of use cases.

## How to use Pyth in Client

Pyth provides a JavaScript/TypeScript library called **@pythnetwork/client**. This library can be used to read onChain Pyth Data for off-chain applications, such as displaying the Pyth price on a website. Learn more about this [here](https://www.npmjs.com/package/@pythnetwork/client)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/pyth/client/client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/client/client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## How to use Pyth in Anchor

Pyth provides a Rust Crate which can be used by on-chain programs or off-chain application's to consume pyth's data.

## Other Resources

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
