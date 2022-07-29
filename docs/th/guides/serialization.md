---
title: Serializing Data
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Serializing Data
  - - meta
    - name: og:title
      content: คู่มือ Solana | Serializing Data
  - - meta
    - name: description
      content: เรียนรู้วิธี serialize และ deserialize data บน Solana
  - - meta
    - name: og:description
      content: เรียนรู้วิธี serialize และ deserialize data บน Solana
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

# Serializing Data

เวลาที่เราจะทำ serialization เราจะหมายถึงทั้งการ serialize data และการ deserialize data.

Serialization เข้ามามีส่วนทั้งใน Solana program และใน program accounts:

1. Serializing instruction data ที่ client
2. Deserializing instruction data ใน program
3. Serializing Account data ใน program
4. Deserializing Account Data ที่ client

การ serialization ในแต่ละที่สามารถทำได้เหมือนๆ กัน โดย code สั้นๆ (snippets) จะแสดงให้เห็นตัวอย่างของการ serialization โดยใช้ [Borsh](#resources).

ตัวอย่างใน document นำมาจาก [Solana CLI Program Template](#resources)

## การติดตั้งสำหรับ Borsh Serialization

Libraries สำหรับ Borsh ที่ต้องติดตั้งสำหรับ Rust program, Rust client, Node and/or Python client.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## วิธี serialize instruction data ที่ client

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

ถ้าเราจะ serializing instruction data เพื่อส่งให้ program เราจะต้องทำเหมือนที่ program จะ deserializes instruction data เข้าไป.

ใน template นี้ตัว instruction data block ก็คือ serialized array ตามตัวอย่าง:

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | instruction ใช้ไม่ได้             | instruction ใช้ไม่ได้             |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | instruction ใช้ไม่ได้             |
| Burn (2)                    | "foo"                          | instruction ใช้ไม่ได้             |

ตามตัวอย่างต่อไปนี้ เราจะถือว่าaccount ของ program นี้ได้ถูก initialized แล้ว

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## วิธี deserialize instruction data ใน program

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## วิธี serialize account data ใน program

<img src="./serialization/ser3.png" alt="Account Data Serialization">

program account data block (จาก repo เดียวกัน) มีรูปแบบดังนี้

| Byte 0           | Bytes 1-4                      | เหลือ 1019 Bytes                            |
| ---------------- | ------------------------------ | ------------------------------------------ |
| Initialized flag | ความยาวของ serialized BTreeMap | BTreeMap (ที่เก็บ key value pairs)            |

### Pack

เกี่ยวกับ [Pack][1] trait

Pack trait จะซ่อนรายละเอียดในการ serialization/deserialization account data จากการ process Program instruction ดังนั้นแทนที่จะใส่ serialize/deserialize log ใน program processing code มันจะซ่อนรายละเอียดอยุ่ใน (3) functions:

1. `unpack_unchecked` - ทำให้เรา deserialize account โดยไม่ตรวจว่ามันถูก initialized ไปรึยัง มันจะมีประโยชน์ตอนที่เรา process Initialization function (variant index 0)
2. `unpack` - เรียกใช้ `unpack_from_slice` ใน Pack และตรวจสอบว่า account ถูก initialized แล้ว.
3. `pack` - เรียกใช้ `pack_into_slice` ใน Pack

นี่คือตัวอย่าง program ของเราที่มีการ implementation ของ Pack trait และต่อด้วยการ process account data โดยใช้ borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialization/Deserialization

เพื่อที่จะเข้าใจการทำงานเบื้องหลังทั้งหมด serialization และ deserialization:

1. `sol_template_shared::pack_into_slice` - คือที่ๆ การ serialization เกิดขึ้น
2. `sol_template_shared::unpack_from_slice` - คือที่ๆ การ deserialization เกิดขึ้น

**Note** เราจะมี `u32` (4 bytes) ใน data layout เอาไว้แบ่ง​(partition) ซึ่งในนั้นจะมี
`BTREE_LENGTH` ตามด้วย `BTREE_STORAGE` ทั้งนี้เราต้องมีไว้เพื่อ borsh ตอน deserialization,
ตรวจสอบขนาดของ slice ที่เราจะ deserializing เลือกจำนวนของ data ที่จะอ่านก่อนที่จะไปรวม object ที่ได้มา. วิธีในตัวอย่างต่อไปนี้เราจะอ่าน `BTREE_LENGTH` ขนาดก่อนแล้วค่อย `slice` มันออกจาก
`BTREE_STORAGE` pointer.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### การใช้งาน

ตัวอย่างต่อไปเราจะประกอบทุกอย่างเข้าด้วยกัน และจะแสดงวิธีที่ program ทำงานร่วมกับ `ProgramAccountState` ซึ่งมี initialization flag และ `BTreeMap` สำหรับ key/value pairs เก็บไว้อยู่ในนั้น

อันดับแรก เมื่อเราต้องการเริ่มต้นบัญชีใหม่:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Now we สามารถ operate on our other instructions as the following demonstrates minting a new
key value pair that we demonstrated above when sending instructions from a client:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## วิธี deserialize account data ที่ client

เวลาที่ Clients ดึง program account จาก Solana จะมี serialized
data block ติดมาด้วยส่วนนึง การที่จะ deserializing ในส่วนนี้เราจะต้องรู้จักรูปแบบ data block
layout ก่อน

layout ของ account data มีอธิบายไว้ [ที่นี่](#account-data-serialization)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Solana TS/JS Mappings ทั่วไป

[Borsh Specification](#resources) มีการ mappings สำหรับ primitive และ
compound data types ทั้งหมด.

กุญแจของ TS/JS และ Python คือการกำหนด Borsh Schema ด้วยคำนิยาม (definition) ที่ถูกต้อง เวลา serialize
และ deserialize จะได้สามารถสร้างหรือทำงานกับ inputs ได้อย่างไม่มีปัญหา.

นี่คือตัวอย่างของการทำ serialization ของ primitives (numbers, strings) และ compound types (fixed size array, Map)
เริ่มจาก Typescript แล้วไปต่อที่ Python และสุดท้ายทำการ deserialization แบบเดียวกันด้วย Rust:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Advanced Constructs

เราได้แสดงวิธีสร้าง Payloads ง่ายๆ ในตัวอย่างที่แล้ว ซึ่งในบางครั้ง Solana จะคืน data types นั้นๆ มาให้เลย ในส่วนนี้เราจะแสดงตัวอย่างการ mapping ระหว่าง TS/JS และ Rust เพื่อที่จะจัดการมันได้

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Resources

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
