---
title: Keypairs and Wallets
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

## How to generate a new Keypair

Keypair 또는 Wallet을 요구하는 다양한 Solana 라이브러리들에 대해 당신은 많은 다른 액션들을 취할 수 있습니다.
만약 당신이 wallet에 연결하고 있다면 걱정할 필요가 없습니다. 하지만 당신이 keypair가 필요하다면, 하나를 생성할 필요가 있습니다.

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

## How to restore a Keypair from a secret

만약 당신이 secret을 이미 가지고 있다면, 당신은 dApp을 테스트하기 위해 secret으로부터 Keypair를 얻을 수 있습니다.

1. Bytes로부터

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

2. Base58 String으로부터

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

## How to verify a Keypair

keypair가 주어졌다면 당신은 secret이 주어진 public key와 일치하는지 검증할 수 있습니다.

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

## How to check if a public key has an associated private key

특별한 케이스 (e.g. a Program Derived Address)에서, public key들은 연관된 private key를 가지고 있지 않을지 모릅니다. 당신은 이 public key가 ed25519 곡선에 놓여있는지를 확인함으로써 이것을 체크할 수 있습니다.
이 곡선에 놓여있는 public key들은 지갑을 갖고 있는 사용자들에 의해서만 다뤄질 수 있습니다.

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


## How to generate a mnemonic phrase

만약 당신이 wallet을 생성하고 있다면, 당신은 사용자들이 백업을 위해 저장할 연상 문구를 생성할 필요가 있을 것입니다.

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

## How to restore a Keypair from a mnemonic phrase

많은 지갑들이 Secret key들을 대변하는 연상 구문들을 사용합니다.
당신은 이 연상 구문들을 keypair로 변환할 수 있습니다.

1. BIP39 - 단일 지갑 생성

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

2. BIP44 (HD 지갑으로도 알려진 다중 지갑)

당신은 하나의 seed로부터 다중 지갑을 만들 수 있습니다. - 'Hierarchical Deterministic wallets' or HD wallets으로도 알려진:

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

## How to generate a vanity address

Vanity publickeys 또는 custom addresses는 특별한 문자들로 시작하는 key들입니다.
예를들어, 어떤 사람은 publickey가 "elv1s" 또는 "cook"으로 시작하길 원할 수도 있습니다.
이것들은 다른 사람들이 이 key가 누구의 것인지 기억할 수 있게 도와줍니다. 즉 이 key를 더 쉽게 식별 가능하게 만들어 줍니다.

Note: 당신의 vanity address에 문자들이 많을수록 더 오래 걸립니다.

::: warning
이 작업을 위해서는 CLI를 사용해야 합니다. Python 과 TypeScript 예제들은 보여주기 위한 목적으로 CLI보다 훨씬 느립니다.
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

## How to sign and verify messages with wallets

keypair의 주된 기능은 message들에 서명하고 이 서명을 검증 가능하게 만드는 것입니다.
서명에 대한 검증은 수신자가 이 데이터가 특정 private key의 소유자에 의해 서명되었다는 것을 확신할 수 있게 해 줍니다.

이걸 하기 위해 우리는 [TweetNaCl][1] 라이브러리를 import 할 것입니다.

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

## How to connect to a wallet

Solana의 [wallet-adapter](https://github.com/solana-labs/wallet-adapter) 라이브러리들은 client-side에서 wallet 연결 관리를 쉽게 해 줍니다.

### React

요구되는 의존성들을 설치하기 위해 아래의 명령어를 실행하세요:

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React의 wallet-adapter 라이브러리들은 hook들과 `useWallet`, `WalletProvider`, `useConnection`, 그리고 `ConnectionProvider`로 불리는 Context provider들을 통해 지갑 연결 상태를 지속하고 접근할 수 있게 해 줍니다.

추가적으로, 우리는 연결 modal의 껐다 켰다하는 `useWalletModal`을 사용해 유저들이 연결하도록 유도할 수 있습니다. `useWalletModal`은 `@solana/wallet-adapter-react-ui`에 있는 `WalletModalProvider`를 가진 앱을 감싸고 있습니다.
연결 modal은 우리가 연결 흐름을 다룰 수 있게 해 줄 것입니다. 그래서 우리는 지갑이 연결되었을 때 동안 단지 수신하면 됩니다.
우리는 `userWallet` 응답이 null이 아닌 `wallet` 속성을 가질 때, 지갑이 연결된 것을 알 수 있습니다.
반대로, 만약 이 속성이 null이라면 지갑이 연결되지 않은 것을 알 수 있습니다. 

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

요구되는 의존성들을 설치하기 위해 아래의 명령어를 실행하세요:

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

[Solana Wallets Vue](https://github.com/lorisleiva/solana-wallets-vue) 플러그인은 우리가 지갑 저장소를 초기화하고 어떤 컴포넌트 안에서도 접근할 수 있는 `$wallet` 글로벌 속성을 생성할 수 있게 해 줍니다.
당신이 `userWallet()`을 사용해 얻을 수 있는 모든 속성과 메소드들은 [여기](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references)에 나와 있습니다.
우리는 또한 WalletMultiButton 컴포넌트를 import 하고 render 할 수 있습니다. 이것은 사용자들이 연결하기 위한 지갑을 선택할 수 있게 해 줍니다.

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

요구되는 의존성들을 설치하기 위해 아래의 명령어를 실행하세요:

```/bin/bash
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

[Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter) 패키지는 프로젝트 내의 모든 JS, TS 또는/그리고 Svelte 파일들에서 접근할 수 있는 Svelte Store (`$walletStore`)을 추가할 수 있게 해 줍니다.
[여기](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/) 있는 레퍼런스를 사용해서 당신은 SSR 또는 SPA를 위한 어댑터를 사용할 수 있습니다.
UI 패키지는 `<WalletMultiButton />` 컴포넌트를 포함하고 있고 이것은 사용자들이 연결할 지갑을 선택할 수 있게 해 줍니다.

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
