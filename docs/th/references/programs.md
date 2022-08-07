---
title: เขียน Programs
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Solana Program References
  - - meta
    - name: og:title
      content: คู่มือ Solana | Solana Program References
  - - meta
    - name: description
      content: เรียนรู้วิธีเขียน programs บน Solana, วิธีทำ cross program invocation, อ่าน accounts, และอื่นๆ
  - - meta
    - name: og:description
      content: เรียนรู้วิธีเขียน programs บน Solana, วิธีทำ cross program invocation, อ่าน accounts, และอื่นๆ
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

# Writing Programs

## วิธี transfer SOL in a program

Solana Program ของเราสามารถส่ง lamports จาก account นึงไปอีก account นึงโดยไม่ต้อง 'ร้องขอ' (invoking) ไปที่ System program. โดยหลักเบื้องต้นก็คือ program ของเราสามารถส่ง lamports จาก account ที่ program ของเรา **เป็นเจ้าของ** ไปที่ account ไหนก็ได้

account ของคนรับ *ไม่จำเป็นต้อง* เป็น account ที่ program ของเราเป็นเจ้าของ

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## วิธีใช้นาฬิกา (clock) ใน program

การใช้งาน clock สามารถทำได้ 2 แบบ

1. ส่ง `SYSVAR_CLOCK_PUBKEY` ไปใน instruction
2. เรียกใช้ Clock โดยตรงข้างใน instruction

เราควรจะรู้จักทั้ง 2 methods เพราะใน program เก่าๆ (legacy programs) ยังคงคาดหมายว่า `SYSVAR_CLOCK_PUBKEY` จะเป็น account

### ส่ง Clock ในแบบ account ภายใน instruction

มาลองสร้าง instruction ด้วย account ที่ได้รับมาสำหรับ initializing และ sysvar pubkey

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

แล้วก็ลองส่ง clock's sysvar public address ด้วย client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### ใช้ Clock โดยตรงใน instruction

สร้าง instruction ที่เหมือนกันโดยไม่คาดหวัง `SYSVAR_CLOCK_PUBKEY` จากฝั่ง client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

instruction ฝั่ง client จะเหลือส่งมาเฉพาะ state และ payer accounts.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีเปลี่ยน account size

เราสามารถเปลี่ยนขนาดของ account ที่ program เป็นเจ้าของ ได้ด้วย `realloc`. `realloc` สามารถเปลี่ยนขนาดของ accountได้ถึง 10KB เมื่อเราใช้ `realloc` มาขยายขนาดของ account อย่าลืมว่าเราต้องส่ง lamports ไปด้วยเพื่อ account นั้นไม่ถูกเก็บค่าเช่า (rent-exempt)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีทำ Cross Program Invocation

การใช้ cross program invocation คือการเรียก program's instruction ใน program ของเรา ตัวอย่างที่ดีคือ คำสั่ง `swap` ของ Uniswap ใน `UniswapV2Router` contract จะเรียกใช้ logic ที่จำเป็นในการ swap และเรียก `ERC20` contract's transfer function 
เพื่อ swap จากคนนึงไปอีกคนนึง ในทางเดียวกันเราสามารถเรียก program's instruction เพื่อทำอะไรได้หลายอย่างตามที่ต้องการ

เรามาลองดูตัวอย่างแรกซึ่งก็คือ `SPL Token Program's transfer` instruction. สิ่งที่ต้องเตรียมสำหรับ accounts ที่เราต้องการจะให้มีก่ีส่งก็คือ

1. Token Account ต้นทาง (account ที่ถือ tokens เราอยู่)
2. Token Account ปลายทาง (account จะส่ง tokens ให้)
3. Token Account เจ้าของ account ต้นทาง (wallet address ของเราที่เอาไว้ sign)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
client instruction อื่นๆ ที่เกี่ยวข้องจะอยู่ด้านล่าง ถ้าอยากทำความเข้าใจเรื่อง mint และการสร้าง token instructions ให้ลองดู code แบบเต็มใกล้ๆ กัน
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

