---
title: 版本化交易 (Versioned Transactions)
head:
  - - meta
    - name: title
      content: Solana秘籍| Versioned Transactions
  - - meta
    - name: og:title
      content: Solana秘籍| Versioned Transactions
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

Solana最近发布了版本化交易。提议的更改如下：

1. 引入一个新的程序，用于管理链上地址查找表。
    
2. 添加一种新的交易格式，可以利用链上地址查找表。

## 综述

::: tip 事实表
-传统交易存在一个主要问题：最大允许的大小为1232字节，因此原子交易中可以容纳的账户数量为35个地址。
- 地址查找表（LUTs）：一旦账户存储在该表中，可以使用1字节的u8索引，在交易消息中引用该表的地址。
- 可以使用`solana/web3.js`的`createLookupTable()`构建一个新的查找表，并确定其地址。
- 一旦创建了LUT，可以进行扩展，即可以将账户追加到表中。
- 版本化交易：需要修改传统交易的结构以整合LUTs。
- 在引入版本化之前，交易在其头部的第一个字节中保留了一个未使用的最高位，可以用来显式声明交易的版本。
:::

我们将更详细地讨论上述引入的更改以及它们对开发人员的意义。然而，为了更好地理解这些更改，我们首先需要了解常规（或传统）交易的结构。

## 传统交易（Legacy Transactions）

Solana网络使用最大事务单元（MTU）大小为1280字节，遵循[IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) 的大小约束，以确保速度和可靠性。这样留下了1232字节的数据空间，用于存储序列化的交易等数据。

一个交易由以下组成：

