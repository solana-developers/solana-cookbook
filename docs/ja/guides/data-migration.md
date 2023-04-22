---
title: プログラム データ アカウントの移行
head:
  - - meta
    - name: title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: og:title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
  - - meta
    - name: og:description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
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

# プログラム データ アカウントの移行

## プログラムのデータ アカウントを移行するにはどうすればよいですか？

プログラムを作成すると、そのプログラムに関連付けられた各データ アカウントは特定のデータ構造を持ちます。
プログラムから派生したアカウントをアップグレードする必要がある場合は、古い構造のプログラムから派生したアカウントがたくさん残っていることになります。

アカウントのバージョン管理により、古いアカウントを新しい構造にアップグレードできます。

:::tip Note
これは、プログラム所有アカウント (POA) でデータを移行する多くの方法の 1 つにすぎません。
:::

## Scenario

アカウント データのバージョン管理と移行を行うために、各アカウントに **ID** を提供します。この ID により、プログラムに渡すときにアカウントのバージョンを識別できるため、アカウントを正しく処理できます。

次のような状態のアカウントとプログラムを取得します。

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

最初のバージョンのアカウントでは、次のことを行っています。

| ID | Action |
| - | - |
|1| データに「データ バージョン」フィールドを含めます。これは単純な増分序数 (u8 など)や、より洗練されたものにすることがでるはずです。
|2| データの増加に十分なスペースを割り当てます。
|3| プログラムのバージョン間で使用される多数の定数の初期化
|4| 将来のアップグレードのために `fn conversion_logic` の下に更新アカウント関数を追加します

プログラムのアカウントをアップグレードして、新しい必須フィールドである  `somestring`  フィールドを含めるとします。

以前のアカウントに余分なスペースを割り当てなかった場合、アカウントをアップグレードできず、スタックしてしまうことになります。

## アカウントのアップグレード

新しいプログラムでは、コンテンツ状態の新しいプロパティを追加したいと考えています。この後の変更は、初期のプログラム構成をどのように利用するかということです。

### 1. アカウント変換ロジックを追加する

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Line(s) | Note |
| ------- | - |
| 6 | Solana の `solana_program::borsh::try_from_slice_unchecked` を追加して、より大きなデータ ブロックからのデータのサブセットの読み取りを簡素化しました。
| 13-26| ここでは、17 行目から始まる `AccountContentCurrent`  を拡張する前に、古いコンテンツ構造である `AccountContentOld` 行 24 を保持しています。
| 60 | `DATA_VERSION`定数を増やします
| 71 | 以前のバージョンのデータサイズがわかるようにします。
| 86 | とどめの一撃は、以前のコンテンツの状態を新しい (現在の) コンテンツの状態にアップグレードする配管を追加することです。

次に、`somestring` 命令を更新して、文字列を更新するための新しい命令と、新しい命令を処理するためのプロセッサを追加します。データ構造の「アップグレード」は、`pack/unpack`の背後にカプセル化されていることに注意してください。

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

 `VersionProgramInstruction::SetString(String)`命令を作成して送信することで、次の「アップグレードされた」アカウント データ レイアウトができました。

<img src="./data-migration/pav2.png" alt="Program Account v2">

## その他参考資料

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)