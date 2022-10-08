---
title: Account Maps
---

# Account Maps

Maps คือ data structures ที่เราใช้บ่อยๆ ตอนเขียน program ที่เกี่ยวกับ **key** และ **value** ของอะไรบางอย่าง.ซึ่ง value อาจจะเป็น type อะไรก็ได้ ส่วน key จะเป็นเหมือน identifier สำหรับ value นั้นๆ การมี key ก็จะทำให้เราสามารถแทรก (insert), อ่านค่ามา (retrieve) และ เปลี่ยนแปลง (update) values เหล่านี้ได้สะดวก

อย่างที่เรารู้ รูปแบบของ Solana's Account ต้องการ program data และ state data ที่เกี่ยวข้องเก็บอยู่ใน accounts แยกกัน ซึ่งการที่ accounts เหล่านี้มี address associated อยู่ทำให้มันมีลักษณะเหมือน map นั่นเอง! เรียนรู้เกี่ยวกับ Solana's Account mode [ที่นี่][AccountCookbook].

ดังนั้นมันก็เหมาะสมแล้วที่เราจะเก็บ **values** ไว้ใน accounts แยก โดยต้องมี address เป็น **key** ในการดึง value ออกมา. แต่มันก็มีปัญหาตามมาอยู่บ้างเหมือนกัน เช่น, 

* พอใช้ addresses เป็น **keys** แล้วทำให้จำยาก

* พอใช้ addresses ก็อย่างที่เรารู้ว่า public keys ของ **Keypairs** จะมี public key (หรือ *address*) และ **private key** เข้ามาเกี่ยวข้องด้วย ซึ่ง private key จะต้องมีเอาไว้ sign instructions ต่างๆ เวลาที่ต้องการ, ทำให้เราต้องเก็บ private key ไว้ด้วย ซึ่ง **ไม่ใช่ทางที่ดี** แน่ๆ!

ปัญหาเหล่าน้ีเป็นปัญหาที่นักพัฒนา Solana จะต้องเจอเวลาที่ต้องใช้ `Map` ใน programs เราลองมาดูทางแก้กันดีกว่า

## Deriving PDAs

PDA ย่อมาจาก [Program Derived Address][PDA], และสั้นๆ คือ addresses **จะได้รับสืบทอด (derived)** จาก seeds และ a program id (หรือ _address_). 

ที่พิเศษสำหรับ PDAs คือ addresses เหล่านี้จะ**ไม่**เกี่ยวข้องกับ private key ใดๆ ทั้งนี้เพราะ addresses เหล่านี้ไม่ได้อยู่บน ED25519 curve ดังนั้นจะมี **เฉพาะ** program ที่ _address_ นี้ได้รับสืบทอดมาเท่านั้นถึงจะสามารถ sign instruction นี้ด้วย key ได้ ร่วมกับ seeds ที่เตรียมไว้ เรียนรู้เกี่ยวกับเรื่องนี้ได้ [ที่นี่][CPI].

ตอนนี้เราก็ได้รู้จักกับ PDAs แล้วว่ามันคืออะไร, มาลองใช้พวกมันในการ map accounts กันเถอะ! เราจะใช้ตัวอย่างจาก **Blog** program เพื่อแสดงให้เห็นว่าเราจะใช้งานมันได้ยังไง

ใน Blog program เราต้องการให้แต่ละ `User` มี `Blog` คนละตัว และ blog นี้จะมีได้หลาย `Posts` นั่นหมายความว่าเราต้องทำการ **mapping** แต่ละ user ไปที่ blog และแต่ละ post จะมีตัวชี้คอย **mapped** ไปที่ blog

พูดสั้นๆ ก็คือ, มี `1:1` mapping ระหว่าง user กับ blog และ `1:N` mapping ระหว่าง blog กับ posts.

สำหรับ `1:1` mapping, เราต้องการให้ blog address สืบทอดมาจาก user **เท่านั้น**, จะได้ทำให้เราดึง blog ได้ตาม authority (หรือตาม _user_ นั่นเอง). ดังนั้น seed จึงต้องมี **authority's key** และควรจะขึ้นต้นด้วย **"blog"** เพื่อใช้เป็นตัวแยกประเภท (type identifier)

สำหรับ `1:N` mapping, เราต้องการให้แต่ละ post address สืบทอดได้จาก **หลายๆ**  blog ที่เกี่ยวข้อง แต่ใช้คนละ **identifier**, เพื่อจะได้มีความแตกต่างระหว่าง posts สำหรับทุกๆ `N` posts ใน blog ลองดูตัวอย่างด้านล่างจะเห็นว่าในแต่ละ post address จะถูกสืบทอด (derived from) ​มาจาก **blog's key**,  **slug** เพื่อจำแนกแต่่ละ post, และขึ้นต้นด้วย **"post"** เพื่อใช้เป็นตัวแยกประเภท (type identifier) อีกทีนึง. 

ตัวอย่าง code อยู่ด้านล่าง, 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

ในฝั่ง client เราสามารถใช้ `PublicKey.findProgramAddress()` เพื่อหา `Blog` และ `Post` account address เอาไปเรียก `connection.getAccountInfo()` เพื่อดึงข้อมูล account data ตามตัวอย่างด้านล่าง 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Single Map Account

วิธีอื่นที่จะทำ mapping ก็จะคือการใช้ data structure แบบ `BTreeMap` เก็บไว้ใน  account เดียว ซึ่ง account address นี้จะเป็น PDA หรือ public key ของ Keypair ที่สร้างขึ้นมาแล้วก็ได้

การทำ mapping accounts อาจจะไม่ใช่ทางที่ดีที่สุดเพราะเหตุผลต่อไปนี้

* คุณต้อง initialize account ที่เก็บ `BTreeMap` อยู่ก่อนที่คุณจะ สามารถเพิ่ม key-value pairs ลงไปและคุณต้องเก็บ address ของ account นี้ไว้สักที่เพื่อเอาไว้ update

* memory ของ account มีข้อจำกัดอยู่ที่ **10 megabytes** ทำให้ `BTreeMap` เก็บ key-value pairs ขนาดใหญ่ได้ไม่พอ.

ดังนั้นหลังจากเลือกได้แล้วว่าต้องการการใช้งานแบบไหนก็สามารถเริ่มทำได้ตามตัวอย่างด้านล่างนี้ได้เลย

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

code ฝั่ง client-side เพื่อทดสอบ  program ด้านบนว่าจะออกมาเหมือนด้านล่างนี้หรือไม่

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address