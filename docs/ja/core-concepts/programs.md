---
title: プログラム
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Programs
  - - meta
    - name: description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
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

# プログラム

開発者は誰でもプログラムを作成してSolanaブロックチェーンにデプロイできます。
プログラム(他のプロトコルではスマートコントラクトとして知られることが多い)は、
オンチェーンアクティビティの基盤として機能し、DeFi や NFT、ソーシャルメディアやゲームに至るまで、あらゆるものを強化します。

## 概要

::: tip Fact Sheet
- プログラムは、エンドユーザーからと、他のプログラムからの [instructions](./transactions) の両方を処理します。
- すべてのプログラムはステートレスです。プログラムがやり取りするすべてのデータは、命令を介して渡される個別の [accounts](./accounts.md) に保存されます。
- プログラム自体は、`executable`としてマークされたアカウントに保存されます
- すべてのプログラムは [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) によって所有され、[Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)　によって実行されます。
- 開発者は、Rust または C++ でプログラムを作成するのが最も一般的ですが、[LLVM](https://llvm.org/) の [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)  バックエンドを対象とする任意の言語を選択できます。 
- すべてのプログラムには、命令処理が行われる単一のエントリ ポイント (つまり、`process_instruction`) があります。パラメータには常に以下が含まれます。
    - `program_id`: `pubkey`(公開鍵)
    - `accounts`: `array` (配列)
    - `instruction_data`: `byte array`(バイト配列)
:::

## 詳細

他のほとんどのブロックチェーンとは異なり、Solanaはコードとデータを完全に分離します。
プログラムがやり取りするすべてのデータは個別のアカウントに保存され、instructionsを介して参照として渡されます。
このモデルは、追加のデプロイを必要とせずに1つの汎用プログラムをさまざまなアカウントで動作させることを可能にします。
このパターンの一般的な例は、Native Programsと SPL(The Solana Program Library)で見られます。

### Native Programs & The Solana Program Library (SPL)

Solana には、オンチェーンインタラクションの中核の構成要素として機能する多数のプログラムが搭載されています。
これらのプログラムは、 [Native Programs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) と [Solana Program Library (SPL) Programs](https://spl.solana.com/)に分けられます。

ネイティブプログラムは、バリデータの操作に必要な基本機能を提供します。
これらのプログラムの中で最もよく知られているのは、新しいアカウントの管理と2者間での SOLの転送を担当する [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program) です。

SPL プログラムは、トークンの作成、交換、貸付、ステークプールの生成、オンチェーンネームサービスの維持など、多くのオンチェーン アクティビティをサポートします。 [SPL Token Program](https://spl.solana.com/token)CLI 経由で直接呼び出すことができますが、 [Associated Token Account Program](https://spl.solana.com/associated-token-account) は通常、カスタム プログラムで構成されています。

### プログラミング

プログラムはRustまたはC++で開発されるのが最も一般的ですが、LLVMのBPFバックエンドをターゲットとする任意の言語で開発できます。
[Neon Labs](https://neon-labs.org/) と [Solang](https://solang.readthedocs.io/en/latest/) 最近の取り組みにより、 [EVM](https://ethereum.org/en/developers/docs/evm/)との互換性が実現し、開発者がSolidityでプログラムを書けるようになりました。

ほとんどの Rust ベースのプログラムは、次のアーキテクチャに準拠しています。:

| ファイル名           | 説明                                   |
|----------------|-----------------------------------------------|
| lib.rs         | モジュールの登録                           |
| entrypoint.rs  | プログラムへのエントリポイント                     |
| instruction.rs | プログラム API、命令データのシリアライズ、デシリアライズ |
| processor.rs   | プログラムロジック                                 |
| state.rs       | プログラムオブジェクト、シリアライズ、デシリアライズのステータス       |
| error.rs       | プログラム固有のエラー                      |

 近年は、[Anchor](https://github.com/coral-xyz/anchor) が人気の開発フレームワークとして登場しています。
Anchor は、Ruby on Rails に似た独自のフレームワークであり、定型文を削減し、Rust ベースの開発の (デ) シリアル化プロセスを合理化します。

プログラムは通常、Testnet または Mainnet にデプロイされる前に、Localhost および Devnet 環境に対して開発およびテストされます。
 Solana は以下の環境をサポートしています:

| クラスタ環境  | RPC Connection URL                                                       |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

各環境にデプロイ後、クライアントはそれぞれのクラスターへの [RPC接続](https://docs.solana.com/developing/clients/jsonrpc-api) 
を介してオンチェーンプログラムと対話が可能です。

### デプロイ

開発者は [CLI](https://docs.solana.com/cli/deploy-a-program)経由でプログラムをデプロイ可能です。:

```bash
solana program deploy <PROGRAM_FILEPATH>
```

プログラムがデプロイされると、[ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (BPF バイトコードを含む) にコンパイルされ、Solana クラスターにアップロードされます。
プログラムは (Solana の他のすべてと同様に) アカウントに存在しますが、これらのアカウントは `executable` としてマークされ、BPF Loaderに割り当てられます。
このアカウントのアドレスは `program_id` と呼ばれ、今後のすべてのトランザクションでプログラムを参照するために使用されます。

Solana は複数の BPF ローダーをサポートしており、最新のものは [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111)です。
BPF Loaderはプログラムアカウントを管理し、program_id を介してクライアントが利用できるようにする責務を負います。
すべてのプログラムには、命令処理が行われる単一のエントリ ポイント (`process_instruction`) があり、パラメータには常に次のものが含まれます。:

- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

呼び出されると、プログラムは Solana ランタイムによって実行されます。

## その他参考資料

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
