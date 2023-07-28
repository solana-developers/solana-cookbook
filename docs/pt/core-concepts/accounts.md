---
title: Contas
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Contas
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Contas
  - - meta
    - name: description
      content: Contas são blocos de construção essenciais para o desenvolvimento na Solana. Aprenda sobre Contas e outros Conceitos Fundamentais no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Contas são blocos de construção essenciais para o desenvolvimento na Solana. Aprenda sobre Contas e outros Conceitos Fundamentais no Livro de Receitas da Solana.
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

# Contas

As contas do ecossistema Solana são usadas para armazenar estado. Elas são um bloco de construção essencial para o desenvolvimento na Solana.

## Fatos

::: tip Ficha Informativa

- As contas são usadas para armazenar dados
- Cada conta tem um endereço único
- As contas têm um tamanho máximo de 10 MB (10 Megabytes)
- As contas PDA (Program Derived Address, ou Endereço Derivado de Programa) têm um tamanho máximo de 10 KB (10 Kilobytes)
- As contas PDA podem ser usadas para assinar em nome de um programa
- O tamanho das contas é fixo no momento da criação, mas pode ser ajustado usando o [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- O armazenamento de dados da conta é pago com aluguel
- O proprietário padrão da conta é o Programa do Sistema (System Program)
  :::

## Mergulho Profundo

### Modelo de Conta

Existem 3 tipos de contas na Solana:

- Contas de dados armazenam dados
- Contas de programas armazenam programas executáveis
- Contas nativas que indicam programas nativos na Solana, como o System, Stake e Vote

Dentro das contas de dados, existem 2 tipos:

- Contas de propriedade do sistema
- Contas PDA

Cada conta possui um endereço (geralmente uma chave pública) e um proprietário (endereço de uma conta de programa). A lista completa de campos que uma conta armazena está abaixo.

| Campo      | Descrição                                    |
| ---------- | ---------------------------------------------- |
| lamports   | O número de lamports (unidade de medida de valor na rede Solana) possuídos por esta conta.   |
| owner      | O proprietário do programa desta conta              |
| executable | Se esta conta pode processar instruções  |
| data       | O array de bytes de dados brutos armazenados por esta conta |
| rent_epoch | A próxima época em que esta conta terá que pagar aluguel |

Existem algumas regras de propriedade importantes:

- Somente o proprietário de uma conta de dados pode modificar seus dados e debitar lamports
- Qualquer pessoa pode creditar lamports a uma conta de dados
- O proprietário de uma conta pode atribuir um novo proprietário se os dados da conta estiverem zerados

Contas de programa não armazenam estado.

Por exemplo, se você tiver um programa de contador que permita incrementar um contador, você deve criar duas contas, uma conta para armazenar o código do programa e outra para armazenar o contador.

![](./account_example.jpeg)

Para evitar que uma conta seja excluída, você deve pagar aluguel.

### Aluguel

A manutenção do armazenamento de dados em contas custa SOL e é pago pelo que é chamado de aluguel. Se você mantiver um saldo mínimo equivalente a 2 anos de pagamentos de aluguel em uma conta, sua conta ficará isenta de pagar aluguel. Você pode recuperar o aluguel fechando a conta e enviando os lamports de volta para sua carteira.

O aluguel é pago em dois momentos diferentes:

1. Quando referenciado por uma transação
2. Uma vez por época

Uma porcentagem do aluguel coletado pelas contas é destruída, enquanto o restante é distribuído para contas de voto no final de cada slot.

Se a conta não tiver o suficiente para pagar o aluguel, a conta será desalocada e os dados removidos.

Também é importante observar que novas contas devem adotar a isenção de aluguel.

## Outros Recursos

- [Modelo de Conta da Solana](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Documentação Oficial](https://docs.solana.com/developing/programming-model/accounts)
- [Thread do Twitter criado pelo Pencilflip](https://twitter.com/pencilflip/status/1452402100470644739)

### Créditos

Este conceito principal é creditado ao Pencilflip. [Siga ele no Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
