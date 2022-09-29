---
title: 获取程序帐户
head:
  - - meta
    - name: title
      content: Solana秘籍 | 获取程序帐户
  - - meta
    - name: og:title
      content: Solana秘籍 | 获取程序帐户
  - - meta
    - name: description
      content: 学习如何在Solana上用getProgramAccounts和accountsDB查询数据
  - - meta
    - name: og:description
      content: 学习如何在Solana上用getProgramAccounts和accountsDB查询数据
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

# 获取程序帐户

这个 RPC 方法返回程序拥有的所有帐户，目前不支持分页。发送 `getProgramAccounts` 请求时应包含 `dataSlice` 和/或 `filters` 参数以缩短响应时间并仅返回预期结果。

## 综述

::: tip 参数

- `programId`: `string` - 要查询的程序的公钥，以 base58 编码的字符串形式提供
- (可选) `configOrCommitment`: `object` - 配置参数包含以下可选字段:
    - (可选) `commitment`: `string` - [状态commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (可选) `encoding`: `string` - 帐户数据的编码, 可以是`base58`, `base64`或者 `jsonParsed`。 请注意，web3js 用户应该改用 [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (可选) `dataSlice`: `object` - 根据以下条件限制返回帐户数据:
        - `offset`: `number` - 开始返回的帐户数据字节数
        - `length`: `number` - 要返回的帐户数据字节数
    - (可选) `filters`: `array` - 过滤结果使用以下过滤对象:
        - `memcmp`: `object` - 将一系列字节与帐户数据匹配:
            - `offset`: `number` - 开始比较的帐户数据的字节数
            - `bytes`: `string` - 要匹配的数据，base58 编码的字符串限制在 129 个字节以内
        - `dataSize`: `number` - 将账户数据长度与提供的数据大小进行比较
    - (可选) `withContext`: `boolean` - 将结果包装在 [Rpc响应JSON对象](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)中

##### 响应

默认情况下 `getProgramAccounts` 将返回一个 JSON 对象数组，其结构如下:

- `pubkey`: `string` - base58 编码的帐户公钥
- `account`: `object` - 具有以下子字段的 JSON 对象:
    - `lamports`: `number`, 分配给帐户的 lamport 数量
    - `owner`: `string`, 帐户被分配到的程序的 base58 编码公钥
    - `data`: `string` | `object` - 与帐户关联的数据，可以是编码的二进制数据或 JSON 格式，具体取决于提供的编码参数
    - `executable`: `boolean`, 标明帐户是否包含程序
    - `rentEpoch`: `number`, 该账户下一次欠租的时期
:::

## 深入

`getProgramAccounts` 是一种通用的 RPC 方法，它返回程序拥有的所有帐户。我们可以使用 `getProgramAccounts` 进行许多有用的查询，例如查找：

- 特定钱包的所有代币账户
- 特定铸造的所有代币账户 (即所有 [SRM](https://www.projectserum.com/) 持有人)
- 特定程序的所有自定义帐户 (即所有 [Mango](https://mango.markets/) 用户)

尽管 `getProgramAccounts` 很有用，但由于当前的限制，它经常被误解。许多由 `getProgramAccounts` 支持的查询都需要RPC节点来扫描大量数据。这些扫描是内存和资源密集型的。因此，过于频繁或范围过大的调用可能会导致连接超时。此外，在撰写本文时， `getProgramAccounts` 端点 (endpoint) 不支持分页。如果查询的结果太大，响应将被截断。

为了绕过这些当前的限制，`getProgramAccounts` 提供了许多有用的参数：即 `dataSlice`， `filters` 选项 `memcmp` 和 `dataSize` 。通过提供这些参数的组合，我们可以将查询范围缩小到可管理和可预测的大小。

一个常见的 `getProgramAccounts` 例子涉及与 [SPL代币程序](https://spl.solana.com/token) 交互。使用[基本调用](../../references/accounts.md#get-program-accounts)请求代币程序拥有的所有帐户将涉及大量数据。然而，通过提供参数，我们可以高效地只请求我们打算使用的数据。

### `filters`
与 `getProgramAccounts` 一起最常使用的参数是 `filters` 数组。该数组接受两种类型的过滤器，`dataSize` 和 `memcmp`。在使用这些过滤器之前，我们应该熟悉请求的数据是如何布局和序列化的。

#### `dataSize`
在代币程序的例子中，我们可以看到[代币账户的长度是 165 字节](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106)。具体来说，一个代币帐户有八个不同的字段，每个字段都需要可预测的字节数。我们可以使用下图来可视化这些数据的布局方式。

![Account Size](./get-program-accounts/account-size.png)

如果想查找钱包地址拥有的所有代币账户，我们可以添加 `{ dataSize: 165 }` 到 `filters` 数组中以将查询范围缩小到长度正好为165字节的账户。然而，仅此一点是不够的，我们还需要添加一个过滤器来查找我们地址拥有的帐户。我们可以通过 `memcmp` 过滤器来实现这一点。

#### `memcmp`
`memcmp` 过滤器或“内存比较”过滤器允许我们比较存储在我们帐户中的任何字段的数据。具体来说，我们只能查询在特定位置匹配特定字节集的帐户。`memcmp` 需要两个参数：

- `offset`: 开始比较数据的位置。该位置以字节为单位，并以整数表示。
- `bytes`: 与帐户数据相匹配的数据。以 base-58 编码的字符串表示，限制为小于 129 个字节。

需要注意的是，`memcmp` 只会返回与 `bytes` 完全匹配的结果。目前，它不支持与大于或小于我们提供的 `bytes` 值进行比较。

与我们的代币程序示例保持一致，我们可以修改查询，仅返回我们钱包地址拥有的代币账户。当查看代币帐户时，我们可以看到存储在代币帐户上的前两个字段都是公钥，每个公钥的长度为 32 个字节。鉴于 `owner` 是第二个字段，我们应该以 32 字节的 `offset` 开始我们的 `memcmp`。在这以后，我们将寻找那些所有者字段与我们的钱包地址相匹配的帐户。

![Account Size](./get-program-accounts/memcmp.png)

我们可以通过以下示例调用此查询：

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

除这两个过滤器参数之外，`getProgramAccounts` 第三个最常见的参数是 `dataSlice`。与 `filters` 参数不同，`dataSlice` 不会减少查询返回的帐户数。相反，`dataSlice` 将限制每个帐户的数据量。

与`memcmp`类似, `dataSlice` 接受两个参数：

- `offset`: 开始返回帐户数据的位置（以字节数为单位）
- `length`: 应返回的字节数

当我们在大型数据集上运行查询但实际上并不关心帐户数据本身时，`dataSlice`特别有用。例如: 找到特定代币铸造的代币账户数量（即代币持有者的数量）。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

通过组合所有三个参数（`dataSlice`、`dataSize` 和 `memcmp`），我们可以限制查询范围并有效地只返回我们感兴趣的数据。

## 其他资料

- [RPC API 文档](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js 文档](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js 文档](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
