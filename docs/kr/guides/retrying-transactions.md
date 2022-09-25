---
title: Retrying Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Retrying Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Retrying Transactions
  - - meta
    - name: description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana cookbook.
  - - meta
    - name: og:description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana cookbook.
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

# Retrying Transactions

몇몇 상황에서 유효해 보이는 Trasaction이 block에 포함되기 전에 거절될지도 모릅니다. RPC 노드가 [leader](https://docs.solana.com/terminology#leader)에게 그 Transaction을 rebroadcast 하는 것을 실패하는 상황 같은, 네트워크가 혼잡한 동안에 종종 발생합니다.
이것은 end-user에게 그들의 Transaction이 완전히 사라진 것처럼 보일지도 모릅니다.
RPC 노드들은 generic rebroadcasting 알고리즘을 갖추고 있지만, application 개발자들은 자신만의 cutom rebroadcasting logic을 만들 수도 있습니다.



## Facts

::: tip Fact Sheet
- RPC 노드들은 Transaction에 대한 generic 알고리즘을 사용해서 rebroadcast를 시도할 것입니다.
- Application 개발자들은 자신만의 custom rebroadcasting logic을 구현할 수 있습니다.
- 개발자들은 `sendTransaction` JSON-RPC 메소드에 있는 `maxRetries` 파라미터의 이점을 활용해야 합니다.
- 개발자들은 Transaction이 보내지기 전에 error들을 발생시키기 위한 앞선 check들을 가능하게 해야합니다.
- 어떤 Transaction에 다시 서명하기 전에, 첫 Transaction의 Blockhash가 만료됐는지 확인하는 것은 매우 중요합니다.
:::

## The Journey of a Transaction

### How Clients Submit Transactions

Solana에는 mempool에 대한 개념이 없습니다. 프로그램이나 end-user에 의해 초기화된 모든 Transaction들은 block 안으로 처리될 수 있게 효율적으로 leader들에게 라우팅 됩니다.
Transaction이 leader들에게 보내질 수 있는 두 가지 주된 방법이 있습니다:

1. RPC 서버를 통한 Proxy 그리고 [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC method에 의해
2. [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)를 통해 leader들에게 직접

대부분의 end-user들은 RPC 서버를 통해 Transaction들을 보낼 것입니다. Client가 Transaction을 보낼 때, 수신한 RPC node는 Transaction을 현재와 다음 leader들에게 차례로 broadcast 할 것입니다. Transaction이 leader에 의해 처리될 때까지 Client와 전달 중인 RPC 노드들이 알고 있는 것 외부에는 그 Transaction에 대한 기록이 존재하지 않을 것입니다. TPC Client의 경우, rebroadcast와 leader forwarding은 온전히 Client software에 의해 다뤄집니다.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### How RPC Nodes Broadcast Transactions

RPC노드는 `sendTransaction`을 통해 Transaction을 수신한 후에, 관련된 leader들에게 전달하기 전에 Transaction을 [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) 패킷으로 변환할 것입니다. UDP는 validator들이 빠르게 서로 통신할 수 있게 해주지만, Transcation 전달을 보장하지는 않습니다.

Solana의 leader 스케줄은 매 [epoch](https://docs.solana.com/terminology#epoch) 보다 앞선 것으로 알려져 있기 때문에 (~2 days), RPC 노드는 Transaction을 현재와 다음 leader들에게 즉시 broadcast 할 것입니다. 이것은 Transaction들을 전체 네트워크에 랜덤하게 전파하는 Ethereum과 같은 다른 프로토콜들과 다른 것입니다.
기본적으로, RPC 노드들은 Transaction이 종결되거나 Transaction의 Blockhash가 만료(150 blocks or ~1 분 19초, 이 글 작성 시점 기준)될 때까지 매 2초 마다 Trnasaction들을 보내는 시도를 할 것입니다. 만약 아직 처리되지 않은 rebroadcast의 큐 사이즈가 [10,000 transactions](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) 보다 크다면, 새로 보내지는 Transaction들은 드랍될 것입니다. 이러한 재시도 로직의 기본 행위를 변경하기 위해 RPC 운영자들이 조정할 수 있는 command-line [arguments](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172)들이 존재합니다.

RPC 노드가 Transaction을 broadcast할 때, 노드는 이 Transaction을 leader의 [Transaction Processing Unit (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867)에 보내려고 할 것입니다. 
TPU는 Transaction들을 다섯 단계로 처리합니다:
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

이 다섯 단계 중 Fetch Stage는 Transaction들을 수신하는 책임을 갖습니다. Fetch Stage에서 validator들은 들어오는 Transaction들을 3가지 포트에 따라 분류할 것입니다.
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27)는 token 전송들, NFT mint들 그리고 Program Instruction들과 같은 일반적인 Transaction들을 다룹니다.
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31)는 voting Transaction들을 집중적으로 다룹니다.
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29)는 만약 현재 leader가 모든 Transaction들을 처리할 수 없다면 가공되지 않은 패킷들을 다음 leader에게 보냅니다.

TPU에 대한 더 많은 정보는 다음을 참고해주세요. [this excellent writeup by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## How Transactions Get Dropped

Transaction의 여정 동안에 Transaction이 의도치 않게 네트워크로부터 드랍될 수 있는 몇 가지 시나리오들이 존재합니다.

### Before a transaction is processed

만약 네트워크가 Transaction을 드랍한다면, 이것은 대부분 Transaction이 leader에 의해 처리되기 전 일 것입니다. UDP [packet loss](https://en.wikipedia.org/wiki/Packet_loss)는 이것이 발생하는 가장 단순한 이유입니다. 네트워크에 심한 부하가 걸리는 동안, validator들은 처리를 요청받은 Transaction들의 수에 의해 압도될 수 있습니다.
validator들은 과도한 Transaction들을 `tpu_forwards`를 통해 보낼 수도 있지만, [forwarded](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389) 수 있는 데이터 양에 대한 제한이 있습니다.
뿐만 아니라, 각 forward는 validator들 사이에 단일 홉으로 제한되어 있습니다. `tpu_forwards` 포트를 통해 수신된 Transaction들이 다른 validator들에게 보내지지 않는 이유입니다.

Trnasaction이 처리되기 전 드랍될 수 있는 덜 알려진 두 가지 이유도 있습니다.
첫 번째 시나리오는 RPC 풀을 통해 보내진 Transaction들을 호출합니다. 가끔 RPC 풀의 한 부분이 풀의 나머지 부분보다 앞서 있을 수 있습니다. 이것은 풀 안에 있는 노드들이 함께 동작하도록 요청될 때 이슈를 야기할 수 있습니다. 이 예제에서, Transaction의 [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)는 풀의 앞선 부분으로부터 질의를 받습니다 (Backend A). Transaction이 풀의 뒤떨어진 부분에 보내질 때, 노드들은 앞선 blockhash 라는 것을 알아차릴 것이고 Transaction을 드랍할 것입니다. 만약 개발자들이 `sendTransaction`에 [preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)를 가능하게 한다면 Transaction이 보내지기 전에 이것을 발견할 수 있습니다.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

일시적인 네트워크 포크 또한 Transaction들을 드랍시키는 결과를 야기할 수 있습니다. 만약 validator가 Banking Stage 내에서 block들을 느리게 재생한다면, 결국 minority fork를 생성해낼지 모릅니다. Client가 Transaction을 만들 때, 그 Transaction이 오직 minority fork에만 존재하는 `recentBlockhash`를 참조하도록 할 수 있습니다.
그 Transaction이 보내지고 나면, 그 Transaction이 처리되기 전에 cluster가 minority fork를 바꿔버릴 수 있습니다. 이 시나리오에서, blockhash는 발견될 수 없기 때문에 그 Transaction은 드랍됩니다.

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### After a transaction is processed and before it is finalized

Transaction이 minority fork로부터 `recentBlockhash`를 호출한 경우에도 Transaction이 처리될 수도 있습니다.
그러나, 이런 경우에는 minority fork에 있는 leader에 의해 처리될 것입니다. 
이 leader가 처리한 Transaction들을 나머지 네트워크와 공유하려고 할 때, minority fork를 인정하지 않는 majority of validator들과의 합의에 실패할 것입니다. 
이때, 그 Transaction은 완료되기 전에 드랍될 것입니다.

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Handling Dropped Transactions

RPC 노드들이 Transaction들을 rebroadcast 시도할 동안, 그들이 쓰는 알고리즘은 포괄적이고 특정 앱의 요구와는 종종 어울리지 않습니다.
네트워크 혼잡에 대비하기 위해, application 개발자들은 그들 자신의 rebroadcasting logic을 customize 해야 합니다.

### An In-Depth Look at sendTransaction

Transaction들을 보내는 것에 대해서는 `sendTransaction` RPC method가 개발자들에게 가장 중요한 도구입니다.
`sendTransaction`은 단지 Transaction을 client에서 RPC node로 보내는 데 책임이 있습니다.
만약 node가 Transaction을 수신하면, `sendTransaction`은 그 Transaction을 추적하기 위해 사용될 수 있는 Transaction id를 응답할 것입니다.
성공적인 응답이 그 Transaction이 cluster에 의해 처리되거나 완료될 것인지를 나타내지는 않습니다.

:::tip
#### Request Parameters
- `transaction`: `string` - 인코딩 된 문자열로 완전하게 서명된 Transaction
- (optional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - true 라면, 보내기 전 Transaction check를 건너뜁니다. (default: false)
    - (optional) `preflightCommitment`: `string` - bank slot과 반대되는 보내기 전 시뮬레이션을 위해 사용할 [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) 레벨 (default: "finalized").
    - (optional) `encoding`: `string` - Transaction Data를 위해 사용되는 인코딩. "base58" (slow), 또는 "base64". (default: "base58").
    - (optional) `maxRetries`: `usize` - RPC node가 leader에게 Transaction 보내는 것을 재시도할 최대 횟수. 만약 이 파라미터가 값이 세팅되지 않는다면, RPC node는 Transaction이 완료되거나 blockhash가 만료될 때까지 재시도할 것입니다.

#### Response
- `transaction id`: `string` - base-58로 인코딩된 문자열로 Transaction에 담긴 첫 번째 Transaction 시그니처. 이 Transaction id는 상태 updates들을 조사하기 위해 [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses)와 함께 사용될 수 있습니다.
:::

## Customizing Rebroadcast Logic

자신만의 rebroadcasting logic을 개발하기 위해서, 개발자들은 `sendTransaction`의 `maxRetries` 파라미터의 이점을 활용해야 합니다.
만약 적용된다면, 개발자들이 [within reasonable bounds](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274) 재시도 처리를 수동으로 다룰 수 있게 해 주며, `maxRetries`가 RPC 노드의 기본 retry logic을 덮어쓸 것입니다.
 
Transaction들을 수동으로 재시도하는 것을 위한 흔한 패턴은 일시적으로 [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash)으로부터 얻을 수 있는 `lastValidBlockHeight`를 저장하도록 호출하는 것입니다.
일단 저장되고 나면, 이제 Application은 [poll the cluster’s blockheight](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight)할 수 있고 적절한 간격으로 수동으로 Transaction을 재시도할 수 있습니다. 네트워크가 혼잡할 때는 `maxRetries`를 0으로 세팅하고 custom algorithm을 통해 수동으로 rebroadcast하는 것이 유리합니다. 어떤 Application들은 [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) algorithm을 사용할수도 있고, 다른 Application들은 타임아웃이 일어날 때까지 일정한 간격으로 Transaction들을 [continuously resubmit](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713)하기 위해 [Mango](https://www.mango.markets/) opt를 사용할 수도 있습니다.


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


`getLastestBlockhash`를 통해 가져올 때, Application들은 그들의 의도된 [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) level을 명시해야 합니다. commitment를 `confirmed` (voted on) 또는 `finalized` (~30 blocks after `confirmed`)으로 세팅함으로써, Application은 minority fork로 부터 blockhash를 가져오는 것을 피할 수 있습니다.

Application이 만약 load balancer 뒤의 RPC node들에 접근할 수 있다면, 특정 노드들 사이에서 작업량을 나누도록 선택할 수 있습니다. [getProgramAccounts](./get-program-accounts.md)와 같은 data 집중적인 요청들을 제공하는 RPC 노드들 뒤떨어지기 쉽고 Transaction들을 보내기 또한 적절하지 않을 수 있습니다.
시간에 민감한 Transaction들을 다루는 Application들에게, `sendTransaction`만을 다루는 node들을 선택하는 것은 prudent할지 모릅니다.

### The Cost of Skipping Preflight

기본적으로 `sendTransaction`은 Transaction을 보내기에 앞서 세 가지 preflight checks를 수행합니다. 구체적으로:
- 모든 서명들이 유효한지 검증합니다.
- 참조된 blockhash가 최근 150 blocks 안에 포함되는지 체크합니다.
- `preflightcommitment`에 의해 명시된 bank slot에 대하여 Transaction을 시뮬레이션합니다.

만약 이 세 가지 preflight check가 실패하는 경우, `sendTransaction`은 Transaction을 보내기 전에 에러를 일으킬 것입니다.
Preflight checks는 Transaction을 잃어버리는 것과 client가 우아하게 error를 다루도록 하는 것 사이의 차이를 만들어 낼 수 있습니다.
이런 흔한 에러들이 설명되도록 하고 싶다면, 개발자들이 `skipPreflight`을 `false` 값으로 유지하는 것을 추천합니다.

### When to Re-Sign Transactions

모든 rebroadcast 시도에도 불구하고, Client가 Transaction에 다시 서명하도록 요구되는 시점들이 있을 수 있습니다.
Transaction에 재서명하기 전에, 첫 번째 Transaction의 blockhash가 만료되었다는 것을 확인하는 것은 **매우 중요**합니다.
만약 첫 번째 blockhash가 여전히 유효하다면, 이 두 Transaction들이 network에 받아들여질 수도 있습니다.
이것은 end-user에게 의도치 않게 동일한 Transaction을 두 번 보내는 결과를 보여줄 것입니다.

Solana에서 드랍된 Transaction은 이 Transaction이 참조하는 blockhash가 `getLatestBlockhash`로부터 수신된 `lastValidBlockHeight`보다 오래된 상태가 됬을 때 안전하게 버려질 수 있습니다. 개발자들은 [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo)를 질의하는 것과 응답 값에 있는 `blockHeight`와 비교하는 것으로 `lastValidBlockHeight`를 추적해야 합니다. blockhash가 유효하지 않게 되면 Client들은 새롭게 질의한 blockhash를 가지고 다시 서명해야 할 것입니다.

## Acknowledgements

Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), and [Jito Labs](https://twitter.com/jito_labs). 이 모든 분들의 리뷰와 피드백에 감사드립니다.
