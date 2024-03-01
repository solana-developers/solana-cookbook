---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Building on Mango Markets
  - - meta
    - name: og:title
      content: Solana Kochbuch | Building on Mango Markets
  - - meta
    - name: description
      content: Mango Markets bietet den Industriestandard für den dezentralisierten, margenübergreifenden Handel. Erfahren Sie, wie Sie Mango Markets verwenden und darauf aufbauen.
  - - meta
    - name: og:description
      content: Mango Markets bietet den Industriestandard für den dezentralisierten, margenübergreifenden Handel. Erfahren Sie, wie Sie Mango Markets verwenden und darauf aufbauen.
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

# Mango Markets

Mango bietet einen einzigen Ort um Kryptoassets über eine On-Chain-Risiko-Engine zum Verleihen, Leihen, Tauschen und Leverage
Handeln.
Sie können sich über die Client-API-Bibliotheken mit dem On-Chain-Programm von Mango verbinden.
Sie benötigen außerdem die Solana-Javascript-API-Bibliothek.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## So erhalten Sie eine Mango-Gruppe

Eine Mangogruppe ist ein Korb mit querrandigen Spielmarken. Es enthält umfassende Marktinformationen über Token, OpenBook-Dex-Märkte, Tätermärkte, Orakel, Versicherungsfonds und Gebührentresore. Jede Version
von Mango Markets verwendet eine andere Mango-Gruppe, die andere enthält
Token. Die aktuelle v3-Gruppe ist „mainnet.1“. Hier ist eine Tabelle mit den verschiedenen Gruppen:


| Group                | Version     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Note
Wenn Sie die v2-Gruppen verwenden möchten, müssen Sie die v2-Clientbibliothek verwenden. Du kannst es [hier](https://github.com/blockworks-foundation/mango-client-ts) finden
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

## So erstellen Sie ein Mango-Konto

Ein Mango-Konto ist mit einer Mango-Gruppe verknüpft und enthält Ihre Tokens und Genehmigungen, die Märkte dieser Gruppe zu handeln. Die Referenz finden Sie [hier](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount).

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

## So zahlen Sie USDC auf ein Mango-Konto ein

Nachdem Sie ein Mango-Konto erstellt haben, müssen Sie es mit Token für den Handel aufladen.
Die Referenz für die Einzahlungsmethode finden Sie [hier](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit).

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

## So platzieren Sie eine Spot-Order

Mango interagiert mit dem OpenBook Protocol, um Spot-Orders auf den Märkten zu platzieren. Sie können eine Spot Order
bestellen, indem Sie dies tun. Die Referenz für die placeSpotOrder-Funktion finden Sie [hier](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder).
Mango hat eine Konfigurationsdatei, die Informationen zu Gruppen, Märkten, Token und Orakeln enthält.
Sie finden es [hier](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). Wir verwenden Informationen aus dieser Datei, um die richtige Gruppe und den richtigen Markt zu finden.

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

## So laden Sie Gebote

Mango verwendet die Marktinformationen von OpenBook Protocol, um Gebote zu laden. Sie können
sie direkt aus OpenBook laden, um mit Mango zu arbeiten. Sie können [hier](https://github.com/project-OpenBook/OpenBook-ts/tree/master/packages/OpenBook) mehr über OpenBook Märkte erfahren

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

## How to load asks

Mango verwendet die Marktinformationen von OpenBook Protocol, um Anfragen zu laden.
Sie können sie direkt aus OpenBook laden, um mit Mango zu arbeiten. Sie können [hier](https://github.com/project-OpenBook/OpenBook-ts/tree/master/packages/OpenBook) mehr über die Märkte von OpenBook erfahren

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

## Andere Ressourcen

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
