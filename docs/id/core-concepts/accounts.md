---
title: Akun
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Akun
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Akun
  - - meta
    - name: description
      content: Akun sangat penting untuk membangun blok dalam pengembangan Solana. Belajar tentang Akun dan konsep-konsep dasar lainnya di Buku Panduan Solana.
  - - meta
    - name: og:description
      content: Akun sangat penting untuk membangun blok dalam pengembangan Solana. Belajar tentang Akun dan konsep-konsep dasar lainnya di Buku Panduan Solana.
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

Akun-akun di dalam solana digunakan untuk menyimpan status. Akun-akun itu adalah blok yang sangat penting dalam pengembangan di Solana.

## Fakta-Fakta

::: tip Fakta

- Akun-akun digunakan untuk menyimpan data  
- Setiap akun memiliki alamat unik 
- Akun-akun memiliki ukuran maksimal yaitu 10MB (10 Mega Bytes)
- Akun-akun PDA memiliki ukuran maksimal yaitu 10KB (10 Kilo Bytes)
- Akun-akun PDA bisa digunakan untuk menandatangani atas nama program 
- Ukuran akun-akun sudah ditetapkan pada waktu pembuatan, tapi bisa dilakukan penyesuaian menggunakan [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Penyimpanan data akun dibayarkan dengan sewa
- Pemilik akun bawaan adalah Program Sistem 
 :::

## Lebih Dalam

### Model Akun 

Ada 3 macam akun di Solana : 

- Data akun penyimpan data 
- Akun program menyimpan program yang dapat dieksekusi 
- Akun Bawaan (native) yang menunjukkan program bawaan di solana seperti Sistem, Stake, dan Vote

Dalam data akun, ada 2 jenis yaitu:
- Akun-akun yang dimiliki sistem
- Akun PDA (Program Derived Address)

Setiap akun memiliki sebuah alamat (biasanya disebut public key) dan seorang pemilik (alamat dari akun program). Daftar lengkap tipe apa saja yang disimpan oleh akun dapat ditemukan di bawah ini. 

| Tipe       | Deskripsi                                            |
| ---------- | -----------------------------------------------------|
| lamports   | Jumlah lamports yang dimiliki oleh akun ini          |
| owner      | Pemilik program akun ini                             |
| executable | Apakah akun ini bisa untuk memproses intruksi        |
| data       | Array byte data mentah yang disimpan oleh akun ini   |
| rent_epoch | Di `epoch` berikutnya, akun ini akan berutang sewa   |


Berikut ini beberapa aturan penting kepemilikan :

- Hanya pemilik data akun yang bisa mengubah datanya dan data lamports
- Siapapun diizinkan untuk mengkreditkan lamports ke data akun  
- Pemilik akun dapat menetapkan pemilik baru jika data akun tidak ada

Akun program tidak menyimpan status.

Sebagai contoh, jika anda memiliki program penghitung yang memungkinkan anda menambah penghitung, anda harus membuat dua akun, satu akun untuk menyimpan kode program, dan satu untuk menyimpan konter.

![](./account_example.jpeg)

Untuk mencegah sebuah akun dihapus, anda harus membayar sewa.

### Menyewa 

Menyimpan data pada akun membutuhkan biaya berupa SOL untuk pemeliharaan, dan itu didanai oleh apa yang disebut dengan sewa. Jika anda menyediakan biaya pemeliharaan minimum yang setara untuk 2 tahun pembayaran sewa di akun, akun anda akan dibebaskan dari pembayaran sewa. Anda bisa mengambil sewa dengan menutup akun dan mengirimkan lamports kembali ke wallet anda.

Sewa dibayarkan selama dua waktu yang berbeda:
1. Ketika dirujuk oleh suatu transaksi
2. Sekali dalam satu masa `epoch`

Persentase sewa yang dikumpulkan oleh akun-akun akan dihancurkan, sementara sisanya didistribusikan untuk memilih akun di akhir setiap slot.

Jika akun tidak punya saldo yang cukup untuk membayar seewa, akun akan dibatalkan alokasinya dan datanya akan dihapus.

## Sumber Lainnya 

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

Konsep dasar ini dikreditkan ke Pencilflip. [Follow him on Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
