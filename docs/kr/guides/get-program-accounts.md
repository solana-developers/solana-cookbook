---
title: Get Program Accounts
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

RPC method는 프로그램에 의해 소유된 모든 Account들을 반환한다. 현재 pagination은 지원하지 않습니다.
`getProgramAccounts` 요청은 응답 시간을 향상시키고 의도된 결과만을 반환하기 위해 `dataSlice` 그리고/또는 `filters` 파라미터를 포함해야 합니다.

## Facts

::: tip Parameters

- `programId`: `string` - 질의할 Program의 Pubkey, base58 인코딩 문자열
- (optional) `configOrCommitment`: `object` - 아래의 optional field들을 포함하는 Configuration 파라미터들
    - (optional) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optional) `encoding`: `string` - Account Data에 대한 인코딩, either: `base58`, `base64`, or `jsonParsed`.
    주의, web3js 사용자는 [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)를 사용해야 한다.
    - (optional) `dataSlice`: `object` - 반환되는 Account Data에 대한 제한 설정
        - `offset`: `number` - 반환을 시작할 Account Data 바이트 숫자
        - `length`: `number` - 반환할 Account Data의 바이트 수
    - (optional) `filters`: `array` - 아래의 filter 객체들을 사용하는 Filter 결과들
        - `memcmp`: `object` - 일련의 바이트와 Account Data의 비교:
            - `offset`: `number` - 비교를 시작할 Account Data 바이트 숫자
            - `bytes`: `string` - 비교할 Data, 129 bytes 제한되며 base58 인코딩 된 문자열
        - `dataSize`: `number` - Account Data의 길이와 데이터 사이즈의 비교
    - (optional) `withContext`: `boolean` - 결과를 포장할 [RpcResponse JSON object](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Response

`getProgramAccounts`는 기본적으로 아래의 구조를 갖는 JSON 객체들을 담고 있는 배열을 반환합니다.

- `pubkey`: `string` - Account pubkey, base58 인코딩 된 문자열
- `account`: `object` - 아래의 서브 속성들을 갖고 있는 JSON 객체
    - `lamports`: `number`, Account에 할당된 lamports의 수
    - `owner`: `string`, base58 인코딩 되어 Account에 할당된 Program의 pubkey
    - `data`: `string` | `object` - Account와 연관된 데이터, 인코딩 파라미터로 넘어온 값에 따라 인코딩 된 binary data 또는 JSON 형식
    - `executable`: `boolean`, Account가 Program을 포함하는지에 대한 표시
    - `rentEpoch`: `number`, Account가 rent 지불할 다음 epoch
:::

## Deep Dive

`getProgramAccounts`는 Program이 소유한 모든 Account들을 리턴하는 다재다능한 RPC method 입니다.
우리는 아래와 같이 몇 가지 유용한 쿼리를 위해 `getProgramAccounts`를 사용할 수 있습니다.

- 특정 지갑에 대한 모든 Token Account들 조회
- 특정 mint에 대한 모든 Token Account들 조회 (i.e. All [SRM](https://www.projectserum.com/) holders)
- 특정 Program에 대한 모든 custom Account들 조회 (i.e. All [Mango](https://mango.markets/) users)

이렇게 유용함에도 불구하고, `getProgramAccounts`는 현재 제약사항들 때문에 자주 오해받습니다.
`getProgramAccounts`에 의해 지원되는 많은 쿼리들은 대량의 데이터 셋을 스캔하기 위해 RPC 노드들을 요구합니다.
이런 스캔 작업들은 메모리와 자원 집중적이다. 결과적으로, 너무 자주 혹은 너무 크게 호출하는 것은 connection timeout을 야기할 수 있습니다.
뿐만 아니라, 이 글을 쓰는 시점에는, `getProgramAccounts`의 endpoint는 pagination을 지원하지 않습니다.
만약 쿼리의 결과가 너무 크다면, 응답 값은 잘릴 것입니다.

현재의 이런 제약사항들을 피하기 위해서, `getProgramAccounts`는 몇 가지 유용한 파라미터들을 제공합니다: `dataSlice`, `filters`, `memcpm` 그리고 `dataSize`.
이 파라미터들을 조합해 인자로 넘김으로써, 우리가 쿼리 할 영역을 관리 가능하고 예측 가능한 크기로 줄일 수 있습니다.

`getProgramAccounts`의 흔한 예제는 [SPL-Token Program](https://spl.solana.com/token)과 통신하는 것입니다.
[basic call](../references/accounts.md#get-program-accounts)을 가지고 Token Program이 소유한 모든 Account를 요청하는 것은 막대한 양의 데이터를 호출하게 될 것입니다. 그러나, 파라미터들을 이용함으로써 우리는 효과적으로 우리가 사용하고자 하는 데이터만 요청할 수 있습니다.

### `filters`
`getProgramAccounts`를 사용하기 위한 가장 흔한 파라미터는 `filters` array다. 이 array에는 `dataSize`와 `memcmp` 두 가지 타입의 필터가 들어갈 수 있습니다.
이 필터들을 이용하기 전에, 우리가 요청하고 있는 데이터들이 어떻게 놓여있고 직렬화되는지에 대해 익숙해져야 합니다.

#### `dataSize`
Token Program의 경우, 우리는 [Token Account가 165 bytes의 길이](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106)를 가진다는 것을 알 수 있습니다.
구체적으로, Token Account는 각각 예측 가능한 bytes 수를 요구하는 8개의 다른 필드들을 가지고 있습니다.
우리는 아래의 그림을 통해 이 데이터가 어떻게 놓여있는지 확인할 수 있습니다.

![Account Size](./get-program-accounts/account-size.png)

만약 우리가 우리의 지갑 Address가 소유한 모든 Token Account들을 알고 싶다면, 우리는 정확히 165 bytes 길이인 Account들에 대해 쿼리 영역을 좁게 만드는 `{ dataSize: 165 }`를 `filters` array에 추가할 수 있을 것입니다. 그러나 이것만으로는 충분하지 않습니다. 우리는 또한 우리의 Addres가 소유한 Account들을 찾는 필터를 추가할 필요가 있습니다. 우리는 이것을 `memcmp` 필터를 통해 할 수 있습니다.

#### `memcmp`
`memcmp` 필터 혹은 "메모리 비교" 필터는 우리의 Account에 저장된 어떤 속성에 있는 데이터를 비교할 수 있게 해 줍니다.
구체적으로, 우리는 특정 포지션에 있는 특정 bytes 집합에 맞춰 Account들을 질의할 수 있다. `memcmp`는 두 가지 인자를 요구합니다:

- `offset`: 데이터 비교를 시작할 위치. 이 위치는 bytes로 측정되며 integer로 표현됩니다.
- `bytes`: Account의 데이터와 매칭 되어야 하는 데이터. 이것은 base-58로 인코딩 된 문자열로 표현되며 129 bytes 이하로 제한됩니다.

`memcmp`는 `bytes`가 정확히 매칭 된 경우에만 결과를 반환한다는 사실을 아는 것이 중요합니다.
현재, 우리가 제공할 `bytes`보다 크거나 작은 값에 대한 비교는 지원하지 않습니다.

Token Program 예제와 함께 계속해서, 우리는 우리의 지갑 Address가 소유한 Token Account들만 반환하도록 쿼리를 고칠 수 있습니다.
Token Account를 봤을 때, 우리는 Token Account에 저장된 처음 두 필드가 모두 pubkey라는 것과, 각 pubkey는 32 bytes 길이인 것을 알 수 있습니다.
`owner`가 두 번째 필드인 것을 고려하면, 우리는 `memcmp`를 `offset` 32 bytes에서 시작해야합니다.
여기서부터, 우리는 owner 필드가 우리의 지갑 Address와 매칭되는 Account들을 찾을 것입니다.

![Account Size](./get-program-accounts/memcmp.png)

우리는 아래의 예제를 통해 이 쿼리를 호출할 수 있습니다.

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

위 두 개의 필터 파라미터 밖에, `getProgramAccounts`의 세 번쨰로 흔한 파라미터는 `dataSlice`입니다. `filters` 파라미터와 다르게 `dataSlice`는 쿼리에 의해 반환되는 Account들의 수를 줄이지는 않을 것입니다. 대신에, `dataSlice`는 각 Account의 데이터 양을 제한할 것입니다.

`memcmp`와 유사하게, `dataSlice`는 아래의 두 개의 인자를 받습니다:

- `offset`: Account Data 반환을 시작할 위치 (in number of bytes)
- `length`: 반환되어야 하는 bytes의 개수

`dataSlice`는 우리가 실제 Account Data 자체에는 신경 쓰지 않는 큰 데이터 셋에 쿼리를 요청할 때 특히 유용합니다. 예로, 우리는 특정 Token mint에 대한 Token Accounts(i.e. Token 보유자의 수)들의 수를 알고 싶은 경우입니다.

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

세 가지 파라미터(`dataSlice`, `dataSize`, and `memcmp`)들을 조합함으로써 우리는 질의할 영역을 제한할 수 있고 우리가 관심 있는 데이터만 효과적으로 리턴할 수 있습니다.

## Other Resources

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
