---
title: Mendapatkan Akun Program
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Mendapatkan Akun Program
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Mendapatkan Akun Program
  - - meta
    - name: description
      content: Pelajari cara query data di Solana menggunakan getProgramAccounts and accountsDB
  - - meta
    - name: og:description
      content: Pelajari cara query data di Solana menggunakan getProgramAccounts and accountsDB
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

# Mendapatkan Akun Program (getProgramAccounts)

adalah sebuah metode RPC untuk mendapatkan semua akun yang dimiliki oleh suatu program. Saat ini _pagination_ tidak didukung. Request ke `getProgramAccounts` harus menyertakan parameter `dataSlice` dan/atau `filters` untuk mempercepat waktu respon dan hanya mengembalikan hasil yang diinginkan.

## Fakta

::: tip Parameter

- `programId`: `string` - Pubkey dari program yang akan diambil, disediakan sebagai string yang di encode menggunakan base58
- (opsional) `configOrCommitment`: `object` - Parameter konfigurasi yang berisi field opsional berikut:
    - (opsional) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (opsional) `encoding`: `string` - Encoding yang digunakan untuk data akun, baik: `base58`, `base64`, atau `jsonParsed`. Catatan, pengguna web3js sebaiknya menggunakan [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (opsional) `dataSlice`: `object` - Membatasi jumlah data akun yang dikembalikan berdasarkan:
        - `offset`: `number` - Jumlah byte ke dalam data akun untuk mulai kembali
        - `length`: `number` - Jumlah byte data akun yang akan dikembalikan
    - (opsional) `filters`: `array` - Filter hasil menggunakan objek filter berikut:
        - `memcmp`: `object` - Untuk mencocokkan serangkaian byte dengan data akun:
            - `offset`: `number` - Posisi byte dalam data akun tempat dimulai perbandingannya
            - `bytes`: `string` - Data yang sedang dicocokkan berupa string yang di encode base58, dibatasi hingga 129 byte
        - `dataSize`: `number` - Membandingkan panjang data akun dengan ukuran data yang disediakan
    - (opsional) `withContext`: `boolean` - Untuk membungkus hasilnya dalam [object RpcResponse JSON](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)
:::

##### Response

Secara default `getProgramAccounts` akan mengembalikan array dari objek JSON dengan struktur berikut:

- `pubkey`: `string` - Pubkey akun berupa string yang diencode base58
- `account`: `object` - sebuah objek JSON, dengan sub-field berikut:
     - `lamports`: `number`, jumlah lamport yang dimiliki sebuah akun
     - `owner`: `string`, Pubkey dengan encode base58 dari program tempat akun tersebut dipasangkan
     - `data`: `string` | `object` - data yang terkait dengan akun, baik berupa data biner yang telah diencode atau format JSON tergantung pada parameter jenis encoding yang diberikan
     - `executable`: `boolean`, untuk mengindikasi jika akun tersebut berisi sebuah program
     - `rentEpoch`: `number`, Epoch di mana akun ini selanjutnya akan berutang sewa


## Memahami lebih dalam

`getProgramAccounts` adalah metode RPC serbaguna yang mendapatkan semua akun yang dimiliki oleh suatu program. Kita dapat menggunakan `getProgramAccounts` untuk sejumlah query yang berguna, seperti menemukan:

- Semua akun token untuk wallet tertentu
- Semua akun token untuk mint tertentu (yaitu Semua pemegang [SRM](https://www.projectserum.com/))
- Semua akun khusus untuk program tertentu (yaitu Semua pengguna [Mango](https://mango.markets/))

Terlepas dari kegunaannya, `getProgramAccounts` sering disalahpahami karena batasannya saat ini. Banyak query yang didukung oleh `getProgramAccounts` memerlukan node RPC untuk melakukan scan dari kumpulan data yang besar. Proses scan ini membutuhkan memori dan sumber daya yang intensif. Akibatnya, pemanggilan yang terlalu sering atau terlalu besar cakupannya dapat mengakibatkan connection timeout. Selanjutnya, pada saat penulisan ini, endpoint dari `getProgramAccounts` tidak mendukung pagination. Jika hasil query terlalu besar, respons akan dipecah (_truncate_).

Untuk mengatasi kendala saat ini, `getProgramAccounts` menawarkan sejumlah parameter yang berguna: yaitu, `dataSlice` dan opsi dari `filters` yaitu `memcmp` dan `dataSize`. Dengan memberikan kombinasi parameter ini, kita dapat mengurangi cakupan query kita menjadi ukuran yang dapat dikelola dan diprediksi.

Contoh umum dari `getProgramAccounts` melibatkan interaksi dengan [Program Token SPL](https://spl.solana.com/token). Meminta semua akun yang dimiliki oleh Program Token dengan sebuah [basic call](../references/accounts.md#get-program-accounts) akan melibatkan sejumlah data yang besar. Namun, dengan memberikan parameter, kita dapat meminta hanya data yang ingin kita gunakan secara efisien.

### `filters`
Parameter yang paling umum digunakan dengan `getProgramAccounts` adalah array dari `filters`. Array ini menerima dua jenis filter, yaitu `dataSize` dan `memcmp`. Sebelum menggunakan salah satu dari filter ini, kita harus terbiasa dengan bagaimana data yang kita minta ditata dan diserialisasi.

#### `dataSize`
Dalam kasus Program Token, kita dapat melihat bahwa [akun token memiliki panjang 165 byte](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Secara khusus, akun token memiliki delapan field yang berbeda, dengan masing-masing field membutuhkan jumlah byte yang dapat diprediksi. Kita dapat memvisualisasikan bagaimana data ini ditata menggunakan ilustrasi di bawah ini.

![Account Size](./get-program-accounts/account-size.png)

Jika kita ingin menemukan semua akun token yang dimiliki oleh address wallet kita, kita dapat menambahkan `{ dataSize: 165 }` ke dalam array `filters` kita untuk memperkecil cakupan query kita menjadi hanya akun yang panjangnya tepat 165 byte. Namun, ini saja tidak akan cukup. kita juga perlu menambahkan filter untuk yang mencari akun yang dimiliki oleh address kita. Kita bisa mendapatkan ini dengan filter `memcmp`.

#### `memcmp`
Filter `memcmp`, atau filter "memory comparison", memungkinkan kita untuk membandingkan data di field mana pun yang tersimpan di akun kita. Secara khusus, kita hanya dapat melakukan query untuk akun yang cocok dengan sekumpulan byte tertentu pada posisi tertentu. `memcmp` membutuhkan dua argumen:

- `offset`: Posisi untuk mulai membandingkan data. Posisi ini diukur dalam byte dan dinyatakan sebagai bilangan bulat.
- `bytes`: Data yang harus cocok dengan data akun. Ini direpresentasikan dengan string yang diencode menggunakan base-58 dan harus berukuran kurang dari 129 byte.

Penting untuk diperhatikan bahwa `memcmp` hanya akan mengembalikan hasil yang bagian dari datanya sama persis dengan `bytes`. Saat ini, `memcmp` tidak mendukung perbandingan untuk data yang kurang dari atau lebih besar dari `bytes` yang kita berikan.

Sesuai dengan contoh Program Token kita, kita dapat mengubah query kita untuk hanya mengembalikan akun token yang dimiliki oleh address wallet kita. Saat melihat akun token, kita dapat melihat dua field pertama yang disimpan di akun token adalah pubkey, dan masing-masing pubkey memiliki panjang 32 byte. Mengingat bahwa `owner` adalah field kedua, kita harus memulai `memcmp` kita pada `offset` 32 byte. Dari sini, kita akan mencari akun yang field ownernya cocok dengan address wallet kita.

![Account Size](./get-program-accounts/memcmp.png)

kita dapat memanggil query ini melalui contoh berikut:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

Di luar dua parameter filter, parameter ketiga yang paling umum untuk `getProgramAccounts` adalah `dataSlice`. Tidak seperti parameter `filters`, `dataSlice` tidak akan mengurangi jumlah akun yang dikembalikan oleh query. Sebagai gantinya, `dataSlice` akan membatasi jumlah data untuk setiap akun.

Sama seperti `memcmp`, `dataSlice` menerima dua argumen:

- `offset`: Posisi (dalam jumlah byte) untuk mulai mengambil data akun
- `length`: Jumlah byte yang harus dikembalikan

`dataSlice` sangat berguna saat kita menjalankan query pada kumpulan data yang besar tetapi sebenarnya tidak peduli dengan data akun itu sendiri. Contohnya adalah jika kita ingin menemukan jumlah akun token (yaitu jumlah pemegang token) untuk token mint tertentu.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

Dengan menggabungkan ketiga parameter (`dataSlice`, `dataSize`, dan `memcmp`), kita dapat membatasi batasan query kita dan hanya mengambil data yang kita perlukan secara efisien.

## Resource lainnya

- [Dokumentasi RPC API](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Dokumentasi Web3js](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [Dokumentasi JSON-parsed Web3js](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
