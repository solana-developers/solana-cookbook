---
title: Serum
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo no Serum
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo no Serum
  - - meta
    - name: description
      content: O Serum é um livro de ordens com limite centralizado (CLOB) inovador construído na rede Solana. Aprenda como usar e construir em cima do Serum.
  - - meta
    - name: og:description
      content: O Serum é um livro de ordens com limite centralizado (CLOB) inovador construído na rede Solana. Aprenda como usar e construir em cima do Serum.
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

O Serum é um protocolo para exchanges descentralizadas construído na Solana. Você pode usar o Serum para criar novos mercados, obter livros de ordens, negociar e muito mais.

## Como obter um mercado do Serum

No Serum, um mercado é composto por todas as ordens e recursos necessários para realizar transações. Para qualquer ação realizada no Serum, é fundamental conhecer o mercado em que se está operando.

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

## Como obter os livros de ordens do Serum

Os mercados do Serum consistem em livros de ordens que possuem lances e ofertas. Você pode consultar essas informações para ver o que está acontecendo no mercado e agir em conformidade.

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

## Como obter as ordens em aberto atuais

Como trader, você desejará saber quais ordens em aberto você tem em um mercado. Você pode consultar as suas próprias ordens em aberto ou de qualquer outra pessoa em um mercado com o Serum.

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