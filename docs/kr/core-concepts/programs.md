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

# 프로그램

개발자는 제약없이 솔라나 블록체인에 프로그램을 개발하고 deploy할 수 있습니다. 흔히 스마트 컨트랙트로 불리는 프로그램은 on-chain activity의 코어 역할을 하며 DeFi, NFT, Social Media, Gaming과 같은 서비스들의 기반이 됩니다.

## 팩트체크

::: tip 팩트시트
- 프로그램은 [instructions](./transactions)를 유저와 다른 프로그램으로부터 처리합니다.
- 모든 프로그램은 **stateless** 합니다: 프로그램이 interact하는 모든 데이터는 instructions를 통하여 패스된 [계정](./accounts.md)에 저장됩니다.
- 프로그램은 `executable`로 명칭된 계정에 저장됩니다.
- 모든 프로그램은 [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)에게 소유권이 있으며 [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)에 의하여 실행됩니다.
- 솔라나 프로그램은 주로 Rust나 C++로 개발되지만 [LLVM]https://llvm.org/)의 [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) 백엔드를 타겟하는 다른 프로그래밍 언어로도 개발이 가능합니다.
- 모든 프로그램은 instruction 프로세싱을 하는 단일 엔트리 포인트가 존재합니다 (i.e. `process_instruction`); 파라미터는 다음을 포함합니다:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`:::


## 자세한 설명

다른 블록체인과는 다르게 솔라나는 코드를 데이터에서 완전히 배제합니다. 프로그램이 통신하는 모든 데이터는 다른 계정에 저장되어 있으며 instruction을 이용하여 reference로 패스됩니다. 이 모델은 추가적인 deployment 없이 여러 account에서 프로그램이 작동할 수 있도록 합니다. 다음과 같은 패턴은 Native 프로그램과 SPL 프로그램에서 발견할 수 있습니다.

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

Recently, [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html) has emerged as a popular framework for developing programs. Anchor is an opinionated framework, akin to Ruby on Rails, that reduces boilerplate and streamlines the (de)serialization process for Rust-based development.

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
- [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)
