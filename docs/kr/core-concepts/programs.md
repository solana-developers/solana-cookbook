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

어떤 개발자든 Solana 블록체인에 Program을 작성하고 배포할 수 있습니다. Program(다른 프로토콜들에서 smart contract로 알려진)들은 DeFi, NFTs부터 소셜 미디어와 게임까지 모든 것을 가능하게 하는 on-chain 활동을 위한 기반 역할을 수행합니다.

## Facts

::: tip Fact Sheet
- Program은 사용자나 다른 Program으로부터 받은 [instructions](./transactions)을 처리합니다.
- 모든 Program들은 상태를 보존하지 않습니다. 즉, Program들이 사용하는 모든 데이터는 Instruction들을 거쳐 분리된 [Account](./accounts.md)들로 보내집니다.
- Program 그 자체는 `executable` 표시된 Account에 저장됩니다.
- 모든 Program은 [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)에 의해 소유되고 [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)에 의해 실행됩니다.
- 개발자들은 보통 Rust나 C++로 Program을 작성합니다. 하지만, [LLVM](https://llvm.org/)의 [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) backend로 빌드되는 어떤 언어도 선택 가능합니다.
- 모든 Program은 Instruction 처리가 일어나는 단일 entry point를 갖고 있습니다.(i.e. `process_instructio`);  
아래는 항상 포함되는 파라미터들입니다.
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Deep Dive

대부분의 다른 블록체인들과 다르게, Solana는 데이터와 코드를 완벽하게 분리합니다.
Program이 상호 작용하는 모든 데이터들은 분리된 Account들에 저장되며, Instruction들을 거쳐 호출됩니다.
이러한 모델은 단일 Generic Program이 추가적인 배포 없이 다양한 Account들을 거쳐 동작하는 것을 가능하게 합니다.
이러한 패턴의 흔한 예는 Native와 SPL Program 들에서 볼 수 있습니다.

### Native Programs & The Solana Program Library (SPL)

Solana는 on-chain 상호 작용을 위해 행식 구성 요소로써 기능하는 다수의 Program들을 갖고 있습니다.
이 Program들은 [Native Program](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)들과 [Solana Program Library (SPL) Program](https://spl.solana.com/)들로 나뉩니다.

Native Program들은 validator들을 운영하기 위해 요구되는 기반 기능을 제공합니다.
이 Program들 중에 가장 잘 알려진 것이 [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program)입니다.
System Program은 새로운 Account들을 관리하는 것과 두 집단 사이에서 SOL을 전송하는 것을 책임집니다.

SLP Program은 토큰 생성, 교환, 대여하는 것에 더해 stake pool을 발생시키고, on-chain name service를 유지하는 것 포함해 다수의 on-chain 활동을 지원합니다.
[SPL Token Program](https://spl.solana.com/token)들은 CLI를 거쳐 직접 호출될 수 있습니다.
반면에 [Associated Token Account Program](https://spl.solana.com/associated-token-account) 같은 다른 것들은 보통 Custom Program들로 구성됩니다.

### Writing Programs

Program들은 보통 Rust와 C++로 개발됩니다. 하지만, LLVM의 BPF backend로 빌드되는 어떤 언어로도 개발 가능합니다.
[Neon Labs](https://neon-labs.org/)와 [Solang](https://solang.readthedocs.io/en/latest/)은 최근 [EVM](https://ethereum.org/en/developers/docs/evm/) 호환을 가능하게 하고 개발자들이 Program을 Solidity에서 작성할 수 있게 하는 시도를 하고 있습니다.

대부분의 Rust 기반 Program들은 아래와 같은 아키텍처를 사용합니다.:

| File           | Description                                   |
|----------------|-----------------------------------------------|
| lib.rs         | Registering modules                           |
| entrypoint.rs  | Entrypoint to the program                     |
| instruction.rs | Program API, (de)serializing instruction data |
| processor.rs   | Program logic                                 |
| state.rs       | Program objects, (de)serializing state        |
| error.rs       | Program-specific errors                       |

최근에는, [Anchor](https://github.com/coral-xyz/anchor)가 Program을 개발하기 위한 프레임워크로 뜨고 있습니다.
Anchor는 boilerplate를 줄이고 (de)serialization 처리를 간소화하는 Ruby on Rails와 비슷한 Rust 기반 프레임워크입니다.

Program들은 보통 Testnet과 Mainnet에 배포되기 전에 Localhost와 Devnet 환경에서 개발되고 테스트됩니다. Solana는 아래 환경들을 지원합니다.

| Cluster Environment  | RPC Connection URL                                                        |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

일단 환경에 배포되고 나면, Client들은 각각의 Cluster로의 RPC 연결을 통해 On-chain Program들과 상호작용 할 수 있습니다.

### Deploying Programs

개발자들은 다음과 같이 [CLI](https://docs.solana.com/cli/deploy-a-program)를 통해 Program을 배포할 수 있습니다.

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Program이 배포될 때, [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)(BPF bytecode를 포함하는)로 컴파일되고 Solana Cluster로 업로드됩니다.
Program들은 그들의 Account가 `execuable` 표시되고 BPF Loader에 할당될 때를 제외하고 Account 안에 존재합니다.
이 Account의 주소는 `program_id`로써 모든 Transaction에서 Program을 참조하기 위해 사용됩니다.

Solana는 최근 [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111)를 포함해 multiple BPF Loader를 지원합니다. BPF Loader는 Program의 Account를 관리하는데 Client들이 `program_id`를 통해 이것을 가능하게 만들 책임이 있습니다.
모든 Program들은 Instruction에 대한 처리가 일어나는 하나의 Entry Point를 갖고 있습니다. (i.e.  `process_instruction`)  
아래는 항상 포함되는 파라미터들입니다.
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

일단 호출되고 나면, Program들은 Solana Runtime에 의해 실행됩니다.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
