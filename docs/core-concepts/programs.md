---
title: Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Programs
  - - meta
    - name: description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
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

# Programs

Any developer can write and deploy programs to the Solana blockchain. Programs (known as smart contracts on other protocols) serve as the foundation for on-chain activity, powering anything from DeFi and NFTs to Social Media and Gaming.

## Facts

::: tip Fact Sheet
- Programs process [instructions](./transactions) from both end users and other programs
- All programs are *stateless*: any data they interact with is stored in separate [accounts](./accounts.md) that are passed in via instructions
- Programs themselves are stored in accounts marked as `executable`
- All programs are owned by the [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) and executed by the [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Developers most commonly write programs in Rust or C++, but can choose any language that targets the [LLVM](https://llvm.org/)'s [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) backend
- All programs have a single entry point where instruction processing takes place (i.e. `process_instruction`); parameters always include:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Deep Dive

Unlike most other blockchains, Solana completely separates code from data. All data that programs interact with are stored in separate accounts and passed in as references via instructions. This model allows for a single generic program to operate across various accounts without requiring additional deployments. Common examples of this pattern are seen across the Native and SPL Programs.

### Native Programs & The Solana Program Library (SPL)

Solana comes equipped with a number of programs that serve as core building blocks for on-chain interactions. These programs are divided into [Native Programs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) and [Solana Program Library (SPL) Programs](https://spl.solana.com/).

Native Programs provide the base functionality that is required to operate validators. Among these programs, the most well known is the [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program) which is responsible for administering new accounts and transferring SOL between two parties.

SPL Programs support a number of on-chain activities, including creating, swapping, and lending tokens, as well as generating stake pools and maintaining an on-chain name service. The [SPL Token Program](https://spl.solana.com/token) can be invoked directly via the CLI, while others like the [Associated Token Account Program](https://spl.solana.com/associated-token-account) are usually composed with custom programs.

### Writing Programs

Programs are most commonly developed with Rust or C++, but can be developed with any language that targets the LLVM’s BPF backend. Recent initiatives by [Neon Labs](https://neon-labs.org/) and [Solang](https://solang.readthedocs.io/en/latest/) enable [EVM](https://ethereum.org/en/developers/docs/evm/) compatibility and allow developers to write programs in Solidity.

Most Rust-based programs adhere to the following architecture:

| File           | Description                                   |
|----------------|-----------------------------------------------|
| lib.rs         | Registering modules                           |
| entrypoint.rs  | Entrypoint to the program                     |
| instruction.rs | Program API, (de)serializing instruction data |
| processor.rs   | Program logic                                 |
| state.rs       | Program objects, (de)serializing state        |
| error.rs       | Program-specific errors                       |

Recently, [Anchor](https://github.com/coral-xyz/anchor) has emerged as a popular framework for developing programs. Anchor is an opinionated framework, akin to Ruby on Rails, that reduces boilerplate and streamlines the (de)serialization process for Rust-based development.

Programs are usually developed and tested against Localhost and Devnet environments before being deployed to Testnet or Mainnet. Solana supports the following environments:

| Cluster Environment  | RPC Connection URL                                                        |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Once deployed to an environment, clients can interact with on-chain programs via [RPC connections](https://docs.solana.com/developing/clients/jsonrpc-api) to the respective cluster.

### Deploying Programs

Developers can deploy their programs via the [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

When a program is deployed, it is compiled to an [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (containing BPF bytecode) and uploaded to the Solana cluster. Programs live in accounts (much like everything else on Solana), except these accounts are marked as `executable` and assigned to the BPF Loader. The address of this account is referred to as the `program_id` and is used to reference the program in all future transactions.

Solana supports multiple BPF Loaders, with the latest being the [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). The BPF Loader is responsible for administering the program’s account and making it available to clients via the `program_id`. All programs have a single entry point where instruction processing takes place (i.e. `process_instruction`) and parameters always include:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Once invoked, programs are executed by the Solana Runtime.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
