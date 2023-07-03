---
title: 质押
head:
  - - meta
    - name: title
      content: Solana秘籍 | 质押
  - - meta
    - name: og:title
      content: Solana秘籍 | 质押
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

# 质押



## 获取当前验证器

我们可以质押 SOL 并通过帮助保护网络来获得奖励。要进行质押，我们将 SOL 委托给验证器，而验证器则处理交易。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## 创建质押账户

所有的质押指令由[质押程序 (Stake Program)](https://docs.solana.com/developing/runtime-facilities/programs#stake-program) 处理。首先，我们创建一个[质押账户](https://docs.solana.com/staking/stake-accounts)， 该账户与标准[系统账户](accounts.md#create-a-system-account)创建和管理方式不同。特别是，我们需要设置账户的`Stake Authority`和`Withdrawal Authority`。

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

## 委托质押

一旦质押账户得到资金支持，`Stake Authority`可以将其委托给一个验证者。每个质押账户一次只能委托给一个验证者。此外，账户中的所有代币必须要么被委托，要么取消委托。一旦委托成功，质押账户需要经过几个时期才能变为活跃状态。

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

## 通过验证器获取委托人

多个账户可能已经质押给了特定的验证账户。为了获取所有的质押人，我们可以使用 `getProgramAccounts` 或 `getParsedProgramAccounts` API。请参考[指南部分](/guides/get-program-accounts.html) 获取更多信息。质押账户长度为200字节，选民公钥从第124字节开始。[参考资料](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)。

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

## 停用质押

在质押账户委托后的任何时候，`Stake Authority`可以选择停用该账户。停用过程可能需要多个时期才能完成，并且在提取任何 SOL 之前必须完成停用操作。

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

## 提取质押

一旦停用了，`Withdrawal Authority`可以将 SOL 提取回系统账户。一旦质押账户不再委托并且余额为 0 SOL，它将被销毁了。

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

## 获取质押金额

一旦我们使用多个质押账户质押多个代币，我们可以获取与我们的特定钱包相关的质押金额。为此，我们将使用`getProgramAccounts`或`getParsedProgramAccounts` API获取所有的质押账户。有关更多信息，请参考[指南部分](/guides/get-program-accounts.html)。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-stake-amount/get-stake-amount.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-stake-amount/get-stake-amount.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

