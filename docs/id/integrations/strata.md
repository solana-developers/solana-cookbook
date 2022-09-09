---
title: Strata
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Membangun di Protokol Strata
  - - meta
    - name: og:title
      content: uku Panduan Solana | Membangun di Protokol Strata
  - - meta
    - name: description
      content: Strata adalah protokol untuk launching token di Solana. Pelajari cara menggunakan dan membangun diatas Strata.
  - - meta
    - name: og:description
      content: Strata adalah protokol untuk launching token di Solana. Pelajari cara menggunakan dan membangun diatas Strata.
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

# Strata

Strata adalah protokol untuk launching token di Solana. 
Kamu bisa pakai Strata untuk membuat semua jenis fungible token, mulai dari social tokens sampai dao dan gamefi token.
Kamu bisa juga  compose strata dengan apapun yang menggabungkan mekanisme harga tetap (_fixed price) untuk mendapatkan harga yang dinamis, sebagai contohnya adalah Metaplex CandyMachine.

Dokumen lebih detail ada [disini](docs.strataprotocol.com). Bisa juga gunakan GUI di [Strata Launchpad](app.strataprotocol.com)

## Cara Membuat Token Yang Dikendalikan Penuh

Token Yang Dikendalikan Penuh (_fully-managed Strata token_) adalah a token dimana  liquidity dikendalikan oleh protokol.  Hasilnya adalah Anda segera mendapatkan tradeable token, tanpa perlu pool atau penyedia likuiditas. Token yang dikelola sepenuhnya adalah token spl normal dengan metadata token metaplex dan kurva ikatan terkait.
Kurva ikatan mengelola likuiditas, harga, dan pasokan token itu.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara beli dan jual token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara bootstrap liquidity

Strata juga dapat menjual token di mana Anda ingin mengelola persediaan secara manual. Ini dapat berguna untuk bootstrap likuiditas sebelum mendaftarkan token Anda pada sebuah dex. Anda dapat membaca lebih lanjut tentang ini [disini](https://docs.strataprotocol.com/marketplace/lbc) atau launch punya anda sendiri di [Strata Launchpad](app.strataprotocol.com)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Sumber Lainnya

- [Typescript Client Documentation](https://docs.strataprotocol.com) - Contoh Live code untuk membuat dan mengelola token Strata
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - Launching token dengan menggunakan interface (GUI)
