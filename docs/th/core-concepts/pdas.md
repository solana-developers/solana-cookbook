---
title: Program Derived Addresses (PDAs)
head:
  - - meta
    - name: title
      content: คู่มือ Solana | PDAs
  - - meta
    - name: og:title
      content: คู่มือ Solana | PDAs
  - - meta
    - name: description
      content: PDAs คือสิ่งที่เชื่อมโยงกับ accounts ที่ออกแบบมาให้ถูกควบคุมโดย program ที่ระบุไว้. เรียนรู้เกี่ยวกับ PDAs และแนวคิดหลักๆ ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: PDAs คือสิ่งที่เชื่อมโยงกับ accounts ที่ออกแบบมาให้ถูกควบคุมโดย program ที่ระบุไว้. เรียนรู้เกี่ยวกับ PDAs และแนวคิดหลักๆ ได้ที่คู่มือ Solana.
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

# Program Derived Addresses (PDAs)

Program Derived Addresses (PDAs) คือสิ่งที่เชื่อมโยงกับ accounts ที่ออกแบบมาให้ถูกควบคุมโดย program ที่ระบุไว้. ถ้ามี PDAs ตัว programs ก็จะสามารถ  sign ได้ด้วย program (programmatically sign) สำหรับ addresses ที่เจาะจงไว้โดยไม่ต้องใช้ private key. PDAs มีไว้เพื่อทำ CPI [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), โดยจะอนุญาต Solana apps ให้สามารถ ใช้งานร่วมกัน (composable) ​กับ program อื่นๆ ได้.

## เรื่องน่ารู้

::: tip Fact Sheet
- PDAs คือ 32 byte strings ที่ดูเหมือน public keys, แต่จะไม่มี private keys
- `findProgramAddress` จะสามารถสืบทอด(derive) แบบ deterministic เป็น PDA จาก programId และ seeds (ชุดของ bytes)
- bump (1 byte) จะเอาไว้เพิ่มโอกาสที่ PDA จะหลุดจาก ed25519 elliptic curve
- Programs สามารถ sign ให้ PDAs ได้ด้วยการเตรียม seeds และ bump ไว้เพื่อใช้ในการ [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- PDA สามารถ sign ด้วย program ที่มัน derived มาเท่านั้น
- ในการที่จะทำให้ programs สามารถ sign ใน instructions ที่ต่างกัน, PDAs จะต้องเตรียม interface คล้ายๆ hashmap สำหรับ [indexing accounts](../guides/account-maps.md)
:::

## ลงลึก

PDAs คือส่วนสำคัญในการพัฒนา programs บน Solana. ถ้ามี PDAs, programs ก็จะสามารถ sign แทน accounts ในขณะที่รับประกันได้ว่าจะไม่มี user อื่นมาสร้าง signature ที่เหมือนกันได้. นอกจากที่จะ sign แทน account ได้แล้ว บาง programs ยังสามารถเปลี่ยนแปลง accounts ที่มันถือ PDAs ไว้ได้ด้วย

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### การสร้าง PDAs

เพื่อที่จะเข้าใจหลักการเบื้องหลัง PDAs, เราอาจจะต้องเข้าใจก่อนว่า PDAs จริงๆ แล้วไม่ได้ถูกสร้างขึ้นมาแต่เป็นการค้นหาจนเจอ. PDAs เกิดจากการผสม seeds (เช่น `“vote_account”`) และ program id. การผสมกันของ seeds และ program id จะ run ผ่าน sha256 hash function เพื่อดูว่า public key นั้นตกอยู่บน ed25519 elliptic curve หรือไม่.

ในการ run program id และ seeds ผ่าน hash function จะมีความเป็นไปได้ประมาณ ~50% ที่จะได้ valid public key ที่ตกอยู่บน elliptic curve. ในกรณีนี้ จะเพิ่มอะไรบางอย่างเพื่อแกล้ง (fudge) ให้ input ขยับไปนิดหน่อยแล้วก็ลองใหม่อีกครั้ง. ศัพท์ทางเทคนิคของการ fudge นี้ก็คือ bump. ใน Solana, เราจะเริ่มด้วย bump = 255 และค่อยๆ ลดลงเป็น bump = 254, bump = 253, เรื่อยๆ จนเราได้ address ที่ไม่อยู่บน elliptic curve. นี่อาจจะฟังดูง่ายๆ แต่เมื่อมันเจอ address มันก็จะเป็นวิธีในแบบ deterministic ที่จะสามารถ derive PDA เดิมออกมาได้. 

![PDA on the ellipitic curve](./pda-curve.png)

### ใช้งาน PDAs

เมื่อ PDA ถูกสร้างมาแล้ว, `findProgramAddress` จะคืน address และ bump ที่ใช้เตะ address ออกจาก elliptic curve. ถ้ามี bump นี้, program ก็จะสามารถ [sign](../references/accounts.md#sign-with-a-pda) instruction ใดๆที่ต้องการ PDA. ในการที่จะ sign, ตัว programs ต้องส่ง instruction, list ของ accounts, และ seeds กับ bump ที่ใช้ derive ตัว PDA ไป `invoke_signed`. นอกจากนี้ในการ sign สำหรับ instructions, PDAs จะต้อง sign ผ่าน `invoke_signed` ด้วย.

เมื่อจะใช้ PDAs, มันเป็นเรื่องปกติที่จะต้อง [เก็บ bump seed](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) ไว้ใน account data นั้นๆ ด้วย. มันจะทำให้นักพัฒนาสามารถตรวจสอบ PDA ได้ง่ายขึ้นโดยไม่ต้องส่ง bump มาใน instruction argument.

## แหล่งข้อมูลอื่น
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
