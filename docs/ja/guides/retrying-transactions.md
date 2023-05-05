---
title: トランザクションの再試行
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

場合によっては、一見有効なトランザクションがブロックに含まれる前に削除されることがあります。 これは、RPC ノードが [leader](https://docs.solana.com/terminology#leader). へのトランザクションの再ブロードキャストに失敗したときに、ネットワークが輻輳しているときに最もよく発生します。エンドユーザーにとっては、トランザクションが完全に消えてしまったかのように見えるかもしれません。
RPC ノードには一般的な再ブロードキャスト アルゴリズムが装備されていますが、アプリケーション開発者は独自のカスタム再ブロードキャスト ロジックを開発することもできます。

## 概要

::: tip Fact Sheet
- RPCノードは、一般的なアルゴリズムを使用してトランザクションを再ブロードキャストしようとします
- アプリケーション開発者は、独自のカスタム再ブロードキャスト ロジックを実装できます
- `sendTransaction` JSON-RPC メソッドの `maxRetries` パラメータを利用する必要があります
- JSON-RPC メソッドのパラメーターを利用する必要があります
- トランザクションが送信される前にプリフライト チェックを有効にしてエラーを発生させる必要があります
- トランザクションに再署名する前に、最初のトランザクションのブロックハッシュの有効期限が切れていることを確認することが**非常に重要**です
:::

## The Journey of a Transaction

### クライアントがトランザクションを送信する方法

Solana には mempool という概念はありません。すべてのトランザクションは、プログラムによって開始されたかエンドユーザーによって開始されたかに関係なく、リーダーに効率的にルーティングされるため、ブロックに処理できます。ランザクションをリーダーに送信するには、主に 2 つの方法があります。:
1. RPC server経由のプロキシによる [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC method
2. [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)経由でリーダーに直接送信

エンドユーザーの大部分は、RPC サーバー経由でトランザクションを送信します。クライアントがトランザクションを送信すると、受信側の RPC ノードが現在と次のリーダーの両方にトランザクションをブロードキャストしようとします。 トランザクションがリーダーによって処理されるまで、クライアントと中継 RPC ノードが認識しているもの以外にトランザクションの記録はありません。 再ブロードキャストとリーダー転送はクライアント ソフトウェアによって完全に処理されます。

![Transaction Journey](./retrying-transactions/tx-journey.png)

### RPC ノードがトランザクションをブロードキャストする方法
RPC ノードが`sendTransaction`を介してトランザクションを受信した後、関連するリーダーに転送する前に、トランザクションを [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) パケットに変換します。UDP を使用すると、バリデーターは相互に迅速に通信できますが、トランザクションの到達に関する保証はありません。

Solana のリーダー スケジュールは、すべての[epoch](https://docs.solana.com/terminology#epoch) (~2 days)前に知られているため、RPC ノードは、そのトランザクションを現在および次のリーダーに直接ブロードキャストします。これは、トランザクションをネットワーク全体にランダムかつ広範に伝播する Ethereum などの他のゴシップ プロトコルとは対照的です。デフォルトでは、トランザクションが終了するか、トランザクションのブロックハッシュが期限切れになるまで(この記事の執筆時点で 150 ブロックまたは約 1 分 19 秒)RPC ノードは 2 秒ごとにトランザクションをリーダーに転送しようとします。 未処理の再ブロードキャスト キューのサイズが [10,000 トランザクション](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20)を超える場合、新しく送信されたトランザクションはドロップされます。  [コマンドライン引数](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) を用いてRPCオペレータはこの再試行ロジックのデフォルトの動作を調整し、変更が可能です。

RPC ノードがトランザクションをブロードキャストした時、リーダーの[トランザクション処理ユニット (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867)にトランザクションの転送を施行します。TPU は、5 つの異なるフェーズでトランザクションを処理します: 
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

これら 5 つのフェーズのうち、Fetch Stageはトランザクションの受信を担当します。Fetch ステージ内で、バリデーターは受信トランザクションを 3 つのポートに従って分類します:
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) トークン転送、NFT ミント、プログラム命令などの通常のトランザクションを処理します
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) 投票トランザクションのみ対応します
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) 現在のリーダーがすべてのトランザクションを処理できない場合、未処理のパケットを次のリーダーに転送します

TPU の詳細については、[Jito Labs によるこの優れた記事](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)を参照してください。

## How Transactions Get Dropped

トランザクションの行程全体で、トランザクションが意図せずにネットワークからドロップされるシナリオがいくつかあります。

### Before a transaction is processed

ネットワークがトランザクションをドロップする場合、トランザクションがリーダーによって処理される前にドロップする可能性が高くなります。 これが発生する最も単純な理由は、[UDPの喪失](https://en.wikipedia.org/wiki/Packet_loss)です。ネットワークの負荷が高いときは、バリデーターが処理に必要な膨大な数のトランザクションに圧倒される可能性もあります。 バリデーターは`tpu_forwards`を介して余剰トランザクションを転送するように装備されていますが、[転送](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389)できるデータ量には制限があります。 さらに、各転送はバリデーター間の 1 つのホップに制限されます。つまり、`tpu_forwards`ポートで受信したトランザクションは、他のバリデーターに転送されません。

トランザクションが処理される前にドロップされる可能性がある理由として、あまり知られていない 2 つの理由もあります。 トランザクションが処理される前にドロップされる可能性がある理由として、あまり知られていない 2 つの理由もあります。最初のシナリオには、RPC プール経由で送信されるトランザクションが含まれます。これにより、プール内のノードが連携する必要がある場合に問題が発生する可能性があります。この例では、トランザクションの[recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)がプールの高度な部分 (バックエンド A) からクエリされます。 トランザクションがプールの遅延部分 (バックエンド B) に送信されると、ノードは高度なブロックハッシュを認識せず、トランザクションを破棄します。これは、開発者が  `sendTransaction` [preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)を有効にしている場合、トランザクションの送信時に検出できます。

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

一時的なネットワーク フォークにより、トランザクションがドロップされる可能性もあります。 バリデータがバンキング ステージ内でブロックを再生するのが遅い場合、マイノリティ フォークが作成される可能性があります。 クライアントがトランザクションを構築するとき、そのトランザクションが少数派フォークにのみ存在する `recentBlockhash` を参照する可能性があります。トランザクションが送信された後、クラスターは、トランザクションが処理される前に少数フォークから切り替えることができます。このシナリオでは、ブロックハッシュが見つからないため、トランザクションが破棄されます。

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### After a transaction is processed and before it is finalized

トランザクションがマイノリティ フォークからの `recentBlockhash`を参照する場合でも、トランザクションが処理される可能性があります。 ただし、この場合、マイノリティ フォークのリーダーによって処理されます。このリーダーが処理されたトランザクションをネットワークの残りの部分と共有しようとすると、マイノリティフォークを認識しない大多数のバリデーターとの合意に達することができません。この時点で、トランザクションはファイナライズされる前にドロップされます。

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Handling Dropped Transactions

RPC ノードはトランザクションの再ブロードキャストを試みますが、使用するアルゴリズムは一般的であり、特定のアプリケーションのニーズには適さないことがよくあります。ネットワークの輻輳に備えて、アプリケーション開発者は独自の再ブロードキャスト ロジックをカスタマイズする必要があります。

### An In-Depth Look at sendTransaction

トランザクションの送信に関しては、 `sendTransaction`RPC メソッドが開発者が利用できる主要なツールです。`sendTransaction`は、クライアントから RPC ノードへのトランザクションの中継のみを担当します。ノードがトランザクションを受信すると、`sendTransaction`  は、トランザクションの追跡に使用できるトランザクション ID を返します。正常な応答は、トランザクションがクラスターによって処理またはファイナライズされるかどうかを示すものではありません。

:::tip
#### Request Parameters
- `transaction`: `string` - エンコードされた文字列としての完全に署名されたトランザクション
- (optional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - true の場合、プリフライト トランザクション チェックをスキップします (default: false)
    - (optional) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) バンク スロットに対するプリフライト シミュレーションに使用する新しいウィンドウ レベルでのコミットメントオープン (default: "finalized")。
    - (optional) `encoding`: `string` - トランザクション データに使用されるエンコーディング。 "base58" (slow)または"base64"(default: "base58").
    - (optional) `maxRetries`: `usize` - RPC ノードがリーダーへのトランザクションの送信を再試行する最大回数。このパラメーターが指定されていない場合、RPC ノードは、トランザクションが終了するか、ブロックハッシュの有効期限が切れるまで、トランザクションを再試行します。

#### Response
- `transaction id`: `string` - base-58でエンコードされた文字列として、トランザクションに埋め込まれた最初のトランザクション署名。このトランザクション ID を [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) で使用して、ステータスの更新をポーリングできます。

:::

## Customizing Rebroadcast Logic

独自の再ブロードキャスト ロジックを開発するには、開発者は`sendTransaction`の`maxRetries`パラメータを利用する必要があります。指定された場合、`maxRetries` は RPC ノードのデフォルトの再試行ロジックをオーバーライドし、開発者が[妥当な範囲内で](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274)再試行プロセスを手動で制御できるようにします。

トランザクションを手動で再試行する一般的なパターンには、 [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash)から取得した`lastValidBlockHeight` を一時的に保存することが含まれます。一旦隠蔽されると、アプリケーションはクラスタの[poll the cluster’s blockheight](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight)をポーリングし、適切な間隔で手動でトランザクションを再試行できます。 ネットワークが混雑している場合は、 `maxRetries`を0に設定し、カスタム アルゴリズムを介して手動で再ブロードキャストすることをお勧めします。 一部のアプリケーションでは、[exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) アルゴリズムで指数バックオフを使用する場合がありますが、[Mango](https://www.mango.markets/) などの他のものは、[一定の間隔で継続的に](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) トランザクションを再送信することを選択します。

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


`getLatestBlockhash`を介してポーリングする場合、 アプリケーションは意図した[commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)レベルで開くように指定する必要があります。 コミットメントを `confirmed` (voted on) または `finalized` (~30 blocks after `confirmed`)に設定することで、アプリケーションは、マイノリティ フォークからのブロックハッシュのポーリングを回避できます。

アプリケーションがロード バランサーの背後にある RPC ノードにアクセスできる場合、そのワークロードを特定のノードに分割することも選択できます。[getProgramAccounts](./get-program-accounts.md) などのデータ集約型のリクエストを処理する RPC ノードは、処理が遅れる傾向があり、トランザクションの転送にも適していない可能性があります。時間に敏感なトランザクションを処理するアプリケーションの場合、`sendTransaction`のみを処理する専用ノードを用意するのが賢明な場合があります。

### The Cost of Skipping Preflight

デフォルトでは、`sendTransaction`は、トランザクションを送信する前に 3 つのプリフライト チェックを実行します。具体的には次のことを行います:
- すべての署名が有効であることを確認する
- 参照されたブロックハッシュが最後の 150 ブロック内にあることを確認します
- `preflightCommitment`で指定された銀行スロットに対してトランザクションをシミュレートします。

これら 3 つのプリフライト チェックのいずれかが失敗した場合、 `sendTransaction` はトランザクションを送信する前にエラーを発生させます。多くの場合、プリフライト チェックは、トランザクションを失うことと、クライアントがエラーを適切に処理できるようにすることの違いになる可能性があります。これらの一般的なエラーが確実に説明されるようにするために、開発者は`skipPreflight`を`false`に設定しておくことをお勧めします。

### When to Re-Sign Transactions

再ブロードキャストのあらゆる試みにもかかわらず、クライアントがトランザクションに再署名する必要がある場合があります。ランザクションに再署名する前に、最初のトランザクションのブロックハッシュの有効期限が切れていることを確認することが**非常に重要です**。最初のブロックハッシュがまだ有効な場合、両方のトランザクションがネットワークによって受け入れられる可能性があります。エンドユーザーには、同じトランザクションを意図せずに2回送信したように見えます。

Solana,では、削除されたトランザクションは、参照するブロックハッシュが  `getLatestBlockhash` から受け取った`lastValidBlockHeight`よりも古い場合、安全に破棄できます。 開発者は、[`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) をクエリし、応答の`blockHeight`と比較して、この  `lastValidBlockHeight` を追跡する必要があります。ブロックハッシュが無効になると、クライアントは新しくクエリされたブロックハッシュで再署名できます。

## Acknowledgements

Trent Nelson、 [Jacob Creech](https://twitter.com/jacobvcreech)、White Tiger、 Le Yafo、 [Buffalu](https://twitter.com/buffalu__)、 [Jito Labs](https://twitter.com/jito_labs)のレビューとフィードバックに感謝します。
