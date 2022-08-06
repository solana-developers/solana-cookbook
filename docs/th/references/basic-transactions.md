---
title: Sending Transactions
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Sending Transactions
  - - meta
    - name: og:title
      content: คู่มือ Solana | Sending Transactions
  - - meta
    - name: description
      content: เรียนรู้ Transactions เบื้องต้น เช่นการส่ง SOL, SPL-Tokens, คำนวณ Transaction Cost, และข้อมูลอ้างอิงอื่นๆ สำหรับพัฒนาบน Solana ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: เรียนรู้ Transactions เบื้องต้น เช่นการส่ง SOL, SPL-Tokens, คำนวณ Transaction Cost, และข้อมูลอ้างอิงอื่นๆ สำหรับพัฒนาบน Solana ได้ที่คู่มือ Solana.
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

# Sending Transactions

## วิธี send SOL

การที่เราจะส่ง SOL ได้นั้นเราต้องใช้ [SystemProgram][1].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## วิธี send SPL-Tokens

ใช้ [Token Program][1] เพื่อส่ง SPL Tokens ในการที่จะส่ง SPL token, เราต้องรู้ SPL token account address เราสามารถหา address และส่ง tokens ได้ด้วยตัวอย่างต่อไปนี้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## วิธีคำนวณหา transaction cost

จำนวนของ signatures จะเอาไว้ใช้คำนวณค่าใช้จ่าย transaction cost ถ้าไม่ได้มีการสร้าง account ก็จะมี transaction cost ตามนั้นเลย แต่ถ้าจะหาค่าใช้จ่ายสำหรับการสร้าง account ด้วยให้ลองไปดูที่ [การคำนวณ rent exemption](accounts.md#วิธีคํานวณ-account-cost)

ตัวอย่าง 2 ตัวข้างล่างจะแสดงให้เห็นวิธีที่ใช้คำนวณ transaction cost ที่เป็นไปได้ทั้ง 2 แบบ

ตัวอย่างแรกจะใช้ `getEstimatedFee` ที่เป็น method ใหม่ของ class `Transaction` และตัวอย่างที่สองจะใช้ `getFeeForMessage` ที่มาแทนที่ `getFeeCalculatorForBlockhash` ใน class `Connection`

### getEstimatedFee
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีเพิ่ม memo ใน transaction

transaction ใดๆ สามารถเพิ่ม message โดยใช้ [memo program][2].
ในตอนนี้ `programID` จาก **Memo Program** ต้องเพิ่มเองด้วย address นี้  `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีเปลี่ยน compute budget สำหรับ transaction

Compute budget สำหรับหนึ่ง transaction สามารถเปลี่ยนได้โดยการเพิ่ม instruction
ด้วยการเรียกไปที่ Compute Budget Program โดยปกติแล้ว compute budget คือค่าของ 200k compute units * จำนวน instructions, ด้วยค่าสูงสุดที่ 1.4M compute units
ถ้าเราใช้ compute น้อยเราก็จะจ่าย transaction costs น้อยลงไปด้วย

**Note**: การที่จะเปลี่ยน compute budget สำหรับ transaction คุณต้องไปทำที่
หนึ่งในสามคำสั่งแรกของ instruction ใน transaction ตรง instruction ที่เอาไว้เปลี่ยนค่า budget

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

ตัวอย่าง Program Logs:

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
