---
title: Jupiter
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Swap tokens menggunakan Jupiter
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Swap tokens menggunakan Jupiter
  - - meta
    - name: description
      content: Jupiter adalah agregator likuiditas utama untuk Solana, menawarkan rentang token terluas dan penemuan rute terbaik di antara pasangan token mana pun.
  - - meta
    - name: og:description
      content: Jupiter adalah agregator likuiditas utama untuk Solana, menawarkan rentang token terluas dan penemuan rute terbaik di antara pasangan token mana pun.
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

# Jupiter

Jupiter adalah agregator likuiditas utama untuk Solana, menawarkan rentang token terluas dan penemuan rute terbaik di antara pasangan token mana pun.

### Instalasi

@jup-ag/core adalah paket Core yang digunakan untuk berinteraksi dengan program on-chain jupiter untuk melakukan swap antara dua kemungkinan pasangan token.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### Mengambil List  Token dari Jupiter

Semua kemungkinan token yang dapat ditukar dengan jupiter untuk jaringan tertentu sedang diambil.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Loading instance dari Jupiter

Instance Jupiter sedang dibuat dengan konfigurasi yang disediakan. Ada banyak parameter opsional yang diperlukan instance untuk mengetahui lebih banyak tentangnya, buka [di sini](https://docs.jup.ag/jupiter-core/full-guide)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Mendapatkan RouteMap

RouteMap mengidentifikasi token apa yang dapat ditukar dengan token input yang diberikan. RouteMap hanya berisi alamat token mint dan tidak ada metadata.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/route-map/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/route-map/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Mendapatkan route dari Input dengan Output token

Metode `computeRoutes` mengambil alamat Mint input dan alamat Mint output dan memberikan semua kemungkinan rute dalam urutan harga terbaik terlebih dahulu.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/routes/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/routes/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Ekskusi  Token Swap
Metode `exchange` dipanggil di sini yang membuat transaksi untuk rute tertentu.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## How to use Jupiter in a React Application

### Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/react-hook
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/react-hook
```

  </CodeGroupItem>
</CodeGroup>

### Menambahkan  Provider

Kita menyiapkan JupiterProvider di sini untuk menggunakan useJupiter Hook Melalui Aplikasi React. Parameter cluster disetel sebagai **mainnet-beta** untuk mendapatkan berbagai macam token, tetapi jika mau, Anda juga dapat mengubahnya menjadi **devnet**

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/providerSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/providerSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Mendapatkan  List dari Token

Semua Token yang mungkin dapat ditukar dalam jaringan diambil dan disimpan di dalam state.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/react-token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/react-token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Seting State

InputMint dan OutputMint adalah status yang ditambahkan agar dapat ditukar satu sama lain atau dapat diambil dari pengguna juga.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/inputSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/inputSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Menggunakan useJupiter react hook

useJupiter Hook mengambil semua parameter yang diperlukan untuk menemukan rute yang melaluinya Token dari InputMint dan OutputMint dapat ditukar. Untuk mempelajari lebih lanjut tentang itu bisa klik [di sini](https://docs.jup.ag/jupiter-react/using-the-react-hook)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/useJupiter/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/useJupiter/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Perform Swap

Setelah memberikan semua data ke useJupiter Hook. Kita dapat menggunakan instance jupiter untuk melakukan swap menggunakan metode `exchange`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/reactSwap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/reactSwap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara Menggunakan Jupiter API

Ini adalah cara termudah untuk berinteraksi dengan program jupiter untuk menukar 2 token yang disediakan.

### Instalasi

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-serum/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-serum/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### Mendapatkan Route Map

API ini mengambil semua token yang tersedia yang dapat ditukar menggunakan API jupiter. Daftar semua kemungkinan rute token sedang diambil di sini dan `allInputMints` berisi daftar semua Token Input yang mungkin berdasarkan alamat mint dan `swappableOutputForSol` berisi semua kemungkinan token yang dapat ditukar dengan SOL dalam kasus ini.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/retriveapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/retriveapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Mendapatkan Serialisasi Transaksi untuk  perform Swap
Permintaan POST API dilakukan dengan rute yang ingin kita tuju dan alamat wallet pengguna ada beberapa parameter opsional yang dapat ditambahkan ke api ini seperti **wrapUnwrapSOL** dan **feeAccount** untuk mempelajarinya lebih lanjut buka dokumen resmi di sini [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/getTxapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/getTxapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Eksekusi Transaksi Swap
Objek Transaksi dibuat dan kemudian ditandatangani oleh pengguna.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/executeapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/executeapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Sumber Lainnya

- [Main Docs](https://docs.jup.ag/)
- [Jupiter Core Example Code](https://github.com/jup-ag/jupiter-core-example)
- [Jupiter React Example Code](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Jupiter API Example Code](https://github.com/jup-ag/api-arbs-example)
