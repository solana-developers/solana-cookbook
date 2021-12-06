---
title: Instructions
---

# Instructions

#### Takeout
- Each instruction contains a program id (address), accounts, and data.
- Instructions can be grouped together inside a Transaction.
- Instructions are processed in order, and atomically.
- If any part of an instruction fails, the transaction fails.

#### Delivery
Instructions contain a program Id (the program to talk to), accounts, and data. A program Id is the same as an address, or public key (pubkey). In other words, each instruction specifies a single program address (program Id) to send instructions to, a subset of accounts to be passed to the program, and data in the form of a byte array that is passed to the program. The program then operates on the accounts specified by the instructions. The program can return successfully, or with an error code. An error return causes the entire transaction to fail immediately. Each instruction caries data (byte array) that is passed to the program along with the accounts. The contents of the instruction data is program specific and typically used to convey what operations the program should perform, and any additional information those operations may need above and beyond what the accounts contain. Remember, each Solana transaction can include one or more instructions which each specify an on-chain program address and inputs. All instructions have to be executed succesfully in order for the transaction to be succcesfull. There is no explicit limit on the size of an instruction but note that the total serialized size of a transaction cannot exceed 1232 bytes. The accounts referenced by an instruction represent on-chain state and serve as both the inputs and outputs of a program. 

The Solana runtime will execute a program to process each of the instructions contained in the transaction, in order, and atomically. This means if anything fails in the transaction all account modifications are discarded.


#### Resources
