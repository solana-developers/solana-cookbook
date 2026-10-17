---
title: Useful Libraries
head:
  - - meta
    - name: title
      content: Solana Cookbook | Useful Libraries
  - - meta
    - name: og:title
      content: Solana Cookbook | Useful Libraries
  - - meta
    - name: description
      content: A quick tour of newer and lesser-known libraries for interacting with Solana, like gill, Kite, Umi, and Seahorse, with links to their official documentation. Learn about more Ingredients for your dish at The Solana cookbook.
  - - meta
    - name: og:description
      content: A quick tour of newer and lesser-known libraries for interacting with Solana, like gill, Kite, Umi, and Seahorse, with links to their official documentation. Learn about more Ingredients for your dish at The Solana cookbook.
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

# Useful Libraries

Newer and otherwise lesser-known libraries keep making it easier to interact
with Solana. This guide highlights a few of them with a quick description and
a link to their official documentation.

## Fact Sheet

- `@solana/kit` is the modern TypeScript SDK for Solana, and the foundation
  most newer client libraries build on
- `gill` and Kite are high-level TypeScript clients built on `@solana/kit`
- Umi is Metaplex's framework for building JavaScript clients
- Seahorse lets you write Solana programs in Python

## @solana/kit

`@solana/kit` (formerly known as `web3.js` v2) is the modern, tree-shakable
TypeScript SDK for interacting with Solana, maintained by Anza. It replaces
the original `@solana/web3.js` library and provides the types and functions
that higher-level libraries build on.

- [GitHub](https://github.com/anza-xyz/kit)

## gill

gill is a modern JavaScript/TypeScript client library for interacting with
Solana. It works in Node, web browsers, and React Native, and is built on top
of `@solana/kit` with full compatibility, adding quality-of-life helpers like
`createTransaction` on top. It also publishes a React hooks package.

- [Documentation](https://www.gillsdk.com/docs)
- [GitHub](https://github.com/gillsdk/gill)

## Kite

Kite is a TypeScript client built on `@solana/kit` that lets you do most
common Solana tasks - creating and funding wallets, sending tokens, creating
tokens, making transactions - in a single step. It is the successor to the
popular `@solana-developers/helpers` library for `web3.js` v1, works in both
the browser and Node, and can also be used as an `@solana/kit` plugin.

- [Documentation](https://solanakite.org/docs)
- [GitHub](https://github.com/solanakite/kite)

## Umi

Umi is Metaplex's framework for building JavaScript clients for Solana. It
provides a modular plugin system for RPCs, wallet signers, and serialization,
and it underpins Metaplex's own libraries such as Token Metadata, Candy
Machine, and Bubblegum.

- [GitHub](https://github.com/metaplex-foundation/umi)

## Seahorse

Seahorse lets you write Anchor-compatible Solana programs in Python. The
compiler generates intermediate Rust artifacts and uses Anchor under the
hood, so you get Python's ease-of-use with the same safety guarantees as
every Rust program on Solana. Seahorse is beta software and not yet
production-ready; the original repository is deprecated in favor of the
community-maintained fork.

- [GitHub](https://github.com/solana-developers/seahorse)
