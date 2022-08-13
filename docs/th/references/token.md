---
title: การใช้งาน Tokens
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Interacting with Tokens
  - - meta
    - name: og:title
      content: คู่มือ Solana | Interacting with Tokens
  - - meta
    - name: description
      content: เรียนรู้วิธีใช้ tokens, ส่ง tokens, และอื่นๆ บน Solana
  - - meta
    - name: og:description
      content: เรียนรู้วิธีใช้ tokens, ส่ง tokens, และอื่นๆ บน Solana
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

# Token

## เราต้องรู้อะไรบ้างก่อนจะไปใช้งาน SPL-Tokens?

ทุกครั้งที่เราจะทำงานกับ tokens บน Solana จริงๆ แล้วเราจะทำงานกับ Solana Program Library Token หรือมาตรฐาน SPL-Token standard ซึ่งจะต้องการ library เฉพาะ ที่เราสามารถหาได้ข้างล่างนี้ตามภาษาที่เราสนใจ

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## วิธีสร้าง Token ใหม่

การสร้าง token ทำได้ด้วยการสร้าง "mint account" ซึ่ง mint account นี้จะถูกนำไปใช้ในการ mint token ไปที่ token account ของเราในภายหลัง

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูล token mint

ในการหา supply, authority หรือ decimals ของ token เราจะต้องดึง account info ของ token mint มาให้ได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีสร้าง token account

เราต้องการ token account เพื่อใช้ในการเก็บ tokens ของเราไว้ โดยเราจะมีอย่างน้อยหนึ่ง token account สำหรับการเก็บ tokens ของเรา

Associated Token Accounts (ATAs) จะสามารถสร้างขึ้นมาจาก keypair ได้เหมือนเดิมตลอด (deterministic) เราควรจะใช้ ATAs ในการจัดการ token accounts.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูล Token Account

ทุกๆ token account จะมีข้อมูลของ token เช่นใครเป็น owner,
mint, amount(balance), และ decimals.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูล balance ของ token account

token account จะมีข้อมูล token balance ที่สามารถดึงได้ภายในการเรียกครั้งเดียว

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
token account สามารถมี mint ได้ตัวเดียว ถ้าเราระบุถึง token account เราก็สามารถระบุ mint ได้ด้วยเช่นกัน
:::

## วิธี mint tokens

เมื่อเรา mint tokens เราจะเพิ่ม supply และส่ง tokens ใหม่ไปที่ token account ที่ต้องการได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีส่ง tokens

เราสามารถส่ง tokens จาก token account ไปที่ token account อื่นๆ ได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีทำลาย (burn) tokens

เราสามารถ burn token ถ้าเราเป็น token owner


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีปิด token accounts

เราสามารถปิด token account ถ้าเราไม่ต้องการใช้มันแล้ว
จะมีอยู่ 2 แบบ:

1. Wrapped SOL - การปิดจะเปลี่ยน Wrapped SOL ไปเป็น SOL
2. Tokens อื่นๆ - เราสามารถปิดมันได้ถ้า balance ของ token account เป็น 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีตั้ง authority สำหรับ token accounts หรือ mints

เราสามารถ set/update authority ได้ 4 ประเภท:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีอนุมัติ (approve) token ให้ delegate ได้

เราสามารถตั้งค่า delegate ให้ใช้ตามจำนวนที่อนุมัติไว้เท่านั้น หลังจากที่ตั้งแล้ว, โดย delegate จะเป็นเหมือน owner ของ token account ของเราอีกคน `token account สามารถ delegate ไปได้เพียง account เดียวในเวลาเดียวกัน`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธียกเลิก (revoke) token ที่ delegate ไว้

Revoke will set delegate to null และ set delegated amount to 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีจัดการ wrapped SOL

Wrapped SOL ก็เหมือน token mint ทั่วไป ความแตกต่างคือเราจะใช้ `syncNative`
และ จะต้องสร้าง token accounts ด้วย `NATIVE_MINT` address เท่านั้น

### การสร้าง Token Account

เหมือนกับ [การสร้าง Token Account](#การสร้าง-token-account) แต่จะแทนที่ mint ด้วย `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### เพิ่ม Balance

การเพิ่ม balance จะมีอยู่ 2 วิธีสำหรับ Wrapped SOL

#### 1. โดยการส่ง SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. โดยการส่ง Token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูลทุกๆ token accounts ตาม owner

เราสามารถดึงข้อมูล token accounts ตาม owner ได้ 2 วิธี

1. ดึงมาทุกๆ Token Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. กรองข้อมูล (filter) ด้วย mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>