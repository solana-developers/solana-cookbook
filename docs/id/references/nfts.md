---
title: NFT
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | NFT
  - - meta
    - name: og:title
      content: Buku Panduan Solana | NFT
  - - meta
    - name: description
      content: Belajar cara mendapatkan metadata dari NFT, mendapatkan pemilik NFT dan mint NFT di Solana. 
  - - meta
    - name: og:description
      content: Belajar cara mendapatkan metadata dari NFT, mendapatkan pemilik NFT dan mint NFT di Solana. 
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

# Non Fungible Token (NFT)

## Cara membuat NFT

Untuk Membuat Sebuah NFT Kamu Harus:

1. Upload gambar ke IPFS seperti Arweave
2. Upload metadata json ke IPFS seperti Arweave
3. Call metaplex untuk membuat sebuah account untuk NFT

### Upload to Arweave

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/upload-arweave/upload-arweave.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/upload-arweave/upload-arweave.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/nfts/upload-arweave/upload-arweave.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/upload-arweave/upload-arweave.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Mint NFT-nya

Jika kamu sudah meng-upload gambar dan metadata, kamu bisa mint NFT dengan kode berikut.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/mint-nft/mint-nft.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/mint-nft/mint-nft.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip Catatan
Kamu tidak bisa mint sebuah NFT dari creator yang berbeda dari wallet-mu. Jika kamu mengalami creator issues, maka pastikan metadata-mu mendaftarkanmu sebagai creator. 
:::

## Cara Mendapatkan Metadata NFT

Metaplex NFTs memiliki metadata yang disimpan di Arweave. Untuk mendapatkan metadata Arweave, kamu harus mendapatkan Metaplex PDA dan decode account data.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-metadata/get-metadata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-metadata/get-metadata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara Mengetahui Pemilik Sebuah NFT


Jika kamu memiliki mint key dari sebuah NFT, kamu bisa mencari pemilik terkini dengan mengintip di token account terbesar untuk mint key tersebut.

Mengingat bahwa NFTs memiliki 1 supply, dan mereka tidak dapat dibagi, yang artinya suatu token hanya dapat dimiliki oleh satu token account setiap kalinya, sementara itu semua token account lainnya untuk mint key tersebut memiliki saldo 0.

Ketika token account terbesar sudah diidentifikasi, kita bisa mengambil pemiliknya.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-owner/get-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-owner/get-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara untuk mengambil NFT Mint Addresses

Jika kamu tau public key dari Candy Machine, kamu bisa mendapatkan daftar semua NFT mint addresses yang dihasilkan dari Candy Machine tersebut dengan menggunakan code berikut. Ingat bahwa kita bisa menggunakan filter `memcmp` karena, di v1, address dari Candy Machine selalu creator pertama.

### Candy Machine V1

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Candy Machine V2

Jika kamu menggunakan Candy Machine v2, maka pertama-tama kamu harus memiliki akses ke “Candy Machine Creator” address yang merupakan suatu PDA simpel yang menggunakan `candy_machine` dan Candy Machine v2 address sebagai seeds. Ketika kamu sudah dapat creator address, kamu bisa memakainya dengan cara yang sama dengan v1.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-v2.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-preview-v2.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Cara Mendapatkan Semua NFT dari Suatu Wallet

Ketika mendapatkan semua NFT dari sebuah wallet, kamu harus mendapatkan semua token account dan kemudian parse mana yang merupakan NFT. Ini bisa dilakukan dengan[`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) dari Metaplex js library.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-all-nfts/get-all-nfts.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-all-nfts/get-all-nfts.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
