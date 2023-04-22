---
title: データのシリアライゼーション
head:
  - - meta
    - name: title
      content: Solana Cookbook | Serializing Data
  - - meta
    - name: og:title
      content: Solana Cookbook | Serializing Data
  - - meta
    - name: description
      content: Learn how to serialize and deserialize data on Solana
  - - meta
    - name: og:description
      content: Learn how to serialize and deserialize data on Solana
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

# Serializing Data

ここでは、シリアライゼーションはデータのシリアライズとデシリアライズ両方を意味します。

シリアライゼーションは、Solana プログラムとプログラム アカウントのライフサイクルのいくつかのポイントで機能します。

1. クライアントへの命令データのシリアライズ
2. プログラム上の命令データのデシリアライズ 
3. プログラムでのアカウントデータのシリアル化
4. クライアントでのアカウントデータのデシリアライズ

同じシリアライゼーションアプローチで上記のアクションすべてがサポートされていることが重要です。
含まれているスニペットは [Borsh](#resources)を使用したシリアルライゼーションのデモです。

残りのサンプルは、[Solana CLI Program Template](#resources)からの抜粋です。

## Setting up for Borsh Serialization

Borsh のライブラリは、Rust プログラム、Rust クライアント、Node、Python クライアント用にセットアップする必要があります。

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## クライアントで命令データをシリアル化する方法

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

アウトバウンド命令データをシリアライズしてプログラムに送信する場合、プログラムは対象的にインバウンド命令データのデシリアライズが必要です。

このテンプレートでは、命令データ ブロックはシリアル化された配列で、次の例が含まれます:

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | not applicable for instruction | not applicable for instruction |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | not applicable for instruction |
| Burn (2)                    | "foo"                          | not applicable for instruction |

次の例では、プログラムが所有するアカウントが初期化されていると想定しています

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## プログラムの命令データをデシリアライズする方法

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## プログラムの命令データをデシリアライズする方法

<img src="./serialization/ser3.png" alt="Account Data Serialization">

サンプルリポジトリのプログラムアカウントデータブロック は次のようなレイアウトです。

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| 初期化フラグ | シリアル化されたBTreeMapの長さ | BTreeMap (Key Valueが格納される場所)) |

### Pack

 [Pack][1] トレイトについて少し触れておきます。

Pack トレイトを使用すると、アカウント データのシリアライゼーション/デシリアライゼーションの詳細をコア プログラム命令処理から簡単に隠ぺいすることができます。
したがって、すべてのシリアル化/逆シリアル化ログをプログラム処理コードに入れる代わりに、下記3つの関数の背後にある詳細をカプセル化します。:

1. `unpack_unchecked` - アカウントが初期化されているかどうかを確認せずに、アカウントをデシリアライズできます。これは、実際に初期化関数 (variant index 0) を処理している場合に役立ちます。 
2. `unpack` - `unpack_from_slice` の Pack 実装を呼び出し、アカウントが初期化されているかどうかを確認します。
3. `pack` - `pack_into_slice` の Pack 実装を呼び出します。

サンプル プログラムの Pack トレイトの実装を次に示します。これに続いて、borsh を使用したアカウント データの実際の処理が行われます。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### シリアライゼーション/デシリアライゼーション 

基礎となるシリアライゼーションとデシリアライゼーションを完了するには:

1. `sol_template_shared::pack_into_slice` - 実際にシリアライズが実行される場所
2. `sol_template_shared::unpack_from_slice` - 実際にデシリアライズが実行される場所

**注意**  `BTREE_STORAGE` の前にある `BTREE_LENGTH` のデータ レイアウトに `u32` (4 bytes) の パーティションがあることに注意してください。
これは、逆シリアル化中に borsh が、逆シリアル化するスライスの長さが、
受信オブジェクトが実際に再結合される前に読み取ったデータの量と一致することを確認するためです。以下に示すアプローチでは、最初に `BTREE_LENGTH`  を読み取り、
`BTREE_STORAGE` ポインターから`slice`するサイズを取得します。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 使用方法

以下はすべてをまとめて、キー/値ペアの基礎となる `BTreeMap` だけでなく、初期化フラグをカプセル化する `ProgramAccountState`とプログラムがどのように対話するかを示しています。

最初に、完全新規のアカウントを初期化したい場合:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

クライアントから命令を送信するときに上で示した新しいキーと値のペアを作成する方法を以下に示します:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## クライアントでアカウント データをデシリアライズする方法

クライアントは Solana を呼び出して、シリアル化されたデータ ブロックがリターンの一部である、プログラムが所有するアカウントを取得できます。
逆シリアル化には、データブロックのレイアウトを知る必要があります。
データアカウントのレイアウトは[こちら](#account-data-serialization)で解説しています。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## 一般的な Solana TS/JS マッピング

[Borsh Specification](#resources)には、プリミティブおよび複合データ型のほとんどのマッピングが含まれています。

TS/JS と Python の鍵は、適切な定義を使用して Borsh スキーマを作成することです。これにより、シリアライズとデシリアライズがそれぞれの入力を生成または処理できるようになります。

ここでは、プリミティブ (数値、文字列) と複合型 (固定サイズの配列、マップ) のシリアライズ、デシリアライズを、Typescript、Python、Rustで示します。:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## より高度な構造

前の例で単純なペイロードを作成する方法を示しました。時々、Solanaは特定の種類の速球を投げます。 このセクションでは、TS/JS と Rust の間の適切なマッピングを示して、それらを処理します。

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## その他参考資料

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
