---
title: 機能パリティテスト
head:
  - - meta
    - name: title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: og:title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
  - - meta
    - name: og:description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
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

# 機能パリティテスト

プログラムをテストするとき、さまざまなクラスターで同じように実行されることを保証することは、品質と期待される結果の生成の両方にとって不可欠です。

## 概要

::: tip Fact Sheet
- Featuresとは、Solana バリデーターに導入され、使用するにはアクティベーションが必要な機能です。
- Featuresはあるクラスター (例: testnet) でアクティブ化される場合がありますが、別のクラスター (例: mainnet-beta) ではアクティブ化されません。
- しかし、 `solana-test-validator`  をローカルで実行すると、Solana バージョンで利用可能なすべての機能が自動的に有効になります。Solanaバージョンは自動的にアクティベートされます。その結果、ローカルでテストする場合、テストの機能と結果は、別のクラスターで展開して実行する場合と同じではない可能性があります。
:::

## シナリオ
3 つの命令を含むトランザクションがあり、各命令が約 100_000 計算ユニット (CU) を消費するとします。Solana 1.8.x バージョンで実行すると、次のような命令 CU 消費が観察されます。:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

Solana 1.9.2 では、トランザクションがデフォルトで 200_000 CU 予算を持ち、カプセル化された命令がそのトランザクション予算から **_引き出される_** 'transaction wide compute cap(トランザクション全体の計算上限)' と呼ばれる機能が導入されました。上記と同じトランザクションを実行すると、動作が大きく異なります:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Yikes!これを知らなかった場合は、これを引き起こすようなインストラクションの挙動変更がなかったため、イライラする可能性があります。ローカルでは失敗してしまった!?

トランザクションの予算を300_000CUに増やすことで、正気を保つことができます。and salvage your sanity
しかし、これは**_機能パリティ_** を使ったテストが、混乱を避けるための積極的な方法であることを示しています。

## 機能ステータス
`solana feature status`コマンドを使用して、特定のクラスターで有効になっている機能を簡単に確認できます。
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

または、[scfsd](#resources) などのツールを使用して、表示されるクラスター全体のすべての機能の状態を観察することもできます。これは、ここに示されている部分的な画面であり、 `solana-test-validator`を実行する必要はありません。:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## パリティテスト
上記のように、`solana-test-validator` は**すべて**の機能を自動的に有効にします。では、「devnet、testnet、または mainnet-beta と同等の環境でローカルにテストするにはどうすればよいですか?」という問いにはどうすべきでしょうか？

解決策: Solana 1.9.6 に PR が追加され、機能を非アクティブ化できるようになりました:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## 簡単なデモンストレーション
エントリポイントで受信したデータをログに記録する単純なプログラムがあるとします。また、プログラムに 2 つのインストラクションを実行するトランザクションをテストしています。 

### アクティブなすべての機能
1. 1 つのターミナルでテスト バリデータを起動します:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. 別のターミナルでログストリーマーを開始します:
```console
solana logs
```

3. 次に、トランザクションを実行します。ログターミナルにも同様のものが表示されます (わかりやすくするために編集されています)。:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
私たちの機能 'transaction wide compute cap'は自動的に有効になっており、200_000CUのトランザクションバジェットから、各命令がCUを引き出していることがわかります。

### 非アクティブな選択機能
1. この実行では、CU 予算の動作が devnet で実行されているものと同等になるように実行したいと考えています。 [Feature Status](#feature-status)で説明されているツールを使用して、 `transaction wide compute cap` 公開キーを分離し、テスト バリデータの起動時に
`--deactivate-feature` を使用します。

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. 現在、すべてのアップストリーム クラスターの状態である独自の 200_000 CU 予算 (わかりやすくするために編集されています) が命令にあることがログに表示されます:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## 完全なパリティテスト
 `solana-test-validator` を呼び出す際、まだアクティブでない各機能を特定してそれぞれに`--deactivate-feature <FEATURE_PUBKEY>`を追加することで、特定のクラスタと同等の振る舞いが可能です:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

また、[scfsd](#resources) はコマンド スイッチを提供して、クラスターが `solana-test-validator` スタートアップに直接フィードするための完全な非アクティブ化された機能セットを出力します。:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

バリデーターの実行中に別のターミナルを開き、`solana feature status`を見ると、devnet で非アクティブ化されている機能が非アクティブ化されていることがわかります。

## プログラムでの完全パリティテスト
テスト コード内でテスト バリデーターの実行を制御する場合は、TestValidatorGenesis を使用して、テスト バリデーターのアクティブ化/非アクティブ化機能を変更できます。 
Solana 1.9.6 では、これをサポートする関数がバリデータ ビルダーに追加されました。

プログラム フォルダーのルートに`tests`フォルダーを作成し、`parity_test.rs`ファイルを追加します。
以下は、各テストで使用されるボイラープレース関数 (ボイラープレート) です。

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

これで、`mod test {...}`の本体にテスト関数を追加して、デフォルトのバリデータ設定(すべての機能が有効になっている状態)と、
コマンドラインから`solana-test-validator`を実行する前の例のような`transaction wide compute cap`のデモが可能になりました。

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

また、[scfs engine gadget](#resources) は、クラスターの非アクティブ化された機能の完全なベクトルを生成できます。
以下は、そのエンジンを使用して、devnet の非アクティブ化されたすべての機能のリストを取得する方法を示しています。

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Happy Testing!


## その他参考資料
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)