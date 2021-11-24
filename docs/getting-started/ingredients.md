---
title: Ingredients
---

# Ingredients
There are a handful of ingredients for developers that give Solana that sweet taste. We all know everything that taste better, is better. Know what I am talking about? I am talking about what matters. Here is the high level pasture to table. Details get linked.




## Programs (smart contracts)
Solana programs are created primarily in Rust and C/C++ but can be written in any programming language that can target the LLVM's BPF backend. Ethereum and EVM compatibility is currently available and supported by Neonlabs and Solang. This means Solana programs are able to be written in almost any smart contract language, including the higher performing more secure ones.

Programs are deployed on-chain via CLI and are executed via the Solana runtime. The runtime is the component of the validator responsible for program execution (more later). With the available tools, to deploy its a simple command or button click.

Programs are stateless. Separation of code and data. This means all required data is passed into the program. It means all the data your program needs must pass from the client to the program. In other words, yes, what I mean to say is, that the program itself stores no state and you must pass all the data required to execute your transactions. Clear?  Yes Chef.

Wait, if programs are stateless, how can we store data in programs? Accounts [..more later]

Solana also comes stacked with both Native programs and a suite of programs dubbed the SPL(Solana Program Library), hosted and maintained by Solana. These include programs like system, stake, vote, token, governance, and much more. And yes there is a program for NFTs :zombie: as well. You didnt know? Of course you did.

Excellent. That wraps up program on Solana. Let's recap:

Program Recap:
- Programs are Stateless. You must pass in all data for the program to process
- Deployed on-chain and is executable by the Solana runtime
- are created primarily in Rust and C++ programming languages
- Any language that can target compatible LLVM BPF Backend can be supported
- Ethereum and EVM compatibility is available from Solang and NeonLabs
- Where can I store data on Solana if programs are stateless? Accounts

