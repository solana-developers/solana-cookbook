---
title: Enviando Transações
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Enviando Transações
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Enviando Transações
  - - meta
    - name: description
      content: No Livro de Receitas da Solana, aprenda sobre transações básicas, como envio de SOL, Tokens SPL, cálculo de custo de transação e outras referências para construir na Solana.
  - - meta
    - name: og:description
      content: No Livro de Receitas da Solana, aprenda sobre transações básicas, como envio de SOL, Tokens SPL, cálculo de custo de transação e outras referências para construir na Solana.
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

# Enviando Transações

## Como enviar SOL

Para enviar SOL, você precisará interagir com o [SystemProgram][1].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## Como enviar Tokens SPL

Use o [Programa de Tokens][1] para transferir tokens SPL. Para enviar um token SPL, você precisa saber o endereço da conta do token SPL. Você pode obter o endereço e enviar tokens como no exemplo a seguir.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## Como calcular o custo da transação

O número de assinaturas que uma transação requer é usado para calcular o custo da transação. Contanto que você não esteja criando uma conta, este será o custo final da transação. Para saber mais sobre os custos para criar uma conta, confira o [cálculo da isenção de aluguel](accounts.md#calculating-rent-exemption).

Os dois exemplos abaixo mostram as duas maneiras atualmente disponíveis de calcular o custo estimado da transação.

O primeiro exemplo usa o `getEstimatedFee`, que é um novo método na classe `Transaction`, enquanto o segundo exemplo usa o `getFeeForMessage`, que substitui o `getFeeCalculatorForBlockhash` na classe `Connection`.

### getEstimatedFee
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como adicionar uma observação em uma transação

Uma mensagem pode ser adicionada a qualquer transação usando um programa de mensagens chamado [Programa Memo][2]. Atualmente, o `programID` do **Programa Memo** tem que ser adicionado manualmente - `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como alterar o orçamento de computação, taxa e prioridade para uma transação

A prioridade da transação é alcançada pagando uma taxa de priorização além da taxa base. Por padrão, o orçamento de computação é o produto de 200.000 unidades de computação (UC) * número de instruções, com um máximo de 1,4M UC. A taxa base é de 5.000 Lamports. Um microLamport é igual a 0,000001 Lamports.

O orçamento total de computação ou a taxa de priorização para uma única transação podem ser alterados adicionando instruções do `ComputeBudgetProgram`.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })` irá adicionar uma taxa de priorização acima da taxa base (5.000 Lamports). O valor fornecido em microLamports será multiplicado pelo orçamento de UC para determinar a taxa de priorização em Lamports. Por exemplo, se o seu orçamento de UC for de 1M UC e você adicionar 1 microLamport/UC, a taxa de priorização será de 1 Lamport (1M * 0,000001). A taxa total será então de 5001 Lamports.

Use `ComputeBudgetProgram.setComputeUnitLimit({ units: number })` para definir o novo orçamento de computação. O valor fornecido substituirá o valor padrão. As transações devem solicitar a quantidade mínima de UC necessária para a execução a fim de maximizar o throughput ou minimizar as taxas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Exemplo de registros de programas ( [Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
