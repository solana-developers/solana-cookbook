---
title: Strata
head:
  - - meta
    - name: title
      content: Solana Cookbook | Building on Strata Protocol
  - - meta
    - name: og:title
      content: Solana Cookbook | Building on Strata Protocol
  - - meta
    - name: description
      content: Strata is a protocol for launching tokens on Solana. Learn how to use and build on top of Strata.
  - - meta
    - name: og:description
      content: Strata is a protocol for launching tokens on Solana. Learn how to use and build on top of Strata.
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

Strataは、Solana 上に構築されたトークンをローンチするためのプロトコルです。
Strata を使用して、ソーシャルトークンから daoおよびgamefiトークンに至るまで、あらゆる種類の代替可能トークンをローンチできます。
また、固定価格制の仕組みを採用しているものとStrataの組み合わせにより、Metaplex CandyMachineのような動的な価格設定の仕組みを構築できます。


より詳細なドキュメントは[こちら](docs.strataprotocol.com)から入手できます。[Strata Launchpad](app.strataprotocol.com)でGUIの使用も可能です。

## フルマネージドトークンの作成方法

フルマネージドStrataトークンは、流動性がプロトコルによって管理されるトークンです。その結果、プールや流動性プロバイダーを必要とせずに、すぐに取引可能なトークンを取得できます。 フルマネージドトークンは、metaplexトークンのメタデータと関連するボンディングカーブを、持つ通常のsplトークンです。
ボンディングカーブは、そのトークンの流動性、価格設定、および供給を管理します。

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

## トークンの売買方法

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

## 流動性のブートストラップ方法
Strata は、供給を手動で管理したい場合にトークンを販売することもできます。これは、トークンをdexにリストする前の流動性のブートストラップに役立ちますこれらの詳細については、[こちら](https://docs.strataprotocol.com/marketplace/lbc)を確認するか、[Strata Launchpad](app.strataprotocol.com)で独自のものをローンチできます。


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

## その他参考資料

- [Typescript Client Documentation](https://docs.strataprotocol.com) - Strataトークンを作成および管理するためのライブ コード例
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - GUIを使用してトークンをローンチする
