---
title: Sending Offline Transactions
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Sending Offline Transactions
  - - meta
    - name: og:title
      content: คู่มือ Solana | Sending Offline Transactions
  - - meta
    - name: description
      content: หลังจาก sign Offline Transaction ไปแล้วไม่ว่าใครก็จะสามารถ broadcast มันไปที่ network ได้ เรียนรู้เกี่ยวกับ Sending Offline Transactions และข้อมูลอ้างอิงได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: หลังจาก sign Offline Transaction ไปแล้วไม่ว่าใครก็จะสามารถ broadcast มันไปที่ network ได้ เรียนรู้เกี่ยวกับ Sending Offline Transactions และข้อมูลอ้างอิงได้ที่คู่มือ Solana.
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

# Offline Transaction

## Sign Transaction

การสร้าง offline transaction เราสามารถ sign transaction และให้คนอื่น broadcast ไปที่ network ได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Partial Sign Transaction

เมื่อ transaction ต้องการ signatures หลายอันเราสามารถแยกกัน partially sign ได้
โดย signers อื่นสามารถ sign และ broadcast ไปที่ network ได้

ตัวอย่างการใช้งาน:

- ส่ง SPL token เพื่อกำระเงิน
- Sign transaction เพื่อให้เราสามารถตรวจสอบความถูกต้องได้ทีหลัง
- เรียก custom programs ใน transaction ที่ต้องการ signature ของเรา

ในตัวอย่างนี้ Bob จะส่ง SPL token ให้ Alice เพื่อเป็นการชำระเงิน:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Durable Nonce

`RecentBlockhash` เป็นค่าที่สำคัญในการทำ transaction ซึ่ง transaction จะโดนปฏิเสธ(rejected) ถ้าเราใช้ blockhash ที่หมดอายุไปแล้ว (เลย 150 blocks) เราสามารถใช้ `durable nonce` เพื่อหา blockhash ที่ไม่มีวันหมดอายุๆด้ โดยเราจะต้อง

1. ใช้ `nonce` ที่เก็บไว้ใน `nonce account` แทน recent blockhash
2. ใส่ `nonce advance` ใน instruction

### Create Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Get Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Use Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
