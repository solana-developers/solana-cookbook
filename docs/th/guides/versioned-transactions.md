---
title: Versioned Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: description
      content: Transaction format แบบใหม่บน Solana.
  - - meta
    - name: og:description
      content: Transaction format แบบใหม่บน Solana.
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

# Versioned Transactions

Solana เพิ่งจะปล่อย Versioned Transactions ออกมาโดยมีสิ่งที่เปลี่ยนไปก็คือ:

1. มี program ที่เอาไว้จัดการ on-chain address lookup tables
    
2. มี transaction รูปแบบใหม่สำหรับใช้งาน on-chain address lookup tables ได้

## Facts (เรื่องน่ารู้)

::: tip Fact Sheet
- Transaction แบบเก่าจะมีข้อจำกัดอยู่: ขนาดจำกัดอยู่ที่ 1232 bytes, ดังนั้นจำนวน accounts ที่สามารถจัดเก็บได้ใน atomic transaction คือ: 35 addresses.
- Address Lookup Tables (LUTs): เมื่อ accounts ถูกจัดเก็บในตารางนี้ ที่อยู่ของตารางสามารถอ้างอิงใน transaction message โดยใช้ดัชนี(index) u8 ขนาด 1 ไบต์
- `createLookupTable()` ใน `solana/web3.js` สามารถใช้สร้างตารางค้นหาใหม่ได้ และหาที่อยู่ของตารางได้
- เมื่อ LUT ถูกสร้างแล้ว สามารถขยายได้ กล่าวคือสามารถเพิ่มบัญชีในตารางได้
- Versioned Transactions: โครงสร้างของธุรกรรมเก่าต้องถูกปรับเปลี่ยนเพื่อรวม LUTs เข้าไป
- ก่อนที่จะมีการเปลี่ยนมาใช้ version ใหม่นี้ ใน Transactions จะมี bit บนสุดของ byte แรกใน header ที่สามารถเอามาใช้เพื่อในการระบุ version ของ Transactions ได้
:::

เราจะพูดถึงการเปลี่ยนแปลง และ developers ต้องเข้าใจอะไรบ้างอย่างละเอียดมากขึ้น อย่างไรก็ตาม เราต้องเข้าใจโครงสร้าง (anatomy)​ของ transaction ปกติ (หรือเก่า) ก่อนเพื่อเข้าใจการเปลี่ยนแปลงได้อย่างชัดเจน

## Legacy Transaction

The Solana network ใช้ขนาด maximum transactional unit (MTU) อยู่ที่ 1280 bytes, ตามข้อจำกัดขนาดของ [IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) เพื่อให้มีความเร็ว และเชื่อถือได้ ซึ่งทำให้เหลือ **1232 bytes** สำหรับ packet data เช่น serialised transactions.

Transaction ประกอบด้วย:

