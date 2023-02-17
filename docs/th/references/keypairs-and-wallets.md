---
title: Keypairs และ Wallets
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Keypairs และ Wallets
  - - meta
    - name: og:title
      content: คู่มือ Solana | Keypairs และ Wallets
  - - meta
    - name: description
      content: เรียนรู้เกี่ยวกับ Keypairs และ Wallets, Signing และ Verifying Messages และข้อมูลอ้างอิงอื่นๆ สำหรับพัฒนาบน Solana ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: เรียนรู้เกี่ยวกับ Keypairs และ Wallets, Signing และ Verifying Messages และข้อมูลอ้างอิงอื่นๆ สำหรับพัฒนาบน Solana ได้ที่คู่มือ Solana.
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

# Keypairs และ Wallets

## วิธีสร้าง Keypair ใหม่

actions ต่างๆ บน Solana libraries ต้องการ Keypair หรือ Wallet ถ้าเราเชื่อมกับ wallet อยู่แล้ว เราก็ไม่ต้องห่วงอะไร หรือถ้าเราต้องการ keypair เราก็แค่ต้องสร้างมันขึ้นมา

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี restore a Keypair from a secret

ถ้าเรามี secret อยู่แล้วเราก็จะสามารถสร้าง Keypair จาก secret นั้นเพื่อทดสอบ dApp ของเราได้เลย

1. สร้างจาก Bytes

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. สร้างจาก Base58 String

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี verify a Keypair

ถ้าเราได้ keypair มา เราสามารถตรวจสอบมันได้ว่า secret นั้นตรงกับ public key หรือเปล่า

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี check if a public key has an associated private key

ในบางกรณีเฉพาะ (เช่น a Program Derived Address), public keys อาจจะไม่มี private key เราสามารถตรวจสอบโดยดูว่า public key อยู่บน ed25519 curve หรือไม่ เพราะ public keys ที่อยู่บน curve สามารถควบคุมได้จากผู้ใช้งานที่ถือ wallet นั้นอยู่

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## วิธี generate a mnemonic phrase

ถ้าเราสร้าง wallet เราต้องสร้าง mnemonic phrase เพื่อให้ user สามารถเก็บสำรองไว้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีกู้ Keypair จาก mnemonic phrase

หลายๆ wallet extensions ใช้ mnemonics เพื่อใช้แทน secret keys เราสามารถเปลี่ยน mnemonic ไปเป็น Keypairs เพื่อทดสอบที่ local ได้

1. BIP39 - สร้าง wallet 1 ตัว

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. BIP44 (สร้างหลาย wallets หรือที่เรียกว่า HD wallets)

เราสามารถสร้างหลาย wallets จาก seed เดียวหรือที่เราเรียกว่า 'Hierarchical Deterministic wallets' หรือ HD wallets:

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี generate a vanity address

Vanity public keys หรือ custom addresses คือ keys ที่เริ่มด้วยตัวอักษรที่เฉพาะเจาะจง เช่น เราอาจจะต้องการ publickey ที่ขึ้นต้้นด้วย "elv1s" หรือ "cook" ซึ่งมันจะทำให้จำไดง่ายขึ้นว่าเป็นของใคร ทำให้ key สามารถแยกแยะกันได้ง่ายขึ้น

Note: ยิ่งระบุ characters ใน vanity address มากเท่าไหร่ ก็จะยิ่งใช้เวลาในการค้นหา address นานขึ้น

::: warning
คุณควรใช้ CLI ในการสร้าง ทั้งตัวอย่าง Python และ TypeScript เป็นเพียงแค่การทำให้เห็นภาพมากขึ้นเท่านั้น และมันจะทำงานช้ากว่าบน CLI อีกด้วย
:::

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี sign และ verify messages with wallets

function หลักของ keypair คือ sign message และยังเอาไว้ตรวจสอบ signature ได้ด้วย ซึ่งการตรวจสอบ signature จะทำให้ผู้รับมั่นใจได้ว่าข้อมูลถูก sign ด้วยเจ้าของ private key นั้นจริงๆ

เพื่อที่จะทำตัวอย่างกันเราจะ import [TweetNaCl][1] crypto library มาใช้

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://www.npmjs.com/package/tweetnacl

## วิธีเชื่อมต่อกับ wallet

Solana's [wallet-adapter](https://github.com/solana-labs/wallet-adapter) libraries จะช่วยทำให้เราจัดการเชื่อมต่อ wallet ที่ฝั่ง client ได้อย่างง่ายดาย

### React

Run คำสั่งข้างล่างเพื่อติดตั้ง dependencies ที่ต้องใช้:

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React wallet-adapter libraries จะทำให้เราคงสถานะการเชื่อมต่อ wallet ผ่าน hooks และ Context providers ที่ชื่อว่า `useWallet`, `WalletProvider`, `useConnection`, และ `ConnectionProvider` React App ต้องครอบไว้ด้วย `WalletProvider` และ `ConnectionProvider`

นอกจากนี้เรายังสามารถบอกให้ users เชื่อมต่อโดยใช้ `useWalletModal` เพื่อสลับการมองเห็น connection modal และครอบ app ไว้ด้วย `WalletModalProvider` จาก `@solana/wallet-adapter-react-ui` ได้ด้วย. ตัว connection modal จะควบคุมการทำงาน connection ให้เรา ทำให้เราสามารถ listen ไว้ได้ว่า wallet เชื่อมต่อแล้ว. เราจะรู้ว่า wallet เชื่อมต่อแล้วเมื่อการตอบกลับของ `useWallet` มีค่า `wallet` อยู่ (ไม่ null). และตรงข้ามกันถ้า wallet ค่าเป็น null แสดงว่าเรายังไม่ได้เชื่อมต่อ (disconnected).

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.preview.en.tsx)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Vue

Run คำสั่งข้างล่างเพื่อติดตั้ง dependencies ที่ต้องใช้:

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

[Solana Wallets Vue](https://github.com/lorisleiva/solana-wallets-vue) plugin จะทำให้เราสามาร initialise wallet store และ สร้าง global `$wallet` ที่สามารถเข้าถึงได้จากทุกๆ component. ทุก properties และ methods ที่เราสามารถ อ่านค่าได้จาก `useWallet()` จะมีแสดงไว้ [ที่นี่](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references). เราจะ import และ render WalletMultiButton component เพื่อให้ผู้ใช้สามารถเลือกและเชื่อมต่อ wallet ได้

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Vue" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.en.vue)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.preview.en.vue)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Svelte

Run คำสั่งข้างล่างเพื่อติดตั้ง dependencies ที่ต้องใช้:

```/bin/bash
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

[Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter) package จะทำให้เราสามารถเพิ่ม Svelte Store (`$walletStore`) ที่เข้าถึงได้ทั้ง JS, TS และ/หรือ Svelte files ใน project ที่สร้างด้วย Svelte Template หรือ SvelteKit. โดยใช้ repo [ที่นี่](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/) เราสามารถที่จะใช้ adapter สำหรับ SSR หรือ SPA. ส่วน UI package จะมี `<WalletMultiButton />` component เพื่อให้ผู้ใช้สามารถเลือกและเชื่อมต่อ wallet ได้

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Svelte" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.en.html)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.preview.en.html)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
