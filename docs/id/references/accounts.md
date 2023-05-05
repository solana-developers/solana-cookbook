---
title: Akun
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Referensi Akun
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Referensi Akun
  - - meta
    - name: description
      content: Belajar tentang akun di Solana dan cara menggunakannya di program.
  - - meta
    - name: og:description
      content: Belajar tentang akun di Solana dan cara menggunakannya di program.
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

# Akun

## Bagaimana cara membuat sebuah sistem akun

Membuat sistem akun (_system account_) yang dimiliki oleh [System Program][1].  Solana runtime akan memberikan akses ke pemilik akun, akses untuk menulis ke dalam datanya sendiri dana mentransfer lamports. Ketika membuat sebuah account, kita harus mempersiapkan kapasitas penyimpanan tetap dalam bytes
(`space`) dan lamports yang cukup untuk mencover rent. [Rent][2] adalah biaya yang ditimbulkan untuk menjaga agar account tetap hidup di Solana.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mengkalkulasi biaya akun

Menjaga agar akun tetap hidup di Solana membutuhkan biaya penyimpanan yang disebut dengan [rent][2]. Sebuah akun dapat dikecualikan sepenuhnya dari pungutan biaya rent apabila mendepositokan sekurang-kurangnya dua tahun biaya rent. Untuk kalkulasi, kita perlu mempertimbangkan jumlah data yang ingin disimpan di dalam akun.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Bagaimana cara membuat akun dengan seeds

Anda dapat menggunakan `createAccountWithSeed` untuk mengatur akun anda dibandingkan dengan membuat sejumlah keypair yang berbeda.

### Generate

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Create

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Hanya account yang dimiliki oleh system program dapat mentransfer melalui system program.
:::

## Bagaimana cara membuat PDAs

[Program derived address(PDA)][3] mirip dengan alamat normal dengan beberapa perbedaan:

1. Tanpa kurva ed25519 
2. Menggunakan program untuk masuk dibandingkan dengan private key

**Note**: PDA accounts hanya dapat dibuat oleh program. Alamat dapat dibuat di client side.

::: tip
Walaupun PDA diturunkan dari program id, itu tidak serta merta membuat PDA dimiliki oleh program yang sama. (Sebagai contoh, anda dapat menginisiasi PDA sebagai sebuah token account yang merupakan sebuah account yang dimiliki oleh token program)
:::

### Menghasilkan sebuah PDA

`findProgramAddress` akan menambah byte extra di akhir dari seed anda. `findProgramAddress` akan memulai dari 255 ke 0 dan mengembalikan public key yang pertama kali di luar kurva. Anda akan selalu mendapatkan hasil yang sama jika anda memberikan program id dan seed yang sama.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Membuat sebuah PDA

Berikut adalah contoh program untuk membuat sebuah PDA account yang dimiliki oleh program dan contoh untuk memanggil program dengan client.

#### Program

Berikut ini adalah sebuah intruksi tunggal `system_instruction::create_account` yang membuat akun dengan data teralokasi sebesar `space`, `rent_lamports` sebesar jumlah  _lamports_ dari _derived PDA_. Ini di _sign_ dengan PDA menggunakan  `invoke_signed` seperti yang telah di diskusikan sebelumnya diatas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara untuk sign sebuah PDA

PDA hanya dapat di "_sign_" dalam lingkup program.
Berikut adalah sebuah contoh program untuk "sign" dengan sebuah PDA dan memanggil program dari client.

### Program

Instruksi tunggal berikut melakukan transfer SOL dari PDA yang di derive dari seed  `escrow` ke akun. `invoke_signed` digunakan untuk sign dengan PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana Cara Mendapatkan Program Akun

Mendapatkan semua akun yang dimiliki oleh sebuah program. Refer ke [guides section](../guides/get-program-accounts.md) untuk informasi lebih lanjut seputar `getProgramAccounts` dan konfigurasinya.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Bagaimana Cara Menutup Akun

Anda bisa menutup akun (termasuk menghapus semua data yang di simpan) dengan cara menghilangkan semua SOL. (refer ke [rent][2] untuk info lebih lanjut)

#### Program


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana Cara Mendapatkan Balance Akun

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Jika kita mau mendapatkan token balance, kita harus mengetahui alamat dari sebuah token akun. Untuk info lebih lanjut, lihat  [Token References](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
