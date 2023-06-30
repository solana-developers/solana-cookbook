---
title: 编写程序
head:
  - - meta
    - name: title
      content: Solana秘籍 | Solana程序资料
  - - meta
    - name: og:title
      content: Solana密集 | Solana程序资料
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

# 编写程序

## 如何在程序中转移 SOL 

你的Solana程序可以在不"调用"系统程序的情况下将lamports从一个账户转移给另一个账户。基本规则是，你的程序可以将lamports从你的程序所拥有的任何账户转移到任何账户。

接收方账户不一定要是你的程序所拥有的账户。

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## 如何在程序中获取时钟

获取时钟的方法有两种：

1. 将`SYSVAR_CLOCK_PUBKEY`作为指令的参数传入。
2. 在指令内部直接访问时钟。

了解这两种方法会对你有好处，因为一些传统的程序仍然将SYSVAR_CLOCK_PUBKEY作为一个账户来使用。

### 在指令中将时钟作为一个账户传递

让我们创建一个指令，该指令接收一个账户用于初始化，并接收 SYSVAR 的公钥。

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

现在，我们通过客户端传递时钟的 SYSVAR 公共地址:

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

### 在指令内部直接访问时钟

让我们创建同样的指令，但这次我们不需要从客户端传递`SYSVAR_CLOCK_PUBKEY`。

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

现在，客户端只需要传递状态和支付账户的指令:

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

## 如何更改账户大小

你可以使用`realloc`函数来更改程序拥有的账户的大小。`realloc`函数可以将账户的大小调整到最大10KB。当你使用`realloc`增加账户的大小时，你需要转移lamports以保持该账户的租金免除状态。

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

## 跨程序调用的方法

跨程序调用，简单来说，就是在我们的程序中调用另一个程序的指令。一个很好的例子是`Uniswap`的`swap`功能。`UniswapV2Router`合约调用必要的逻辑进行交换，并调用`ERC20`合约的transfer函数将代币从一个人转移到另一个人。同样的方式，我们可以调用程序的指令来实现多种目的。

让我们来看看我们的第一个例子，即`SPL Token Program`的`transfer`指令。进行转账所需的账户包括：

1. 源代币账户（我们持有代币的账户）
2. 目标代币账户（我们要将代币转移至的账户）
3. 源代币账户的持有者（我们将为其签名的钱包地址）

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
相应的客户端指令如下所示。有关了解铸币和代币创建指令，请参考附近的完整代码。
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

现在让我们来看另一个例子，即`System Program`的`create_account`指令。这里与上面提到的指令有一点不同。在上述例子中，我们不需要在`invoke`函数中将`token_program`作为账户之一传递。然而，在某些情况下，您需要传递调用指令的`program_id`。在我们的例子中，它将是`System Program`的`program_id`（"11111111111111111111111111111111"）。所以现在所需的账户包括：

1.  负责支付租金的支付账户
2. 将要创建的账户
3. 系统程序（System Program）账户

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

对应的客户端代码如下所示：

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

## 如何创建PDA

程序派生地址（Program Derived Address，PDA）是程序拥有的账户，但没有私钥。相反，它的签名是通过一组种子和一个阻碍值（一个确保其不在曲线上的随机数）获取的。"生成"程序地址与"创建"它是不同的。可以使用`Pubkey::find_program_address`来生成PDA。创建PDA实质上意味着初始化该地址的空间并将其状态设置为初始状态。普通的密钥对账户可以在我们的程序之外创建，然后将其用于初始化PDA的状态。不幸的是，对于PDA来说，它必须在链上创建，因为它本身无法代表自己进行签名。因此，我们使用`invoke_signed`来传递PDA的种子，以及资金账户的签名，从而实现了PDA的账户创建。

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

可以通过客户端按如下方式发送所需的账户：

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

## 如何读取账户

在Solana中，几乎所有的指令都至少需要2-3个账户，并且在指令处理程序中会说明它期望的账户顺序。如果我们利用Rust中的`iter()`方法，而不是手动索引账户，那么这将非常简单。`next_account_info`方法基本上是对可迭代对象的第一个索引进行切片，并返回账户数组中存在的账户。让我们看一个简单的指令，它期望一堆账户并需要解析每个账户。

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

## 如何验证账户

由于Solana中的程序是无状态的，作为程序创建者，我们必须尽可能验证传递的账户，以避免任何恶意账户的进入。可以进行的基本检查包括：

1. 检查预期的签名账户是否已签名。
2. 检查预期的状态账户是否已标记为可写。
3. 检查预期的状态账户的所有者是否为调用程序的程序ID。
4. 如果首次初始化状态，请检查账户是否已经初始化。
5. 检查是否按预期传递了任何跨程序的ID（在需要时）。

下面是一个基本的指令，它使用上述检查初始化英雄状态账户的示例：

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

## 如何从一个交易中读取多个指令 

Solana允许我们查看当前交易中的所有指令。我们可以将它们存储在一个变量中，并对其进行迭代。我们可以利用这一点做许多事情，比如检查可疑的交易。

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
