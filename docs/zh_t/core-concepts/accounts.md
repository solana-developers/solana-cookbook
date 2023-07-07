---
title: 賬戶
head:
  - - meta
    - name: title
      content: Solana祕籍 | 賬戶
  - - meta
    - name: og:title
      content: Solana祕籍 | 賬戶
  - - meta
    - name: description
      content: 賬戶是Solana開發中非常重要的構成要素。在Solana祕籍可以學習賬戶以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 賬戶是Solana開發中非常重要的構成要素。在Solana祕籍可以學習賬戶以及其他一些核心概念。
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

在Solana中，賬戶是用來存儲狀態的。賬戶是Solana開發中非常重要的構成要素。

## 綜述

::: tip 要點
- 賬戶是用來存放數據的
- 每個賬戶都有一個獨一無二的地址
- 每個賬戶大小不能超過10MB
- 程序派生賬戶大小不能超過10KB
- 程序派生賬戶可以用其對應程序進行簽名
- 賬戶大小是靜態的
- 賬戶數據存儲需要付租金
- 默認的賬戶所有者是"系統程序"
:::

## 深入

### 賬戶模型

在Solana中有三類賬戶：

- 數據賬戶，用來存儲數據
- 程序賬戶，用來存儲可執行程序
- 原生賬戶，指Solana上的原生程序，例如"System"，"Stake"，以及"Vote"。

數據賬戶又分爲兩類：

- 系統所有賬戶
- 程序派生賬戶（PDA）

每個賬戶都有一個地址（一般情況下是一個公鑰）以及一個所有者（程序賬戶的地址）。
下面詳細列出一個賬戶存儲的完整字段列表。

| 字段      | 描述                                    |
|------------|------------------------------------------------|
| lamports   | 這個賬戶擁有的lamport（蘭波特）數量   |
| owner      | 這個賬戶的所有者程序              |
| executable | 這個賬戶成是否可以處理指令  |
| data       | 這個賬戶存儲的數據的字節碼 |
| rent_epoch | 下一個需要付租金的epoch（代） |

關於所有權，有幾條重要的規則：

- 只有賬戶的所有者才能改變賬戶中的數據，提取lamport
- 任何人都可以向數據賬戶中存入lamport
- 當賬戶中的數據被抹除之後，賬戶的所有者可以指定新的所有者

程序賬戶不儲存狀態。

例如，假設有一個計數程序，這個程序用來爲一個計數器加數，你需要創建兩個賬戶，一個用於存儲程序的代碼，
另一個用於存儲計數器本身。

![](./account_example.png)

爲了避免賬戶被刪除，必須付租金。

### 租金

在賬戶中存儲數據需要花費SOL來維持，這部分花費的SOL被稱作租金。如果你在一個賬戶中存入大於兩年租金的SOL，
這個賬戶就可以被豁免付租。租金可以通過關閉賬戶的方式來取回。lamport會被返還回你的錢包。

租金在這兩個不同的時間點被支取：

1. 被一個交易引用的時候
2. epoch更迭時

收取的租金，一定百分比會被銷燬，另一部分會在每個slot（插槽）結束時被分配給投票賬戶。

當一個賬戶沒有足夠的餘額支付租金時，這個賬戶會被釋放，數據會被清除。

## 其他資料

- [Solana賬戶模型](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [官方文檔](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip賬戶主題](https://twitter.com/pencilflip/status/1452402100470644739)

### 致謝

這些核心概念來源於Pencilflip. [在Twitter上關注他](https://twitter.com/intent/user?screen_name=pencilflip).