---
title: Distribution
head:
  - - meta
    - name: title
      content: Solana Cookbook | Distribution du jeu
  - - meta
    - name: og:title
      content: Solana Cookbook | Distribution du jeu
  - - meta
    - name: description
      content: Comment distribuer des jeux sur Solana
  - - meta
    - name: og:description
      content: Comment distribuer des jeux sur Solana
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

La distribution de votre jeu dépend fortement de la plateforme que vous utilisez. Avec Solana, il existe des SDK de jeux que vous pouvez créer pour IOS, Android, Web, Windows ou Mac. En utilisant le SDK Unity, vous pourriez même, en théorie, connecter une Nintendo Switch ou une Xbox à Solana. De nombreuses sociétés de jeux adoptent une stratégie axée sur le mobile puisque de nombreuses personnes possèdent un téléphone portable dans le monde. Développer sur mobile s'accompagne toutefois de ses propres complications, c'est pourquoi vous devez choisir ce qui convient le mieux pour votre jeu.

Solana a une longueur d'avance sur les autres blockchains grâce à son téléphone portable crypto-natif, appelé Saga, qui est équipé d'un dApps Store innovant. Celui-ci permet la distribution de jeux crypto sans les limitations imposées par les app stores traditionnels tels que Google ou Apple.

## Plateformes de publication

Plateformes où vous pouvez héberger vos jeux

| Plateforme | Description |
| --- | --- |
| [Fractal](https://www.fractal.is/) | Une plateforme de publication de jeux qui prend en charge Solana et Ethereum. Ils disposent également de leur propre portefeuille et de leur propre gestion de compte, ainsi que d'un SDK qui permet de gérer les meilleurs scores et les tournois.  |
| [Elixir](https://elixir.app/) | Plateforme de jeux web3 offrant également un launcher pour PC |
| Auto-hébergement | Hébergez vous-même votre jeu. Par exemple en utilisant [Vercel](https://vercel.com/) qui peut être facilement configuré pour qu'une nouvelle version soit déployée dès que vous l'envoyez à votre répertoire GitHub. D'autres options sont les [pages GitHub](https://pages.github.com/) ou [Google Firebase](https://firebase.google.com/docs/hosting) |
| [DApp Store de Solana mobile](https://github.com/solana-mobile/dapp-publishing/blob/main/README.md) | L'alternative Solana à Google Play et à l'App Store d'Apple. Une première version crypto d'un dApp store, open source et libre d'utilisation par tous. |
| [App Store d'Apple](https://www.apple.com/de/app-store/) | L'App Store d'Apple a une grande portée et jouit de la confiance de ses clients. La barrière d'entrée pour les jeux crypto est toutefois élevée. Les règles sont très strictes pour tout ce qui tente de contourner les frais prélevés par Apple pour les achats d'applications. Par exemple, dès qu'un NFT offre des avantages au joueur, Apple exige que vous l'achetiez via son système d'achat d'applications.  |
| [Google Play Store](https://play.google.com/store/games) | Google est beaucoup plus favorable aux cryptomonnaies et aux jeux intégrant, par exemple, des NFT et des *Deep Links* vers des portefeuilles. Ainsi des jeux ont déjà été approuvés par le Play Store.  |
| [xNFT Backpack](https://www.backpack.app/) | Backpack est un portefeuille Solana qui vous permet de publier des applications sous forme de xNFTs. Ils apparaissent dans le portefeuille des utilisateurs dès qu'ils les achètent en tant qu'applications. Le SDK Unity possède un export vers xNFT et toute autre application web peut être également publiée en xNFT. |
|  |  |  |
