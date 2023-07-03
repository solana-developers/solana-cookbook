---
title: 交易
head:
  - - meta
    - name: title
      content: Solana祕籍 | 交易
  - - meta
    - name: og:title
      content: Solana祕籍 | 交易
  - - meta
    - name: description
      content: 交易是許多Solana操作單元打包到一起所組成的。在Solana祕籍可以學習交易以及其他一些核心概念。
  - - meta
    - name: og:description
      content: 交易是許多Solana操作單元打包到一起所組成的。在Solana祕籍可以學習交易以及其他一些核心概念。
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

客戶端可以通過向一個集羣提交交易來調用[程序](./programs.md)。一個交易可以包含多個指令，每個指令可以針對不同的程序。
交易提交時，Solana[運行庫](https://docs.solana.com/developing/programming-model/runtime)會自動的按順序處理這些指令。
如果某一個指令中的任何一個部分失敗，整個交易就會失敗。

## 概述

::: tip 要點
- 指令是Solana上最基本的操作單元
- 每個指令都包含：
    - `program_id`：所針對的程序的id
    - `accounts`：需要讀或寫的全部賬戶組成的數組
    - `instruction_data`：向指定程序所傳輸的數據的字節碼
- 多個指令可以被打包進入同一個交易當中
- 每個交易都包含：
    - `instructions`：一個或多個指令
    - `blockhash`：最新的塊哈希值
    - `signatures`：一個或多個簽名
- 指令會被自動的按順序執行
- 如果一個指令的任何一部分失敗，整個交易就會失敗
- 交易的大小限制在1232字節以內
:::

## 深入

在Solana運行庫中，指令和交易都需要先指定全部需要讀寫訪問的賬戶列表。
通過事先指定賬戶列表，運行庫可以對交易的執行做並行化處理。

當交易被提交到集羣時，運行庫會自動的按照順序處理這些指令。對於每個指令，接收這個指令的程序會解析指令中的數據字段，在指定的賬戶上進行操作。
程序要麼執行成功，要麼會返回一個錯誤碼。如果返回了一個錯誤碼，整個交易都會立即失敗。

任何交易，只要針對一個賬戶扣除SOL，或者修改其中的數據，都需要這個賬戶擁有者的簽名。
在交易中，會被修改的賬戶都會被標記爲`writable`（可寫）。
當交易的付費者支付了足夠的租金和交易費用時，一個賬戶可以被存入SOL而不用這個賬戶擁有者的許可。

提交之前，每個交易需要引用一個[recent blockhash（最新塊哈希）](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)。
塊哈希被用於去重，以及移除過期交易。一個塊哈希的最大壽命是150個區塊，成文時這個時間大約是1分鐘19秒。

### 費用
 
Solana網絡收取兩種費用：
- [交易費](https://docs.solana.com/transaction_fees)，用於向網絡廣播消息（亦即gas費）
- [租金](https://docs.solana.com/developing/programming-model/accounts#rent)，用於向區塊鏈上存儲數據

在Solana中，交易費是確定的。並沒有費率競價的概念，用戶無法通過增加交易費的方式增加自己的交易被打包進下一個區塊的概率。
在成文時，交易費只與交易所需的簽名數量相關（參見`lamports_per_signature`），與交易所使用的資源無關。
這是因爲目前所有交易都有一個嚴格的1232字節的限制。

每個交易都需要至少有一個`writable`（可寫）的賬戶，用於爲交易簽名。這個賬戶無論交易成功與否都需要爲交易成本付費。
如果付費者沒有足夠爲交易付費的餘額，這個交易就會被丟棄。

成文時，50%的交易費被出塊的驗證節點收取，剩下的50%被燃燒掉。這樣的結構會激勵驗證節點在leader schedule（領導時間表）規定的屬於自己的slot（插槽）中處理儘可能多的交易。

## 其他資料

- [官方文檔](https://docs.solana.com/developing/programming-model/transactions)
- [交易的結構](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
