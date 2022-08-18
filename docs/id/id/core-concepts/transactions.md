
---
title: Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transaction are bundles of Multiple operational units on Solana. Learn more about Transaction and Core Concepts at The Buku Memasak Solana.
  - - meta
    - name: og:description
      content: Multiple operational units on Solana can be bundled into a single unit called Transaction. Learn more about Core Concepts at The Buku Memasak Solana.
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

# Transactions

Clients dapat menjalankan [programs](./programs.md)dengan mengirimkan sebuah transaksi ke cluster. Sebuah transaksi dapat berisikan berbagai macam instruksi terhadap masing-masing program. Ketika sebuah transaksi dikirimkan, Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) akan menjalankan setiap instruksi sesuai dengan urutan dan mendetail. Jika ada instruksi yang gagal, maka keseluruhan transaksi akan gagal.

## Facts

::: tip Fact Sheet
- Dalam Solana, instruksi adalah unit operasional yang paling dasar
- Setiap instruksi mengandung:
    - `program_id` program yang ingin dijalankan
    - Kumpulan semua `accounts` yang ingin di *read* atau *write*
    - Sebuah `instruction_data` byte array yang spesifik terhadap suatu program tertentu
- Beberapa instruksi dapat disatukan dalam sebuah transaksi
- Setiap transaksi mengandung:
    - Kumpulan semua `accounts` yang ingin di *read* atau *write*
    - Satu atau lebih `instructions`
    - `blockhash` terkini
    - Satu atau lebih `signatures`
- Instructions secara berurutan dan *atomically*
- Jika ada instruksi yang gagal, maka seluruh transaksi akan gagal.
- Transaksi dibatasi sampai dengan 1232 bytes
:::

## Deep Dive

Solana Runtime membutuhkan instruksi dan transaksi untuk menentukan kumpulan akun yang akan dibaca dan ditulis. Dengan mempersiapkan akun terlebih dahulu, *runtime* dapat menjalankan eksekusinya terhadap semua transaksi bersamaan.

Ketika sebutah transaksi dikirimkan ke *cluster*, *runtime* akan memproses setiap instruksi sesuai urutan dan mendetail. Program yang menerima instruksi akan menginterpretasi kumpulan data dan menjalankannya di akun yang ditentukan. Program akan berhasil menjalankan instruksi atau gagal karena adanya *error*. Jika ada ditemukannya *error*, maka keseluruhan transaksi akan gagal.

Setiap transaksi yang akan mencatat sebuah akun dengan debet atau mengubah data, memerlukan verifikasi pemiliknya. Setiap akun yang akan dimodifikasi akan ditandai dengan `writable`. Sebuah akun dapat dikreditkan tanpa persetujuan pemiliknya asalkan biaya transaksi dibayarkan menutupi biaya yang dibutuhkan untuk *rent* dan biaya transaksi itu sendiri.

Sebelum pengiriman, semua transaksi harus mengacu kepada sebuah [recent blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). *Blockhash* digunakan untuk mencegah duplikasi dan menghapus transaksi gagal. Batas waktu sebuah *blockhash* transaksi adalah sekitar 1 menit 19 detik atau 150 blocks saat ini ditulis.

### Biaya

Jaringan Solana mengambil dua jenis biaya:
- [*Transaction fees*](https://docs.solana.com/transaction_fees) untuk menjalankan transaksi (aka “gas fees”)
- [*Rent fees*](https://docs.solana.com/developing/programming-model/accounts#rent) untuk menyimpan data on-chain 

Di Solana, *transaction fees* itu determistik: tidak ada konsep dimana pengguna dapat membayar lebih demi meningkatkan kesempatan untuk dimasukkan ke _block_ berikutnya. Pada waktu penulisan, transaction fees hanya ditentukan oleh jumlah verifikasi yang dibutuhkan (seperti `lamports_per_signature`), bukan dari jumlah sumber daya yang digunakan. Hal ini dikarenakan adanya batas maksimal 1232 bytes untuk semua transaksi.

Semua transaksi membutuhkan setidaknya sebuah akun `writable` untuk memverifikasi transaksi. Ketika transaksi sudah dikirim, akun *writable* pemverifikasi yang di-serialized pertama harus membayar biaya transaksi. Akun ini akan membayar biaya dari transaksi tanpa memedulikan transaksinya berhasil atau gagal. Jika pihak pembayar tidak memiliki saldo yang cukup, maka transaksi akan dihentikan.

Pada waktu penulisan, 50% dari semua transaction fee dibayarkan kepada validator yang membuat block dan sisa setengahnya hangus. Struktur ini berguna untuk mendorong validator memproses transaksi sebanyak mungkin.

## Sumber lainnya

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
