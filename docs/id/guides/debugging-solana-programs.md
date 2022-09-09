---
title: Debug Program Solana
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Debug Program Solana
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Debug Program Solana
  - - meta
    - name: description
      content: Ada sejumlah opsi dan alat pendukung untuk menguji dan men-debug program BPF Solana.
  - - meta
    - name: og:description
      content: Ada sejumlah opsi dan alat pendukung untuk menguji dan men-debug program BPF Solana.
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
# Debug Program Solana

Ada sejumlah opsi dan alat pendukung untuk menguji dan men-debug program Solana.

## Fakta

::: tip Lembar Fakta
- Crate `solana-program-test` memungkinkan penggunaan secara langsung terhadap **_runtime lokal_** tempat Anda dapat menguji dan men-debug
program Anda secara interaktif (misalnya dalam vscode).
- Crate `solana-validator` memungkinkan implementasi `solana-test-validator` untuk robust testing yang lebih baik yang terjadi pada **_local validator node_**. Anda dapat menjalankan dari editor **_tetapi breakpoints di
program diabaikan_**.
- CLI `solana-test-validator` menjalankan dan memuat program Anda dan memproses eksekusi transaksi dari
aplikasi Rust berbasis command line atau aplikasi Javascript/TypeScript menggunakan web3.
- Untuk semua hal di atas, penggunaan makro `msg!` secara bebas dalam program Anda disarankan dilakukan dari awal dan kemudian
menghapusnya seiring Anda menguji dan memastikan behaviour yang kokoh. Ingat bahwa `msg!` menggunakan Compute Unit yang
akhirnya dapat menggagalkan program Anda dengan menyentuh budget cap dari Compute Unit.
:::


Langkah-langkah di bagian berikut menggunakan [solana-program-bpf-template](#resources). Clone itu ke
mesin:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```

## Uji Runtime dan Debugging di editor

Buka file `src/lib.rs`

Anda akan melihat bahwa programnya cukup sederhana dan pada dasarnya hanya mencatat konten yang diterima oleh function dari entrypoint program: `process_instruction`

1. Buka bagian `#[cfg(test)]` dan klik `Run Tests`. Ini akan melakukan build program dan kemudian
jalankan tes `async fn test_transaction()`. Anda akan melihat pesan log (disederhanakan) di terminal vscode di bawah code.

```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```

2. Atur breakpoint di program pada baris `msg!` (11)
3. Kembali ke modul tes, klik `Debug` dan dalam beberapa detik debugger akan berhenti pada breakpoint dan sekarang Anda dapat memeriksa data, melangkah melalui fungsi, dll., dll.

Tes ini juga dijalankan dari CLI dengan:
`cargo test` atau `cargo tes-bpf`. Tentu saja setiap breakpoint akan diabaikan.

Tentunya asyik bukan!

:::tip Catatan
Ingatlah bahwa Anda tidak menggunakan node validator sehingga program default, blockhash, dll. tidak diwakili atau
tidak akan berperilaku seperti saat berjalan di node validator. Inilah mengapa geng di Solana memberi kita metode Uji Node Validator Lokal!
:::

## Uji Node Validator Lokal di editor
Uji integrasi menggunakan programmatic loading dari node validator lokal didefinisikan dalam file `tests/integration.rs`.

Secara default, uji integrasi repo template hanya akan dapat dijalankan dari baris perintah
menggunakan `cargo test-bpf`. Langkah-langkah berikut akan memungkinkan Anda untuk berjalan di dalam editor juga seperti menampilkan log validator program dan keluaran `msg!` dari program Anda:

1. Di direktori repo jalankan `cargo build-bpf` untuk membangun program sampel
2. Di editor, buka `tests/integration.rs`
3. Komentari baris 1 -> `// #![cfg(feature = "test-bpf")]`
4. Pada baris 19 ubah menjadi: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Masukkan yang berikut ini pada baris 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Klik `Run Test` di atas fungsi `test_validator_transaction()`

Ini akan memuat node validator yang kemudian memungkinkan Anda untuk membuat transaksi (dengan cara Rust) dan mengirim ke node menggunakan `RcpClient`.

Keluaran program juga akan dicetak di terminal editor. Misalnya (disederhanakan):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```

Debug di sini akan memungkinkan Anda untuk men-debug fungsi dan metode yang digunakan di **_test body_** tetapi tidak akan menyebabkan breakpoint dalam program Anda.

Seperti Lutut lebah, ya?

## Uji Node Validator Lokal dari Aplikasi Klien
Terakhir, Anda dapat memulai node validasi lokal dan memuat program Anda dan akun apa pun menggunakan `solana-test-validator` dari CLI.

Dalam pendekatan ini, Anda akan memerlukan aplikasi klien baik menggunakan Rust [RcpClient](#resources) atau di
[Klien JavaScript atau TypeScript](#resources)

Lihat `solana-test-validator --help` untuk detail dan opsi lebih lanjut. Untuk contoh program di sini adalah pengaturan dasar:
1. Buka terminal di folder repo
2. Jalankan `solana config set -ul` untuk mengatur konfigurasi agar mengarah ke lokal
3. Jalankan `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Buka terminal lain dan jalankan `solana logs` untuk memulai streamer log
5. Anda kemudian dapat menjalankan program klien Anda dan mengamati keluaran program di terminal tempat Anda memulai log streamer

Nah itu seperti piyama kucing YO!

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
