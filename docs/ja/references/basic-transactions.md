---
title: トランザクションの送信
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

# トランザクションの送信

## SOLの送金方法

SOL を送信するには、[SystemProgram][1]と対話する必要があります。

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

## SPL-Tokenの送信方法

[Token Program][1]を利用し、SPL-Tokenを送信します。SPL-tokenを送信するには、そのSPL-Tokenのアカウントアドレスを知る必要があります。次の例では、アドレスの取得とトークンの送信の両方を行うことができます。

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

## トランザクションコストの計算方法

トランザクションに必要な署名の数は、トランザクションコストの計算に使用されますアカウントを作成していない限り、これが最終的な取引コストになります。アカウントを作成するための費用について詳しくは、 [calculating rent exemption](accounts.md#calculating-rent-exemption)をご覧ください。

以下の 2 つの例は、推定トランザクション コストを計算するために現在利用できる 2 つの方法を示しています。

最初の例では、 `Transaction`クラスの新しいメソッドである`getEstimatedFee`を使用しています。2番目の例では、`Connection` クラスの`getFeeCalculatorForBlockhash`を置き換える`getFeeForMessage`を使用しています。

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

## トランザクションへのメモの追加方法

[memo program][2]を利用して、どのトランザクションでもメッセージを追加できます。
現在、メモ プログラムの **Memo Program** `programID`は`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`を手動で追加する必要があります。

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

## トランザクションの計算予算、料金、および優先度を変更する方法
トランザクション (TX) の優先順位は、基本手数料に加えて優先手数料を支払うことによって達成されます。デフォルトでは、コンピューティング予算は 200,000 コンピューティング ユニット (CU) * 命令数の積であり、最大 1.4M CU です。基本料金は 5,000 lamportです。 microLamport は 0.000001 lamportです。

1つの TX の合計コンピューティング予算または優先順位付け料金は、ComputeBudgetProgram からの命令を追加することで変更できます。

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })` は、基本料金 (5,000 lamport) の上に優先料金を追加します。
microLamportsで提供される値にCU予算を掛けて、Lamports の優先料金を決定します。
たとえば、CU 予算が 100 万 CU で、1 つの microLamport/CU を追加する場合、優先料金は 1　lamport (1M * 0.000001) になります。合計料金は 5001 lamport になります。

`ComputeBudgetProgram.setComputeUnitLimit({ units: number })` 使用して、新しいコンピューティング予算を設定します。
指定された値は、デフォルト値を置き換えます。
トランザクションは、スループットを最大化する、または手数料を最小化するために、実行に必要な最小量の CU を要求する必要があります。

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

プログラムログの例 ( [Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
