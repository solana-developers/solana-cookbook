---
title: 程序派生账户 (PDA)
head:
  - - meta
    - name: title
      content: Solana秘籍 | 程序派生账户
  - - meta
    - name: og:title
      content: Solana秘籍 | 程序派生账户
  - - meta
    - name: description
      content: 程序派生账户是为了让特定程序可以控制一些账户而设计出来的。在Solana秘籍可以学习程序派生账户以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 程序派生账户是为了让特定程序可以控制一些账户而设计出来的。在Solana秘籍可以学习程序派生账户以及其他一些核心概念。
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

# 程序派生账户（PDA）

程序派生账户（PDA）是为了让特定程序可以控制一些账户而设计出来的。使用PDA，程序可以通过编程方法为一些地址进行签名，而不一定用到私钥。
PDA是[Cross-Program Invocation（跨程序调用）](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)的基础，
这个功能让Solana的app可以跟其他app进行组合。

## 综述

::: tip 要点
- PDA是长度为32的字节串，看起来和公钥很像，但是并没有与之对应的私钥
- `findProgramAddress`可以针对一个programId（程序id）和seeds（种子）唯一确定的生成一个PDA。这里的seeds（种子）是一组指定的字节串
- 一个跳跃（一个字节）用于将候选PDA推离ed25519椭圆曲线
- 程序通过传入种子和跳跃参数，调用[invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)为PDA进行签名
- PDA只能被用来派生出这个地址的程序所签名
- 除了允许程序为不同的instruction签名之外，PDA还提供了一个像哈希表一样的接口，用于[建立账户索引](../guides/account-maps.md)
:::

# 深入

PDA是Solana程序开发的重要构成要素。有了PDA，程序可以为账户签名，同时保证没有外部用户能够产生针对同一个账户的有效签名。
除了为账户签名外，一些程序还可以修改自己派生出来的PDA里的数据。

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">图片来源：<a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### 生成PDA

为了更好的理解PDA的概念，可以认为PDA从技术角度讲并不是创建出来的，而是找到的。PDA由一组种子（例如字符串`"vote_account"`）以及程序id生成。
这组种子和程序id接下来会放到sha256哈希函数中执行一遍，检查他们产生的公钥是否落在ed25519椭圆曲线上。
 
在程序id和种子上运行哈希函数时，有大约50%的概率会得到在一个落在椭圆曲线上有效的公钥。这种情况下，我们需要向输入当中加点扰动，略微改变输入，再进行重试。
这个扰动的技术名称叫bump（跳跃）。在Solana中，我们一开始指定`bump = 255`，然后向下迭代bump，到254，253等等。知道我们能够找到一个不在椭圆曲线上的地址为止。
这个看起来简陋的办法可以让我们每次生成PDA的时候都能够得到唯一确定的结果。

![落在椭圆曲线上的PDA](./pda-curve.png)

### 与PDA交互

生成PDA的时候，`findProgramAddress`会把得到的地址和用来将PDA碰撞出椭圆曲线所用的bump都返回出来。
有了这个bump，程序就可以对任何需要这个PDA地址的指令进行签名。签名时，程序调用`invoke_signed`函数，传入指令，账户列表，以及用于生成PDA的种子和bump。
除了为指令签名之外，PDA在他自己通过`invoke_signed`函数被创建时，也需要签名。

在使用PDA编写程序时，经常会将这个bump[存储在这个账户本身的数据当中](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100)。
这种机制可以让开发者轻易的对PDA进行验证，而不用重新在指令参数当中传入这个值。

## Other Resources
- [官方文档](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
