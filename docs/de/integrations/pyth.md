---
title: Pyth
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Verwenden von Pyth zum Abrufen von OnChain-Daten
  - - meta
    - name: og:title
      content: Solana Cookbook | Verwenden von Pyth zum Abrufen von OnChain-Daten
  - - meta
    - name: description
      content: Pyth ist ein Oracle, das verwendet wird, um reale Finanzdaten onChain zu erhalten.
  - - meta
    - name: og:description
      content: Pyth ist ein Oracle, das verwendet wird, um reale Finanzdaten onChain zu erhalten.
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

Pyth ist ein Oracle, mit dem reale Finanz- und Kryptomarktdaten abgerufen werden. Pyth Oracle kann von On-Chain-Programmen zum Konsumieren von Daten für eine Vielzahl von Anwendungsfällen verwendet werden.

## Verwendung von Pyth im Client

Pyth stellt eine JavaScript/TypeScript-Bibliothek namens **@pythnetwork/client** bereit. Diese Bibliothek kann zum Lesen von On-Chain-Pyth-Daten für Off-Chain-Anwendungen verwendet werden, z. B. zum Anzeigen des Pyth-Preises auf einer Website. Erfahren Sie mehr darüber [hier](https://www.npmjs.com/package/@pythnetwork/client)

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

## Verwendung von Pyth in Anchor

Pyth stellt eine Rust Crate bereit, die von On-Chain-Programmen oder Off-Chain-Anwendungen verwendet werden kann, um die Daten von Pyth zu verbrauchen.

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
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example)
