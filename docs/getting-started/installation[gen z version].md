---
title: 🚀 Solana Starter Kit
description: Your quick start guide to building on Solana with Web3.js, SPL-Token, and Wallet-Adapter!
og:title: 🚀 Solana Starter Kit
og:description: Your quick start guide to building on Solana with Web3.js, SPL-Token, and Wallet-Adapter!
og:image: https://solanacookbook.com/cookbook-sharing-card.png
og:image:alt: Solana splash card
twitter:card: summary
twitter:site: "@solanacookbook"
twitter:image: "https://solanacookbook.com/cookbook-sharing-card.png"
robots: index,follow,noodp
googlebot: index,follow
footer: MIT Licensed
---

# 🚀 Get Started with Solana!

Ready to build on Solana? Let's set up the essentials!

## 🛠 Install Web3.js

Use `@solana/web3.js` to interact with Solana. Install it with:

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
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

## 💸 Use SPL-Token

Manage SPL tokens with `@solana/spl-token`. Install it:

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
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

## 🌐 Bootstrap Wallet Connection

Use `@solana/wallet-adapter` to connect wallets. Install it:

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

# 🦀 Install Rust

Get Rust for Solana development:

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

For Windows, check [Rust installation](https://www.rust-lang.org/tools/install).

# ⚙️ Install Solana CLI

Install Solana CLI on macOS & Linux:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Windows users can download from the [Solana GitHub](https://github.com/solana-labs/solana/releases).

# 🎉 You're Ready to Roll!

That's it! Now you're all set to build awesome projects on Solana. Happy coding! 🚀
```

Feel free to use this as needed!
