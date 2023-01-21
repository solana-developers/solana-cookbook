---
title: インストール
head:
  - - meta
    - name: title
      content: Solana Cookbook | Installation
  - - meta
    - name: og:title
      content: Solana Cookbook | Installation
  - - meta
    - name: description
      content: Learn how to get started on Solana with tutorials, guides, and examples.
  - - meta
    - name: og:description
      content: Learn how to get started on Solana with tutorials, guides, and examples.
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

## Install Web3.js

下記のjavascript や typescript のライブラリを用いてSolanaと対話が可能です。<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/)　は、
トランザクションの送信、対話、ブロックチェーンの読み取りといったSolanaの基本的なツールを多数備えたライブラリです。

下記に従いインストールが可能です。:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### SPL-Token

`@solana/spl-token` はSPL トークンと対話するために必要な javascript/typescript の多くのバインディングを持つライブラリで、
SPLトークンのmintや送信などが実行できます。

下記に従いインストールが可能です。:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### Wallet-Adapter
wallet-adapterと呼ばれるライブラリ群は、ウォレット接続の起動に役立ちます。
現在のところ、Svelte, Angular, Vue.js, Reactをサポートしています。
Wallet-adapterは、あなたのdAppsと[Phantom](https://phantom.app/)や[Solflare](https://solflare.com/)などの
ウォレットと統合が可能です。

下記に従いインストールが可能です。:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>
</CodeGroup>

## Install Rust

<CodeGroup>
  <CodeGroupItem title="MACOS" active>

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
  <CodeGroupItem title="LINUX">

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
</CodeGroup>

Windowsについてはこちらを確認してください。[Rust installation site](https://www.rust-lang.org/tools/install).

## Install CLI

### macOS & Linux

お好きなターミナルアプリを起動してください。
次のコマンドを実行して最新の[latest Solana release](https://github.com/solana-labs/solana/releases)をインストールします。<br>
LATEST_RELEASE の部分は、目的のバージョンがあれば後述する内容に適宜置き換えてください。:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

`LATEST_RELEASE` の部分は、お望みのバージョンに一致するリリースタグか、
 `stable`, `beta`, `edge`のシンボリックチャネル名に置き換えが可能です。: 
利用可能なバージョンは次のリンクを参照してください。 [here](https://github.com/solana-labs/solana/releases)

次のようなログが出力されれば、アップデートは完了です。:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

システムによっては、インストーラ メッセージの最後に、次のようなメッセージが表示されます。

```bash
Please update your PATH environment variable to include the solana programs:
```

この場合は、推奨されるコマンドをコピペして`PATH`を更新してください。

以下を実行して、必要なバージョンの `solana`  がインストールされていることを確認します。

```bash
solana --version
```

インストール完了後、`solana-install update` でいつでも簡単にSolanaを最新版へ更新することができます。

#### Downloading Binaries (Linux)

solana-installの代わりに、バイナリファイルからインストールも可能です。

[次のページ](https://github.com/solana-labs/solana/releases/latest)から、**solana-release-x86_64-unknown-linux-msvc.tar.bz2**をダウンロードします。
次に、ダウンロードしたファイルを解凍します。:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries (macOS)

solana-installの代わりに、バイナリファイルからインストールも可能です。

[次のページ](https://github.com/solana-labs/solana/releases/latest)から、**solana-release-x86_64-apple-darwin.tar.bz2**をダウンロードします。
次に、ダウンロードしたファイルを解凍します。:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

コマンドプロンプト(`cmd.exe`) を管理者として起動します。

Windowsの検索ボックスからコマンドプロンプトを検索し、
右クリックから 「管理者として実行」をクリックします。
「このアプリがデバイスに変更を加えることを許可しますか？」というポップアップが出た場合は、
「はい」をクリックします。

次のコマンドをコピー&ペースト、Enter キーを押して実行し、 Solana インストーラーを一時フォルダにダウンロードします。:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

 `v1.9.16`が希望するバージョンではない場合、[ここ](https://github.com/solana-labs/solana/releases)から最新版を確認してください。

次のコマンドをコピー&ペースト、Enterキーを押して最新バージョンの Solana をインストールします。
システムによってセキュリティポップアップが表示された場合は、プログラムの実行を許可してください。

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

最新のリリースを見つけるには、[ここ](https://github.com/solana-labs/solana/releases)で利用可能なバージョンを確認してください。

インストーラーが終了したら、Enter キーを押します。 
コマンドプロンプトを閉じて、通常のユーザーとして再度実行します。

検索バーで「コマンド プロンプト」を検索し、コマンド プロンプト アプリのアイコンを左クリックします。
(管理者として実行する必要はありません)。

以下を実行して、必要なバージョンの `solana`  がインストールされていることを確認します。:

```bash
solana --version
```

インストール完了後、`solana-install update` でいつでも簡単にSolanaを最新版へ更新することができます。

#### Downloading Binaries

solana-installの代わりに、バイナリファイルからインストールも可能です。

[次のページ](https://github.com/solana-labs/solana/releases/latest)から、 **solana-release-x86_64-pc-windows-msvc.tar.bz2**をダウンロードします。
次に、ダウンロードしたファイルを解凍します。:

コマンド プロンプトを開き、バイナリを解凍したディレクトリに移動して、次のコマンドを実行します。:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Build From Source

ビルド済みのバイナリを使用できない場合や、ソースから自分でビルドしたい場合は、
[ここ](https://github.com/solana-labs/solana/releases/latest)に移動し、**Source Code**アーカイブをダウンロードしてください。
解凍後、次のコマンドでビルドします。

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

次のコマンドを実行して、ビルド済みバイナリと同じ結果を得ることができます。:

```bash
solana-install init
```