## Clients
Clients or dapps interact with the Solana blockchain via JSON RPC API, defining an endpoint (like: https://api.devnet.solana.com), and sending transactions to a programs. Websockets are also available to subscribe to realtime updates. Solana Labs has created an easy to use Web3 SDK: @solana/web3.js, JSON RPC API, a CLI SDK, and a Rust API. A host of other Solana SDKs and 3rd party SDKs are also available, including but not limited to: c#, python, go, java, swift, and many more! Each of these SDKs gives you the power to build fully functional dApps on Solana in your favorite languages. <br>
[Available SDKs](/resources/sdks.md)

The 'endpoint' (Url) called by the client points to a Solana Cluster. A cluster is a set of validators working together to serve client transactions and maintain the transactions in the ledger. Solana maintains dedicated api nodes to fulfill JSON-RPC requests for each public cluster, and third parties may as well. Currently Solana maintains Devnet, Testnet, and Mainnetbeta.

Client Recap:
- Clients interact with Solana via JSON RPC API Endpoints
- Clients submits transactions to a Cluster via these JSON RPC API Endpoints
- The Solana runtime will execute a program to process the instructions in a transactions
- Solana maintains several end points to Clusters including devnet, testnet, and mainnet
- Client SDKs are provided by Solana including web3, json rpc, CLI, and rust.
- Many 3rd Parties SDKs are available including c#, python, go, java, swift, and

## Transactions 
A Transaction contains one or more Instructions, Accounts, Signatures, and a Recent BlockHash. The blockhash is used to help validate and reject older transactions. The Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. Transaction currently have a size limit of 1232 bytes. A transaction can accept one or more signatures. Transactions are submitted to the cluster via the JSON RPC API Endpoint, where the transaction is. Currently, the amount of resources consumed by a transaction do not impact fees in any way.  The cost of a transaction is currently determined by the number of signatures. More info on fees and fee calculations if interested below.

Transaction Structure
| Field	            | Description
| ---------         | ------------
| accounts	        | List of accounts (read-only / read-write)
| instructions	    | List of instructions which each call an on-chain program.
| recentBlockhash	| Blockhash of recently produced block used as nonce.
| signatures	    | List of signatures.


Transaction Recap:
- Each Transaction contains:
    - Accounts
    - One or more instructions
    - A RecentBlockHash
    - One or more Signatures

## Instructions 
Instructions contain a program Id (the program to talk to), accounts, and data. A program Id is the same as an address, or public key (pubkey). In other words, each instruction specifies a single program address (program Id) to send instructions to, a subset of accounts to be passed to the program, and data in the form of a byte array that is passed to the program. The program then operates on the accounts specified by the instructions. The program can return successfully, or with an error code. An error return causes the entire transaction to fail immediately. Each instruction caries data (byte array) that is passed to the program along with the accounts. The contents of the instruction data is program specific and typically used to convey what operations the program should perform, and any additional information those operations may need above and beyond what the accounts contain. Remember, each Solana transaction can include one or more instructions which each specify an on-chain program address and inputs. All instructions have to be executed succesfully in order for the transaction to be succcesfull. There is no explicit limit on the size of an instruction but note that the total serialized size of a transaction cannot exceed 1232 bytes. The accounts referenced by an instruction represent on-chain state and serve as both the inputs and outputs of a program. 

The Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. This means if anything fails in the transaction all account modifications are discarded.

Instructions Recap:
- Each instruction contains a program address (id), accounts, and data.
- Instructions can be batched together inside a Transaction.
- Instructions are processed in order, and atomically.
- If anything part of an instruction fails, the transaction fails.

## Accounts
Accounts are used to store state: data and SOL (lamports). Accounts have an address that is a 256-bit public key. Accounts are owned by Programs and are used to store state between transactions. Only the owner of an Account can modify or debit an Account. All Accounts to be written to or read must be passed to the program inside a transaction. Accounts may be annotated as read-write or read-only accounts. If an on-chain program modifies a read-only account, the transaction will be reverted. The first account will always be read-write since it is used to cover transaction fees. Rent fees are charged for storing data on-chain. An account can be made rent-exempt if its balance is higher than some threshold that depends on the space it’s consuming. This can be calculated by calling a get minimum rent function. Some accounts like token accounts are required to post a minimum rent. If an account is not rent exempt then a rent fee is deducted based on their space requirements. If an account has no balance left, it will be purged from memory by the runtime after the transaction. In most cases, you can close an account and send the remaining balance to a destination address. 

Transaction may include Signatures corresponding to the accounts public key (address) referenced by the transaction. These signatures are what can be used to authorize and validate operations on an account, such as debits, transfer, ownership, and writing data. You can add your own authorizations and logic based on validity of these signatures as well. When processing transaction instructions inside your programs, it is important to check the owner and authority of an account against a valid owner and signatures included in the transaction.

Read-Only: Accounts can be marked as Read-Only in order to enable parallel account processing between transactions. The runtime permits read-only accounts to be read concurrently by multiple programs. If a program attempts to modify a read-only account, the transaction is rejected by the runtime.

Accounts Recap:
- placeholder
- place
- p


## PDAs (Program Derived Addresses)

placeholder


## CPI (Calling between Programs)

placeholder


## Tokens (SPL-Token & NFTS)

placeholder

## Wallets, Keypairs, Addresses (...?)

placeholder



# Summary


## Resources

#placehodler  <br>  move? further reading?  resource section link <br>
[Available SDKs](/resources/sdks.md)
[Solana Clients](https://docs.solana.com/developing/clients/jsonrpc-api)

### Transactions
[Transactions](https://docs.solana.com/developing/programming-model/transactions)
[Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
[Transaction Fees](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
[Transactions In Depth](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)

### Accounts
[Accounts](https://docs.solana.com/developing/programming-model/accounts)
[Account Model](https://solana.wiki/docs/solidity-guide/accounts/)


### Cluster
[Cluster](https://docs.solana.com/clusters)

### RPC-EndPoints
[RPC-EndPoints](https://docs.solana.com/clusters)<br>
[Devnet](https://api.devnet.solana.com) https://api.devnet.solana.com <br>
[Testnet](https://api.testnet.solana.com) https://api.testnet.solana.com<br>
[Mainnet Beta](https://api.mainnet-beta.solana.com) https://api.mainnet-beta.solana.com<br>
[Localhost](http://localhost:8899) Default port: 8899 eg. http://localhost:8899, http://192.168.1.88:8899<br>

### Terminology

### 