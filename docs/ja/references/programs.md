---
title: プログラムの作成
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
  - - meta
    - name: og:description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
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

# プログラムの作成

## プログラムでSOLを転送する方法
Solana プログラムは、システム プログラムを「呼び出す」ことなく、ランポートをあるアカウントから別のアカウントに転送できます。基本的なルールは、プログラムが**所有する**任意のアカウントから任意のアカウントにlamportを転送できることです。

受信者アカウントは、プログラムが所有するアカウントである必要はありません。

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## プログラムでclockを取得する方法

clockを取得するには、2 つの方法があります。

1. `SYSVAR_CLOCK_PUBKEY`をインストラクションに渡す
2. インストラクション内でClockに直接アクセスする

一部のレガシープログラムは依然として`SYSVAR_CLOCK_PUBKEY`を一つのアカウントとして想定しているため、両方の方法を知っておくと便利です。

### インストラクション内のアカウントとしてClockを渡す
初期化用のアカウントとsysvar pubkeyを受け取るインストラクションを作成しましょう。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

ここで、クライアント経由でClockの sysvarパブリックアドレスを渡します

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### インストラクション内でClockに直接アクセスする

先ほどと同様のインストラクションを作成しましょう。ただし、クライアント側からの`SYSVAR_CLOCK_PUBKEY`を想定しないものです

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

クライアント側の命令は、ステータスと支払人のアカウントを渡すだけで済みます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## アカウントサイズの変更方法

`realloc`を使用して、プログラムが所有するアカウントのサイズを変更できます。`realloc`は、最大10KBまでアカウントのサイズを変更できます。
アカウントのサイズを増やすために `realloc` を使用する場合、そのアカウントのrentを免除するためにlamportを転送する必要があります。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## プログラム同士の呼び出し方法

プログラム同士呼び出しは、プログラム内で別のプログラムの命令を呼び出すだけです。最も良い例の 1 つは、Uniswapの`swap`機能です。The 
`UniswapV2Router`コントラクトは、スワップに必要なロジックを呼び出し、`ERC20`コントラクトの転送関数を呼び出して、ある人から別の人にスワップします。 The same way, we can 
同じように、プログラムのインストラクションを呼び出しにはさまざまな目的を持たせることができます。
`SPLトークンの転送`インストラクションの最初の例を見てみましょう。送金に必要なアカウントは次のとおりです。

1. 送り元のsource_token_account (トークンを保持しているアカウント)
2. 送り先のdestination_token_account(トークンを転送するアカウント)
3. 送り元のトークンアカウントの所有者であるsource_token_account_holder (署名するウォレットアドレス)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
対応するクライアントの指示は次のようになります。ミントとトークンの作成手順については、近くにある完全なコードを参照してください。
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

次の例として、`システム プログラムの create_account`インストラクション見てみましょう。前例のインストラクションと次の例には少しの違いがあります。 前例では、`invoke`関数内のアカウントの一つとして`token_program`を渡す必要はありませんでした。ただし、実行しているインストラクションの`program_id`を渡す必要があります。次のケースでは、`システムプログラムの`program_id ("11111111111111111111111111111111")を渡さなければなりません。したがって、必要なアカウントは次のようになります:

1. rentを支払う支払人のアカウント
2. これから作成されるアカウント
3. システムプログラムアカウント

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

それぞれのクライアント側のコードは次のようになります

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## PDAの作成方法

プログラム派生アドレスは、プログラムが所有する単なるアカウントですが、秘密鍵がありません。代わりに、一連のシードとバンプ (カーブから外れていることを確認するナンス) によって署名が取得されます。プログラムアドレスを「**生成**」することは、それを「**作成**」することとは異なります。`Pubkey::find_program_address`を使用してPDAを生成できます。PDAを作るということは、基本的にアドレスをスペースで初期化し、ステートを設定することを意味します。通常のキーペアアカウントは、プログラムの外部で作成し、そのステートを初期化するために提供されます。 残念ながらPDAの場合、それ自体に代わって署名できないという性質上のため、オンチェーンで作成されています。したがって、`invoke_signed`を使用して、PDA のシードと、PDA のアカウント作成につながる資金調達アカウントの署名を渡します。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

One can send the required accounts via client as follows

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## アカウントの読み込み方法

Solanaのほとんどのインストラクションは少なくとも2〜3個のアカウントを必要とし、それらのアカウントセットをどのような順番で期待するかは、インストラクションハンドラで指定されることになります。 Rust の`iter()`メソッドを利用すれば、アカウントを手動で指定するより簡単です。`next_account_info`メソッドは基本的に iterableの最初のインデックスをスライスし、accounts配列内に存在するアカウントを返します。多数のアカウントを想定し、それぞれを解析する必要がある簡単なインストラクションを見てみましょう。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## アカウントを検証する方法

Solana のプログラムはステートレスであるため、プログラムの作成者は、渡されたアカウントが可能な限り検証されていることを確認して、悪意のあるアカウントのエントリを回避する必要があります。基本的に可能なチェックは、

1. 予想される署名者アカウントが実際に署名されているかどうかを確認
2. 予期される状態のアカウントが書き込み可能としてチェックされているかどうかを確認
3. 期待される状態のアカウントの所有者が呼び出されたプログラム ID であるかどうかを確認
4. 初めて状態を初期化する場合に、アカウントが既に初期化されているかどうかを確認
5. 渡されたクロスプログラムIDが(必要に応じて)期待どおりかどうかを確認

hello_state_accountアカウントを初期化し、上記のチェックを行う基本的なインストラクションを以下に定義します

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## トランザクションから複数のインストラクションを読み取る方法

Solanaは、現在のトランザクションのすべてのインストラクションの確認が可能で、それらを変数に格納して、反復処理が可能です。これにより疑わしいトランザクションのチェックなど、多くのことができます。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
