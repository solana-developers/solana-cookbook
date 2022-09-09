---
title: Program
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Programs
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Programs
  - - meta
    - name: description
      content: Program (juga disebut sebagai smart contracts) bertugas sebagai pondasi dari aktivitas on-chain. Belajar tentang Program dan Konsep Dasar lainnya di Buku Panduan Solana.
  - - meta
    - name: og:description
      content: Program (juga disebut sebagai smart contracts) bertugas sebagai pondasi dari aktivitas on-chain. Belajar tentang Program dan Konsep Dasar lainnya di Buku Panduan Solana.
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

# Program

Setiap developer bisa menulis dan memasukan programnya ke Solana Blockchain. Program (diketahui sebagai smart contracts di protokol lain) berfungsi sebagai dasar untuk aktivitas on-chain, mendukung apa pun mulai dari DeFi dan NFT hingga ke Media Sosial dan Game.

## Fakta-Fakta

::: tip Fakta

- Program Memproses [instruksi](./transactions) dari pengguna akhir dan program lain
- Semua program adalah *stateless* / *tidak memiliki status*: semua data apa pun yang berinteraksi dengannya disimpan di [Akun](./accounts.md) terpisah yang diteruskan melalui intruksi 
- Program itu sendiri disimpan dalam akun yang ditandai sebagai 'executable'
- Semua program merupakan milik [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) dan dieksekusi oleh [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Pengembang paling sering menulis program dalam bahasa Rust atau C++, tetapi bisa memilih bahasa lain yang menargetkan [LLVM](https://llvm.org/)'s [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) backend
- Semua program memiliki satu titik masuk dimana pemrosessan instruksi berlangsung (i.e. `process_instruction`); parameternya selalu meliputi:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`

:::

## Lebih Dalam 

Tidak seperti kebanyakan blockchain lainnya, Solana benar-benar memisahkan kode dari data. Semua data yang berinteraksi dengan program disimpan dalam akun terpisah dan diteruskan sebagai referensi via instruksi. Model ini memungkinkan satu program generik untuk beroperasi di berbagai akun tanpa memerlukan penerapan tambahan. Contoh umum dari pola ini terlihat di seluruh program bawaan (`Native`) dan Program SPL.

### Native Program &  Solana Program Library (SPL)

Solana dilengkapi dengan sejumlah program yang berfungsi sebagai blok bangunan inti untuk interaksi dalam on-chain. Program ini dibagi menjadi [Native Programs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) dan [Solana Program Library (SPL) Programs](https://spl.solana.com/).

Program bawaan (`native`) menyediakan fungsionalitas dasar yang yang diperlukan untuk mengoperasikan validator. Di antara program-program ini, yang paling terkenal adalah [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program) yang bertanggung jawab untuk mengelola akun baru dan mentransfer SOL antara dua belah pihak. 

Program SPL mendukung sejumlah aktivitas on-chain, termasuk membuat, menukar, dan meminjamkan token, serta membuat `Stake Pools` dan memelihara layanan nama (`name service`) sebuah on-chain. [SPL Token Program](https://spl.solana.com/token) dapat dipanggil langsung melalui CLI, sementara yang lain seperti [Associated Token Account Program](https://spl.solana.com/associated-token-account) biasanya dibuat dengan program khusus.

### Menulis Program

Program paling sering dikembangkan dengan bahasa Rust atau C++, tetapi bisa juga dikembangkan dengan berbagai bahasa yang menargetkan backend BPF LLVM. Inisiatif terbaru oleh [Neon Labs](https://neon-labs.org/) dan [Solang](https://solang.readthedocs.io/en/latest/) mengaktifkan [EVM](https://ethereum.org/en/developers/docs/evm/) kompatibilitas dan memungkinkan para pengembang untuk menulis program dalam Solidity.

Sebagian besar program berbasis Rust mengikuti arsitektur berikut:

| File           | Deskripsi                                     |
|----------------|-----------------------------------------------|
| lib.rs         | Mendaftarkan modul                            |
| entrypoint.rs  | Titik masuk ke program                        |
| instruction.rs | Program API, deserialisasi data instruksi     |
| processor.rs   | Logika program                                |
| state.rs       | Objek program, status deserialisasi           |
| error.rs       | Kesalahan (error) khusus program              |

Baru-baru ini, [Anchor](https://github.com/coral-xyz/anchor) telah muncul sebagai framework yang populer untuk mengembangkan program. Anchor adalah sebuah framework, mirip dengan Ruby on Rails, yang mengurangi boilerplate dan mempermudah proses deserialisasi untuk pengembangan berbasis Rust. 

Program pada umumnya dikembangkan dan diuji di  `localhost` dan `devnet` sebelum di deploy ke `testnet` atau `mainnet`. Solana mendukung environment berikut:


| Kluster Environment  | URL Koneksi RPC                                                           |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | port bawaan: 8899 (contoh http://localhost:8899, http://192.168.1.88:8899)|

Setelah di deploy ke environment, klien dapat berinteraksi dengan program on-chain melalui [RPC connections](https://docs.solana.com/developing/clients/jsonrpc-api) ke masing-masing kluster. 

### Deploy Program

Pengembang dapat men-deploy program mereka melalui [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Ketika program telah di deploy, program tersebut dikompilasi ke [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (berisi BPF bytecode) dan diunggah ke kluster Solana. Program berjalan di akun (seperti semua yang lain di Solana), kecuali akun-akun itu telah ditandai sebagai `executable` dan ditugaskan ke BPF loader. Alamat akun ini disebut sebagai `program_id` dan digunakan untuk merujuk program dalam semua transaksi.

Solana mendukung beberapa BPF Loaders, dengan yang terbaru adalah  [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). BPF Loader bertanggung jawab untuk mengelola akun program dan membuatnya tersedia untuk klien melalui `program_id`. Semua program mempunyai satu titik masuk dimana semua pemrosesan instruksi berlangsung (i.e. `process_instruction`) dan parameternya selalu menyertakan : 
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Setelah dipanggil, program akan dijalankan oleh Solana Runtime.

## Sumber Lainnya 

- [Dokumentasi Resmi ](https://docs.solana.com/developing/on-chain-programs/overview)
- [Dokumentasi SPL](https://spl.solana.com/)
- [Program Deploys oleh Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit oleh Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming di Solana oleh Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [Perkenalan Solana Blockchain oleh Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)

