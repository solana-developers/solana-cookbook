---
title: Particle Network
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

# Wallet vs Wallet-as-a-Service

## Understanding (Traditional) Wallets
Wallets are mechanisms for facilitating interaction with accounts that transact on the blockchain. For example, you may be familiar with Phantom, a popular cross-chain **wallet** that purely facilitates interaction between a given account, in this case, an account derived from a **private key** (seed phrase), and the blockchain. Traditional wallet solutions are often structured as browser extensions or mobile apps.

## Understanding Wallet-as-a-Service
Wallet-as-a-Service, while still intrinsically facilitating interaction with accounts, takes a fundamentally different approach, both in setting and in the nature of the accounts themselves. 

Wallet-as-a-Service solutions tend to move away from extensions or mobile apps and instead implement the wallet experience natively within the decentralized application being utilized; this is often referred to as an "embedded wallet" -- this means that the core interaction experience is built **around the application**, resulting in seamless UX and a more natural onboarding flow. Traditional wallets, often quite rigid, would instead force developers to build applications **around the wallet**, which can limit the degree of control you have over UX.

In addition to this, Wallet-as-a-Service solutions tend to stray away from single-key accounts, such as those secured by seed phrases that you'd find within traditional wallets. Instead, Wallet-as-a-Service providers will use an alternative key management mechanism like MPC-TSS, SSS, standalone KMS, etc.

This migration from standard single-key accounts to their more flexible, sharded counterparts means that you can also enable onboarding through familiar mechanisms, such as **social login** with Google, Twitter, email, phone number, etc. -- this is one of the key value propositions of Wallet-as-a-Service solutions; the ability to facilitate accessible onboarding without sacrificing flexibility or security.

![Particle Auth Example Solana](https://i.imgur.com/POfCaxA.gif)

# Particle Network
**[Particle Network](https://particle.network/)**  is the Intent-Centric, Modular Access Layer of Web3. With Particle's Wallet-as-a-Service, developers can curate unparalleled user experience through modular and customizable embedded wallet components. By utilizing MPC-TSS for key management, Particle can streamline onboarding via familiar Web2 accounts—such as Google accounts, email addresses, and phone numbers.

Through APIs and SDKs available on both mobile and desktop platforms, developers can integrate Particle's Wallet-as-a-Service to enable secure key generation and management initiated by Web2 logins, with the capacity to be customized and implemented in a way that matches the specific needs of a given application.

# Integration Guide

This guide will walkthrough the process of utilizing Particle's Wallet-as-a-Service within Solana applications.

### Installation

To begin, you'll need to install a few dependencies from `@particle-network`

However first, you'll need to decide between starting with Particle Auth, our generalized authentication and interaction SDK for Particle, or Particle Connect, an SDK more specifically meant for facilitating interaction through connection UI comments (i.e. a "Connect Wallet" button).

You can install Particle Auth through the following.
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @particle-network/auth
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @particle-network/auth
```

  </CodeGroupItem>
</CodeGroup>

Otherwise, if you'd like to use Particle Connect as the means of interaction, you can install it through running the following.
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @particle-network/connect-react-ui
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @particle-network/connect-react-ui
```

  </CodeGroupItem>
</CodeGroup>

Moving forward, we'll be diving into intializing and using Particle Auth, although this process looks nearly identical to Particle Connect. The only difference is that configuration within Particle Connect happens in the confines of `ModalProvider`, and interaction can be facilitated with `connectKit.particle.solana.{method goes here}`.

### Creating an instance of `particle`

The first step in leveraging Particle involved the intialization of `ParticleNetwork` (imported from `@particle-network/auth`, often in a variable called `particle`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/initialization.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Your project ID, client key, and app ID can be retrieved from the [Particle Network dashboard](https://dashboard.particle.network/).


### Initiating login

Within Particle Auth, you can initiate social login by calling `.auth.login` on the master (`particle`) object you previously defined. By default, this will open a general popup requesting that a user signs in (through one of many social login options)- this popup can be customized on the [Particle Network dashboard](https://dashboard.particle.network/).

Additionally, if you choose to define `{ preferredAuthType }` within the parameters of `.login()`, you can automatically route login to a specific authentication type (such as `'google'`, `'twitter'`, `'phone'`, etc.)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/loginpopup.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Once a user has logged in, their user information (public profile information corresponding with the social login in question) will be stored within `userInfo` (or whatever variable you declare in this case).

Additionally, with a user logged in, `particle.solana` is now available and will act as your primary method of interacting with the blockchain through Particle (and in this case, the connected account).
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/getaddress.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Examples of usage

Now that we have Particle initialized and a user signed in, let's run through an example: signing a simple message.

As was mentioned, `particle.solana` is the primary mechanism of blockchain interaction here. As such, we can call `signMessage` to initiate a signature popup.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/signmessage.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Working with transactions looks quite similar and mimics traditional programmatic initiation of signatures, building transactions, etc.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/sendtransaction.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

![Sign message example](https://i.imgur.com/yhvZEGn.gif)

### Additional functionality

Beyond general utilization of Particle, the Particle Auth SDK has a number of other features worth mentioning.

1. Onramp popups
Particle has a [built-in onramp](https://docs.particle.network/developers/auth-service/sdks/web#open-crypto-token-buy) aggregating multiple providers. This onramp can be initiated programmatically with the following.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/onramp.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Logout
If you'd like to log a user out, Particle offers a method on `particle.auth` to do so.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/logout.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

3. Listeners
Particle Auth can also leverage listeners for `connect` (initial connection), `disconnect` (logout/disconnect), and `chainChanged`.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/listeners.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

4. Opening Particle Wallet (outside of the optional built-in popup)
If you'd like to [open the wallet UI](https://docs.particle.network/developers/auth-service/sdks/web#open-particle-web-wallet) (which includes all traditional wallet functionality, along with swaps, an onramp, etc.), then you can call `openWallet` on `particle`.
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Particle/openwallet.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Resources
* [Documentation](https://docs.particle.network/)
* [Web Demo](https://web-demo.particle.network/)
* [Solana "Sign in with Google" Example](https://github.com/TABASCOatw/particle-solana-google-example)
* [Particle Network](https://particle.network)
