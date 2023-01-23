---
title: プログラムアカウントの取得
head:
  - - meta
    - name: title
      content: Solana Cookbook | Get Program Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Get Program Accounts
  - - meta
    - name: description
      content: Learn how to query data on Solana using getProgramAccounts and accountsDB
  - - meta
    - name: og:description
      content: Learn how to query data on Solana using getProgramAccounts and accountsDB
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

# Get Program Accounts

プログラムに所有されるアカウントすべてを返すRPCメソッド。ページネーションはサポートしていません。
レスポンス向上をしつつ意図した結果のみを返すためには、 `getProgramAccounts` には`dataSlice` か `filters`、あるいはその両方をパラメータに含める必要があります。

## 概要

::: tip Parameters

- `programId`: `string` - base58 でエンコードされた文字列として提供される、クエリするプログラムの公開鍵
- (optional) `configOrCommitment`: `object` - 次のオプションフィールドを含む設定パラメータ:
    - (optional) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optional) `encoding`: `string` - アカウント データのエンコード: `base58`、 `base64`、 `jsonParsed` のいずれか。 ※ web3js ユーザーは代わりに[getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)を使用する必要があります。
    - (optional) `dataSlice`: `object` - 下記に基づき、返却されるアカウントデータを制限します。:
        - `offset`: `number` - アカウントデータの返却開始位置バイト数
        - `length`: `number` - アカウントデータの返却バイト数
    - (optional) `filters`: `array` - 次のフィルターオブジェクトを使用して結果をフィルタします。:
        - `memcmp`: `object` - アカウントデータと照合する連続バイト:
            - `offset`: `number` - アカウントデータの比較開始位置バイト数
            - `bytes`: `string` - 照合に使用する129バイト制限のbase58エンコード文字列
        - `dataSize`: `number` - アカウントデータの長さと比較する指定数
    - (optional) `withContext`: `boolean` - 結果を[RpcResponse JSON object](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)にラップするかどうか。

##### Response

デフォルトでは、 `getProgramAccounts` は次の構造を持つ JSON オブジェクトの配列を返します。:

- `pubkey`: `string` -  base58エンコード文字列のアカウント公開鍵
- `account`: `object` - 次のサブフィールドを持つ JSON オブジェクト:
    - `lamports`: `number`, アカウントに割り当てられたlamports の数
    - `owner`: `string`, アカウントが割り当てられているプログラムのbase58エンコード文字列のアカウント公開鍵
    - `data`: `string` | `object` - 指定されたエンコーディング パラメータに応じてバイナリ データまたは JSON 形式にエンコードされたアカウントに関連付けられたデータ
    - `executable`: `boolean`, アカウントにプログラムが含まれているかどうか
    - `rentEpoch`: `number`, このアカウントが次にrentを支払うべきepoch
:::

## 詳細

`getProgramAccounts` はプログラムが所有するすべてのアカウントを返す多用途の RPC メソッドです。下記のような検索など、多くのクエリに使用できます:

