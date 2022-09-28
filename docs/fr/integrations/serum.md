---
title: Serum
head:
  - - meta
    - name: title
      content: Solana Cookbook | Développer avec Serum
  - - meta
    - name: og:title
      content: Solana Cookbook | Développer avec Serum
  - - meta
    - name: description
      content: Serum est un CLOB innovant sur Solana. Apprenez à utiliser et à construire par-dessus Serum.
  - - meta
    - name: og:description
      content: Serum est un CLOB innovant sur Solana. Apprenez à utiliser et à construire par-dessus Serum.
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
---

# Serum

Serum est un protocole pour les échanges décentralisés construit sur Solana. Vous pouvez utiliser Serum pour créer de nouveaux marchés, obtenir des carnets d'ordres, trade, etc.

## Comment obtenir un marché de Serum

Un marché sur Serum contient tous les ordres et les fonctionnalités permettant de passer des ordres sur Serum. Pour tout ce que vous faites sur Serum, vous devez connaître le marché avec lequel vous travaillez.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/load-market/load-market.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/load-market/load-market.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Comment obtenir les carnets d'ordres de Serum

Les marchés de Serum sont constitués de carnets d'ordres qui comportent les offres et les demandes. Vous pouvez interroger ces informations afin de voir ce qui se passe sur le marché et agir en conséquence.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-books/get-books.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-books/get-books.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Comment obtenir les ordres ouverts actuels

En tant que trader, vous souhaitez connaître les ordres ouverts en cours sur un marché. Avec Serum, il est possible d'interroger vos ordres ouverts ou ceux de n'importe qui d'autre sur un marché.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/serum/get-orders/get-orders.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/serum/get-orders/get-orders.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>