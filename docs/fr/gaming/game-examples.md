---
title: Apprendre par l'exemple
head:
  - - meta
    - name: title
      content: Solana Cookbook | Apprenez à créer des jeux Solana par l'exemple
  - - meta
    - name: og:title
      content: Solana Cookbook | Apprenez à créer des jeux Solana par l'exemple
  - - meta
    - name: description
      content: Une liste de jeux sur Solana open source avec des tutoriels pour vous aider à démarrer.
  - - meta
    - name: og:description
      content: Une liste de jeux sur Solana open source avec des tutoriels pour vous aider à démarrer.
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

# Jeux Solana open source à consulter pour l'apprentissage

## Interagir avec un programme Anchor depuis Unity

Un exemple simple de déplacement d'un joueur de gauche à droite en utilisant le framework Anchor et le SDK Unity

[Vidéo](https://www.youtube.com/watch?v=_vQ3bSs3svs)

[Version Live](https://solplay.de/TinyAdventure/index.html)

[Playground](https://beta.solpg.io/Tutoriels/tiny-adventure)

[Client Unity](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)


## Stocker des SOL dans un PDA

Apprenez à stocker des SOL dans un PDA qui sert de coffre-fort et à les renvoyer à un joueur. Le backend est écrit en Anchor et le frontend utilise le SDK Unity.

[Vidéo](https://www.youtube.com/watch?v=gILXyWvXu7M)

[Version Live](https://solplay.de/TinyAdventureTwo/index.html)

[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventureTwo)



## Matchmaking on-chain

Un jeu de puzzle multijoueur qui utilise les stats d'un NFT pour les stats du personnage dans le jeu et dispose d'un système de matchmaking on-chain intéressant.

[Version Live](https://deezquest.vercel.app/)

[Source](https://github.com/val-samonte/deezquest)


## Utiliser les QR codes de Solana Pay pour contrôler un jeu

Tug of war, jeu multijoueur où un compte est modifié via des QR codes de Solana Pay et qui peut être joué à plusieurs sur un grand écran. Le backend est écrit en Anchor et le frontend est en React JS et Next13.


[Tutoriel](https://www.youtube.com/watch?v=_XBvEHwSqJc&ab_channel=SolPlay)

[Exemple](https://tug-of-war.vercel.app/)

[Source](https://github.com/solana-developers/workshops/tree/main/workshops/tug-of-war)



## Cacher l'état du jeu aux autres joueurs

Pierre feuille ciseaux, jeu où les données stockées sur la chaîne sont cachées en enregistrant un hash dans le client jusqu'à ce qu'elles soient révélées. Des jetons SPL en guise de récompense pour le gagnant.

[Source](https://github.com/kevinrodriguez-io/bonk-paper-scissors)

Un autre exemple soumis à grizzlython qui chiffre les entrées et les envoie au joueur suivant avec un chiffrement supplémentaire :

[Source](https://github.com/solanaGames)


## Comment construire un jeu multijoueur au tour par tour

Tic Tac toe, jeu multijoueur simple écrit en Anchor

[Tutoriel](https://book.anchor-lang.com/anchor_in_depth/milestone_project_tic-tac-toe.html)

[Source](https://github.com/coral-xyz/anchor-book/tree/master/programs/tic-tac-toe)


## Jeu d'échecs on-chain

Jeu d'échecs, jeu d'échecs complet jouable on-chain écrit en Anchor. Envoyer à quelqu'un un lien pour commencer une partie. A la recherche de contributeurs.

[Version Live](https://chess.vicyyn.com/)

[Source](https://github.com/vicyyn/sol-chess/)



## Jeu multijoueurs utilisant un système de vote
Pokémon avec un système de vote, jeu où les gens votent collectivement sur les mouvements à réaliser dans un jeu de Game Boy. Chaque mouvement est stocké et peut être mint en tant que NFT.

[Version Live](https://solana.playspokemon.xyz/)

[Source](https://github.com/nelsontky/web3-plays-pokemon)


## Exemple de système de composants d'entité

Kyoudai Clash est un jeu en temps réel on-chain qui utilise le [framework Arc](https://github.com/JumpCrypto/sol-arc) de jump crypto qui est un système de composants d'entités on-chain pour Solana.

[Version xNFT](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)

[Source](https://github.com/spacemandev-git/dominari-arc)



## Jeu d'aventure avec la mort de monstres et l'obtention de points d'expérience

Lumia online a été soumis dans le cadre d'un hackthon et constitue une belle référence pour un petit jeu d'aventure.

[Version xNFT](https://www.xnft.gg/app/D2i3cz9juUPLwbpi8rV2XvAnB5nEe3f8fM5YUpgVprbT)

[Source](https://github.com/spacemandev-git/dominari-arc)


## Jeu PvP en temps réel on-chain

SolHunter, jeu de bataille royale sur Solana en temps réel. Il utilise un programme Anchor, le SDK Unity et une souscription WebSocket à un compte. Dans ce jeu, les joueurs peuvent faire apparaître leurs personnages représentés par l'un de leurs NFT sur une grille et se déplacer. Si un joueur touche un autre joueur ou un coffre, il récupère ses SOL. La grille est représentée par un tableau à deux dimensions dans lequel chaque case stocke la clé publique du portefeuille du joueur et la clé publique du NFT.

[Exemple](https://solplay.de/SolHunter/index.html)

[Source](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/SolHunter)

