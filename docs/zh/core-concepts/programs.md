---
title: 程序
head:
  - - meta
    - name: title
      content: Solana秘籍 | 程序
  - - meta
    - name: og:title
      content: Solana秘籍 | 程序
  - - meta
    - name: description
      content: 程序，也称为智能合约，是所有链上活动的基础。在Solana秘籍可以学习程序以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 程序，也称为智能合约，是所有链上活动的基础。在Solana秘籍可以学习程序以及其他一些核心概念。
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

# 程序

任何开发者都可以在Solana链上编写以及部署程序。Solana程序（在其他链上叫做智能合约），是所有链上活动的基础。
链上的一切活动，从去中心化金融（DeFi），到非同质化代币（NFT），再到社交媒体，链上游戏，都由Solana程序所驱动。

## 综述

::: tip 要点
- 程序可以处理来自用户和其他程序的[指令](./transactions)
- 所有的程序都是**无状态**的：所有的和程序交互的数据都是存储在独立的[账户](./accounts.md)中。执行时，这些账户借由指令传入程序
- 程序本身存储在标记为`executable`（可执行）的账户中。
- 任何程序的所有者都是[BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) and executed by the [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- 开发者通常使用Rust或C++来编写程序，也可以采用任何其他可以编译为[LLVM](https://llvm.org/)的[BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)后端的语言
- 所有的程序都有一个单独的入口点，指令的执行就是从这里开始的（亦即`process_instruction`）。参数须包括：
    - `program_id`: `pubkey` （公钥）
    - `accounts`: `array` （数组）
    - `instruction_data`: `byte array` （字节数组）
:::

## 深入

与其他链不同，Solana将代码与数据完全分开。
程序需要访问的全部数据都存储在独立的账户中，在指令中这些账户需要以引用的方式传入。
这种模式使得一个通用的程序可以在不同的账户上运行，而不用为此额外部署程序。
这种模式的例子很常见，包括了"原生程序"以及"SPL程序"等。

### 原生程序和Solana程序库（SPL）

Solana自带一系列程序，这些程序是链上交互的核心构成要素。
这些程序分为[原生程序](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)
和[Solana程序库（SPL程序）](https://spl.solana.com/)

原生程序提供了运行验证节点（validator）所需的功能。原生程序中最广为人知的是[System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program)。
这个程序负责管理建立新账户以及在两个账户之间转账SOL。

SPL程序定义了一系列的链上活动，其中包括针对代币的创建，交换，借贷，以及创建质押池，维护链上域名解析服务等。
[SPL Token Program（SPL代币程序）](https://spl.solana.com/token)可以直接在命令行调用，其他的一些，如
[Associated Token Account Program（关联代币账户程序）](https://spl.solana.com/associated-token-account)，
则常被用于编写其他定制程序。

### 编写程序

编写Solana程序常用的是Rust和C++，但是也可以使用其他可以编译为LLVM的BPF后端的语言。
最近[Neon Labs](https://neon-labs.org/)和[Solang](https://solang.readthedocs.io/en/latest/)发起了一个项目，
旨在建立Solana的[EVM](https://ethereum.org/en/developers/docs/evm/)兼容性，进而让开发者可以使用Solidity编写程序。

大部分Rust编写的程序遵循以下架构：

| 文件           | 描述                                   |
|----------------|-----------------------------------------------|
| lib.rs         | 注册模块                           |
| entrypoint.rs  | 程序的入口点                     |
| instruction.rs | 程序的API, 对指令的数据进行序列化与反序列化 |
| processor.rs   | 程序的业务逻辑                                 |
| state.rs       | 程序对象，对状态进行反序列化        |
| error.rs       | 程序中制定的错误                      |

最近，[Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)逐渐成为了一个广受欢迎的Solana程序开发框架。
Anchor是一个有态度的框架，与Ruby on Rails相似，这个框架旨在减少模式化的代码，将Rust开发流程中的序列化与反序列化过程流水线化。

在部署到Testnet（测试网）和Mainnet（主网）之前，程序在开发和测试阶段经常使用Localhost和Devnet（开发网）环境。
Solana支持以下的几个环境：

| 集群环境              | RPC连接URL                                                                 |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | 默认端口：8899（例如，http://localhost:8899，http://192.168.1.88:8899）      |

部署到一个环境之后，客户端就可以通过对应集群的[RPC连接](https://docs.solana.com/developing/clients/jsonrpc-api)与链上程序进行交互。

### 部署程序

开发者可以使用[命令行](https://docs.solana.com/cli/deploy-a-program)部署程序：

```bash
solana program deploy <PROGRAM_FILEPATH>
```

部署程序的时候，程序会被编译为包含BPF字节码的[ELF共享对象](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)，并上传到Solana集群上。
和Solana上其他的任何东西一样，程序储存在账户当中。唯一的特殊之处是，这些账户标记为`executable`（可执行），并且其所有者是"BPF Loader（BPF加载器）"。
这个账户的地址被称为`program_id`，在后面的一切交易当中，用于指代这个程序。

Solana支持多种BPF加载器，最新的是[Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111)。
BPF加载器负责管理程序账户，让客户端可以通过其`program_id`对程序进行访问。每个程序都只有一个入口点，这里对指令进行处理。这里的参数须包括：
- `program_id`: `pubkey`（公钥）
- `accounts`: `array`（数组）
- `instruction_data`: `byte array`（字节数组）

当程序被调用时，会在Solana运行库中被执行。

## 其他资料

- [官方文档](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL文档](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://hackmd.io/@ironaddicteddog/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)
