---
title: 版本化交易 (Versioned Transactions)
head:
  - - meta
    - name: title
      content: Solana祕籍| Versioned Transactions
  - - meta
    - name: og:title
      content: Solana祕籍| Versioned Transactions
  - - meta
    - name: description
      content: New and improved transaction format on Solana.
  - - meta
    - name: og:description
      content: New and improved transaction format on Solana.
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

# 版本化交易 (Versioned Transactions)

Solana最近發佈了版本化交易。提議的更改如下：

1. 引入一個新的程序，用於管理鏈上地址查找表。
    
2. 添加一種新的交易格式，可以利用鏈上地址查找表。

## 綜述

::: tip 事實表
-傳統交易存在一個主要問題：最大允許的大小爲1232字節，因此原子交易中可以容納的賬戶數量爲35個地址。
- 地址查找表（LUTs）：一旦賬戶存儲在該表中，可以使用1字節的u8索引，在交易消息中引用該表的地址。
- 可以使用`solana/web3.js`的`createLookupTable()`構建一個新的查找表，並確定其地址。
- 一旦創建了LUT，可以進行擴展，即可以將賬戶追加到表中。
- 版本化交易：需要修改傳統交易的結構以整合LUTs。
- 在引入版本化之前，交易在其頭部的第一個字節中保留了一個未使用的最高位，可以用來顯式聲明交易的版本。
:::

我們將更詳細地討論上述引入的更改以及它們對開發人員的意義。然而，爲了更好地理解這些更改，我們首先需要了解常規（或傳統）交易的結構。

## 傳統交易（Legacy Transactions）

Solana網絡使用最大事務單元（MTU）大小爲1280字節，遵循[IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) 的大小約束，以確保速度和可靠性。這樣留下了1232字節的數據空間，用於存儲序列化的交易等數據。

一個交易由以下組成：

