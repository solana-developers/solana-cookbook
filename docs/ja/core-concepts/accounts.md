---
title: アカウント
head:
  - - meta
    - name: title
      content: Solana Cookbook | Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Accounts
  - - meta
    - name: description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
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

# アカウント

Solanaにおけるアカウントは状態の保存に利用される、Solana開発における必要不可欠な構成要素です。

## 概要

::: tip Fact Sheet

- アカウントはデータの保存に使用されます。
- それぞれのアカウントは一位のアドレスを持ちます。
- アカウントが保持できるデータの最大容量は10MB (10 Mega Bytes)です。
- PDAアカウントが保持できるデータの最大容量は10KB (10 Kilo Bytes)です。
- PDA アカウントはプログラムに代わり、署名の実行に使用できます。
- アカウントのサイズは作成時に固定されますが、[realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)を使用して変更可能です。
- アカウントのデータストレージに対し、rent(家賃)が支払われます。
- デフォルトのアカウント所有者はシステムプログラムです。
  :::

## 詳細

### アカウントモデル

Solanaには三種類のアカウントがあります。:

- 「データアカウント」はデータの保存を行います。
- 「プログラムアカウント」は実行可能プログラムの保存を行います。
- 「ネイティブアカウント」は、System、Stake、VoteなどのSolanaのネイティブプログラムを意味します。

データアカウントには、さらに二種類のアカウントがあります。:

- システムが所有するアカウント
- PDA (プログラム派生アドレス/Program Derived Address) アカウント

各アカウントは、アドレス(通常は公開鍵)と所有者(プログラムアカウントのアドレス)を持ちます。
アカウントが保存するすべてのフィールドを下記のリストに示します。

| フィールド名      | 説明                                    |
| ---------- | ---------------------------------------------- |
| lamports   | このアカウントが所有するlamportsの数   |
| owner      | このアカウントを所有するプログラムオーナー              |
| executable | 支持された処理を処理可能かどうか  |
| data       | このアカウントによって保存された生データのバイト配列 |
| rent_epoch | このアカウントが家賃を支払う次のepoch |

所有に関していくつかの重要な規則があります。:

- データ アカウントの所有者のみがそのデータを変更し、ランポートを引き落とすことができます。
- データアカウントへのlamportsの入金は誰でも可能です。
- アカウントのデータがゼロになっている場合、アカウントの所有者は新しい所有者を割り当てることができます。

プログラム アカウントは状態を保存しません。

たとえば、counterという数値をインクリメントするカウンタプログラムの場合、
カウントアップを実行するプログラムを格納するプログラムアカウントと、counterの数値を保存するデータアカウントの 2 つのアカウントを作成する必要があります。

![](./account_example.jpeg)

アカウントが削除されないようにするためには、家賃(rent)を払い続ける必要があります。

### rent(家賃)
データアカウントにデータを保存し続けるためにはSOLの支払いが必要となり、
これはrent(家賃)と呼ばれるものにより賄われることになります。
口座に2年分の家賃の支払いに相当する最低残高を維持している場合、あなたのwalletは家賃の支払いが免除されます。
rentは、アカウントを閉鎖しlamportsをwalletに送り返すことで回収できます。

rentは次の二つのタイミングで支払われます。:

1. トランザクションに参照されたとき
2. epochごと

アカウントにより収集された割合のrentが破棄され、残りは各slotの最後に投票アカウントに分配がされます。

アカウントが家賃を支払うのに十分な残高を持たない場合、アカウントの割り当ては解除されデータが削除されます。

新しいアカウントは家賃の支払いが免除されることにも注意が必要です。

## その他参考資料

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

Pencilflipの功績によりこのページは作成されました。[Twitterをフォロー](https://twitter.com/intent/user?screen_name=pencilflip).
