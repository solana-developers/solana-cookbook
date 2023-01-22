---
title: トランザクション
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transaction are bundles of Multiple operational units on Solana. Learn more about Transaction and Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Multiple operational units on Solana can be bundled into a single unit called Transaction. Learn more about Core Concepts at The Solana cookbook.
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

# トランザクション

クライアントは、トランザクションをクラスターに送信することで [programs](./programs.md) を呼び出せます。<br> 
1 つのトランザクションに複数のInstructions(命令)を含めることができ、それぞれが独自のプログラムを対象としています。
トランザクションが送信されると、Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) は
その命令を順番にかつ、アトミックに処理します。<br>
つまり、一部の命令が失敗すると、トランザクション全体が失敗として処理されます。

## 概要

::: tip Fact Sheet
- Instructions(命令) は、Solana の最も基本的な操作単位です。
- それぞれの命令には次のものが含まれます。:
    - 目的のプログラムの `program_id`
    - 読書を行う予定のすべての `accounts` を格納する配列
    - 目的のプログラムに固有の `instruction_data` バイト配列
- 複数の命令を 1 つのトランザクションにまとめることができます。
- それぞれのトランザクションには次のものが含まれます。:
    - 読書を行う予定のすべての `accounts` を格納する配列
    - 1 つ以上の `instructions`(命令)
    - 最近の `blockhash`
    - 1 つ以上の `signatures`(署名)
- 命令は順番に、かつアトミックに処理されます。
- 一部の命令が失敗すると、トランザクション全体が失敗として処理されます。
- トランザクションは 1232 バイトに制限されています。
:::

## 詳細

Solanaランタイムでは、命令やトランザクションで読み書きを行う予定のアカウントすべてのリストが明示されている必要があります。 <br>
これにより、ランタイムはすべてのトランザクションの並列実行が可能になります。

トランザクションがクラスターに送信されると、ランタイムはその命令を順番にアトミックに処理します。
命令ごとに、受信側プログラムはデータ配列を解釈し、指定されたアカウントを操作します。 <br>
プログラムは正常終了するか、エラーコードを返し、エラーが返された場合、トランザクション全体がすぐに失敗します。

アカウントの引き落としまたはそのデータの変更を目的とするトランザクションには、 アカウント所有者のの署名が必要です。
変更されるすべてのアカウントは `writable`としてマークされます。 <br>
取引手数料の支払者が必要なrentと取引手数料を賄うことができれば、アカウントは所有者の許可なく入金することが可能です。

送信する前に、すべてのトランザクションは [最近のblockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)を確認する必要があります。blockhashは重複を防ぎ、古いトランザクションを排除するために使用されます。この記事の執筆時点で、トランザクションのブロックハッシュの最大経過時間は 150 ブロック、つまり約 1 分 19 秒です。

### 手数料

Solana ネットワークは 2 種類の料金を徴収します:
- トランザクションを伝播するための[Transaction fees](https://docs.solana.com/transaction_fees)(別名「ガス料金」)
- オンチェーンデータ保存のための[Rent fees](https://docs.solana.com/developing/programming-model/accounts#rent)

Solana では、取引手数料は決定論的です。ユーザーが次のブロックに含まれる可能性を高めるために、より高い手数料を支払うことができる手数料市場の概念はありません。 <br>
この記事の執筆時点では、トランザクション料金は、使用されるリソースの量ではなく、必要な署名の数 (つまり、lamports_per_signature) によってのみ決定されます。
これは、現在すべてのトランザクションに 1232 バイトの厳しい制限があるためです。

すべてのトランザクションには、トランザクションに署名するための `writable` なアカウントが少なくとも 1 つ必要です。
送信されると、最初にシリアル化された `writable` な署名者アカウントが料金の支払い者になります。 <br>
このアカウントは、トランザクションの成功または失敗に関係なく、トランザクションの費用を支払います。
手数料の支払者が取引手数料を支払うのに十分な残高を持っていない場合、取引は中止されます。

この記事の執筆時点では、すべての取引手数料の 50% がブロックを生成するバリデーターによって収集され、残りの 50% はバーンされます。 <br>
この構造により、リーダースケジュールのslot中にできるだけ多くのトランザクションを処理するバリデーターにインセンティブを与えるよう機能します。

## その他参考資料

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
