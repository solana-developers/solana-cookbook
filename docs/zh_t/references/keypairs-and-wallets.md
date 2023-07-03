---
title: 密鑰對和錢包
head:
  - - meta
    - name: title
      content: Solana祕籍 | 密鑰對和錢包
  - - meta
    - name: og:title
      content: Solana祕籍 | 密鑰對和錢包
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

# 密鑰對和錢包

## 如何生成新的密鑰對

對於使用Solana庫執行各種操作，許多操作都需要一個密鑰對或錢包。如果你正在連接到一個錢包，那麼你不必擔心。然而，如果你需要一個密鑰對，你會需要生成一個。

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

## 如何從密鑰恢復密鑰對

如果你已經有了密鑰，你可以通過這個密鑰獲取密鑰對，以測試你的dApp。

1. 從字節中：

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

2. 從Base58字符串：

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

## 如何驗證密鑰對

如果你有了個密鑰對，你可以驗證密鑰對的私鑰是否與給定的公鑰匹配。

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

## 如何檢查一個公鑰是否有關聯的私鑰

在某些特殊情況下（例如，派生自程序的地址(PDA)），公鑰可能沒有關聯的私鑰。你可以通過查看公鑰是否位於ed25519曲線上來檢查這一點。只有位於曲線上的公鑰纔可以由具有錢包的用戶控制。

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


## 如何生成助記詞

如果你正在創建一個錢包，你需要生成一個助記詞，以便用戶可以將其保存爲備份。

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

## 如何通過助記詞恢復密鑰對 

許多錢包擴展使用助記詞來表示其密鑰。你可以將助記詞轉換爲密鑰對以進行本地測試。

1. BIP39 - 創建單個錢包的步驟如下：

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

2. BIP44 （多個錢包，也叫HD錢包）

你可以從一個單一種子生成多個錢包，也被稱爲“分層確定性錢包”或HD錢包。

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

## 如何生成自定義地址(vanity address)

自定義公鑰或地址（Vanity Address）是以特定字符開頭的密鑰。例如，一個人可能希望公鑰以 "elv1s" 或 "cook" 開頭，這樣可以幫助他人記住密鑰所屬的人，使密鑰更容易識別。

注意: 自定義地址中字符的數量越多，生成時間將會更長。

::: 警告
在此任務中，您應該使用命令行界面（CLI）。Python和TypeScript的示例僅用於說明，速度比CLI慢得多。
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

## 如何使用錢包來簽名和驗證消息

密鑰對的主要功能是對消息進行簽名並驗證簽名的有效性。通過驗證簽名，接收方可以確保數據是由特定私鑰的所有者簽名的。

爲此，我們將導入[TweetNaCl][1] 密碼庫，並按照以下步驟進行操作：

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

## 如何連接到錢包

Solana的[錢包適配器](https://github.com/solana-labs/wallet-adapter) 庫使客戶端管理錢包連接變得簡單。

### 反應

運行以下命令來安裝所需的依賴項：

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React的錢包適配器庫允許我們通過鉤子和上下文提供程序來持久化和訪問錢包連接狀態，主要包括`useWallet、WalletProvider`、`useConnection和ConnectionProvider`。`WalletProvider`和`ConnectionProvider`必須包裝React應用程。

此外，我們可以使用`useWalletModal`來提示用戶進行連接，通過切換連接模態框的可見性，並將應用程序包裝在`@solana/wallet-adapter-react-ui`中的`WalletModalProvider`中。連接模態框將處理連接流程，因此我們只需監聽錢包連接的狀態。當`useWallet`的響應具有非空的`wallet`屬性時，我們知道錢包已連接。反之，如果該屬性爲空，我們知道錢包已斷開連接。

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

運行以下命令來安裝所需的依賴項：

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

運行以下命令來安裝所需的依賴項：

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
