---
title: Migrating Program Data Accounts
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Program Accounts Data Migration
  - - meta
    - name: og:title
      content: คู่มือ Solana | Program Accounts Data Migration
  - - meta
    - name: description
      content: โดยพื้นฐานแล้วการทำ version ให้ data เพื่อที่จะสนับสนุนการ migration จะหมายถึงการสร้าง reference ที่ไม่ซ้ำ (unique) สำหรับชุดของ data โดยที่ reference นี้จะสามารถใช้ตามรูปแบบของการ query,แบบ ID, หรือใช้ datetime identifier. เรียนรู้เกี่ยวกับการ Serialization แลเทคนิคอื่นๆ ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: โดยพื้นฐานแล้วการทำ version ให้ data เพื่อที่จะสนับสนุนการ migration จะหมายถึงการสร้าง reference ที่ไม่ซ้ำ (unique) สำหรับชุดของ data โดยที่ reference นี้จะสามารถใช้ตามรูปแบบของการ query,แบบ ID, หรือใช้ datetime identifier. เรียนรู้เกี่ยวกับการ Serialization แลเทคนิคอื่นๆ ได้ที่คู่มือ Solana.
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

# Migrating a Programs Data Accounts

## เราสามารถ migrate program's data accounts ได้ยังไง?

เวลาที่เราสร้าง program ขึ้นมา แต่ละ data account ที่เกี่ยวข้อง (associated) กับ
program จะมี data structure ที่ตายตัว. แล้วถ้าเราต้องการที่จะ upgrade program derived account สุดท้ายเราจะมี program derived accounts ที่เป็น structure เก่าเหลือทิ้งไว้อยู่จำนวนหนึ่ง

แต่ถ้าเราใช้วิธี account versioning, เราจะสามารถ upgrade accounts เก่าไปเป็น structure ใหม่ได้

:::tip Note
นี่เป็นเพียงหนึ่งในหลายวิธีในการทำ migration สำหรับ Program Owned Accounts (POA).
:::

## สถานการณ์ (Scenario)

การจะทำ version และ migrate account data เราจะต้องเตรียม **id** สำหรับแต่ละ account. ซึ่ง id เหล่านี้จะช่วยให้เราสามารถบ่งบอก account version ได้เวลาที่เราส่งมันเข้าไปใน  program, และทำให้เราสามารถจัดการ account ได้อย่างถูกต้อง

ลองดู account state และ program ด้านล่างนี้:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

ใน account version แรกของเรา เราได้ทำสิ่งต่อไปนี้:

| ID | Action |
| - | - |
|1| ใส่ 'data version' field เพิ่มเข้าไปใน data มันสามารถใช้ incrementing ordinal ง่ายๆ (เช่น u8) หรืออะไรที่ซับซ้อนกว่านั้นก็ได้
|2| จัดสรรพื้นที่ให้เพียงพอต่อขนาดของ data ที่จะเพิ่มขึ้น
|3| Initializing ค่าคงที่เป็นตัวเลขที่จะใช้เป็น program versions
|4| เพิ่ม update account function ภายใต้ `fn conversion_logic` เพื่อ upgrades ในอนาคต

สมมติว่าเราต้องการ upgrade program's accounts ของเราตอนนี้ เพื่อที่ใส่ field ที่ต้องการเข้าไปชื่อว่า `somestring` ถ้าเราไม่ได้จัดสรรพื้นที่เผื่อไว้ใน account ก่อนหน้า, เราจะไม่สามารถ upgrade account ได้และติดอยู่แบบนั้น

## Upgrading the Account

ใน program ใหม่ของเรา เราจะเพิ่ม property สำหรับ content state เข้าไป
สิ่งที่ต้องทำเพิ่มคือ วิธีการสร้างตอน initial program เพราะเรากำลังจะใช้งานมันแล้วในตอนนี้

### 1. Add account conversion logic

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Line(s) | Note |
| ------- | - |
| 6 | เราได้เพิ่ม Solana `solana_program::borsh::try_from_slice_unchecked` เพื่อทำให้ง่ายต่อการอ่าน subsets ของ data จาก data block ขนาดใหญ่
| 13-26| จุดนี้เรายังคงใช้ structure เดิมคือ `AccountContentOld` บรรทัดที่ 24, ก่อนจะเพิ่ม `AccountContentCurrent` ไปในบรรทัดที่ 17.
| 60 | เรา bump ค่าคงที่ `DATA_VERSION`
| 71 | ตอนนี้เรามี version 'ก่อนหน้า' และ เราอยากรู้ขนาดของมัน
| 86 | ในขั้นตอนนี้เราจะเพิ่ม `conversion_logic` เพื่อ upgrade content state ก่อนหน้าไป content state ใหม่ (ปัจจุบัน)

จากนั้นเราก็จะไป update instructions ของเรา เพื่อที่จะเพิ่ม `somestring`, และ processor สำหรับจัดการ instruction ใหม่. Note ไว้ว่าการ 'upgrading' data structure จะถูกซ่อนอยู่ภายใต้การ `pack/unpack`

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

หลัวจาก build และ submit instruction แล้ว: `VersionProgramInstruction::SetString(String)` ตอนนี้เราจะมี 'upgraded' account data layout ตามภาพ

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)