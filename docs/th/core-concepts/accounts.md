---
title: Accounts
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Accounts
  - - meta
    - name: og:title
      content: คู่มือ Solana | Accounts
  - - meta
    - name: description
      content: Accounts คือส่วนสำคัญในการพัฒนาบน Solana. เรียนรู้เกี่ยวกับ Accounts และแนวคิดหลักๆ ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: Accounts คือส่วนสำคัญในการพัฒนาบน Solana. เรียนรู้เกี่ยวกับ Accounts และแนวคิดหลักๆ ได้ที่คู่มือ Solana.
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

# Accounts

Accounts ใน Solana จะเอาไว้เก็บ state และเป็นส่วนสำคัญในการพัฒนาบน Solana.

## เรื่องน่ารู้

::: tip Fact Sheet

- Accounts เอาไว้เก็บข้อมูล (data)
- แต่ละ account มี address ที่ไม่ซ้ำกัน
- Accounts มีขนาดได้ไม่เกิน 10MB (10 Mega Bytes)
- PDA accounts มีขนาดได้ไม่เกิน 10KB (10 Kilo Bytes)
- PDA accounts สามารถใช้ sign แทน program ได้
- ขนาดของ Accounts จะถูกกำหนดตั้งแต่ตอนสร้าง แต่สามารถเปลี่ยนได้ทีหลังด้วยการ [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- พื้นที่เก็บ data ใน Account ต้องจ่ายยค่าเช่า (rent)
- เจ้าของ account ตาม default คือ System Program
  :::

## ลงลึก

### Account Model

accounts บน Solana จะมี 3 แบบ:

- Data accounts เอาไว้เก็บ data
- Program accounts เอาไว้เก็บ executable programs
- Native accounts คือพวก native programs บน Solana เช่น System, Stake, และ Vote

data accounts มี 2 ประเภท:

- accounts ที่มี System เป็นเจ้าของ
- PDA (Program Derived Address) accounts

แต่ละ account จะมี address (ก็คือ public key) และมี owner
(address ของ program account). โดย account จะมี field ตามด้านล่างนี้

| Field      | คำอธิบาย                                        |
| ---------- | ---------------------------------------------- |
| lamports   | จำนวน lamports ที่ account มีอยู่                   |
| owner      | program ที่เป็นเจ้าของ account นี้                   |
| executable | account นี้สามารถประมวลผล instructions ได้หรือไม่   |
| data       | ข้อมูลดิบเป็น byte array ที่เก็บอยู่ใน account นี้        |
| rent_epoch | epoch ถัดไปที่ account นี้จะเป็นหนี้ค่าเช่า rent         |

กฏที่สำคัญเกี่ยวกับ ownership:

- เฉพาะเจ้าของ data account ที่สามารถแก้ไขข้อมูลของตัวเองได้ และถอน lamports ออกมาได้
- ทุกคนสามารถฝาก lamports เข้า data account ได้
- เจ้าของ account สามารถโอนเปลี่ยนเจ้าของใหม่ได้ ถ้า data ใน account ไม่มีแล้ว (zeroed out)

Program accounts ไม่เก็บ state.

ตัวอย่างเช่น ถ้าเรามี counter program ที่ให้เราเพิ่มจำนวน counter ได้, เราต้องสร้าง 2 accounts โดยที่ account แรกจะเอาไว้เก็บ code ของ program และอีกอันเอาไว้เก็บจำนวน counter

![](./account_example.jpeg)

คุณต้องจ่าย Rent (ค่าเช่า) เพื่อป้องกัน account จากการถูกลบ

### Rent (ค่าเช่า)

การเก็บข้อมูลบน account จะเสีย SOL ในการดูแล และมันจะถูกจ่ายโดยเรียกว่า rent (ค่าเช่า) ถ้าคุณจ่ายทิ้งไว้ให้ครอบคลุมขั้นต่ำ 2 ปี คุณก็จะได้รับการยกเว้นค่าเช่า (rent exempt) และคุณยังสามารถเอา lamports คืนได้ด้วยการปิด (close) account และส่ง lamports คืนสู่ wallet

Rent จะถูกจ่ายเมื่อ 2 เหตุการณ์นี้เกิดขึ้น:

1. เมื่อถูกอ้างอิงด้วย transaction
2. เมื่อจบรอบ epoch

จำนวน % ของ rent ที่ถูกเก็บจาก accounts จะถูกทำลาย ในขณะที่จำนวนที่เหลือจะถูกแจกจ่ายไปให้ vote account เมื่อจบรอบของทุก slot

ถ้า account ไม่มี lamports เพียงพอที่จะจ่าย rent จะทำให้ account ถูกจัดสรรคืน deallocated และข้อมูลก็จะหายไป

และเราต้องจำไว้ด้วยว่า account ใหม่จะต้องจ่ายค่า rent exempt สำรองไว้เพื่อยกเว้นค่าเช่าเสมอ

## แหล่งข้อมูลอื่น

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

หลักการนี้เป็น credit ของ Pencilflip. [ติดตามเค้าได้ทาง Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
