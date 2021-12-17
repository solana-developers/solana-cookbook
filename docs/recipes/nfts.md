---
title: Non Fungible Tokens (NFTs)
---

# Non Fungible Tokens (NFTs)

## Create an NFT

An NFT on Solana is simply an SPL-Token where only a single token has been minted.

To create a NFT, you will need to interact with both the [SystemProgram][1] and the [TokenProgram][2].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/create-nft-token/create-nft-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/create-nft-token/create-nft-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program
[2]: https://spl.solana.com/token

## Get NFT Metadata

Metaplex NFTs have metadata that is stored on Arweave. In order
to get the Arweave metadata, you must get the Metaplex PDA and
decode the account data.

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

## Get the owner of an NFT

If you have the mint key of an NFT, you can find its current owner
by sneak-peeking at the largest token account for that mint key.

Remember that NFTs have a supply of 1, and they are indivisible,
meaning that only one token account will hold that token at any 
point in time, whilst all other token accounts for that mint key will 
have a balance of 0.

Once the largest token account is identified, we can retrieve its owner.

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
