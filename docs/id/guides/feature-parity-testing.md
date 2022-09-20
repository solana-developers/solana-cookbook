---
title: Pengujian Paritas Fitur
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Pengujian Paritas Fitur
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Pengujian Paritas Fitur
  - - meta
    - name: description
      content: Fitur bervariasi berdasarkan cluster Solana. Pengujian fitur untuk memastikan hasil yang dapat diprediksi.
  - - meta
    - name: og:description
      content: Fitur bervariasi berdasarkan cluster Solana. Pengujian fitur untuk memastikan hasil yang dapat diprediksi.
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

# Pengujian Paritas Fitur

Saat menguji program Anda, jaminan bahwa program akan berjalan sama di berbagai cluster sangatlah penting untuk kualitas dan
menghasilkan hasil yang diharapkan.


## Fakta

::: tip Lembar Fakta
- Fitur adalah kemampuan yang diperkenalkan ke validator Solana dan memerlukan aktivasi untuk digunakan.
- Fitur dapat diaktifkan di satu cluster (misalnya testnet) tetapi tidak di cluster lain (misalnya mainnet-beta).
- Namun; saat menjalankan `solana-test-validator` default secara lokal, semua fitur yang tersedia di Solana versi Anda diaktifkan secara otomatis. Hasilnya adalah ketika menguji secara lokal, kemampuan dan hasil dari pengujian Anda mungkin tidak sama saat menerapkan dan menjalankan di cluster yang berbeda!
:::

## Skenario
Asumsikan Anda memiliki Transaksi yang berisi tiga (3) instruksi dan setiap instruksi mengkonsumsi kira-kira
100_000 Compute Unit (CU). Saat menjalankan dalam versi Solana 1.8.x, Anda akan mengamati konsumsi CU instruksi Anda mirip dengan:

| Instruksi | Mulai CU | Eksekusi | Sisa CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

Di Solana 1.9.2 fitur yang disebut 'transaction wide compute cap' diperkenalkan di mana Transaksi, secara default,
memiliki anggaran 200_000 CU dan instruksi yang dienkapsulasi **_draw down_** dari anggaran Transaksi tersebut. Menjalankan transaksi yang sama seperti yang sebelumnya akan menunjukkan hasil yang sangat berbeda:

| Instruksi | Mulai CU | Eksekusi | Sisa CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | GAGAL!!! | GAGAL!!!

Astaga! Jika Anda tidak menyadari hal ini, Anda mungkin akan frustrasi karena tidak ada perubahan pada behavior instruksi Anda yang
akan menyebabkan ini. Di devnet itu berfungsi dengan baik, tetapi secara lokal gagal?!?

Ada kemampuan untuk meningkatkan keseluruhan anggaran Transaksi, katakanlah 300_000 CU, dan selamatkan kewarasan Anda, namun ini menunjukkan mengapa pengujian dengan **_Feature Parity_** memberikan cara proaktif untuk menghindari kebingungan.

## Status Fitur
Cukup mudah untuk memeriksa fitur apa yang diaktifkan untuk cluster tertentu dengan perintah `solana feature status`.
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Atau, Anda dapat menggunakan alat seperti [scfsd](#resources) untuk mengamati status semua fitur di seluruh cluster
yang akan ditampilkan, sebagian layar ditampilkan di sini, dan tidak memerlukan `solana-test-validator` untuk dijalankan:

<img src="./feature-parity-testing/scfsd.png" alt="Heatmap dari Status Fitur">
<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Uji Paritas
Seperti disebutkan di atas, `solana-test-validator` mengaktifkan **semua** fitur secara otomatis.
Jadi untuk menjawab pertanyaan "Bagaimana saya bisa menguji secara lokal di lingkungan yang memiliki paritas dengan devnet, testnet atau bahkan mainnet-beta?".

Solusi: PR ditambahkan ke Solana 1.9.6 untuk memungkinkan penonaktifan fitur:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Demonstrasi Sederhana
Misalkan Anda memiliki program sederhana yang mencatat data yang diterimanya di entry-point. Dan Anda menguji transaksi yang menambahkan dua (2) instruksi untuk program Anda.

### Semua fitur diaktifkan
1. Anda memulai validator uji di satu terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program target/deploy/PROGNAME.so --reset`
```

2. Di terminal lain Anda memulai log streamer:
```console
solana logs
```

3. Anda kemudian menjalankan transaksi Anda. Anda akan melihat sesuatu yang serupa di terminal log (diedit untuk kejelasan):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```

Karena fitur 'batas komputasi luas transaksi' kami secara otomatis diaktifkan secara default, kami mengamati masing-masing instruksi penarikan CU dari anggaran awal Transaksi sebesar 200_000 CU.
### Fitur selektif dinonaktifkan
1. Untuk menjalankan ini, kami ingin menjalankan agar behavior anggaran CU setara dengan apa yang berjalan di devnet. Menggunakan alat yang dijelaskan dalam [Status Fitur](#status-fitur) pun kami mengisolasi kunci publik `batasan komputasi luas transaksi`
dan gunakan `--deactivate-feature` pada uji startup validator

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. Kami sekarang melihat di log kami bahwa instruksi kami sekarang memiliki anggaran 200_000 CU sendiri (diedit untuk kejelasan) yang
saat ini merupakan status di semua cluster hulu:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Uji Paritas Penuh
Anda dapat berada dalam paritas penuh dengan cluster tertentu dengan mengidentifikasi setiap fitur yang belum diaktifkan dan tambahkan `--deactivate-feature <FEATURE_PUBKEY>` untuk masing-masing saat menjalankan `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Atau, [scfsd](#resources) menyediakan sakelar perintah untuk menampilkan fitur yang dinonaktifkan sepenuhnya
setel agar kluster diumpankan langsung ke startup `solana-test-validator`:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```
Jika Anda membuka terminal lain, saat validator sedang berjalan, dan `status fitur solana` Anda akan melihat
fitur dinonaktifkan yang ditemukan dinonaktifkan di devnet

## Uji Paritas Penuh Secara Terprogram
Bagi mereka yang mengontrol jalannya validator pengujian dalam kode pengujian mereka, memodifikasi fitur validator uji yang diaktifkan/dinonaktifkan dimungkinkan menggunakan TestValidatorGenesis. Dengan
Solana 1.9.6 sebuah fungsi yang telah ditambahkan ke pembuat validator untuk mendukung ini.

Di root folder program Anda, buat folder baru bernama `tests` dan tambahkan `parity_test.rs`
mengajukan. Berikut adalah fungsi tempat boiler (boiler-plate jika Anda mau) yang digunakan oleh setiap pengujian

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Kita sekarang dapat menambahkan fungsi pengujian di badan `mod test {...}` untuk mendemonstrasikan default
penyiapan validator (semua fitur diaktifkan) lalu nonaktifkan `batas komputasi luas transaksi` sebagai
per contoh sebelumnya menjalankan `solana-test-validator` dari CLI.

We can now add test functions in the body of `mod test {...}` to demonstrate default
validator setup (all features enabled) and then disabling the `transaction wide compute cap` as
per previous examples running `solana-test-validator` from the command line.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Atau, [gadget mesin scfs](#resources) dapat menghasilkan vektor penuh yang dinonaktifkan
fitur untuk sebuah cluster. Berikut ini menunjukkan menggunakan mesin itu untuk mendapatkan daftar
dari semua fitur yang dinonaktifkan untuk devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>

Selamat menguji!

## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)