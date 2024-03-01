---
title: OpenBook
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การทำงานกับ OpenBook
  - - meta
    - name: og:title
      content: คู่มือ Solana | การทำงานกับ OpenBook
  - - meta
    - name: description
      content: OpenBook เป็นนวัตกรรม CLOB บน Solana. เรียนรู้วิธีใช้ และสร้างบน OpenBook
  - - meta
    - name: og:description
      content: OpenBook เป็นนวัตกรรม CLOB บน Solana. เรียนรู้วิธีใช้ และสร้างบน OpenBook
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

OpenBook คือ protocol สำหรับ decentralized exchanges สร้างอยู่บน Solana. เราสามารถใช้ OpenBook เพื่อสร้าง markets, get order books, trade, และอื่นๆ อีกมากมาย

## วิธีดึงข้อมูล OpenBook market

market บน OpenBook จะมี orders และความสามารถในการสร้าง orders บน OpenBook สำหรับการจะทำอะไรบน OpenBook เราต้องรู้ว่า market ไหนที่เราใช้งานอยู่ด้วย

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

## วิธีดึงข้อมูล OpenBook order books

OpenBook markets ประกอบด้วย order books ที่มี bids และ asks. เราสามารค้นหาข้อมูลพวกนี้ได้ทำให้เรารู้ว่า market ตอนนี้เป็นยังไง และตัดสินใจว่าจะทำอะไรต่อไปได้

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

## วิธีดึงข้อมูล open orders ในปัจจุบัน

ในมุมมองของ trader เราต้องการรู้ open orders ปัจจุบันของเราบน market. เราสามารถค้นหา open orders ของเราเอง หรือของคนอื่นๆ ได้ด้วย OpenBook.

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