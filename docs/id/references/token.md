---
title: Interaksi dengan Token
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Interaksi dengan Token
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Interaksi dengan Token
  - - meta
    - name: description
      content: Belajar cara menggunakan, transfer dan hal lainnya dengan token di Solana
  - - meta
    - name: og:description
      content: Belajar cara menggunakan, transfer dan hal lainnya dengan token di Solana
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

# Token

## Apa yang saya perlukan untuk memulai dengan SPL-Tokens?

Setiap kali anda berinteraksi dengan tokens di Solana, anda sebenarnya berinteraksi dengan Solana Program Library Token, atau SPL-Token standard. SPL-Token standard mensyaratkan sebuah library spesifik untuk digunakan, yang anda dapat temukan dibawah ini berdasarkan bahasa anda.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## Bagaimana cara untuk membuat sebuah Token baru

Membuat token-token didapat dengan menciptakan apa yang disebut dengan sebuah "akun mint".
Akun mint ini nantinya akan digunakan untuk me-mint token-token ke sebuah akun token dan membuat supply awal.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mendapatkan sebuah token mint

Untuk mendapatkan supply yang berjalan, authority, atau decimals yang dimliki sebuah token, anda perlu mendapatkan account info untuk me-mint token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara membuat sebuah akun token

Sebuah akun token diperlukan untuk menampung token-token. Setiap token mint mempunyai sebuah akun token berbeda yang diasosiasikan dengannya.

Associated Token Accounts secara deterministik membuat akun-akun untuk setiap keypair. ATA adalah method yang direkomendasi untuk mengature akun-akun token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mendapatkan sebuah Akun Token

Setiap akun token mempunyai informasi di dalam token seperti pemilik, mint, jumlah (saldo), dan decimlas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mendapatkan saldo dari akun token

Akun token memiliki saldo token yang dapat diambil dengan sebuah single call.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Sebuah akun token hanya dapat menampung satu jenis mint. Ketika anda menspesifikasikan sebuat akun token, anda juga menspesifikasikan mintnya juga.
:::

## Bagaimana cara untuk me-mint token-token

Ketika anda me-mint token-token, anda menambah supply dan mentransfer token-token baru ke sebuah akun token spesifik.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mentransfer token-token

Anda dapat mentransfer token-token dari satu akun token ke akun token lainnya.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara membakar token-token

Anda dapat membakar token jika anda adalah pemilik dari token tersebut.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara menutup akun-akun token

Anda dapat menutup akun token jika anda tidak ingin menggunakannya lagi. Ada dua situasi:

1. Wrapped SOL - penutupan mengkonversi Wrapped SOL ke SOL
2. Token-token lainnya - Anda dapat menutupnya hanya jika saldo akun adalah 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara untuk men-set authority pada akun-akun token atau mints

Anda dapat men-set/men-update authority. Ada 4 jenis:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara untuk men-approve delegasi sebuah token

Anda dapat mengatur sebuah delegasi dengan jumlah yang diijinkan. Setelah anda atur, delegasi akan seperti pemilik lainnya dari akun token anda. `Sebuah akun token hanya dapat didelegasikan ke satu akun di saat yang bersamaan`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara menarik kembali delegasi token

Menarik kembali akan men-set delegate ke null dan men-set jumlah delegasi ke 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mengature wrapped SOL

Wrapped SOL seperti hanya token mint lainnya. Perbedaannya adalah menggunakan `syncNative` dan membuat akun-akun token khusus di alamat `NATIVE_MINT`.

### Membuat Akun Token

Sperti [Create Token Account](#create-token-account) tetapi menganti mint dengan `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Menambah Saldo

Ada dua cara untuk menambah saldo untuk Wrapped SOL

#### 1. Dengan SOL Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. Dengan Token Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Bagaimana cara mendapatkan semua akun-akun token sebagai pemilik

Anda dapat mengambil akun-akun token sebagai pemilik. Ada 2 cara untuk mendapatkannya.

1. Mendapatkan semua akun token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Filter Dengan Mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
