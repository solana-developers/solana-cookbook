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

## Deposit X and Y tokens to get X_Y LP tokens

## Depositing X_Y LP tokens in a Farm

## Withdraw X_Y LP tokens from a farm

## Withdraw X and Y tokens, from X_Y LP tokens

## Other Resources

- [Orca TypeScript SDK](https://www.npmjs.com/package/@orca-so/sdk)
- [Solana SDK](https://solana-labs.github.io/solana-web3.js/)
- [decimal.js](https://www.npmjs.com/package/decimal.js/v/3.0.0)
- [Technical Docs](https://docs.orca.so/)
