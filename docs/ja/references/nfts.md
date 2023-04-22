---
title: NFT
head:
  - - meta
    - name: title
      content: Solana Cookbook | NFTs
  - - meta
    - name: og:title
      content: Solana Cookbook | NFTs
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

# 非代替性トークン(NFT)

## NFT の作成方法

NFT を作成するには、次のことを行う必要があります:

1. Arweave のようなIPFSに画像をアップロード
2. jsonメタデータをArweaveなどのIPFSにアップロード
3. metaplexを呼び出してNFTのアカウントを作成

### Arweaveにアップロード

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

### NFTをミント

画像とメタデータを既にアップロードしている場合は、次のコードを使用してNFTを作成できます。

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
ウォレットとは異なる作成者で NFT を作成することはできません。
作成者の問題が発生した場合は、メタデータに作成者として記載されていることを確認してください。
:::

## NFTメタデータの取得方法

Metaplex NFTには、Arweaveに保存されているメタデータがあります。Arweave メタデータを取得するには、Metaplex PDAを取得してアカウントデータをデコードする必要があります。

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

## NFTの所有者を取得する方法

NFTのミントキーを持っている場合、そのミントキーの最大のトークンアカウントを覗き見ることで、現在の所有者を見つけることができます。

NFTの供給量は1であり、分割できないことを覚えておいてください。つまり、ある時点で1つのトークンアカウントだけがそのトークンを保持し、そのミントキーの他のすべてのトークンアカウントの残高は0になります。

最大のトークン アカウントが特定されると、その所有者を取得できます。

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

## NFTミントアドレスを取得する方法

Candy Machineの公開鍵がわかっている場合は、次のコードを使用して、そのCandy Machineから生成されたすべての NFT ミント アドレスのリストを取得できます。次の`memcmp`フィルターを使用できることに注意してください。これは、v1では最初の作成者が常にCandy Machineのアドレスであるためです。

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

Candy Machine v2 を使用している場合は、最初に`candy_machine`と Candy Machinev2アドレスをシードとして使用する単純なPDAである「Candy Machine Creator」アドレスにアクセスする必要があります。
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

## ウォレットからすべての NFT を取得するには？

ウォレットからすべてのNFTを取得する場合、すべてのトークンアカウントを取得してから、どれがNFTであるかを解析する必要があります。
これはすべて、Metaplex JSライブラリの[`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236)を使用すれば可能です。

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

Metaplex JS SDKは、コードによるCandy Machine v2の作成と更新をサポートするようになりました。これにより、開発者はCandy Machine v2プログラムと対話し、Candy Machineを作成、更新、削除したり、そこからNFTを作成したりできます。

### Candy Machineの作成方法

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

### Candy Machineの削除方法

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

### authorityを介してCandy Machineを探す方法

authorityが特定の公開鍵であるすべてのCandy Machineを見つけるには、`type` パラメータを`authority`として[`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy)関数を使用します。

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

### ウォレットアドレスを使用してCandy Machineを見つける方法

ウォレット アドレスを介してCandy Machine オブジェクトを取得するには、  `type` パラメータを`wallet`として[`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy)関数を使用します。
Candy Machine のウォレット アドレスは、エクスプローラーの [Anchor data] タブから取得できます。

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

### アドレスを使用してCandy Machineを探す方法
アドレスを使用してCandy Machineを見つけるには、[`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress)関数を使用する必要があります。

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

### Candy MachineからミントされたNFTを見つける方法

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

### Candy Machineにアイテムを挿入する方法

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

### Candy MachineからNFTをミントする方法

デフォルトでは、作成された NFT の所有者は`metaplex.identity().publicKey`になります。NFT を他のウォレットに発行する場合は、その公開鍵を`newOwner`パラメータとともに渡します。

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
