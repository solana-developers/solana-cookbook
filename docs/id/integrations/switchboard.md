---
title: Switchboard
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Menggunakan Switchboard untuk membuat Onchain data feeds
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Menggunakan Switchboard untuk membuat Onchain data feeds
  - - meta
    - name: description
      content: Switchboard memungkinkan pembuat untuk membuka kunci kekuatan Solana dengan membuat feeds data berkinerja tinggi dari API apa pun.
  - - meta
    - name: og:description
      content: Switchboard memungkinkan pembuat untuk membuka kunci kekuatan Solana dengan membuat feeds data berkinerja tinggi dari API apa pun.
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

# Switchboard

Switchboard adalah protokol Oracle yang memungkinkan pengembang untuk menarik data on-chain untuk berbagai kasus penggunaan seperti feed harga, harga dasar NFT, statistik olahraga, atau bahkan keacakan yang dapat diverifikasi. Secara umum, Switchboard adalah sumber daya off-chain yang dapat digunakan untuk menjembatani data dengan integritas tinggi secara on-chain dan memberi daya pada web3 dan DeFi.

## Data Feeds

Switchboard menyediakan librari JavaScript/TypeScript yang disebut **@switchboard-xyz/switchboard-v2**
. Librari ini bisa digunakan untuk mendapatkan on-chain data dari feeds yang sudah ada atau bisa juga untuk mempublikasikan feeds kustom.  Pelajari lebih lanjut [here](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### Cara Baca Data Dari Aggregator Feeds

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Membuat Aggregator Feed Baru

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>





### Baca data dari aggregator feeds dalam sebuah program
Switchboard menyediakan sebuah  crate yang dinamakan **switchboard_v2**
Pelajari lebih lanjut [here](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Cara Membuat a Feeds Dari Publisher
Dokumentasi Switchboard resmi memiliki panduan mendalam tentang cara membuat feeds dari penerbit.
Cek lebih lanjut [here](https://docs.switchboard.xyz/feed/publisher).

## Oracles
Fitur unik Switchboard adalah memungkinkan Anda membuat oracle Anda sendiri dan menjalankannya secara lokal.

### Create an oracle
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.oracle.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.oracle.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Menjalan Oracle di lokal
Anda dapat menjalankan oracle secara lokal dan menetapkannya ke antrian oracle Anda sendiri untuk menguji bagaimana program Anda dapat beroperasi dalam environment production. Oracle Mainnet harus selalu dijalankan di lingkungan ketersediaan tinggi dengan beberapa kemampuan pemantauan.

#### Yang Dibutuhkan
 - Docker-compose

Buat sebuah file docker-compose.yml dengan environment variable di [Oracle Config](/integrations/switchboard.html#oracle-config)



<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Jalankan container dengan `docker-compose up`

### Konfigurasi Oracle
<table>
  <thead>
    <tr>
      <th>Env Variable</th>
      <th>Definisi</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORACLE_KEY</td>
      <td>
        <b>
          <u>Dibutuhkan</u>
        </b>
        <br />
        <b>Tipe</b> - Public Key
        <br />
        <b>Deskripsi</b> - Public key dari sebuah  oracle account yang sudah mendapatkan izin untuk menggunakan oracle queue <br />
      </td>
    </tr>
    <tr>
      <td>HEARTBEAT_INTERVAL</td>
      <td>
        <b>
          <u>Opsional</u>
        </b>
        <br />
        <b>Tipe</b> - Number (detik)
        <br />
        <b>Default</b> - 30
        <br />
        <b>Deskripsi</b> - detik antara oracle heartbeats. Queues bisa memiliki oracle heartbeat yang berbeda. Nilai yang direkomendasikan adalah 15
      </td>
    </tr>
    <tr>
      <td>GCP_CONFIG_BUCKET</td>
      <td>
        <b>
          <u>Opsional</u>
        </b>
        <br />
        <b>Tipe</b> - GCP Resource Path
        <br />
        <b>Default</b> - Cari file configs.json di folder, jika tidak ditemukan maka tidak ada config yang di load.
        <br />
        <b>Deskripsi</b> - Mengandung API keys untuk private API endpoints
      </td>
    </tr>
    <tr>
      <td>UNWRAP_STAKE_THRESHOLD</td>
      <td>
        <b>
          <u>Optsonal</u>
        </b>
        <br />
        <b>Tipe</b> - Number (jumlah SOL, Contoh. 1.55)
        <br />
        <b>Default</b> - 0, disabled.
        <br />
        <b>Deskripsi</b> - Jumlah saldo Solana untuk memicu tindakan pasak yang dibuka (_unwrap stake action_). Ketika balance Solana oracle turun di bawah ambang batas yang ditetapkan, node akan secara otomatis membuka dana dari dompet staking oracle, menyisakan setidaknya 0,1 wSOL atau 10% lebih banyak dari persyaratan stake minimum antrian.
      </td>
    </tr>
  </tbody>
</table>

## Fungsi Random yang Terverifikasi - Verifiable Random Function(VRF)
Verifiable Random Function (VRF) adalah fungsi pseudorandom dari  public-key yang menyediakan bukti bahwa output telah di kalkukasi secara benar.
### Membaca akun VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Membuat Sebuah Akun VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  

</SolanaCodeGroup>

### Request Randomness dari akun  vrf

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/request.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/request.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## Sumber
### API dan Librari
 - [Switchboard Task Types](https://docs.switchboard.xyz/api/tasks)
 - [Rust API Docs](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Typescript API Docs](https://docs.switchboard.xyz/api/ts)
 - [Python API Docs](https://docs.switchboard.xyz/api/py)
 - [CLI Docs](https://docs.switchboard.xyz/api/cli)
### Contoh
 - [[Client] Custom Data Feed Walkthrough](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Program] Anchor Feed Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Program] Anchor VRF Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)
### Informasi Lebih Lanjut
 - [Protocol Documentation](https://docs.switchboard.xyz/introduction)
 - [SuperteamDAO Deep Dive](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)

