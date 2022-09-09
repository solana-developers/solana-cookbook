---
title: Serum
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Membangun di Serum
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Membangun di Serum
  - - meta
    - name: description
      content: Serum adalah inovasi CLOB di Solana. Belajar cara menggunakan dan membangun aplikasi anda di atas Serum.
  - - meta
    - name: og:description
      content: Serum adalah inovasi CLOB di Solana. Belajar cara menggunakan dan membangun aplikasi anda di atas Serum.
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

# Serum

Serum adalah protokol untuk pertukaran terdesentralisasi yang dibangun di atas Solana. Anda
dapat menggunakan Serum untuk menciptakan pasar baru (_new market_), mendapatkan buku pesanan (_orderbooks_), berdagang (_trades_), dan banyak lagi.

## Cara Mendapatkan Serum Market

Market di Serum berisi semua pesanan dan kemampuan untuk membuat pesanan
pada Serum. Untuk semua yang Anda lakukan di Serum, Anda perlu mengetahui market yang Anda sedang kerjakan.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Mendapatkan Serum Order Books

Serum markets terdiri dari orderbooks yang memiliki  bids dan asks. Anda bisa
menanyakan informasi ini sehingga Anda dapat melihat apa yang terjadi di pasar dan
bertindak sesuai yang Anda butuhkan

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara Mendapatkan Open Orders

Sebagai seorang trader, Anda pasti ingin tahu Open Orders aktif apa yang Anda miliki saat ini
di sebuah market. Anda dapat menanyakan Open Orders Anda atau orang lain di market dengan Serum.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>