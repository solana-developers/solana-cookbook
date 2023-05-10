---
title: Instalação
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Instalação
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Instalação
  - - meta
    - name: description
      content: Aprenda como começar na Solana com tutoriais, guias e exemplos.
  - - meta
    - name: og:description
      content: Aprenda como começar na Solana com tutoriais, guias e exemplos.
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

## Instale o Web3.js

Existem algumas bibliotecas que você pode usar para começar com JavaScript ou TypeScript na Solana.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) é uma biblioteca que contém muitas das ferramentas básicas da Solana para interagir, enviar transações e ler dados da blockchain.

Você pode instalar esta biblioteca com o seguinte comando:

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
<!-- Desenvolvimento (não minificado) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>

<!-- Produção (minificado) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### SPL-Token

`@solana/spl-token` é uma biblioteca que contém muitas das ligações Javascript/Typescript necessárias para interagir com tokens SPL. Você pode usar essa biblioteca para criar novos tokens SPL, transferir tokens e muito mais.

Você pode instalar esta biblioteca com o seguinte comando:

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
<!-- Desenvolvimento (não minificado) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.js"></script>

<!-- Produção (minificado) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### Wallet-Adapter

Há uma coleção de bibliotecas que podem ajudar a estabelecer conexões de carteira dentro da Solana, chamada wallet-adapter. Atualmente, o pacote suporta o uso em Svelte, Angular, Vue.js e React. O wallet-adapter pode iniciar rapidamente a integração do seu dApp com carteiras como a [Phantom](https://phantom.app/), a [Solflare](https://solflare.com/), e mais.

Você pode instalar esta biblioteca com o seguinte comando:

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

## Instale o Rust

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

Para Windows, visite o [site de instalação do Rust](https://www.rust-lang.org/tools/install).

## Instale a CLI

### macOS & Linux

Abra seu aplicativo Terminal favorito.

Substitua `LATEST_RELEASE` com a versão desejada e instale a [última versão da Solana](https://github.com/solana-labs/solana/releases) na sua máquina, executando:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Você pode substituir `LATEST_RELEASE` pela tag de lançamento correspondente à versão do software desejada ou usar um dos três nomes de canais simbólicos: `stable`, `beta` ou `edge`. Para encontrar a versão mais recente, verifique as versões disponíveis [aqui](https://github.com/solana-labs/solana/releases).

A saída a seguir indica uma atualização bem-sucedida:

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Dependendo do seu sistema, esta mensagem poderá aparecer no final da instalação:

```bash
Please update your PATH environment variable to include the solana programs:
```

Se você receber a mensagem acima, copie e cole o comando recomendado abaixo dela para atualizar o `PATH`.

Confirme se você tem a versão desejada do software da `solana` instalada executando:

```bash
solana --version
```

Após uma instalação bem-sucedida, `solana-install update` pode ser usado para atualizar facilmente o software da Solana para uma versão mais recente a qualquer momento.

#### Baixando os Binários (Linux)

Alternativamente, você pode instalar a partir de binários em vez de usar o solana-install.

Vá até [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), baixe **solana-release-x86_64-unknown-linux-msvc.tar.bz2**, e extraia o arquivo:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Baixando os Binários (macOS)

Alternativamente, você pode instalar a partir de binários em vez de usar o solana-install.

Vá até [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), baixe **solana-release-x86_64-apple-darwin.tar.bz2**, e extraia o arquivo:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Abra um Prompt de Comando (`cmd.exe`) como Administrador.

Busque por Prompt de Comando na barra de pesquisa do Windows. Quando o aplicativo Prompt de Comando aparecer, clique com o botão direito e selecione "Executar como administrador". Se uma janela pop-up aparecer, perguntando se você deseja permitir que o aplicativo faça alterações no seu dispositivo, clique em 'Sim'.

Copie e cole o seguinte comando e pressione 'Enter' para baixar o instalador da Solana em um diretório temporário:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Se `v1.9.16` não for a versão que você deseja, encontre o último lançamento [aqui](https://github.com/solana-labs/solana/releases).

Copie e cole o seguinte comando e pressione 'Enter' para instalar a versão mais recente da Solana. Se você ver uma mensagem de segurança do sistema, selecione para permitir que o programa seja executado.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Para encontrar a versão mais recente, verifique as versões disponíveis [aqui](https://github.com/solana-labs/solana/releases).

Quando o instalador terminar, pressione 'Enter'.

Feche a janela do Prompt de Comando e abra uma nova janela do Prompt de Comando como usuário normal.

Procure por "Prompt de Comando" na barra de pesquisa e clique com o botão esquerdo no ícone do aplicativo Prompt de Comando (não é necessário executar como administrador).

Confirme se você tem a versão desejada da `solana` instalada digitando:

```bash
solana --version
```

Após uma instalação bem-sucedida, `solana-install update` pode ser usado a qualquer momento para atualizar facilmente o software da Solana para uma versão mais recente.

#### Baixando os Binários

Alternativamente, você pode instalar a partir de binários em vez de usar solana-install.

Vá até
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), baixe **solana-release-x86_64-pc-windows-msvc.tar.bz2**, e então extraia o arquivo usando o WinZip ou similar.

Abra o Prompt de Comando, navegue até o diretório em que você extraiu os binários e execute:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Compilação a Partir do Código-Fonte

Se você não conseguir usar os binários pré-compilados ou preferir compilá-los do zero, navegue até [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest) e baixe o arquivo de código-fonte. Extraia o código e compile os binários com:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Você pode então executar o seguinte comando para obter o mesmo resultado dos binários pré-compilados:

```bash
solana-install init
```
