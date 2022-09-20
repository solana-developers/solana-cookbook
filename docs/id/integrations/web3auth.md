---
title: web3Auth (Torus Wallet)
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Wallet
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Wallet
  - - meta
    - name: description
      content: Pelajari tentang wallets, integrasi social logins, signing dan verifikasi pesan dan referensi lainnya untuk membangun diatas Solan dalam Buku Panduan Solana.
  - - meta
    - name: og:description
      content: Pelajari tentang wallets, integrasi social logins, signing dan verifikasi pesan dan referensi lainnya untuk membangun diatas Solan dalam Buku Panduan Solana.
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

# Wallet

## Apakah itu wallet?

Dompet kripto (_wallet_) adalah dompet digital yang digunakan untuk berinteraksi dengan blockchain. Ini memungkinkan Anda untuk menandatangani, memverifikasi, dan mengirim transaksi. Ada banyak solusi wallet kripto yang ada di pasaran, mulai dari aplikasi web yang mudah digunakan hingga solusi keamanan perangkat keras yang lebih kompleks.

## Social Login di Solana

[**Web3Auth**](https://docs.web3auth.io/) mengizinkan pengguna untuk sign in menggunakan akun yang sudah ada dari Web2 OAuth Providers (Facebook, Google, Twitter, dan lainnya.) ke dalam aplikasi Web3. Ini menyediakan interface dan flow yang sangat memudahkan untuk user [overview](https://docs.web3auth.io/key-infrastructure/overview) dengan pendekatkan untuk mengelola asset dan identitas user. Ini menghilangkan hambatan teknis dan mengurangi kurva pembelajaran untuk kepemilikan digital untuk semua pengguna dengan menyediakan pembungkus di sekitar manajemen kunci pribadi.

## Panduan Integrasi

Tutorial ini akan memandu Anda tentang contoh dasar untuk mengintegrasikan social login di dapp Anda.

### Instal Dependensi

Untuk mulai menggunakan wallet dengan dapp, Anda dapat menginstal `@toruslabs/solana-embed`.Anda dapat menggunakan pengelola paket populer seperti yarn dan npm untuk mengunduhnya.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslabs/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslabs/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### Import SDK dan initialize

Dalam cuplikan kode di bawah ini, kami membuat instance dari solana-embed dan kemudian menginisialisasinya dengan lingkungan pengujian yang menggunakan solana testnet. Anda dapat melewati opsi konfigurasi lain saat menginisialisasi antarmuka wallet. Anda dapat merujuk ke solana-embed. 

Rerensi untuk solana-embed [api-reference](https://docs.tor.us/solana-wallet/api-reference/class) untuk membaca lebih lanjut.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/initialize-instance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/initialize-instance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Trigger user login​

Cukup panggil `torus.login()` untuk trigger login di mana pun yang masuk akal dalam siklus flow aplikasi Anda. Memanggil metode login tanpa parameter apa pun akan membuka modal bagi pengguna untuk memilih semua login yang didukung.

![](./assets/Web3Auth/login-modal.png)

Setelah berhasil login, metode ini akan mengembalikan array dari public key. Elemen pertama dari array adalah public key dari wallet saat ini. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/login.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/login.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Menggunakan torus instance untuk mengambil detil akun user

Instance torus menyediakan antarmuka untuk interaksi seperti menandatangani transaksi dan pesan dalam status masuk. Itu juga dapat memberi kami antarmuka untuk mengakses informasi login pengguna seperti email pengguna, gambar profil, dll. (tergantung pada metode login)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/user-info.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/user-info.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Menggunakan Torus Solana API untuk sign sebuah pesan.

Untuk mengirim pesan untuk ditandatangani pengguna, aplikasi web harus menyediakan string yang disandikan UTF-8 sebagai Uint8Array.

Setiap kali pengguna ingin menandatangani pesan, wallet akan membuka jendela konfirmasi.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/sign-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/sign-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Mirip, kamu juga bisa menggunakan [signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) dan `signAllTransactions` di torus instance untuk signing single atau multiple transaksi.

### Menggunakan torus Solana API untuk mengirim transaksi.​

Untuk mengirim transaksi, seseorang hanya perlu memanggil metode `sendTransaction` pada instance torus dan meneruskan `Transaction`.

Wallet akan membuka jendela konfirmasi. Setelah disetujui, SDK menandatangani dan mengirimkan transaksi ke blockchain.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/send-transaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/send-transaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Topup

Untuk saat ini, API hanya mendukung topup dari Moonpay.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/topup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/topup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Logout

Untuk logout user, bisa dilakukan dengan memanggil fungsi `logout` di torus wallet instance.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/logout.en.ts)

  </template>
    
  <template v-slot:preview>
    
@[code](@/code/wallet/Web3Auth/logout.preview.en.ts)
    
  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Sumber

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Api Reference](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Hosted Demo](https://demo-solana.tor.us/)
* [Sample React Integration](https://github.com/torusresearch/solana-embed-react-demo)
* [Solana Wallet](https://solana.tor.us/)