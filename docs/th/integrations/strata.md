---
title: Strata
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การทำงานกับ Strata Protocol
  - - meta
    - name: og:title
      content: คู่มือ Solana | การทำงานกับ Strata Protocol
  - - meta
    - name: description
      content: Strata คือ protocol สำหรับปล่อยขาย tokens บน Solana. เรียนรู้วิธีใช้ และทำงานบน Strata.
  - - meta
    - name: og:description
      content: Strata คือ protocol สำหรับปล่อยขาย tokens บน Solana. เรียนรู้วิธีใช้ และทำงานบน Strata.
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

# Strata

Strata คือ protocol สำหรับปล่อยขาย tokens บน Solana. 
เราสามารถใช้ Strata เพื่อปล่อยขาย fungible token ใดๆ ไม่ว่าจะเป็น social tokens หรือ dao และ gamefi tokens.
เราสามารถใช้ strata ร่วมกับอะไรก็ตามที่มีการคิดราคาแบบ fixed price mechanics เพื่อให้ได้ dynamic pricing mechanics ตัวอย่างเช่น Metaplex CandyMachine.

สำหรับข้อมูลเชิงลึกไปดูได้ [ที่นี่](docs.strataprotocol.com). และเราสามารถ ใช้ gui ได้ที่ [Strata Launchpad](app.strataprotocol.com)

## วิธีสร้าง fully managed token

fully-managed Strata token คือ token ที่มีการจัดการ liquidity โดย protocol ข้อได้เปรียบคือเราสามารถเปิดการ trade token ได้ในทันทีโดยไม่ต้องมี pools หรือ liquidity providers. โดยที่ fully-managed token นั้นก็คือ spl token ทั่วไปกับ metaplex token metadata และ associated bonding curve.
ซึ่ง bonding curve จะจัดการเรื่อง liquidity, pricing, และ supply ของ token นั้น

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี buy และ sell a token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี bootstrap liquidity

Strata สามารถขาย tokens โดยที่เราสามารถควบคุม supply เองได้ ซึ่งมันจะมีประโยชน์สำหรับการทำ liquidity bootstrapping ก่อนจะ list token ของเราบน dex เราสามารถอ่านเพิ่มเติมได้ [ที่นี่](https://docs.strataprotocol.com/marketplace/lbc) หรือปล่อย token ของเราเองได้ที่ [Strata Launchpad](app.strataprotocol.com)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## แหล่งข้อมูลอื่น

- [Typescript Client Documentation](https://docs.strataprotocol.com) - ตัวอย่าง code สำหรับสร้าง และจัดการ Strata tokens
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - ปล่อย token โดยใช้ GUI
