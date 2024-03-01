---
title: OpenBook
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Membangun di OpenBook
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Membangun di OpenBook
  - - meta
    - name: description
      content: OpenBook adalah inovasi CLOB di Solana. Belajar cara menggunakan dan membangun aplikasi anda di atas OpenBook.
  - - meta
    - name: og:description
      content: OpenBook adalah inovasi CLOB di Solana. Belajar cara menggunakan dan membangun aplikasi anda di atas OpenBook.
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

# OpenBook

OpenBook adalah protokol untuk pertukaran terdesentralisasi yang dibangun di atas Solana. Anda
dapat menggunakan OpenBook untuk menciptakan pasar baru (_new market_), mendapatkan buku pesanan (_orderbooks_), berdagang (_trades_), dan banyak lagi.

## Cara Mendapatkan OpenBook Market

Market di OpenBook berisi semua pesanan dan kemampuan untuk membuat pesanan
pada OpenBook. Untuk semua yang Anda lakukan di OpenBook, Anda perlu mengetahui market yang Anda sedang kerjakan.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Mendapatkan OpenBook Order Books

OpenBook markets terdiri dari orderbooks yang memiliki  bids dan asks. Anda bisa
menanyakan informasi ini sehingga Anda dapat melihat apa yang terjadi di pasar dan
bertindak sesuai yang Anda butuhkan

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara Mendapatkan Open Orders

Sebagai seorang trader, Anda pasti ingin tahu Open Orders aktif apa yang Anda miliki saat ini
di sebuah market. Anda dapat menanyakan Open Orders Anda atau orang lain di market dengan OpenBook.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>