---
title: Jupiter
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Swap tokens โดยใช้ Jupiter
  - - meta
    - name: og:title
      content: คู่มือ Solana | Swap tokens โดยใช้ Jupiter
  - - meta
    - name: description
      content: Jupiter คือ liquidity aggregator หลักของ Solana, สนับสนุน tokens มากมาย และมี route discovery ระหว่าง token pair ที่ดีที่สุดให้ด้วย
  - - meta
    - name: og:description
      content: Jupiter คือ liquidity aggregator หลักของ Solana, สนับสนุน tokens มากมาย และมี route discovery ระหว่าง token pair ที่ดีที่สุดให้ด้วย
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

# Jupiter

Jupiter คือ liquidity aggregator หลักของ Solana, สนับสนุน tokens มากมาย และมี route discovery ระหว่าง token pair ที่ดีที่สุดให้ด้วย

### การติดตั้ง

@jup-ag/core คือ Core package เอาไว้ใช้ติดต่อกับ jupiter on-chain programs เพื่อทำการ swaps ระหว่าง token pairs ที่เป็นไปได้

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### ดึงข้อมูลรายการ Token จาก Jupiter

ดึงข้อมูลทุก tokens ที่สามารถ swap ด้วย jupiter สำหรับ network ใดๆ

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Loading the Jupiter instance

Jupiter instance กำลังสร้างด้วย configurations ที่ให้มา เรามีตัวเลือก parameters มากมายที่จะส่งไปให้ instanceได้ ลองอ่านเพิ่มเติมได้ [ที่นี่](https://docs.jup.ag/jupiter-core/full-guide)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### หาเส้นทาง RouteMap

RouteMap จะบอกเราว่า tokens สามารถ swap ด้วย input token ที่ให้มาได้หรือเปล่า ซึ่งจะมีแต่ token mint addresses และไม่มี metadata.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/route-map/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/route-map/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### หาเส้นทางสำหรับ Input และ Output token ที่ให้มา
methods `computeRoutes` รับ input/output Mint address และคืนค่า routes ที่เป็นไปได้ทั้งหมดโดยเรียงจากราคาที่ดีที่สุดมาก่อน

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/routes/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/routes/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Execute the Token Swap
method `exchange` จะถูกเรียกตรงนี้เพื่อสร้าง transaction สำหรับ route ที่ได้มา

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธีใช้ Jupiter กับ React Application

### ติดตั้ง

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/react-hook
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/react-hook
```

  </CodeGroupItem>
</CodeGroup>

### เพิ่ม Provider

เราจะติดตั้ง JupiterProvider ตรงนี้เพื่อจะใช้ useJupiter Hook ใน React App. โดยที่จะตั้ง parameter ให้ cluster เป็น **mainnet-beta** เพื่อจะได้ tokens ที่หลากหลาย แต่เราจะเปลี่ยนเป็น **devnet** ก็ได้เหมือนกันถ้าต้องการ

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/providerSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/providerSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### ดึงข้อมูลรายการ Tokens

ดึงข้อมูลทุก tokens ที่สามารถ swap ด้วย jupiter สำหรับ network ใดๆ แล้วเก็บไว้ใน state

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/react-token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/react-token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### ตั้งค่า State

InputMint และ OutputMint คือ state ที่เพิ่มเข้าไปเพื่อจะสามารถ swapกันเอง หรือดึงมาจาก user อื่นด้วยก็ได้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/inputSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/inputSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### การใช้ react hook useJupiter

useJupiter Hook จะรับ parameters เพื่อหา routes ที่ทั้ง InputMint และ OutputMint สามารถ swap ได้. เรียนรู้เกี่ยวเพิ่มเติมได้ [ที่นี่](https://docs.jup.ag/jupiter-react/using-the-react-hook)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/useJupiter/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/useJupiter/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### ทำการ Swap

หลังจากให้ข้อมูลกับ useJupiter Hook หมดแล้ว เราจะสามารถใช้ jupiter instance เพื่อทำการ swap ได้โดยใช้ method `exchange`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/reactSwap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/reactSwap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## วิธี use Jupiter API

นี่คือวิธีที่ง่ายที่สุดที่จะใช้งาน jupiter programs เพื่อ swap คู่ tokens ใดๆ

### การติดตั้ง

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-serum/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-serum/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### หา Route Map

API จะหา tokens ที่สามารถ swap ได้โดยใช้ the jupiter API. รานการของ token routes ที่เป็นไปได้จะเริ่ม fetch ตรงจุดนี้ และ `allInputMints` จะมีรายการของ Input Tokens mint address ที่เป็นไปได้ และ `swappableOutputForSol` จะมีรายการของทุก tokens ที่สามารถ swapp เป็น SOL ได้ในกรณีนี้

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/retriveapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/retriveapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### วิธีทำ Serialized Transaction เพื่อเอาไป Swap
POST API request จะไปตาม route ที่เราต้องการจะไป รวมถึง wallet address ของ user ที่กำหนดไว้ นอกจากนี้จะมี params ตัวเลือกอื่นๆ อีกเช่น **wrapUnwrapSOL** และ **feeAccount** เราสามารถเรียนรู้เพิ่มเติมได้ที่ offical docs ตรงนี้ [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/getTxapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/getTxapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### ทำการ Swap Transaction
Transaction จะถูกสร้างและ sign ด้วย user.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/executeapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/executeapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## แหล่งข้อมูลอื่น

- [Main Docs](https://docs.jup.ag/)
- [Jupiter Core Example Code](https://github.com/jup-ag/jupiter-core-example)
- [Jupiter React Example Code](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Jupiter API Example Code](https://github.com/jup-ag/api-arbs-example)
