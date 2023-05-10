---
title: Staking
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Staking
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Staking
  - - meta
    - name: description
      content: Faça o staking de SOL e ganhe recompensas por ajudar a garantir a segurança da rede. Saiba mais sobre como criar contas de stake, delegar stake, retirar stake e outras referências para construir na Solana no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Faça o staking de SOL e ganhe recompensas por ajudar a garantir a segurança da rede. Saiba mais sobre como criar contas de stake, delegar stake, retirar stake e outras referências para construir na Solana no Livro de Receitas da Solana.
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

# Staking

## Obter Validadores Atuais

Podemos fazer staking de SOL e ganhar recompensas por ajudar a proteger a rede. Para fazer staking, delegamos SOL a validadores que, por sua vez, processam transações.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Criar Conta de Stake

Todas as instruções de staking são tratadas pelo [Programa de Stake](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Para começar, criamos uma [Conta de Stake](https://docs.solana.com/staking/stake-accounts), que é criada e gerenciada de forma diferente de uma [conta de sistema](accounts.md#create-a-system-account) padrão. Em particular, devemos definir a autoridade de stake (`Stake Authority`) e a autoridade de saque (`Withdrawal Authority`) da conta.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Delegar Stake

Uma vez que uma conta de stake tenha fundos, a `Stake Authority` pode delegá-la a um validador. Cada conta de stake só pode ser delegada a um validador de cada vez. Além disso, todos os tokens na conta devem estar delegados ou não delegados. Depois de delegado, leva várias épocas para que uma conta de stake se torne ativa.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Obter Delegador pelos Validadores

Várias contas podem ter feito stake em uma conta de validador específica. Para buscar todos os stakers, usamos a API `getProgramAccounts` ou `getParsedProgramAccounts`. Consulte a [seção de guias](/guides/get-program-accounts.html) para mais informações. As contas de stake têm 200 bytes de comprimento e a PKv (Voter's Public Key) começa no byte 124. [Referência](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Desativar Stake

A qualquer momento após uma conta de stake ser delegada, a `Stake Authority` pode optar por desativar a conta. A desativação pode levar várias épocas para ser concluída e é necessária antes que qualquer SOL seja sacado.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Sacar Stake

Uma vez desativada, a `Withdrawal Authority` pode retirar o SOL de volta para uma conta de sistema. Depois que uma conta de stake não está mais delegada e tem um saldo de 0 SOL, ela é efetivamente destruída.

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
