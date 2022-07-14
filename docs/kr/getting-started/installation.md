---
title: Installation
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

## Web3.js 설치하기

솔라나 개발에 요구되는 javascript와 typescript를 사용하기 위하여 필요한 라이브러리들이 있습니다.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) 는 솔라나와 통신, transaction 보내기, 블록체인 데이터 읽기 등 다양한 솔라나 툴을 제공하는 라이브러리입니다.
디음과 같이 설치할 수 있습니다:

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

`@solana/spl-token` 은 SPL token과 통신하기 위한 javascript/typescript 바인딩을 포함하고 있는 라이브러리입니다.
본 라이브러리를 이용하여 새로운 SPL token을 발행, 전송 등 다양한 기능을 이용할 수 있습니다.

다음과 같이 라이브러리를 설치할 수 있습니다:

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

wallet-adapter 는 솔라나 지갑 연결을 위한 여러 라이브러리를 포함하고 있습니다. 현재 본 패키지는 Svele, Angular, Vue.js, 와 React를 지원하고 있습니다. Wallet-adapter를 이용하여 dApp에 [Phantom](https://phantom.app/), [Solflare](https://solflare.com/)과 같은 지갑 서비스를 쉽게 내장할 수 있습니다. 
다음과 같이 라이브러리를 설치할 수 있습니다:

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

## Rust 설치하기

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

윈도우에서 설치하기 위해서는 [Rust installation site](https://www.rust-lang.org/tools/install)을 방문해주세요.

## CLI 설치하기

### macOS & Linux

사용자가 친숙한 Terminal을 열어주세요.


`LATEST_RELEASE`를 이용하고자 하는 version으로 세팅 후 [최신 솔라나 버전](https://github.com/solana-labs/solana/releases)을 다음과 같이 설치해주세요:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

`LATEST_RELEASE`를 사용하고자 하는 소프트웨어 버전으로 대체하거나 다음 세가지 채널 이름: `stable`, `beta`, `edge`을 이용해주세요. 가장 최신 버전을 확인하기 위해서 [이 곳](https://github.com/solana-labs/solana/releases)을 방문하세요.

다음 output을 이용하여 업데이트 성공 여부를 확인하세요:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

사용자의 시스템에 따라 installer 메시지 마지막에 아래에 있는 가이드가 나올 수 있습니다.

```bash
Please update your PATH environment variable to include the solana programs:
```

위에 보이는 메시지가 나올 시, 다음 command를 이용하여 `PATH`에 업데이트 해주세요.

이용하고자하는 솔라나 버전이 맞는지 확인하기 위하여 다음 command를 활용하세요:

```bash
solana --version
```

설치 후, `solana-install update`를 이용하여 새로운 버전으로 업데이트가 가능합니다.
#### Binaries 설치하기 (Linux)

solana-install을 사용하지 않고 binaries를 설치하여 이용할 수 있습니다.

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) 로 이동, **solana-release-x86_64-unknown-linux-msvc.tar.bz2** 를 설치 후 압축을 풀어 binaries를 설치할 수 있습니다:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Binaries 설치하기 (macOS)

solana-install을 사용하지 않고 binaries를 설치하여 이용할 수 있습니다.


[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) 로 이동, **solana-release-x86_64-apple-darwin.tar.bz2** 를 설치 후 압축을 풀어 binaries를 설치할 수 있습니다:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Command Prompt (`cmd.exe`)를 Administrator 권한으로 열어주세요.

윈도우 검색바에서 Command Prompt (명령 프롬프트)를 찾아주세요. 우클릭을 하여 "관리자 권한으로 실행"을 눌러주세요.

다음 command를 복사 붙여넣기 후 엔터를 눌러 솔라나 설치기를 temporary directory에 설치하세요:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

`v1.9.16` 외에 다른 버전을 사용하고 싶다면 [여기](https://github.com/solana-labs/solana/releases)에서 최신 release를 볼 수 있습니다.

다음 command를 복사 붙여넣기 후 엔터를 눌러 최신 버전의 솔라나를 설치하세요. 만약 보안 팝업이 켜진다면 프로그램 실행을 선택해주세요.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

최신 버전과 다른 버전은 [여기](https://github.com/solana-labs/solana/releases)에서 확인할 수 있습니다.

설치가 완료되면 확인을 눌러주세요.
/
Command prompt를 닫고 새로운 command prompt를 일반 유저로 열어주세요.

다음 커맨드를 이용하여 `solana` 버전을 확인해주세요:

```bash
solana --version
```

After a successful install, `solana-install update` may be used to easily
update the Solana software to a newer version at any time.

#### Downloading Binaries

Alternatively, you can install from binaries instead of using solana-install.

Download the binaries by navigating to
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
download **solana-release-x86_64-pc-windows-msvc.tar.bz2**, then extract the
archive using WinZip or similar.

Open a Command Prompt and navigate to the directory into which you extracted
the binaries and run:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Build From Source

If you are unable to use the prebuilt binaries or prefer to build it yourself
from source, navigate to
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
and download the **Source Code** archive. Extract the code and build the
binaries with:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

You can then run the following command to obtain the same result as with
prebuilt binaries:

```bash
solana-install init
```
