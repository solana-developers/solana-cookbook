---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
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

# Mga Merkado ng Mangga

Nagbibigay ang Mango ng isang solong lugar para sa pagpapahiram, paghiram, pagpapalit, at paggamit
i-trade ang cryptoassets sa pamamagitan ng on-chain risk engine.
Maaari kang kumonekta sa programang on-chain ng Mango gamit ang mga library ng Client API.
Kakailanganin mo rin ang Solana javascript API library.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## Paano makakuha ng Mango Group

Ang mango group ay isang basket ng mga cross-margined na token. Nagtataglay ito ng malawak na impormasyon sa merkado tungkol sa mga token, serum dex market, perp market, orakulo, insurance fund at fees vaults. Bawat bersyon
ng Mango Markets ay gumagamit ng ibang Mango Group na naglalaman ng iba
mga token. Ang kasalukuyang pangkat ng v3 ay `mainnet.1`. Narito ang isang talahanayan na nagpapakita ng iba't ibang grupo:


| Group                | Version     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Note
Kung nais mong gamitin ang mga pangkat ng v2, kakailanganin mong gamitin ang library ng kliyente ng v2. Mahahanap mo ito [dito](https://github.com/blockworks-foundation/mango-client-ts)
:::


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## Paano gumawa ng Mango Account

Ang Mango Account ay nauugnay sa Mango Group, at hawak nito ang iyong mga token at pinapayagan
mong i-trade ang mga market ng Group na iyon. Mahahanap mo ang sanggunian [dito](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magdeposito ng USDC sa Mango Account
Pagkatapos gumawa ng mango account, kakailanganin mong pondohan ito ng mga token para sa pangangalakal.
Mahahanap mo ang sanggunian para sa paraan ng pagdedeposito [dito](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano maglagay ng spot order
Nakikipag-ugnayan ang Mango sa Serum Protocol upang maglagay ng mga spot order sa mga pamilihan. Maaari kang maglagay ng puwesto
mag-order sa pamamagitan ng paggawa nito. Mahahanap mo ang reference para sa placeSpotOrder function [dito](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder).
Ang Mango ay may config file na naglalaman ng impormasyon sa mga grupo, merkado, token at orakulo,
mahahanap mo ito [dito](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). Gumagamit kami ng impormasyon mula sa file na iyon upang mahanap ang tamang grupo at market.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano mag-load ng mga bid
Ginagamit ng Mango ang impormasyon sa merkado mula sa Serum Protocol upang mag-load ng mga bid. Maaari kang mag-load
direkta sila mula sa Serum upang magtrabaho kasama sa Mango. Maaari mong malaman ang higit pa tungkol sa Serum's
mga merkado [dito](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano mag-load ng mga tanong
Ginagamit ng Mango ang impormasyon sa merkado mula sa Serum Protocol upang mag-load ng mga tanong.
Maaari mong i-load ang mga ito nang direkta mula sa Serum upang magtrabaho kasama sa Mango. Maaari mong malaman ang higit pa
tungkol sa mga market ng Serum [dito](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Other Resources

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
