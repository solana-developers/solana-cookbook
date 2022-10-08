---
title: Menulis Program
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Referensi Program Solana
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Referensi Program Solana
  - - meta
    - name: description
      content: Belajar cara membuat sebuah program di Solana dengan referensi invokasi cross program, membaca akun, dan lainnya.
  - - meta
    - name: og:description
      content: Belajar cara membuat sebuah program di Solana dengan referensi invokasi cross program, membaca akun, dan lainnya.
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

# Menulis Program

## Bagaimana cara mentransfer SOL di dalam sebuah program

Program Solana anda dapat mentransfer lamports dari sebuah akun ke akun lainnya tanpa 'invoke' program system. Aturan dasar adalah program anda dapat mentransfer lamports dari akun mana saja yang **dimiliki** oleh program anda ke semua akun.

Penerima akun **tidak harus menjadi** sebuah akun yang dimilik oleh program anda. 

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Bagaimana cara mendapatkan waktu dalam sebuah program

Mendapatkan waktu dapat dilakukan melalui 2 cara

1. Passing `SYSVAR_CLOCK_PUBKEY` ke sebuah instruksi
2. Mengakses waktu secara langsung di dalam sebuah instruksi.

Adalah baik untuk mengetahui dua cara tersebut, karena beberapa legacy program masih memerlukan `SYSVAR_CLOCK_PUBKEY` sebagai sebuah akun.

### Passing Waktu sebagai sebuah account di dalam sebuah instruksi

Mari membuat sebuah instruksi yang menerima sebuah akun untuk menginisiasi dan sysvar pubkey 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Now we pass the clock's sysvar public address via the client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Mengakses Waktu secara langsung di dalam sebuah instruksi 

Mari membuat sebuah instruksi yang sama, tetapi tanpa mengharapkan `SYSVAR_CLOCK_PUBKEY` dari client side.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Instruksi di client side sekarang hanya perlu diberikan state dan akun pembayar.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara merubah size akun

Anda dapat merubah size program yang dimliiki dengan mengunakan `realloc`. `realloc` dapat meresize sebuah akun sampai 10KB.
Ketika anda mengunakan `realloc` untuk menambah size dari sebuah akun, anda haru mentransfer lamport secara berurutan untuk menjaga agar akun rent-exempt.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara untuk membuat program Cross Invocation

Program cross invocaction hanya dengan memanggil instruksi program lainnya di dalam program kita. Salah satu contoh yang baik untuk menghasilkan adalah dengan fungsi `swap` di Uniswap. `UniswapV2Router` contract, memanggil logic yang diperlukan untuk swap, dana memanggil fungsi `ERC20` contract transfer untuk swap dari seseorang ke lainnya. Hal yang sama, kieta dapat memanggil sebuah instruksi program untuk dapat menghasilkan banyak tujuan.


Mari kita lihat contoh instruksi pertama kita `SPL Token Program's transfer`. Akun-akun yang kita perlukan untuk menjadikan sebuah transfer adalah

1. The Source Token Account (Akun yang memegang tokens kita)
2. The Destination Token Account (Akun yang ingin kita transferkan token kita)
3. The Source Token Account's Holder (alamat wallet kita yang akan kita gunakan untuk sign-in)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />

Korespondensi instruksi client adalah sebagai berikut. Untuk mengetahui mint dan instruksi pembuatan token, tolong lihat ke full code sekitar.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Mari sekarang lihat contoh lainnya yang adalah instruksi `System Program's create_account`. Ada beberapa perbedaan sedikit antara instruksi yang disebutkan diatas dan ini. Di atas, kita tidak pernah memerlukan `token_program` untuk dipass sebagai sebuah akun di dalam fungsi `invoke`. Namun, ada beberapa pengecualian dimana anda perlu untuk pass instruksi untuk meng-invoke `program_id`. Dalam kasus ini, itu adalah `System Program's` program_id. ("11111111111111111111111111111111"). Jadi akun-akun yang diperlukan sekarang akan menjadi

1. Akun pembayar akun yang akan mendanai rent
2. Akun yang akan dibuat
3. Akun System Program 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Code di client side akan terlihat seperti ini

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara membuat sebuah PDA

Program Derived Address hanyalah sebuah program yang dimiliki oleh program, tetapi tidak memiliki private key. Sebaliknya signature-nya didapat dari set of seeds dan sebuah bump (sebuah nonce yang memastikannya untuk keluar kurva). "**Men-generate**" sebuah Program Address berbeda dari "**membuat**"nya. Seseorang dapat mengenerate sebuah PDA dengan mengunakan `Pubkey::find_program_address`. Membuat sebuah PDA pada essensinya berarti mengininisasi alamat dengan kapasitas dan men-set state ke dalamnya. Sebuah akun Keypair normal dapat dibuat dari luar program kita dan kemudian diperintahkan untuk menginisasikan statenya. Sayangnya, untuk PDA-PDA harus dibuat dalam chain, oleh sebab naturenya yang tidak dapat disign on atas namanya sendiri.Jadi kita memerlukan `invoke_signed` untuk men-pass PDA seeds, bersama dengan signature akun yang mendanai yang menghasilkan pembuatan akun PDA.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Seseorang dapat mengirim akun yang diperlukan melalui client dalam contoh berikut

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara membaca akun

Hampir semua instruksi di dalam Solana memerlukan sekurang-kurangnya 2 - 3 akun, dan mereka perlu di-mentioned melalui instruction handlers mengenai apa yang diharapkan dari set akun tersebut. Adalah sangat mudah jika kita mengambil keuntungan dari `iter()` method dalam Rust, dibandingkan dengan men-index akun-akun secara manual. `next_account_info` method pada dasarnya men-slices index pertama yang dapat diiterasi dan mengembalikan kehadiran akun di dalam array akun-akun. Mari kita lihat instruksi sederhana yang mengharapkan beberapa akun dan perlu untuk mengurai masing-masing akun. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara men-verifikasi akun

Karena program-program di Solana adalah stateless, kita sebagai pembuat program harus memastikan validasi akun-akun yang yang dipass sebanyak mungkin untuk menghindari masuknya akun yang disusupi (_malicious_). Hal dasar yang dapat kita lakukan adalah:

1. Periksa apakah akun signer yang diharapkan bener-benar sudah sign
2. Periksa apakah state akun yang diharapkan sudah dicheck sebagai writeable
3. Periksa apakah state pemilik akun yang diharapkan adalah id program yang dipanggil
4. Jika menginisasi state untuk pertama kali, periksa apakah akun sudah ter-inisiasi atau belum.
5. Periksa apakah ada id-id cross program yang dipass (kapanpun diperlukan) sudah seperti yang diharapkan.

Dibawah ini, instruksi dasar yang menginisiasi sebuah hero state acccount, tetapi dengan pemeriksaan yang disebutkan diatas

A basic instruction which initializes a hero state account, but with the above mentioned checks is defined below

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara membaca beberapa instruksi dalam sebuah transaksi

Solana memberikan kita kemampuan untuk mengintip semua instruksi-instruksi dalam transaksi berjalan. Kita dapat menyimpannya di dalam sebuah variable dan mengulanginya lagi. Kita dapat melakukan banyak hal dengan ini, seperti memeriksa transaksi yang mencurigakan. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

