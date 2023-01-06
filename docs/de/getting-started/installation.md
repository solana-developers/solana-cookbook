---
title: Installation
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Installation
  - - meta
    - name: og:title
      content: Solana Kochbuch | Installation
  - - meta
    - name: description
      content: Erfahren Sie anhand von Tutorials, Leitfäden und Beispielen, wie Sie mit Solana beginnen.
  - - meta
    - name: og:description
      content: Erfahren Sie anhand von Tutorials, Leitfäden und Beispielen, wie Sie mit Solana beginnen.
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

## Installieren von Web3.js

Es gibt einige Bibliotheken, die Sie verwenden können, um mit Javascript oder Typoskript auf Solana zu beginnen.

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) ist eine Bibliothek mit vielen grundlegenden Solana-Tools zum Interagieren, Senden von Transaktionen und Lesen aus der Blockchain.

Sie können Folgendes installieren:

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

`@solana/spl-token` ist eine Bibliothek, die viele der Javascript-/Typescript-Bindungen enthält, die für die Interaktion mit SPL-Token erforderlich sind.
Sie können diese Bibliothek verwenden, um neue SPL-Token zu prägen, Token zu übertragen und vieles mehr.

Sie können diese Bibliothek wie folgt installieren:

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

Es gibt eine Sammlung von Bibliotheken, die beim Bootstrap von Wallet-Verbindungen innerhalb von Solana helfen können, genannt Wallet-Adapter.
Derzeit unterstützt das Paket die Verwendung in Svelte, Angular, Vue.js und React. Wallet-Adapter kann Ihre dApp schnell mit
mit Wallets wie [Phantom](https://phantom.app/), [Solflare](https://solflare.com/) und mehr integrieren.

Sie können diese Bibliothek wie folgt installieren:

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

For Windows, besuchen Sie bitte die [Rust installations Seite](https://www.rust-lang.org/tools/install).

## Install CLI

### macOS & Linux

Öffnen Sie Ihre bevorzugte Terminal-Anwendung.

Ersetzen Sie `LATEST_RELEASE` mit Ihrer gewünschten Version und installieren Sie die [neueste Solana Version](https://github.com/solana-labs/solana/releases) auf Ihrem Computer, indem Sie Folgendes ausführen:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Sie können die Softwareversion Ihres gewünschten Releases "LATEST_RELEASE" durch das passende Release-Tag ersetzen,
oder verwenden Sie eines der drei symbolischen Kanalnamen: „stable“, „beta“ oder „edge“.
Um die neueste Version zu finden, überprüfen Sie die verfügbaren Versionen [hier](https://github.com/solana-labs/solana/releases).

Die folgende Ausgabe zeigt ein erfolgreiches Update an:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Abhängig von Ihrem System werden Sie möglicherweise am Ende der Meldung des Installationsprogramms aufgefordert zu

```bash
Please update your PATH environment variable to include the solana programs:
```

Wenn Sie die obige Meldung erhalten, kopieren Sie den empfohlenen Befehl unten und fügen Sie ihn ein
es, um `PATH` zu aktualisieren.

Bestätigen Sie, dass Sie die gewünschte Version von „solana“ installiert haben, indem Sie Folgendes ausführen:

```bash
solana --version
```

Nach erfolgreicher Installation kann `solana-install update` problemlos verwendet werden, um
die Solana-Software jederzeit auf eine neuere Version aktualisieren.

#### Herunterladen von Binärdateien (Linux)

Alternativ können Sie aus Binärdateien installieren, anstatt solana-install zu verwenden.

Laden Sie die Binärdateien herunter, indem Sie zu [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) navigieren,
**solana-release-x86_64-unknown-linux-msvc.tar.bz2** downloaden, und dann das Archiv entpacken:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Herunterladen von Binärdateien (macOS)

Alternativ können Sie aus Binärdateien installieren, anstatt solana-install zu verwenden.

Laden Sie die Binärdateien herunter, indem Sie zu
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
download **solana-release-x86_64-apple-darwin.tar.bz2** navigieren, und dann das Archiv entpacken:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Öffnen Sie als Administrator eine Eingabeaufforderung (`cmd.exe`).

Suchen Sie in der Windows-Suchleiste nach Eingabeaufforderung. Wenn der Befehl
Die Prompt-App erscheint, klicken Sie mit der rechten Maustaste und wählen Sie „Als Administrator öffnen“.
Wenn Sie von einem Popup-Fenster mit der Frage „Möchten Sie dieser App erlauben,
Änderungen an Ihrem Gerät vornehmen?“ klicken Sie auf „Ja“.

Kopieren Sie den folgenden Befehl, fügen Sie ihn ein und drücken Sie dann die Eingabetaste, um Solana herunterzuladen
Installer in ein temporäres Verzeichnis:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Wenn „v1.9.16“ nicht Ihre gewünschte Version ist, finden Sie die neueste Version [hier](https://github.com/solana-labs/solana/releases).

Kopieren Sie den folgenden Befehl und fügen Sie ihn ein. Drücken Sie dann die Eingabetaste, um die neueste Version zu installieren
Version von Solana. Wenn Sie ein Sicherheits-Popup von Ihrem System sehen, wählen Sie es bitte aus, das Programm laufen zu lassen.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Um die neueste Version zu finden, überprüfen Sie die aktuell verfügbaren Versionen [hier](https://github.com/solana-labs/solana/releases).

Wenn das Installationsprogramm fertig ist, drücken Sie die Eingabetaste.

Schließen Sie das Eingabeaufforderungsfenster und öffnen Sie erneut ein neues Eingabeaufforderungsfenster als
normaler Benutzer.

Suchen Sie in der Suchleiste nach „Eingabeaufforderung“ und klicken Sie dann mit der linken Maustaste auf die
App-Symbol für Eingabeaufforderung (muss nicht als Administrator ausgeführt werden).

Bestätigen Sie, dass Sie die gewünschte Version von `solana` installiert haben, indem Sie Folgendes eingeben:

```bash
solana --version
```

Nach erfolgreicher Installation kann `solana-install update` problemlos verwendet werden, und
die Solana-Software jederzeit auf eine neuere Version aktualisiert werden.

#### Herunterladen von Binärdateien

Alternativ können Sie aus Binärdateien installieren, anstatt solana-install zu verwenden.

Laden Sie die Binärdateien herunter, indem Sie zu
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
download **solana-release-x86_64-pc-windows-msvc.tar.bz2**navigieren, und dann das Archiv mit bspw. WinRar entpacken:

Öffnen Sie eine Eingabeaufforderung und navigieren Sie zu dem Verzeichnis, in das Sie extrahiert haben
die Binärdateien und führen Sie aus:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Aus Quelle erstellen

Wenn Sie die vorgefertigten Binärdateien nicht verwenden können oder es vorziehen, sie selbst zu erstellen
von der Quelle, navigieren Sie zu [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
und laden Sie das **Quellcode**-Archiv (**source code**) herunter. Extrahieren Sie den Code und erstellen Sie die Binärdateien mit:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Sie können dann den folgenden Befehl ausführen, um das gleiche Ergebnis wie mit vorgefertigte Binärdateien zu erhalten:

```bash
solana-install init
```
