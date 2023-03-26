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
      content: Apprenez comment démarrer avec Solana à l'aide de tutoriels, de guides et d'exemples.
  - - meta
    - name: og:description
      content: Apprenez comment démarrer avec Solana à l'aide de tutoriels, de guides et d'exemples.
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

## Installer Web3.js

Il existe quelques bibliothèques que vous pouvez utiliser pour démarrer avec javascript ou typescript sur Solana.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) est une bibliothèque qui contient une grande partie des outils de base de Solana pour interagir, envoyer des transactions et lire la blockchain.

Vous pouvez l'installer avec l'une des commandes suivantes :

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

`@solana/spl-token` est une bibliothèque contenant de nombreux liens JavaScript/TypeScript nécessaires pour interagir avec les jetons SPL.
Vous pouvez utiliser cette bibliothèque pour créer de nouveaux jetons SPL, transférer des jetons, etc.

Vous pouvez l'installer avec l'une des commandes suivantes :

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

Il s'agit d'une collection de bibliothèques appelée *Wallet-Adapter* qui vous aide à vous connecter à n'importe quel portefeuille dans Solana.
Actuellement, ce paquet peut être utilisé avec Svelte, Angular, Vue.js et React. *Wallet-adapter* peut accélérer l'intégration de votre dApp avec des portefeuilles comme [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), et plus encore.

Vous pouvez l'installer avec l'une des commandes suivantes :

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

## Installer Rust

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

Pour Windows, veuillez consulter le [site d'installation de Rust](https://www.rust-lang.org/tools/install).

## Installer CLI

### macOS & Linux

Ouvrez votre application de terminal préférée.

Remplacer `LATEST_RELEASE` avec la version souhaitée et installez la [dernière version de Solana](https://github.com/solana-labs/solana/releases) sur votre machine en exécutant :

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Vous pouvez remplacer `LATEST_RELEASE` par l'étiquette de la version correspondante à la version du logiciel que vous souhaitez, ou utiliser l'un des trois noms de canaux symboliques : `stable`, `beta`, ou `edge`. Pour trouver la dernière version, vérifiez les versions disponibles [ici](https://github.com/solana-labs/solana/releases).

Le résultat suivant indique si la mise à jour a réussi :

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

En fonction de votre système, le message suivant peut apparaitre à la fin de l'installation :

```bash
Please update your PATH environment variable to include the solana programs:
```

Si vous obtenez le message ci-dessus, copiez et collez la commande recommandée en dessous de lui pour mettre à jour le `PATH`.

Confirmez que vous avez installé la version désirée de Solana en exécutant :

```bash
solana --version
```

Après une installation réussie, `solana-install update` peut être utilisé à tout moment pour facilement mettre à jour le logiciel de Solana vers une version plus récente.

#### Téléchargement des fichiers binaires (Linux)

Alternativement, vous pouvez installer à partir des fichiers binaires au lieu d'utiliser solana-install.

Téléchargez les fichiers binaires en vous rendant sur
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
téléchargez **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, puis extrayez l'archive :

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Téléchargement des fichiers binaires (macOS)

Alternativement, vous pouvez installer à partir des fichiers binaires au lieu d'utiliser solana-install.

Téléchargez les fichiers binaires en vous rendant sur
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
téléchargez **solana-release-x86_64-apple-darwin.tar.bz2**, puis extrayez l'archive :

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Ouvrez un invite de commandes (`cmd.exe`) en tant qu'Administrateur.

Recherchez *Invite de commandes* dans la barre de recherche de Windows. Lorsque l'application *Invite de commandes* apparaît, faites un clic droit et sélectionnez "Exécuter en tant qu'administrateur".
Si une fenêtre contextuelle vous demande "Voulez-vous autoriser cette application à apporter des modifications à votre appareil ?", cliquez sur "Oui".

Copiez et collez la commande suivante, puis appuyez sur Entrée pour télécharger le programme d'installation de Solana dans un répertoire temporaire :

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Si `v1.9.16` n'est pas la version que vous souhaitez, trouver la dernière version [ici](https://github.com/solana-labs/solana/releases).

Copiez et collez la commande suivante, puis appuyez sur Entrée pour installer la dernière version de Solana. Si vous voyez un pop-up de sécurité de votre système, veuillez sélectionner l'autorisation de l'exécution du programme.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Pour trouver la dernière version, vérifiez
les versions disponibles [ici](https://github.com/solana-labs/solana/releases).

Lorsque le programme d'installation est terminé, appuyez sur Entrée.

Fermez l'invite de commandes et réouvrez-en une en tant qu'utilisateur normal.

Recherchez *Invite de commandes* dans la barre de recherche de Windows,faites un clic gauche sur l'icone de l'application (pas besoin de l'éxécuter en tant qu'Administrateur).

Confirmez que vous avez installé la version désirée de Solana en exécutant :

```bash
solana --version
```

Après une installation réussie, `solana-install update` peut être utilisé à tout moment pour facilement mettre à jour le logiciel de Solana vers une version plus récente.

#### Téléchargement des fichiers binaires

Alternativement, vous pouvez installer à partir des fichiers binaires au lieu d'utiliser solana-install.

Téléchargez les fichiers binaires en vous rendant sur
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
téléchargez **solana-release-x86_64-pc-windows-msvc.tar.bz2**, puis extrayez l'archive en utilisant WinZip ou similaire.

Ouvrez un *Invite de commandes* et naviguez vers le réportoire dans lequel vous avez extrait les fichiers binaires et éxécutez la commande suivante :

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Compiler à partir du code source

Si vous ne pouvez pas utiliser les fichiers binaires pré-construits ou que vous préférez le construire vous-même à partir du code source, rendez-vous sur
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
et téléchargez l'archive **Source Code**. Extrayez le code et compilez les fichiers binaires avec la commande suivante :

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Vous pouvez alors lancer la commande suivante pour obtenir le même résultat qu'avec les fichiers binaires préconstruits :

```bash
solana-install init
```