- 特定のウォレットのすべてのトークン アカウントの取得
- 特定のmintのすべてのトークン アカウント ( つまり、[SRM](https://www.projectserum.com/) の所有者すべて)
- 特定のプログラムのすべてのカスタム アカウント (つまり、[Mango](https://mango.markets/) ユーザー全員)

 `getProgramAccounts`は非常に便利ですが、現在の制約のためによく誤解されます。
 サポートされているクエリの多くは、大量のデータ セットをスキャンするためにRPC ノードを必要とします。
これらのスキャンは、メモリとリソースの両方を集中的に使用します。その結果、呼び出しの頻度が高すぎたり取得範囲が大きすぎたりすると、
接続タイムアウトが発生する可能性があります。 さらに、この記事の執筆時点では、`getProgramAccounts`エンドポイントはページネーションをサポートしていません。
クエリの結果が大きすぎる場合、レスポンスは破棄されます。

これらの現在の制約を回避するために、`dataSlice`、`filters` 、`memcmp`、 `dataSize`などの有用なパラメータが提供されています。
これらのパラメーターの組み合わせにより、クエリの範囲を予測可能なサイズに縮小できます。

`getProgramAccounts`の一般的な例として、[SPL-Token Program](https://spl.solana.com/token)との対話があります。 
 [basic call](../references/accounts.md#get-program-accounts)でトークン プログラムが所有するすべてのアカウントを要求すると、膨大な量のデータが必要になります。
ただし、パラメーターを指定することで、使用するデータのみを効率的に取得できます。

### `filters`
 `getProgramAccounts` 使用する最も一般的なパラメーターは、 `filters` 配列です。
  `dataSize` と `memcmp`の 2 種類のフィルターを受け入れます。
これらのフィルターのいずれかを使用する前に、要求しているデータがどのように配置され、シリアル化されるかを理解する必要があります。

#### `dataSize`
トークン プログラムの場合、[トークン アカウントの長さは 165 バイト](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106)です。
具体的には、トークンアカウントには8つの異なるフィールドがあり、各フィールドには予測可能なバイト数が必要です。
以下の図を使用して、このデータがどのように配置されているかを視覚化できます。

![Account Size](./get-program-accounts/account-size.png)

ウォレットアドレスが所有するすべてのトークンアカウントを検索する場合は、`filters`に `{ dataSize: 165 }` を追加することで、クエリの範囲を正確に165 バイトの長さのアカウントだけに絞り込むことができます。ただし、これだけでは不十分です。 アドレスが所有するアカウントを検索するフィルターも追加する必要があります。これは `memcmp` フィルターで実現できます。

#### `memcmp`
`memcmp`、または "memory comparison"フィルターを使用すると、アカウントに保存されている任意のフィールドのデータを比較できます。 具体的には、特定の位置にある特定のバイト セットに一致するアカウントのみを照会できます。 `memcmp`には 2 つの引数が必要です:

- `offset`: データの比較を開始する位置。この位置はバイト単位で測定され、整数として表されます。
- `bytes`: アカウントのデータと一致させるデータ。これは、base-58エンコードの文字列で、129 バイト未満に制限する必要があります。

`memcmp` は `bytes`が完全に一致する結果のみを返すことに注意してください。 
現在は、指定した`bytes`より大きい、または小さい値の比較はサポートされていません。

トークン プログラムの例に沿って、クエリを修正して、ウォレット アドレスが所有するトークン アカウントのみを返すことができます。トークン アカウントを見ると、トークン アカウントに保存されている最初の 2 つのフィールドが両方とも公開鍵であり、各公開鍵の長さが 32 バイトであることがわかります。`owner`が 2 番目のフィールドであることを考えると、 `memcmp` は  32バイトの`offset`で開始する必要があります。ここから、所有者フィールドがウォレット アドレスと一致するアカウントを探します。

![Account Size](./get-program-accounts/memcmp.png)

次の例を使用して、このクエリを呼び出すことができます:

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

2 つのフィルター パラメーター以外で、 `getProgramAccounts`の 3番目に一般的なパラメーターは `dataSlice`です。
 `filters` パラメーターとは違い、`dataSlice`はクエリの結果によって返却されるアカウントの数を制限するわけではありません。
 代わりに、`dataSlice` それぞれのアカウントのデータ量を制限します。

`memcmp`と同様、`dataSlice`は下記の2つの引数を受け入れます:

- `offset`: アカウントデータの返却開始位置(バイト数)
- `length`: 返却を期待するバイト数

`dataSlice`は、アカウントデータ自体は重要ではないが大きいデータセットに対してクエリする場合に便利です。 
例としては、特定のトークンmintのトークンアカウントの数 (つまり、トークン所有者の数) を見つけたい場合です。

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

`dataSlice`、`dataSize`、`memcmp`の三つのパラメータをすべて組み合わせることで、クエリの範囲を制限し関心のあるデータのみを効率的に返すことができます。

## その他参考資料

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
