---
title: Pyth
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การใช้ Pyth เพื่อดึงข้อมูลบน chain
  - - meta
    - name: og:title
      content: คู่มือ Solana | การใช้ Pyth เพื่อดึงข้อมูลบน chain
  - - meta
    - name: description
      content: Pyth เป็น Oracle ที่เอาไว้ดึงข้อมูล financial บน chain
  - - meta
    - name: og:description
      content: Pyth เป็น Oracle ที่เอาไว้ดึงข้อมูล financial บน chain
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

# Pyth

Pyth เป็น Oracle ที่เอาไว้ดึงข้อมูล financial และ crypto market โดย Pyth Oracle สามารถ ใช้ดึงข้อมูลได้ on-chain programs เพื่อการใช้งานที่หลากหลาย

## วิธีใช้ Pyth จาก Client

Pyth มี JavaScript/TypeScript library เรียกว่า **@pythnetwork/client** ซึ่ง library นี้สามารถใช้อ่าน on-chain Pyth Data สำหรับ off-chain app, เช่นการแสดง Pyth price บน website. เรียนรู้เพิ่มเติมได้ [ที่นี่](https://www.npmjs.com/package/@pythnetwork/client)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/pyth/client/client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/client/client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีใช้ Pyth ด้วย Anchor

Pyth มี Rust Crate ที่สามารถใช้บน on-chain programs หรือ off-chain app เพื่อดึงข้อมูล pyth's data ได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/pyth/on-chain/on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/on-chain/on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## แหล่งข้อมูลอื่น

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example)
