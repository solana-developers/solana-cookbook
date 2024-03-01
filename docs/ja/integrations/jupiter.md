---
title: Jupiter
head:
  - - meta
    - name: title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: og:title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
  - - meta
    - name: og:description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
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

JupiterはSolanaの主要な流動性アグリゲーターであり、幅広いトークンとあらゆるトークンペア間の最適なルート発見を提供します。

### Installation

@jup-ag/core は、jupiterオンチェーンプログラムと対話し、2つの可能なトークンペア間のスワップを実行するために使用されるコアパッケージです。

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

### Jupiterからのトークンリストの取得

特定のネットワークでJupiterとSwapできるすべての可能なトークンが取得されます。

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

### Jupiterインスタンスの読込

Jupiter インスタンスは、提供された設定で作成されます。インスタンスが受け取るオプションのパラメータは多数あり、詳しくは[こちら](https://docs.jup.ag/jupiter-core/full-guide)をご覧ください。

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

### RouteMapの取得

RouteMapは、特定の入力トークンに対してどのトークンを交換できるかを識別します。ルートマップにはトークンミントアドレスのみが含まれ、メタデータは含まれません。

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

### 指定された入力および出力トークンのルートを取得する
`computeRoutes`メソッドは、入力Mintアドレスと出力Mintアドレスを受け取り、すべての可能なルートを最安値の順に提供します。

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

### トークンスワップを実行する
ここで`exchange`メソッドが呼び出され、特定のルートのトランザクションが構築されます。

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

## React アプリケーションで Jupiter を使用する方法

### インストール

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

### プロバイダーの追加

React アプリ全体で useJupiter フックを使用するために、ここで JupiterProvider をセットアップしています。クラスター パラメーターは、さまざまなトークンを取得するために**mainnet-beta** として設定されていますが、必要に応じて**devnet**に変更することもできます

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

### トークンのリストを取得する

特定のネットワークでスワップできるすべての可能なトークンが取得され、状態に格納されます。

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

### Stateの設定

InputMintとOutputMintは、互いに交換したり、ユーザーから取得したりできるようにするために追加されるStateです。

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

### useJupiter react hookの仕様

useJupiterフックは、必要なすべてのパラメーターを取得して、InputMint と OutputMintの両方のトークンを交換できるルートを見つけます。詳細については[こちら](https://docs.jup.ag/jupiter-react/using-the-react-hook)

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

### スワップの実行

すべてのデータを useJupiter フックに提供した後`exchange`メソッドを使用して、jupiterインスタンスを使用してスワップを実行できます。

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

## Jupiter APIの使用方法

これは、 jupiter programとやり取りして、提供された2つのトークンを交換する最も簡単な方法です。

### インストール

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-OpenBook/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-OpenBook/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### ルートマップの取得

この API は、jupiter API を使用してスワップできるすべての利用可能なトークンを取得します。すべての可能なトークン ルートのリストがここで取得されます。`allInputMints` には、ミント アドレスごとのすべての可能な入力トークンのリストが含まれ、`swappableOutputForSol` には、この場合にSOLにスワップできるすべての可能なトークンが含まれます。

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

### シリアル化されたトランザクションを取得してスワップを実行する
POST APIリクエストには、利用したいルートとユーザーのウォレットアドレスを指定します。このAPIには、**wrapUnwrapSOL**や**feeAccount**などのオプションパラメータを追加することができます。
 feeAccountについて詳しくは、[こちら](https://docs.jup.ag/jupiter-api/swap-api-for-solana)の公式ドキュメントをご覧ください。

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

### スワップトランザクションの実行
Transactionオブジェクトが作成され、ユーザーによって署名されます。

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

## その他参考資料

- [Main Docs](https://docs.jup.ag/)
- [Jupiter Core Example Code](https://github.com/jup-ag/jupiter-core-example)
- [Jupiter React Example Code](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Jupiter API Example Code](https://github.com/jup-ag/api-arbs-example)
