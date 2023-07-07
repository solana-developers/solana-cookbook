---
title: 与代币互动
head:
  - - meta
    - name: title
      content: Solana秘籍 | 与代币互动
  - - meta
    - name: og:title
      content: Solana秘籍 | 与代币互动
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

# 代币

## 我需要什么才能开始使用SPL代币？

每当你在Solana上与代币进行交互时，实际上你正在与Solana程序库代币（SPL-Token）或SPL代币标准交互。SPL代币标准需要使用特定的库，你可以根据你使用的编程语言在下面找到相应的库。

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## 如何创建一个新的代币

创建代币是通过创建所谓的“铸币账户”来完成的。这个铸币账户随后用于向用户的代币账户铸造代币。

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

## 如何获得一个代币铸币账户

为了获得代币的当前供应量、授权信息或小数位数，你需要获取代币铸币账户的账户信息。

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

## 如何创建一个代币账户

用户需要一个代币账户来持有代币。

对于用户所拥有的每种类型的代币，他们将至少拥有一个代币账户。

关联代币账户(Associated Token Accounts, ATA) 是根据每个密钥对确定性地创建的账户。关联代币账户是管理代币账户的推荐方法。

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

## 如何获得一个代币账户

每个代币账户都包含有关代币的信息，例如所有者、铸币账户、数量（余额）和小数位数。

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

## 如何获得一个代币账户的余额

每个代币账户都包含有关代币的信息，例如所有者、铸币账户、数量（余额）和小数位数。

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

::: 贴士
一个代币账户只能持有一种铸币。当您指定一个代币账户时，您也需要指定一个铸币。
:::

## 如何铸造(mint)代币 

当你铸造代币时，你会增加供应量并将新代币转移到特定的代币账户。

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

## 如何转移代币

你可以将代币从一个代币账户转移到另一个代币账户。

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

## 如何销代币

如果你是代币的所有者，你可以销毁代币。


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

## 如何关闭代币账户 

如果你不再需要使用某个代币账户，你可以关闭它。有两种情况：

1. 包装的 SOL（Wrapped SOL）- 关闭操作会将包装的 SOL 转换为 SOL。
2. 其他代币（Other Tokens）- 只有当代币账户的余额为0时，你才能关闭它。


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

## 如何在代币账户或铸币账户上设置权限

你可以设置/更新权限。有四种类型：

1. MintTokens（铸币账户）：用于控制在铸币账户上铸造代币的权限。
2. FreezeAccount（铸币账户）：用于冻结或解冻铸币账户的权限。
3. AccountOwner（代币账户）：用于控制代币账户所有权的权限。
4. CloseAccount（代币账户）：用于关闭代币账户的权限。


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

## 如何批准代币委托

你可以设置一个委托代理，并指定一个允许的代币数量。设置后，委托代理就像代币账户的另一个所有者。一个代币账户在同一时间只能委托给一个账户。

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

## 如何撤销代币委托 

撤销操作将把代币委托设置为空，并将委托的代币数量设置为0。

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

## 如何管理包装的SOL 

包装的 SOL与其他代币铸币类似，区别在于使用 `syncNative` 并在 `NATIVE_MINT` 地址上专门创建代币账户。

### 创建代币账户

与 [创建代币账户](#create-token-account) 但将mint替换为`NATIVE_MINT`。

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### 增加余额

有两种方法可以增加包装的 SOL 的余额：

#### 1. 通过 SOL 转账方式

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

#### 2. 通过代币转账方式

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

## 如何通过所有者获取所有代币账户

你可以通过所有者获取代币账户。有两种方法可以实现。

1. 获取所有代币账户

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

2. 按照铸币进行过滤

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
