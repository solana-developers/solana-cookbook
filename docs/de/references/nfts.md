---
title: NFTs
head:
  - - meta
    - name: title
      content: Solana Kochbuch | NFTs
  - - meta
    - name: og:title
      content: Solana Kochbuch | NFTs
  - - meta
    - name: description
      content: Erfahren Sie, wie Sie NFT-Metadaten erhalten, NFT-Besitzer erhalten, NFTs auf Solana erstellen und mehr
  - - meta
    - name: og:description
      content: Erfahren Sie, wie Sie NFT-Metadaten erhalten, NFT-Besitzer erhalten, NFTs auf Solana erstellen und mehr

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

# Nicht fungible Tokens (NFTs)

## So erstellen Sie eine NFT

Um eine NFT zu erstellen, müssen Sie:

1. Laden Sie das Bild zu Arweave oder IPFS hoch
2. Laden Sie die json-Metadaten zu Arweave oder IPFS hoch
3. Rufen Sie metaplex auf, um ein Konto für das NFT zu erstellen

### Upload zu Arweave

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

### Minte das NFT

Wenn Sie das Bild und die Metadaten bereits hochgeladen haben, können Sie prägen
die NFT mit dem folgenden Code.

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
Sie können keine NFT mit einem anderen Ersteller als Ihrer Brieftasche prägen.
Wenn Sie auf Creator-Probleme stoßen, vergewissern Sie sich, dass Sie in Ihren Metadaten als Ersteller aufgeführt sind.
:::

## So erhalten Sie NFT-Metadaten

Metaplex NFTs haben Metadaten, die auf Arweave gespeichert sind.
Um die Arweave-Metadaten zu erhalten, müssen Sie sich den Metaplex PDA besorgen und
Kontodaten entschlüsseln.

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

## So erhalten Sie den Besitzer eines NFT

Wenn Sie den Münzschlüssel (Token Address) eines NFT haben, können Sie seinen aktuellen Besitzer durch Sneak-Peeking auf das größte Token-Konto für diesen Mint-Key finden.

Denken Sie daran, dass NFTs einen Vorrat von 1 haben und unteilbar sind.
was bedeutet, dass nur ein Token-Konto dieses Token zu einem beliebigen Zeitpunkt halten wird, während alle anderen Token-Konten für diesen Münzschlüssel, die dies tun einen Saldo von 0 haben.

Sobald das größte Token-Konto identifiziert ist, können wir seinen Besitzer abrufen.

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

## So erhalten Sie NFT Mint-Adressen

Wenn Sie den öffentlichen Schlüssel der Candy Machine kennen, können Sie mit dem folgenden Code die Liste aller NFT-Mint-Adressen abrufen, die von dieser Candy Machine generiert wurden. Beachten Sie, dass wir den folgenden `memcmp`-Filter verwenden können, da in v1 der erste Ersteller immer die Adresse der Candy Machine ist.

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

Wenn Sie eine Candy Machine v2 verwenden, müssen Sie zuerst auf die Adresse "Candy Machine Creator" zugreifen, bei der es sich um einen einfachen PDA handelt, der `candy_machine` und die Adresse der Candy Machine v2 als Seeds verwendet.
Sobald Sie die Creator-Adresse haben, können Sie sie auf die gleiche Weise verwenden, wie wir es für v1 getan haben.

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

## Wie bekomme ich alle NFTs aus einem Wallet?

Wenn Sie alle NFTs aus einer Brieftasche abrufen, müssen Sie alle Token-Konten abrufen und dann analysieren, welche NFTs sind.
Dies alles kann mit [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) von Metaplex JS Bibliotheken durchgeführt werden.

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

Das Metaplex JS SDK unterstützt jetzt das Erstellen und Aktualisieren von Candy Machine v2 per Code. Es ermöglicht den Entwicklern, mit dem Candy Machine v2-Programm zu interagieren und Candy Machines zu erstellen, zu aktualisieren und zu löschen sowie NFTs mit ihnen zu prägen.

### Wie erstelle ich eine Candy Machine?

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

### Wie Sie eine Candy Machine löschen

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

### So finden Sie die Candy Machine Autorität

Um alle Candy Machines zu finden, deren Autorität ein bestimmter öffentlicher Schlüssel ist, haben wir die Funktion [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) verwendet mit dem `type`-Parameter als `authority`

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

### So finden Sie Candy Machine mit der Wallet-Adresse

Um das Candy Machine-Objekt über seine Wallet-Adresse abzurufen, haben wir die Funktion [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) zusammen mit dieser geben Sie den Parameter als „Wallet“ ein. Die Wallet-Adresse der Candy Machine können Sie dem Reiter „Ankerdaten“ im Explorer entnehmen.

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

### So finden Sie Candy Machine anhand seiner Adresse

Um einen Candy Machine anhand seiner Adresse zu finden, müssen wir die Funktion [`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress) verwenden.

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

### So finden Sie geprägte NFTs von einer Candy Machine

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

### So fügen Sie Artikel in einer Candy Machine bei

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

### Wie man einen NFT von einer Candy Machine prägt

Standardmäßig wäre der Eigentümer des geprägten NFT `metaplex.identity().publicKey`. Wenn Sie die NFT an eine andere Wallet prägen möchten, übergeben Sie diesen öffentlichen Schlüssel zusammen mit dem Parameter "newOwner".

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
