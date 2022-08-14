---
title: Percobaan ulang transaksi
head:
  - - meta
    - name: title
      content: Solana Cookbook | Percobaan Ulang Transaksi
  - - meta
    - name: og:title
      content: Solana Cookbook | Percobaan Ulang Transaksi
  - - meta
    - name: description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana Cookbook.
  - - meta
    - name: og:description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana Cookbook.
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

# Percobaan Ulang Transaksi

Pada beberapa kesempatan, transaksi yang terlihat valid mungkin dibatalkan sebelum dimasukkan ke dalam block. Ini paling sering terjadi saat ada kemacetan jaringan, ketika node RPC gagal melakukan rebroadcast transaksi ke [leader](https://docs.solana.com/terminology#leader). Bagi end-user, mungkin transaksi mereka tampak seolah-olah hilang sama sekali. Disaat node RPC telah dilengkapi dengan algoritma generic rebroadcasting, pengembang aplikasi juga mampu mengembangkan logika rebroadcasting kustom mereka sendiri.


## Fakta
::: tip Lembar Fakta
- Node RPC akan mencoba untuk melakukan rebroadcast ulang transaksi menggunakan algoritma generik
- Pengembang aplikasi dapat menerapkan logika penyiaran ulang kustom mereka sendiri
- Pengembang dapat memanfaatkan parameter `maxRetries` pada metode JSON-RPC `sendTransaction`
- Pengembang harus mengaktifkan pemeriksaan sebelum broadcast untuk mendeteksi kesalahan sebelum transaksi diajukan
- Sebelum menandatangani ulang transaksi apa pun, **sangat penting** untuk memastikan bahwa blockhash transaksi awal telah kedaluwarsa
:::

## Perjalanan dari sebuah Transaksi

### Bagaimana Klien Mengirimkan Transaksi

Di Solana, tidak ada konsep mempool. Semua transaksi, baik itu dimulai oleh program atau oleh end-user, secara efisien diarahkan ke leader sehingga mereka dapat diproses menjadi block. Ada dua cara utama di mana transaksi dapat dikirim ke leader:
1. Dengan proxy melalui server RPC dan [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) metode JSON-RPC
2. Langsung ke leader melalui [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

Sebagian besar end-user akan mengirimkan transaksi melalui server RPC. Ketika klien mengajukan transaksi, node RPC penerima pada gilirannya akan mencoba untuk melakukan broadcast transaksi ke leader saat ini dan berikutnya. Sampai transaksi diproses oleh leader, tidak ada catatan transaksi di luar yang diketahui oleh klien dan node RPC yang mengirimkan. Dalam kasus TPU client, rebroadcast dan leader forwarding ditangani sepenuhnya oleh perangkat lunak klien.
![Perjalanan Transaksi](./retrying-transactions/tx-journey.png)

### Bagaimana Node RPC melakukan broadcast Transaksi
Setelah node RPC menerima transaksi melalui `sendTransaction`, node tersebut akan mengubah transaksi menjadi paket [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) sebelum meneruskannya ke leader terkait. UDP memungkinkan validator untuk berkomunikasi dengan cepat satu sama lain, tetapi tidak memberikan jaminan apa pun terkait pengiriman transaksi.

Karena jadwal leader Solana diketahui sebelum setiap [zaman](https://docs.solana.com/terminology#epoch) (~2 hari), node RPC akan menyiarkan transaksinya langsung ke pemimpin saat ini dan selanjutnya. Ini berbeda dengan gossip protocol lain seperti Ethereum yang menyebarkan transaksi secara acak dan luas di seluruh jaringan. Secara default, node RPC akan mencoba meneruskan transaksi ke leader setiap dua detik hingga transaksi diselesaikan atau hash block transaksi kedaluwarsa (150 block atau ~ 1 menit 19 detik pada saat penulisan ini). Jika ukuran antrian rebroadcast yang belum diselesaikan lebih besar dari [10.000 transaksi](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20), transaksi yang baru dikirimkan tidak akan diproses. Ada [argument] command-line (https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) yang dapat disesuaikan oleh operator RPC untuk mengubah default behaviour dari logika percobaan ulang ini.

Saat node RPC melakukan broadcast transaksi, node tersebut akan mencoba meneruskan transaksi ke [Transaction Processing Unit (TPU)] leader (https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator .rs#L867). TPU memproses transaksi dalam lima fase berbeda:
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![Ringkasan TPU](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Gambar Atas Perkenan Jito Labs</small>

Dari kelima fase ini, Fetch Stage bertujuan untuk menerima transaksi. Dalam Fetch Stage, validator akan mengkategorikan transaksi yang masuk berdasarkan tiga port berikut:
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) menangani transaksi reguler seperti transfer token, NFT mint, dan instruksi program
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) berfokus secara eksklusif pada transaksi pemungutan suara
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) meneruskan paket yang belum diproses ke leader berikutnya jika leader saat ini tidak dapat memproses semua transaksi

Untuk informasi lebih lanjut tentang TPU, silakan lihat [tulisan luar biasa ini oleh Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).
## Bagaimana Transaksi dapat dibatalkan

Sepanjang perjalanan transaksi, ada beberapa skenario di mana transaksi dapat secara tidak sengaja dibatalkan dari jaringan.
### Sebelum transaksi diproses

Jika jaringan menghentikan sebuah transaksi, kemungkinan besar jaringan akan melakukannya sebelum transaksi diproses oleh leader. UDP [packet loss](https://en.wikipedia.org/wiki/Packet_loss) adalah alasan paling sederhana mengapa hal ini dapat terjadi. Selama masa beban jaringan yang intens, validator juga mungkin kewalahan oleh banyaknya transaksi yang perlu diproses. Meskipun validator telah diatur untuk meneruskan surplus transaksi melalui `tpu_forwards`, ada batasan jumlah data yang dapat [diforward](https://github.com/solana-labs/solana/blob/master/core/src /banking_stage.rs#L389). Selanjutnya, tiap forward hanya terbatas pada satu hop antara validator. Artinya, transaksi yang diterima pada port `tpu_forwards` tidak diteruskan ke validator lain.

Ada juga dua alasan yang kurang diketahui mengapa suatu transaksi dapat dibatalkan sebelum diproses. Skenario pertama melibatkan transaksi yang dikirimkan melalui RPC pool. Kadang-kadang, bagian dari RPC pool bisa ada di depan yang lainnya yang merupakan bagian RPC pool yang sama. Ini dapat menyebabkan masalah ketika node dalam pool yang sama perlu bekerja sama. Dalam contoh ini, [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) dari suatu transaksi diambil dari bagian depan pool (Backend A). Ketika transaksi dikirimkan ke bagian pool yang tertinggal (Backend B), node tidak akan mengenali blockhash tadi dan akan membatalkan transaksi. Ini dapat dideteksi saat pengiriman transaksi jika developer mengaktifkan [preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) di `sendTransaction`.

![Dropped melalui RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Percabangan jaringan sementara juga dapat mengakibatkan transaksi dibatalkan. Jika validator lambat untuk memutar ulang bloknya dalam Banking Stage, ia kemudian mungkin akan membuat cabang kecil (minority fork). Saat klien membuat transaksi, transaksi mungkin merujuk ke `recentBlockhash` yang hanya ada di cabang kecil. Setelah transaksi dikirimkan, cluster kemudian dapat beralih dari cabang kecilnya sebelum transaksi diproses. Dalam skenario ini, transaksi dibatalkan karena blockhash tidak ditemukan.

![Dibatalkan karena Cabang Kecil/Minority Fork (Sebelum Diproses)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Setelah transaksi diproses dan sebelum diselesaikan

Jika transaksi mereferensikan `recentBlockhash` dari cabang kecil, transaksi masih mungkin diproses. Dalam hal ini, bagaimanapun, itu akan diproses oleh leader di cabang kecil. Ketika leader ini mencoba untuk membagikan transaksi yang diproses dengan seluruh jaringan, ia akan gagal mencapai kesepakatan dengan mayoritas validator yang tidak mengenali cabang kecil. Pada saat ini, transaksi akan dibatalkan sebelum dapat diselesaikan.

![Dibatalkan karena Cabang Kecil/Minority Fork (Setelah Diproses)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Menangani Transaksi yang dibatalkan

Meskipun node RPC akan mencoba untuk melakukan rebroadcast transaksi, algoritma yang mereka gunakan bersifat umum dan seringkali tidak cocok untuk kebutuhan aplikasi tertentu. Untuk mempersiapkan apabila terjadi  kemacetan jaringan, pengembang aplikasi harus dapat menyesuaikan logika rebroadcast mereka sendiri.

### Menelusuri lebih dalam mengenai sendTransaction

Dalam hal mengirimkan transaksi, metode RPC `sendTransaction` adalah alat utama yang tersedia untuk pengembang. `sendTransaction` hanya bertanggung jawab untuk menyampaikan transaksi dari klien ke node RPC. Jika node menerima transaksi, `sendTransaction` akan mengembalikan id transaksi yang dapat digunakan untuk melacak transaksi. Respons yang berhasil tidak menunjukkan apakah transaksi akan diproses atau diselesaikan oleh cluster.

:::tip
#### Request Parameter
- `transaction`: `string` - Transaksi yang sepenuhnya ditandatangani, sebagai string yang di encode
- (opsional) `configuration object`: `object`
     - `skipPreflight`: `boolean` - jika true, lewati pemeriksaan preflight dari transaksi (default: false)
     - (opsional) `preflightCommitment`: `string` - [Komitmen](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) level yang akan digunakan untuk simulasi preflight terhadap slot bank (default: "finalized").
     - (opsional) `encoding`: `string` - Encoding yang digunakan untuk data transaksi. Dapat menggunakan "base58" (lambat), atau "base64". (default: "base58").
     - (opsional) `maxRetries`: `usize` - Jumlah maksimum percobaan node RPC mengirimkan ulang transaksi ke leader. Jika parameter ini tidak disediakan, node RPC akan mencoba kembali transaksi hingga diselesaikan atau hingga blockhash kedaluwarsa.

#### Response
- `transaction id`: `string` - Tanda tangan transaksi pertama yang disematkan dalam transaksi, sebagai string dengan encode base-58. ID transaksi ini dapat digunakan dengan [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) untuk melakukan polling untuk pembaruan status.
:::

## Menyesuaikan Logika Rebroadcast

Untuk mengembangkan logika rebroadcast mereka sendiri, pengembang harus memanfaatkan parameter `maxRetries` `sendTransaction`. Jika disediakan, `maxRetries` akan menggantikan logika coba ulang default node RPC, yang memungkinkan developer mengontrol proses coba lagi secara manual [dalam batas yang wajar](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src /main.rs#L1258-L1274).

Pada umumnya, percobaan kembali transaksi secara manual melibatkan penyimpanan `lastValidBlockHeight` secara sementara yang berasal dari [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Setelah disimpan, aplikasi kemudian dapat [melakukan polling ketinggian block cluster](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) dan mencoba kembali transaksi secara manual dengan interval yang sesuai. Pada saat jaringan macet, akan lebih baik jika menyetel `maxRetries` ke 0 dan melakukan rebroadcast ulang secara manual melalui algoritma khusus. Di saat beberapa aplikasi mungkin menggunakan algoritma [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), yang lain seperti [Mango](https://www.mango.markets/) memilih untuk [terus mengirimkan ulang](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) transaksi pada interval konstan hingga beberapa waktu habis.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Saat melakukan polling melalui `getLatestBlockhash`, aplikasi harus menentukan level [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) yang diinginkan. Dengan menetapkan commitmentnya ke `confirmed` (diberi suara) atau `finalized` (~30 blok setelah `confirmed`), aplikasi dapat menghindari polling blockhash dari cabang kecil/fork minoritas.

Jika aplikasi memiliki akses ke node RPC di belakang load balancer, aplikasi juga dapat memilih untuk membagi beban kerjanya di antara node tertentu. Node RPC yang melayani permintaan data yang intensif seperti [getProgramAccounts](./get-program-accounts.md) mungkin cenderung tertinggal dan tidak cocok untuk juga meneruskan transaksi. Untuk aplikasi yang menangani transaksi yang time-sensitive, mungkin lebih bijaksana untuk memiliki node khusus yang hanya menangani `sendTransaction`.

### Dampak apabila Melewatkan Preflight

Secara default, `sendTransaction` akan melakukan tiga pemeriksaan preflight sebelum mengirimkan transaksi. Secara khusus, `sendTransaction` akan:
- Verifikasi apabila semua tanda tangan valid
- Periksa apakah blockhash yang direferensikan berada dalam 150 blok terakhir
- Simulasikan transaksi terhadap slot bank yang ditentukan oleh `preflightCommitment`

Jika salah satu dari tiga pemeriksaan preflight ini gagal, `sendTransaction` akan memunculkan error sebelum mengirimkan transaksi. Pemeriksaan preflight sering kali dapat menjadi perbedaan antara kehilangan transaksi dan memungkinkan klien menangani kesalahan dengan baik. Untuk memastikan bahwa kesalahan umum ini telah diperhitungkan, sebaiknya pengembang tetap mengatur `skipPreflight` ke `false`.

### Kapan Menandatangani Ulang Transaksi

Terlepas dari semua upaya untuk rebroadcast, mungkin ada saat-saat di mana klien perlu menandatangani ulang transaksi. Sebelum menandatangani ulang transaksi apa pun, **sangat penting** untuk memastikan bahwa blockhash transaksi awal telah kedaluwarsa. Jika blockhash awal masih valid, ada kemungkinan kedua transaksi tersebut diterima oleh jaringan. Bagi end-user, ini akan tampak seolah-olah mereka secara tidak sengaja mengirim transaksi yang sama dua kali.

Di Solana, transaksi yang dibatalkan dapat dibuang dengan aman setelah blockhash yang dirujuknya lebih lama dari `lastValidBlockHeight` yang diterima dari `getLatestBlockhash`. Pengembang harus melacak `lastValidBlockHeight` ini dengan menjalankan [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) dan membandingkan dengan `blockHeight` dari respons yang diterima. Setelah blockhash tidak valid, klien dapat masuk kembali dengan blockhash yang baru dibuat.

## Ucapan Terima Kasih

Terima kasih banyak kepada Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), dan [Jito Labs](https ://twitter.com/jito_labs) atas ulasan dan umpan balik mereka.