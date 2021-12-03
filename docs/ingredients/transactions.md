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

#### Delivery
A Transaction contains one or more Instructions, Accounts, Signatures, and a Recent BlockHash. The blockhash is used to help validate and reject older transactions. The Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. Transaction currently have a size limit of 1232 bytes. A transaction can accept one or more signatures. Transactions are submitted to the cluster via the JSON RPC API Endpoint, where the transaction is. Currently, the amount of resources consumed by a transaction do not impact fees in any way.  The cost of a transaction is currently determined by the number of signatures. More info on fees and fee calculations if interested below.

Transaction Structure
| Field	            | Description
| ---------         | ------------
| accounts	        | List of accounts (read-only / read-write)
| instructions	    | List of instructions which each call an on-chain program.
| recentBlockhash	| Blockhash of recently produced block used as nonce.
| signatures	    | List of signatures.


#### Resources
[Transactions](https://docs.solana.com/developing/programming-model/transactions)
[Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
[Transaction Fees](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
[Transactions In Depth](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)