---
title: Strata
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo no Protocolo Strata
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo no Protocolo Strata
  - - meta
    - name: description
      content: Strata é um protocolo para lançamento de tokens na rede Solana. Aprenda como utilizar e construir em cima do Strata.
  - - meta
    - name: og:description
      content: Strata é um protocolo para lançamento de tokens na rede Solana. Aprenda como utilizar e construir em cima do Strata.
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

# Strata

O Strata é um protocolo para lançamento de tokens construído na Solana. Com o Strata, é possível lançar qualquer tipo de token fungível, desde tokens sociais até tokens de DAO e GameFi. Além disso, é possível compor o Strata com qualquer coisa que use mecânicas de preço fixo para obter mecânicas de preço dinâmico, como a CandyMachine do Metaplex.

A documentação mais detalhada está disponível [aqui](docs.strataprotocol.com). Você também pode usar a interface gráfica de usuário (GUI) no [Strata Launchpad](app.strataprotocol.com).

## Como criar um token totalmente gerenciado

Um token totalmente gerenciado pelo Strata é um token em que a liquidez é gerenciada pelo protocolo. A vantagem é que você obtém imediatamente um token negociável, sem a necessidade de pools ou provedores de liquidez. Um token totalmente gerenciado é um token SPL normal com os metadados de um token do Metaplex e uma curva de vínculo associada (associated bonding curve). A curva de vínculo gerencia a liquidez, precificação e oferta desse token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como comprar e vender um token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como inicializar a liquidez

O Strata também pode vender tokens em que você deseja gerenciar manualmente o suprimento. Isso pode ser útil para inicializar a liquidez antes de listar seu token em uma DEX. Você pode ler mais sobre isso [aqui](https://docs.strataprotocol.com/marketplace/lbc) ou lançar seu próprio token no [Strata Launchpad](app.strataprotocol.com).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Outros recursos

- [Documentação do cliente Typescript](https://docs.strataprotocol.com) - Exemplos de código para criar e gerenciar tokens Strata na íntegra.
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - Lance um token usando a GUI.
