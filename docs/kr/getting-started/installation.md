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

## Install Web3.js

Solana에는 javascript와 typescript로 시작하기 위해 사용할 수 있는 몇 가지 라이브러리들이 있습니다.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/)는 통신하고, Transaction들을 보내고, Blockchain으로부터 읽기 위한 기본적인 Solana 도구들이 많이 있는 라이브러리 입니다.

아래와 같이 설치할 수 있습니다.

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

`@solana/spl-token`은 SPL Token들과 통신하기 위한 javascript/typescript의 많은 바인딩들을 포함하는 라이브러리 입니다.
당신은 새로운 SPL Token들을 mint하거나 전송하는 등의 작업을 위해 이것을 사용할 수 있습니다.

아래와 같이 이 라이브러리를 설치할 수 있습니다:

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

Solana와 지갑 연결을 도와주는 wallet-adapter라 불리는 라이브러리 컬렉션이 있습니다.
현재 이 패키지는 Svelte, Angular, Vue.js 그리고 React를 지원합니다.
Wallet-adapter는 [Phantom](https://phantom.app/), [Solflare](https://solflare.com/)와 같은 지갑들을 당신의 dAPP과 빠르게 통합시킬 수 있습니다.

아래와 같이 이 라이브러리를 설치할 수 있습니다:

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

Windows 환경은 [Rust installation site](https://www.rust-lang.org/tools/install)를 첨고해주세요.

## Install CLI

### macOS & Linux

당신이 가장 좋아하는 터미널 앱을 열어주세요.

`LATEST_RELEAS`를 당신이 원하는 버전으로 바꾸고, 당신의 머신에서 [latest Solana release](https://github.com/solana-labs/solana/releases) 아래와 같이 설치하세요:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

당신은 `LATEST_RELEASE`를 당신이 원하는 릴리즈 버전과 매칭되는 태그로 대체할 수 있습니다. 또는 `stable`, `beta`, `edge` 이 세 가지 중 하나를 사용할 수 있습니다.
최신 릴리즈를 알고 싶다면 [여기](https://github.com/solana-labs/solana/releases)를 확인해보세요.

아래 결과는 성공적으로 업데이트 된 것을 보여줍니다:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

당신의 시스템에 따라, installer는 당신에게 다음과 같은 메시지를 보여줄지 모릅니다.

```bash
Please update your PATH environment variable to include the solana programs:
```

만약 위 메시지를 받았다면, `PATH`를 업데이트 하기 위해 아래의 추천 명령어를 복사하고 붙여넣으세요.

설치된 `solana` 버전을 확인하기 위해 아래 명령어를 실행하세요:

```bash
solana --version
```

설치된 후에, `solana-install update`를 사용해 쉽게 Solana 소프트웨어를 새로운 버전으로 업데이트 할 수 있습니다.

#### Downloading Binaries (Linux)

다른 방법으로 당신은 solana-install을 사용하는 대신 바이너리로 설치할 수 있습니다.

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) 
여기에서 **solana-release-x86_64-unknown-linux-msvc.tar.bz2** 압축 파일을 다운로드하고 압축 해제하세요:


```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries (macOS)

다른 방법으로 당신은 solana-install을 사용하는 대신 바이너리로 설치할 수 있습니다.

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) 
여기에서 **solana-release-x86_64-apple-darwin.tar.bz2** 압축 파일을 다운로드하고 압축 해제하세요:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

관리자 권한으로 명령 프롬프트(`cmd.exe`) 열기.

Windows 검색 바에서 명령 프롬프트를 검색하세요. 명령 프롬프트가 나타나면 우클리 하고 "관리자 권한으로 실행하기"를 선택하세요.
만약 "이 앱이 당신의 장치를 변경하는 것을 허용하시겠습니까?" 라는 메시지를 받으면 '예'를 클릭하세요.

Solana installer를 임시 디렉토리에 다운받기 위해 아래의 명령어를 복사 붙여넣기 하고 엔터를 입력하세요:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

만약 당신이 원하는 버전이 `v1.9.16`이 아니라면, [여기](https://github.com/solana-labs/solana/releases)에서 최신 버전을 확인하세요.

Solana 최신 버전을 설치하고 싶다면 아래의 명령어를 복사 붙여넣기 하고 엔터를 입력하세요.
만약 보안 관련 팝업창이 뜬다면, 프로그램이 실행되도록 허락해주세요.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

최신 버전을 알고 싶다면 [여기](https://github.com/solana-labs/solana/releases)를 확인해주세요.

installer가 완료되면 엔터를 눌러주세요.

명령 프롬프트 창을 닫고 새로운 명령 프롬프트 창을 일반 사용자 권한으로 열어주세요.

검색 바에서 "명령 프롬프트"를 검색하고, 명령 프롬프트 앱 아이콘을 좌클릭하세요.(관리자 권한으로 실행할 필요가 없습니다.)

`solana` 버전을 확인하기 위해 아래 명령어를 입력해주세요:

```bash
solana --version
```

설치된 후에, `solana-install update`를 사용해 쉽게 Solana 소프트웨어를 새로운 버전으로 업데이트 할 수 있습니다.

#### Downloading Binaries

다른 방법으로 당신은 solana-install을 사용하는 대신 바이너리로 설치할 수 있습니다.

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) 
여기에서 **solana-release-x86_64-pc-windows-msvc.tar.bz2** 압축 파일을 다운로드하고 압축 해제하세요:

명령 프롬프트를 열고 압축 해제한 디렉토리로 이동한 후 아래 명령어를 실행하세요:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Build From Source

만약 당신이 빌드된 바이너리를 사용할 수 없거나 스스로 소스코드를 빌드하고 싶다면, [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest)
여기로 이동해 **Source Code** 압축 파일을 다운로드하세요.
코드를 추출해서 아래 명령어를 이용해 빌드하세요:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

그러고 나서 아래 명령어를 실행하면 빌드된 바이너리를 이용한 것과 같은 결과를 얻을 수 있습니다:

```bash
solana-install init
```
