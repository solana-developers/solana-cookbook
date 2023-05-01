---
title: Distribution
head:
  - - meta
    - name: title
      content: Solana Cookbook | Game Distribution
  - - meta
    - name: og:title
      content: Solana Cookbook | Game Distribution
  - - meta
    - name: description
      content: How to do game distribution on Solana
  - - meta
    - name: og:description
      content: How to do game distribution on Solana
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

# Distribution

Distribution of your game depends highly on the platform you are using. With Solana, there are game SDKs you can build for IOS, Android, Web and Native Windows or Mac. Using the Unity SDK you could even connect Nintendo Switch or XBox to Solana theoretically. Many game companies are pivoting to a mobile first approach because there are so many people with mobile phones in the world. Mobile comes with its own complications though, so you should pick what fits best to your game.  

Solana has a distinct edge over other blockchain platforms due to its offering of a crypto-native mobile phone, named Saga, that comes equipped with an innovative dApps store. This store enables the distribution of crypto games without the limitations imposed by conventional app stores such as Google or Apple.

## Publishing Platforms

Platforms where you can host your games

| Platform | Description |
| --- | --- |
| [Fractal](https://www.fractal.is/) | A game publishing platform that supports Solana and Ethereum. They also have their own wallet and account handling and there is an SDK for high scores and tournaments.  |
| [Elixir](https://elixir.app/) | Platform for web3 games that also offers a PC launcher |
| Self Hosting | Just host your game yourself. For example using [Vercel](https://vercel.com/) which can be easily setup so that a new version get deployed as soon as you push to your repository. Other options are [github pages](https://pages.github.com/) or [Google Firebase](https://firebase.google.com/docs/hosting) |
| [Solana mobile DApp Store](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md) | The Solana alternative to Google Play and the Apple App Store. A crypto first variant of a dApp store, which is open source free for everyone to use. |
| [Apple App Store](https://www.apple.com/de/app-store/) | The Apple app store has a high reach and is trusted by its customers. The entrance barrier for crypto games is high though. The rules are very strict for everything that tries to circumvent the fees that Apple takes for in app purchases. A soon as an NFT provides benefits for the player for example Apple requires you for example to have them purchased via their in app purchase system.  |
| [Google Play Store](https://play.google.com/store/games) | Google is much more crypto friendly and games with NFTs and wallet deep links for example have had a track record of being approved for the official play store.  |
| [xNFT Backpack](https://www.backpack.app/) | Backpack is a Solana wallet which allows you to release apps as xNFTs. They appear in the users wallet as soon as they purchase them as applications. The Unity SDK has a xNFT export and any other web app can be published as xNFT as well. |
|  |  |  |
