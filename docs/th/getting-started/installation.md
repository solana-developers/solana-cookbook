---
title: การติดตั้ง
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การติดตั้ง
  - - meta
    - name: og:title
      content: คู่มือ Solana | การติดตั้ง
  - - meta
    - name: description
      content: เริ่มต้นเรียนรู้ Solana ด้วยแบบฝึกหัด, แนวทาง และตัวอย่าง.
  - - meta
    - name: og:description
      content: เริ่มต้นเรียนรู้ Solana ด้วยแบบฝึกหัด, แนวทาง และตัวอย่าง.
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

## ติดตั้ง Web3.js

จะมี libraries บางตัวที่คุณสามารถใช้มันเริ่มเขียน javascript หรือ typescript บน Solana.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) คือ library ที่มีเครื่องมือพื้นฐานมากมายสำหรับการทำงานเบื้องต้น, ส่ง transactions, หรือเอาไว้อ่านข้อมูลจาก blockchain.

คุณสามาถติดตั้งได้ตามนี้:

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

`@solana/spl-token` คือ library ที่ประกอบไปด้วย javascript/typescript ที่เอาไว้ทำงานกับ SPL tokens คุณสามารถใช้ library นี้ mint SPL tokens ใหม่, ส่ง token และอื่นๆ อีกมากมาย

คุณสามาถติดตั้ง library ได้ตามนี้:

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


จะมี libraries ที่ช่วยทำให้ wallet สามารถติดต่อกับ Solana เรียกว่า wallet-adapter
ตอนนี้จะมี package รองรับการใช้งานร่วมกับ Svelte, Angular, Vue.js, และ React. Wallet-adapter จะช่วย dApp ให้ติดต่อกับ wallets อย่าง [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), และ wallets อื่นๆ 

คุณสามาถติดตั้ง library ได้ตามนี้:

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

## ติดตั้ง Rust

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

สำหรับ Windows กรุณาไปที่ [Rust installation site](https://www.rust-lang.org/tools/install).

## ติดตั้ง CLI

### macOS & Linux

เปิด Terminal ของคุณขึ้นมา

แล้วแทนที่ `LATEST_RELEASE` ด้วย version ที่คุณต้องการ และติดตั้ง [Solana release ล่าสุด](https://github.com/solana-labs/solana/releases) บนเครื่องของคุณด้วยการ run:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

คุณสามารถแทน `LATEST_RELEASE` ด้วย release tag ที่ตรงกับ version ที่คุณต้องการ หรือใช้ channel `stable`, `beta`, หรือ `edge` ก็ได้
ถ้าอยากรู้ว่า release ล่าสุดคืออะไรลองไปดู [ที่นี่](https://github.com/solana-labs/solana/releases).

ถ้า update สำเร็จจะเจอ output แบบข้างล่างนี้ :

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

ตอนติดตั้งขั้นสุดท้ายอาจจะมีข้อความยืนยัน ซึ่งจะแตกต่างกันไประหว่างระบบ

```bash
Please update your PATH environment variable to include the solana programs:
```

ถ้าเจอข้อความนี้ ให้คัดลอก และวางคำสั่งตามที่ขึ้นแนะนำเพื่อที่จะ update `PATH`

ลอง run คำสั่งนี้เพื่อยืนยันการติดตั้ง `solana` ว่า version ตรงกับที่ต้องการ:

```bash
solana --version
```

หลังจากที่ติดตั้งสำเร็จแล้ว เราสามารถใช้คำสั่ง `solana-install update` เพื่อ update Solana เมื่อไหร่ก็ได้ตามต้องการ

#### Downloading Binaries (Linux)

นอกจากนี้ คุณยังสามารถติดตั้งจาก binaries แทนที่จะใช้ solana-install ได้ด้วย

ทำการโหลด binaries โดยไปที่
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
โหลด **solana-release-x86_64-unknown-linux-msvc.tar.bz2** แล้วแตก archive:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries (macOS)

นอกจากนี้ คุณยังสามารถติดตั้งจาก binaries แทนที่จะใช้ solana-install ได้ด้วย

ทำการโหลด binaries โดยไปที่
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
โหลด **solana-release-x86_64-apple-darwin.tar.bz2**, แล้วแตก archive:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

เปิด Command Prompt (`cmd.exe`) ในฐานะ Administrator.

ค้นหา Command Prompt ด้วย Windows search bar. เมื่อ Command
Prompt app ปรากฏ, click ขวาและเลือก “Open as Administrator”.
ถ้าเจอ pop-up ถามว่า “Do you want to allow this app to
make changes to your device?”, ให้ตอบ 'Yes'.

คัดลอก และวางคำสั่งด้านล่าง และกด Enter เพื่อโหลด Solana installer ลงใน temporary directory:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

ถ้า `v1.9.16` ไม่ใช่ version ที่คุณต้องการ ให้ลองไปหา release อื่นๆ [ที่นี่](https://github.com/solana-labs/solana/releases).

คัดลอก และวางคำสั่งด้านล่าง และกด Enter เพื่อติดตั้ง Solana version ล่าสุด ถ้าเจอ pop-up ก็ให้เลือก allow เพื่อ run program

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

ถ้าต้องการหา release อื่นๆ ให้ไป [ที่นี่](https://github.com/solana-labs/solana/releases).

เมื่อติดตั้งสำเร็จให้กด Enter.

ปิดหน้าต่าง command prompt และเปิด command prompt ใหม่ในฐานะ user

ค้นหา Command Prompt ด้วย search bar กด click ซ้ายที่ Command Prompt app icon (ไม่ต้อง run ด้วย Administrator)

ลอง run คำสั่งนี้เพื่อยืนยันการติดตั้ง `solana` ว่า version ตรงกับที่ต้องการ:

```bash
solana --version
```

หลังจากที่ติดตั้งสำเร็จแล้ว เราสามารถใช้คำสั่ง `solana-install update` เพื่อ update Solana เมื่อไหร่ก็ได้ตามต้องการ

#### Downloading Binaries

นอกจากนี้ คุณยังสามารถติดตั้งจาก binaries แทนที่จะใช้ solana-install ได้ด้วย

ทำการโหลด binaries โดยไปที่
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
โหลด **solana-release-x86_64-pc-windows-msvc.tar.bz2**, แล้วแตก archive ด้วย WinZip หรือโปรแกรมอื่นๆ

เปิด Command Prompt แล้วไปที่ directory ที่แตก archive ไว้แล้ว run คำสั่ง:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Build From Source

ถ้าคุณไม่สามารถใช้ prebuilt binaries หรืออยากจะ build เองให้ไปที่ 
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
และโหลด **Source Code** archive. แตก code ออกมา และ build binaries ด้วยคำสั่ง:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

คุณสามารถ run คำสั่งด้านล่างเพื่อให้ได้ผลแบบเดียวกับ prebuilt binaries:

```bash
solana-install init
```
