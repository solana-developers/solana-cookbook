---
title: web3Auth (Torus Wallet)
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Wallet
  - - meta
    - name: og:title
      content: คู่มือ Solana | Wallet
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

# Wallet

## What is a wallet?

A crypto wallet is a digital wallet used to interact with the blockchain. It allows you to sign, verify, and send transactions. There are many crypto wallet solutions present on the market, ranging from simple-to-use web apps to more complex hardware security solutions.

## Social Logins on Solana

[**Web3Auth**](https://docs.web3auth.io/) allows users to sign in using their existing Web2 OAuth Providers(Facebook, Google, Twitter etc.) into Web3 dapps. It provides a user-friendly and [non-custodial](https://docs.web3auth.io/key-infrastructure/overview) approach to managing assets and identity. It removes technical barriers and reduces the learning curve for digital ownership for all users by providing a wrapper around private key management. 

## Integration Guide

This tutorial will guide you over a basic example to integrate social logins in your dapp.

### Installing Dependencies

To start using the wallet with a dapp, you can install `@toruslabs/solana-embed`. You can use popular package managers like yarn and npm to download them.

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

### Import the SDK and initialize

In the code snippet below, we are creating an instance of solana-embed and then initializing it with testing enviroment which uses solana testnet. You can pass other configuration options while initializing the wallet interface. You can refer to solana-embed [api-reference](https://docs.tor.us/solana-wallet/api-reference/class) to know more on that.

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

### Trigger user login​

Simply call `torus.login()` to trigger a login wherever it makes sense in your application lifecycle. Calling login method without any parameter will open a modal for user to select all supported logins.

![](./assets/Web3Auth/login-modal.png)

After successful login, the method will return an array of public keys. The first element of the array is the current wallet public key

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

### Using torus instance to fetch user account detail​

The torus instance provides an interface for interactions like signing transactions and messages in a logged-in state. It can also provide us with an interface to access user login information like the user's email, profile image etc. (depending on the login method)

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

### Using Torus Solana API to sign a message.

In order to send a message for the user to sign, the web application must provide a UTF-8 encoded string as a Uint8Array.

Every time a user wants to sign a message, the wallet will open a confirmation window.

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

Similarly, you can also use [signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) and `signAllTransactions` methods on the torus instance for signing single, multiple transactions respectively.

### Using torus Solana API to send a transaction.​

To send a transaction, one simply needs to call the `sendTransaction` method on the torus instance and pass in the `Transaction`.

The wallet opens a confirmation window. After approval, the SDK signs and sends the transaction to the chain.

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

Currently, the API supports topups from Moonpay.

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

### Logout

To logout user, it simply requires you to call the `logout` function on torus wallet instance.

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

## Resources

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Api Reference](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Hosted Demo](https://demo-solana.tor.us/)
* [Sample React Integration](https://github.com/torusresearch/solana-embed-react-demo)
* [Solana Wallet](https://solana.tor.us/)