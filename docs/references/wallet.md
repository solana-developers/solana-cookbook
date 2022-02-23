---
title: Wallet
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

# Wallet

## What is a wallet?

A crypto wallet is a digital wallet used to interact with the blockchain. It allows you to sign, verify, and send transactions. There are a multitude of crypto wallet solutions present on the market, ranging from simple-to-use web apps to more complex hardware security solutions.

## Social Logins on Solana

**Torus Solana Wallet** allows users to sign in using their existing Web2 Oauth Providers(Facebook, Google, Twitter etc) into Web3 dapps. It provides a user-friendly and non-custodial approach to managing assets and identity. It removes technical barriers and reduces the learning curve for digital ownership and identity for all users by providing a wrapper around private key management. 

## Integration Guide

This tutorial will guide you over a basic example to integrate social logins using Web3Auth in your dapp.

### Installing Dependencies

To start using the wallet with a dapp, you need to install `@toruslab/solana-embed`. You can use popular package managers like yarn and npm to download them.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslab/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslab/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### Initialize instance and import solana sdk

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

In above code snippet, we are creating an instance of solana-embed and then initializing it with testing enviroment which uses solana testnet. We can pass other configuration options while initializing for customizing the wallet interface. You can refer to solana-embed [api-reference](https://docs.tor.us/solana-wallet/api-reference/class) to know more on that.

### Trigger user login​

Simply call `torus.login()` to trigger user login wherever it makes sense in your application lifecycle

Calling login without any parameter will open a modal for user to select all supported logins.

![](./assets/Web3Auth/login-modal.png)

After successfull login, it will return array of public key. The first element of the array is the current wallet public key

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

After logging in wallet, it provides us interface for interactions like signing transactions and messages.

It also provides us with an interface to access user login information like user's email, profile image etc.

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

Using the Torus instance, dapps can call methods on the wallet.

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

To send a transaction, one simply needs to call the `sendTransaction` method on the torus instance and pass in a `Transaction` instance.

The wallet opens a confirmation window, which on approval signs and sends the transaction to the chain.

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

### Using Torus Solana Api to initiate top up.​

Currently Torus Solana Api supports top up from Moonpay.

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

### Log out handler

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