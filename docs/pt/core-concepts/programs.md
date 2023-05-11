---
title: Programas
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Programas
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Programas
  - - meta
    - name: description
      content: Programas (também conhecidos como contratos inteligentes) servem como base para atividades na cadeia. Aprenda mais sobre programas e outros conceitos fundamentais no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Programas (também conhecidos como contratos inteligentes) servem como base para atividades na cadeia. Aprenda mais sobre programas e outros conceitos fundamentais no Livro de Receitas da Solana.
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

# Programas

Qualquer desenvolvedor pode escrever e implantar programas na blockchain Solana. Programas (conhecidos como contratos inteligentes em outros protocolos) servem como a base para atividades na cadeia, alimentando desde DeFi e NFTs até mídia social e jogos.

## Fatos

::: tip Ficha Informativa
- Programas processam [instruções](./transactions.md) tanto de usuários finais quanto de outros programas
- Todos os programas são *sem estado (stateless)*: todos os dados com os quais eles interagem são armazenados em [contas](./accounts.md) separadas que são transmitidas por meio de instruções
- Os programas em si são armazenados em contas marcadas como `executable` (executáveis)
- Todos os programas são de propriedade do [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) executados pelo [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Os desenvolvedores geralmente escrevem programas em Rust ou C++, mas podem escolher qualquer linguagem que compile para o backend [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) do [LLVM](https://llvm.org/)
- Todos os programas têm um único ponto de entrada onde ocorre o processamento de instruções (ou seja, `process_instruction`); os parâmetros sempre incluem:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Mergulho Profundo

Ao contrário da maioria das outras blockchains, a Solana separa completamente o código dos dados. Todos os dados com os quais os programas interagem são armazenados em contas separadas e passados como referências por meio de instruções. Esse modelo permite que um único programa genérico opere em várias contas sem exigir implantações adicionais. Exemplos comuns desse padrão são vistos nos programas Nativos e nos programas SPL.

### Programas Nativos & Biblioteca de Programas da Solana (Solana Program Library, ou SPL)

A Solana vem equipada com vários programas que servem como blocos de construção principais para interações na cadeia. Esses programas são divididos em [Programas Nativos](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) e [Programas da Biblioteca de Programas da Solana (SPL)](https://spl.solana.com/).

Os Programas Nativos fornecem a funcionalidade-base que é necessária para operar validadores. Entre esses programas, o mais conhecido é o [Programa do Sistema (System Program)](https://docs.solana.com/developing/runtime-facilities/programs#system-program), que é responsável por administrar novas contas e transferir SOL entre duas partes.

Os Programas SPL suportam várias atividades na cadeia, incluindo criação, troca e empréstimo de tokens, além de gerar pools de staking e manter um serviço de nome na cadeia (Solana Name Service, ou SNS). O [Programa de Tokens SPL (SPL Token Program)](https://spl.solana.com/token) pode ser invocado diretamente via CLI, enquanto outros, como o [Programa de Conta de Tokens Associada (Associated Token Account Program)](https://spl.solana.com/associated-token-account) são normalmente compostos por programas personalizados.

### Escrevendo Programas

Os programas são mais comumente desenvolvidos com Rust ou C++, mas podem ser desenvolvidos com qualquer linguagem que compile para o backend BPF do LLVM. Iniciativas recentes da [Neon Labs](https://neon-labs.org/) e da [Solang](https://solang.readthedocs.io/en/latest/) possibilitam a compatibilidade com a [EVM](https://ethereum.org/en/developers/docs/evm/) e permitem que os desenvolvedores escrevam programas em Solidity.

A maioria dos programas baseados em Rust adere à seguinte arquitetura:

| Arquivo           | Descrição                                   |
|----------------|-----------------------------------------------|
| lib.rs         | Registro de módulos                          |
| entrypoint.rs  | Ponto de entrada para o programa                     |
| instruction.rs | API do programa, desserializa dados de instrução |
| processor.rs   | Lógica do programa                                 |
| state.rs       | Objetos de programa, desserializa o estado        |
| error.rs       | Erros específicos do programa                       |

Recentemente, o [Anchor](https://github.com/coral-xyz/anchor) surgiu como um framework popular para o desenvolvimento de programas. O Anchor é um framework opinativo, semelhante ao Ruby on Rails, que reduz o boilerplate e simplifica o processo de desserialização para o desenvolvimento em Rust.

Os programas são geralmente desenvolvidos e testados no Localhost e na Devnet (Rede de Desenvolvimento) antes de serem implantados na Testnet (Rede de Testes) ou na Mainnet (Rede Principal). A Solana suporta os seguintes ambientes:

| Ambiente de Cluster  | URL de Conexão RPC                                                       |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Porta padrão: 8899 (exemplos: http://localhost:8899, http://192.168.1.88:8899) |

Depois de implantados em um ambiente, os clientes podem interagir com programas na cadeia por meio de [conexões RPC](https://docs.solana.com/developing/clients/jsonrpc-api) com o respectivo cluster.

### Implantando Programas

Os desenvolvedores podem implantar seus programas por meio da [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Quando um programa é implantado, ele é compilado em um [objeto compartilhado ELF](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (contendo o bytecode BPF) e carregado no cluster Solana. Os programas residem em contas (assim como tudo na Solana), exceto que essas contas são marcadas como `executable` e atribuídas ao BPF Loader. O endereço desta conta é referido como `program_id` e é usado para referenciar o programa em todas as transações futuras.

A Solana suporta vários BPF Loaders, sendo o mais recente o [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). O BPF Loader é responsável por administrar as contas do programa e disponibilizá-las aos clientes por meio do `program_id`. Todos os programas têm um único ponto de entrada onde o processamento de instruções ocorre (ou seja, `process_instruction`) e os parâmetros sempre incluem:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Uma vez chamados, os Programas são executados pelo tempo de execução (Solana Runtime).

## Outros Recursos

- [Documentação oficial](https://docs.solana.com/developing/on-chain-programs/overview)
- [Documentação SPL](https://spl.solana.com/)
- [Program Deploys (Implantações de Programa), por Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit (Kit de Inicialização da Solana), por Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana (Programando na Solana), por Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain (Uma Introdução à Blockchain Solana), por Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
