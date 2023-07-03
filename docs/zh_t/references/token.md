---
title: 與代幣互動
head:
  - - meta
    - name: title
      content: Solana祕籍 | 與代幣互動
  - - meta
    - name: og:title
      content: Solana祕籍 | 與代幣互動
  - - meta
    - name: description
      content: Learn how to use, transfer, and more with tokens on Solana
  - - meta
    - name: og:description
      content: Learn how to use, transfer, and more with tokens on Solana
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

# 代幣

## 我需要什麼才能開始使用SPL代幣？

每當你在Solana上與代幣進行交互時，實際上你正在與Solana程序庫代幣（SPL-Token）或SPL代幣標準交互。SPL代幣標準需要使用特定的庫，你可以根據你使用的編程語言在下面找到相應的庫。

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## 如何創建一個新的代幣

創建代幣是通過創建所謂的“鑄幣賬戶”來完成的。這個鑄幣賬戶隨後用於向用戶的代幣賬戶鑄造代幣。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何獲得一個代幣鑄幣賬戶

爲了獲得代幣的當前供應量、授權信息或小數位數，你需要獲取代幣鑄幣賬戶的賬戶信息。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何創建一個代幣賬戶

用戶需要一個代幣賬戶來持有代幣。

對於用戶所擁有的每種類型的代幣，他們將至少擁有一個代幣賬戶。

關聯代幣賬戶(Associated Token Accounts, ATA) 是根據每個密鑰對確定性地創建的賬戶。關聯代幣賬戶是管理代幣賬戶的推薦方法。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何獲得一個代幣賬戶

每個代幣賬戶都包含有關代幣的信息，例如所有者、鑄幣賬戶、數量（餘額）和小數位數。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何獲得一個代幣賬戶的餘額

每個代幣賬戶都包含有關代幣的信息，例如所有者、鑄幣賬戶、數量（餘額）和小數位數。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
一個代幣賬戶只能持有一種鑄幣。當您指定一個代幣賬戶時，您也需要指定一個鑄幣。
:::

## 如何鑄造(mint)代幣 

當你鑄造代幣時，你會增加供應量並將新代幣轉移到特定的代幣賬戶。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何轉移代幣

你可以將代幣從一個代幣賬戶轉移到另一個代幣賬戶。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何銷代幣

如果你是代幣的所有者，你可以銷燬代幣。


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何關閉代幣賬戶 

如果你不再需要使用某個代幣賬戶，你可以關閉它。有兩種情況：

1. 包裝的 SOL（Wrapped SOL）- 關閉操作會將包裝的 SOL 轉換爲 SOL。
2. 其他代幣（Other Tokens）- 只有當代幣賬戶的餘額爲0時，你才能關閉它。


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何在代幣賬戶或鑄幣賬戶上設置權限

你可以設置/更新權限。有四種類型：

1. MintTokens（鑄幣賬戶）：用於控制在鑄幣賬戶上鑄造代幣的權限。
2. FreezeAccount（鑄幣賬戶）：用於凍結或解凍鑄幣賬戶的權限。
3. AccountOwner（代幣賬戶）：用於控制代幣賬戶所有權的權限。
4. CloseAccount（代幣賬戶）：用於關閉代幣賬戶的權限。


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何批准代幣委託

你可以設置一個委託代理，並指定一個允許的代幣數量。設置後，委託代理就像代幣賬戶的另一個所有者。一個代幣賬戶在同一時間只能委託給一個賬戶。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何撤銷代幣委託 

撤銷操作將把代幣委託設置爲空，並將委託的代幣數量設置爲0。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何管理包裝的SOL 

包裝的 SOL與其他代幣鑄幣類似，區別在於使用 `syncNative` 並在 `NATIVE_MINT` 地址上專門創建代幣賬戶。

### 創建代幣賬戶

與 [創建代幣賬戶](#create-token-account) 但將mint替換爲`NATIVE_MINT`。

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### 增加餘額

有兩種方法可以增加包裝的 SOL 的餘額：

#### 1. 通過 SOL 轉賬方式

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. 通過代幣轉賬方式

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## 如何通過所有者獲取所有代幣賬戶

你可以通過所有者獲取代幣賬戶。有兩種方法可以實現。

1. 獲取所有代幣賬戶

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. 按照鑄幣進行過濾

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
