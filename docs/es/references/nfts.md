---
title: NFTs
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | NFTs
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | NFTs
  - - meta
    - name: description
      content: Aprende como obtener los metadatos de los NFT, los dueños de NFT, crear NFTs en Solana y más
  - - meta
    - name: og:description
      content: Aprende como obtener los metadatos de los NFT, los dueños de NFT, crear NFTs en Solana y más
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

# Tokens no fungibles (NFTs)

## ¿Cómo crear un NFT?

Para crear un NFT tu tienes que:

1. Subir la imagen a IPFS como Arweave
2. Subir los metadatos en json a IPFS como Arweave
3. Llamar a metaplex para crear la cuenta para el NFT

### Subir a Arweave

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

### Crear (mint) el NFT

Si ya tiene la imagen y los metadatos cargados, puede hacer mint del NFT con 
el siguiente código.

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

::: tip
No puedes hacer mint de un NFT con un creador diferente al de tu billetera.
Si tienes problemas al crear, asegúrese de que sus metadatos lo incluyan
como el creador.
:::

## ¿Cómo obtener metadatos de un NFT?

Los NFTs de Metaplex tienen metadatos que se almacenan en Arweave. Para obtener 
los metadatos de Arweave, debes obtener el PDA de Metaplex PDA y decodificar 
los datos de la cuenta.

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

## ¿Cómo obtener el dueño de un NFT?

Si tiene la clave de mint de un NFT, puede encontrar su propietario actual
echando un vistazo a la cuenta de token más grande para ese mint.

Recuerde que los NFT tienen un suministro de 1 y son indivisibles,
lo que significa que solo una cuenta de token mantendrá ese token en cualquier
punto en el tiempo, mientras que todas las demás cuentas de token para esa 
clave de mint tienen un saldo de 0.

Una vez que se identifica la cuenta de token más grande, podemos recuperar a su 
propietario.

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

## ¿Cómo obtener direcciones de mint de NFT?

Si conoces la clave pública de Candy Machine, puede obtener la lista de todas 
las direcciones de mint NFT generadas desde esa Candy Machine usando el 
siguiente código. Ten en cuenta que podemos usar el siguiente filtro `memcmp` 
porque, en v1, el primer creador siempre es la dirección de Candy Machine.

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

Si estás utilizando Candy Machine v2, primero deberás acceder a su dirección 
"Candy Machine Creator", que es un PDA simple que utiliza `candy_machine` y la 
dirección de Candy Machine v2 como semillas. Una vez que tengas la dirección 
del creador, puede usarla de la misma manera que lo hicimos para v1.

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

## ¿Cómo obtener todos los NFT de una billetera?

Al obtener todos los NFT de una billetera, deberá obtener todas las cuentas de 
token y luego analizar cuáles son NFT. Todo esto se puede hacer usando 
[`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) de la librería js de Metaplex.

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