ตอนนี้เรามาลองดูตัวอย่างอื่นกันบ้าง นั่นก็คือ instruction ของ `System Program's create_account` ซึ่งจะมีข้อแตกต่างกันอยู่บ้างเล๊กน้อย เราจะไม่ได้ส่ง `token_program` ไปเป็นหนึ่งใน accounts ใน function `invoke` อย่างไรก็ตามมันจะมีข้อยกเว้นอยู่ บ้างที่เราจะต้องส่ง invoking instruction's `program_id` ในกรณีของเราก็คือ program_id ของ `System Program's` ("11111111111111111111111111111111") ทำให้ accounts ที่ต้องการตอนนี้คือ

1. payer account ซึ่งก็คือคนจ่ายค่า rent
2. account ที่จะสร้างขึ้นมาใหม่
3. System Program account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

ฝั่ง client จะมี code ดังนี้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีสร้าง PDA

Program Derived Address คือ account ที่มี program เป็นเจ้าของแต่จะไม่มี private key แต่จะใช้ signature ที่ได้จาก seeds และ bump (a nonce ที่ทำให้ตก curve). การ "**Generating**" Program Address จะแตกต่างจากการ "**creating**" เราสามารถสร้าง (generate) PDA โดยใช้ `Pubkey::find_program_address` การทำ PDA ปกติจะ initialize  address ด้วย space และชุดของ state เข้าไป

Keypair account ทั่วไปจะสามารถสร้างภายนอก program และส่งเข้ามาเพื่อ initialize state ของมัน. แต่สำหรับ PDAs, จะสร้างบน chain, เนื่องจากมันไม่สามารถ sign เพื่อเป็นตัวแทนของตัวเองได้. ดังนั้นเราจะใช้ `invoke_signed` เพื่อส่ง seeds ของ PDA และตามไปด้วย signature ของ funding account เพื่อให้เกิดการสร้าง PDA ขึ้น

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

เราสามารถส่ง accounts ที่ต้องใช้ผ่าน client ได้ตามนี้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีอ่าน accounts

ทุกๆ instructions ใน Solana จะต้องการอย่างน้อย 2 - 3 accounts, และ และมันต้องถูกเรียกใช้บน instruction handlersตามลำดับของ accounts. ซึ่งจะง่ายกว่าถ้าเราใช้ `iter()` method ใน Rust, แทนที่จะเรียงลำดับ accounts เอง สำหรับ method `next_account_info` จะ slices index แรกของลำดับ และคืนค่า account ใน array ออกมา. ลองดูตัวอย่าง instruction ง่ายๆ ที่จะแสดง accounts และ parse มันออกมา

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีตรวจสอบ accounts

เนื่องจาก programs ใน Solana เป็นแบบ stateless เราต้องแน่ใจว่า accounts ที่ส่งไป ได้รับการตรวจสอบมากที่สุดเท่าที่จะเป็นไปได้เพื่อลดการโจมตี การตรวจสอบเบื้องต้นที่ทำได้คือ

1. ตรวจว่า expected signer account ที่คาดไว้ได้ signed แล้วจริงๆ
2. ตรวจว่า expected state account's อยู่ในสถานะ writable
3. ตรวจว่า expected state account's owner คือ program id ที่เรียกมา
4. ถ้า initializing state เป็นครั้งแรกก็ให้ตรวจสอบว่า account ได้ initialized ไปรึยัง
5. ตรวจว่า cross program ids ถูกส่งมาด้วย (เมื่อต้องการ) เป็นไปตาม expected.

ต่อไปคือ instruction เบื้องต้นที่ทำการ initializes hero state account,แต่เนื่องจากเราต้องทำการตรวจสอบด้วยจึงต้องเขียนตามนี้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีอ่าน instructions หลายๆ ตัวจาก transaction

Solana ดูทุก instructions ใน transaction ปัจจุบัน เราสามารถเก็บมันไว้ใน variable และทำงานตามลำดับ (iterate) ได้ เราสามารถอะไรได้หลายอย่างจากจุดนี้ เช่นหา transactions ที่น่าสงสัย

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
