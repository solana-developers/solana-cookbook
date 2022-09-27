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
      content: Apprenez à obtenir les métadonnées des NFTs, à trouver les propriétaires des NFTs, à créer des NFTs sur Solana, et bien plus
  - - meta
    - name: og:description
      content: Apprenez à obtenir les métadonnées des NFTs, à trouver les propriétaires des NFTs, à créer des NFTs sur Solana, et bien plus
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

# Jetons Non Fongibles (NFTs)

## Comment créer un NFT

Pour créer un NFT, vous devez :

1. Télécharger l'image sur IPFS comme Arweave
2. Télécharger les métadonnées json sur IPFS comme Arweave
3. Appeler metaplex pour créer un compte pour le NFT

### Télécharger sur Arweave

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

### Créer le NFT

Si vous avez déjà téléchargé l'image et les métadonnées, vous pouvez créer le NFT avec le code suivant.

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

::: tip Remarque
Vous ne pouvez pas créer un NFT avec un créateur différent de celui de votre portefeuille.
Si vous rencontrez des problèmes de créateur, assurez-vous que vos métadonnées vous mentionnent en tant que créateur.
:::

## Comment obtenir les métadonnées des NFTs

Les métadonnées des NFTs de Metaplex sont stockées sur Arweave. Afin d'obtenir les métadonnées d'Arweave, vous devez récupérer le PDA de Metaplex et décoder les données du compte.

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

## Comment obtenir le propriétaire d'un NFT

Si vous avez la clé de création (mint key) d'un NFT, vous pouvez trouver son propriétaire actuel en regardant le plus grand compte de jetons pour ce mint.

Rappelez-vous que les NFTs ont une offre de 1, et qu'ils sont indivisibles, ce qui signifie qu'un seul compte de jetons détiendra ce jeton à un moment donné, tandis que tous les autres comptes de jetons pour cette clé de création auront un solde de 0.

Une fois que le plus grand compte de jeton est identifié, nous pouvons retrouver son propriétaire.

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

## Comment obtenir les adresses de création des NFTs

Si vous connaissez la clé publique de la *Candy Machine*, vous pouvez obtenir la liste de toutes les adresses de création des NFTs générées par cette *Candy Machine* en utilisant le code suivant. Notez que nous pouvons utiliser le filtre `memcmp` suivant car, dans la v1, le premier créateur est toujours l'adresse de la *Candy Machine*.

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

Si vous utilisez une *Candy Machine v2*, vous devrez d'abord accéder à son adresse "Candy Machine Creator" qui est un simple PDA utilisant `candy_machine` et l'adresse de la *Candy Machine v2* comme seeds. Une fois que vous avez l'adresse du créateur, vous pouvez l'utiliser de la même manière que pour la v1.

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

## Comment récupérer tous les NFTs d'un portefeuille ?

Pour obtenir tous les NFTs d'un portefeuille, vous devrez obtenir tous les comptes de jetons et ensuite analyser lesquels sont des NFTs.
Tout cela peut être fait en utilisant [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) de la bibliothèque js Metaplex.

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
