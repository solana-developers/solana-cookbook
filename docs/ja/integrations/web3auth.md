---
title: web3Auth (Torus Wallet)
head:
  - - meta
    - name: title
      content: Solana Cookbook | Wallet
  - - meta
    - name: og:title
      content: Solana Cookbook | Wallet
  - - meta
    - name: description
      content: Learn about wallets, integrating social logins, signing and verifying messages and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Learn about wallets, integrating social logins, signing and verifying messages and more references for Building on Solana at The Solana cookbook.
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

# ウォレット

## ウォレットとは？

クリプト ウォレットは、ブロックチェーンとやり取りするために使用されるデジタル ウォレットです。これにより、トランザクションに署名、検証、および送信できます。マーケットには、使いやすいWebアプリからより複雑なハードウェアセキュリティソリューションに至るまで、多くのクリプトウォレットソリューションが存在します。

## Solanaのソーシャルログイン

[**Web3Auth**](https://docs.web3auth.io/)を使用すると、ユーザーは既存のWeb2 OAuthプロバイダー(Facebook, Google, Twitter etc.)を使用してWeb3 dappsにサインインできます。これは資産とIDを管理するための、ユーザーフレンドリーで[非管理的](https://docs.web3auth.io/key-infrastructure/overview)なアプローチを提供します。
秘密鍵管理のラッパーを提供することで、技術的な障壁を取り除き、すべてのユーザーのデジタル所有権の学習曲線を短縮します。 

## インテグレーションガイド

このチュートリアルでは、ソーシャルログインをdappに統合するための基本的な例について説明します。

### 依存関係のインストール

dappでウォレットの使用を開始するには、`@toruslabs/solana-embed`をインストールします。yarnやnpmなどの一般的なパッケージマネージャーを使用してダウンロードできます。
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslabs/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslabs/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### SDKをインポートして初期化する

以下のコード スニペットでは、solana-embed のインスタンスを作成し、それをsolana testnetを使用するテスト環境で初期化しています。ウォレット インターフェイスの初期化中に、他の構成オプションを渡すことができます。詳細については、[api-reference](https://docs.tor.us/solana-wallet/api-reference/class)を参照してください。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/initialize-instance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/initialize-instance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### ユーザーログインのトリガー

`torus.login()`を呼び出すだけで、アプリケーションのライフサイクルで意味のある場所でログインをトリガーできます。パラメータなしでloginメソッドを呼び出すと、ユーザーがサポートされているすべてのログインを選択するためのモーダルが開きます。

![](./assets/Web3Auth/login-modal.png)

ログインが成功すると、メソッドは公開鍵の配列を返します。配列の最初の要素は、現在のウォレットの公開鍵です。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/login.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/login.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Torusインスタンスを使用してユーザーアカウントの詳細を取得する

torusインスタンスは、ログイン状態でのトランザクションやメッセージへの署名など​​の対話のためのインターフェイスを提供します。また、ユーザーの電子メール、プロフィール画像などのユーザーログイン情報にアクセスするためのインターフェイスを提供することもできます(ログイン方法によって異なります)。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/user-info.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/user-info.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Torus Solana APIを使用してメッセージに署名します。

ユーザーが署名するようにメッセージを送信するには、WebアプリケーションはUint8ArrayとしてUTF-8でエンコードされた文字列を提供する必要があります。

ユーザーがメッセージに署名するたびに、ウォレットは確認ウィンドウを開きます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/sign-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/sign-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

同様に、`signAllTransactions` メソッドを使用し、またtorusインスタンスで[signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) メソッドを使用して、それぞれ単一または複数のトランザクションに署名することもできます。

### torus Solana APIを使用してトランザクションを送信

トランザクションを送信するには、torusインスタンスで`sendTransaction`メソッドを呼び出し、`Transaction` を渡すだけです。

ウォレットが確認ウィンドウを開きます。承認後、SDKはトランザクションに署名してチェーンに送信します。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/send-transaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/send-transaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Top-ups​

現在、API は Moonpay からのtopupをサポートしています。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/topup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/topup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### ログアウト

ユーザーをログアウトするには、torus ウォレット インスタンスで`logout`関数を呼び出すだけです。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/logout.en.ts)

  </template>
    
  <template v-slot:preview>
    
@[code](@/code/wallet/Web3Auth/logout.preview.en.ts)
    
  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## その他参考資料

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Api Reference](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Hosted Demo](https://demo-solana.tor.us/)
* [Sample React Integration](https://github.com/torusresearch/solana-embed-react-demo)
* [Solana Wallet](https://solana.tor.us/)