---
title: Sending Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sending Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Sending Transactions
  - - meta
    - name: description
      content: Learn Basic Transactions like Sending SOL, SPL-Tokens, Calculating Transaction Cost, and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Learn Basic Transactions like Sending SOL, SPL-Tokens, Calculating Transaction Cost, and more references for Building on Solana at The Solana cookbook.
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

# Sending Transactions

## How to send SOL


SOL을 보내기 위해서는 [SystemProgram][1] 과 소통할 필요가 있습니다.

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

## How to send SPL-Tokens

SPL Token을 전송하기 위해서 [Token Program][1] 을 사용하세요.
SPL Token을 보내기 위해 당신은 이 SPL Token의 Account Address를 알 필요가 있습니다.
당신은 아래 예제를 통해 Address를 얻을 수도 있고 Token들을 보낼 수도 있습니다.

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

## How to calculate transaction cost

Transaction이 요구하는 서명의 개수는 Transaction 비용을 계산하기 위해 사용됩니다.
당신이 Account를 생성하는 것이 아닌 이상 이것이 최종 Transaction 비용일 것입니다.
Account를 생성하기 위한 비용에 대한 자세한 내용은 [calculating rent exemption](accounts.md#calculating-rent-exemption)을 확인하세요.

아래의 두 가지 예제는 Transaction 비용을 계산하기 위해 현재 가능한 두 가지 방법을 보여줍니다.

첫 번째 예제는 `Transaction` 클래스에 새로운 메소드은 `getEstimatedFee`를 사용하고, 두 번째 예제는 `Connection` 클래스에 있는 `getFeeCaculatorForBlockhash`를 대신하는 `getFeeForMessage`를 사용합니다.

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

## How to add a memo to a transaction

어떤 Transaction은 [memo program][2]을 사용해서 메시지를 더할 수 있습니다. 
현재 **Memo Program**의 `programID`는 수동으로 추가되어야 합니다. `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

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

## How to change compute budget, fee, &amp; priority for a transaction
Transaction (TX) 우선순위는 기본요금에 우선순위 요금을 추가해 지불함으로써 얻어집니다.
기본적으로 Compute budget은 200,000 Compute Units (CU) 입니다. * 최대 1.4M CU를 가진 Instruction의 수.
기본요금은 5,000 Lamports 입니다. microLamport는 0.000001 Lamports입니다.

전체 Compute budget 또는 단일 TX를 위한 우선순위 요금은 ComputeBudgetProgram으로부터 추가된 Instruction들에 의해 바뀔 수 있습니다.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })`은 기본요금 (5,000 Lamports) 위에 우선순위 요금을 추가할 것입니다.
microLamports에서 제공된 값은 Lamports로 우선순위 요금을 결정짓기 위해 CU budget에 의해 곱해질 것입니다.
예를 들어, 만약 당신의 CU budget이 1M CU이고 1 microLamport/CU를 더한다면, 우선순위 요금은 1 Lamport (1M * 0.000001) 이 될 것입니다.
그러면 전체 요금은 5001 Lamports가 될 것입니다.

새로운 compute budget을 설정하기 위해서는 `ComputeBudgetProgram.setComputeUnitLimit({ units: number })` 사용하세요.
제공된 값은 기본 값을 대체할 것입니다. Transaction들은 처리량을 극대화하고 요금을 최소화하기 위해 실행을 위해 요구되는 최소 양의 CU를 요청해야 합니다.


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

Program Logs Example ( [Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
