---
title: Strata
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Building on Strata Protocol
  - - meta
    - name: og:title
      content: คู่มือ Solana | Building on Strata Protocol
  - - meta
    - name: description
      content: Strata is a protocol for launching tokens บน Solana. เรียนรู้วิธี use และ build on top of Strata.
  - - meta
    - name: og:description
      content: Strata is a protocol for launching tokens บน Solana. เรียนรู้วิธี use และ build on top of Strata.
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

Strata is a protocol for launching tokens built บน Solana. 
You สามารถ use Strata to launch any kind of fungible token, ranging from social tokens to dao และ gamefi tokens.
You สามารถ also compose strata with anything that uses fixed price mechanics to get dynamic pricing mechanics, for example the Metaplex CandyMachine.

More in-depth docs are available [ที่นี่](docs.strataprotocol.com). You สามารถ also use the gui at [Strata Launchpad](app.strataprotocol.com)

## How to create a fully managed token

A fully-managed Strata token is a token where the liquidity is managed by the protocol. The upshot is that you immediately get a tradeable
token, with no need for pools or liquidity providers. A fully-managed token is a normal spl token with metaplex token metadata และ an associated bonding curve.
The bonding curve manages the liquidity, pricing, และ supply of that token.

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

## How to buy และ sell a token

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

## How to bootstrap liquidity

Strata สามารถ also sell tokens where you would like to manually manage the supply. This สามารถ be useful for liquidity bootstrapping before listing your token
on a dex. You สามารถ read more about these [ที่นี่](https://docs.strataprotocol.com/marketplace/lbc) or launch your own at [Strata Launchpad](app.strataprotocol.com)


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

## แหล่งข้อมูลอื่น

- [Typescript Client Documentation](https://docs.strataprotocol.com) - Live code examples to create และ manage Strata tokens
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - Launch a token โดยใช้ the GUI
