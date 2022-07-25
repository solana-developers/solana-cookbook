---
title: Instalación
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Instalación
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Instalación
  - - meta
    - name: description
      content: Aprendé como empezar en Solana con tutoriales, guías, y ejemplos.
  - - meta
    - name: og:description
      content: Aprendé como empezar en Solana con tutoriales, guías, y ejemplos.
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

## Instalación de Web3.js

Hay pocas librerías que necesitas para empezar con JavaScript o TypeScript en Solana.<br/>

### Web3.js

[@solana/web3.js](https://github.com/solana-labs/solana-web3.js) es una librería que tiene todas las herramientas básicas para interactuar con Solana, enviar transacciones, y leer desde la blockchain.

Lo puedes instalar con algunos de los siguientes comandos:

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

[@solana/spl-token](https://spl.solana.com/token) es una librería que contiene muchos de los bindings de JavaScript/TypeScript necesarios para interactuar con los tokens SPL. Puedes usar esta librería para mintear nuevos tokens SPL, transferir tokens, y más.


You can install this library with the following:

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
Es una colección de librerías llamada wallet-adapter que te ayudan a conectarte a cualquier wallet dentro de Solana. Actualmente este paquete soporta usos con Svelte, Angular, Vue.js, y React. Wallet-adapter puede empezar rápidamente a integrar tu dAppp con wallets como [Phantom](https://phantom.app), [Solflare](https://solflare.com), y más.

Lo puedes instalar con algunos de los siguientes comandos:

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

## Instalación de Rust

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

Para Windows por favor visita el [sitio de instalación de Rust](https://www.rust-lang.org/tools/install)

## Instalación de CLI

### macOS & Linux

Abre tu app terminal favorita.

Reemplaza `LATEST_RELEASE` con la versión deseada e instala la [última release de Solana](https://github.com/solana-labs/solana/releases) en tu máquina corriendo:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Puedes reemplazar `LATEST_RELEASE` con algún tag de release que se identifique con la versión de release que desees, o uses uno de los 3 canales simbólicos: `stable`, `beta`, o `edge`. Para encontrar la última release, revisa las versiones disponibles [aquí](https://github.com/solana-labs/solana/releases).

La siguiente salida indica una actualización exitosa:

```bash
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Dependiendo de tu sistema, al final de la instalación este mensaje puede aparecer:

```bash
Please update your PATH environment variable to include the solana programs:
```

Si ves el mensaje de arriba, copia y el pega el comando para actualizar `PATH`.

Confirma que tenes la versión de Solana deseada corriendo:

```bash
solana --version
```

Después de una instalación exitosa, `solana-install update` puede ser usado para actualizar fácilmente el software de Solana a una nueva versión en cualiquier momento.

#### Downloading Binaries (Linux)

Alternativamente puedes instalar los binarios en vez de utilizar solana-install.

Descarga los binarios navegando hacia [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), descargando **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, después extrae el archivo:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Downloading Binaries (macOS)

Alternativamente puedes instalar los binarios en vez de utilizar solana-install.

Descarga los binarios navegando hacia [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), descargando **solana-release-x86_64-apple-darwin.tar.bz2**, después extrae el archivo:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Abre el Símbolo del sistema o Command Prompt (`cmd.exe`) como un Administrador.

Busca el Símbolo del Sistema o Command prompt en la barra de búsqueda de Windows. Cuando el Símbolo del Sistema aparezca, hacer click derecho y seleccionar "Abrir como administrador". Si te aparece una ventana preguntandote "Queres permitir a esta app que realice cambios en tu dispositivo?", clickea en "Si".

Copiar y pegar el siguiente comando, después apretar Entre para descargar el instalador de solana en una carpeta temporal.

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Si `v1.9.16` no es tu versión deseada, encuentra la última release [acá](https://github.com/solana-labs/solana/releases).

Copiar y pegar el siguiente comando, después presionar Enter para instalar la última versión de Solana. Si ves un pop-up de seguridad de tu sistema, por favor selecciona permitir que el programa pueda correr.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Para encontrar la última release, revisa las versiones disponibles [acá](https://github.com/solana-labs/solana/releases).

Cuando el instalador esta terminado, presiona Enter.

Cerra el Símbolo del Sistema o Command Prompt y re-abre un nuevo Símbolo del Sistema como un usuario normal.

Busca "Símbolo del Sistema" o "Command Prompt" en la barra de búsqueda, y hace click izquierdo en el mismo (no es necesario correrlo como Administrador).

Confirma que tenes tu versión deseada de `Solana` instalada corriendo el siguiente comando:

```bash
solana --version
```

Después de una instalación exitosa, `solana-install update` puede ser usado para actualizar fácilmente el software de Solana a una nueva versión en cualiquier momento.

#### Downloading Binaries

Alternativamente puedes instalar los binarios en vez de utilizar solana-install.

Descarga los binarios navegando hacia [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), descargando **solana-release-x86_64-pc-windows-msvc.tar.bz2**, después extrae el archivo usando WinZip o alguna herramienta similar.

Abre un Símbolo del Sistema y navega a la carpeta donde extrajiste los binarios y ejecuta los siguientes comandos:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Compilación desde el Código Fuente

Sino pudiste usar los binarios pre-armados o prefieres compilarlos desde el código fuente navega a [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) y descarga el archivo de código fuente. Extrae el código y compila los binarios con:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Puedes ejecutar el siguiente comando para obtener el mismo resultado que con los binarios pre-armados.

```bash
solana-install init
```
