---
title: キーペアとウォレット
head:
  - - meta
    - name: title
      content: Solana Cookbook | Keypairs and Wallets
  - - meta
    - name: og:title
      content: Solana Cookbook | Keypairs and Wallets
  - - meta
    - name: description
      content: Learn about Keypairs and Wallets, Signing and Verifying Messages and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Learn about Keypairs and Wallets, Signing and Verifying Messages and more references for Building on Solana at The Solana cookbook.
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

# Keypairs and Wallets

## 新しいキーペアの生成方法

さまざまな Solana ライブラリで実行できるさまざまなアクションの多くには、キーペアまたはウォレットが必要です。
ウォレットに接続している場合は、心配する必要はありません。ただし、鍵ペアが必要な場合は生成する必要があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## シークレットからキーペアを復元する方法

シークレットが既にある場合は、シークレットからキーペアを取得して dApp をテストできます。

1. バイトから

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. Base58文字列から

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

   <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## キーペアを確認する方法

キーペアが与えられた場合、秘密が与えられた公開鍵と一致するかどうかを確認できます。

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

   <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 公開鍵に秘密鍵が関連付けられているかどうかを確認する方法

プログラム派生アドレス(PDA)などの特定の特殊なケースでは、公開鍵に秘密鍵が関連付けられていない場合があります。これは、公開鍵がed25519曲線上にあるかどうかを調べることで確認できます。ウォレットを持つユーザーが制御できるのは、曲線上にある公開鍵のみです。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## ニーモニックフレーズの生成方法

ウォレットを作成する場合は、ユーザーがバックアップとして保存できるようにニーモニック フレーズを生成する必要があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## ニーモニックフレーズからキーペアを復元する方法

多くのウォレット拡張機能は、ニーモニックを使用して秘密鍵を表します。ローカルテスト用にニーモニックをキーペアに変換できます。

1. BIP39 - 単一のウォレットの作成

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. BIP44 (複数のウォレット、別名 HDウォレット)

単一のシードから複数のウォレットを作成できます。これは、「階層的決定論的ウォレット」または HD ウォレットとも呼ばれます。:

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## バニティアドレスの生成方法

バニティ公開鍵またはカスタム アドレスは、特定の文字で始まるキーです。たとえば、公開鍵を「elv1s」または「cook」で開始したい場合があります。これらは、他の人がキーの所有者を思い出すのに役立ち、キーをより簡単に識別できるようにします。

Note: バニティ アドレスの文字数が多いほど、時間がかかります。

::: warning
このタスクには CLI を使用する必要があります。 Python と TypeScript の例は説明を目的としており、CLI よりもはるかに遅くなります。
:::

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## ウォレットでメッセージに署名して検証する方法

鍵ペアの主な機能は、メッセージに署名し、署名の検証を可能にすることです。
署名の検証により、受信者は、データが特定の秘密鍵の所有者によって署名されたことを確認できます。

そのために、[TweetNaCl][1]暗号ライブラリをインポートします。

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://www.npmjs.com/package/tweetnacl

## ウォレットへの接続方法

Solanaの[wallet-adapter](https://github.com/solana-labs/wallet-adapter)ライブラリを使用すると、クライアント側でウォレット接続を簡単に管理できます。

### React

次のコマンドを実行して、必要な依存関係をインストールします:

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React wallet-adapterライブラリでは、フックと Context プロバイダ、すなわち`useWallet`, `WalletProvider`, `useConnection`, `ConnectionProvider`を通じてウォレットの接続状態を持続させたりアクセスしたりすることができます。Reactアプリは、`WalletProvider`と`ConnectionProvider`でラップする必要があります。

加えて、`@solana/wallet-adapter-react-ui`の`WalletModalProvider`でアプリをラップし、 `useWalletModal`を使用して接続モーダルの可視性を切り替えることで、使用してユーザーに接続を促すことができます。接続モーダルはその接続フローを処理するので、ウォレットがいつ接続されたかをリッスンできます。`useWallet`応答にnull 以外の`wallet`プロパティがある場合、ウォレットが接続されていることがわかります。逆に、そのプロパティが null の場合、ウォレットが切断されていることがわかります。

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.preview.en.tsx)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Vue

次のコマンドを実行して、必要な依存関係をインストールします:

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

[Solana Wallets Vue](https://github.com/lorisleiva/solana-wallets-vue) プラグインを使用すると、ウォレットストアを初期化し、任意のコンポーネント内でアクセスできる新しい`$wallet`グローバル プロパティを作成できます。`useWallet()` から使用可能なすべてのプロパティとメソッドは[こちら](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references)に表記されています。また、WalletMultiButton コンポーネントをインポートしてレンダリングし、ユーザーがウォレットを選択して接続できるようにします。

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Vue" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.en.vue)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.preview.en.vue)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Svelte

次のコマンドを実行して、必要な依存関係をインストールします:

```/bin/bash
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

[Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter)パッケージを使うことにより、Svelte TemplateまたはSvelteKitで作成されたプロジェクト内のすべてのJS、TS、Svelte ファイル間でアクセス可能な Svelteストア(`$walletStore`) を追加できます。[こちら](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/)のリポジトリを参照の上、SSR または SPA 用のアダプターを使用できます。UI パッケージには、ユーザーがウォレットを選択して接続できるようにする  `<WalletMultiButton />` コンポーネントが含まれています。

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Svelte" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.en.html)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.preview.en.html)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
