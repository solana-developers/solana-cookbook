---
title: Monetization in crypto games
head:
  - - meta
    - name: title
      content: Solana Cookbook | Monetizing your blockchain game on Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Monetizing your blockchain game on Solana
  - - meta
    - name: description
      content: Learn how to monetize your blockchain game on Solana utilizing platforms, tools, and more
  - - meta
    - name: og:description
      content: Learn how to monetize your blockchain game on Solana utilizing platforms, tools, and more
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

# Monetization

Building a game on Solana opens up a lot of interesting monetization options for games.

## Digital Collectibles
Digital collectibles on blockchains are more commonly known as NFTs. Games can sell NFTs much like people sell items within the Steam shop. NFTs are commonly a part of a collection.
[Metaplex Docs](https://docs.metaplex.com/)<br />
[Setup a candy machine step by step](https://youtu.be/0KHv1dMV8zU)<br />

## Royalty fees
NFTs on Solana can define a resell fee for NFTs which most market places read and use. This means that on every NFT sell on a secondary market place you will get a percentage of the selling price. This can be a constant income stream if the NFTs are traded a lot.
This is how it would look like if the NFT defines a 4.2% resell fee which is split between creator 1 and 2.

```js
"data":{
    "name": "Example NFT"
    "symbol": "SYMBOl"
    "uri": "Url to meta data"
    "sellerFeeBasisPoints": 420
    "creators":[
        {
            "address":"creator 1 public key"
            "verified": 0
            "share": 50
        },
        {
            "address":"creator 2 public key"
            "verified": 0
            "share": 50
        }
        ]
    }
"primarySaleHappened": 1
```

## Selling tokens
Tokens can be used for micro payments, in game purchases and could also be sold to investors to raise money. (Just be aware of security law in your country)
[How to create tokens](./references/token)

## Staking NFTs
You can let players stake NFTs to gain an in game token. These tokens can then also be traded on marketplaces.<br/>
[Open Source Staking Solution](https://github.com/gemworks/gem-farm)

## Compete for valuable assets
With crypto currency it is easily possible to let players compete for rewards or let them bet on certain game outcomes. For example in Games like Poker, Chess or luck based games. You could then take a small fee per game for example.<br/>
[Reward Sol](./store-sol-in-pda) <br/>
[Reward Tokens](./interact-with-tokens)

## Subscriptions
Subscription based model like World of Warcraft but players pay in Sol or SPL Tokens. This can be achieved for example with normal [Sol transfers](./references/basic-transactions.html#how-to-send-sol) or using
[Solana Pay](https://solanapay.com/) and creating Qr code which players can scan to pay.

## Sell in game currency
Let people purchase in game SPL token for crypto or Fiat (Like in for example Albion online)
You can for example deposit you in game currency token into progam account [Store Tokens](./interact-with-tokens)
and then let people buy it with Sol [Pay out sol](./store-sol-in-pda)

## Tournaments
Running Tournaments: Entry fee for example is 0.1 Sol and then 95% of all intake can be payed out to the winners and 5% to you running the service. This can be achieved for example by storing the rewards in a PDA in a program [Store sol in PDA](./store-sol-in-pda) and then have an instruction to join the tournament, which will transfer sol in a chest vault and adds the player into a list. Then when the tournament is over all the rewards can be payed out to the winners on that list depending on their ranking.

## Energy System
Many casual mobile games use an energy system to limit the play time of the players and the energy refills over time and can also be refilled for premium purchases. This energy system can be build as a program. You can build and energy system like this for example: [Energy System](./energy-system) and combine it with SPL tokens [Token Example](./interact-with-tokens) to reward players for actions in the game.

## Pay to earn
Generally, to establish a sustainable business model and tokenomics for a pay-to-earn game, consider the trade-off between players' time and value. There will often be players who have more resources and less time, willing to invest in progressing faster and saving time. Conversely, there will be players with more time and less resources, willing to spend more time in the game. By understanding this dynamic, you can create a sustainable pay-to-earn gaming ecosystem where players with more resources essentially fund the experience for those with less, while you, as the service provider, receive a portion of the proceeds.

## Merch
Create a brand and sell merch. The merch could be bought with Sol or SPL Tokens. And maybe players could slowly grind these tokens, so that very engaged players can also get rewarded.

## Ads
You could also include ads into the game. The rewards from the ads could then be used to pay for transactions fees or to give out in game tokens.
