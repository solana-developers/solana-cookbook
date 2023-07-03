---
title: 非同質化代幣 (NFTs)
head:
  - - meta
    - name: title
      content: Solana祕籍 | 非同質化代幣 (NFTs)
  - - meta
    - name: og:title
      content: Solana祕籍 | 非同質化代幣 (NFTs)
  - - meta
    - name: description
      content: Learn how to get NFT metadata, get NFT owners, mint NFTs on Solana, and more
  - - meta
    - name: og:description
      content: Learn how to get NFT metadata, get NFT owners, mint NFTs on Solana, and more
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

# 非同質化代幣 (NFTs)

## 如何創建一個NFT

要創建一個 NFT，你需要：

1. 將圖像上傳到像 Arweave 這樣的 IPFS 網絡上。
2. 將 JSON 元數據上傳到像 Arweave 這樣的 IPFS 網絡上。
3. 調用 Metaplex 創建一個用於該 NFT 的賬戶。

### 上傳到 Arweave

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

### 鑄造（Mint）該 NFT

如果你已經上傳了圖像和元數據，您可以使用以下代碼鑄造（Mint）該 NFT。

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

::: tip 注意
你不能使用與你錢包不同的創作者信息來鑄造（Mint） NFT。如果遇到創作者的問題，請確保你的元數據中將你列爲創作者。
:::

## 如何獲取 NFT 元數據

Metaplex 的 NFT 元數據存儲在 Arweave 上。爲了獲取 Arweave 的元數據，您需要獲取 Metaplex PDA（程序派生賬戶）並對賬戶數據進行解碼。

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

## 如何獲取NFT的所有者

如果你擁有 NFT 的鑄幣密鑰，你可以通過查看該鑄幣密鑰對應的最大代幣賬戶來找到其當前所有者。

請記住，NFT 的供應量爲 1，它們是不可分割的，這意味着在任何時刻只有一個代幣賬戶持有該代幣，而其他所有與該鑄幣密鑰相關的代幣賬戶的餘額都爲 0。

一旦確定了最大代幣賬戶，我們可以獲取它的所有者。

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

## 如何獲取 NFT 的鑄幣地址

如果你知道Candy Machine的公鑰，你可以使用以下代碼獲取從該Candy Machine生成的所有 NFT 鑄幣地址的列表。請注意，我們可以使用以下的 `memcmp` 過濾器，因爲在 v1 版本中，第一個創作者的地址總是Candy Machine的地址。

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

如果你正在使用Candy Machine v2，你首先需要訪問其 "Candy Machine Creator" 地址，該地址是一個簡單的 PDA，使用`candy_machine`和Candy Machine v2 地址作爲種子生成。一旦你獲得了創建者地址，你可以像對待 v1 版本一樣使用它。

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

## 如何從錢包獲取所有 NFT？

當從錢包獲取所有 NFT 時，你需要獲取所有的代幣賬戶，然後解析出其中的 NFT。你可以使用 Metaplex JS 庫中的 [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) 方法來完成這個過程。

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

## Candy Machine v2

Metaplex JS SDK 現在支持通過代碼創建和更新Candy Machine v2。它使開發者能夠與糖果機v2 程序進行交互，創建、更新和刪除Candy Machine，並從中鑄造（Mint） NFT。

### 如何創建Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/create-candy-machine.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/create-candy-machine.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何刪除Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/delete-candy-machine.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/delete-candy-machine.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何通過權限查找Candy Machine

要查找所有權限爲特定公鑰的 Candy Machine，我們需要使用  [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) 函數，並將 `type` 參數設置爲 `authority`。

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-authority.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-authority.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何通過錢包地址查找Candy Machine

要通過錢包地址獲取 Candy Machine 對象，我們需要使用 [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) 函數，並將 `type` 參數設置爲 `wallet`。你可以從瀏覽器的 "Anchor data" 選項卡中獲取 Candy Machine 的錢包地址。

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-wallet.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-wallet.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何通過Candy Machine的地址查找它

要通過Candy Machine的地址查找Candy Machine，我們需要使用[`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress) 函數。

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-address.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-address.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何從Candy Machine找到鑄造(mint)的 NFT

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-minted-nfts.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-minted-nfts.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何將物品插入到Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/insert-items.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/insert-items.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### 如何從Candy Machine鑄造(Mint)一個 NFT

默認情況下，鑄造的 NFT 的所有者是`metaplex.identity().publicKey`。如果你希望將 NFT 鑄造到其他錢包中，可以將新的錢包公鑰與`newOwner`參數一起傳遞。

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/mint-nft.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/mint-nft.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
