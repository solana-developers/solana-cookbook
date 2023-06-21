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

# Non Fungible Token (NFTs)

## Paano lumikha ng isang NFT

Upang lumikha ng isang NFT kailangan mong:

1. I-upload ang larawan sa IPFS tulad ng Arweave
2. I-upload ang json metadata sa IPFS tulad ng Arweave
3. Tumawag sa metaplex para gumawa ng account para sa NFT

### I-upload sa Arweave

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

### Mint ang NFT

Kung na-upload mo na ang larawan at metadata, maaari kang mag-mint
ang NFT na may sumusunod na code.

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

::: tip Tandaan
Hindi ka makakagawa ng NFT na may ibang tagalikha kaysa sa iyong wallet.
Kung magkakaroon ka ng mga isyu sa creator, tiyaking inilista ka ng iyong metadata
bilang lumikha.
:::

## Paano makakuha ng NFT Metadata

Ang mga Metaplex NFT ay may metadata na nakaimbak sa Arweave. Sa pagkakasunud-sunod
para makuha ang Arweave metadata, dapat mong makuha ang Metaplex PDA at
i-decode ang data ng account.

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

## Paano makuha ang may-ari ng isang NFT

Kung mayroon kang mint key ng isang NFT, mahahanap mo ang kasalukuyang may-ari nito
sa pamamagitan ng sneak-peeking sa pinakamalaking token account para sa mint key na iyon.

Tandaan na ang mga NFT ay may supply na 1, at sila ay hindi mahahati,
ibig sabihin, isang token account lang ang hahawak ng token na iyon kahit saan
punto sa oras, habang ang lahat ng iba pang mga token account para sa mint key na iyon
may balanseng 0.

Kapag natukoy na ang pinakamalaking token account, maaari nating makuha ang may-ari nito.

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

## Paano makakuha ng NFT Mint Address

Kung alam mo ang pampublikong key ng Candy Machine, maaari mong makuha ang listahan ng lahat ng NFT mint address na nabuo mula sa Candy Machine na iyon gamit ang sumusunod na code. Tandaan na maaari nating gamitin ang sumusunod na `memcmp` na filter dahil, sa v1, ang unang gumawa ay palaging ang address ng Candy Machine.

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

Kung gumagamit ka ng Candy Machine v2, kakailanganin mo munang i-access ang "Candy Machine Creator" address nito na isang simpleng PDA gamit ang `candy_machine` at ang Candy Machine v2 address bilang mga buto. Kapag mayroon ka na ng address ng tagalikha, magagamit mo ito sa parehong paraan na ginamit namin para sa v1.

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

## Paano makukuha ang lahat ng NFT mula sa isang wallet?

Kapag nakuha ang lahat ng NFT mula sa isang wallet, kakailanganin mong makuha ang lahat ng token account at pagkatapos ay i-parse kung alin ang mga NFT.
Magagawa ang lahat ng ito gamit ang [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) mula sa Metaplex JS library.

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

Sinusuportahan na ngayon ng Metaplex JS SDK ang paggawa at pag-update ng Candy Machine v2 sa pamamagitan ng code. Nagbibigay-daan ito sa mga developer na makipag-ugnayan sa programang Candy Machine v2 at lumikha, mag-update, at magtanggal ng mga Candy Machine pati na rin ang mga mint na NFT mula sa kanila.

### Paano gumawa ng Candy Machine

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

### How to delete a Candy Machine

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

### Paano makahanap ng Candy Machine sa pamamagitan ng awtoridad

Upang mahanap ang lahat ng Candy Machine na ang awtoridad ay isang partikular na pampublikong key, ginamit namin ang function na [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy). na may parameter na `type` bilang `authority`

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

### Paano makahanap ng Candy Machine gamit ang address ng wallet

Upang kunin ang object ng Candy Machine sa pamamagitan ng wallet address nito, ginamit namin ang function na [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) kasama ng ` type` na parameter bilang `wallet`. Makukuha mo ang wallet address ng Candy Machine mula sa tab na "Anchor data" sa explorer.

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

### Paano mahahanap ang Candy Machine gamit ang address nito

Upang makahanap ng Candy Machine gamit ang address nito, kailangan nating gamitin ang function na [`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress).

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

### How to find minted NFTs from a Candy Machine

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

### How to insert items into a Candy Machine

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

### Paano mag-mint ng NFT mula sa isang Candy Machine

Bilang default, ang may-ari ng minted NFT ay magiging `metaplex.identity().publicKey`. Kung gusto mong i-mint ang NFT sa ibang wallet, ipasa ang public key na iyon kasama ng parameter na `newOwner`

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
