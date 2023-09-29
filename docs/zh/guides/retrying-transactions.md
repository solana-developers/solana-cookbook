---
title: 重试交易
head:
  - - meta
    - name: title
      content: Solana秘籍 | 重试交易
  - - meta
    - name: og:title
      content: Solana秘籍 | 重试交易
  - - meta
    - name: description
      content: 在某些情况下，一个看似有效的交易可能会在被纳入区块之前就被丢弃。为了应对这种情况，应用程序开发人员可以开发自己的自定义重试交易逻辑。有关重试事务和更多信息，请参阅Solana秘籍。
  - - meta
    - name: og:description
      content: 在某些情况下，一个看似有效的交易可能会在被纳入区块之前就被丢弃。为了应对这种情况，应用程序开发人员可以开发自己的自定义重试交易逻辑。有关重试事务和更多信息，请参阅Solana秘籍。
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

# 重试交易

在某些情况下，一个看似有效的交易可能在输入区块之前会被丢弃。这种情况最常发生在网络拥堵期间，当一个RPC节点无法将交易重新广播给区块链的[领导](https://docs.solana.com/terminology#leader)节点时。对于最终用户来说，他们的交易可能会完全消失。虽然RPC节点配备了通用的重新广播算法，但应用程序开发人员也可以开发自己的自定义重新广播逻辑。

## 综述

::: tip 事实表
- RPC节点将尝试使用通用算法重新广播交易
- 应用程序开发人员可以实现自定义的重新广播逻辑
- 开发人员应该利用 `sendTransaction` JSON-RPC方法中的`maxRetries`参数
- 开发人员应该启用预检查，以便在提交交易之前引发错误
- 在重新签署任何交易之前，**非常重要**的是确保初始交易的块哈希已过期
:::

## 交易的旅程

### 客户端如何提交交易

在Solana中，没有内存池（mempool）的概念。无论是通过编程还是由最终用户发起，所有的交易都会被高效地路由到领导节点，以便将它们处理成区块。有两种主要的方式可以将交易发送给领导节点：
1. 通过RPC服务器和[sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC 方法进行代理发送
2. 通过[TPU客户](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html) 端直接发送给领导节点

绝大多数最终用户将通过RPC服务器提交交易。当客户端提交交易时，接收的RPC节点会尝试将交易广播给当前和下一个领导节点。在交易被领导节点处理之前，除了客户端和中继的RPC节点知道的内容外，没有关于交易的记录。在TPU客户端的情况下，重新广播和领导节点的转发完全由客户端软件处理。

![Transaction Journey](./retrying-transactions/tx-journey.png)

### RPC节点如何广播交易

当RPC节点通过`sendTransaction`接收到一个交易后，它会将交易转换为[UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) 数据包，然后将其转发给相关的领导。UDP允许验证节点之间快速通信，但不提供关于交易传递的任何保证。

因为Solana的领导节点调度在每个[纪元](https://docs.solana.com/terminology#epoch) （大约2天）之前就已知，所以RPC节点会直接将其交易广播给当前和下一个领导节点。这与其他流言协议（如以太坊）随机广播和广泛传播整个网络的交易的方式形成对比。默认情况下，RPC节点会每两秒尝试将交易转发给领导节点，直到交易被确认或交易的块哈希过期（在本文撰写时为150个区块或约1分钟19秒）。如果待重新广播的队列大小超过[10,000 交易](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) 个交易，则新提交的交易将被丢弃。RPC运营商可以调整命令行[参数](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) 以更改此重试逻辑的默认行为。

当RPC节点广播一个交易时，它会尝试将交易转发给领导节点的交易处理单元（TPU）。TPU将交易处理分为五个不同的阶段：
- [Fetch 阶段](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify 阶段](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking 阶段](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast 阶段](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

在这五个阶段中，Fetch阶段负责接收交易。在Fetch阶段中，验证节点会根据三个端口对传入的交易进行分类：
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) 处理常规交易，例如代币转账、NFT铸造和程序指令。
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) 专门处理投票交易。
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) 将未处理的数据包转发给下一个领导节点，如果当前领导无法处理所有交易。

如需了解更多关于TPU的信息，请参考[Jito Labs出色的文章](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## 交易如何被丢弃 

在交易的整个过程中，有几种情况下交易可能意外从网络中丢失。

### 在交易被处理之前

如果网络丢弃一个交易，通常是在交易被领导处理之前发生。UDP [数据包丢失](https://en.wikipedia.org/wiki/Packet_loss) 是可能发生这种情况的最简单原因。在网络负载高峰期，验证节点可能会被大量需要处理的交易压倒。虽然验证节点可以通过 `tpu_forwards`,端口转发多余的交易，但[转发](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389). 的数据量是有限的。此外，每个转发仅限于验证节点之间的单跳。也就是说，通过`tpu_forwards`端口接收的交易不会被转发给其他验证节点。

还有两个较少为人知的原因，可能导致交易在被处理之前被丢弃。第一种情况涉及通过RPC池提交的交易。偶尔，RPC池的一部分可能会领先于其他部分。当池中的节点需要共同工作时，这可能会导致问题。在这个例子中，交易的[recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) 从池中的先进部分（后端A）查询。当交易提交到滞后的池中（后端B）时，节点将无法识别先进的块哈希并丢弃交易。如果开发人员在`sendTransaction`中启用了[preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)，可以在提交交易时检测到此问题。

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

网络分叉也可能暂时的导致交易丢失。如果验证在Banking阶段重新播放其块的速度较慢，可能会创建一个少数派分叉。当客户端构建一个交易时，交易可能引用仅存在于少数派分叉上的`recentBlockhash`。在提交交易后，集群可能在交易被处理之前切换到其他分叉。在这种情况下，由于找不到块哈希，交易被丢弃。

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### 在交易被处理后，但尚未最终确认之前

如果一个交易引用了来自少数派分叉的`recentBlockhash`，该交易有可能还会进行处理。在这种情况下，交易将由少数派分叉上的领导节点进行处理。当这个领导试图与不认可少数派分叉的大多数验证节点达成共识时，它将无法与它们分享已处理的交易。在这种情况下，交易在最终确定之前将被丢弃。

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## 处理被丢弃的交易

虽然RPC节点会尝试重新广播交易，但它们使用的算法是通用的，往往不适合特定应用的需求。为了应对网络拥堵的时候，应用程序开发人员应该自定义自己的重新广播逻辑。

### 深入了解sendTransaction

在提交交易方面，`sendTransaction` RPC方法是开发者可用的主要工具。`sendTransaction`仅负责将交易从客户端传递到RPC节点。如果节点接收到交易，`sendTransaction`将返回用于跟踪交易的交易ID。成功的响应并不表示该交易将由集群处理或最终确定。

:::tip
#### 请求参数
- `transaction`: `string` -  完全签名的交易，以编码字符串形式表示 
- (可选) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - 如果为 true，则跳过预检事务检查（默认为 false）
    - (可选) `preflightCommitment`: `string` - 用于针对库存（bank）插槽进行预检模拟的[承诺](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) 级别（默认为"finalized"）
    - (可选) `encoding`: `string` - 用于交易数据的编码方式。可以选择 "base58"（较慢）或 "base64"（默认为 "base58")
    - (可选) `maxRetries`: `usize` -  RPC节点重试将交易发送给领导者的最大次数。如果未提供此参数，RPC节点将重试交易，直到交易最终确定或块哈希过期为止

#### 响应
- `transaction id`: `string` - 第一个嵌入在交易中的交易签名，以base-58编码的字符串形式表示。可以使用该交易ID与 [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) 一起使用，以轮询获取状态更新。
:::

## 自定义重播逻辑

为了开发自己的重新广播逻辑，开发者应该利用`sendTransaction`的`maxRetries`参数。如果提供了`maxRetries`，它将覆盖RPC节点的默认重试逻辑，允许开发人员在[合理范围内](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274) 手动控制重试过程。

手动重试交易的常见模式涉及临时存储来自[getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash) 的`lastValidBlockHeight`。一旦存储了该值，应用程序可以[轮询集群的blockheight](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight)， 并在适当的时间间隔内手动重试交易。在网络拥堵的时期，将`maxRetries`设置为0并通过自定义算法手动重新广播是有优势的。一些应用程序可能采用[指数退避](https://en.wikipedia.org/wiki/Exponential_backoff)， 而其他应用程序（如[Mango](https://www.mango.markets/) ）选择在恒定间隔内[持续重新提交](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) 交易，直到发生超时。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>


当通过`getLatestBlockhash`进行轮询时，应用程序应该指定其预期的[承诺](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) 级别。通过将承诺级别设置为`confirmed`（已投票）或`finalized`（在`confirmed`之后约30个块），应用程序可以避免从少数派分叉轮询块哈希。

如果应用程序可以访问负载均衡器后面的RPC节点，还可以选择将其工作负载分配给特定节点。为数据密集型请求提供服务的RPC节点（例如[getProgramAccounts](./get-program-accounts.md)）可能会滞后，并且可能不适合转发交易。对于处理时间敏感交易的应用程序，最好拥有专用节点仅处理`sendTransaction`操作。

### 跳过预检的后果

默认情况下，`sendTransaction`将在提交交易之前执行三个预检查。具体而言，`sendTransaction`将会：

- 验证所有签名是否有效
- 检查引用的块哈希是否在最近的150个块内
- 针对预检查的`preFlightCommitment`，模拟交易与库存槽位之间的交互

如果其中任何一个预检查失败，`sendTransaction`将在提交交易之前引发错误。预检查常常能够防止交易丢失，并使客户端能够优雅地处理错误。为了确保这些常见错误得到考虑，建议开发人员将skipPreflight设置为false。

### 何时重新签署交易

尽管尽力进行重新广播，但有时客户端可能需要重新签署交易。在重新签署任何交易之前，非常重要的是确保初始交易的块哈希已经过期。如果初始块哈希仍然有效，那么两个交易都有可能被网络接受。对于最终用户来说，这将看起来好像他们无意中发送了相同的交易两次。

在Solana中，一旦所引用的块哈希早于从`getLatestBlockhash`接收到的`lastValidBlockHeight`，可以安全地丢弃已丢弃的交易。开发者应该通过查询 [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) 并将其与响应中的`blockHeight`进行比较来跟踪l`astValidBlockHeight`。一旦一个块哈希无效，客户端可以使用新查询的块哈希重新签署。

## 致谢

非常感谢 Trent Nelson、[Jacob Creech](https://twitter.com/jacobvcreech), White Tiger、Le Yafo、[Buffalu](https://twitter.com/buffalu__), 和 [Jito Labs](https://twitter.com/jito_labs) 的审查和反馈。
