---
title: Feature Parity Testing
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Feature Parity Testing
  - - meta
    - name: og:title
      content: คู่มือ Solana | Feature Parity Testing
  - - meta
    - name: description
      content: คุณสมบัติหลากหลายของ Solana cluster. ลักษณะเฉพาะของการ testing เพื่อผลลัทธ์ที่แน่นอน
  - - meta
    - name: og:description
      content: คุณสมบัติหลากหลายของ Solana cluster. ลักษณะเฉพาะของการ testing เพื่อผลลัทธ์ที่แน่นอน
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

# การทดสอบให้เหมือนกัน (Parity Testing)

การทดสอบ program จะทำให้เรามั่นใจได้ในทั้งคุณภาพ และผลลัพทธ์ที่ได้ 

## เรื่องน่ารู้

::: tip Fact Sheet
- คุณสมบัติเฉพาะ (Features) คือความสามารถ (capabilities) ที่มีมากับ Solana validators และต้องเปิดถึงจะสามารถใช้งานได้
- Features อาจจะถูกเปิดเพียง cluster เดียว (เช่นบน testnet) แต่ไม่ได้เปิดให้ใช้ที่อื่น (เช่น mainnet-beta).
- อย่างไรก็ตามเมื่อใช้งาน `solana-test-validator` ด้วยค่าตั้งต้นปกติที่ local, ทุกๆ features จะถูกเปิดให้ใช้งานได้ทั้งหมดตาม
Solana version ทำให้ผลที่ได้เวลา testing ที่ local กับ capabilities และผลของการทดสอบอาจจะไม่ตรงกันเวลาที่ deploying และ running ใน cluster อื่นๆ!
:::

## Scenario
สมมติว่าเรามี transaction ที่มี (3) instructions และแต่ละ instruction ใช้ประมาณ 100_000 Compute Units (CU) บน Solana 1.8.x, เราจะเห็น instruction CU consumption คล้ายๆ แบบนี้:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

บน Solana 1.9.2 จะมี feature 'transaction wide compute cap' ที่เพิ่มเข้ามาในเรื่อง transaction โดยค่าปกติจะมี budget ให้ 200_000 CU และ  instructions ที่ติดไป **_จะหัก_** budget มาจาก transaction นั้นด้วย. การใช้ transaction ที่เคยใช้ไปก่อนหน้าจะได้ผลที่แตกต่างเป็นอย่างมาก:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

มุแง! ถ้าเราไม่รู้มาก่อนคงตกใจแย่ เพราะเราไม่ได้เปลี่ยน instruction อะไรเลยแล้วใน devnet ก็ใช้ได้แต่ที่ local ทำไมพัง?!?

เราสามารถเพิ่ม Transaction budget โดยรวมได้ประมาณ 300_000 CU เผื่อเราจะได้รู้สึกดีขึ้น ตัวอย่างด้านบนพยายามแสดงให้เราเห็นว่าทำไมการทดสอบด้วย **_Feature Parity_** ถึงเป็นเรื่องที่ดีที่จะเตรียมตัวไว้ก่อนเพื่อหลีกเลี่ยงความสับสนในภายหลัง

## Feature Status
มันง่ายมากที่จะตรวจสอบว่า features ไหนเปิดให้ใช้สำหรับแต่ละ cluster ด้วยคำสั่ง `solana feature status`
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

นอกจากนี้เรายังสามารถใช้ [scfsd](#resources) เพื่อติดตามดูทุกๆ feature ในทุกๆ clusters ตามภามบางส่วนข้างล่าง และมันยังไม่ต้องใช้ `solana-test-validator` ในการทำงานด้วย:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Parity Testing
ตามที่บอกไปแล้วว่า `solana-test-validator` จะเปิด **ทุกๆ** features อัตโนมัติ
ดังนั้นเพื่อที่จะตอบคำถามที่ว่า "เราจะสามารถทดสอบที่ local ด้วย environment ที่เหมือน devnet, testnet หรือแม้แต่ mainnet-beta ได้ยังไง?".

ทางแก้ไข: PRs ที่เพิ่มเข้ามาใน Solana 1.9.6 สามารถทำให้เราปิด features ต่างๆ ได้:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## ตัวอย่างง่ายๆ
สมมติว่าคุณมี program ง่ายๆ ที่ log ข้อมูลที่ได้รับใน entry-point และเราจะทดสอบ transaction ที่เพิ่ม (2) instructions สำหรับ program ของเรา.

### เปิดทุก features
1. เราจะเปิด test validator ใน terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. ใน terminal อีกอันให้เปิด log streamer:
```console
solana logs
```

3. แล้วก็ run transaction เราจะเห็น log ที่คุ้นเคยใน terminal (มีปรับให้ดูง่าย):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
เพราะ feature 'transaction wide compute cap' ถูกเปิดตามค่าตั้งต้นอยู่แล้ว ทำให้เราเห็นว่าแต่ละ instruction จะหัก CU จาก budget Transaction เริ่มต้นที่ 200_000 CU.

### เลือกปิด features
1. ในการ run ครั้งนี้ เราจะ run ให้ CU budget เท่ากับ devnetโดยใช้เครื่องมือที่อธิบายไว้ใน [Feature Status](#feature-status) เราจะแยก `transaction wide compute cap` public key และใช้ `--deactivate-feature` ในตอนเริ่ม test validator

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. เราจะเห็น logs ที่ instructions ของเราว่าตอนนี้มี 200_000 CU budget (มีปรับให้ดูง่าย) โดยจะมีบอกในทุกๆ clusters:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Feature Parity Testing
เราสามารถทดสอบให้เหมือนกันทั้งหมดได้ใน cluster ที่ต้องการโดยดูว่า feature ยังไม่ได้เปิด (activated) และเพิ่ม`--deactivate-feature <FEATURE_PUBKEY>` สำหรับแต่ละ feature เมื่อเราเรียก `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

ทางเลือกอื่นเช่น [scfsd](#resources) จะมีคำสั่งสร้าง output เพื่อปิด features โดยมันจะป้อน output นั้นเข้าไปตอนเริ่มใช้ `solana-test-validator`:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```
ถ้าเราเปิดอีก terminal ขึ้นมาระหว่างที่ validator ยังทำงานอยู่ และเรียกใช้คำสั่ง `solana feature status` คุณจะเห็น features ที่ถูก deactivatedเหมือนใน devnet เลย

## Full Parity Testing Programmatically
สำหรับคนที่ต้องการควบคุมการทดสอบใน test code ก็สามารถเปิดปิด features ได้โดยใช้ function TestValidatorGenesis ใน Solana 1.9.6

ใน folder root ของ program ให้เราสร้าง folder ชื่อ `tests` และเพิ่ม file `parity_test.rs` เข้าไป ส่วนด้านล่างนี้คือ boiler-plate สำหรับใช้ในแต่ละ test

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

เราสามารถ now เพิ่ม test functions ใน `mod test {...}` เพื่อทดสอบค่าตั้งต้นของ validator setup (เปิดใช้ทุก features) และค่อยปิก `transaction wide compute cap` เหมือนตัวอย่างที่แล้วที่ใช้ `solana-test-validator` จาก command line.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

นอกจากนี้ [scfs engine gadget](#resources) ก็สามารถกำหนดให้ปิดทุก features ของ cluster โดยทำตามตัวอย่างด้านล่างนี้ โดยใช้ engine เพื่อหา features ที่ถูกปิดทั้งหมดของ devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


ทดสอบกันให้สนุกนะ!


## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)