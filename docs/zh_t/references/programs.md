---
title: 編寫程序
head:
  - - meta
    - name: title
      content: Solana祕籍 | Solana程序資料
  - - meta
    - name: og:title
      content: Solana密集 | Solana程序資料
  - - meta
    - name: description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
  - - meta
    - name: og:description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
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

# 編寫程序

## 如何在程序中轉移 SOL 

你的Solana程序可以在不"調用"系統程序的情況下將lamports從一個賬戶轉移給另一個賬戶。基本規則是，你的程序可以將lamports從你的程序所擁有的任何賬戶轉移到任何賬戶。

接收方賬戶不一定要是你的程序所擁有的賬戶。

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## 如何在程序中獲取時鐘

獲取時鐘的方法有兩種：

1. 將`SYSVAR_CLOCK_PUBKEY`作爲指令的參數傳入。
2. 在指令內部直接訪問時鐘。

瞭解這兩種方法會對你有好處，因爲一些傳統的程序仍然將SYSVAR_CLOCK_PUBKEY作爲一個賬戶來使用。

### 在指令中將時鐘作爲一個賬戶傳遞

讓我們創建一個指令，該指令接收一個賬戶用於初始化，並接收 SYSVAR 的公鑰。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

現在，我們通過客戶端傳遞時鐘的 SYSVAR 公共地址:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### 在指令內部直接訪問時鐘

讓我們創建同樣的指令，但這次我們不需要從客戶端傳遞`SYSVAR_CLOCK_PUBKEY`。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

現在，客戶端只需要傳遞狀態和支付賬戶的指令:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何更改賬戶大小

你可以使用`realloc`函數來更改程序擁有的賬戶的大小。`realloc`函數可以將賬戶的大小調整到最大10KB。當你使用`realloc`增加賬戶的大小時，你需要轉移lamports以保持該賬戶的租金免除狀態。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 跨程序調用的方法

跨程序調用，簡單來說，就是在我們的程序中調用另一個程序的指令。一個很好的例子是`Uniswap`的`swap`功能。`UniswapV2Router`合約調用必要的邏輯進行交換，並調用`ERC20`合約的transfer函數將代幣從一個人轉移到另一個人。同樣的方式，我們可以調用程序的指令來實現多種目的。

讓我們來看看我們的第一個例子，即`SPL Token Program`的`transfer`指令。進行轉賬所需的賬戶包括：

1. 源代幣賬戶（我們持有代幣的賬戶）
2. 目標代幣賬戶（我們要將代幣轉移至的賬戶）
3. 源代幣賬戶的持有者（我們將爲其簽名的錢包地址）

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
相應的客戶端指令如下所示。有關了解鑄幣和代幣創建指令，請參考附近的完整代碼。
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

現在讓我們來看另一個例子，即`System Program`的`create_account`指令。這裏與上面提到的指令有一點不同。在上述例子中，我們不需要在`invoke`函數中將`token_program`作爲賬戶之一傳遞。然而，在某些情況下，您需要傳遞調用指令的`program_id`。在我們的例子中，它將是`System Program`的`program_id`（"11111111111111111111111111111111"）。所以現在所需的賬戶包括：

1.  負責支付租金的支付賬戶
2. 將要創建的賬戶
3. 系統程序（System Program）賬戶

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

對應的客戶端代碼如下所示：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何創建PDA

程序派生地址（Program Derived Address，PDA）是程序擁有的賬戶，但沒有私鑰。相反，它的簽名是通過一組種子和一個阻礙值（一個確保其不在曲線上的隨機數）獲取的。"生成"程序地址與"創建"它是不同的。可以使用`Pubkey::find_program_address`來生成PDA。創建PDA實質上意味着初始化該地址的空間並將其狀態設置爲初始狀態。普通的密鑰對賬戶可以在我們的程序之外創建，然後將其用於初始化PDA的狀態。不幸的是，對於PDA來說，它必須在鏈上創建，因爲它本身無法代表自己進行簽名。因此，我們使用`invoke_signed`來傳遞PDA的種子，以及資金賬戶的簽名，從而實現了PDA的賬戶創建。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

可以通過客戶端按如下方式發送所需的賬戶：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何讀取賬戶

在Solana中，幾乎所有的指令都至少需要2-3個賬戶，並且在指令處理程序中會說明它期望的賬戶順序。如果我們利用Rust中的`iter()`方法，而不是手動索引賬戶，那麼這將非常簡單。`next_account_info`方法基本上是對可迭代對象的第一個索引進行切片，並返回賬戶數組中存在的賬戶。讓我們看一個簡單的指令，它期望一堆賬戶並需要解析每個賬戶。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何驗證賬戶

由於Solana中的程序是無狀態的，作爲程序創建者，我們必須儘可能驗證傳遞的賬戶，以避免任何惡意賬戶的進入。可以進行的基本檢查包括：

1. 檢查預期的簽名賬戶是否已簽名。
2. 檢查預期的狀態賬戶是否已標記爲可寫。
3. 檢查預期的狀態賬戶的所有者是否爲調用程序的程序ID。
4. 如果首次初始化狀態，請檢查賬戶是否已經初始化。
5. 檢查是否按預期傳遞了任何跨程序的ID（在需要時）。

下面是一個基本的指令，它使用上述檢查初始化英雄狀態賬戶的示例：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何從一個交易中讀取多個指令 

Solana允許我們查看當前交易中的所有指令。我們可以將它們存儲在一個變量中，並對其進行迭代。我們可以利用這一點做許多事情，比如檢查可疑的交易。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
