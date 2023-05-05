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

## Install Web3.js (Web3.js Kurulumu)

Solana'da Javascript veya TypeScript kullanmaya başlamak için birkaç kütüphane bulunur.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) etkileşim kurmak, işlem göndermek ve blok zincirinden bilgi okumak için birçok temel Solana aracına sahip bir kütüphanedir.

Aşağıdaki kod satırı ile bu kütüphaneyi kurabilirsiniz:

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

`@solana/spl-token` SPL Token'ları ile etkileşim kurmak için gereken birçok javascript/typescript bağlantılarını içeren bir kitaplıktır.
Bu kitaplığı yeni SPL Token'ları mintlemek (basmak), transfer etmek ve daha fazlasını yapmak için kullanabilirsiniz.

Aşağıdaki kod satırı ile bu kütüphaneyi kurabilirsiniz:

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

### Wallet Adapter (Cüzdan Adaptörü)

Solana içinde ‘wallet-adapter’ adı verilen, cüzdan bağlantılarının kurulmasına yardımcı olabilecek bir kütüphane vardır.
Paket şu anda Svelte, Angular, Vue.js ve React içinde kullanımı desteklemektedir. *Wallet-adapter*, [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), gibi cüzdanlarla dApp entegrasyonunuzu sağlar.

Aşağıdaki kod satırı ile bu kütüphaneyi kurabilirsiniz:

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

## Install Rust (Rust Kurulumu)

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

Windows için lütfen [Rust kurulum sitesini](https://www.rust-lang.org/tools/install) ziyaret edin.

## Install CLI (CLI Kurulumu)

### macOS & Linux

Terminal uygulamanızı açın.

`LATEST_RELEASE`'i istediğiniz sürümle değiştirin ve aşağıdakileri çalıştırarak makinenize en son Solana sürümünü yükleyin:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

`LATEST_RELEASE`'i istediğiniz sürümün yazılım sürümüyle eşleşen sürüm etiketiyle değiştirebilir veya üç sembolik kanal adından birini kullanabilirsiniz: `stable`, `beta` veya `edge`. En son sürümü bulmak için [buradaki](https://github.com/solana-labs/solana/releases) sürümleri kontrol edin.

Aşağıdaki çıktı, başarılı bir güncellemeyi gösterir:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Sisteminize bağlı olarak, yükleyici mesajının sonu sizden şunları yapmanızı isteyebilir:

```bash
Please update your PATH environment variable to include the solana programs:
```

Yukarıdaki mesajı alırsanız, `PATH`'i güncellemek için önerilen komutu kopyalayıp altına yapıştırın.

Aşağıdaki kod satırını çalıştırarak istediğiniz solana sürümünün kurulu olduğunu onaylayın:

```bash
solana --version
```

Başarılı bir kurulumdan sonra, Solana yazılımını herhangi bir zamanda daha yeni bir sürüme kolayca güncellemek için `solana-install update` kullanılabilir.

#### Downloading Binaries (Linux) (Binary Dosyalarını İndirme)

Alternatif olarak solana-install kullanmak yerine Binary dosyaları ile kurulum yapabilirsiniz.

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
adresine giderek **solana-release-x86_64-unknown-linux-msvc.tar.bz2**'i indirin, ardından arşivden çıkarın:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries (macOS)

Alternatif olarak solana-install kullanmak yerine binary dosyaları ile kurulum yapabilirsiniz. 

[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
adresine giderek **solana-release-x86_64-apple-darwin.tar.bz2**‘i indirin, ardından arşivden çıkarın:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Yönetici olarak Komut İstemi (`Command Prompt - cmd.exe`)’ni açın. 

Komut İstemi uygulaması göründüğünde, sağ tıklayın ve “Yönetici Olarak Aç” seçeneğini seçin.
“Bu uygulamanın cihazınızda değişiklik yapmasına izin vermek istiyor musunuz?” diye soran bir açılır pencere tarafından istenirse, 'Evet'i tıklayın.

Aşağıdaki komutu kopyalayıp yapıştırın, ardından Solana yükleyicisini geçici bir dizine indirmek için Enter tuşuna basın:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

`v1.9.16` istediğiniz sürüm değilse, en son sürümü [burada](https://github.com/solana-labs/solana/releases) bulabilirsiniz.

Aşağıdaki komutu kopyalayıp yapıştırın, ardından Solana'nın en son sürümünü yüklemek için Enter'a basın. Sisteminizde bir güvenlik açılır penceresi görürseniz, programın çalışmasına izin verin.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

En son sürümü bulmak için [burada](https://github.com/solana-labs/solana/releases) bulunan sürümleri kontrol edebilirsiniz.

Kurulum tamamlandığında Enter tuşuna basın.

Komut istemi penceresini kapatın ve normal bir kullanıcı olarak yeni bir komut istemi penceresini yeniden açın.

Arama çubuğunda "Komut İstemi" arayın, ardından Komut İstemi uygulama simgesine sol tıklayın (Yönetici olarak çalıştırmanıza gerek yok).

Aşağıdakileri girerek istediğiniz solana sürümünün kurulu olduğunu onaylayın:

```bash
solana --version
```

Başarılı bir kurulumdan sonra, Solana yazılımını herhangi bir zamanda daha yeni bir sürüme kolayca güncellemek için `solana-install update` kullanılabilir.

#### Downloading Binaries (Binary Dosyalarını İndirme)

Alternatif olarak solana-install kullanmak yerine binary dosyaları ile kurulum yapabilirsiniz. 


[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
adresine giderek **solana-release-x86_64-pc-windows-msvc.tar.bz2**‘i indirin, ardından Winzip ya da benzer bir uygulama kullanarak arşivden çıkarın.


Bir Komut İstemi açın ve binary dosyaları çıkardığınız dizine gidin ve çalıştırın:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Build From Source (Kaynaktan Derleme)

Önceden oluşturulmuş binary dosyalarını kullanamıyorsanız veya kaynaktan kendiniz oluşturmayı tercih ediyorsanız,
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest)
adresine gidin ve kaynak kodu arşivini indirin. Kodu ayıklayın ve binary dosyaları şununla oluşturun:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Daha sonra, önceden oluşturulmuş binary dosyalarla aynı sonucu elde etmek için aşağıdaki komutu çalıştırabilirsiniz:

```bash
solana-install init
```
