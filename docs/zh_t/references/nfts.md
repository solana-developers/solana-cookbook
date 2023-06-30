---
title: 非同质化代币 (NFTs)
head:
  - - meta
    - name: title
      content: Solana秘籍 | 非同质化代币 (NFTs)
  - - meta
    - name: og:title
      content: Solana秘籍 | 非同质化代币 (NFTs)
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

# 非同质化代币 (NFTs)

## 如何创建一个NFT

要创建一个 NFT，你需要：

1. 将图像上传到像 Arweave 这样的 IPFS 网络上。
2. 将 JSON 元数据上传到像 Arweave 这样的 IPFS 网络上。
3. 调用 Metaplex 创建一个用于该 NFT 的账户。

### 上传到 Arweave

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

### 铸造（Mint）该 NFT

如果你已经上传了图像和元数据，您可以使用以下代码铸造（Mint）该 NFT。

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
你不能使用与你钱包不同的创作者信息来铸造（Mint） NFT。如果遇到创作者的问题，请确保你的元数据中将你列为创作者。
:::

## 如何获取 NFT 元数据

Metaplex 的 NFT 元数据存储在 Arweave 上。为了获取 Arweave 的元数据，您需要获取 Metaplex PDA（程序派生账户）并对账户数据进行解码。

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

## 如何获取NFT的所有者

如果你拥有 NFT 的铸币密钥，你可以通过查看该铸币密钥对应的最大代币账户来找到其当前所有者。

请记住，NFT 的供应量为 1，它们是不可分割的，这意味着在任何时刻只有一个代币账户持有该代币，而其他所有与该铸币密钥相关的代币账户的余额都为 0。

一旦确定了最大代币账户，我们可以获取它的所有者。

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

## 如何获取 NFT 的铸币地址

如果你知道Candy Machine的公钥，你可以使用以下代码获取从该Candy Machine生成的所有 NFT 铸币地址的列表。请注意，我们可以使用以下的 `memcmp` 过滤器，因为在 v1 版本中，第一个创作者的地址总是Candy Machine的地址。

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

如果你正在使用Candy Machine v2，你首先需要访问其 "Candy Machine Creator" 地址，该地址是一个简单的 PDA，使用`candy_machine`和Candy Machine v2 地址作为种子生成。一旦你获得了创建者地址，你可以像对待 v1 版本一样使用它。

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

## 如何从钱包获取所有 NFT？

当从钱包获取所有 NFT 时，你需要获取所有的代币账户，然后解析出其中的 NFT。你可以使用 Metaplex JS 库中的 [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) 方法来完成这个过程。


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

Metaplex JS SDK 现在支持通过代码创建和更新Candy Machine v2。它使开发者能够与糖果机v2 程序进行交互，创建、更新和删除Candy Machine，并从中铸造（Mint） NFT。

### 如何创建Candy Machine

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

### 如何删除Candy Machine

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

### 如何通过权限查找Candy Machine

要查找所有权限为特定公钥的 Candy Machine，我们需要使用  [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) 函数，并将 `type` 参数设置为 `authority`。

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

### 如何通过钱包地址查找Candy Machine

要通过钱包地址获取 Candy Machine 对象，我们需要使用 [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) 函数，并将 `type` 参数设置为 `wallet`。你可以从浏览器的 "Anchor data" 选项卡中获取 Candy Machine 的钱包地址。

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

### 如何通过Candy Machine的地址查找它

要通过Candy Machine的地址查找Candy Machine，我们需要使用[`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress) 函数。

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

### 如何从Candy Machine找到铸造(mint)的 NFT

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

### 如何将物品插入到Candy Machine

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

### 如何从Candy Machine铸造(Mint)一个 NFT

默认情况下，铸造的 NFT 的所有者是`metaplex.identity().publicKey`。如果你希望将 NFT 铸造到其他钱包中，可以将新的钱包公钥与`newOwner`参数一起传递。

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
