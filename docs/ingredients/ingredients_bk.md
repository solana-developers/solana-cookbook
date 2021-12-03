---
title: Ingredients
---

## Overview
There are a handful of ingredients for developers that give Solana that sweet taste. We all know everything that tastes better, is better. Know what I am talking about? I am talking about what matters. Here are the core ingredients that make up those savory dishes. 


## Programs (smart contracts)

## Clients (smart contracts)

## Programs (smart contracts)



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
Accounts store state (data and lamports). Lamports are fractional units of native SOL (0.000000001). While programs themselves do not store state directly, accounts can be used to store all the state a program requires. How does this work? Accounts when setup are assigned an owner. The owner is a program that has exclusive control over any changes to state. The owner program is referenced using a program id (address, or publickey). Anyone can read an account, but only the program that owns the account has the authority to change or permit modifications to the account data, including any debits or transfers from an account balance. If an account is able to recieve SOL or Tokens, anyone can transfer or send a balance to the account. If an account is not owned by a program, the program is only permitted to read its data and credit the account. Why might an account not be able to recieve SOL? 

Accounts can be marked as executable. If the account is marked as executable it is treated as a program. Once marked executable the program data is immutable This is where a comparison to a file has been mentioned, as there appear to be some similarities to a file on your operating system. If a file is marked as executable, it can be loaded and executed by a program (in this case BPF Loader). If an account is not marked as executable, it is treated as a non executable account that can be read and updated based on permissions (authority and ownership), like a file. Accounts are marked executable during a successful program deployment by none other than the BPF Loader. The BPF loader is a native program of Solana and is in charge of deployments, upgrades, and executing programs on chain. This means the BPF Loader owns your program, and the program can own accounts in order to store any state it needs. Cool? 

When creating transactions, accounts should be annotated as read-write or read-only accounts. Only set an account to 'writable (read-write)' if thet ransaction will make changes to the account. Marking an account as read-only enables parallel account processing between transactions. The Solana runtime permits read-only accounts to be read concurrently by multiple programs. If a program attempts to modify a read-only account, the transaction is rejected by the runtime. All Accounts to be written to or read must be passed to the program inside a transaction. If an on-chain program modifies a read-only account, the transaction will be reverted. The first account will always be read-write since it is used to cover transaction fees. This same account could be a wallet or keypair, and commongly referred to as the 'fee payer'. This fee payer would also be a signer on their account. More on signers coming up. Speaking of fees, accounts are charged rent. Rent?

Lets start by saying that many types of accounts are required to post a minimum rent balance, thus exempting them from paying rent. This includes executable accounts such as programs and other types of account such as tokens. Basically there is a cost to storing the data, and because your placing some collateral up, rent will not get deducted. If and when these accounts are closed they can also collect any remaining balance left over. In general, Rent fees are charged for storing data on-chain. If an account is not rent exempt then a rent fee is deducted based on their space requirements. If an account has no balance left, it will be purged from memory by the runtime after the transaction. Fees are charged based on optimized calculations taking many variables into account, like space used for your account data (more rent and fee links to details below). For many circumstances you will want to create a rent-exempt account. Any account can be made rent-exempt if its balance is higher than some threshold that depends on the space it’s consuming. This can be calculated by calling a get minimum rent function. In most cases, you can close an account and send the remaining balance to a destination address. When sending transactions, some instructions like 'close' may require an account signer.

Signers/Signatures are used as a way to authorize transactions. Transactions may contain instructions that contain actions that require authorizations, such as transfers and account state changes. Remember, when submitting a transaction we include the instructions, accounts, and signatures as required. The various actions and logic inside of a program will determine which accounts and signatures are required. Programs can use these account signatures to authorize the actions that are executed while processing the instructions passed in from transactions. A typical account signer would typically be something like a wallet or keypair. A new type of signer introduced that is able to sign transactions on behalf of a program is called a PDA (Program Derived Address). This allows a program owned account to sign much in the same way a wallet or keypair would. More soon on PDAs.

Accounts Recap:
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