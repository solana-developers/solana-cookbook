---
title: Mango Markets
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การทำงานบน Mango Markets
  - - meta
    - name: og:title
      content: คู่มือ Solana | การทำงานบน Mango Markets
  - - meta
    - name: description
      content: Mango Markets มอบมาตรฐานระดับ industry สำหรับ decentralized, cross-margin trading. เรียนรู้วิธีใช้ และทำงานบน Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets มอบมาตรฐานระดับ industry สำหรับ decentralized, cross-margin trading. เรียนรู้วิธีใช้ และทำงานบน Mango Markets.
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

# Mango Markets

Mango รวม lend, borrow, swap, และ leverage trade crypto assets ไว้ที่เดียวบน on-chain risk engine.
เราสามารถต่อกับ Mango's on-chain program โดยใช้ Client API libraries.
เรายังต้องการ Solana javascript API library ด้วย

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## วิธีดึงข้อมูล Mango Group

mango group คือตะกร้า (basket) ของ cross-margined tokens. มันจะมีข้อมูลกว้างๆ ของ market เกี่ยวกับ tokens, serum dex markets, perp markets, oracles, insurance fund และ fees vaults. แต่ละ version ของ Mango Markets ใช้ Mango Group ที่แตกต่างกัน และมี tokens ที่แตกต่างกัน ใน v3 ปัจจุบันนั้นมีชื่อ group คือ `mainnet.1` นี่คือตาราง table ที่แสดงข้อมูลกลุ่มต่างๆ:


| Group                | Version     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Note
ถ้าเราต้องการใช้ v2 groups เราต้องใช้ v2 client library ซึ่งเราสามารถหามันได้ [ที่นี่](https://github.com/blockworks-foundation/mango-client-ts)
:::


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## วิธีสร้าง Mango Account

Mango Account จะเกี่ยวข้องกับ a Mango Group, และมันจะเก็บ tokens ของเรา และทำให้เรา 
 trade ได้ใน Group’s markets นั้น Yเราสามารถหาข้อมูลอ้างอิงเพิ่มเติมได้ [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีฝาก (deposit) USDC เข้าไปใน Mango Account
หลังจากสร้าง mango account แล้วเราต้องลงทุน tokens เข้าไปด้วยเพื่อเอาไว้ trade. 
เราสามารถหาข้อมูลของ deposit method ได้ [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีตั้ง spot order
Mango ติดต่อกับ Serum Protocol เพื่อวาง spot orders บน markets เราจะวาง spot 
order ได้ถ้าทำตามนี้ เราสามารถหาข้ออมูลอ้างอิงของ placeSpotOrder function ได้ [ที่นี่](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder). 
Mango มี config file ที่มี่ข้อมูลเกี่ญซกับ groups, markets, tokens และ oracles, 
เราสามารถหาจ้อมูลได้ [ที่นี่](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). เราได้ข้อมูลจาก file นั้นเพื่อหา group และ market ที่ถต้องการได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธี load bids
Mango uses the market information from Serum Protocol to load bids. You สามารถ load 
them directly from Serum to work with on Mango. You สามารถ find out more about Serum's 
markets [ที่นี่](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## วิธีดึงข้อมูลราคาขาย (asks)
Mango ใช้ข้อมูล market จาก Serum Protocol เพื่อดึงข้อมูลราคาขาย asks. 
เราสามารถดึงข้อมูลได้โดยตรงจาก Serum เพื่อทำงานบน Mango เราสามารถอ่านรายละเอียดเพิ่มเกี่ยวกับ Serum's markets ได้ [ที่นี่](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## แหล่งข้อมูลอื่น

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
