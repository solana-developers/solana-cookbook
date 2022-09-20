---
title: Mengirim Transaksi Offline
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Mengirim Transaksi Offline
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Mengirim Transaksi Offline
  - - meta
    - name: description
      content: Setelah signing transaksi offline, setiap orang bisa melakukan broadcast ke jaringan. Belajar tentang cara mengirim transaksi offline di Buku Panduan Solana.
  - - meta
    - name: og:description
      content: Setelah signing transaksi offline, setiap orang bisa melakukan broadcast ke jaringan. Belajar tentang cara mengirim transaksi offline di Buku Panduan Solana.
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
footer: MIT Licensed
---

# Transaksi Offline

## Sign Transaksi

Untuk membuat suatu transaksi offline, kamu harus sign transaksi tersebut, kemudian siapapun dapat mem-broadcast-nya di network. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Sign Transaksi Sebagian

Ketika suatu transaksi membutuhkan banyak signature, kamu bisa sign sebagian. Kemudian signer yang lain dapat sign dan mem-broadcast-nya ke network.

Beberapa contoh situasi dimana hal ini berguna:

- Mengirim sebuah SPL token untuk menerima pembayaran
- Sign suatu transaksi sehingga kamu bisa memverifikasi keasliannya
- Call custom program dalam suatu transaksi yang membutuhkan signature-mu

Dalam contoh ini Bob mengirimkan Alice sebuah SPL token untuk menerima pembayaran:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Durable Nonce

`RecentBlockhash` adalah sebuah nilai penting dalam suatu transaksi. Transaksi-mu akan gagal jika menggunakan recent blockhash yang sudah expired (melebihi 150 blocks). Kamu bisa menggunakan `durable nonce` untuk mendapatkan recent blockhash yang tidak akan expired. Untuk memicu mekanisme ini, transaksi-mu harus

1. Menggunakan suatu  `nonce` yang tersimpan dalam  `nonce account` sebagai sebuah recent blockhash
2. Memasukkan `nonce advance` operation di instruksi pertama

### Membuat Akun Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Mendapatkan Akun Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Menggunakan Akun Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
