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

# Serbisyo ng Pangalan

## Rehistro ng pangalan

Ang pagpapatala ng pangalan ay nag-iimbak ng impormasyon tungkol sa pangalan ng domain. Ito ay gawa sa dalawang bagay:

- Ang header
- Ang data

Ang data para sa isang domain name ay palaging prefix ng header, sa ibaba ay ang istraktura ng header sa JS:

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

## Pag-resolve ng mga domain ng SOL

Ang mga .SOL na domain ay natatangi, pang-tao na mga pangalan ng domain
na nagko-convert sa publicKeys. Ginagamit ito ng maraming wallet bilang
isa pang opsyon upang magpadala ng mga token o SOL. Maaari kang mag-convert
.SOL na mga domain sa kanilang publicKey na may sumusunod:

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

## Reverse lookup

Magagamit ito upang malutas ang pangalan ng domain mula sa pampublikong key nito

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

## Hanapin ang subdomain

Upang malutas ang isang subdomain kailangan mong:

1. Kunin ang parent domain key
2. Kunin ang subdomain key
3. Kunin ang impormasyon ng account

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

## Hanapin ang lahat ng domain name na pagmamay-ari ng isang pampublikong key

Makukuha mo ang lahat ng domain name ng isang wallet sa pamamagitan ng paggawa ng kahilingan sa `getProgramAccounts` na may filter na `memcmp`

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

## Lutasin ang isang Twitter handle

Ang mga handle ng Twitter ay maaaring [nakarehistro sa serbisyo ng pangalan ng Solana](https://naming.bonfida.org/#/twitter-registration) at magamit tulad ng mga .SOL na domain name

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

## Baliktarin ang paghahanap ng isang Twitter handle

Upang mahanap ang SOL address na nauugnay sa isang Twitter handle maaari kang magsagawa ng reverse look up

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
