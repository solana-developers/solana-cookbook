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
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens และ best route discovery between any token pair.
  - - meta
    - name: og:description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens และ best route discovery between any token pair.
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

Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens และ best route discovery between any token pair.

### Installation

@jup-ag/core is the Core package used to interact with jupiter on-chain programs to perform swaps between two possible token pairs.

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

### Fetching Token list from Jupiter

All the possible tokens that สามารถ be swapped with jupiter for a given network is being fetched.

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

Jupiter instance is being created with the provided configurations. There are many optional parameters that the instance takes to know more about it go [ที่นี่](https://docs.jup.ag/jupiter-core/full-guide)

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

### Getting the RouteMap

The RouteMap identifies what tokens สามารถ be swapped for a given input token. The route map only contains token mint addresses และ no metadata.

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

### Getting the routes for given Input และ Output token
The `computeRoutes` methods takes in the input Mint address และ the output Mint address และ gives all the possibles routes in order of best price first.

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
The `exchange` method is called here which constructs the transaction for a given route.

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

## วิธี use Jupiter in a React Application

### Installation

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

### Adding the Provider

We are setting up the JupiterProvider here in order to use the useJupiter Hook Through out the React App. The cluster parameter is set  as **mainnet-beta** in order to get a wide variety of tokens but if you wish you could change it to **devnet** as well

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

### Fetching the List of Tokens

All the possible Tokens that สามารถ be swapped in a Given Network is fetched stored in the state.

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

### Setting up the State

InputMint และ OutputMint are state that is added in order for it to be  swapped among each other or สามารถ be taken from the user as well.

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

### โดยใช้ the useJupiter react hook

The useJupiter Hook takes all the parameters required for it to find the routes through which Tokens of both InputMint และ OutputMint สามารถ be swapped. To เรียนรู้เกี่ยวกับ it go [ที่นี่](https://docs.jup.ag/jupiter-react/using-the-react-hook)

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

### Performing the Swap

After providing all the data to the useJupiter Hook. We สามารถ use the jupiter instance to perform a swap โดยใช้ the `exchange` method

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

This is the easiest way to interact with jupiter programs to swap any 2 provided tokens.

### Installation

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

### Getting the Route Map

This API retrieves all the available tokens that สามารถ be swapped โดยใช้ the jupiter API. A list of all possible token routes is being fetched here และ `allInputMints` contains the list of all possible Input Tokens by mint address และ `swappableOutputForSol` contains all the possible tokens that สามารถ be swapped for SOL in this case.

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

### Getting the Serialized Transaction to perform Swap
POST API request is done with the route that we wish to go with และ the wallet address of the user there are few optional parameters that สามารถ be added to this api like **wrapUnwrapSOL** และ **feeAccount** to เรียนรู้เกี่ยวกับ it go through the offical docs here [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

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

### Executing the Swap Transaction
A Transaction object is created และ then its getting signed by the user.

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
