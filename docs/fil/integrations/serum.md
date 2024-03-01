---
title: OpenBook
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on OpenBook
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on OpenBook
  - - meta
    - name: description
      content: OpenBook is an innovative CLOB on Solana. Learn how to use and build on top of OpenBook.
  - - meta
    - name: og:description
      content: OpenBook is an innovative CLOB on Solana. Learn how to use and build on top of OpenBook.
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

Ang OpenBook ay isang protocol para sa mga desentralisadong palitan na binuo sa Solana. Ikaw
maaaring gumamit ng OpenBook para gumawa ng mga bagong market, kumuha ng mga order book, trade, at higit pa.

## Paano makakuha ng OpenBook market

Ang isang merkado sa OpenBook ay naglalaman ng lahat ng mga order at kakayahan upang gumawa ng mga order
sa OpenBook. Para sa lahat ng ginagawa mo sa OpenBook kailangan mong malaman ang market mo
ay nagtatrabaho sa.

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

## Paano kumuha ng OpenBook order books

Ang mga OpenBook market ay binubuo ng mga orderbook na may mga bid at nagtatanong. Kaya mo
i-query ang impormasyong ito para makita mo kung ano ang nangyayari sa merkado at
kumilos nang naaayon.

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

## Paano makakuha ng kasalukuyang bukas na mga order

Bilang isang mangangalakal, gugustuhin mong malaman kung anong kasalukuyang bukas na mga order ang mayroon ka
sa isang palengke. Maaari mong i-query ang iyong mga open order o ng sinuman sa isang market
may OpenBook.

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