---
title: Migrasi Akun Data Program
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Migrasi Data Akun Program
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Migrasi Data Akun Program
  - - meta
    - name: description
      content:  Pada dasarnya data versi untuk mendukung migrasi berarti membuat referensi unik untuk kumpulan data. Referensi ini dapat berupa query, ID, atau juga biasanya pengenal datetime. Pelajari tentang Serialisasi dan Bahan lainnya untuk hidangan Anda di Buku Panduan Solana.
  - - meta
    - name: og:description
      content: Pada dasarnya data versi untuk mendukung migrasi berarti membuat referensi unik untuk kumpulan data. Referensi ini dapat berupa query, ID, atau juga biasanya pengenal datetime. Pelajari tentang Serialisasi dan Bahan lainnya untuk hidangan Anda di Buku Panduan Solana.
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

# Melakukan migrasi Akun Data dari sebuah Program

## Bagaimana cara melakukan migrasi akun data sebuah program?

Saat Anda membuat program, setiap akun data yang berkaitan dengan program tersebut akan memiliki sebuah struktur data tertentu. Jika Anda perlu melakukan upgrade terhadap akun yang dihasilkan oleh program, Anda kemudian akan memiliki banyak sisa akun hasil program dengan struktur yang lama.

Dengan account versioning, Anda dapat memperbarui akun lama Anda ke struktur baru.

:::tip Catatan
Ini hanyalah salah satu dari banyak cara untuk melakukan migrasi data di Program Owned Accounts (POA).
:::

## Skenario

Untuk mencatat versi dan melakukan migrasi data akun kita, kita akan memberikan **id** untuk masing-masing akun. Id ini akan memungkinkan kita untuk mengidentifikasi versi akun ketika kita meneruskannya ke program, dan dengan demikian menangani akun tersebut dengan benar.

Mari kita ambil contoh status akun dan program berikut:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Di versi pertama akun kita, kita melakukan hal berikut:

| ID | Aksi |
| - | - |
|1| Sertakan field 'data_version' di data Anda. Ini bisa berupa _ordinal_ sederhana yang bertambah (misalnya u8) atau sesuatu yang lebih canggih
|2| Mengalokasikan space yang cukup untuk pertumbuhan data
|3| Inisialisasi sejumlah konstanta untuk digunakan di seluruh versi program
|4| Tambahkan function pembaruan akun di dalam `fn conversion_logic` untuk pengembangan di masa mendatang

Katakanlah kita ingin meningkatkan akun dari program kita sekarang untuk menyertakan
field wajib yang baru, yakni field `somestring`.

Jika kita tidak mengalokasikan space ekstra di akun sebelumnya, kita tidak dapat melakukan upgrade akun dan terjebak.

## Melakukan upgrade Akun

Dalam program baru kita, kita ingin menambahkan sebuah properti baru untuk state dari konten.
Perubahan dalam upgrade ini adalah bagaimana kita mengembangkan konstruksi awal program dikarenakan mereka sudah digunakan sekarang.

### 1. Tambahkan logika konversi akun

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Baris | Catatan |
| ------- | - |
| 6 | kita telah menambahkan syntax Solana berupa `solana_program::borsh::try_from_slice_unchecked` untuk menyederhanakan proses membaca berbagai subset data dari blok data yang lebih besar
| 13-26| Di sini kita telah mempertahankan struktur konten lama, yaitu `AccountContentOld` pada baris 24, sebelum kemudian diubah menjadi `AccountContentCurrent` mulai dari baris 17.
| 60 | kita menginisialisasi konstanta `DATA_VERSION`
| 71 | kita sekarang memiliki versi 'sebelumnya' dan kita ingin tahu ukurannya
| 86 | menyediakan jalur untuk meningkatkan state konten sebelumnya ke state konten baru (saat ini)

Kita kemudian memperbarui instruksi kita, untuk menambahkan yang baru untuk memperbarui `somestring`, dan prosesor untuk menangani instruksi baru. Perhatikan bahwa proses 'upgrade' struktur data di-enkapsulasi di belakang `pack/unpack`

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Setelah membuat dan mengirimkan instruksi: `VersionProgramInstruction::SetString(String)` sekarang kita memiliki layout dari data akun yang telah di 'upgrade' berikut


<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resource

* [Spesifikasi Borsh](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)