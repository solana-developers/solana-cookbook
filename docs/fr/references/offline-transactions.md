---
title: Envoi de transactions hors connexion
head:
  - - meta
    - name: title
      content: Solana Cookbook | Envoi de transactions hors connexion
  - - meta
    - name: og:title
      content: Solana Cookbook | Envoi de transactions hors connexion
  - - meta
    - name: description
      content: Après avoir signé la transaction hors connexion, n'importe qui peut la diffuser sur le réseau. Découvrez l'envoi de transactions hors connexion et les références dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Après avoir signé la transaction hors connexion, n'importe qui peut la diffuser sur le réseau. Découvrez l'envoi de transactions hors connexion et les références dans le Solana Cookbook.
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

# Transactions hors connexion

## Signer la Transaction

Pour créer une transaction hors connexion, vous devez signer la transaction, puis n'importe qui peut la diffuser sur le réseau.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Transaction avec Signature Partielle

Lorsqu'une transaction nécessite plusieurs signatures, vous pouvez la signer partiellement.
Les autres signataires peuvent alors la signer et la diffuser sur le réseau.

Quelques exemples de cas où cela est utile :

- Envoyer un jeton SPL en échange d'un paiement
- Signer une transaction afin de pouvoir en vérifier l'authenticité ultérieurement
- Appeler des programmes personnalisés dans une transaction qui nécessitent votre signature

Dans cet exemple, Bob envoie à Alice un jeton SPL en échange de son paiement :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Nonce Durable

`RecentBlockhash` est une valeur importante pour une transaction. Votre transaction sera rejetée si vous utilisez un hash de blocs récent qui est expiré (après 150 blocs). Vous pouvez utiliser `durable nonce` pour obtenir un hash de blocs récent qui n'expirera jamais. Pour déclencher ce mécanisme, votre transaction doit

1. utiliser un `nonce` stocké dans le `nonce account` comme un hash de blocs récent
2. mettre l'opération `nonce advance` dans la première instruction

### Créer un Compte de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Obtenir le Compte de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Utiliser le Compte de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
