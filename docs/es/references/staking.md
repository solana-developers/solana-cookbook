---
title: Staking
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Staking
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Staking
  - - meta
    - name: description
      content: Stake SOL y gana recompensas por ayudar a proteger la red.
  - - meta
    - name: og:description
      content: Stake SOL y gana recompensas por ayudar a proteger la red. Aprende más sobre Crear Cuentas Stake, Delegar Stake, Retirar Stake y más referencias para construir sobre Solana en El Libro de recetas de Solana
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

## Obtener los validadores actuales

Podemos hacer stake de SOL y ganar recompensas por ayudar a asegurar la red. Para hacer stake, delegamos SOL a validadores que a su vez procesan transacciones.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## ¿Crear una cuenta de stake?

Todas las instrucciones de staking son manejadas por el [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Para empezar, creamos una [Cuenta de Stake](https://docs.solana.com/staking/stake-accounts) que es creada y administrada de manera diferente que una [Cuenta del sistema](accounts.md#create-a-system-account). En particular, debemos establecer la `Autoridad de Stake` y la `Autoridad de retiro` de la cuenta.

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

Una vez que una cuenta de stake tiene fondos, la `Autoridad de stake` puede delegarla a un validador. Cada cuenta de participación solo se puede delegar a un validador a la vez. Además, todos los tokens de la cuenta deben ser delegados o no delegados. Una vez delegada, se necesitan varias épocas (epoch) para que una cuenta de participación se active.

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

## Obtener el delegador por los validadores

Es posible que varias cuentas hayan hecho stake a una cuenta de validador en particular. Para obtener todos los participantes, utilizaremos la API `getProgramAccounts` o `getParsedProgramAccounts`. Consulte la [sección de guías](/guides/get-program-accounts.html) para obtener más información. Las cuentas de participación tienen una longitud de 200 bytes y la clave pública del votante comienza en 124 bytes. [Referencia](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

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

## Desactivar Stake

En cualquier momento después de delegar una cuenta de Stake, la `Autoridad de Stake` puede optar por desactivar la cuenta. La desactivación puede tardar varias épocas en completarse y es necesaria antes de retirar cualquier SOL.

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

## Retirar Stake

Una vez desactivada, la `Autoridad de retiro` puede retirar SOL nuevamente a una cuenta del sistema. Una vez que una cuenta de participación ya no se delega y tiene un saldo de 0 SOL, se destruye de manera efectiva.

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
