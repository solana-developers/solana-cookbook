---
title: Pyth
head:
  - - meta
    - name: title
      content: Solana Cookbook | Utilisation de Pyth pour obtenir des données OnChain
  - - meta
    - name: og:title
      content: Solana Cookbook | Utilisation de Pyth pour obtenir des données OnChain
  - - meta
    - name: description
      content: Pyth est un Oracle utilisé pour obtenir des données financières réelles onChain.
  - - meta
    - name: og:description
      content: Pyth est un Oracle utilisé pour obtenir des données financières réelles onChain.
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

Pyth est un Oracle utilisé pour obtenir des données financières et des données sur le marché des crypto-monnaies dans le monde réel. L'Oracle de Pyth peut être utilisé par les programmes on-chain afin d'utiliser des données dans divers cas d'utilisation.

## Comment utiliser Pyth dans le Client

Pyth fournit une bibliothèque JavaScript/TypeScript appelée **@pythnetwork/client**. Cette bibliothèque peut être utilisée pour lire les données on-chain de Pyth pour des applications off-chain, comme l'affichage du prix du jeton Pyth sur un site web. Plus d'informations à ce sujet [ici](https://www.npmjs.com/package/@pythnetwork/client)

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

## Comment utiliser Pyth dans Anchor

Pyth fournit un Crate Rust qui peut être utilisé par des programmes on-chain ou des applications off-chain pour utiliser les données de Pyth.

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

## Autres Ressources

- [Bibliothèques du Client](https://docs.pyth.network/consumers/client-libraries)
- [Exemple de code JS](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Exemple de code Rust](https://github.com/project-OpenBook/anchor/tree/master/tests/pyth)
- [Exemple de code Anchor](https://github.com/0xPratik/pyth-anchor-example)
