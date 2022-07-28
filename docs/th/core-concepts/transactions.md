---
title: Transactions
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Transactions
  - - meta
    - name: og:title
      content: คู่มือ Solana | Transactions
  - - meta
    - name: description
      content: Transaction คือส่วนประกอบของหลายๆ operational บน Solana, เรียนรู้เกี่ยวกับ Transaction และแนวคิดหลักๆ ได้ที่คู่มือ Solana
  - - meta
    - name: og:description
      content: หลายๆ operational บน Solana จะประกอบอยู่ในที่เดียวกันที่เรียกว่า Transaction. เรียนรู้เกี่ยวกับแนวคิดหลักๆ ได้ที่คู่มือ Solana
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

# Transactions

Clients สามารถ invoke [programs](./programs.md) ด้วยการส่ง (submitting) transaction ไปที่ cluster. transaction จะประกอบไปด้วย instructions, โดยแต่ละอันจะมีเป้าหมายไปที่ program ของตัวเอง. เมื่อ transaction submit ไปแล้ว, Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) จะ process instructions ตามลำดับ และทำในระดับ atomic. ถ้ามีส่วนไหนของ instruction ล้มเหลว (fail), ทั้ง transaction จะ fail ทั้งหมด.

## เรื่องน่ารู้

::: tip Fact Sheet
- Instructions คือหน่วยการทำงานพื้นฐานที่สุดของ Solana
- แต่ละ instruction จะมี:
    - `program_id` ของ program
    - ชุดของ `accounts` ทั้งหมดที่ต้องอ่าน (read) หรือเขียน (write)
    - `instruction_data` byte array ที่จำเพาะเจาะจงสำหรับแต่บะ program
- สามารถใส่เ instructions ได้มากกว่าหนึ่งตัว เข้าไปในหนึ่ง transaction
- แต่ละ transaction จะมี:
    - ชุดของ `accounts` ทั้งหมดที่ต้องอ่าน (read) หรือเขียน (write)
    - `instructions` หนึ่งตัว หรือมากกว่า
    - `blockhash` ล่าสุด (recent)
    - `signatures` หนึ่งตัว หรือมากกว่า
- Instructions จะ process instructions ตามลำดับ และทำในระดับ atomic
- ถ้ามีส่วนไหนของ instruction ล้มเหลว (fail), ทั้ง transaction จะ fail ทั้งหมด
- ขนาดของ Transactions จำกัดอยู่ที่ 1232 bytes
:::

## ลงลึก

Solana Runtime ต้องการให้ทั้ง instructions และ transactions ระบุ accounts ทั้งหมดที่จะอ่าน หรือเขียน การที่เราเตรียม accounts ไว้ก่อนแบบนี้จะทำให้ runtime สามารถทำงานขนานกัน (parallelize execution) ได้ทั้ง transactions.

เมื่อ transaction ถูก submit ไปที่ cluster แล้ว, ตัว runtime จะ process instructions ตามลำดับ และทำในระดับ atomic. สำหรับแต่ละ instruction,  program ที่รับไปจะแปล (interpret) data array และทำงานบน accounts ที่กำหนดไว้. program จะส่งผลสำเร็จ หรือความผิดพลาด (error code) กลับมา. ถ้าส่ง error กลับมา ทั้ง transaction จะ fail ทันที.

transaction ที่เป็นการถอนเงิน (debit) จาก account หรือจะแก้ไข data จะต้องมี signature ของเจ้าของ account นั้นส่งมาด้วย. account ไหนที่สามารถเขียนได้ จะถูกระบุไว้ว่า `writable`. account สามารถรับเงิน (credited) โดยไม่ต้องได้รับอนุญาตจากเจ้าของ ทั้งนี้คนจ่าย (payer)ได้จ่ายครอบคลุมค่า rent และ transaction fees ไปแล้ว.

ก่อนการ submission, ทุก transactions จะต้องอ้างไปที่ [recent blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). โดยที่ blockhash จะใช้ในการป้องกันการส่ง transactions ซ้ำ และ transactions ที่เก่าเกินไป. จำนวนสูงสุดของ  transaction's blockhash คือ 150 blocks, หรือประมาณ ~1 นาที 19 วินาที ในเวลาตอนที่เขียนนี้.

### ค่าธรรมเนียม (Fees)

Solana จะเก็บ fee 2 แบบ:
- [Transaction fees](https://docs.solana.com/transaction_fees) สำหรับทำ transactions (หรือที่เรียกว่า “gas fees”)
- [Rent fees](https://docs.solana.com/developing/programming-model/accounts#rent) สำหรับเก็บ data on-chain 

สำหรับ Solana, transaction fees จะเป็น deterministic (ทุกเหตุการณ์ที่เกิดขึ้น มีปัจจัยที่สามารถกำหนดได้โดยสมบูรณ์): จะยังไม่มี fee market ที่ผู้ใช้ สามารถ จ่าย fees สูงกว่าเพื่อเพิ่มโอกาสในการถูกประมวลผลใน block ถัดไปในเวลาตอนที่เขียนนี้, transaction fees จะเก็บตามจำนวนของ signatures ที่ต้องการใช้ (`lamports_per_signature`), ไม่ใช่ตามจำนวน resources ที่ใช้ไป ทั้งนี้เป็นเพราะมี hard cap 1232 bytes ในทุกๆ transactions อยู่.

ทุกๆ transactions จะต้องมี `writable` account อย่างน้อยหนึงตัวสำหรับ sign transaction. เมื่อ submitted แล้ว writable signer account ที่ถูก serialized เป็นตัวแรกจะเป็น fee payer และ account นี้จะจ่ายค่า transaction โดยไม่สนใจว่า transaction จะสำเร็จหรือไม่. ถ้า fee payer ไม่มี balance พอที่จะจ่าย transaction fee ได้ transaction ก็จะถูกทิ้งไป (dropped).

ในเวลาตอนที่เขียนนี้, 50% ของทุก transaction fees จะถูกเก็บไปโดย validator ที่เป็นคนสร้าง block, ในขณะที่ 50% ที่เหลือจะถูกเผาทิ้ง (burn). โครงสร้างแบบนี้มีขึ้นเพื่อเป็นแรงจูงใจให้ validators ประมวณผล transactions ให้มากที่สุดเท่าที่จะเป็นไปได้ในช่วง slots ในขณะที่เป็นผู้นำ (leader)

## แหล่งข้อมูลอื่น

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
