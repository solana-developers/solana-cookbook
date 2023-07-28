---
title: Transações
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transações são pacotes de múltiplas unidades operacionais na Solana. Saiba mais sobre Transações e Conceitos Fundamentais no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Transações são pacotes de múltiplas unidades operacionais na Solana. Saiba mais sobre Transações e Conceitos Fundamentais no Livro de Receitas da Solana.
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

# Transações

Os clientes podem invocar [programas](./programs.md) enviando uma transação para um cluster. Uma única transação pode incluir várias instruções, cada uma visando seu próprio programa. Quando uma transação é enviada, o [Tempo de Execução (Runtime)](https://docs.solana.com/developing/programming-model/runtime) da Solana processará suas instruções em ordem e atomicamente. Se qualquer parte de uma instrução falhar, toda a transação falhará.

## Fatos

::: tip Ficha Informativa
- As instruções são as unidades operacionais mais básicas na Solana
- Cada instrução contém:
    - O identificador do programa (`program_id`) desejado
    - Uma lista de todas as contas (`accounts`) que pretende ler ou escrever
    - Um array de bytes com os dados da instrução (`instruction_data`), específico para o programa desejado
- Múltiplas instruções podem ser agrupadas em uma única transação
- Cada transação contém:
    - Uma lista de todas as contas (`accounts`) que pretende ler ou escrever
    - Uma ou mais instruções (`instructions`)
    - Um hash recente de bloco (`blockhash`)
    - Uma ou mais assinaturas (`signatures`)
- As instruções são processadas de forma ordenada e atômica
- Se qualquer parte de uma instrução falhar, a transação inteira falha
- As transações são limitadas a 1232 bytes
:::

## Mergulho Profundo

O tempo de execução da Solana exige que tanto as instruções quanto as transações especifiquem uma lista de todas as contas que pretendem ler ou escrever. Ao exigir essas contas com antecedência, o tempo de execução é capaz de executar em paralelo todas as transações.

Quando uma transação é enviada para um cluster, o tempo de execução processa suas instruções em ordem e atomicamente. Para cada instrução, o programa receptor interpretará seu array de dados e operará em suas contas especificadas. O programa retornará com sucesso ou com um código de erro. Se ocorrer um erro, a transação inteira falhará imediatamente.

Qualquer transação que tenha como objetivo debitar uma conta ou modificar seus dados requer a assinatura do titular da conta. Qualquer conta que será modificada é marcada como `writable` (gravável). Uma conta pode ser creditada sem a permissão do titular, desde que o pagador da taxa de transação cubra o aluguel e as taxas de transação necessárias.

Antes da submissão, todas as transações devem referenciar um [hash de bloco recente](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). O hash de bloco é usado para evitar duplicidades e eliminar transações obsoletas. A idade máxima do hash de bloco de uma transação é de 150 blocos, ou cerca de ~1 minuto e 19 segundos a partir do momento em que esta mensagem está sendo escrita.

### Taxas

A rede Solana recolhe dois tipos de taxas:
- [Taxas de Transação](https://docs.solana.com/transaction_fees) para a propagação de transações (ou seja, "taxas de gás")
- [Taxas de Aluguel](https://docs.solana.com/developing/programming-model/accounts#rent) para o armazenamento de dados na cadeia

Na Solana, as taxas de transação são determinísticas: não há conceito de mercado de taxas em que os usuários possam pagar taxas mais altas para aumentar suas chances de serem incluídos no próximo bloco. No momento em que este texto foi escrito, as taxas de transação são determinadas apenas pelo número de assinaturas necessárias (ou seja, `lamports_per_signature`), não pelo uso de recursos. Isso ocorre porque atualmente há um limite rígido de 1232 bytes em todas as transações.

Todas as transações requerem pelo menos uma conta gravável (`writable`) para assinar a transação. Uma vez enviada, a conta de signatário gravável que é serializada primeiro será a pagadora da taxa. Esta conta pagará o custo da transação, independentemente de a transação ter sucesso ou falhar. Se o pagador da taxa não tiver um saldo suficiente para pagar a taxa de transação, a transação será descartada.

No momento em que este texto foi escrito, 50% de todas as taxas de transação são coletadas pelo validador que produz o bloco, enquanto os 50% restantes são queimados. Essa estrutura funciona para incentivar os validadores a processar o maior número possível de transações durante seus slots no cronograma do líder.

## Outros Recursos

- [Documentação Oficial](https://docs.solana.com/developing/programming-model/transactions)
- [Estrutura da Transação](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees (Taxas de transação), por Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana (Uma introdução à Solana), por Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing (Processamento da transação), por Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth (Transação da Solana em profundidade), por Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
