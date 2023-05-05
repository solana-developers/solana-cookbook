---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Mango Markets
  - - meta
    - name: description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets offers the industry standard for decentralized, cross-margin trading. Learn how to use and build on top of Mango Markets.
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

Mangoは、オンチェーンリスク エンジンを介して、取引暗号資産を貸与、借入、交換、および活用するための単一の場を提供します。
クライアントAPIライブラリを使用して、Mangoのオンチェーンプログラムに接続できます。Solana JavaScript APIライブラリも必要です。

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## Mango Groupの取得方法

Mango groupはクロスマージントークンのバスケットで、トークン、Serum dex market、perp market、Oracle、Insurance fund、Fees vaultに関する幅広い市場情報を保持しています。 Mango Markets の各バージョンは、異なるトークンを含む異なる Mango Group を使用します。現在の v3 グループは`mainnet.1` です。さまざまなグループを示す表を次に示します:


| Group                | Version     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Note
v2 グループを使用する場合は、v2 クライアント ライブラリを使用する必要があります。[ここ](https://github.com/blockworks-foundation/mango-client-ts)で見つけることができます
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

## Mango Accountの作成方法

Mango Accountは Mango Groupに関連付けられており、トークンを保持し、そのグループの市場での取引を可能にします。[こちら](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount)からリファレンスを確認できます。

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

## USDCをMango Accountに入金する方法
Mango accountアカウントを作成したら、取引用のトークンで資金を供給する必要があります。
入金方法のリファレンスは[こちら](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit)。

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

## スポット注文の方法
MangoはSerum Protocolと対話し、市場でスポット注文を出します。これにより、スポット注文を出すことができます。placeSpotOrder関数のリファレンスは[こちら](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder)。
Mangoには、グループ、マーケット、トークン、およびOracleに関する情報を含む構成ファイルがあります。
[ここ](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json)で見つけることができます。そのファイルの情報を使用して、適切なグループと市場を見つけます。

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

## 売値の読込方法
MangoはSerum Protocolから得た市場情報を使用して売値を読み込みます。Serumから直接読み込み、Mangoで操作できます。Serumの市場に関しての 
より詳しい情報は[こちら](https://github.com/project-serum/serum-ts/tree/master/packages/serum)。

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

## 買値の読込方法
MangoはSerum Protocolから得た市場情報を使用して買値を読み込みます。
Serumから直接読み込み、Mangoで操作できます。Serumの市場の詳しい情報は[こちら](https://github.com/project-serum/serum-ts/tree/master/packages/serum)。

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

## その他参考資料

- [Client Libraries](https://docs.mango.markets/development-resources/client-libraries)
- [Mango Docs](https://docs.mango.markets)
- [Technical Intro](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
