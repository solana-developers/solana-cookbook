---
title: Pyth
head:
  - - meta
    - name: title
      content: Solana Cookbook | Using Pyth to get OnChain data
  - - meta
    - name: og:title
      content: Solana Cookbook | Using Pyth to get OnChain data
  - - meta
    - name: description
      content: Pyth is an Oracle used to get real-word financial data onChain.
  - - meta
    - name: og:description
      content: Pyth is an Oracle used to get real-word financial data onChain.
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

Pythは、現実世界の金融および暗号市場データを取得するために使用されるOracleです。Pyth Oracleは、さまざまなユースケースでデータを消費する際にオンチェーンプログラムで使用できます。

## クライアントでPythを使用する方法

Pythは**@pythnetwork/client**として呼び出されるJavaScript/TypeScriptライブラリを提供します。このライブラリを使用して、ウェブサイトでのPyth価格の表示などといった、オフチェーンアプリケーションに使用するオンチェーンPyth データを読み取ることができます。詳細は[こちら](https://www.npmjs.com/package/@pythnetwork/client)

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

## AnchorでPythを使用する方法

Pythは、オンチェーンプログラムまたはオフチェーンアプリケーションがpythのデータを消費するために使用できるRust Crateを提供します。

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

## その他参考資料

- [Client Libraries](https://docs.pyth.network/consumers/client-libraries)
- [JS Example Code](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Rust Example Code](https://github.com/project-OpenBook/anchor/tree/master/tests/pyth)
- [Anchor Example Code](https://github.com/0xPratik/pyth-anchor-example)
