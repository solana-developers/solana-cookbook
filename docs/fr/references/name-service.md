---
title: Service de Noms
head:
  - - meta
    - name: title
      content: Solana Cookbook | Service de Noms
  - - meta
    - name: og:title
      content: Solana Cookbook | Service de Noms
  - - meta
    - name: description
      content: Le registre de noms stocke les informations relatives au nom de domaine. Découvrez la résolution des domaines SOL, la recherche inversée/de sous-domaine, le Service de Noms et les référence de Solana dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Le registre de noms stocke les informations relatives au nom de domaine. Découvrez la résolution des domaines SOL, la recherche inversée/de sous-domaine, le Service de Noms et les référence de Solana dans le Solana Cookbook.
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

# Service de Noms

## Registre de noms

Le registre de noms stocke les informations relatives au nom de domaine. Il est composé de deux choses :

- L'en-tête
- Les données

Les données d'un nom de domaine sont toujours précédées de l'en-tête, ci-dessous la structure de l'en-tête en JS :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Résolution des domaines SOL

Les domaines .SOL sont des noms de domaine uniques et faciles à utiliser par l'homme qui se convertissent en clés publiques. De nombreux portefeuilles les utilisent comme une autre option pour envoyer des jetons ou des SOL. Vous pouvez convertir les domaines .SOL en leur clé publique de la manière suivante :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Recherche inversée

Cela peut être utilisé pour déterminer le nom de domaine à partir de sa clé publique

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Recherche des sous-domaines

Pour résoudre un sous-domaine, vous devez :

1. Obtenir la clé du domaine parent
2. Obtenir la clé du sous-domaine
3. Récupérer les informations du compte

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Trouver tous les noms de domaine appartenant à une clé publique

Vous pouvez récupérer tous les noms de domaine d'un portefeuille en faisant une requête `getProgramAccounts` avec un filtre `memcmp`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Résoudre un pseudo Twitter

Les pseudos Twitter peuvent être [enregistrés sur le service de nom Solana](https://naming.bonfida.org/#/twitter-registration) et être utilisés comme des noms de domaine .SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Recherche inversée d'un pseudo Twitter

Pour trouver l'adresse SOL associée à un pseudo Twitter, vous pouvez effectuer une recherche inversée

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
