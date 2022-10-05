---
title: Comptes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Comptes
  - - meta
    - name: og:title
      content: Solana Cookbook | Comptes
  - - meta
    - name: description
      content: Les comptes sont une composante essentielle du développement sur Solana. Découvrez les comptes et d'autres concepts fondamentaux dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Les comptes sont une composante essentielle du développement sur Solana. Découvrez les comptes et d'autres concepts fondamentaux dans le Solana Cookbook.
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

# Comptes

Les comptes dans Solana sont utilisés pour stocker des états. Ils constituent un élément essentiel pour le développement sur Solana.

## Faits

::: tip Fiche d'Information

- Les comptes sont utilisés pour stocker des données
- Chaque compte a une adresse unique
- Les comptes ont une taille maximale de 10MB (10 Mega Bytes)
- Les comptes des adresses dérivées d'un programme (PDA) ont une taille maximale de 10KB (10 Kilo Bytes)
- Les comptes des adresses dérivées d'un programme (PDA) peuvent être utilisés pour signer au nom d'un programme
- La taille des comptes est fixée au moment de leur création, mais elle peut être ajustée en utilisant la fonctionnalité [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Le stockage des données sur un compte est payé par une rente
- Le propriétaire par défaut d'un compte est le programme système (System Program)
  :::

## Examen plus approfondi

### Le modèle d'un compte

Il existe 3 types de comptes sur Solana :

- Les comptes de données pour le stockage des données
- Les comptes de programmes pour le stockage des programmes exécutables
- Les comptes natifs pour les programmes natifs de Solana tels que System, Stake, et Vote

Il existe deux types de comptes de données :

- Les comptes appartenant au système
- Les comptes PDA (adresse dérivée du programme)

Chaque compte a une adresse (généralement une clé publique) et un propriétaire (adresse d'un compte de programme). La liste complète des champs qu'un compte stocke est énuméré ci-dessous.

| Champs      | Description                                                   |
| ------------| --------------------------------------------------------------|
| lamports    | Le nombre de lamports appartenant à ce compte                 |
| owner       | Le programme propriétaire de ce compte                        |
| executable  | Indique si ce compte peut traiter des instructions            |
| data        | Le tableau d'octets de données brutes stocké par ce compte    |
| rent_epoch  | La prochaine époque à laquelle ce compte doit payer une rente |

Il existe quelques règles importantes concernant la propriété des comptes :

- Seul le propriétaire d'un compte de données peut modifier ses données et débiter les lamports
- Tout le monde est autorisé à envoyer des lamports sur un compte de données
- Le propriétaire d'un compte peut désigner un nouveau propriétaire si les données de celui-ci sont mises à zéro

Les comptes de programme ne stockent pas d'état.

Par exemple, si vous avez un programme de comptage qui permet d'incrémenter un compteur, vous devez créer deux comptes, un compte pour stocker le code du programme, et un autre pour stocker le compteur. 

![](./account_example.jpeg)

Pour éviter qu'un compte soit supprimé, vous devez payer une rente.

### Rente

Le stockage des données sur les comptes coûte des SOL, et il est financé par ce qu'on appelle une rente. Si vous maintenez un solde minimum équivalent à deux années de rente sur un compte, celui-ci sera exempté du paiement de cette rente. Vous pouvez récupérer la rente en fermant le compte et en renvoyant les lamports dans votre portefeuille.

La rente est payée à deux moments différents :

1. Lorsqu'il est référencé par une transaction
2. Une fois par époque

Un pourcentage des rentes collectées par les comptes est détruit, tandis que le reste est distribué aux comptes de vote à la fin de chaque slot.

Si le compte ne dispose pas d'assez d'argent pour payer la rente, le compte sera supprimé ainsi que ses données.

Il est également important de noter que les nouveaux comptes doivent être exempts de rente.

## Autres Ressources

- [Modèle de compte de Solana](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Documentation officielle](https://docs.solana.com/developing/programming-model/accounts)
- [Thread Twitter sur les comptes par Pencilflip](https://twitter.com/pencilflip/status/1452402100470644739)

### Crédit

Ce concept de base est attribué à Pencilflip. [Suivez-le sur Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
