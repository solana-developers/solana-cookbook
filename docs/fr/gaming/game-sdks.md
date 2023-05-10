---
title: SDKs pour le gaming sur Solana
head:
  - - meta
    - name: title
      content: Solana Cookbook | SDKs pour le gaming sur Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | SDKs pour le gaming sur Solana
  - - meta
    - name: description
      content: Une liste de SDKs pour le gaming sur Solana pour vous aider à créer votre premier jeu Solana
  - - meta
    - name: og:description
      content: Une liste de SDKs pour le gaming sur Solana pour vous aider à créer votre premier jeu Solana
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

### SDK Unity

Le moteur de jeu Unity est connu pour son utilisation adaptée aux débutants et sa prise en charge de plusieurs plateformes, notamment WebGL, IOS et Android. Il vous permet ainsi de créez une seule fois et d'exportez partout.
Le SDK Unity pour Solana inclut le support des NFTs, les transactions, les fonctions RPC, les *Deep Links* de Phantom, le connecteur WebGL, le support de connexion WebSocket, l'adaptateur de portemonnaie mobile et la génération de code Anchor.

[Documentations](https://solana.unity-sdk.gg/)<br />
[Liste vérifiée de l'Asset Store de Unity](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931)<br />
[Exemples de jeux](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples)<br />

### SDK Unreal

Unreal engine est connu pour ses superbes visuels et son framework de script basé sur les nœuds.
Le SDK Solana a été construit à l'origine par l'équipe de Star Atlas.

[SDK Unreal de Star Atlas](https://github.com/staratlasmeta/FoundationKit)<br />
[Tutoriel](https://www.youtube.com/watch?v=S8fm8mFeUkk)<br />

### Flutter

Flutter est un framework open source de Google qui permet de créer des applications multiplateformes compilées nativement à partir d'une seule base de code.

[Code Source](https://github.com/espresso-cash/espresso-cash-public)<br />

### Next.js/React + Anchor

L'une des façons les plus simples de construire sur Solana est d'utiliser le framework Javascript Web3js en combinaison avec le framework Anchor. Pour des jeux plus complexes, il serait cependant préférable d'utiliser un moteur de jeu comme Unity ou Unreal.
La façon la plus rapide de le configurer est la suivante :
```js
npx create-solana-dapp your-app
```
Cela permettra de créer une excellente application de départ avec le support de portefeuille.
L'un des avantages de l'utilisation de Next.js est que vous pouvez utiliser le même code dans le backend et dans le frontend, ce qui accélère le développement.

[Web3Js](https://github.com/espresso-cash/espresso-cash-public)<br />
[Solana Cookbook](https://solanacookbook.com/references/basic-transactions.html#how-to-send-sol)<br />


### Python 

Python est un langage de programmation facile à apprendre qui est souvent utilisé dans la programmation de l'intelligence artificielle. Il existe un framework appelé Seahorse qui vous permet de construire des contrats intelligents en Python.

[Exemple Anchor Playground](https://beta.solpg.io/tutorials/hello-seahorse)<br />
[Source et Documentations](https://github.com/ameliatastic/seahorse-lang)<br />

### C# natif

Le premier portage de Web3js en C#. Il inclut un grand nombre de fonctionnalités telles que les transactions, les fonctions RPC et la génération de code Anchor.

[Source et Documentations](https://github.com/bmresearch/Solnet/blob/master/docs/articles/getting_started.md)<br />
