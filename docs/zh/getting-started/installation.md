---
title: 安装
head:
  - - meta
    - name: title
      content: Solana秘籍 | 安装
  - - meta
    - name: og:title
      content: Solana秘籍 | 安装
  - - meta
    - name: description
      content: 利用教程、指南和例子，学习如何开始使用Solana。
  - - meta
    - name: og:description
      content: 利用教程、指南和例子，学习如何开始使用Solana。
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

## 安装Web3.js

用JavaScript或者TypeScript进行Solana编程时，你会用到下面的几个库。<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/)
这个库提供了很多用于与Solana交互，发送交易，从区块链上读取数据等操作的基础功能。

可以用以下命令安装：

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

### SPL代币（SPL-Token）

`@solana/spl-token` 这个库提供了很多用于与SPL代币（SPL tokens）交互所需的JavaScript/TypeScript绑定函数。
    可以用这个库来铸造新的SPL代币，进行转账，以及其他操作。

可以用以下命令安装：

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

### 钱包适配器（Wallet-Adapter）

这是一组用于连接Solana公链钱包的库，称为钱包适配器。
    目前这些软件包支持Angular，Vue.js，以及React。钱包适配器可以帮助你的dApp很快的与诸如[Phantom](https://phantom.app/)，
    [Solflare](https://solflare.com/)以及其他一些钱包进行整合。

可以用以下命令安装：

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

## 安装Rust

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

Windows用户请参阅[Rust安装指引](https://www.rust-lang.org/tools/install).

## 安装命令行工具

### macOS & Linux

打开Terminal。

将 `LATEST_RELEASE` 替换为你想要的版本，用以下脚本在你的系统上安装 [最新版本Solana](https://github.com/solana-labs/solana/releases)：

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

可以将`LATEST_RELEASE`替换成你想要的发布版本，或者用三个别名版本：`stable`，`beta`，`edge`。
可以在[这里](https://github.com/solana-labs/solana/releases)查看可用的最新版本。

如果看到以下输出，说明更新成功：

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

根据不同的系统，安装包可能提示您

```bash
Please update your PATH environment variable to include the solana programs:
```

如果看到以上提示信息，复制这下面输出的命令并粘贴到系统的`PATH`目录中。

用以下命令确认你已经安装好指定版本的`solana`：

```bash
solana --version
```

安装成功后，可以使用`solana-install update`命令，随时将Solana软件更新到新版本。

#### 下载预编译二进制文件 （linux）

除了通过`solana-install`安装之外，你还可以通过二进制文件安装。

访问以下链接下载二进制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下载 **solana-release-x86_64-unknown-linux-msvc.tar.bz2**，并解压：

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### 下载预编译二进制文件 （macOS）

除了通过`solana-install`安装之外，你还可以通过二进制文件安装。

访问以下链接下载二进制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下载 **solana-release-x86_64-apple-darwin.tar.bz2**，并解压：

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

以管理员权限打开命令提示符（`cmd.exe`）。

在Windows搜索栏中搜索"命令提示符"，在显示出来的命令提示符应用上点击右键，选择"以管理员身份运行"。
当弹出对话框询问"你要允许此应用对你的设备进行更改吗？"，点击"是"。

复制并粘贴以下命令，按回车键，将Solana安装包下载到临时文件夹：

```bash
curl https://release.solana.com/v1.8.5/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

如果`v1.8.5`不是你想要的版本，在[这里](https://github.com/solana-labs/solana/releases)可以找到最新的版本。

复制并粘贴以下命令，然后按回车键，安装最新版的Solana。当系统弹出安全对话框时，选择允许程序运行。

```bash
C:\solana-install-tmp\solana-install-init.exe v1.8.5
```

安装包安装完成时，按回车键。

关掉命令提示符窗口。重新以普通用户权限打开一个命令提示符窗口。

在Windows搜索栏中搜索"命令提示符"，在显示出来的命令提示符应用上点击左键（这次不需要以管理员身份运行）。

用以下命令确认已经安装好指定版本的`solana`：

```bash
solana --version
```

安装成功后，可以使用`solana-install update`命令，随时将Solana软件更新到新版本。

#### 下载预编译二进制文件

除了通过`solana-install`安装之外，你还可以通过二进制文件安装。

访问以下链接下载二进制文件：
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
下载 **solana-release-x86_64-pc-windows-msvc.tar.bz2**并解压。

打开命令提示符并切换目录至刚才解压的位置，运行以下命令：

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### 从源码编译

如果你不能使用预编译的二进制文件，或者希望自己从源码进行编译，可以访问
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest)，
下载**Source Code**压缩包。解压代码，用以下命令编译二进制文件：

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

然后运行以下命令，可以和预编译二进制文件获得一样的结果：

```bash
solana-install init
```
