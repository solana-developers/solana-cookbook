---
title: 密钥对和钱包
head:
  - - meta
    - name: title
      content: Solana秘籍 | 密钥对和钱包
  - - meta
    - name: og:title
      content: Solana秘籍 | 密钥对和钱包
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

# 密钥对和钱包

## 如何生成新的密钥对

对于使用Solana库执行各种操作，许多操作都需要一个密钥对或钱包。如果你正在连接到一个钱包，那么你不必担心。然而，如果你需要一个密钥对，你会需要生成一个。

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

## 如何从密钥恢复密钥对

如果你已经有了密钥，你可以通过这个密钥获取密钥对，以测试你的dApp。

1. 从字节中：

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

2. 从Base58字符串：

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

## 如何验证密钥对

如果你有了个密钥对，你可以验证密钥对的私钥是否与给定的公钥匹配。

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

## 如何检查一个公钥是否有关联的私钥

在某些特殊情况下（例如，派生自程序的地址(PDA)），公钥可能没有关联的私钥。你可以通过查看公钥是否位于ed25519曲线上来检查这一点。只有位于曲线上的公钥才可以由具有钱包的用户控制。

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


## 如何生成助记词

如果你正在创建一个钱包，你需要生成一个助记词，以便用户可以将其保存为备份。

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

## 如何通过助记词恢复密钥对 

许多钱包扩展使用助记词来表示其密钥。你可以将助记词转换为密钥对以进行本地测试。

1. BIP39 - 创建单个钱包的步骤如下：

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

2. BIP44 （多个钱包，也叫HD钱包）

你可以从一个单一种子生成多个钱包，也被称为“分层确定性钱包”或HD钱包。

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

## 如何生成自定义地址(vanity address)

自定义公钥或地址（Vanity Address）是以特定字符开头的密钥。例如，一个人可能希望公钥以 "elv1s" 或 "cook" 开头，这样可以帮助他人记住密钥所属的人，使密钥更容易识别。

注意: 自定义地址中字符的数量越多，生成时间将会更长。

::: 警告
在此任务中，您应该使用命令行界面（CLI）。Python和TypeScript的示例仅用于说明，速度比CLI慢得多。
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

## 如何使用钱包来签名和验证消息

密钥对的主要功能是对消息进行签名并验证签名的有效性。通过验证签名，接收方可以确保数据是由特定私钥的所有者签名的。

为此，我们将导入[TweetNaCl][1] 密码库，并按照以下步骤进行操作：

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

## 如何连接到钱包

Solana的[钱包适配器](https://github.com/solana-labs/wallet-adapter) 库使客户端管理钱包连接变得简单。

### 反应

运行以下命令来安装所需的依赖项：

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React的钱包适配器库允许我们通过钩子和上下文提供程序来持久化和访问钱包连接状态，主要包括`useWallet、WalletProvider`、`useConnection和ConnectionProvider`。`WalletProvider`和`ConnectionProvider`必须包装React应用程。

此外，我们可以使用`useWalletModal`来提示用户进行连接，通过切换连接模态框的可见性，并将应用程序包装在`@solana/wallet-adapter-react-ui`中的`WalletModalProvider`中。连接模态框将处理连接流程，因此我们只需监听钱包连接的状态。当`useWallet`的响应具有非空的`wallet`属性时，我们知道钱包已连接。反之，如果该属性为空，我们知道钱包已断开连接。

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

运行以下命令来安装所需的依赖项：

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

[Solana的Vue钱包](https://github.com/lorisleiva/solana-wallets-vue) 插件允许我们初始化钱包存储，并创建一个名为`$wallet`的全局属性，可以在任何组件中访问。你可以在[此处](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references) 查看可以从`useWallet()`获取的所有属性和方法。我们还导入并渲染WalletMultiButton组件，以允许用户选择钱包并连接到它。

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

运行以下命令来安装所需的依赖项：

```/bin/bash
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

[Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter) 包允许我们在使用Svelte模板或SvelteKit创建的项目中，在所有JS、TS或/和Svelte文件之间添加一个可访问的Svelte Store（`$walletStore`）。使用 [此处](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/) 的存储库引用，您可以在SSR或SPA中使用适配器。UI包含一个`<WalletMultiButton />`组件，允许用户选择一个钱包并连接到它。

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
