---
title: Serum
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การสร้างบน Serum
  - - meta
    - name: og:title
      content: คู่มือ Solana | การสร้างบน Serum
  - - meta
    - name: description
      content: Serum เป็นนวัตกรรม CLOB บน Solana. เรียนรู้วิธีใช้ และสร้างบน Serum
  - - meta
    - name: og:description
      content: Serum เป็นนวัตกรรม CLOB บน Solana. เรียนรู้วิธีใช้ และสร้างบน Serum
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

# Serum

Serum คือ protocol สำหรับ decentralized exchanges สร้างอยู่บน Solana. เราสามารถใช้ Serum เพื่อสร้าง markets, get order books, trade, และอื่นๆ อีกมากมาย

## วิธีดึงข้อมูล Serum market

market บน Serum จะมี orders และความสามารถในการสร้าง orders บน Serum สำหรับการจะทำอะไรบน Serum เราต้องรู้ว่า market ไหนที่เราใช้งานอยู่ด้วย

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีดึงข้อมูล Serum order books

Serum markets ประกอบด้วย order books ที่มี bids และ asks. เราสามารค้นหาข้อมูลพวกนี้ได้ทำให้เรารู้ว่า market ตอนนี้เป็นยังไง และตัดสินใจว่าจะทำอะไรต่อไปได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีดึงข้อมูล open orders ในปัจจุบัน

ในมุมมองของ trader เราต้องการรู้ open orders ปัจจุบันของเราบน market. เราสามารถค้นหา open orders ของเราเอง หรือของคนอื่นๆ ได้ด้วย Serum.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>