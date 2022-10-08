---
title: Name Service
head:
  - - meta
    - name: title
      content: Solana Cookbook | Name Service
  - - meta
    - name: og:title
      content: Solana Cookbook | Name Service
  - - meta
    - name: description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse/Subdomain look up, more about Name Service and references at The Solana cookbook.
  - - meta
    - name: og:description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse, Subdomain look up, more about Name Service and references at The Solana cookbook.
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

# Name Service

## Name registry

Name registry menyimpan informasi tentang domain name. Itu terbuat dari dua hal:

- Header
- Data

Data untuk suatu domain name selalu diawali oleh header, di bawah ini adalah struktur header dalam JS:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolving SOL domains

.SOL domain itu unik, domain name mudah dibaca berubah menjadi publicKeys. Banyak wallet yang menggunakan hal ini sebagai pilihan lain untuk mengirim token atau SOL. Kamu bisa mengubah .SOL domain ke publicKey-nya dengan cara berikut ini:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Reverse look up

Hal ini dapat digunakan untuk resolve domain name dari public key-nya

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Subdomain look up

Untuk resolve suatu subdomain kamu perlu:

1.	Mendapatkan parent domain key
2.	Mendapatkan subdomain key
3.	Mengambil account info


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Menemukan semua domain name yang dimiliki oleh suatu public key

Kamu bisa mengambil semua domain name suatu wallet dengan cara melakukan request `getProgramAccounts`dengan filter`memcmp`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolve Twitter handle

Twitter handle bisa [teregistrasi di Solana name service](https://naming.bonfida.org/#/twitter-registration) dan digunakan seperti .SOL domain names

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Reverse look up suatu Twitter handle

Untuk menemukan SOL address yang berkaitan dengan suatu Twitter handle kamu bisa melakukan reverse look up

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
