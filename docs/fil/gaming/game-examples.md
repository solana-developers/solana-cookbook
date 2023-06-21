---
title: Learn By Example
head:
  - - meta
    - name: title
      content: Solana Cookbook | Learn How to Build Solana Games By Example
  - - meta
    - name: og:title
      content: Solana Cookbook | Learn How to Build Solana Games By Example
  - - meta
    - name: description
      content: A list of open source games on Solana with tutorials to get you started.
  - - meta
    - name: og:description
      content: A list of open source games on Solana with tutorials to get you started.
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

# Open source Solana laro upang sanggunian para sa pag-aaral

## Makipag-ugnayan sa Anchor Program mula sa Unity

Isang simpleng halimbawa ng paglipat ng player pakaliwa at kanan gamit ang Anchor framework at Unity SD

[Video](https://www.youtube.com/watch?v=_vQ3bSs3svs)

[Live Version](https://solplay.de/TinyAdventure/index.html)

[Playground](https://beta.solpg.io/tutorials/tiny-adventure)

[Unity Client](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)


## Pag-save ng Sol sa isang PDA

Alamin kung paano i-save ang sol sa isang PDA seed vault at ipadala ito pabalik sa isang player. Ang backend ay nakasulat sa Anchor at ang frontend ay gumagamit ng Unity SDK

[Video](https://www.youtube.com/watch?v=gILXyWvXu7M)

[Live Version](https://solplay.de/TinyAdventureTwo/index.html)

[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventureTwo)



## Sa chain matchmaking

Isang multiplayer match three game na gumagamit ng NFT stats para sa character stats sa laro at may kawili-wiling onchain matchmaking system.

[Live Version](https://deezquest.vercel.app/)

[Source](https://github.com/val-samonte/deezquest)


## Gumamit ng mga Solana Pay Qr code para makontrol ang isang laro

Hilahang lubid
Isang multiplayer na laro kung saan pinapalitan ang isang account sa pamamagitan ng Solana Pay qr code na maaaring maging player na may maraming tao sa isang malaking screen. Backend Anchor at ang frontend ay Js React at Next13.

[Tutorial](https://www.youtube.com/watch?v=_XBvEHwSqJc&ab_channel=SolPlay)

[Example](https://tug-of-war.vercel.app/)

[Source](https://github.com/solana-developers/workshops/tree/main/workshops/tug-of-war)



## Itago ang estado ng laro mula sa iba pang mga manlalaro

Bato papel gunting

Isang laro kung saan nakatago ang data sa chain sa pamamagitan ng pag-save ng hash sa client hanggang sa maihayag. SPL Token bilang presyo para sa nanalo.

[Source](https://github.com/kevinrodriguez-io/bonk-paper-scissors)

Isa pang halimbawang isinumite para sa grizzlython na nag-e-encrypt ng mga entry at ipinapadala ito sa susunod na manlalaro na may karagdagang pag-encrypt:

[Source](https://github.com/solanaGames)


## Paano bumuo ng isang round based na multiplayer na laro

Tic Tac toe
Isang simpleng larong multiplayer na nakasulat sa Anchor

[Tutorial](https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html)

[Source](https://github.com/coral-xyz/anchor-book/tree/master/programs/tic-tac-toe)


## Sa Chain Chess

Chess
Kumpleto sa chain playable chess game na nakasulat sa Anchor. Magpadala sa isang tao ng link para magsimula ng laro. Naghahanap ng mga kontribyutor.

[Live Version](https://chess.vicyyn.com/)

[Source](https://github.com/vicyyn/sol-chess/)



## Larong Multiplayer gamit ang sistema ng pagboto
Sistema ng pagboto ng Pokemon
Isang laro kung saan sama-samang bumoto ang mga tao sa mga galaw sa isang game boy game. Ang bawat galaw ay naitala at ang bawat galaw ay maaaring i-minted bilang isang NFT.

[Live Version](https://solana.playspokemon.xyz/)

[Source](https://github.com/nelsontky/web3-plays-pokemon)


## Halimbawa ng sistema ng sangkap ng entity

Ang Kyoudai Clash ay isang on chain realtime
Gamit ang jump crypto [Arc framework](https://github.com/JumpCrypto/sol-arc) na isang on chain entity component system para sa Solana.

[xNFT Version](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)

[Source](https://github.com/spacemandev-git/dominari-arc)



## Pakikipagsapalaran sa pagpatay ng mga halimaw at pagkakaroon ng xp
Ang Lumia online ay isang pagsusumite ng hackathon at isang magandang sanggunian para sa isang maliit na laro ng pakikipagsapalaran.

[xNFT Version](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)

[Source](https://github.com/spacemandev-git/dominari-arc)


## Real-time na pvp sa chain game

SolHunter

Real-time na Solana Battle Royal Game. Gamit ang Anchor program, UnitySDK, subscription sa WebSocket account. Maaaring i-spawn ng mga manlalaro ang kanilang mga character na kinakatawan bilang isa sa kanilang mga NFT sa isang grid at lumipat sa paligid. Kung ang isang manlalaro ay tumama sa isa pang manlalaro o dibdib ay kinokolekta niya ang Sol nito. Ang grid ay ipinatupad bilang isang dalawang dimensional na array kung saan ang bawat tile ay nagse-save ng wallet key ng mga manlalaro at ang NFT public key.
[Example](https://solplay.de/SolHunter/index.html)

[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/SolHunter)

