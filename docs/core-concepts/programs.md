---
title: Programs
---

# Programs

#### Takeout
- Programs are STATELESS
- Require all DATA to be PASSED into a program when submitting a transaction
- Created primarily in Rust and C++ programming languages
- Any compatible language targeting LLVM BPF Backend can be supported
- Deployed on-chain: [`solana program deploy`]
- Have a single entry point where processing takes place, e.g. process_instruction
- Entry point params: program_id (pubkey), accounts (array), and instruction_data (byte array)
- Ethereum and EVM compatibility is available from Solang and NeonLabs
- Where can I store data on Solana if programs are stateless? Accounts
- Clients connect to an on-chain program using RPC to connect to a Solana Cluster
- Executed by the Solana runtime

::: tip Delivery
Solana programs are created primarily in Rust and C/C++ but can be written in any programming language that can target the LLVM's BPF backend. Ethereum and EVM compatibility is currently available and supported by Neonlabs and Solang. This means Solana programs are able to be written in almost any smart contract language, including the higher performing more secure ones.

Programs are deployed on-chain via CLI and are executed via the Solana runtime. The runtime is the component of the validator responsible for program execution (more later). With the available tools, to deploy its a simple command or button click.

Programs are stateless. Separation of code and data. This means all required data is passed into the program. It means all the data your program needs must pass from the client to the program. In other words, yes, what I mean to say is, that the program itself stores no state and you must pass all the data required to execute your transactions. Clear?  Yes Chef.

Wait, if programs are stateless, how can we store data in programs? Accounts [..more later]

Solana also comes stacked with both Native programs and a suite of programs dubbed the SPL(Solana Program Library), hosted and maintained by Solana. These include programs like system, stake, voting, token, swap, lending, data storage, name serives, governance, and much more. Yes! there are programs for NFTs :ghost:. What. You didnt know? Of course you did.

Typical files that make up a program?

>- Program Architecture
>   - lib.rs: registering modules
>   - entrypoint.rs: entrypoint to the program
>   - instruction.rs: program API, (de)serializing instruction data
>   - processor.rs: program logic
>   - state.rs: program objects, (de)serializing state
>   - error.rs: program specific errors
>
> [Solana Starter Kit](https://hackmd.io/@ironaddicteddog/solana-starter-kit#PDA) - @ironaddicteddog

Excellent. That wraps up programs on Solana. Have something to add? [Contribute](https://github.com/solana-dev-adv/solana-cookbook)!
:::

#### Resources

[Escrow Program - The 'OG' program tutorial](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/) - paulx <br>
[Tutorials](../getting-started/menu.md)<br>
[Programming Overview](https://docs.solana.com/developing/programming-model/overview)<br>
[Deployment](https://docs.solana.com/cli/deploy-a-program)<br>
[Transactions](transactions.md)<br>
[Solana Starter Kit](https://hackmd.io/@ironaddicteddog/solana-starter-kit#PDA)<br>

#### Frameworks
[Anchor](https://project-serum.github.io/anchor/getting-started/introduction.<br>html)

#### [Cluster Connections: RPC - endpoints](https://docs.solana.com/clusters)
>Remember: clients make calls to end points to connect to Solana clusters<br>
>[Devnet](https://api.devnet.solana.com) https://api.devnet.solana.com <br>
>[Testnet](https://api.testnet.solana.com) https://api.testnet.solana.com<br>
>[Mainnet Beta](https://api.mainnet-beta.solana.com) https://api.mainnet-beta.solana.com<br>
>[Localhost](http://localhost:8899) Default port: 8899 eg. http://localhost:8899, http://192.168.1.88:8899<br>
