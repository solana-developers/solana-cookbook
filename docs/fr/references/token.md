---
title: Interaction avec les Jetons
head:
  - - meta
    - name: title
      content: Solana Cookbook | Interaction avec les Jetons
  - - meta
    - name: og:title
      content: Solana Cookbook | Interaction avec les Jetons
  - - meta
    - name: description
      content: Apprenez à utiliser, à transférer et à faire plus avec les jetons sur Solana.
  - - meta
    - name: og:description
      content: Apprenez à utiliser, à transférer et à faire plus avec les jetons sur Solana.
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

# Jeton

## De quoi ai-je besoin pour commencer avec SPL-Tokens ?

Chaque fois que vous interagissez avec des jetons sur Solana, vous interagissez en fait avec la Bibliothèque du Programme Solana (SPL) de Jeton, ou norme SPL-Token. La norme SPL-Token nécessite l'utilisation d'une bibliothèque spécifique, que vous trouverez ci-dessous en fonction de votre langage de programmation.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## Comment créer un nouveau Jeton

La création de jetons se fait par la création de ce que l'on appelle un "compte de création" (mint account).
Ce compte de création est ensuite utilisé pour créer des jetons sur le compte de jetons d'un utilisateur.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir un "mint" de jeton

Afin d'obtenir l'offre actuelle, l'autorité ou les décimales d'un jeton, vous devez obtenir les informations de compte du mint du jeton.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment créer un compte de jeton

Un compte de jetons est nécessaire pour qu'un utilisateur puisse détenir des jetons. 

Un utilisateur aura au moins un compte de jeton pour chaque type de jeton qu'il possède.  

Les Comptes de Jetons Associés (ATAs) sont des comptes créés de façon déterministe pour chaque paire de clés (keypair). Les ATAs sont la méthode recommandée pour la gestion des comptes de jetons.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir un compte de jetons

Chaque compte de jetons a des informations sur le jeton comme le propriétaire, le mint, le montant (solde), et les décimales.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir le solde d'un compte de jetons

Le compte de jetons possède le solde du jeton, qui peut être récupéré en un seul appel.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Un compte de jetons ne peut contenir qu'un seul type de mint. Lorsque vous spécifiez un compte de jetons vous spécifiez également un mint.
:::

## Comment créer (mint) de nouveaux jetons

Lorsque vous créez des jetons, vous augmentez l'offre et transférez les nouveaux jetons vers un compte de jetons spécifique.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment transférer des jetons

Vous pouvez transférer des jetons d'un compte de jetons à un autre compte de jetons.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment brûler des jetons

Vous pouvez brûler un jeton si vous en êtes le propriétaire.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment fermer des comptes de jetons

Vous pouvez fermer un compte de jetons si vous ne voulez plus l'utiliser.
Il y a deux situations :

1. Wrapped SOL - La fermeture convertit les Wrapped SOL en SOL
2. Other Tokens - Vous ne pouvez le fermer que si le solde du compte de jetons est égal à 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment définir l'autorité sur les comptes de jetons ou de mints ?

Il est possible de définir/mettre à jour l'autorité. Il en existe 4 types :

1. MintTokens (pour un compte de mint)
2. FreezeAccount (pour un compte de mint)
3. AccountOwner (pour un compte de jetons)
4. CloseAccount (pour un compte de jetons)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment approuver une délégation de jetons

Il est possible de définir un délégué avec un montant autorisé. Après votre paramétrage, le délégué est comme un autre propriétaire de votre compte de jeton. `Un compte de jetons ne peut déléguer qu'à un seul compte à la fois.`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment révoquer une délégation de jetons

La révocation mettra le délégué à *null* et le montant délégué à 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment gérer les wrapped SOL

Les Wrapped SOL sont comme n'importe quel autre jeton. La différence est d'utiliser `syncNative`
et de créer des comptes de jetons spécifiquement sur l'adresse `NATIVE_MINT`.

### Créer un Compte de Jetons

Comme [Créer un Compte de Jetons](#create-token-account) mais en remplaçant mint par `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Ajouter un solde

Il existe deux manières pour ajouter un solde pour Wrapped SOL

#### 1. Par un Transfert de SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. Par un Transfert de Jetons

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir tous les comptes de jetons par propriétaire

Il est possible de récupérer les comptes de jetons par propriétaire. Pour cela, il y a deux façons de procéder.

1. Obtenir Tous les Comptes de Jetons

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Filtrer Par Mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
