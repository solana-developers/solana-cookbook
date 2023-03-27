---
title: プログラム派生アドレス(PDA)
head:
  - - meta
    - name: title
      content: Solana Cookbook | PDAs
  - - meta
    - name: og:title
      content: Solana Cookbook | PDAs
  - - meta
    - name: description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Solana cookbook.
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

# プログラム派生アドレス(PDAs)

プログラム派生アドレス(Program Derived Addresses/PDAs)は、特定のプログラムによって制御されるように設計されたアカウントのホームです。
PDA を使用すると、プログラムは秘密鍵を必要とせずに特定のアドレスにプログラムで署名できます。
PDAは、Solanaアプリを互いに構成可能にする[Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)の基盤として機能します。

## Facts

::: tip Fact Sheet
- PDAは公開鍵のように見える32byteの文字列ですが、対応する秘密鍵はありません。
- `findProgramAddress` は、programId とシード (byteのコレクション) から決定論的に PDA を導出します。
- bump (1 byte) 潜在的な PDA を ed25519 楕円曲線から押し出すために使用されます。
- プログラム[invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts) にシードとバンプを提供することでPDAに署名できます。
- PDAは派生元のプログラムによってのみ署名できます。
- プログラムがさまざまな命令に署名できるようにするだけでなく、PDAは[indexing accounts](../guides/account-maps.md)のためのハッシュマップのようなインターフェイスも提供します。
:::

## 詳細

PDAは、Solanaでプログラムを開発するための不可欠な構成要素です。<br>
PDAを使用すると、外部ユーザーが同じアカウントに対して有効な署名を生成できないことを保証しつつ、プログラムはアカウントに署名できます。<br>
加えて、特定のプログラムは、PDA に保持されているアカウントを変更することもできます。

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### PDA の生成

PDAの背後にある概念を理解するには、PDA は技術的に作成されるのではなく、発見されるものであると考えると役立つ場合があります。<br>
PDA は、シード (`“vote_account”`文字列など) とプログラムIDの組み合わせから生成されます。 <br>
次に、シードとプログラム ID のこの組み合わせを sha256 ハッシュ関数に渡し、ed25519楕円曲線上にある公開鍵が生成されるかどうかを確認します。

これにより、最大50%の確率で楕円曲線上に存在する有効な公開鍵が実際に取得できます。その場合は、入力値に調整を加え再度実行します。<br>
この追加の調整を技術用語ではbumpと言います。Solanaでは、bump値は255で始まり、
楕円曲線に存在しないアドレスが取得できるまで bump = 254, bump = 253...と値を1ずつ下げて繰り返します。 
これは初歩的なことのように思えるかもしれませんが、一度見つかれば、同じPDAは決定論的な方法により何度も導出が可能です。

![PDA on the ellipitic curve](./pda-curve.png)

### PDAと対話する

PDA が生成されると、`findProgramAddress` 楕円曲線からアドレスをはじき出すために使用されるbumpとアドレスの両方を返却します。
このbumpを備えたプログラムは、PDA を必要とする命令に[sign](../references/accounts.md#sign-with-a-pda)できます。
署名するために、プログラムは命令、アカウントのリスト、PDA の派生に使用されるシードとbumpを `invoke_signed` に渡す必要があります。
命令に対する署名に加えて、PDAは`invoke_signed`を介して自身の生成に対しても署名する必要があります。

PDAを備えたビルドの際には、[bump seedをアカウントデータ自体に保存する](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100)のが一般的です。
これにより、開発者はbumpを命令の引数として渡すことなく、PDAを簡単に検証できます。

## その他参考資料
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
