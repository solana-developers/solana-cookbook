---
title: Orca
head:
  - - meta
    - name: title
      content: Solana Cookbook | Integrating Orca in your App
  - - meta
    - name: og:title
      content: Solana Cookbook | Integrating Orca in your App
  - - meta
    - name: description
      content: Orca is the easiest place to exchange cryptocurrency on the Solana blockchain. On Orca, you can exchange tokens more cheaply, quickly, and confidently.
  - - meta
    - name: og:description
      content: Orca is the easiest place to exchange cryptocurrency on the Solana blockchain. On Orca, you can exchange tokens more cheaply, quickly, and confidently.
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

# Orca

Orca is a Dex, which helps to exchange cryptocurrencies on the Solana Blockchain as quickly, cheaply and confidently as possible.
You can start interacting with orca program by using Orca Javascript SDK and the @solana/web3.js library.

## Installing Dependencies

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @orca-so/sdk @solana/web3.js decimal.js
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @orca-so/sdk @solana/web3.js decimal.js
```

  </CodeGroupItem>
</CodeGroup>

## Initialization Orca Object

In this Code we are initializing the orca object with a connection pointing to mainnet.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/init/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/init/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Performing Swap on Orca

We use the orca Object to get a pool object and all the supported pools by orca are under the OrcaPoolConfig object. We use the pool object to swap tokens for that pool.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Deposit X and Y tokens to get X-Y LP tokens

Here we are using the same pool object defined before to deposit token X and Y to the pool and get X-Y LP tokens after depositing.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/get_LP/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/get_LP/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Farming of X-Y LP tokens

In this code the X-Y LP tokens are deposited to a Farm to earn some rewards.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/farm/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/farm/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Withdraw X-Y LP tokens from a farm

Here we are using the pool object and the owner to withdraw the LP token's deposited in the Farm.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/farm_withdraw/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/farm_withdraw/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Withdraw X and Y tokens, from X-Y LP tokens

Here we are using the pool object and the owner to withdraw X and Y token's deposited in the pool.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/orca/pool_withdraw/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/orca/pool_withdraw/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Orca TypeScript SDK](https://www.npmjs.com/package/@orca-so/sdk)
- [Solana SDK](https://solana-labs.github.io/solana-web3.js/)
- [decimal.js](https://www.npmjs.com/package/decimal.js/v/3.0.0)
- [Technical Docs](https://docs.orca.so/)
