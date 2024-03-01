---
title: OpenBook
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Building on OpenBook
  - - meta
    - name: og:title
      content: Solana Kochbuch | Building on OpenBook
  - - meta
    - name: description
      content: OpenBook ist ein innovativer CLOB auf Solana. Erfahren Sie, wie Sie OpenBook verwenden und darauf aufbauen.
  - - meta
    - name: og:description
      content: OpenBook ist ein innovativer CLOB auf Solana. Erfahren Sie, wie Sie OpenBook verwenden und darauf aufbauen.
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

# OpenBook

OpenBook ist ein auf Solana basierendes Protokoll für den dezentralisierten Austausch. Du
kannst OpenBook verwenden, um neue Märkte zu schaffen, Auftragsbücher zu erhalten, Handel zu treiben und vieles mehr.

## So erhalten Sie einen OpenBookmarkt

Ein Markt auf OpenBook enthält alle Bestellungen und Möglichkeiten, um Bestellungen zu tätigen
auf OpenBook. Für alles, was Sie mit OpenBook tun, müssen Sie den Markt kennen
arbeiten mit.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## So erhalten Sie OpenBook-Bestellbücher

OpenBook-Märkte bestehen aus Orderbüchern mit Geboten und Nachfragen. Du kannst
Fragen Sie diese Informationen ab, damit Sie sehen können, was auf dem Markt vor sich geht und
handle entsprechend.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## So erhalten Sie aktuelle offene Bestellungen

Als Trader werden Sie wissen wollen, welche aktuellen offenen Orders Sie auf einem Markt haben, können Sie Ihre oder die offenen Orders anderer Personen auf einem Markt mit OpenBook abfragen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/OpenBook/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/OpenBook/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>