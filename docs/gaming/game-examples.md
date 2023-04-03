---
title: Learn By Example
head:
  - - meta
    - name: title
      content: Solana Cookbook | Learn By Example
  - - meta
    - name: og:title
      content: Solana Cookbook | Learn By Example
  - - meta
    - name: description
      content: A list of open source games with tutorials to get you started.
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

import GameCard from "../../../components/GameCard";

## Interact with Anchor Program from Unity

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Interact with an on-chain Program from Unity",
        translateId: "developer-programs",
    }}
    body={{
        label: "A simple example moving a player left and right using Anchor framework and Unity SDK",
        translateId: "learn-programs",
    }}
    tutorial={"https://www.youtube.com/watch?v=_vQ3bSs3svs"}
    example={"https://solplay.de/TinyAdventure/index.html"}
    source={"https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure"}
/>
</div>
</div>

## Save Sol in a PDA to give out as a reward

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Tiny Adventure Two",
        translateId: "developer-programs",
    }}
    body={{
        label: "Learn how to safe sol in a PDA seed vault and send it back to a player. Backend is written in Anchor and the frontend is using the Unity SDK",
        translateId: "learn-programs",
    }}
    tutorial={"https://www.youtube.com/watch?v=gILXyWvXu7M"}
    example={"https://solplay.de/TinyAdventureTwo/index.html"}
    source={"https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventureTwo"}
/> 
</div>
</div>

<br/>

## Use Solana Pay Qr codes to control a game

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Tug of war",
        translateId: "developer-programs",
    }}
    body={{
        label: "A multiplayer game where an account is changed via Solana Pay qr codes which can be player with many people on a big screen. Backend Anchor and the frontend is Js React and Next13",
        translateId: "learn-programs",
    }}
    tutorial={"https://www.youtube.com/watch?v=_XBvEHwSqJc&ab_channel=SolPlay"}
    example={"https://tug-of-war.vercel.app/"}
    source={"https://github.com/Woody4618/workshops_fork/tree/main/workshops/tug-of-war"}
/> 
</div>
</div>

<br/>

## Saving Game State

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Tug of war",
        translateId: "developer-programs",
    }}
    body={{
        label: "Realtime Solana Battle Royal Game. Using Anchor program, UnitySDK, WebSocket account subscription. Players can spawn their characters represented as one of their NFTs on a grid and move around. If a player hits another player or chest he collect its Sol. The grid is implemented as a two dimensional array where every tile saves the players wallet key and the NFT public key.",
        translateId: "learn-programs",
    }}
    example={"https://solplay.de/SolHunter/index.html"}
    source={"https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/SolHunter"}
/> 
</div>
</div>

## Hide game state from other players

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Stone paper scissors",
        translateId: "developer-programs",
    }}
    body={{
        label: "A game where on chain data is hidden by saving a hash in the client until reveal. SPL Tokens as price for the winner.",
        translateId: "learn-programs",
    }}
    source={"https://github.com/kevinrodriguez-io/bonk-paper-scissors"}
/> 
</div>
</div>

## How to build a round based multiplayer game

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "Tic Tac toe",
        translateId: "developer-programs",
    }}
    body={{
        label: "A simple multiplayer game written in Anchor",
        translateId: "learn-programs",
    }}
    tutorial={"https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html"}
    source={"https://github.com/coral-xyz/anchor-book/tree/master/programs/tic-tac-toe"}
/> 
</div>
</div>

## On Chain Chess

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "On Chain Chess",
        translateId: "developer-programs",
    }}
    body={{
        label: "Complete on chain playable chess game written in Anchor. Send someone a link to start a game. Looking for contributors.",
        translateId: "learn-programs",
    }}
    example={"https://chess.vicyyn.com/"}
    source={"https://github.com/vicyyn/sol-chess/"}
/> 
</div>
</div>

## Multiplayer Game using voting system

<div class="container"> 
<div class="row cards__container">

<GameCard
    header={{
        label: "On Chain Chess",
        translateId: "developer-programs",
    }}
    body={{
        label: "A game where collectively people vote on moves in a game boy game. Every move is recorded and each move can be minted as an NFTs.",
        translateId: "learn-programs",
    }}
    example={"https://solana.playspokemon.xyz/"}
    source={"https://github.com/nelsontky/web3-plays-pokemonhttps://solana.playspokemon.xyz/"}
/>
</div>
</div>