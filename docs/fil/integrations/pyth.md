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

Ang Pyth ay isang Oracle na ginamit upang makakuha ng real-world financial at crypto market data. Ang Pyth Oracle ay maaaring gamitin ng mga on-chain na program sa pagkonsumo ng data para sa iba't ibang kaso ng paggamit.

## Paano gamitin ang Pyth sa Client

Nagbibigay ang Pyth ng JavaScript/TypeScript library na tinatawag na **@pythnetwork/client**. Maaaring gamitin ang library na ito upang basahin ang on-chain na Pyth Data para sa mga off-chain na application, gaya ng pagpapakita ng presyo ng Pyth sa isang website. Matuto pa tungkol dito [dito](https://www.npmjs.com/package/@pythnetwork/client)
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

## Paano gamitin ang Pyth sa Anchor

Nagbibigay ang Pyth ng Rust Crate na maaaring gamitin ng mga on-chain program o off-chain na application para ubusin ang data ng pyth.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/pyth/on-chain/on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/on-chain/on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-OpenBook/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example)
