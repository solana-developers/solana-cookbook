---
title: Instalasi
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Instalasi
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Instalasi
  - - meta
    - name: description
      content: Belajar bagaimana memulai mengembangkan aplikasi di Solana dengan beragam tutorial, panduan dan contoh-contoh.
  - - meta
    - name: og:description
      content: Belajar bagaimana memulai mengembangkan aplikasi di Solana dengan beragam tutorial, panduan dan contoh-contoh.
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

## Unduh Web3.js

Ada beberapa libraries yang bisa anda gunakan, dimulai dengan javascript atau typescript di Solana. <br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) adalah library yang mempunyai banyak fungsi dasar di Solana untuk interaksi, mengirim transaksi, dan membaca dari blockchain. 

Anda bisa melakukan instalasi library ini dengan cara berikut : 

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### SPL-Token

`@solana/spl-token` adalah sebuah library yang didalamnya terdapat banyak javascript/typescript yang diperlukan untuk berinteraksi dengan token SPL.  
Anda bisa menggunakan library ini untuk mint token SPL baru, mentransfer token, dan banyak hal lainnya.

Anda bisa menginstal library ini dengan cara berikut: 

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### Wallet-Adapter

Berikut ini adalah koleksi dari berbagai library yang bisa membantu untuk bootstrap koneksi wallet di dalam Solana yang disebut dengan wallet-adapter.  
Saat ini paket library ini bisa digunakan di dalam Svelte, Angular, Vue.js, dan React.  Wallet-adapter bisa mempercepat integerasi dApp dengan wallet-wallet anda dengan lebih cepat seperti [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), dan banyak lagi.

Anda bisa menginstall library ini dengan cara berikut : 

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>
</CodeGroup>

## Install Rust

<CodeGroup>
  <CodeGroupItem title="MACOS" active>

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
  <CodeGroupItem title="LINUX">

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
</CodeGroup>

Untuk versi Windows, silahkan kunjungi link berikut [Rust installation site](https://www.rust-lang.org/tools/install).

## Install CLI

### macOS & Linux

Buka aplikasi terminal favorit anda. 

Ganti  `LATEST_RELEASE` dengan versi yang anda inginkan dan unduh [rilis Solana terbaru](https://github.com/solana-labs/solana/releases) di aplikasi terminal dengan menjalankan cara berikut: 

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Anda bisa mengganti `LATEST_RELEASE` dengan pencocokan tag rilis versi perangkat lunak dari rilis yang anda inginkan, atau gunakan satu dari tiga simbolis 
nama saluran : `stable`, `beta`, or `edge`. Untuk menemukan rilis terbaru, periksa versi yang tersedia [di sini](https://github.com/solana-labs/solana/releases). 

Berikut adalah hasil yang keluar menunjukan jika pembaharuan berhasil:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Tergantung dari sistem operasi anda, pesan akhir dari sebuah proses instalasi akan meminta anda untuk 

```bash
Please update your PATH environment variable to include the solana programs:
```

Jika kamu mendapat pesan diatas, kamu bisa salin dan tempel perintah yang diarankan di bawah ini untuk memperbarui 'PATH'.

Konfirmasikan bahwa anda telah menginstal versi 'Solana' yang diinginkan dengan menjalankan :

```bash
solana --version
```

Setelah instalasi berhasil, `solana-install update` bisa digunakan untuk memperbarui perangkat lunak Solana ke versi yang lebih baru kapan saja.

#### Mengunduh Binaries (Linux)

Cara alternatif lainnya, anda bisa mengunduh dari binari alih-alih menggunakan Solana-Install.

Unduh binaries melalui arahan di link berikut
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
unduh **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, lalu ekstrak yang diarsipkan:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Mengunduh Binaries (macOS)

Alternatif lain, anda bisa mengunduh dari binari alih-alih menggunakan Solana-Install.

Unduh binaries melalui arahan di link berikut
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
unduh **solana-release-x86_64-apple-darwin.tar.bz2**, lalu ekstrak yang diarsipkan:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Buka Command Prompt (`cmd.exe`) sebagai Administrator.

Cari command prompt di bar pencarian windows. Ketika aplikasi command prompt muncul, klik kanan pada mouse dan pilih "Buka sebagai Administrator" Jika anda diminta oleh muncul jendela pertanyaan "Apakah kamu ingin mengizinkan aplikasi ini untuk membuat perubahan pada perangkat anda?", click "Yes".

Salin dan tempel perintah berikut, lalu tekan enter untuk mengunduh Solana installer ke direktori sementara:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Jika `v1.9.16` bukan versi yang anda inginkan, cari versi terbaru [here](https://github.com/solana-labs/solana/releases).

Salin dan tempel perintah berikut, lalu tekan enter untuk mengunduh versi terbaru dari Solana. Jika kamu melihat jendela security dari sistem anda, tolong pilih untuk mengizinkan agar program bisa berjalan.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Untuk menemukan versi terbaru, Anda bisa cek versi yang ada [here](https://github.com/solana-labs/solana/releases).

Ketika instalasi telah berhasil, tekan enter.

Keluar dari command prompt window dan buka lagi command prompt window yang baru sebagai pengguna normal.

Cari command prompt di search bar window, lalu klik kiri pada aplikasi command prompt ikon (tidak diperlukan untuk menjalankan ini sebagai administrator).

Konfirmasi bahwa anda telah memiliki versi `solana` yang diunduh telah sesuai dengan yang diinginkan dengan memasukan :

```bash
solana --version
```

Setelah instalasi berhasil, `solana-install update` bisa digunakan dengan mudah untuk memperbarui perangkat lunak Solana ke versi yang lebih baru kapan saja.

#### Mengunduh Binaries

Alternatif lain, kamu bisa menginstal dari binari alih-alih menggunakan solana-install.

Unduh binari dengan mengikuti navigasi berikut 
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
unduh **solana-release-x86_64-pc-windows-msvc.tar.bz2**, lalu ekstrak arsip menggunakan WinZip atau aplikasi serupa.

Buka command prompt dan arahkan ke direktori dimana anda mengekstrak binari dan jalankan:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Membangun dari Source 

Jika anda tidak bisa menggunakan binari yang dibangun sebelumnya atau lebih memilih untuk membangun sendiri dari source code, bisa anda lihat di link berikut [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), dan unduh arsip **Source Code**. Extrak kode dan bangun binari dengan :

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Kemudian Anda bisa menjalankan perintah berikut untuk mendapatkan hasil yang sama seperti dengan binari bawaan:

```bash
solana-install init
```
