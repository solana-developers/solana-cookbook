---
title: NFTs
head:
  - - meta
    - name: title
      content: คู่มือ Solana | NFTs
  - - meta
    - name: og:title
      content: คู่มือ Solana | NFTs
  - - meta
    - name: description
      content: เรียนรู้วิธีดึงข้อมูล NFT metadata, NFT owners, mint NFTs บน Solana, และอื่นๆ
  - - meta
    - name: og:description
      content: เรียนรู้วิธีดึงข้อมูล NFT metadata, NFT owners, mint NFTs บน Solana, และอื่นๆ
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

# Non Fungible Tokens (NFTs)

## วิธีสร้าง an NFT

ในการสร้าง NFT เราจะต้อง:

1. Upload รูป (image) ​ไปที่ IPFS เช่น Arweave
2. Upload json metadata ไปที่ IPFS เช่น Arweave
3. เรียกใช้ metaplex เพื่อสร้าง account สำหรับ NFT

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

### Mint the NFT

ถ้าเรามีรูป และ metadata ที่ upload ไปแล้วเราก็สามารถ mint NFT ได้เลยด้วย code ต่อไปนี้

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

::: tip Note
เราไม่สามารถ mint NFT ด้วย creator อื่นนอกจาก wallet ของเราได้
ถ้าเจอปัญหาเกี่ยวกับ creator ให้ลองดูว่ามีเราเป็น creator อยู่ในรายชื่อของ metadata นั้นๆ ด้วย
:::

## วิธีดึงข้อมูล NFT Metadata

Metaplex NFTs มี metadata เก็บอยู่บน Arweave ในการที่จะดึงข้อมูล Arweave metadata เราต้องหา Metaplex PDA และแกะ account data

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

## วิธีดึงข้อมูลเจ้าของ (owner) ของ NFT

ถ้าเรามี mint key ของ NFT เราจะสามารถหา owner ปัจจุบันได้ด้วยการดู largest token account สำหรับ mint key นั้นๆ

เพราะ NFTs มี supply อยู่เพียง 1 ชิ้น และมันถูกแบ่งแยกไม่ได้ หมายความว่ามีเพียงหนึ่ง token account ที่จะถือ token ในเวลานั้น โดย token accounts อื่นสำหรับ mint key นั้นจะมี balance เป็น 0

ก็แปลว่าเมื่อเราหาlargest token account  ได้เราก็จะสามารถรู้ว่า owner เป็นใคร

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

## วิธีดึงข้อมูล NFT Mint Addresses

ถ้าเรารู้ public key ของ Candy Machine เราก็จะสามารหารายชื่อของ NFT mint addresses ที่สร้างจาก Candy Machine นั้นๆ โดยใช้ code ต่อไปนี้ ซึ่งเราสามารถ ใช้ `memcmp` filter เพราะใน v1 นั้น creator คนแรกจะเป็น address ของ andy Machine เสมอ

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

ถ้าเราใช้ Candy Machine v2 เราต้องหา "Candy Machine Creator" address ซึ่งมันคือ PDA โดยใช้ `candy_machine` และ Candy Machine v2 address เป็น seeds. เวลาที่เราได้ creator address มาแล้วเราก็ สามารถ ใช้มันได้เหมือน v1 เลย

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

## วิธีดึงข้อมูลทุก NFTs จาก wallet?

เวลาจะหา NFTs จาก wallet เราจะต้องการ token accounts และแปลง (parse) หาว่าอันไหนเป็น NFTs เราสามารถทำได้โดยใช้ [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) จาก Metaplex js library.

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
