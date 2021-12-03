---
title: Desert Menu
---

# Desert
::: tip Yum
Let's start with desert! There are a handful of ingredients for developers that give Solana that sweet taste. We all know everything that tastes better, is better. Know what I am talking about? I am talking about what matters. Below is a tasty cheat sheet that quickly summarizes the core ingredients that make up those savory dishes. Remember to click on the links below for a deep dive into each ingredeient accompanied by plenty of resources and tasty recipes. Bon Appétit!
:::

#### Programs (smart contracts)
```bash:no-line-numbers
- Programs are STATELESS
- Require all DATA to be PASSED IN when sbumitting Transactions
- Created primarily in Rust and C++ programming languages
- Any language that can target compatible LLVM BPF Backend can be supported
- Deployed on-chain (`solana program deploy`)
- Have a single entry point where processing takes place, e.g. process_instruction
- Entry point params: program_id (pubkey), accounts (array), and instruction_data (byte array)
- Ethereum and EVM compatibility is available from Solang and NeonLabs
- Where can I store data on Solana if programs are stateless? Accounts
- Clients connect to an on-chain program using RPC to connect to a Solana Cluster
- Executed by the Solana runtime
```
#### Clients
::: tip <br>
- Clients interact with Solana via JSON RPC API Endpoints
- Clients submits transactions to a Cluster via these JSON RPC API Endpoints
- The Solana runtime will execute a program to process the instructions in a transactions
- Solana maintains several end points to Clusters including devnet, testnet, and mainnet
- Client SDKs are provided by Solana including web3, json rpc, CLI, and rust.
- Many 3rd Parties SDKs are available including c#, python, go, java, swift, and
:::

#### Transactions
::: tip <br>
- Each Transaction contains:
    - Accounts
    - One or more instructions
    - A RecentBlockHash
    - One or more Signatures
:::

#### Instructions 
::: tip <br>
- Each instruction contains a program address (id), accounts, and data.
- Instructions can be batched together inside a Transaction.
- Instructions are processed in order, and atomically.
- If anything part of an instruction fails, the transaction fails.
:::

#### Accounts
::: tip <br>
- Accounts store state (data and lamports)
- Programs can use accounts to store state
- Accounts are assigned an Owner Program
- Accounts can hold meta data 
- An example of meta data could be an Authority
- An authority can be checked on an account to authorize actions insid a program
- Accounts are charged rent based on space used
- Accounts can be made rent exempt by providing a minimum rent balance
- Accounts are passed into programs using Transactions
- Programs are actually Accounts marked as executable when deployed
- Transactions in addition to Instructions and Signatures include Accounts
- Accounts are marked as read-write, or read-only when including them in transactions
- Marking accounts as read-only can enable parallel account processing
- Account owners can provide signatures by signing a transaction
- Another type of account that can be used by a Program is a PDA
- A PDA (Program derived Account) gives the program a way provide a signature
:::

#### PDAs (Program Derived Addresses)

>contribute


#### CPI (Calling between Programs)

>contribute


#### Tokens (SPL-Token & NFTS)

>contribute

#### Wallets, Keypairs, Addresses (...?)

>contribute