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
      content: A list of Solana Gaming SDKs to get you started creating your first Solana Game
  - - meta
    - name: og:description
      content: A list of Solana Gaming SDKs to get you started creating your first Solana Game
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

Ang unity game engine ay kilala sa beginner friendly approach at cross platform support kabilang ang WebGL, ios at android. Bumuo nang isang beses i-export sa lahat ng dako.
Ang Solana Unity SDK ay may kasamang NFT support, mga transaksyon, RPC function, Phantom Deep lLinks, WebGL connector, WebSocket connection support, mobile wallet-adapter at anchor client code generation.

[Docs](https://solana.unity-sdk.gg/)<br />
[Verified Unity Asset Store Listing](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931)<br />
[Example Games](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples)<br />

### Unreal SDK

Ang Unreal engine ay kilala sa magagandang visual at node based scripting framework.
Ang Solana sdk ay orihinal na binuo ng koponan ng Star Atlas.

[Star Atlas Unreal SDK](https://github.com/staratlasmeta/FoundationKit)<br />
[Tutorial](https://www.youtube.com/watch?v=S8fm8mFeUkk)<br />

### Flutter

Ang Flutter ay isang open source na framework ng Google para sa pagbuo ng maganda, natively compiled, multi-platform na mga application mula sa isang codebase.

[Source Code](https://github.com/espresso-cash/espresso-cash-public)<br />

### Next.js/React + Anchor

Isa sa pinakamadaling paraan upang bumuo sa Solana ay ang paggamit ng Web3js Javascript framework kasama ng Solana Anchor frameworks. Para sa mas kumplikadong mga laro, inirerekumenda ko ang paggamit ng GameEngine tulad ng Unity o Unreal.
Ang pinakamabilis na paraan upang i-set up ito ay:
```js
npx create-solana-dapp your-app
```
Ito ay bubuo ng isang mahusay na panimulang application na may suporta sa wallet-adapter.
Ang isang benepisyo ng paggamit ng Next.js ay maaari mong gamitin ang parehong code sa backend at sa frontend, na nagpapabilis sa pag-develop.

[Web3Js](https://github.com/espresso-cash/espresso-cash-public)<br />
[Solana Cookbook](https://solanacookbook.com/references/basic-transactions.html#how-to-send-sol)<br />


### Python 

Ang Python ay isang madaling matutunang programming language na kadalasang ginagamit sa AI programming. Mayroong isang balangkas na tinatawag na Seahorse na hinahayaan kang bumuo ng mga matalinong kontrata sa Python.

[Anchor Playground Example](https://beta.solpg.io/tutorials/hello-seahorse)<br />
[Source and Docs](https://github.com/ameliatastic/seahorse-lang)<br />

### Native C#

Ang orihinal na port ng Web3js sa C#. Ito ay may kasamang grupo ng mga functionality tulad ng mga transaksyon, RPC function at anchor client code generation.

[Source and Docs](https://github.com/bmresearch/Solnet/blob/master/docs/articles/getting_started.md)<br />
