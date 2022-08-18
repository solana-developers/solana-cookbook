---
title: Debugging Solana Programs
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Debugging Solana Programs
  - - meta
    - name: og:title
      content: คู่มือ Solana | Debugging Solana Programs
  - - meta
    - name: description
      content: มีทางเลือก และเครื่องมือสนับสนุนมากมายสำหรับทดสอบ และ debugging Solana BPF program.
  - - meta
    - name: og:description
      content: มีทางเลือก และเครื่องมือสนับสนุนมากมายสำหรับทดสอบ และ debugging Solana BPF program.
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

# Debugging Solana Programs

มีทางเลือก และเครื่องมือสนับสนุนมากมายสำหรับทดสอบ และ debugging Solana BPF program.

## เรื่องน่ารู้

::: tip Fact Sheet
- crate `solana-program-test` จะทำให้ **_local runtime_** ของเราสามารถ test และ debug program ได้ (ด้วย vscode).
- crate `solana-validator` จะทำให้ `solana-test-validator` การ test บน **_local validator node_** ทำได้ดีขึ้น เราสามารถ run จาก editor ได้ **_แต่ breakpoints ใน program จะถูกมองข้ามไป_**.
- เครื่องมือ CLI `solana-test-validator` runs, loads program และประมวลผล transaction โดยทำงานผ่าน command line กับ Rust applications หรือ Javascript/Typescript app โดยใช้ web3.
- ทั้งหมดที่ว่ามา เราแนะนำให้ใช้ macro `msg!` ใน program ในตอนเริ่ม และเอาอออกเมื่อ test และมั่นใจว่าทำงานถูกแล้วแล้ว จำไว้ว่า `msg!` ใช้ Compute Units ที่ทำให้ program ล้มเหลวได้ถ้าใช้ Compute Unit เกินค่าที่กำหนดไว้.
:::

ขั้นตอนต่อไปเราจะใช้ [solana-program-bpf-template](#resources). Clone ไปที่เครื่องของเรา:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Runtime Testing และ Debugging ใน editor

เปิด file `src/lib.rs`

เราจะเห็นว่า program นั้นง่ายและ แค่ logs ตัว content ที่ได้รับมาจาก program entrypoint function: `process_instruction`

1. ไปตรงที่ `#[cfg(test)]` และกด `Run Tests` มันก็จะ build program และทำการ test `async fn test_transaction()` เราจะเห็น log messages (แบบย่อ)ใน vscode terminal ตามข้างล่างนี้:
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. ตั้ง breakpoint ใน programs ตรง `msg!` ที่บรรทัด (11)
3. กลับไปที่ test module, กด `Debug` และไม่กี่วินาที debugger จะวิ่งไปหยุดที่ breakpoint และเราก็จะสามารถดู data, หยุดทำ functions ไปทีละขั้น และอื่นๆ..

tests เหล่านี้ยังสามารถ run จาก command line ด้วย:
`cargo test` หรือ `cargo test-bpf` แต่ breakpoints จะถูกข้ามไป

ลองดูว่าเราจะสนุกกับมันได้ถึงไหน!

:::tip Note
จำไว้ว่าเราไม่ได้ใช้ validator node ดังนั้น default programs, blockhashes, และอื่นๆ จะไม่มี และมันจะทำตัวไม่เหมือนตอนที่มันทำงานใน validator node. นี่คือสาเหตุว่าทำไมชาว Solana ถึงทำ Local Validator Node testing มาให้เราด้วย!
:::


## ทดสอบด้วย Local Validator Node ใน editor

ทดสอบการ integration โดยใช้ local validator node จะถูกประกาศไว้ใน `tests/integration.rs` file.

ตามปกติแล้ว template repo integration tests จะ run ได้เฉพาะบน command line ด้วยคำสั่ง `cargo test-bpf` ขั้นตอนต่อไปนี้จะทำให้เรา run มันใน editor ได้ด้วย เหมือนที่เราแสดง program validator logs และ `msg!` outputs จาก program ของเรา:

1. ใน repo directory run `cargo build-bpf` เพื่อ build program ตัวอย่าง
2. ใน editor, เปิด `tests/integration.rs`
3. Comment บรรทัดที่ 1 ออก -> `// #![cfg(feature = "test-bpf")]`
4. ที่บรรทัดที่ 19 เปลี่ยนเป็น: `.add_program("target/deploy/bpf_program_template", program_id)`
5. แทรก code นี้ลงไปที่บรรทัดที่ 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. กด `Run Test` เหนือ `test_validator_transaction()` function

ขั้นตอนดังกล่าวจะ load validator node ให้แล้วจะทำให้เราสร้าง transaction (ด้วย Rust) และส่งไปที่ node โดยใช้ `RcpClient`

เราจะเห็น program output แสดงอยู่ใน editor terminal ตัวอย่างเช่น (แบบย่อ):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
การ Debugging แบบนี้จะทำให้เราสามารถ debug functions และ methods ใน **_test body_** ได้แต่จะไม่มี breakpoint ใน program.

มันเจ๋งมากใช่มั้ยล่ะ?

## Local Validator Node Testing from Client Apps
และสุดท้ายเราสามารถเปิด local validating node และ load program ของเรา และ accounts ใดๆ เข้าไปโดยใช้  `solana-test-validator` จาก command line.

จะทำวิธีนี้ได้เราจะต้องใช้ client application โดยใช้ Rust [RcpClient](#resources) หรือใช้
[JavaScript or Typescript clients](#resources)

ลอง `solana-test-validator --help` สำหรับรายละเอียดเพิ่มเติม และตัวเลือกอื่นๆ สำหรับ program ตัวอย่างด้านล่างนี่คือขั้นตอนติดตั้ง:
1. เปิด terminal ใน repo folder
2. Run `solana config set -ul` เพื่อตั้งค่าตัวเลือกให้ชี้ไปที่ local
3. Run `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. เปิด terminal และ run `solana logs` เพื่อเปิด log streamer
5. เราสามารถ run client program ของเรา และดู program output ใน terminal ที่เราเปิด log streamer ไว้

นี่มันดีมากเลยนะ!

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
