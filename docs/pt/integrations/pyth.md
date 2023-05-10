---
title: Pyth
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando o Pyth para obter dados na cadeia.
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando o Pyth para obter dados na cadeia.
  - - meta
    - name: description
      content: O Pyth é um oráculo usado para obter dados financeiros do mundo real na cadeia.
  - - meta
    - name: og:description
      content: O Pyth é um oráculo usado para obter dados financeiros do mundo real na cadeia.
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

# Pyth

O Pyth é um oráculo usado para obter dados financeiros e do mercado criptográfico do mundo real. O oráculo Pyth pode ser usado por programas na cadeia para consumir dados em uma variedade de casos de uso.

## Como usar o Pyth no Cliente

O Pyth fornece uma biblioteca JavaScript/TypeScript chamada **@pythnetwork/client**. Essa biblioteca pode ser usada para ler dados do Pyth na cadeia para aplicativos fora da cadeia, como exibir o preço do Pyth em um site. Saiba mais sobre isso [aqui](https://www.npmjs.com/package/@pythnetwork/client).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/pyth/client/client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/client/client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como usar o Pyth no Anchor

O Pyth fornece um crate do Rust que pode ser usado por programas na cadeia ou aplicativos fora da cadeia para consumir dados do Pyth.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/pyth/on-chain/on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/pyth/on-chain/on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Outros recursos

- [Bibliotecas de clientes](https://docs.pyth.network/consumers/client-libraries)
- [Exemplo de código em JS](https://github.dev/solana-labs/solana/tree/master/web3.js/examples)
- [Exemplo de código em Rust](https://github.com/project-serum/anchor/tree/master/tests/pyth)
- [Exemplo de código no Anchor](https://github.com/0xPratik/pyth-anchor-example)
