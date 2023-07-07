---
title: 質押
head:
  - - meta
    - name: title
      content: Solana祕籍 | 質押
  - - meta
    - name: og:title
      content: Solana祕籍 | 質押
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

# 質押



## 獲取當前驗證器

我們可以質押 SOL 並通過幫助保護網絡來獲得獎勵。要進行質押，我們將 SOL 委託給驗證器，而驗證器則處理交易。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## 創建質押賬戶

所有的質押指令由[質押程序 (Stake Program)](https://docs.solana.com/developing/runtime-facilities/programs#stake-program) 處理。首先，我們創建一個[質押賬戶](https://docs.solana.com/staking/stake-accounts)， 該賬戶與標準[系統賬戶](accounts.md#create-a-system-account)創建和管理方式不同。特別是，我們需要設置賬戶的`Stake Authority`和`Withdrawal Authority`。

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

## 委託質押

一旦質押賬戶得到資金支持，`Stake Authority`可以將其委託給一個驗證者。每個質押賬戶一次只能委託給一個驗證者。此外，賬戶中的所有代幣必須要麼被委託，要麼取消委託。一旦委託成功，質押賬戶需要經過幾個時期才能變爲活躍狀態。

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

## 通過驗證器獲取委託人

多個賬戶可能已經質押給了特定的驗證賬戶。爲了獲取所有的質押人，我們可以使用 `getProgramAccounts` 或 `getParsedProgramAccounts` API。請參考[指南部分](/guides/get-program-accounts.html) 獲取更多信息。質押賬戶長度爲200字節，選民公鑰從第124字節開始。[參考資料](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)。

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

## 停用質押

在質押賬戶委託後的任何時候，`Stake Authority`可以選擇停用該賬戶。停用過程可能需要多個時期才能完成，並且在提取任何 SOL 之前必須完成停用操作。

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

## 提取質押

一旦停用了，`Withdrawal Authority`可以將 SOL 提取回系統賬戶。一旦質押賬戶不再委託並且餘額爲 0 SOL，它將被銷燬了。

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

## 獲取質押金額

一旦我們使用多個質押賬戶質押多個代幣，我們可以獲取與我們的特定錢包相關的質押金額。爲此，我們將使用`getProgramAccounts`或`getParsedProgramAccounts` API獲取所有的質押賬戶。有關更多信息，請參考[指南部分](/guides/get-program-accounts.html)。

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

