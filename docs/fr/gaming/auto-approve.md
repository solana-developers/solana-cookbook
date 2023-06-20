---
title: How to auto approve transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | How to auto approve transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | How to auto approve transactions
  - - meta
    - name: description
      content: To have a fluent game play you may want to be able to auto approve transactions
  - - meta
    - name: og:description
      content: To have a fluent game play you may want to be able to auto approve transactions
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

WIP - This is a work in progress

# How to auto approve transaction for fast game play and great ux

To have a fluid game play for on-chain games it is beneficial to have an auto approve wallet.

1. Solflare wallet offers auto-approve functionality with burner wallets, but this limits your players to only one wallet.

[Burner Auto Approve Wallets](https://twitter.com/solflare_wallet/status/1625950688709644324)<br />

2. Another way to do it is to create a key pair in your game and let the player transfer some sol to that wallet and then use it to pay for transaction fees. Only problem with this is that you need to handle the security for this wallet and the players would need to have access to their seed phrase.

[Example Source Code](https://github.com/Woody4618/SolPlay_Unity_SDK/blob/main/Assets/SolPlay/Scripts/Services/WalletHolderService.cs)<br />
[Example Game](https://solplay.de/SolHunter/index.html)<br />

3. You can pay the fees yourself, by creating and signing the transactions in the backend and interact with it via an API. For that you send parameters to your backend and sign the transaction there and send a confirmation to the client as soon as it is done.

4. There is a protocol called @gumisfunn and they released a feature called session keys. Session Keys are ephemeral keys with fine-grained program/instruction scoping for tiered access in your @solana programs.
They allow users to interact with apps under particular parameters like duration, max tokens, amount of posts or any other function specific to an app.
[Link](https://twitter.com/gumisfunn/status/1642898237395972097?s=20)