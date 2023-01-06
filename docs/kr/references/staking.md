---
title: Staking
head:
  - - meta
    - name: title
      content: Solana Cookbook | Staking
  - - meta
    - name: og:title
      content: Solana Cookbook | Staking
  - - meta
    - name: description
      content: stake SOL and earn rewards for helping secure the network.
  - - meta
    - name: og:description
      content: Stake SOL and earn rewards for helping secure the network. Learn more about Creating Stake Accounts, Delegate Stake, Withdraw Stake and more references for Building on Solana at The Solana cookbook.
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



## Get Current Validators

우리는 네트워크를 안정적으로 확보하는 것을 돕기 위해 SOL을 스테이킹할 수 있고 보성을 얻을 수 있습니다.
스테이킹을 위해서 우리는 차례로 transaction들을 처리하는 validator들에게 SOL을 위임해야 합니다.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Create Stake Account

모든 스테이킹 Instruction들은 [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program)에 의해 다뤄집니다.
시작하기 위해 우리는 [system account](accounts.md#create-a-system-account) 표준과는 다르게 생성되고 관리되는 [Stake Account](https://docs.solana.com/staking/stake-accounts)를 생성합니다. 특별하게, 우리는 Account의 `Stake Authority`와 `Withdrawal Authority`를 설정해야 합니다.

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

## Delegate Stake

일단 Stake Account에 자금이 적립된다면, `Stake Authority`가 validator에게 자금을 위임할 수 있습니다.
각 Stake Account는 오직 한 번에 한 validator에게만 위임될 수 있습니다.
추가로, 해당 Account에 있는 모든 Token들이 위임되거나 위임되지 않아야 합니다. 위임되고 나서 Stake Account가 활성화되기 위해서는 몇 에포크가 걸립니다.

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

## Get Delegator by Validators

다수의 Account들이 특정 Validator Account에 스테이킹 했을지 모릅니다. 우리는 모든 스테이커들을 조회하기 위해 `getProgramAccounts` 또는 `getParsedProgramAccounts` API를 사용할 것입니다. 더 많은 정보는 [guides section](/guides/get-program-accounts.html)를 참조하세요. Stake Account들은 200 bytes 길이 정도고 Voter Public Key는 124 bytes부터 입니다.
[Reference](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

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

## Deactivate Stake

Stake Account가 위임된 후에 언제든 `Stake Authority`가 그 Account를 비활성화시킬 수 있습니다. 비활성화는 완료되기까지 몇 에포크가 걸리고, SOL 출금 전에 비활성화가 먼저 요구됩니다.

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

## Withdraw Stake

비활성화되면 `Withdrawal Authority`가 SOL을 System Account로 출금할 수 있습니다. Stake Account가 더 이상 위임되지 않고 0 SOL balance를 갖는 다면, 이것은 효율적으로 파괴됩니다.

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
