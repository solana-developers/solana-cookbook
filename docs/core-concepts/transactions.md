---
title: Transactions
---

# Transactions

#### Takeout
- Each Transaction contains:
    - Accounts
    - One or more instructions
    - A RecentBlockHash
    - One or more Signatures
- Limited to 1232 bytes

#### Delivery
A Transaction contains one or more Instructions, Accounts, Signatures, and a Recent BlockHash. The blockhash is used to help validate and reject older transactions. The Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. Transaction currently have a size limit of 1232 bytes. A transaction can accept one or more signatures. Transactions are submitted from a client to a cluster via a JSON RPC API Endpoint (i.e. https://api.devnet.solana.com). Currently, the amount of resources consumed by a transaction does not impact fees. The cost of a transaction is currently determined by the number of signatures. Many resources go into great detail about the process and depth of transactions, the fees and fee model, the structure of a transactions, and much more.

>Transaction Structure
>| Field	            | Description
>| ---------         | ------------
>| accounts	        | List of accounts (read-only / read-write)
>| instructions	    | List of instructions which each call an on-chain program.
>| recentBlockhash	| Blockhash of recently produced block used as nonce.
>| signatures	    | List of signatures.
>
> [Transaction Structure]((https://solana.wiki/docs/solidity-guide/transactions#solana-transaction-structure)) - @jstarry
> 

#### Resources
[Transactions](https://docs.solana.com/developing/programming-model/transactions)<br>
[Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions#solana-transaction-structure)<br>
[Transaction Fees](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)<br>
[Transactions In Depth](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)<br>
[Transaction Processing Model](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)