1. 一個緊湊數組的簽名，其中每個簽名是一個64字節的[ed25519](https://ed25519.cr.yp.to/)簽名。
2. 一個（傳統的）消息。
    
![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Compact-Array format
 
A compact array is an array serialised to have the following components:
 
1. An array length in a multi-byte encoding called [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Followed by each array item  

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## 傳統消息

傳統消息包含以下組件：

1. 一個頭部（header）。
2. 一個緊湊數組的賬戶地址，每個賬戶地址佔用32字節。
3. 一個最近的區塊哈希（recent blockhash）：
   * 一個32字節的SHA-256哈希，用於指示上次觀察到的賬本狀態。如果一個區塊哈希太舊，驗證節點將拒絕它。
4. 一個緊湊數組的指令
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### 頭部

消息頭部是3字節長，包含3個u8整數：

1. 所需簽名數量：Solana運行時會將此數字與交易中緊湊數組簽名的長度進行驗證。
2. 需要簽名的只讀賬戶地址數量。
3. 不需要簽名的只讀賬戶地址數量。
    
![Message Header](./versioned-transactions/message_header.png)

### 緊湊賬戶地址數組

這個緊湊數組以緊湊的u16編碼的賬戶地址數量開始，然後是：

1. **需要簽名的賬戶地址**：首先列出請求讀取和寫入訪問權限的地址，然後是請求只讀訪問權限的地址。
2. **不需要簽名的賬戶地址**：與上述相同，首先列出請求讀取和寫入訪問權限的地址，然後是請求只讀訪問權限的地址。
   
![Compact array of account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### 緊湊指令數組

就像賬戶地址數組一樣，這個緊湊指令數組以緊湊的u16編碼的指令數量開始，然後是一個指令數組。數組中的每個指令具有以下組件：

1. **程序ID**：用於標識將處理該指令的鏈上程序。它表示爲消息中賬戶地址緊湊數組的地址的u8索引。
2. **賬戶地址索引的緊湊數組**：指向緊湊賬戶地址數組中需要簽名的一部分賬戶地址的u8索引。
3. **不透明的u8數據的緊湊數組**：一個通用的字節數組，與前面提到的程序ID相關。該數據數組指定了程序應執行的任何操作以及賬戶可能不包含的任何附加信息。
    
![Compact array of Instructions](./versioned-transactions/compact_array_of_ixs.png)

## 傳統交易的問題

上述交易模型存在的問題是什麼?

交易的最大大小以及因此能夠在單個原子交易中容納的賬戶數量。

如前所述，交易的最大允許大小爲1232字節。一個賬戶地址的大小爲32字節。因此，考慮到一些用於頭部、簽名和其他元數據的空間，一個交易最多隻能存儲35個賬戶。

![Issue with legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

這是一個問題，因爲有幾種情況下，開發人員需要在單個交易中包含數百個無需簽名的賬戶。但是，傳統交易模型目前無法實現這一點。目前使用的解決方案是在鏈上臨時存儲狀態，並在稍後的交易中使用。但是，當多個程序需要組合在單個交易中時，這種解決方法就不適用了。每個程序都需要多個賬戶作爲輸入，因此我們陷入了與之前相同的問題。

這就是引入**地址查找表（Address Lookup Tables，LUT）**的原因。

## 地址查找表(Address Lookeup Tables)

地址查找表的理念是在鏈上使用表格（數組）的數據結構存儲賬戶地址。一旦賬戶存儲在該表中，可以在交易消息中引用該表的地址。爲了指向表中的單個賬戶，需要使用一個字節的u8索引。

![LUTs](./versioned-transactions/luts.png)


這樣做可以節省空間，因爲地址不再需要存儲在交易消息中。它們只需要以數組形式的表格中的索引進行引用。這使得有可能引用256個賬戶，因爲賬戶使用u8索引進行引用。

當初始化地址查找表或向表中添加新地址時，需要使地址查找表免除租金。地址可以通過鏈上緩衝區或直接通過`Extension`指令將其追加到表格中。此外，地址查找表還可以存儲相關的元數據，後面是一個緊湊數組的賬戶。下面是一個典型地址查找表的結構：

![LUT Format](./versioned-transactions/lut_format.png)

地址查找表的一個重要缺點是，在交易處理過程中，由於地址查找需要額外的開銷，通常會導致交易的成本較高。

## 版本化交易： TransactionV0

傳統交易的結構需要修改以包含地址表查找。這些更改不應破壞Solana上的交易處理，也不應對被調用的程序的格式產生任何更改。

爲了確保上述情況，重要的是明確指出交易類型：`legacy`（傳統）或`versioned`（版本化）。我們如何在交易中包含這些信息呢？

在引入版本化之前，交易在其消息頭部的`num_required_signatures`字段的第一個字節中留下了一個未使用的上位比特。現在，我們可以使用這個比特位來明確聲明我們的交易版本。

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

如果設置了第一個比特位，那麼第一個字節中的剩餘比特將用於編碼版本號。Solana從“版本0”開始，這是開始使用地址查找表的版本。

如果未設置第一個比特位，那麼該交易將被視爲“傳統交易”，並且第一個字節的剩餘部分將被視爲編碼傳統消息的第一個字節。

## MessageV0

新的MessageV0的結構基本上是相同的，只是有兩個小但重要的變化：

1. **消息頭部**：與傳統版本相同，沒有變化。
2. **緊湊賬戶密鑰數組**：與傳統版本相同，沒有變化。我們將指向該數組元素的索引數組表示爲*索引數組A*（您很快將看到爲什麼我們這樣表示）。
3. **最近的區塊哈希**：與傳統版本相同，沒有變化。
4. **緊湊指令數組**：與傳統版本不同，發生了變化。
5. **地址表查找的緊湊數組**：在版本0中引入。
    
![Message v0](./versioned-transactions/messagev0.png)

在查看指令數組中的變化之前，我們首先討論地址表查找的緊湊數組的結構。

### 地址表查找的緊湊數組

這個結構將地址查找表（LUT）引入到版本化交易中，從而使得在單個交易中加載更多的只讀和可寫賬戶成爲可能。

緊湊數組以緊湊的u16編碼表示地址表查找的數量，後跟一個地址表查找的數組。每個查找的結構如下：

1. **賬戶密鑰**：地址查找表的賬戶密鑰。
2. **可寫索引**：用於加載可寫賬戶地址的緊湊索引數組。我們將此數組表示爲*索引數組B*。
3. **只讀索引**：用於加載只讀賬戶地址的緊湊索引數組。我們將此數組表示爲*索引數組C*。
   
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

現在讓我們看看指令緊湊數組中做了哪些改變。

### 緊湊指令數組

如前所述，傳統指令的緊湊數組存儲了各個傳統指令，而這些指令又分別存儲了以下內容：

1. 程序ID索引
2. 賬戶地址索引的緊湊數組
3. 不透明的8位數據的緊湊數組
    
新指令中的變化不在於指令本身的結構，而是在於用於獲取第1和第2項索引的數組。在傳統交易中，使用了索引數組A的子集，而在版本化交易中，則使用了以下組合數組的子集：

1. **索引數組A**：存儲在消息中的緊湊賬戶數組。
2. **索引數組B**：地址表查找中的可寫索引。
3. **索引數組C**：地址表查找中的只讀索引。
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## RPC變更

事務響應將需要一個新的版本字段：`maxSupportedTransactionVersion`，以向客戶端指示需要遵循的事務結構以進行反序列化。

以下方法需要進行更新以避免錯誤：

* `getTransaction`
* `getBlock`

請求中需要添加以下參數：

`maxSupportedTransactionVersion: 0`

如果請求中沒有顯式添加`maxSupportedTransactionVersion`，事務版本將回退到`legacy`。任何包含版本化事務的區塊，在存在傳統事務的情況下將返回客戶端錯誤。

你可以通過向RPC端點發送JSON格式的請求來設置如下：

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

你還可以使用 [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) 庫執行相同操作。

```js
// connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## 其他資料
* [如何構建一個版本化事務](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [如何使用地址查找表（LUTs）構建版本化事務](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [版本化交易的限制](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [版本化交易的安全性問題](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [版本化交易的替代性解決方案](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## 參考資料
* [Transactions-V2 Proposal](https://beta.docs.solana.com/proposals/transactions-v2)
* [使用版本化交易來開發](https://beta.docs.solana.com/developing/versioned-transactions)