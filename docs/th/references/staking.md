---
title: Staking
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Staking
  - - meta
    - name: og:title
      content: คู่มือ Solana | Staking
  - - meta
    - name: description
      content: stake SOL และรับ rewards สำหรับการช่วยให้ network มีความปลอดภัยมากขึ้น
  - - meta
    - name: og:description
      content: Stake SOL และรับ rewards สำหรับการช่วยให้ network มีความปลอดภัยมากขึ้น เรียนรู้เกี่ยวกับการสร้าง Stake Accounts, Delegate Stake, Withdraw Stake และข้อมูลอ้างอิงอื่นๆ สำหรับพัฒนาบน Solana ได้ที่คู่มือ Solana.
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

# Staking



## หาข้อมูล Validators ในปัจจุบัน

เราสามารถ stake SOL และรับ rewards สำหรับการช่วยให้ network มีความปลอดภัยมากขึ้น ในการ stake เราจะ delegate SOL ไปที่ validators ที่มีหน้าที่ประมวลผล transactions

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## สร้าง Stake Account

ทุกๆ staking instructions จะถูกควบคุมโดย [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). เราจะเริ่มจากการสร้าง [Stake Account](https://docs.solana.com/staking/stake-accounts) ซึ่งจะถูกสร้างและ จัดการแตกต่างไปจาก [system account](accounts.md#create-a-system-account). โดยเฉพาะอย่างยิ่งเราต้องตั้งค่า `Stake Authority`และ `Withdrawal Authority` ของ account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Delegate Stake

เมื่อ stake account ได้รับการลงทุนแล้ว `Stake Authority` ก็จะสามารถ delegate ทุนนั้นไปที่ validator ได้โดยแต่ละ stake account จะสามารถ delegat ไปที่ validator เดียว โดยทุกๆ tokens ใน account จะต้อง delegated หรือ un-delegated. เมื่อ delegated แล้วจะใช้ผ่าน epochs ไปช่วงหนึ่งเพื่อที่ stake account จะอยู่ในสถานะ active

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ดึงข้อมูล Delegator ด้วย Validators

Multiple accounts อาจจะ staked ไปที่ validator account ที่ใดที่หนึ่ง ในการที่จะดึงข้อมูลคน stake เราจะต้องใช้ `getProgramAccounts` หรือ `getParsedProgramAccounts` API. อ้างถึง [guides section](/guides/get-program-accounts.html) สำหรับข่อมูลเพิ่มเติม ส่วนของ stake accounts จะมีขนาด 200 bytes และ Voter Public Key จะเริ่มที่ 124 bytes. [Reference](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ยกเลิก Stake

หลังจาก stake account ได้ delegated ไปแล้ว `Stake Authority` จะสามารถเลือกที่จะยกเลิก (deactivate) account ได้ โดยการ deactivation จะต้องเว้น epochs อยู่ระยะหนึ่งก่อนจะยกเบิกสำเร็จ และจำเป็นต้อวรอช่วงนี้ก่อนที่จะถอน SOL ออกมาได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## ถอน Stake

หลังจาก deactivated `Withdrawal Authority` จะสามารถถอน (withdraw) SOL กลับไปที่ system account เมื่อ stake accountไม่ได้ delegated แล้ว และมี 0 SOL มันก็จะสามารถถูกทำลายได้

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
