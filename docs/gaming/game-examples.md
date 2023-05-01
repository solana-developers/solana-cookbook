---
title: Learn By Example
head:
  - - meta
    - name: title
      content: Solana Cookbook | Learn By Example
  - - meta
    - name: og:title
      content: Solana Cookbook | Learn How to Build Solana Games By Example
  - - meta
    - name: description
      content: A list of open source games on Solana with tutorials to get you started.
  - - meta
    - name: og:description
      content: A list of open source games with tutorials to get you started.
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

# Open source Solana games to reference for learning

## Interact with Anchor Program from Unity

A simple example moving a player left and right using Anchor framework and Unity SDK
<br/>
[Video](https://www.youtube.com/watch?v=_vQ3bSs3svs)<br/>
[Live Version](https://solplay.de/TinyAdventure/index.html)<br/>
[Playground](https://beta.solpg.io/tutorials/tiny-adventure)<br/>
[Unity Client](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)<br/>

## Saving Sol in a PDA

Learn how to save sol in a PDA seed vault and send it back to a player. Backend is written in Anchor and the frontend is using the Unity SDK<br/>
[Video](https://www.youtube.com/watch?v=gILXyWvXu7M)<br/>
[Live Version](https://solplay.de/TinyAdventureTwo/index.html)<br/>
[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventureTwo)<br/>


## On chain matchmaking

A multiplayer match three game which uses NFT stats for the character stats in the game and has an interesting onchain matchmaking system.
<br/>
[Live Version](https://deezquest.vercel.app/)<br/>
[Source](https://github.com/val-samonte/deezquest)<br/>

## Use Solana Pay Qr codes to control a game

Tug of war
A multiplayer game where an account is changed via Solana Pay qr codes which can be player with many people on a big screen. Backend Anchor and the frontend is Js React and Next13.
<br/>
[Tutorial](https://www.youtube.com/watch?v=_XBvEHwSqJc&ab_channel=SolPlay)<br/>
[Example](https://tug-of-war.vercel.app/)<br/>
[Source](https://github.com/Woody4618/workshops_fork/tree/main/workshops/tug-of-war)<br/>


## Hide game state from other players

Stone paper scissors

A game where on chain data is hidden by saving a hash in the client until reveal. SPL Tokens as price for the winner.<br/>
[Source](https://github.com/kevinrodriguez-io/bonk-paper-scissors)

Another example submitted for grizzlython which encrypts entries and send it to the next player with an additional encryption:<br/>
[Source](https://github.com/solanaGames)


## How to build a round based multiplayer game

Tic Tac toe
A simple multiplayer game written in Anchor

[Tutorial](https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html)<br/>
[Source](https://github.com/coral-xyz/anchor-book/tree/master/programs/tic-tac-toe)


## On Chain Chess

Chess
Complete on chain playable chess game written in Anchor. Send someone a link to start a game. Looking for contributors.
<br/>
[Live Version](https://chess.vicyyn.com/)<br/>
[Source](https://github.com/vicyyn/sol-chess/)<br/>


## Multiplayer Game using voting system
Pokemon voting system
A game where collectively people vote on moves in a game boy game. Every move is recorded and each move can be minted as an NFTs.
<br/>
[Live Version](https://solana.playspokemon.xyz/)<br/>
[Source](https://github.com/nelsontky/web3-plays-pokemon)<br/>

## Entity component system example

Kyoudai Clash is an on chain realtime 
Using the jump crypto [Arc framework](https://github.com/JumpCrypto/sol-arc) which is an on chain entity component system for Solana. 
<br/>
[xNFT Version](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)<br/>
[Source](https://github.com/spacemandev-git/dominari-arc)<br/>


## Adventure killing monsters and gaining xp

Lumia online was a hackthon submission and is a nice reference for a little adventure game.
<br/>
[xNFT Version](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)<br/>
[Source](https://github.com/spacemandev-git/dominari-arc)<br/>

## Realtime pvp on chain game

SolHunter

Realtime Solana Battle Royal Game. Using Anchor program, UnitySDK, WebSocket account subscription. Players can spawn their characters represented as one of their NFTs on a grid and move around. If a player hits another player or chest he collect its Sol. The grid is implemented as a two dimensional array where every tile saves the players wallet key and the NFT public key.
<br/>
[Example](https://solplay.de/SolHunter/index.html)<br/>
[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/SolHunter)<br/>