1. Array ของ signatures, ตัวละ 64 byte ในแบบ [ed25519](https://ed25519.cr.yp.to/).  
2. Message (แบบเก่า)
    

![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Compact-Array format
 
Compact array คือ array ที่ถูก serialised ตามนี้:
 
1. ความยาว Array ในรูปแบบ multi-byte encoding ที่เรียกว่า [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. ตามด้วยแต่ละรายการของ array item  

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## Legacy Message

Legacy Message แบบเก่าจะประกอบด้วยส่วนต่อไปนี้:

1. ส่วนหัวเรื่อง (header)
2. compact-array ของ account addresses, ที่แต่ละ account address จะมีขนาด 32 bytes
3. blockhash ล่าสุด (recent blockhash)
  * คือ 32-byte SHA-256 hash เพื่อบอกเวลาล่าสุดที่ล็อคบัญชีถูกตรวจพบ ถ้า blockhash เก่าเกินไป validator จะปฏิเสธ.
4. compact-array ของ Instructions
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### Header

หัวของข้อความ (message header) จะมีขนาด 3 bytes และมี u8 integers 3 ตัว:

1. จำนวนลายเซ็นที่จำเป็น (required signatures): Solana runtime จะตรวจสอบจำนวนนี้กับความยาวของ compact array ของ signatures ใน transaction.
2. จำนวนของที่อยู่บัญชีสำหรับการอ่านอย่างเดียว (read-only account addresses) ที่ต้องการ signatures
3. จำนวนของที่อยู่บัญชีสำหรับการอ่านอย่างเดียว (read-only account addresses) ที่ไม่ต้องการ signatures
    
![Message Header](./versioned-transactions/message_header.png)

### Compact-array ของ account addresses

Compact array นี้จะเริ่มต้นด้วยการเข้ารหัสตัวเลขจำนวนของ account addresses โดยใช้ Compact-u16 ตามด้วย:

1. **Account addresses ที่ต้องการ signatures**: แสดงรายการของที่อยู่บัญชีที่ต้องการสิทธิ์การอ่าน และเขียนก่อน แล้วตามด้วยอ่านอย่างเดียว
2. **Account addresses ที่ไม่ต้องการ signatures**: เหมือนข้างบนคือ แสดงรายการของที่อยู่บัญชีที่ต้องการสิทธิ์การอ่าน และเขียนก่อน แล้วตามด้วยอ่านอย่างเดียว
    
![Compact array ของ account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### Compact array ของ instructions

เหมือนกับ compact array ของ account addresses, compact array จะเริ่มต้นด้วยการ encode จำนวนของ instructions โดยใช้ `Compact-u16` แล้วตามด้วย array ของ instructions แต่ละตัวที่มีส่วนประกอบดังนี้:

1. **Program ID**: ระบุโปรแกรม on-chain ที่จะดำเนินการ instruction นี้ ซึ่งจะแทนด้วย index ของ u8 ใน compact array ของ account addresses ภายใน message.
2. **Compact array ของ account address indexes**: u8 indexes ของ account addresses ใน compact array ของ account addresses ที่ต้องการ signatures.
3. **Compact array ของ opaque u8 data**: array ของ byte สำหรับใช้งานทั่วไปสำหรับ program ID ที่เคยพูดถึงก่อนหน้านี้. array ของ data นี้จะระบุสิ่งที่โปรแกรมควรดำเนินการ และข้อมูลเพิ่มเติมอื่นๆ ที่อาจไม่มีบอกไว้ใน account.
    
![Compact array ของ Instructions](./versioned-transactions/compact_array_of_ixs.png)

## ข้อจำกัดของ Legacy Transactions

ปัญหาใน Legacy Transactions คืออะไร?

**ขนาดของ transaction ซึ่งหมายถึงจำนวนบัญชีที่จะใช้ได้ใน atomic transaction ได้.**

เหมือนที่อธิบายไว้ก่อนหน้านี้ ขนาดของ Transaction ที่อนุญาตสูงสุดคือ **1232 bytes**. ขนาดของ account address คือ 32 bytes. ดังนั้น transaction จะสามารถเก็บ accounts ได้มากที่สุด **35 accounts** โดยต้องมีพื้นที่สำหรับ headers signatures และข้อมูล metadata ด้วย.

![ข้อจำกัดของ legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

นี่เป็นปัญหาเพราะมีกรณีหลายกรณีที่ developers ต้องการใส่ 100 signature-free accounts ใน transaction เดียว. ซึ่ง legacy transaction เดิมนั้นจะไม่สามารถรองรับได้. วิธีการแก้ไขปัจจุบันที่กำลังถูกนำมาใช้คือการเก็บสถานะ (state) ชั่วคราว on-chain และนำไปใช้ใน transactions ทีหลัง. ซึ่ง workaround นี้จะใช้ไม่ได้เวลาใช้ multiple programs ที่ต้อง compose ใน transaction เดียว. ซึ่งแต่ละ program ก็จะต้องการ accounts หลายตัวเป็น input ทำให้เราเจอกับข้อจำกัดเดิมที่เคยเจอก่อนหน้าอยู่ดี.

เพื่อแก้ไขปัญหานี้จึงมีการนำเสนอ Address Lookup Tables (LUT) ขึ้นมา

## Address Lookup Tables (LUT)

แนวคิดของ Address Lookup Tables คือการเก็บ account addresses ในรูปแบบ table-like (array) data structure บน on-chain. หลังจากที่ accounts ถูกเก็บในตารางนี้แล้ว เราจะสามารถอ้างอิงถึงที่อยู่ของตารางนั้นใน transaction message ได้ โดยใช้ 1-byte u8 เป็น index ชี้ไปที่แต่ละ account.

![LUTs](./versioned-transactions/luts.png)

เพราะแบบนั้นเราเลยไม่ต้องเก็บ addresses ใน transaction message อีกต่อไป เราแค่ต้องการเก็บ u8 ไว้อ้างอิง index ทำให้เราจะเก็บได้มากถึง 2^8=**256** accounts

LUTs ต้องทำ rent-exempt เวลาเริ่มใช้ (initialised) หรือทุกครั้งที่ address ใหม่ถูกเพิ่มเข้าไปในตาราง. Addresses สามารถเพิ่มได้โดยใช้ on-chain buffer หรือเพิ่มโดยตรงในตารางผ่านคำสั่ง `Extension` ใน instruction.  นอกจากนี้ LUTs ยังสามารถเก็บ metadata ที่เกี่ยวข้องตามด้วย compact-array ของ accounts ได้ ด้านล่างนี้คือโครงสร้างของ Address Lookup Table ทั่วไป

![LUT Format](./versioned-transactions/lut_format.png)

เรื่องที่ต้องระวังของ LUTs คือเนื่องจาก address lookups จะมี overhead ระหว่างประมวลผล transaction, ซึ่งจะทำให้ค่า fee สูงขึ้นตามไปด้วย

## Versioned Transactions: TransactionV0

โครงสร้างของ legacy transaction ต้องมีการปรับเปลี่ยนเพื่อให้ใช้ address table lookups ได้. การเปลี่ยนแปลงเหล่านี้ไม่ควรไปทำให้การประมวลผล transaction บน Solana พัง, และก็ไม่ควรไปเปลี่ยนรูปแบบการเรียก program แบบเดิมด้วย

เพื่อให้มั่นใจว่าจะไม่มีอะไรพัง เราจึงจำเป็นต้องระบุชนิดของ transaction ไว้อย่างชัดเจนว่ามันเป็น `legacy` หรือ `versioned`. แล้วเราจะใส่ version ไปตรงไหนของ transaction ดีล่ะ?

ก่อนหน้านี้ transactions จะเหลือ upper bit ที่ไม่ได้ใช้อยู่ที่ byte แรกของ message headers: `num_required_signatures`. เราสามารถใช้ bit นี้ในการประกาศ version ของ transactions ของเราได้.

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

ถ้า bit แรกใน byte แรกถูกตั้งค่า จะทำให้ bit ต่อไปจะหมายถึงหมายเลข version ซึ่ง Solana เริ่มต้นด้วย “Version 0” ซึ่งต้องกำหนดไว้ ถ้าจะเริ่มใช้ LUTs

If the first bit is not set, the transaction will be considered a “Legacy Transaction” and the remainder of the first byte will be treated as the first byte of an encoded legacy message.

หาก bit แรกไม่ถูกตั้งค่า transaction นั้นจะถือว่าเป็น "Legacy Transaction" และส่วนที่เหลือของ byte แรกจะถูกจัดการเหมือนเป็น byte แรกของ message ตามเดิม

## MessageV0

โครงสร้างของ MessageV0 ค่อนข้างเหมือนเดิม เพิ่มเติมคือ...

1. **Message Header**: เหมือนเดิม 
2. **Compact array of account keys**: เหมือนเดิม แต่เราจะใช้แต่ละ byte ไปทำ index แทนเรียกว่า *index array A* (จะมีอธิบายอีกที)
3. **Recent blockhash**: เหมือนเดิม
4. **Compact array of instructions**: เปลี่ยน
5. **Compact array of address table lookups**: เพิ่มมาใน v0
    
![Message v0](./versioned-transactions/messagev0.png)

เราจะมาดูเรื่องโครงสร้างของ compact array ของ address table lookups ก่อนที่จะไปดูว่ามีอะไรเปลี่ยนไปใน instruction array บ้าง

### Compact array ของ address table lookups

โครงสร้างนี้นำเสนอ Address Lookup Tables (LUT) ในการทำ Versioned Transactions ซึ่งทำให้เป็นไปได้ที่จะโหลด accounts ที่สามารถอ่าน และเขียนได้มากขึ้นในธุรกรรมเดียว

ส่วน compact array จะเริ่มด้วย compact-u16 encoding ของจำนวนของ address table lookups, ตามด้วย array ของ address table lookups. แต่ละ lookup จะมีโครงสร้างตามนี้:

1. **Account key**: account key ของ address lookup table
2. **Writable indexes**: compact array ของ indexes เอาไว้โหลด account addresses ที่เขียนได้อย่างเดียว. เราจะเรียกมันว่า  *index array B*.
3. **Readonly indexes**: compact array ของ indexes เอาไว้โหลด account addresses ที่อ่านได้อย่างเดียว. เราจะเรียกมันว่า *index array C*.
    
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

ทีนี้เราลองมาดูกันว่ามีอะไรเปลี่ยนแปลงใน instructions compact array กันบ้าง

### Compact array ของ instructions

เหมือนกับที่ได้พูดไว้ก่อนหน้านี้ คือ compact array ของ legacy instruction ที่จัดเก็บ legacy instruction แต่ละคำสั่งซึ่งในลักษณะเบื้องต้นจะเก็บข้อมูลต่อไปนี้:

1. index ของ Program ID
2. Compact array ของ account address indexes
3. Compact array ของข้อมูล opaque 8-bit
    
การเปลี่ยนแปลงใน instruction ใหม่ไม่ได้อยู่ในโครงสร้างของ instruction แต่จะอยู่ใน array ที่เราใช้เก็บ index ของ 1 กับ 2. ซึ่งใน legacy transactions จะใช้บางส่วนของ index array A แต่ใน versioned transactions เราจะใช้บางส่วนที่ได้จากการรวม array ต่อไปนี้แทน:

1. **index array A**: Compact array ของ accounts ที่เก็บไว้ใน message    
2. **index array B**: Writable indexes ใน address table lookup
3. **index array C**: Readonly indexes ใน address table lookup
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## RPC Changes

Transaction ที่ตอบกลับมา (responses)จะต้องระบุ version field: `maxSupportedTransactionVersion` เพื่อบอก clients ว่าจะแกะ(deserialisation) transaction ยังไง.

methods ต่อไปนี้จำเป็นต้อง update เพื่อหลีกเลี่ยงข้อผิดพลาด:

* `getTransaction`
* `getBlock`
    

และต้องเพิ่ม parameter นี้เข้าไปตอนเรียกขอข้อมูล (requests):

`maxSupportedTransactionVersion: 0`

ถ้า `maxSupportedTransactionVersion` ไม่ได้ใส่มาใน request, transaction version จะถือว่าเป็นเป็น `legacy`. และถ้า block ไหนมี versioned transaction จะทำให้เกิด error ได้.

เราสามารถใส่ค่านี้เพิ่มเป็น JSON formatted requests ไปหา RPC endpoint ได้ตามตัวอย่างข้างล่าง:

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

หรือใช้ผ่าน library [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) ก็ได้เหมือนกัน.

```js
// connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## แหล่งข้อมูลอื่นๆ
* [How to build a Versioned Transaction](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [How to build a Versioned Transaction with Address Lookup using LUTs](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [Limitations of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [Security concerns of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [Alternate proposed solutions to Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## อ้างอิง
* [Transactions-V2 Proposal](https://beta.docs.solana.com/proposals/transactions-v2)
* [Developing with Versioned Transactions](https://beta.docs.solana.com/developing/versioned-transactions)