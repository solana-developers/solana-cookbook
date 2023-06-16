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

## I-install ang Web3.js

Mayroong ilang mga library na magagamit mo upang makapagsimula sa javascript o typescript sa Solana.


### Web3.js

Ang [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) ay isang library na mayroong maraming pangunahing tool sa Solana para makipag-ugnayan, magpadala ng mga transaksyon, at magbasa mula sa blockchain.

Maaari mong i-install gamit ang sumusunod:

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

Ang `@solana/spl-token` ay isang library na naglalaman ng marami sa mga javascript/typescript binding na kailangan upang makipag-ugnayan sa mga SPL token.
Magagamit mo ang library na ito para gumawa ng mga bagong SPL token, maglipat ng mga token, at higit pa.

Maaari mong i-install ang library na ito gamit ang sumusunod:

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

Mayroong isang koleksyon ng mga library na makakatulong sa mga koneksyon sa bootstrap na wallet sa loob ng Solana na tinatawag na wallet-adapter.
Sa kasalukuyan, sinusuportahan ng package ang paggamit sa loob ng Svelte, Angular, Vue.js, at React. Maaring mabilis na simulan ng Wallet-adapter ang iyong dApp
pagsasama sa mga wallet tulad ng [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), at higit pa.

Maaari mong i-install ang library na ito gamit ang sumusunod:

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

Para sa Windows, pakibisita ang [Rust installation site](https://www.rust-lang.org/tools/install).

## I-install ang CLI

### macOS at Linux

Buksan ang iyong paboritong Terminal application.

Palitan ang `LATEST_RELEASE` ng gusto mong bersyon at i-install ang [pinakabagong release ng Solana](https://github.com/solana-labs/solana/releases) sa iyong makina sa pamamagitan ng pagpapatakbo:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Maaari mong palitan ang `LATEST_RELEASE` ng katugmang tag ng release
ang software na bersyon ng iyong gustong release, o gumamit ng isa sa tatlong simbolikong
mga pangalan ng channel: `stable`, `beta`, o `edge`. Upang mahanap ang pinakabagong release, tingnan
available ang mga bersyon [dito](https://github.com/solana-labs/solana/releases).

Ang sumusunod na output ay nagpapahiwatig ng isang matagumpay na pag-update:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Depende sa iyong system, ang pagtatapos ng pagmemensahe ng installer ay maaaring mag-prompt sa iyo
sa

```bash
Please update your PATH environment variable to include the solana programs:
```

Kung makuha mo ang mensahe sa itaas, kopyahin at i-paste ang inirerekomendang command sa ibaba
ito upang i-update ang `PATH`.

Kumpirmahin na na-install mo ang gustong bersyon ng `solana` sa pamamagitan ng pagpapatakbo:

```bash
solana --version
```

Pagkatapos ng matagumpay na pag-install, madaling magamit ang `solana-install update`
i-update ang Solana software sa isang mas bagong bersyon anumang oras.

#### Downloading Binaries (Linux)

Bilang kahalili, maaari kang mag-install mula sa mga binary sa halip na gumamit ng solana-install.

I-download ang mga binary sa pamamagitan ng pag-navigate sa
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
i-download ang **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, pagkatapos ay i-extract ang
archive:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Nagda-download ng Binary (macOS)

Bilang kahalili, maaari kang mag-install mula sa mga binary sa halip na gumamit ng solana-install.

I-download ang mga binary sa pamamagitan ng pag-navigate sa
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
i-download ang **solana-release-x86_64-apple-darwin.tar.bz2**, pagkatapos ay i-extract ang
archive:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Magbukas ng Command Prompt (`cmd.exe`) bilang Administrator.

Maghanap ng Command Prompt sa Windows search bar. Kapag ang Utos
Lumilitaw ang prompt na app, i-right-click at piliin ang "Buksan bilang Administrator".
Kung sinenyasan ka ng isang pop-up window na nagtatanong ng "Gusto mo bang payagan ang app na ito
gumawa ng mga pagbabago sa iyong device?”, i-click ang 'Oo'.

Kopyahin at i-paste ang sumusunod na command, pagkatapos ay pindutin ang Enter upang i-download ang Solana
installer sa isang pansamantalang direktoryo:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Kung hindi ang `v1.9.16` ang gusto mong bersyon, hanapin ang pinakabagong release [dito](https://github.com/solana-labs/solana/releases).

Kopyahin at i-paste ang sumusunod na command, pagkatapos ay pindutin ang Enter upang i-install ang pinakabago
bersyon ng Solana. Kung makakita ka ng pop-up ng seguridad ng iyong system, mangyaring piliin
upang payagan ang programa na tumakbo.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Upang mahanap ang pinakabagong release, tingnan
available ang mga bersyon [dito](https://github.com/solana-labs/solana/releases).

Kapag tapos na ang installer, pindutin ang Enter.

Isara ang command prompt window at muling buksan ang isang bagong command prompt window bilang a
normal na gumagamit.

Hanapin ang "Command Prompt" sa search bar, pagkatapos ay mag-left-click sa
Icon ng Command Prompt na app (hindi na kailangang tumakbo bilang Administrator).

Kumpirmahin na na-install mo ang gustong bersyon ng `solana` sa pamamagitan ng paglalagay ng:

```bash
solana --version
```

Pagkatapos ng matagumpay na pag-install, madaling magamit ang `solana-install update`
i-update ang Solana software sa isang mas bagong bersyon anumang oras.

#### Nagda-download ng mga Binary

Bilang kahalili, maaari kang mag-install mula sa mga binary sa halip na gumamit ng solana-install.

I-download ang mga binary sa pamamagitan ng pag-navigate sa
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
i-download ang **solana-release-x86_64-pc-windows-msvc.tar.bz2**, pagkatapos ay i-extract ang
archive gamit ang WinZip o katulad.

Magbukas ng Command Prompt at mag-navigate sa direktoryo kung saan mo kinuha
ang mga binary at tumakbo:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Bumuo Mula sa Source

Kung hindi mo magagamit ang mga prebuilt na binary o mas gusto mong itayo ito sa iyong sarili
mula sa pinagmulan, mag-navigate sa
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
at i-download ang **Source Code** archive. I-extract ang code at buuin ang
binary na may:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Maaari mong patakbuhin ang sumusunod na command upang makuha ang parehong resulta tulad ng sa
prebuilt na binary:

```bash
solana-install init
```
