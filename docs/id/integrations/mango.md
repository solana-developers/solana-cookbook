---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Membangun di Mango Markets
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Membangun di Mango Markets
  - - meta
    - name: description
      content: Mango Markets menawarkan standar industri untuk perdagangan lintas margin yang terdesentralisasi. Pelajari cara menggunakan dan membangun di atas Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets menawarkan standar industri untuk perdagangan lintas margin yang terdesentralisasi. Pelajari cara menggunakan dan membangun di atas Mango Markets.
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

# Mango Markets

Mango menyediakan satu tempat untuk meminjamkan, meminjam, menukar, dan memanfaatkan
memperdagangkan aset kripto melalui mesin risiko on-chain.

Anda dapat terhubung ke program on-chain Mango menggunakan librari Client API.
Anda juga memerlukan librari Solana javascript API.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## Cara Mendapatkan Mango Group

A mango group adalah basket dari cross-margined tokens. Ini menyimpan info pasar yang luas tentang token, pasar dex serum, pasar pelaku, oracles, dana asuransi, dan brankas biaya. Setiap versi
market Manggo menggunakan Grup Manggo yang berbeda yang mengandung
token. Grup v3 saat ini adalah `mainnet.1`. Berikut tabel yang menunjukkan berbagai grup:

| Grup                 | Versi       | Kluster          |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Catatan
Jika Anda ingin menggunakan grup v2, Anda harus menggunakan librari klien v2. Kamu bisa menemukannya [disini](https://github.com/blockworks-foundation/mango-client-ts)
:::


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## Membuat Akun Mango

Akun Manggo dikaitkan dengan Grup Manggo, dan itu menyimpan token Anda dan memungkinkan
Anda untuk memperdagangkan market Grup itu. Anda dapat menemukan referensi [disini](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cara Deposit USDC ke Akun Manggo
Setelah membuat akun mango, kita perlu mendanainya dengan tokens untuk trading. 
Temukan referensi untuk metode deposit [disini](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cara Menempatkan Spot Order
Mango berinteraksi dengan Serum Protocol untuk menempatkan spot orders di markets. Anda dapat menempatkan spot order dengan melakukan ini. Anda dapat menemukan referensi untuk fungsi placeSpotOrder [disini](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder). 

Mango memiliki file konfigurasi yang mengandung informasi tentang groups, markets, tokens dan oracles, 
Bisa ditemukan [disini](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). Kami menggunakan informasi dari file tersebut untuk menemukan group dan market yang tepat. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cara Load Bids
Mango menggunakan informasi markets dari Serum Protocol untuk load bids. Anda bisa me-load langsung dari  Serum untuk bisa bekerja dengan Mango. Temukan lebih lanjut perihal Serum Markets [disini](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cara Load Asks
Mango menggunakan informasi market dariSerum Protocol untuk load asks. 
Kamu bisa load langsung dari Serum untuk bisa bekerja dengan Mango. Temukan lebih lanjut tentang Serum Markets  [disini](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Sumber Lainnya

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
