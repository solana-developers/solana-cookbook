---
title: 交易
head:
  - - meta
    - name: title
      content: Solana秘籍 | 交易
  - - meta
    - name: og:title
      content: Solana秘籍 | 交易
  - - meta
    - name: description
      content: 交易是许多Solana操作单元打包到一起所组成的。在Solana秘籍可以学习交易以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 交易是许多Solana操作单元打包到一起所组成的。在Solana秘籍可以学习交易以及其他一些核心概念。
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

# 交易

客户端可以通过向一个集群提交交易来调用[程序](./programs.md)。一个交易可以包含多个指令，每个指令可以针对不同的程序。
交易提交时，Solana[运行库](https://docs.solana.com/developing/programming-model/runtime)会自动的按顺序处理这些指令。
如果某一个指令中的任何一个部分失败，整个交易就会失败。

## 概述

::: tip 要点
- 指令是Solana上最基本的操作单元
- 每个指令都包含：
    - `program_id`：所针对的程序的id
    - `accounts`：需要读或写的全部账户组成的数组
    - `instruction_data`：向指定程序所传输的数据的字节码
- 多个指令可以被打包进入同一个交易当中
- 每个交易都包含：
    - `instructions`：一个或多个指令
    - `blockhash`：最新的块哈希值
    - `signatures`：一个或多个签名
- 指令会被自动的按顺序执行
- 如果一个指令的任何一部分失败，整个交易就会失败
- 交易的大小限制在1232字节以内
:::

## 深入

在Solana运行库中，指令和交易都需要先指定全部需要读写访问的账户列表。
通过事先指定账户列表，运行库可以对交易的执行做并行化处理。

当交易被提交到集群时，运行库会自动的按照顺序处理这些指令。对于每个指令，接收这个指令的程序会解析指令中的数据字段，在指定的账户上进行操作。
程序要么执行成功，要么会返回一个错误码。如果返回了一个错误码，整个交易都会立即失败。

任何交易，只要针对一个账户扣除SOL，或者修改其中的数据，都需要这个账户拥有者的签名。
在交易中，会被修改的账户都会被标记为`writable`（可写）。
当交易的付费者支付了足够的租金和交易费用时，一个账户可以被存入SOL而不用这个账户拥有者的许可。

提交之前，每个交易需要引用一个[recent blockhash（最新块哈希）](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)。
块哈希被用于去重，以及移除过期交易。一个块哈希的最大寿命是150个区块，成文时这个时间大约是1分钟19秒。

### 费用
 
Solana网络收取两种费用：
- [交易费](https://docs.solana.com/transaction_fees)，用于向网络广播消息（亦即gas费）
- [租金](https://docs.solana.com/developing/programming-model/accounts#rent)，用于向区块链上存储数据

在Solana中，交易费是确定的。并没有费率竞价的概念，用户无法通过增加交易费的方式增加自己的交易被打包进下一个区块的概率。
在成文时，交易费只与交易所需的签名数量相关（参见`lamports_per_signature`），与交易所使用的资源无关。
这是因为目前所有交易都有一个严格的1232字节的限制。

每个交易都需要至少有一个`writable`（可写）的账户，用于为交易签名。这个账户无论交易成功与否都需要为交易成本付费。
如果付费者没有足够为交易付费的余额，这个交易就会被丢弃。

成文时，50%的交易费被出块的验证节点收取，剩下的50%被燃烧掉。这样的结构会激励验证节点在leader schedule（领导时间表）规定的属于自己的slot（插槽）中处理尽可能多的交易。

## Other Resources

- [官方文档](https://docs.solana.com/developing/programming-model/transactions)
- [交易的结构](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
