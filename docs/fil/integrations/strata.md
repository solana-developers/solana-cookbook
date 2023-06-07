---
title: Strata
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Strata Protocol
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Strata Protocol
  - - meta
    - name: description
      content: Strata is a protocol for launching tokens on Solana. Learn how to use and build on top of Strata.
  - - meta
    - name: og:description
      content: Strata is a protocol for launching tokens on Solana. Learn how to use and build on top of Strata.
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
---

# Strata

Ang Strata ay isang protocol para sa paglulunsad ng mga token na binuo sa Solana.
Maaari mong gamitin ang Strata upang ilunsad ang anumang uri ng fungible token, mula sa mga social token hanggang sa dao at gamefi token.
Maaari ka ring gumawa ng mga strata sa anumang bagay na gumagamit ng fixed price mechanics para makakuha ng dynamic pricing mechanics, halimbawa ang Metaplex CandyMachine.

Available ang mas malalim na mga doc [dito](docs.strataprotocol.com). Maaari mo ring gamitin ang gui sa [Strata Launchpad](app.strataprotocol.com)

## Paano gumawa ng ganap na pinamamahalaang token

Ang isang ganap na pinamamahalaang Strata token ay isang token kung saan ang pagkatubig ay pinamamahalaan ng protocol. Ang kinalabasan ay agad kang makakuha ng isang nabibili
token, na hindi nangangailangan ng mga pool o mga provider ng pagkatubig. Ang ganap na pinamamahalaang token ay isang normal na spl token na may metaplex token metadata at isang nauugnay na bonding curve.
Pinamamahalaan ng bonding curve ang liquidity, pagpepresyo, at supply ng token na iyon.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## How to buy and sell a token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Paano mag-bootstrap ng liquidity

Ang Strata ay maaari ding magbenta ng mga token kung saan mo gustong manu-manong pamahalaan ang supply. Maaari itong maging kapaki-pakinabang para sa liquidity bootstrap bago ilista ang iyong token
sa isang dex. Maaari kang magbasa nang higit pa tungkol sa mga ito [dito](https://docs.strataprotocol.com/marketplace/lbc) o ilunsad ang iyong sarili sa [Strata Launchpad](app.strataprotocol.com)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Typescript Client Documentation](https://docs.strataprotocol.com) - Mga halimbawa ng live na code para gumawa at mamahala ng mga Strata token
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - Maglunsad ng token gamit ang GUI
