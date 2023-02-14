---
title: Accounts
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Account References
  - - meta
    - name: og:title
      content: คู่มือ Solana | Account References
  - - meta
    - name: description
      content: เรียนรู้เกี่ยวกับ accounts บน Solana และ วิธีใช้ใน programs ของเรา.
  - - meta
    - name: og:description
      content: เรียนรู้เกี่ยวกับ accounts บน Solana และ วิธีใช้ใน programs ของเรา.
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

## วิธีสร้าง system account

ในการสร้าง account ที่ [System Program][1] เป็นเจ้าของ Solana runtime จะให้สิทธิ์เจ้าของ account สามารถเข้าถึงได้เพื่อเขียน data หรือ transfer lamports เมื่อสร้าง account เราจะต้องจองพื้นที่ storage space เป็น bytes ไว้ก่อนจำนวนหนึ่ง (`พื้นที่`) และ lamports ที่เพียงพอสำหรับค่า rent ซึ่ง [Rent][2] นี้คือค่า cost ที่มีไว้เพื่อทำให้เรา accounts คงอยู่บน Solana

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีคำนวณ account cost

การทำให้ accounts ให้คงอยู่บน Solana จะต้องมีค่า storage cost ที่เรียกว่า [rent][2] ซึ่ง account จะไม่ถูกเก็บค่า rent ถ้าจ่ายค่า rent ทิ้งไว้แล้วอย่างน้อย 2 ปี ส่วนการคำนวณราาคาที่ต้องจ่ายนั้นเราจะคิดตามจำนวน data ที่เราจะเก็บไว้ใน account

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## วิธีสร้าง accounts ด้วย seeds

เราสามารถใช้ `createAccountWithSeed` เพื่อจัดการ accounts แทนที่จะใช้ keypair ที่แตกต่างกัน

### Generate

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Create

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
เฉพาะ account ที่ system program เป็นเจ้าของถึงจะสามารถส่งด้วย system program ได้
:::

## วิธีสร้าง PDAs

[Program derived address(PDA)][3] จะเหมือน address ทั่วไปที่มีข้อแตกต่างดังนี้

1. อยู่นอก ed25519 curve
2. ต้องใช้ program เพื่อ sign แทนที่จะเป็น private key

**Note**: PDA accounts สามารถสร้างได้ใน program เท่านั้น ส่วน address นั้นสามารถสร้างได้จากฝั่ง client

::: tip
ถึงแม้ว่า PDA จะ derived ด้วย program id แต่มันก็ไม่ได้หมายความว่า PDA จะเป็นของ program เดียวกันนั้น (ตัวอย่างเช่นเราสามารถ initialize PDA เป็น token account โดยที่ account นี้มี token program เป็นเจ้าของ)
:::

### การสร้าง PDA

`findProgramAddress` จะเพิ่ม byte พิเศษเข้าไปในตอนท้ายของ seed โดยจะเริ่มจาก 255 ไปถึง 0 และจะส่งค่าแรกของ off-curve public key กลับมาให้  ซึ่งเราจะได้รับค่าเดิมเสมอถ้าเราใส่ program id และ seed เดิมเข้าไป

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### ศร้าง PDA

ข้างล่างคือตัวอย่าง program สำหรับสร้าง PDA account ที่ program เป็นเจ้าของและ ตัวอย่างสำหรับเรียก program ด้วย client.

#### Program

ข้างล่างนี้คือ `system_instruction::create_account` instruction ที่เอาไว้สร้าง account ที่จะมีการจองพื้นที่ที่มีขนาดข้อมูลเท่ากับขนาดของ `space`, `rent_lamports` คือ จำนวนของ lamports สำหรับ derived PDA. ทั้งหมดนี้จะถูก signed ด้วย PDA โดยใช้ `invoke_signed` ที่เคยบอกไปแล้วด้านบน

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธี sign ด้วย PDA

PDAs จะถูก sign ได้ใน program เท่านั้น ด้านล่างนี้คือตัวอย่าง program
ของการ sign ด้วย PDA และเรียก program นั้นด้วย client.

### Program

ข้างล่างนี้คือ instruction ที่เอาไว้ส่ง SOL จาก PDA ที่ถูก derived ด้วย seed `escrow` ผ่านไปที่ account และในส่วน `invoke_signed` จะถูก sign ด้วย PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูล program accounts

คืนค่าทุกๆ accounts ที่ program เป็นเจ้าของ โดยจะอ้างถึง [guides section](../guides/get-program-accounts.md) สำหรับรายละเอียดของ `getProgramAccounts` และตัวเลือกการตั้งค่า

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## วิธีปิด accounts

เราสามารถปิด account (ลบ data ทิ้งทั้งหมด) ได้ด้วยการเอา SOL ออกทั้งหมด (อ้างถึง [rent][2] สำหรับรายละเอียดเพิ่มเติม)

#### Program


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูล account balance

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
ถ้าเราต้องการเรียกดู token balance เราต้องรู้ address ของ token account นั้นๆ สำหรับรายเอียดเพิ่มเติมไปดูได้ที่ [Token References](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
