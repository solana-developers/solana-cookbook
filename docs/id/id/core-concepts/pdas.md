
---
title: Program Derived Addresses (PDAs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | PDAs
  - - meta
    - name: og:title
      content: Solana Cookbook | PDAs
  - - meta
    - name: description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Buku Memasak Solana.
  - - meta
    - name: og:description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Buku Memasak Solana.
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

# Program Derived Addresses (PDAs)

Program Derived Addresses (PDAs) adalah tempat seperti rumah untuk akun-akun yang dibentuk untuk dikendalikan oleh suatu program tertentu. Dengan PDAs, program bisa memmverifikasi alamat tertentu secara terprogram tanpa membutuhkan private key. PDAs berfungsi sebagai fondasi untuk [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), yang memungkinkan applikasi Solana dapat disusun satu sama lain.

## Facts

::: tip Fact Sheet
- PDAs adalah string 32 byte yang mirip seperti public key, namun tidak memiliki private key yang sesuai
- `findProgramAddress` akan menurunkan sebuah PDA dari programld dan seeds (kumpulan byte) secara deterministik
- Satu byte (bump) digunakan untuk mendorong sebuah potential PDA keluar dari kurva ekliptik ed25519
- Program bisa memverifikasi PDA-nya dengan menyediakan seeds dan bump untuk [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Sebuah PDA bisa diverifikasi oleh program asalnya
- Selain untuk mengizinkan program diverifikasi dengan instruksi lain, PDA juga menyediakan hashmap-like interface untuk [indexing accounts](../guides/account-maps.md)
:::

# Deep Dive

PDAs adalah bahan bangunan esensial untuk mengembangkan program di Solana. Dengan PDA, program-program dapat memferivikasi akun sembari menjamin tidsk ada pengguna dari luar yang bisa memverifikasi akun yang sama. Selain memverifikasi akun, program tertentu juga dapat memodifikasi akun dalam PDA masing-masing.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Generating PDAs

Untuk memahami konsep PDA, akan sangat membantu untuk memandang PDA sebagai sesuatu yang “ditemukan” dan bukan “diciptakan”. PDA sihasilkan dari kombinasi seeds (seperti string `“vote_account”`) dan sebuah program id. Kombinasi seeds ini kemudian dijalankan melalui sebuah fungsi  sha256 hash untuk melihat bahwa mereka menghasilkan sebuah public key yang mendarat di kurva ekliptik ed25519.
Dalam menjalankan program id dan seeds dengan sebuah fungsi hash, ada 50% kemungkinan menghasilkan sebuah public key yang valid namun tidak mendarat tepat di kurva ekliptik. Dalam kasus ini, yang dapat dilakukan adalah menambahkan sesuatu (fudge) untuk mendorong input dan uji coba ulang. Istilah teknis dari fudge ini adalah bump. Dalam Solana, dimulai dengan bump = 255 dan secara perlahan turnkan nilainya bump = 254, bnump = 253 dan seterusnya. Sampai dengan lokasi yang tidak mendarat dalam kurva ekliptik. Cara ini memang belum sempurna, namun ketika membuahkan hasil, ini memberikan cara menurunkan PDA yang sama berulang kali. 

![PDA on the ellipitic curve](./pda-curve.png)

### Berinteraksi dengan PDAs

Ketika sebuah PDA dihasilkan, `findProgramAddress` akan mengembalikan alamat dan juga bump yang digunakan untuk mengeluarkannya dari kurva ekliptik. Dilengkapi dengan bump ini, sebuah program dapat [memverifikasi](../references/accounts.md#sign-with-a-pda) instruksi apapun yang dibutuhkan oleh PDA tersebut. Untuk memverifikasi, program harus meloloskan instruksi, sejumlah akun, dan seeds yang digunakan untuk menurunkan PDA ke `invoke_signed`. Selain memverifikasi instruksi, PDA juga harus memverifikasi hasilnya via `invoke_signed`.

Ketika pembuatan dangan PDA, sangatlah umum untuk [menyimpan *bump seed*](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) di data akun tersebut. Hal ini mengizinkan pada developer untuk memvalidasi sebuah PDA tanpa harus melewati bump sebagai argumen instruksi.

## Sumber lainnya
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
