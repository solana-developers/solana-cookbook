---
title: Programs
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Programs
  - - meta
    - name: og:title
      content: คู่มือ Solana | Programs
  - - meta
    - name: description
      content: Programs (ซึ่งก็คือ smart contracts) เป็นส่วนรากฐานของการทำงาน on-chain, เรียนรู้เกี่ยวกับ Programs และแนวคิดหลักๆ ได้ที่คู่มือ Solana
  - - meta
    - name: og:description
      content: Programs (ซึ่งก็คือ smart contracts) เป็นส่วนรากฐานของการทำงาน on-chain, เรียนรู้เกี่ยวกับ Programs และแนวคิดหลักๆ ได้ที่คู่มือ Solana
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

# Programs


นักพัฒนาสามารถเขียน และปล่อย (deploy) programs บน Solana blockchain. Programs (ซึ่งก็คือ smart contracts บน protocols อื่นๆ) เป็นส่วนรากฐานของการทำงาน on-chain, ทำได้ทุกอย่างตั้งแต่ DeFi และ NFTs จนไปถึง Social Media และ Gaming.

## เรื่องน่ารู้

::: tip Fact Sheet
- Programs ประมวลผล [instructions](./transactions) ทั้งที่มาจาก end users และมาจาก programs อื่นๆ
- ทุกๆ programs จะเป็น *stateless*: และ data ที่มันทำงานด้วยจะถูกเก็บแยกไว้ที่ [accounts](./accounts.md) ที่ส่งผ่านมาทาง instructions
- Programs จะถูกเก็บใน accounts ที่ระบุไว้ว่า `executable`
- ทุกๆ programs จะมีเจ้าของคือ [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) และจะถูกดำเนินการ (executed) โดย [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- นักพัฒนาจะเขียน programs ด้วยภาษา Rust หรือ C++, แต่ก็สามารถเลือกภาษาใดๆ ก็ได้ที่ target [LLVM](https://llvm.org/)'s [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) ได้
- ทุกๆ programs จะมีทางเข้า  (entry point) ทางเดียว ซึ่งเป็นที่ที่ instruction จะถูกดำเนินการ(`process_instruction`); parameters จะต้องมีสิ่งเหล่านี้เสมอ:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## ลงลึก

Solana ไม่เหมือน blockchains อื่นๆ ตรงที่เราจะแยก code กับ data ออกจากกัน ทุกๆ data ที่ programs จะใช้จะถูกเก็บไว้ใน account อีกตัวแยกกัน และ programs จะรับเป็นชุดข้อมูลอ้างอิง (references) ไปถึง account เหล่านั้นผ่านรูปแบบชุดคำสั่ง (instructions) การทำแบบนี้จะทำให้ program สามารถทำงานข้าม หรือเรียกใช้ accounts ต่างๆ โดยไม่ต้อง deploy ใหม่ ตัวอย่างรูปแบบ (pattern) เหล่านี้สามารถเห็นได้ในทั้ง Native และ SPL Programs

### Native Programs และ The Solana Program Library (SPL)

Solana มาพร้อมกับ programs หลายตัวที่ใช้สำหรับการทำงาน on-chain. โดยที่ programs จะแบ่งเป็น [Native Programs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) และ [Solana Program Library (SPL) Programs](https://spl.solana.com/).

Native Programs มีไว้สำหรับการทำงานของ validators โดยตัวที่รู้จักกันมากคือ [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program) ที่จะคอยรับผิดชอบดูแล accounts ใหม่ และส่ง(transfer) SOL ไปมา.

SPL Programs มีไว้ทำงาน on-chain หลายอย่าง, ทั้งสร้าง (creating), สลับ (swapping), และเช่า (lending) โทเคน (tokens), และยังมีไว้สร้าง stake pools และดูแล on-chain name service อีกด้วย โดย [SPL Token Program](https://spl.solana.com/token) จะสามารถเรียกใช้ (invoke) ได้โดยตรงผ่าน CLI, ในขณะที่  [Associated Token Account Program](https://spl.solana.com/associated-token-account) จะถูกประกอบขึ้นมาด้วย programs ที่ทำขึ้นมาเอง.

### เขียน Programs

Programs ส่วนใหญ่จะเขียนด้วย Rust หรือ C++, แต่ก็สามารถเลือกภาษาใดๆ ก็ได้ที่ target LLVM’s BPF ได้ นอกจากนี้จากความร่วมมือของ [Neon Labs](https://neon-labs.org/) และ [Solang](https://solang.readthedocs.io/en/latest/) ทำให้สามารถสนับสนุน [EVM](https://ethereum.org/en/developers/docs/evm/) ซึ่งทำให้นักพัฒนาสามารถเขียน programs ด้วย Solidity ได้.

programs ที่เขียนด้วย Rust จะยึดโครงสร้างนี้:

| ไฟล์ (File)     | คำอธิบาย                                       |
|----------------|-----------------------------------------------|
| lib.rs         | ลงทะเบียน modules                              |
| entrypoint.rs  | ทางเข้า (Entrypoint) ของ program               |
| instruction.rs | Program API, (de)serializing instruction data |
| processor.rs   | Program logic                                 |
| state.rs       | Program objects, (de)serializing state        |
| error.rs       | Program-specific errors                       |

ในตอนนี้, [Anchor](https://github.com/coral-xyz/anchor) เป็น framework ที่นิยมสำหรับพัฒนา programs. Anchor คือ framework ที่มีแนวทางชัดเจน (opinionated), คล้ายกับ Ruby on Rails ที่ลดการเขียนอะไรซ้ำๆ และช่วยให้การแกะ (de)serialization สะดวกขึ้นสำหรับการพัฒนาด้วย Rust.

Programs ปกติแล้วจะถูกพัฒนา (dev) และทดสอบ(test) บนสิ่งแวดล้อม(environments) Localhost และ Devnet ก่อนที่จะ deploy ไปบน Testnet หรือ Mainnet. Solana จะสนับสนุน environments ต่อไปนี้:

| Cluster Environment  | RPC Connection URL                                                        |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

เมื่อ deployed ไปบน environment แล้วผู้ใช้ (clients) จะสามารถใช้งาน on-chain programs ผ่าน [RPC connections](https://docs.solana.com/developing/clients/jsonrpc-api) ไปที่ cluster ตามที่เลือกไว้.

### Deploying Programs

นักพัฒนาสามารถ deploy programs ผ่าน [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

เมื่อ program ถูก deploy ไปแล้ว, มันจะถูกแปลง (compile) เป็น [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (ประกอบไปด้วย BPF bytecode) และถูก upload ไปที่ Solana cluster. Programs จะอยู่ใน accounts (บน Solana ทุกอย่างอยุ่ใน accounts), ต่างตรงที่ accounts นี้จะมีสถานะ `executable` และถูกมอบหมายให้ BPF Loader. ที่อยู่ (address) ของ account เหล่านี้จะถูกเรียกว่า `program_id` และจะเอาไว้อ้างอิงในการทำ transactions ต่อไป.

Solana สนับสนุน BPF Loaders หลายแบบ, เช่น [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). The BPF Loader จะรับผิดชอบดูแล program’s account และทำให้ clients ใช้ได้ผ่าน `program_id`. ทุก programs มี entry point ทางเดียว และเป็นที่ประมวลผล instruction (`process_instruction`) และ parameters ที่จะต้องมีเสมอคือ:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

เมื่อเกิดการเรียกใช้ (invoke) programs มันจะถูกดำเนินการ (execute) โดย Solana Runtime.

## แหล่งข้อมูลอื่น

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
