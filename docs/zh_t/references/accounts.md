---
title: 賬戶
head:
  - - meta
    - name: title
      content: Solana祕籍 | 賬戶資料
  - - meta
    - name: og:title
      content: Solana祕籍 | 賬戶資料
  - - meta
    - name: description
      content: Learn more about accounts on Solana and how to use them in your programs.
  - - meta
    - name: og:description
      content: Learn more about accounts on Solana and how to use them in your programs.
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

# 賬戶

## 如何創建系統賬戶

創建一個由[系統程序][1] 擁有的賬戶。Solana運行時將授予賬戶的所有者對其數據的寫入權限或轉移Lamports的訪問權限。在創建賬戶時，我們需要預先分配一定大小的存儲空間（space）和足夠的Lamports來支付租金。 [租金（Rent）][2] 是在Solana上保持賬戶活躍所需支付的費用。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何計算賬戶費用

在Solana上保持賬戶活躍會產生一項存儲費用，稱爲 [租金/rent][2]。通過存入至少兩年租金的金額，你可以使賬戶完全免除租金收取。對於費用的計算，你需要考慮你打算在賬戶中存儲的數據量。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## 如何使用種子創建賬戶

你可以使用 `createAccountWithSeed` 方法來管理您的賬戶，而無需創建大量不同的密鑰對。

### 生成

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 創建

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 轉賬

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
只有由系統程序擁有的賬戶才能通過系統程序進行轉賬。
:::

## 如何創建PDA

[程序派生地址/Program derived address(PDA)][3] 與普通地址相比具有以下區別：

1. 不在ed25519曲線上
2. 使用程序進行簽名，而不是使用私鑰

**注意**: PDA賬戶只能在程序上創建，地址可以在客戶端創建。

::: 貼士
儘管PDA是由程序ID派生的，但這並不意味着PDA歸屬於相同的程序。（舉個例子，你可以將PDA初始化爲代幣賬戶，這是一個由代幣程序擁有的賬戶）
:::

### 生成一個PDA

`findProgramAddress`會在你的種子末尾添加一個額外的字節。它從255遞減到0，並返回第一個不在ed25519曲線上的公鑰。如果您傳入相同的程序ID和種子，您將始終獲得相同的結果。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 創建一個PDA

以下是一個創建由程序擁有的PDA賬戶的示例程序，以及一個使用客戶端調用該程序的示例。

#### 程序

下面是一個示例，展示了使用`system_instruction::create_account`創建一個具有預分配數據大小爲`space`、預支付`rent_lamports`數量的lamports的PDA賬戶的單條指令。該指令使用PDA進行簽名，並使用`invoke_signed`進行調用，與前面討論的類似。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 客戶端

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何使用PDA簽名

PDAs只能在程序內部進行簽名。以下是使用PDA進行簽名的程序示例，並使用客戶端調用該程序的示例。  

### 程序

以下示例展示了一個單個指令，用於從由種子`escrow`派生的 PDA 轉賬 SOL 到指定的賬戶。使用 `invoke_signed` 函數來使用 PDA 簽名。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 客户端

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何獲取程序賬戶

返回所有由程序擁有的賬戶。請參考 [指南部分](../guides/get-program-accounts.md) ，獲取有關`getProgramAccounts`及其配置的更多信息。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## 如何關閉賬戶

你可以通過移除賬戶中的所有 SOL（以擦除所有存儲數據的方式）來關閉一個賬戶。（你可以參考[rent][2]來了解更多信息。）

#### 程序


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 客户端

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何獲取賬戶餘額

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
如果你想獲取代幣餘額，你需要知道代幣賬戶的地址。如果像瞭解更多信息，請參考 [Token References](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
