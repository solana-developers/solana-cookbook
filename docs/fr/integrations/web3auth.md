---
title: web3Auth (Torus Wallet)
head:
  - - meta
    - name: title
      content: Solana Cookbook | Portefeuille
  - - meta
    - name: og:title
      content: Solana Cookbook | Portefeuille
  - - meta
    - name: description
      content: Découvrez les portefeuilles, l'intégration des connexions sociales, la signature et la vérification des messages et d'autres références pour Développer sur Solana dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Découvrez les portefeuilles, l'intégration des connexions sociales, la signature et la vérification des messages et d'autres références pour Développer sur Solana dans le Solana cookbook.
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

# Portefeuille

## Qu'est-ce qu'un portefeuille ?

Un portefeuille de crypto-monnaie est un portefeuille numérique utilisé pour interagir avec la blockchain. Il vous permet de signer, de vérifier et d'envoyer des transactions. Il existe de nombreuses solutions de portefeuille de crypto-monnaies sur le marché, allant des applications web simples à utiliser aux solutions de sécurité matérielle plus complexes.

## Connexions Sociales sur Solana

[**Web3Auth**](https://docs.web3auth.io/) permet aux utilisateurs de se connecter en utilisant leurs fournisseurs Web2 OAuth existants (Facebook, Google, Twitter, etc.) dans des applications Web3. Il offre une approche facile à utiliser et [non-custodial](https://docs.web3auth.io/key-infrastructure/overview) de la gestion des actifs et de l'identité. Il supprime les obstacles techniques et réduit la courbe d'apprentissage de la propriété numérique pour tous les utilisateurs en fournissant un cadre à la gestion des clés privées. 

## Guide d'Intégration

Ce tutoriel vous guidera à travers un exemple de base pour intégrer les connexions sociales dans votre application.

### Installation des Dépendances

Pour commencer à utiliser le portefeuille avec une dapp, vous pouvez installer `@toruslabs/solana-embed`. Vous pouvez utiliser des gestionnaires de paquets connus comme yarn et npm pour les télécharger.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslabs/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslabs/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### Importer le SDK et l'initialiser

Dans l'extrait de code ci-dessous, nous créons une instance de solana-embed et l'initialisons avec l'environnement de test qui utilise le tesnet de Solana. Vous pouvez passer d'autres options de configuration lors de l'initialisation de l'interface du portefeuille. Vous pouvez vous référer à solana-embed [api-reference](https://docs.tor.us/solana-wallet/api-reference/class) pour en savoir plus.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/initialize-instance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/initialize-instance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Déclencher la connexion de l'utilisateur

Il suffit d'appeler `torus.login()` pour déclencher une connexion à n'importe quel moment du cycle de vie de votre application. L'appel de la méthode de connexion sans aucun paramètre ouvrira une modale permettant à l'utilisateur de sélectionner toutes les connexions prises en charge.

![](./assets/Web3Auth/login-modal.png)

Une fois la connexion réussie, la méthode renvoie un tableau de clés publiques. Le premier élément du tableau est la clé publique du portefeuille actuel.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/login.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/login.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Utilisation de l'instance torus pour récupérer les détails du compte utilisateur

L'instance torus fournit une interface pour des interactions telles que la signature de transactions et de messages lorsque l'on est connecté. Il peut également nous fournir une interface permettant d'accéder aux informations de connexion de l'utilisateur, telles que son adresse électronique, son image de profil, etc. (selon la méthode de connexion utilisée)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/user-info.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/user-info.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Utilisation de l'API Solana de Torus pour signer un message.

Afin d'envoyer un message à signer par l'utilisateur, l'application web doit fournir une chaîne de caractères codée en UTF-8 sous forme de Uint8Array.

Chaque fois qu'un utilisateur veut signer un message, le portefeuille ouvre une fenêtre de confirmation.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/sign-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/sign-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

De même, vous pouvez aussi utiliser les méthodes [signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) et `signAllTransactions` de l'instance torus pour respectivement la signature des transactions uniques et multiples.

### Utilisation de l'API Solana de Torus pour envoyer une transaction.

Pour envoyer une transaction, il suffit d'appeler la méthode `sendTransaction` de l'instance torus et de lui passer la `Transaction`.

Le portefeuille ouvre une fenêtre de confirmation. Après approbation, le SDK signe et envoie la transaction à la blockchain.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/send-transaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/send-transaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Top-ups​

Actuellement, l'API prend en charge les topups de Moonpay.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/topup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/topup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Déconnexion

Pour déconnecter l'utilisateur, il suffit d'appeler la fonction `logout` de l'instance du portefeuille torus.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/logout.en.ts)

  </template>
    
  <template v-slot:preview>
    
@[code](@/code/wallet/Web3Auth/logout.preview.en.ts)
    
  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Ressources

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Référence de l'Api](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Démo hébergée](https://demo-solana.tor.us/)
* [Exemple d'intégration React](https://github.com/torusresearch/solana-embed-react-demo)
* [Portefeuille Solana](https://solana.tor.us/)