---
title: Pyth
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Menggunakan Pyth untuk Mendapatkan OnChain data
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Menggunakan Pyth untuk Mendapatkan OnChain data
  - - meta
    - name: description
      content: Pyth adalah sebuah Oracle yang digunakan untuk mendapatkan real-word financial data secara onChain.
  - - meta
    - name: og:description
      content: Pyth adalah sebuah Oracle yang digunakan untuk mendapatkan real-word financial data secara onChain.
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

Pyth adalah Oracle yang digunakan untuk mendapatkan data pasar keuangan dan kripto. Pyth Oracle dapat digunakan oleh program on-chain dalam mengkonsumsi data untuk berbagai kasus penggunaan.

## Cara Menggunakan Pyth di Client

Pyth menyediakan a JavaScript/TypeScript library yang disebut **@pythnetwork/client**. Librari ini bisa digunakan untuk membaca data on-chain untuk aplikasi off-chain, seperti menampilan harga Pyth di website.  Pelajari lebih lanjut [here](https://www.npmjs.com/package/@pythnetwork/client)

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

## Cara Memakai Pyth di Anchor

Pyth menyediakan a Rust Crate yang bisa digunakan program on-chain atau off-chain untuk konsumsi data Pyth..

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

## Sumber Lainnya

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example)
