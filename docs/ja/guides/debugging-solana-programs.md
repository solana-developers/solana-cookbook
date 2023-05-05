---
title: Solanaプログラムのデバッグ
head:
  - - meta
    - name: title
      content: Solana Cookbook | Debugging Solana Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Debugging Solana Programs
  - - meta
    - name: description
      content: There are a number of options and supporting tools for testing and debugging a Solana BPF program.
  - - meta
    - name: og:description
      content: There are a number of options and supporting tools for testing and debugging a Solana BPF program.
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

# Solanaプログラムのデバッグ

Solana プログラムをテストおよびデバッグするためのオプションとサポート ツールが多数あります。

## Facts

::: tip Fact Sheet
- クレート `solana-program-test`を使用すると、必要最小限の **_local runtime_** ローカル ランタイムを使用して、プログラムを対話的に(vscodeなどで)テストおよびデバッグできます。
- クレート`solana-validator` を使用すると、`solana-test-validator` 実装を使用して、**_ローカルバリデータノード_**で行われるより堅牢なテストを実行できます。エディターから実行できますが、**プログラム内のブレークポイントは無視されます**。
- `solana-test-validator`CLI ツールは、は、プログラムを実行およびロードし、コマンドライン Rust アプリケーションまたは web3 を使用する Javascript/Typescript アプリケーションからのトランザクション実行を処理します。
- 上記のすべてについて、`msg!` を自由に使用してくださいプログラム内のマクロは、最初は削除することをお勧めします。その後、テストを行って堅実な動作を確認するときに削除します。`msg!`を覚えておいてください。計算ユニットを消費し、最終的に計算ユニットの予算上限に達してプログラムが失敗する可能性があります。
:::

以下のセクションの手順では[solana-program-bpf-template](#resources)を使用します。それを自分のマシンにクローンします:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Runtime Testing and Debugging in editor

 `src/lib.rs`ファイルを開く

プログラムは非常に単純で、基本的にはプログラムのエントリポイント関数によって受信されたコンテンツをログに記録するだけであることがわかります: `process_instruction`

1. `#[cfg(test)]` セクションに移動し、`Run Test`をクリックします。 これにより、プログラムがビルドされ、`async fn test_transaction()` テストが実行されます。ソースの下の vscode ターミナルにログ メッセージ (simplified)が表示されます。
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. ブレイクポイントをプログラムの`msg!`がある(11)列目に設定します。
3. テストモジュールに戻り、`Debug`をクリックすると、数秒以内にデバッガーがブレークポイントで停止し、データを調べたり、関数をステップ実行したりなどができるようになります。

これらのテストは、コマンド ラインからも実行できます:
`cargo test` または `cargo test-bpf`。 もちろん、ブレークポイントがあっても無視されます。

How groovy can you get!

:::tip Note
バリデータノードを使用していないため、デフォルトのプログラム、ブロックハッシュなどは表示されないか、バリデータノードで実行したときのように動作しないことに注意してください。  これが、Solana のギャングが Local Validator Node のテストを提供してくれた理由です!
:::


## Local Validator Node Testing in editor

ローカル バリデータ ノードのプログラムによる読み込みを使用した統合テストは、`tests/integration.rs`ファイルで定義されています。

デフォルトでは、テンプレートリポジトリの統合テストは、`cargo test-bpf`を使用してコマンド ラインからのみ実行できます。 次の手順を実行すると、エディタ内で実行できるだけでなく、プログラムバリデータログと`msg!`を表示することもできます。プログラムからの出力:

1. repoディレクトリで`cargo build-bpf`を実行してサンプル プログラムをビルドします。
2. エディターで`tests/integration.rs`を開きます。
3. 1行目の`// #![cfg(feature = "test-bpf")]`をコメントアウトします。
4. 19行目を次のように変更します`.add_program("target/deploy/bpf_program_template", program_id)`
5. 22行目に以下を挿入`solana_logger::setup_with_default("solana_runtime::message=debug");`
6. `test_validator_transaction()`の上にある`Run Test`をクリックします。

これはバリデータノードをロードし、トランザクションを構築し（Rustの方法）、`RcpClient`を使用してノードに送信できるようにします。

プログラムの出力は、エディター ターミナルにも出力されます。例、(simplified):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
ここでデバッグすると、**_テスト本体_**で使用されている関数とメソッドをデバッグできますが、プログラムのブレークポイントはできません。

The bee's knees eh?

## Local Validator Node Testing from Client Apps
最後に、ローカルの検証ノードを開始し、コマンドラインから`solana-test-validator`を使用してプログラムとアカウントをロードできます。

このアプローチでは、Rust [RcpClient](#resources)を使用するか、
[JavaScript または Typescript clients](#resources)でクライアント アプリケーションが必要になります。

詳細とオプションについては、`solana-test-validator --help` を参照してください。サンプルプログラムの場合、ここにバニラのセットアップがあります:
1. repoフォルダーでターミナルを開きます。
2. `solana config set -ul`を実行して、構成がローカルを指すように設定します。
3. `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`を実行します。
4. 別のターミナルを開き、`solana logs` を実行してログ ストリーマーを開始します。
5. その後、クライアント プログラムを実行し、ログ ストリーマーを開始したターミナルでプログラムの出力を確認できます。

Now that is the cat's pajamas YO!

## その他参考資料
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
