---
title: Non Fungible Tokens (NFTs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | Non Fungible Tokens (NFTs)
  - - meta
    - name: og:title
      content: Solana Cookbook | Non Fungible Tokens (NFTs)
  - - meta
    - name: description
      content: An NFT (Non Fungible Token) on Solana is an SPL-Token where only a single token has been minted. Learn more about Creating, Minting, Getting Metadata, Owner of NFTs and more Recipes at The Solana cookbook.
  - - meta
    - name: og:description
      content: An NFT (Non Fungible Token) on Solana is an SPL-Token where only a single token has been minted. Learn more about Creating, Minting, Getting Metadata, Owner of NFTs and more Recipes at The Solana cookbook.
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

## Mint an NFT

To mint an NFT you have to:

1. Upload the image to IPFS like Arweave
2. Upload the json metadata to IPFS like Arweave
3. Call metaplex to create an account for the NFT

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
</SolanaCodeGroup>

### Mint the NFT

If you already have the image and metadata uploaded, you can mint
the NFT with the following code.

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
You cannot mint an NFT with a different creator that your wallet.
If you run into creator issues, make sure your metadata lists you
as the creator.
:::

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

## Composable standards in Solana NFTs

### Comparing Composability standards on Ethereum: ERC-998

ERC998, the Crypto-composable standard was explored by Matt lockyer in designing token standards that introduced object composition over class inheritance. 

Cryptokitties explored ERC-721 standards and breeding functions, which was the closest early analogy to composed assets existing as child assets. 

In the standard explained in ERC-998, it allowed an ERC-998 token to own ERC-998, ERC-721 and ERC20 tokens. This allowed standard Ethereum assets to be composed into complex compositions and traded using a Single transfer. This included various possibilities in context of top-down & botton-up composables.

Original Github issue: https://github.com/ethereum/EIPs/issues/998

EIP & Github update on 998:

https://eips.ethereum.org/EIPS/eip-998

https://github.com/mattlockyer/composables-998/

To elucidate on ethereum standards in contrast to SPL standards, here are a few considerations:

1. Ethereum NFTs are tokens that are generated for each NFT collection
2. Solana NFTs are all just ordinary SPL tokens with fixed supply
3. Ethereum NFTs need to have different transfer functions through smart contracts
4. Solana NFTs are easier to deploy and transfer without having to deploy contracts and transfer functions.

### Code Snippet

Considerations in Solana program library standards are a lot easier in comparison.

Minting an NFT requires creating a new SPL Mint with the supply of one and decimals zero as described https://spl.solana.com/token#example-create-a-non-fungible-token

Given the native SPL functions that control token supply and disabling of mint authority, Solana composable NFTs are essentially simple tokens with fixed supply that can be vaulted together.

The metaplex standards have made it a lot easier to control composability given the ability for NFTs that can print limited edition child NFTs (Metadata + MasterEdition with max_supply of desirable numbers as composables)

Instruction set for token metadata contract:

https://github.com/metaplex-foundation/metaplex/blob/master/rust/token-vault/program/src/instruction.rs


### Short Summary

Apart from the greatest convenience in gas considerations for Solana NFTs, it is noteworthy to notice that existence of Metadata and its sister PDA MasterEdition makes it a powerful combination for creators to have unique mints involving Metadata + MasterEditions with specific supply & NFTs that can print limited edition child NFTs.

Composable token standards with Metaplex would prove to contribute to huge factors in blockchain gaming and metaverse assets since it is easier to prove ownership within composables with simpler contracts.



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