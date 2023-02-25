---
title: アカウントマップ
---

# Account Maps

マップは、**key** とを何らかの **value** に関連付けるためにプログラミングでよく使用するデータ構造です。キーと値は任意の型にすることができ、キーは保存される特定の値の識別子として機能します。 次に、そのキーを指定すると、これらの値を効率的に挿入、取得、更新できます。

ご存知のように、Solana の Account モデルでは、プログラム データとそれに関連する状態データを異なるアカウントに保存する必要があります。 これらのアカウントにはアドレスが関連付けられています。これ自体がマップとして機能します。 Solana のAccount モードの詳細については、[こちら][AccountCookbook]。

そのため、値を取得するために必要なキーをアドレスとして、別のアカウントに値を保存することは理にかなっています。しかし、これは次のようないくつかの問題を引き起こします。

* 上記のアドレスは、記憶して必要な値を取得できる理想的な**key**ではない可能性が高いです。

* 上記のアドレスは、異なる鍵ペアの公開鍵を参照しており、各公開鍵 (またはアドレス) には秘密鍵も関連付けられています。この秘密鍵は、必要に応じて別の指示に署名する必要があり、秘密鍵をどこかに保管する必要がありますが、これは絶対にお勧めできません！

これは、多くの Solana 開発者が直面する問題であり、`Map` のようなロジックをプログラムに実装しています。この問題を解決する方法をいくつか見てみましょう。

## Deriving PDAs
PDA は [Program Derived Address][PDA]の略で、要するに一連のシードから派生した(**derived**)アドレスとプログラム ID (またはアドレス) です。

PDA のユニークな点は、これらのアドレスが秘密鍵に関連付けられていないことです。
これは、これらのアドレスが ED25519 曲線上にないためです。
詳細は[こちら][CPI].

PDA とは何かがわかったので、それらを使用していくつかのアカウントをマッピングしてみましょう。
これがどのように実装されるかを示すために、**ブログ** プログラムの例を取り上げます。

この`ブログ`プログラムでは、各`ユーザー`に 1 つの`ブログ`を作成してもらいます。このブログには、任意の数の`投稿`を含めることができます。
これは、各`ユーザー`を一つの`ブログ`に**マッピング**し、複数の`投稿`を特定の`ブログ`に**マッピング**することを意味します。

つまり、ユーザーとブログの間には `1:1` のマッピングがあり、ブログとその投稿の間には `1:N` のマッピングがあります。

`1:1` マッピングの場合、ブログのアドレスをそのユーザーから**のみ** 取得する必要があります。これにより、権限 (またはユーザー) を指定してブログを取得できます。
したがって、ブログのシードは、その**権限のキー**と、場合によっては「**ブログ**」のプレフィックスで構成され、型別子として機能します。
`1:N` マッピングの場合、各投稿のアドレスは、関連付けられているブログ**だけでなく**、ブログ内の N 個の投稿を区別できる別の**識別子**から取得する必要があります。
以下の例では、各投稿のアドレスは、**ブログのキー**、各投稿を識別するための**スラッグ**、およびタイプ識別子として機能する「**投稿**」のプレフィックスから派生します。

コードは以下のとおりです。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

クライアント側では、 `PublicKey.findProgramAddress()` を使用して必要な`blog`と`post`のアカウント アドレスを取得できます。これを `connection.getAccountInfo()` に渡してアカウント データを取得できます。以下に例を示します。


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 単一のマップ アカウント
マッピングを実装する別の方法は、`BTreeMap` データ構造を単一のアカウントに明示的に格納することです。
このアカウントのアドレス自体は、PDA または生成されたキーペアの公開鍵である可能性があります。

アカウントをマッピングするこの方法は、次の理由により理想的ではありません。

* 必要なキーと値のペアを挿入する前に、まず  `BTreeMap` を格納するアカウントを初期化する必要があります。
次に、毎回更新できるように、このアカウントのアドレスをどこかに保存する必要があります。

* アカウントにはメモリ制限があり、アカウントの最大サイズは **10 メガバイト**であり、`BTreeMap`  が多数のキーと値のペアを格納するには限りがあります。

したがって、ユースケースを検討した後、以下に示すようにこのメソッドを実装できます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

上記のプログラムをテストするクライアント側のコードは、次のようになります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address