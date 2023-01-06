---
title: NFTs
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

# Non Fungible Tokens (NFTs)

## How to create an NFT

NFT를 만들기 위해 당신이 해야 하는 것:

1. Arweave와 같은 IPFS에 이미지를 업로다합니다.
2. Arweave와 같은 IPFS에 json 메타데이터를 업로드합니다.
3. NFT를 위한 Account를 생성하기 위해 metaplex를 호출합니다.

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

만약 당신이 이미지와 메타데이터를 이미 업로드했다면, 당신은 아래의 코드로 NFT를 mint 할 수 있습니다.

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
당신의 지갑과 다른 크리에이터로 NFT를 mint 할 수 없습니다.
만약 당신이 크리에이터 이슈와 마주한다면, 당신의 메타데이터의 크리에이터가 당신으로 되어있는지 확인하세요.
:::

## How to get NFT Metadata

Metaplex NFT들은 Arweave에 저장된 메타데이터를 갖고 있습니다.
Arweave 메타데이터를 얻기 위해 당신은 Metaplex PDA를 얻어야 하고 Account Data를 디코드 해야 합니다.

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

## How to get the owner of an NFT

만약 당신이 NFT의 mint key를 갖고 있다면, 그 mint key에 대한 가장 큰 Token Account를 몰래 엿봐서 이 NFT의 현재 소유자를 찾을 수 있습니다.


NFT들은 1개의 Token을 가진다는 것과 나눌 수 없다는 것을 기억하세요.
이것은 오직 하나의 Token Account만이 그 Token을 가진다는 것을 의미합니다. 
그리고 해당 mint key에 대한 모든 다른 Token Account들은 0 balance를 가질 것입니다.

가장 큰 Token Account가 식별된다면 우리는 이 Account의 소유자를 조회할 수 있습니다.

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

## How to get NFT Mint Addresses

만약 당신이 Candy Machine의 public key를 안다면, 당신은 아래의 코드를 사용해 Candy Machine으로부터 만들어진 모든 NFT mint Address들의 리스트를 얻을 수 있습니다.
우리가 `memcmp` 필터를 사용할 수 있다는 사실에 주목하세요. 이는 v1에서 첫 번째 크리에이터는 항상 Candy Machine의 Address이기 때문입니다.

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

만약 당신이 Candy Machin v2를 사용하고 있다면, 당신은 우선 `candy_machine`과 Machine v2 Address를 seeds로 사용하는 간단한 PDA인 "Candy Machine Creator" Address에 접근할 필요가 있을 것입니다.
당신이 크리에이터 Address를 가진다면 당신은 우리가 v1에서 했던 것과 같은 방법으로 이것을 사용할 수 있습니다.

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

## How to get all NFTs from a wallet?

한 지갑으로부터 모든 NFT들을 얻으려고 할 때, 당신은 모든 Token Account들을 얻고 어떤 것이 NFT들인지 구분할 필요가 있을 것입니다.
이것은 Metaplex의 js 라이브러리인 [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236)을 사용해 가능합니다.

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
