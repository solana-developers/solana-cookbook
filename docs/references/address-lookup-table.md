---
title: Address Lookup Table
head:
  - - meta
    - name: title
      content: Solana Cookbook | Address Lookup Table
  - - meta
    - name: og:title
      content: Solana Cookbook | Address Lookup Table
  - - meta
    - name: description
      content: Learn how to use address lookup table
  - - meta
    - name: og:description
      content: Learn how to use address lookup table
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

# Address Lookup Table

Address Lookup Table allows you to store addresses on chain. You could refer to the addresses later in your transaction to reduce transaction length. However, only an address fit these rules can be refer to:
  a) is not a signer
  b) is not a program


## Create an address lookup table

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/address-lookup-table/create/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/address-lookup-table/create/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Add addresses to an address lookup table

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/address-lookup-table/extend/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/address-lookup-table/extend/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Create a transaction with address lookup talbe

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/address-lookup-table/use/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/address-lookup-table/use/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

then you can fetch it back

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/address-lookup-table/fetch-versioned-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/address-lookup-table/fetch-versioned-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
