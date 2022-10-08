---
title: Peta Akun
---

# Peta Akun

Peta (_Maps_) adalah sebuah struktur data yang sering kita gunakan dalam pemrograman untuk mengaitkan sebuah **kunci** dengan suatu **nilai**. Kunci dan nilai ini dapat bertipe data apa saja. Kunci ini berperan sebagai pengenal dari nilai yang diberikan yang sedang disimpan. Kunci dari peta ini memungkinkan kita untuk memasukkan, mengambil dan memperbarui nilai tersebut secara efisien.

Model dari akun Solana seperti yang kita ketahui memerlukan data program dan data posisi saat itu untuk dapat disimpan di akun yang berbeda. Akun tersebut memiliki alamat yang berkaitan dengan diri mereka. Hal ini sendiri sebenarnya merupakan sebuah peta! Pelajari lebih lanjut mengenai model akun solana [disini][AccountCookbook].

Jadi, tentunya masuk akal untuk menyimpan **nilai** di akun yang berbeda, dengan alamat berperan sebagai **kunci** yang dibutuhkan untuk mengambil nilainya. Tetapi terdapat beberapa masalah yang muncul akibat metode ini, antara lain

* Alamat - alamat yang disebutkan di atas kemungkinan besar bukanlah sebuah **kunci** yang ideal, yang dapat Anda ingat dan gunakan untuk mengambil nilai yang diperlukan.

* Alamat - alamat yang disebutkan di atas merujuk ke kunci publik dari **Pasangan Kunci** yang berbeda, dimana setiap kunci publik (atau *alamat*) memiliki **kunci pribadi** yang berkaitan dengannya. Kunci pribadi ini akan diperlukan untuk menandatangani instruksi yang berbeda jika dan bila diperlukan, mengharuskan kita untuk menyimpan kunci pribadi di suatu tempat, yang tentunya **tidak** direkomendasikan!

Ini menghadirkan masalah yang dihadapi banyak pengembang Solana, yang menerapkan logika seperti `Peta` ke dalam program mereka. Mari kita lihat beberapa cara bagaimana kita akan mengatasi masalah ini,

## Menghasilkan PDA

PDA adalah singkatan dari [Program Derived Address][PDA], dan secara singkat merupakan alamat - alamat yang **diperoleh** dari sekumpulan benih, dan id program (atau _alamat_).

Hal unik tentang PDA adalah, alamat ini **tidak** terkait dengan kunci pribadi apa pun. Ini karena alamat ini tidak terletak pada kurva ED25519. Oleh karena itu, **hanya** program dari mana _alamat_ ini diturunkan yang dapat menandatangani instruksi dengan kunci tersebut, dengan menyediakan benih juga. Pelajari lebih lanjut tentang ini [di sini][CPI].

Sekarang setelah mengetahui apa itu PDA, mari kita gunakan mereka untuk memetakan beberapa akun! Kita akan mengambil sebuah contoh dari sebuah program **Blog** untuk mendemonstrasikan bagaimana hal ini dapat diimplementasikan.

Di dalam program Blog ini, kita ingin agar setiap `Pengguna` untuk memiliki sebuah `Blog`. Blog ini dapat memiliki sejumlah `Artikel`. Itu berarti kita **memetakan** setiap pengguna ke sebuah blog, dan setiap artikel **dipetakan** ke blog tertentu.

Singkatnya, ada pemetaan `1:1` antara pengguna dan blognya, sedangkan pemetaan `1:N` antara blog dan artikelnya.

Untuk pemetaan `1:1`, kita ingin alamat blog diturunkan **hanya** dari penggunanya, yang memungkinkan kita mengambil blog berdasarkan otoritasnya (atau _pengguna_). Oleh karena itu, benih untuk blog akan terdiri dari **kunci otoritas**, dan mungkin awalan **"blog"**, untuk bertindak sebagai pengenal tipe.

Untuk pemetaan `1:N`, kita ingin setiap alamat artikel diturunkan **tidak hanya** dari blog yang terkait dengannya, tetapi juga **pengidentifikasi** lain, yang memungkinkan kita untuk membedakan antara `N ` jumlah artikel di blog. Dalam contoh di bawah ini, setiap alamat artikel diturunkan dari **kunci blog**, sebuah **slug** untuk mengidentifikasi setiap postingan, dan awalan **"post"**, untuk bertindak sebagai pengenal tipe.

Untuk kodenya dapat dilihat pada gambar di bawah ini,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Di sisi klien, Anda dapat menggunakan `PublicKey.findProgramAddress()` untuk memperoleh alamat akun `Blog` dan `Artikel` yang diperlukan, yang dapat Anda teruskan ke `connection.getAccountInfo()` untuk mengambil data akun. Contoh ditunjukkan di bawah ini,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Akun Peta Tunggal

Cara lain untuk mengimplementasikan pemetaan adalah dengan memiliki struktur data `BTreeMap` yang disimpan secara eksplisit dalam satu akun. Alamat akun ini sendiri bisa berupa PDA, atau kunci publik dari pasangan kunci yang dihasilkan.

Metode pemetaan akun ini tidak ideal karena alasan berikut,

* Anda harus menginisialisasi akun yang menyimpan `BTreeMap` terlebih dahulu, sebelum Anda dapat memasukkan pasangan nilai kunci yang diperlukan ke dalamnya. Kemudian, Anda juga harus menyimpan alamat akun ini di suatu tempat, untuk memperbaruinya setiap saat.

* Ada batasan memori untuk sebuah akun, di mana sebuah akun dapat memiliki ukuran maksimum **10 megabita**, yang membatasi `BTreeMap` untuk menyimpan sejumlah besar pasangan nilai kunci.

Oleh karena itu, setelah mempertimbangkan kasus penggunaan Anda, Anda dapat menerapkan metode ini seperti yang ditunjukkan di bawah ini,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Kode pada sisi klien untuk menguji program di atas akan terlihat seperti yang ditunjukkan di bawah ini,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address