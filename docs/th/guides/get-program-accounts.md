---
title: Get Program Accounts
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Get Program Accounts
  - - meta
    - name: og:title
      content: คู่มือ Solana | Get Program Accounts
  - - meta
    - name: description
      content: เรียนรู้วิธี query data บน Solana โดยใช้ getProgramAccounts และ accountsDB
  - - meta
    - name: og:description
      content: เรียนรู้วิธี query data บน Solana โดยใช้ getProgramAccounts และ accountsDB
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

# Get Program Accounts

นี่ตือ RPC method ที่จะคืนค่า accounts ที่ program เป็นเจ้าของ. ในตอนนี้ยังไม่สนับสนุน pagination. การ requests ไปที่ `getProgramAccounts` จะต้องส่ง parameters `dataSlice` และ/หรือ `filters` ไปด้วยเพื่อลด response time และจะได้ส่งกลับมาเฉพาะผลลัพท์ที่ต้องการ. 

## เรื่องน่ารู้

::: tip Parameters

- `programId`: `string` - Pubkey ของ program ที่จะ query, เตรียมในรูปแบบ base58 encoded string
- (optional) `configOrCommitment`: `object` - Configuration parameters ที่มี optional fields ตามนี้:
    - (optional) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optional) `encoding`: `string` - Encoding สำหรับ account data, ทั้ง: `base58`, `base64`, หรือ `jsonParsed`. Note, web3js ต้องใช้ [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts) แทน
    - (optional) `dataSlice`: `object` - จำกัดผลลัพท์ account data โดยขึ้นอยู่กับ:
        - `offset`: `number` - จำนวนของ bytes เริ่มต้นของ account data ที่จะเริ่มคืนค่ามา
        - `length`: `number` - จำนวนของ bytes ของ account data ที่จะส่งกลับมา
    - (optional) `filters`: `array` - คัดกรอง results โดยใช้ filter objects ข้างล่าง:
        - `memcmp`: `object` - ตรงกับ series ของ bytes ของ account data:
            - `offset`: `number` - จำนวนของ bytes เริ่มต้นของ account data ที่จะเทียบ
            - `bytes`: `string` - Data ที่จะเทียบด้วย, ในรูปแบบ base58 encoded string จำกัดที่ 129 bytes
        - `dataSize`: `number` - เทียบ account data length ด้วย data size ที่ระบุไว้
    - (optional) `withContext`: `boolean` - ครอบ (wrap)​ ผลลัพท์ในรูปแบบ [RpcResponse JSON object](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Response

ตามปกติแล้ว `getProgramAccounts` จะคืนค่า array ของ JSON objects ที่มีโครงสร้างตามนี้:

- `pubkey`: `string` - account pubkey ในรูปแบบของ base58 encoded string
- `account`: `object` - JSON object ที่มี fields:
    - `lamports`: `number`, ตัวเลขของ lamports ที่มีใน account
    - `owner`: `string`, base58 encoded pubkey ของ program ที่ account ได้ assigned ไว้
    - `data`: `string` | `object` - data ที่เกี่ยวข้องกับ account อาจจะเป็นได้ทั้ง encoded binary data หรือ JSON format ขึ้นอยู่กับ encoding parameter
    - `executable`: `boolean`, ตัวบ่งชี้ว่า account นี้มี program
    - `rentEpoch`: `number`, epoch ที่ account นี้จะต้องจ่าย rent
:::

## ลงลึก

`getProgramAccounts` คือ RPC method ที่จะคืนค่าทุก accounts ที่ program เป็นเจ้าของ. เราสามารถใช้ `getProgramAccounts` สำหรับดึงข้อมูลได้หลายแบบ เช่น:

- หาทุกๆ token accounts ของ wallet
- หาทุกๆ token accounts ที่มี mint เดียวกัน(เช่น ทุกๆ คนที่ถือ token [SRM](https://www.projectserum.com/) ไว้)
- หาทุกๆ custom accounts ที่ใช้ program นี้(เช่น ทุกๆ คนที่ใช้ [Mango](https://mango.markets/))

นอกจากจะมีประโยชน์แล้ว, `getProgramAccounts` ยังถูกเข้าใจผิดอยู่บ้าง เพราะด้วยข้อจำกัดของมัน การดึงข้อมูลที่ใช้ `getProgramAccounts` จะทำให้ RPC nodes ค้นหา data ขนาดใหญ่. การค้นหานั้นกินทั้ง memory และ resource มากๆ. ผลที่เกิดขึ้นคือถ้าเรียกใช้บ่อยเกินไป หรือใหญ่เกินไปจะทำให้เกิด connection timeouts ได้. ในตอนนี้ `getProgramAccounts` endpoint ยังไม่สนับสนุน pagination. ถ้าผลการค้นหาใหญ่เกินไปผลลัพท์จะถูกตัดทิ้ง.

เพื่อหลีกหนีข้อจำกัดนี้, `getProgramAccounts` เลยมี parameters ให้ใช้: ชื่อ, `dataSlice` และ `filters` options `memcmp` และ `dataSize`. ถ้าใช้ parameters เหล่านี้, เราจะสามารถลดขอบเขตของการค้นหาให้แคบลงเพื่อควบคุม และประมาณขนาดของผลลัพท์ได้.

ตัวอย่างทั่วไปของ `getProgramAccounts` ที่เกี่ยวข้องกับ [SPL-Token Program](https://spl.solana.com/token) เช่น การค้นหาทุกๆ accounts ที่ Token Program เป็นเจ้าของโดยใช้ [การค้นหาแบบปกติ](../references/accounts.md#get-program-accounts) จะทำให้ต้องไปค้นหาข้อมูลมากมาย แต่ถ้าเราใส่ parameters เข้าไปด้วยเราจะสามารถ request ได้อย่างประสิทธิภาพ และได้ data เฉพาะที่เราจะใช้.

### `filters`
parameter ที่ใช้บ่อยๆ สำหรับ `getProgramAccounts` คือ `filters` array. ซึ่ง array นี้จะรับ filters 2 แบบคือ `dataSize` และ `memcmp` ก่อนที่จะใช้ filters นี้เราต้องรู้ก่อนว่า data ที่เราจะร้องขอมีรูปแบบยังไง และจัดเรียงไว้ยังไง.

#### `dataSize`
ในกรณีของ Token Program, เราจะเห็นว่า [token accounts มีขนาด 165 bytes](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). และ token account จะมี 8 fields ที่แตกต่างกันโดยแต่ละ field จะมีขนาด bytes ที่แน่นอน เราสามารถแสดง visualize ว่า data มีการวางรูปแบบยังไงโดยใช้รูปด้านล่าง.

![Account Size](./get-program-accounts/account-size.png)

ถ้าเราต้องการหาทุกๆ token accounts โดยมี wallet address ของเราเป็นเจ้าของ, เราสามารถใส่ `{ dataSize: 165 }` ใน `filters` เพื่อลดขอบเขตการค้นหาของเราให้เหลือเฉพาะ accounts ที่ขนาด 165 bytes เท่านั้น แต่เท่านี้ก็ยังไม่ดีพอ เราต้องต้องใส่ filter เข้าไปด้วยว่าเราเป็นเจ้าของ (owner) มันด้วย เราสามารถทำได้ด้วยการเพิ่ม `memcmp` filter เข้าไป.

#### `memcmp`
`memcmp` filter หรือ "memory comparison" filter, จะทำให้เราสามารถเปรียบเทียบ data ใน field ไหนก็ได้ที่เก็บอยู่ใน​ account ของเรา. โดยเฉพาะเราสามารถค้นหาเฉพาะ accounts ที่ตรงกับ bytes ที่ตำแหน่งใดๆ. `memcmp` ต้องการ 2 arguments:

- `offset`: ตำแหน่งที่จะเริ่มเทียบ data มีขนาดเป็น bytes และแสดงเป็นจำนวนเต็ม.
- `bytes`: คือ data ตรงกับ account's data. จะใช้ base-58 encoded string ขนาดไม่เกิน 129 bytes.

แต่ต้องระวังไว้ว่า `memcmp` จะคืนค่ามาก็ต่อเมื่อเจอ `bytes` ตรงกันเท่านั้น ซึ่งในตอนนี้เรายังไม่สามารถเทียบหาค่าที่น้อยกว่า หรือมากกว่า `bytes` ที่เราใส่ไปได้

ในตัวอย่าง Token Program อันต่อไป, เราสามารถกำหนดการค้นหาให้คืนค่ามาเฉพาะ token account ที่ตรงกับ wallet address ของเรา ถ้าเราลองดูที่ token account จะเห็นว่า 2 fields แรกบน token account คือ pubkeys, และแต่ละ pubkey จะมีขนาด 32 bytes โดยที่ `owner` จะอยู่ที่ field ที่ 2 เราจึงสามารถเริ่ม `memcmp` ที่ `offset` ที่ 32 bytes จากตรงนั้นเราก็สามารถมองหา account ที่ ower ตรงกับ wallet address ของเรา

![Account Size](./get-program-accounts/memcmp.png)

เราสามารถลอง query ได้ด้วยตัวอย่างด้านล่าง:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

นอกจาก 2 filter parameters นี้แล้ว, parameter ที่ 3 ที่ใช้บ่อยสำหรับ `getProgramAccounts` ก็คือ `dataSlice` แต่จะไม่เหมือน parameter `filters` ตรงที่ `dataSlice` จะไม่ลดผลการค้นหาของ accounts แต่ `dataSlice` จะจำกัดจำนวน data ที่ค้นหาได้แทน

คล้ายๆ `memcmp`, `dataSlice` จะรับ 2 arguments ดังนี้:

- `offset`: ตำแหน่ง (ในขนาดของ bytes) ที่เริ่มคืนค่า account data
- `length`: จำนวนของ bytes ที่จะได้กลับคืนมา

`dataSlice` ใช้ได้ดีเวลาค้นหาข้อมูลขนาดใหญ่โดยไม่สนใจ data ตัวอย่างเช่น เวลาที่เราต้องการนับจำนวนของ token accounts (เช่น จำนวนคนที่ถือ  token) สำหรับ token mint ที่เราสนใจ

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

โดนการที่เราผสม 3 parameters (`dataSlice`, `dataSize`, และ `memcmp`) เราก็จะสามารถจำกัดการค้นหาให้มีประสิทธิภาพ และส่งค่ากลับมาเฉพาะที่เราต้องการได้

## แหล่งข้อมูลอื่น

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
