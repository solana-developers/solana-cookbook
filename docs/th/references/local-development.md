---
title: Local Development
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Local Development
  - - meta
    - name: og:title
      content: คู่มือ Solana | Local Development
  - - meta
    - name: description
      content: ติดตั้ง Local Validator สำหรับพัฒนาบน local environment และทำการ Airdrop SOL. เรียนรู้เกี่ยวกับ Local Development และ references อื่นๆ เพื่อไปทำงานบน Solana ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content:  ติดตั้ง Local Validator สำหรับพัฒนาบน local environment และทำการ Airdrop SOL. เรียนรู้เกี่ยวกับ Local Development และ references อื่นๆ เพื่อไปทำงานบน Solana ได้ที่คู่มือ Solana.
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

# Local Development

## เริ่มใช้ Local Validator

การทดสอบ program ที่ local จะเสถียรกว่าการทดสอบบน devnet และมันยังช่วยเราทดสอบก่อนที่จะไปลองบน devnet อีกด้วย

เราสามารถติดตั้ง local-test-validator  โดยการลง [solana tool suite](/getting-started/installation.md#install-cli) และ run คำสั่งนี้

```console
solana-test-validator
```

ประโยชน์ของการใช้ local-test-validator คือ:

- ไม่มีข้อจำกัด (rate-limits) ​ในการเรียก RPC 
- ไม่มีข้อจำกัดในการขอ airdrop
- deploy program on-chain ได้โดยตรง (`--bpf-program ...`)
- สามารถ clone accounts และ programs จาก public cluster ได้ (`--clone ...`)
- ตั้งค่า transaction history retention ได้ (`--limit-ledger-size ...`)
- ตั้งค่าความยาว epoch ได้ (`--slots-per-epoch ...`)
- ข้ามไป slot ไหนก็ได้ตามใจ (`--warp-slot ...`)

## Connecting to Environments

เวลา dev บน Solana development เราต้อง connect ไปที่ RPC API endpoint ซึ่ง Solana จะมีอยู่ 3 public development
environments:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Finally, you สามารถ also connect to a private cluster, either one local or
running remotely with the following:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Subscribing to Events

Websockets จะมี pub/sub interface ที่เราสามารถฟัง events ที่เราสนใจแทนที่จะคอยวนๆ เรียก HTTP endpoint บ่อยๆ เราสามารถรับข้อมูลเฉพาะตอนมันเกิดขึ้นได้

Solana's web3 [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) จะมี websocket endpoint และจะ registers ตัว websocket client เมื่อเรา new `Connection` ขึ้นมาใหม่ (ดู source code [ที่นี่](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

`Connection` class จะมี pub/sub methods - ที่จะมีชื่อเริ่มด้วย `on` เหมือน event emitters ทั่วไป เวลาเราเรียก listener methods พวกนี้ มันจะ registers subscription ใหม่ไปที่ websocket client ของ `Connection` นั้นๆ ตัวอย่างของ pub/sub method ที่เราใช้ด้านล่างคือ [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). ส่วน callback จะให้ updated state data ผ่าน arguments (ดูตัวอย่างได้ที่ [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback)).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Getting Test SOL

เมื่อเราทำงานที่ local เราจะต้องการ SOL ในการส่ง transactions บน non-mainnet environments เราสามารถขอ SOL ได้ด้วยการ airdrop ไปที่ address ของเรา

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีใช้ Mainnet Accounts และ Programs

local tests มักจะต้องใช้ programs และ accounts ที่มีอยู่แล้วบน mainnet Solana CLI สามารถที่จะ:
* Download Programs และ Accounts
* Load Programs และ Accounts มาที่ local validator

### วิธี load accounts จาก mainnet

เราสามารถ download SRM token mint account มาเป็น file ได้ตามนี้:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

การ load มาที่ localnet ของเราสามารถทำได้โดยการส่ง account's file และ address เป้าหมาย(ไปยัง local cluster) ตอนเริ่มเปิดใช้ validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### วิธี load programs from mainnet

และเช่นกันเราสามารถ download Serum Dex v3 program ได้:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

การ load มาที่ localnet ของเราสามารถทำได้โดยการส่ง account's file และ address เป้าหมาย(ไปยัง local cluster) ตอนเริ่มเปิดใช้ validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
