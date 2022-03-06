---
title: 账户
head:
  - - meta
    - name: title
      content: Solana秘籍 | 账户
  - - meta
    - name: og:title
      content: Solana秘籍 | 账户
  - - meta
    - name: description
      content: 账户是Solana开发中非常重要的构成要素。在Solana秘籍可以学习账户以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 账户是Solana开发中非常重要的构成要素。在Solana秘籍可以学习账户以及其他一些核心概念。
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

# 账户

在Solana中，账户是用来存储状态的。账户是Solana开发中非常重要的构成要素。

## 综述

::: tip 要点
- 账户是用来存放数据的
- 每个账户都有一个独一无二的地址
- 每个账户大小不能超过10MB
- 程序派生账户大小不能超过10KB
- 程序派生账户可以用其对应程序进行签名
- 账户大小是静态的
- 账户数据存储需要付租金
- 默认的账户所有者是"系统程序"
:::

## 深入

### 账户模型

在Solana中有三类账户：

- 数据账户，用来存储数据
- 程序账户，用来存储可执行程序
- 原生账户，指Solana上的原生程序，例如"System"，"Stake"，以及"Vote"。

数据账户又分为两类：

- 系统所有账户
- 程序派生账户（PDA）

每个账户都有一个地址（一般情况下是一个公钥）以及一个所有者（程序账户的地址）。
下面详细列出一个账户存储的完整字段列表。

| 字段      | 描述                                    |
|------------|------------------------------------------------|
| lamports   | 这个账户拥有的lamport（兰波特）数量   |
| owner      | 这个账户的所有者程序              |
| executable | 这个账户成是否可以处理指令  |
| data       | 这个账户存储的数据的字节码 |
| rent_epoch | 下一个需要付租金的epoch（代） |

关于所有权，有几条重要的规则：

- 只有账户的所有者才能改变账户中的数据，提取lamport
- 任何人都可以向数据账户中存入lamport
- 当账户中的数据被抹除之后，账户的所有者可以指定新的所有者

程序账户不储存状态。

例如，假设有一个计数程序，这个程序用来为一个计数器加数，你需要创建两个账户，一个用于存储程序的代码，
另一个用于存储计数器本身。

![](./account_example.png)

为了避免账户被删除，必须付租金。

### 租金

在账户中存储数据需要花费SOL来维持，这部分花费的SOL被称作租金。如果你在一个账户中存入大于两年租金的SOL，
这个账户就可以被豁免付租。租金可以通过关闭账户的方式来取回。lamport会被返还回你的钱包。

租金在这两个不同的时间点被支取：

1. 被一个交易引用的时候
2. epoch更迭时

收取的租金，一定百分比会被销毁，另一部分会在每个slot（插槽）结束时被分配给投票账户。

当一个账户没有足够的余额支付租金时，这个账户会被释放，数据会被清除。

## 其他资料

- [Solana账户模型](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [官方文档](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip账户主题](https://twitter.com/pencilflip/status/1452402100470644739)

### 致谢

这些核心概念来源于Pencilflip. [在Twitter上关注他](https://twitter.com/intent/user?screen_name=pencilflip).