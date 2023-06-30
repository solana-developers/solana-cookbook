---
title: 安裝
head:
  - - meta
    - name: title
      content: Solana祕籍 | 安裝
  - - meta
    - name: og:title
      content: Solana祕籍 | 安裝
  - - meta
    - name: description
      content: 利用教程、指南和例子，學習如何開始使用Solana。
  - - meta
    - name: og:description
      content: 利用教程、指南和例子，學習如何開始使用Solana。
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

## 安裝Web3.js

用JavaScript或者TypeScript進行Solana編程時，你會用到下面的幾個庫。

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/)
這個庫提供了很多用於與Solana交互，發送交易，從區塊鏈上讀取數據等操作的基礎功能。

可以用以下命令安裝：

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

### SPL代幣（SPL-Token）

`@solana/spl-token` 這個庫提供了很多用於與SPL代幣（SPL tokens）交互所需的JavaScript/TypeScript綁定函數。
    可以用這個庫來鑄造新的SPL代幣，進行轉賬，以及其他操作。

可以用以下命令安裝：

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

### 錢包適配器（Wallet-Adapter）

這是一組用於連接Solana公鏈錢包的庫，稱爲錢包適配器。
    目前這些軟件包支持Angular，Vue.js，以及React。錢包適配器可以幫助你的dApp很快的與諸如[Phantom](https://phantom.app/)，
    [Solflare](https://solflare.com/)以及其他一些錢包進行整合。

可以用以下命令安裝：

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

## 安裝Rust

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

Windows用戶請參閱[Rust安裝指引](https://www.rust-lang.org/tools/install).

## 安裝命令行工具

### macOS & Linux

打開Terminal。

將 `LATEST_RELEASE` 替換爲你想要的版本，用以下腳本在你的系統上安裝 [最新版本Solana](https://github.com/solana-labs/solana/releases)：

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

可以將`LATEST_RELEASE`替換成你想要的發佈版本，或者用三個別名版本：`stable`，`beta`，`edge`。
可以在[這裏](https://github.com/solana-labs/solana/releases)查看可用的最新版本。

如果看到以下輸出，說明更新成功：

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

根據不同的系統，安裝包可能提示你

```bash
Please update your PATH environment variable to include the solana programs:
```

如果看到以上提示信息，複製這下面輸出的命令並粘貼到系統的`PATH`目錄中。

用以下命令確認你已經安裝好指定版本的`solana`：

```bash
solana --version
```

安裝成功後，可以使用`solana-install update`命令，隨時將Solana軟件更新到新版本。

#### 下載預編譯二進制文件 （linux）

除了通過`solana-install`安裝之外，你還可以通過二進制文件安裝。

訪問以下鏈接下載二進制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下載 **solana-release-x86_64-unknown-linux-msvc.tar.bz2**，並解壓：

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### 下載預編譯二進制文件 （macOS）

除了通過`solana-install`安裝之外，你還可以通過二進制文件安裝。

訪問以下鏈接下載二進制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下載 **solana-release-x86_64-apple-darwin.tar.bz2**，並解壓：

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

以管理員權限打開命令提示符（`cmd.exe`）。

在Windows搜索欄中搜索"命令提示符"，在顯示出來的命令提示符應用上點擊右鍵，選擇"以管理員身份運行"。
當彈出對話框詢問"你要允許此應用對你的設備進行更改嗎？"，點擊"是"。

複製並粘貼以下命令，按回車鍵，將Solana安裝包下載到臨時文件夾：

```bash
curl https://release.solana.com/v1.8.5/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

如果`v1.8.5`不是你想要的版本，在[這裏](https://github.com/solana-labs/solana/releases)可以找到最新的版本。

複製並粘貼以下命令，然後按回車鍵，安裝最新版的Solana。當系統彈出安全對話框時，選擇允許程序運行。

```bash
C:\solana-install-tmp\solana-install-init.exe v1.8.5
```

安裝包安裝完成時，按回車鍵。

關掉命令提示符窗口。重新以普通用戶權限打開一個命令提示符窗口。

在Windows搜索欄中搜索"命令提示符"，在顯示出來的命令提示符應用上點擊左鍵（這次不需要以管理員身份運行）。

用以下命令確認已經安裝好指定版本的`solana`：

```bash
solana --version
```

安裝成功後，可以使用`solana-install update`命令，隨時將Solana軟件更新到新版本。

#### 下載預編譯二進制文件

除了通過`solana-install`安裝之外，你還可以通過二進制文件安裝。

訪問以下鏈接下載二進制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下載 **solana-release-x86_64-pc-windows-msvc.tar.bz2**並解壓。

打開命令提示符並切換目錄至剛纔解壓的位置，運行以下命令：

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### 從源碼編譯

如果你不能使用預編譯的二進制文件，或者希望自己從源碼進行編譯，可以訪問
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest)，
下載**Source Code**壓縮包。解壓代碼，用以下命令編譯二進制文件：

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

然後運行以下命令，可以和預編譯二進制文件獲得一樣的結果：

```bash
solana-install init
```
