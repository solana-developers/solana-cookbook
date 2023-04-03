---
title: Solana Gaming SDKs 
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Gaming SDKs 
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Gaming SDKs 
  - - meta
    - name: description
      content: A list of SDKs that you can use to develope games on Solana 
  - - meta
    - name: og:description
      content: A list of SDKs that you can use to develope games on Solana 
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

### Unity SDK

The Solana Unity SDK is based on a Solnet fork and the Solanart SDK and maintained by the Team Magic block. It comes with NFT support, Transactions, RPC functions, Phantom Deep links, WebGL connector, WebSocket connection support and anchor client code generation.

[Docs](https://solana.unity-sdk.gg/)<br />
[Verified Unity Asset Store Listing](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931)<br />
[Example Games](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples)<br />

### Unreal SDK

Originally build by the team of Star Atlas. The Unity SDK is currently developed further. (Could need some maintainer)

[Star Atlas Unreal SDK](https://github.com/staratlasmeta/FoundationKit)<br />
[Tutorial](https://www.youtube.com/watch?v=S8fm8mFeUkk)<br />
[Bifrost Unreal SDK](https://github.com/Bifrost-Technologies/Solana-UnrealEngine5-SDK)<br />

### Flutter

Flutter is an open source framework by Google for building beautiful, natively compiled, multi-platform applications from a single codebase. For more complex games I would recommend using a GameEngine like Unity or Unreal though.

[Source Code](https://github.com/espresso-cash/espresso-cash-public)<br />

### Next.js/React + Anchor

One of the easiest way to build on Solana is using the Web3js Javascript framework in combination with the Solana Anchor frameworks. For more complex games I would recommend using a GameEngine like Unity or Unreal though.
The fastest way to set it up is: 
```js
npx create-solana-dapp your-app
```
I comes with a complete app using Solana wallet adapter and some basic functionality which should ba a good starting point. 
A benefit of using Next.js is that you can use the same code in the backend and in the frontend, which speed up development.

[Web3Js](https://github.com/espresso-cash/espresso-cash-public)<br />
[Solana Cookbook](https://solanacookbook.com/references/basic-transactions.html#how-to-send-sol)<br />


### Python 

Python is an easy to learn programming language which is often used in AI programming. There is a framework called Seahorse which lets you build smart contracts in Python.

[Anchor Playground Example](https://beta.solpg.io/tutorials/hello-seahorse)<br />
[Source and Docs](https://github.com/ameliatastic/seahorse-lang)<br />

### Native C#

The original port of Web3js to C#. It comes with a bunch of functionality like transactions, RPC functions and anchor client code generation. 

[Source and Docs](https://github.com/bmresearch/Solnet/blob/master/docs/articles/getting_started.md)<br />
