---
title: Serialisasi Data
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Serialisasi Data
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Serialisasi Data
  - - meta
    - name: description
      content: Belajar cara serialisasi and deserialisasi data di Solana
  - - meta
    - name: og:description
      content: Belajar cara serialisasi and deserialisasi data di Solana
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

# Serialisasi Data

Ketika kita berbicara tentang serialisasi, yang kita maksud adalah serialisasi data dan juga deserialisasi data.

Serialisasi berperan di beberapa titik sepanjang lifecycle akun program dan program Solana:

1. Serialisasi data instruksi ke klien
2. Deserialisasi data instruksi pada program
3. Serialisasi data Akun pada program
4. Deserialisasi Data Akun pada klien

Penting bahwa semua tindakan di atas didukung oleh pendekatan serialisasi yang sama. Snippet yang dimasukkan disini mendemonstrasikan serialisasi menggunakan [Borsh](#resources).

Contoh dalam sisa dokumen ini adalah kutipan yang diambil dari [Template Program CLI Solana](#resources)

## Persiapan untuk Borsh Serialization

Library untuk Borsh harus disiapkan dalam program Rust, klien Rust, Node dan/atau klien Python.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## Cara serialize data instruksi pada klien

<img src="./serialization/ser1.png" alt="Serialize Data Instruksi">

Jika Anda membuat serialisasi data instruksi yang keluar untuk dikirim ke suatu program, itu harus mencerminkan bagaimana program melakukan deserialisasi data instruksi yang masuk.

Dalam template ini, blok data instruksi adalah array serial yang berisi, dengan contoh:

| Instruksi (Variant index) | Serialized Key | Serialized Value |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0) | tidak berlaku untuk instruksi | tidak berlaku untuk instruksi |
| Mint (1) | "foo" | "bar" |
| Transfer (2) | "foo" | tidak berlaku untuk instruksi |
| Burn (2) | "foo" | tidak berlaku untuk instruksi |

Dalam contoh berikut, kita menganggap akun milik program telah diinisialisasi

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Cara deserialisasi data instruksi pada program

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Cara serialisasi data akun pada program

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Blok data akun program (dari contoh repo) ditata sebagai

| Byte 0 | Byte 1-4 | Sisa Byte hingga 1019 |
| ---------------- | ----------------------------- | ------------------------------------------------------- |
| Initlialized flag | panjang dari BTreeMap yang telah di serialize | BTreeMap (tempat key value pair disimpan) |

### Pack

Sepatah kata tentang sifat [Pack][1]

Sifat dari Pack memudahkan untuk menyembunyikan detail akan serialisasi/deserialisasi data akun dari pemrosesan instruksi Program inti Anda. Jadi daripada meletakkan semua serialisasi/deserialisasi masuk ke kode pemrosesan program, Pack melakukan encapsulate detilnya di dalam (3) fungsi:

1. `unpack_unchecked` - Memungkinkan Anda untuk deserialize akun tanpa memeriksa apakah akun telah diinisialisasi. Ini berguna ketika Anda sedang memproses Initialization Function (indeks varian 0)
2. `unpack` - Memanggil implementasi Pack Anda yaitu `unpack_from_slice` dan memeriksa apakah akun telah diinisialisasi.
3. `pack` - Memanggil implementasi Pack Anda yaitu `pack_into_slice`

Berikut adalah implementasi sifat Pack untuk program sampel kita. Ini diikuti dengan yang pengolahan data akun yang sebenarnya menggunakan borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialisasi/Deserialisasi

Untuk menyelesaikan serialisasi dan deserialisasi:

1. `sol_template_shared::pack_into_slice` - Di mana serialisasi sebenarnya terjadi
2. `sol_template_shared::unpack_from_slice` - Di mana deserialisasi sebenarnya terjadi

**Perhatikan** bahwa berikut ini kita memiliki partisi `u32` (4 byte) dalam layout data untuk
`BTREE_LENGTH` sebelum `BTREE_STORAGE`. Ini karena borsh, selama deserialisasi,
memeriksa apakah panjang slice yang Anda deserialize sesuai dengan jumlah
data yang dibacanya sebelum melakukan rekombinasi objek penerima. Pendekatan yang ditunjukkan di bawah ini pertama-tama membaca `BTREE_LENGTH` untuk mendapatkan ukuran `slice` dari
pointer `BTREE_STORAGE`.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Penggunaan

Contoh berikut menggabungkan semuanya dan menunjukkan bagaimana program berinteraksi dengan `ProgramAccountState` yang merangkum initialization flag serta `BTreeMap` yang menjadi dasar untuk key/value pair kita.

Pertama ketika kita ingin menginisialisasi akun baru:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Sekarang kita dapat mengoperasikan instruksi kita yang lain seperti yang ditunjukkan berikut merupakan proses minting key/value pair yang kita demonstrasikan di atas saat mengirim instruksi dari klien:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## Cara deserialisasi data akun pada klien

Klien dapat memanggil Solana untuk mengambil akun milik program, di mana serialisasi data blok adalah bagian dari data yang diambil. Deserialisasi membutuhkan pengetahuan akan layout dari blok data.

Layout dari akun data akun dijelaskan [Di Sini](#akun-data-serialisasi)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Pemetaan Solana TS/JS Umum

[Spesifikasi Borsh](#resources) berisi sebagian besar pemetaan untuk tipe data yang primitive dan compound.

Kunci untuk TS/JS dan Python adalah membuat Skema Borsh dengan definisi yang tepat sehingga serialisasi dan deserialize dapat menghasilkan atau menjalankan input masing-masing yang bersesuaian.

Di sini kita mendemonstrasikan serialisasi dari tipe data primitive (angka, string) dan compound (array berukuran tetap, Map) pertama di TypeScript, lalu di Python dan kemudian deserialisasi yang ekuivalen di sisi Rust:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Metode Lanjutan

Kita telah menunjukkan cara membuat Payload sederhana dalam contoh sebelumnya. Kadang-kadang
Solana melempar _fastball_ pada tipe tertentu. Bagian ini akan menunjukkan pemetaan yang tepat antara TS/JS dan Rust untuk menanganinya

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Resource

- [Spesifikasi Borsh](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Dokumentasi Python Borsh](https://near.github.io/borsh-construct-py/)
- [Template Program CLI Solana](https://github.com/hashblock/solana-cli-program-template)