1. 一个紧凑数组的签名，其中每个签名是一个64字节的[ed25519](https://ed25519.cr.yp.to/)签名。
2. 一个（传统的）消息。
    
![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Compact-Array format
 
A compact array is an array serialised to have the following components:
 
1. An array length in a multi-byte encoding called [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Followed by each array item  

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## 传统消息

传统消息包含以下组件：

1. 一个头部（header）。
2. 一个紧凑数组的账户地址，每个账户地址占用32字节。
3. 一个最近的区块哈希（recent blockhash）：
   * 一个32字节的SHA-256哈希，用于指示上次观察到的账本状态。如果一个区块哈希太旧，验证节点将拒绝它。
4. 一个紧凑数组的指令
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### 头部

消息头部是3字节长，包含3个u8整数：

1. 所需签名数量：Solana运行时会将此数字与交易中紧凑数组签名的长度进行验证。
2. 需要签名的只读账户地址数量。
3. 不需要签名的只读账户地址数量。
    
![Message Header](./versioned-transactions/message_header.png)

### 紧凑账户地址数组

这个紧凑数组以紧凑的u16编码的账户地址数量开始，然后是：

1. **需要签名的账户地址**：首先列出请求读取和写入访问权限的地址，然后是请求只读访问权限的地址。
2. **不需要签名的账户地址**：与上述相同，首先列出请求读取和写入访问权限的地址，然后是请求只读访问权限的地址。
   
![Compact array of account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### 紧凑指令数组

就像账户地址数组一样，这个紧凑指令数组以紧凑的u16编码的指令数量开始，然后是一个指令数组。数组中的每个指令具有以下组件：

1. **程序ID**：用于标识将处理该指令的链上程序。它表示为消息中账户地址紧凑数组的地址的u8索引。
2. **账户地址索引的紧凑数组**：指向紧凑账户地址数组中需要签名的一部分账户地址的u8索引。
3. **不透明的u8数据的紧凑数组**：一个通用的字节数组，与前面提到的程序ID相关。该数据数组指定了程序应执行的任何操作以及账户可能不包含的任何附加信息。
    
![Compact array of Instructions](./versioned-transactions/compact_array_of_ixs.png)

## 传统交易的问题

上述交易模型存在的问题是什么?

交易的最大大小以及因此能够在单个原子交易中容纳的账户数量。

如前所述，交易的最大允许大小为1232字节。一个账户地址的大小为32字节。因此，考虑到一些用于头部、签名和其他元数据的空间，一个交易最多只能存储35个账户。

![Issue with legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

这是一个问题，因为有几种情况下，开发人员需要在单个交易中包含数百个无需签名的账户。但是，传统交易模型目前无法实现这一点。目前使用的解决方案是在链上临时存储状态，并在稍后的交易中使用。但是，当多个程序需要组合在单个交易中时，这种解决方法就不适用了。每个程序都需要多个账户作为输入，因此我们陷入了与之前相同的问题。

这就是引入**地址查找表（Address Lookup Tables，LUT）**的原因。

## 地址查找表(Address Lookeup Tables)

地址查找表的理念是在链上使用表格（数组）的数据结构存储账户地址。一旦账户存储在该表中，可以在交易消息中引用该表的地址。为了指向表中的单个账户，需要使用一个字节的u8索引。

![LUTs](./versioned-transactions/luts.png)


这样做可以节省空间，因为地址不再需要存储在交易消息中。它们只需要以数组形式的表格中的索引进行引用。这使得有可能引用256个账户，因为账户使用u8索引进行引用。

当初始化地址查找表或向表中添加新地址时，需要使地址查找表免除租金。地址可以通过链上缓冲区或直接通过`Extension`指令将其追加到表格中。此外，地址查找表还可以存储相关的元数据，后面是一个紧凑数组的账户。下面是一个典型地址查找表的结构：

![LUT Format](./versioned-transactions/lut_format.png)

地址查找表的一个重要缺点是，在交易处理过程中，由于地址查找需要额外的开销，通常会导致交易的成本较高。

## 版本化交易： TransactionV0

传统交易的结构需要修改以包含地址表查找。这些更改不应破坏Solana上的交易处理，也不应对被调用的程序的格式产生任何更改。

为了确保上述情况，重要的是明确指出交易类型：`legacy`（传统）或`versioned`（版本化）。我们如何在交易中包含这些信息呢？

在引入版本化之前，交易在其消息头部的`num_required_signatures`字段的第一个字节中留下了一个未使用的上位比特。现在，我们可以使用这个比特位来明确声明我们的交易版本。

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

如果设置了第一个比特位，那么第一个字节中的剩余比特将用于编码版本号。Solana从“版本0”开始，这是开始使用地址查找表的版本。

如果未设置第一个比特位，那么该交易将被视为“传统交易”，并且第一个字节的剩余部分将被视为编码传统消息的第一个字节。

## MessageV0

新的MessageV0的结构基本上是相同的，只是有两个小但重要的变化：

1. **消息头部**：与传统版本相同，没有变化。
2. **紧凑账户密钥数组**：与传统版本相同，没有变化。我们将指向该数组元素的索引数组表示为*索引数组A*（您很快将看到为什么我们这样表示）。
3. **最近的区块哈希**：与传统版本相同，没有变化。
4. **紧凑指令数组**：与传统版本不同，发生了变化。
5. **地址表查找的紧凑数组**：在版本0中引入。
    
![Message v0](./versioned-transactions/messagev0.png)

在查看指令数组中的变化之前，我们首先讨论地址表查找的紧凑数组的结构。

### 地址表查找的紧凑数组

这个结构将地址查找表（LUT）引入到版本化交易中，从而使得在单个交易中加载更多的只读和可写账户成为可能。

紧凑数组以紧凑的u16编码表示地址表查找的数量，后跟一个地址表查找的数组。每个查找的结构如下：

1. **账户密钥**：地址查找表的账户密钥。
2. **可写索引**：用于加载可写账户地址的紧凑索引数组。我们将此数组表示为*索引数组B*。
3. **只读索引**：用于加载只读账户地址的紧凑索引数组。我们将此数组表示为*索引数组C*。
   
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

现在让我们看看指令紧凑数组中做了哪些改变。

### 紧凑指令数组

如前所述，传统指令的紧凑数组存储了各个传统指令，而这些指令又分别存储了以下内容：

1. 程序ID索引
2. 账户地址索引的紧凑数组
3. 不透明的8位数据的紧凑数组
    
新指令中的变化不在于指令本身的结构，而是在于用于获取第1和第2项索引的数组。在传统交易中，使用了索引数组A的子集，而在版本化交易中，则使用了以下组合数组的子集：

1. **索引数组A**：存储在消息中的紧凑账户数组。
2. **索引数组B**：地址表查找中的可写索引。
3. **索引数组C**：地址表查找中的只读索引。
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## RPC变更

事务响应将需要一个新的版本字段：`maxSupportedTransactionVersion`，以向客户端指示需要遵循的事务结构以进行反序列化。

以下方法需要进行更新以避免错误：

* `getTransaction`
* `getBlock`

请求中需要添加以下参数：

`maxSupportedTransactionVersion: 0`

如果请求中没有显式添加`maxSupportedTransactionVersion`，事务版本将回退到`legacy`。任何包含版本化事务的区块，在存在传统事务的情况下将返回客户端错误。

你可以通过向RPC端点发送JSON格式的请求来设置如下：

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

你还可以使用 [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) 库执行相同操作。

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

## 其他资料
* [如何构建一个版本化事务](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [如何使用地址查找表（LUTs）构建版本化事务](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [版本化交易的限制](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [版本化交易的安全性问题](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [版本化交易的替代性解决方案](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## 参考资料
* [Transactions-V2 Proposal](https://beta.docs.solana.com/proposals/transactions-v2)
* [使用版本化交易来开发](https://beta.docs.solana.com/developing/versioned-transactions)