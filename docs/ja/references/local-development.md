---
title: ローカル開発
head:
  - - meta
    - name: title
      content: Solana Cookbook | Local Development
  - - meta
    - name: og:title
      content: Solana Cookbook | Local Development
  - - meta
    - name: description
      content: Setup Local Validator for local developer environment and Airdrop SOL. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Setup Local Validator and Airdrop SOL for building on Solana Locally. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
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
footer: MIT Licensed
---

# ローカル開発

## ローカルバリデーターの開始

プログラム コードをローカルでテストすることは、devnetでテストするよりもはるかに信頼性が高く、devnetで試す前にテストするのに役立ちます。

[solana tool suite](/getting-started/installation.md#install-cli)をインストール&実行することでlocal-test-validatorをセットアップできます。

```console
solana-test-validator
```

local-test-validatorを使用する利点は次のとおりです:

- RPC レート制限がない
- airdrop 制限がない
- オンチェーンプログラムの直接デプロイ(`--bpf-program ...`)
- プログラムを含むアカウントのパブリッククラスタからのクローン (`--clone ...`)
- 構成可能なトランザクション履歴保持(`--limit-ledger-size ...`)
- 構成可能なエポック長 (`--slots-per-epoch ...`)
- 任意のスロットへのジャンプ(`--warp-slot ...`)

## 環境への接続

Solanaの開発に取り組んでいるときは、特定の RPC APIエンドポイントに接続する必要があります。 Solanaには3つの公開開発環境があります:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

最後に、次のコマンドを使用して、ローカルまたはリモートで実行されているプラ​​イベートクラスターに接続することもできます:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## イベントのサブスクライブ

Websocketsは、特定のイベントをリッスンできるpub/subインターフェイスを提供します。 一般的なHTTPエンドポイントにpingを定期的に送信して更新を取得するとは違い、更新が発生したときのみ受信が可能です。

Solanaのweb3[`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html)は、新しい`Connection`インスタンスを作成する際に、ウェブソケットエンドポイントを生成し、ウェブソケットクライアントを登録します。(ソースコードは[こちら](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100))

`Connection`クラスはpub/subメソッドを公開し、それらはすべてイベントエミッターのように`on`で開始されます。これらのリスナーメソッドを呼び出すと、その`Connection`インスタンスの websocketクライアントに新しいサブスクリプションが登録されます。以下で使用するpub/subメソッドの例は[`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange)です。 コールバックは、引数を介して更新済みのステータスを提供します。(例として [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback)をご確認ください)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## テストSOLの取得

ローカルで作業している場合、トランザクションを送信するために SOL が必要です。メインネット以外の環境では、自分のアドレスにairdropすることでSOLを受け取ることができます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## メインネットのアカウントとプログラムの使用

多くの場合、ローカルテストは、メインネットでのみ利用可能なプログラムとアカウントに依存しています。 Solana CLIでは、次の両方が可能です。:
* プログラムとアカウントのダウンロード
* プログラムとアカウントをローカルバリデーターにロードする

### メインネットからアカウントをロードする方法

SRMトークンミントアカウントをファイルにダウンロードすることができます:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

バリデーターの開始時にアカウントのファイルと宛先アドレス (ローカルクラスター上のもの)を指定することでローカルネットへロードされます:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### メインネットからプログラムをロードする方法

同様に、Serum Dex v3プログラムをダウンロードすることもできます:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

バリデーターの開始時にアカウントのファイルと宛先アドレス (ローカルクラスター上のもの)を指定することでローカルネットへロードされます:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
