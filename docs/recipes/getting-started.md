---
title: Installation
---

## Install Web3JS

There's a few libraries that you can use to get you started with javascript or typescript on Solana.<br/>

### Web3.js

`@solana/web3.js` is a library that has a lot of the basic Solana tools to interact, send transactions, and read from the chain.

You can install using the following:

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

`@solana/spl-token` is a library that contains many of the javascript/typescript bindings to interact with spl-tokens.
    You can use this library to mint, transfer, and more with spl-tokens.

You can install this library with one of the following:

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

There is a collection of libraries that can help bootstrap wallet connections within Solana called wallet-adapter.
    Currently the package supports use within Angular, Vue.js, and React. Wallet-adapter can quickstart your dApp
    integration with wallets like Phantom, Solflare, and more.

You can install this library with the following:

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

## Install Mac M1

Currently the recommended path for installation on a mac m1 would be to use Rosetta Terminal, for both installation and running the CLI tools and solana-test-validator.

Here is a full guide on the process:
[Mac M1 Solana Install Guide](https://dev.to/nickgarfield/how-to-install-solana-dev-tools-on-an-m1-mac-kfn)


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

For Windows, please visit the [Rust installation site](https://www.rust-lang.org/tools/install).

## Install CLI

### MacOS & Linux

Open your favorite Terminal application

Replace `LATEST_RELEASE` with your desired version and install the [latest Solana release](https://github.com/solana-labs/solana/releases) on your
machine by running:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

You can replace `LATEST_RELEASE` with the release tag matching
the software version of your desired release, or use one of the three symbolic
channel names: `stable`, `beta`, or `edge`. To find the latest release, check 
versions available [here](https://github.com/solana-labs/solana/releases).

The following output indicates a successful update:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Depending on your system, the end of the installer messaging may prompt you
to

```bash
Please update your PATH environment variable to include the solana programs:
```

If you get the above message, copy and paste the recommended command below
it to update `PATH`
Confirm you have the desired version of `solana` installed by running:

```bash
solana --version
```

After a successful install, `solana-install update` may be used to easily
update the Solana software to a newer version at any time.

#### Downloading Binaries(Linux)

Alternatively you can build from binaries instead of using solana-install.

Download the binaries by navigating to
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
download **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, then extract the
archive:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries(MacOS)

Alternatively you can build from binaries instead of using solana-install.

Download the binaries by navigating to
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
download **solana-release-x86_64-apple-darwin.tar.bz2**, then extract the
archive:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Open a Command Prompt (`cmd.exe`) as an Administrator

Search for Command Prompt in the Windows search bar. When the Command
Prompt app appears, right-click and select “Open as Administrator”.
If you are prompted by a pop-up window asking “Do you want to allow this app to
make changes to your device?”, click Yes.

Copy and paste the following command, then press Enter to download the Solana
installer into a temporary directory:

```bash
curl https://release.solana.com/v1.8.5/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

If `v1.8.5` is not your desired version, find the latest release [here](https://github.com/solana-labs/solana/releases).

Copy and paste the following command, then press Enter to install the latest
version of Solana. If you see a security pop-up by your system, please select
to allow the program to run.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.8.5
```

To find the latest release, check
versions available [here](https://github.com/solana-labs/solana/releases).

When the installer is finished, press Enter.

Close the command prompt window and re-open a new command prompt window as a
normal user
Search for "Command Prompt" in the search bar, then left click on the
Command Prompt app icon, no need to run as Administrator)
Confirm you have the desired version of `solana` installed by entering:

```bash
solana --version
```

After a successful install, `solana-install update` may be used to easily
update the Solana software to a newer version at any time.

#### Downloading Binaries

Alternatively you can build from binaries instead of using solana-install.

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