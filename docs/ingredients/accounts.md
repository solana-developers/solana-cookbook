---
title: Accounts
---

# Accounts

#### Takeout
- Accounts store state (data and lamports)
- Accounts are used by Programs to store state
- Accounts are assigned an Owner Program
- Only an owner program can modify an Accounts state
- Account owners (i.e Wallets) can sign transactions by providing a signature
- Signatures are used to verify authenticity, ownership, and approval
- Verifying the owner of an account and program is important for security
- Accounts can hold meta data (i.e authority, name, description, price)
- An authority can be checked on an account to authorize actions inside a program
- Accounts are charged rent based on space used
- Accounts can be made rent exempt by supplying a minimum rent balance
- Accounts are passed into programs using Transactions
- Programs are actually Accounts marked as executable when deployed
- Transactions in addition to Instructions and Signatures include Accounts
- Accounts are marked as read-write, or read-only when including them in transactions
- Marking accounts as read-only can enable parallel account processing
- Account owners can provide signatures by signing a transaction
- Another type of account that can be used by a Program is a PDA
- A PDA (Program derived Account) gives a program a way provide a signature

#### Delivery
Accounts store state (data and lamports). Lamports are fractional units of native SOL (0.000000001). While programs themselves do not store state directly, accounts can be used to store all the state a program requires. How does this work? Accounts when setup are assigned an owner. The owner is a program that has exclusive control over any changes to state. The owner program is referenced using a program id (address, or publickey). Anyone can read an account, but only the program that owns the account has the authority to change or permit modifications to the account data, including any debits or transfers from an account balance. If an account is able to recieve SOL or Tokens, anyone can transfer or send a balance to the account. If an account is not owned by a program, the program is only permitted to read its data and credit the account. Why might an account not be able to recieve SOL? 

Accounts can be marked as executable. If the account is marked as executable it is treated as a program. Once marked executable the program data is immutable This is where a comparison to a file has been mentioned, as there appear to be some similarities to a file on your operating system. If a file is marked as executable, it can be loaded and executed by a program (in this case BPF Loader). If an account is not marked as executable, it is treated as a non executable account that can be read and updated based on permissions (authority and ownership), like a file. Accounts are marked executable during a successful program deployment by none other than the BPF Loader. The BPF loader is a native program of Solana and is in charge of deployments, upgrades, and executing programs on chain. This means the BPF Loader owns your program, and the program can own accounts in order to store any state it needs. Cool? 

When creating transactions, accounts should be annotated as read-write or read-only accounts. Only set an account to 'writable (read-write)' if thet ransaction will make changes to the account. Marking an account as read-only enables parallel account processing between transactions. The Solana runtime permits read-only accounts to be read concurrently by multiple programs. If a program attempts to modify a read-only account, the transaction is rejected by the runtime. All Accounts to be written to or read must be passed to the program inside a transaction. If an on-chain program modifies a read-only account, the transaction will be reverted. The first account will always be read-write since it is used to cover transaction fees. This same account could be a wallet or keypair, and commongly referred to as the 'fee payer'. This fee payer would also be a signer on their account. More on signers coming up. Speaking of fees, accounts are charged rent. Rent?

Lets start by saying that many types of accounts are required to post a minimum rent balance, thus exempting them from paying rent. This includes executable accounts such as programs and other types of account such as tokens. Basically there is a cost to storing the data, and because your placing some collateral up, rent will not get deducted. If and when these accounts are closed they can also collect any remaining balance left over. In general, Rent fees are charged for storing data on-chain. If an account is not rent exempt then a rent fee is deducted based on their space requirements. If an account has no balance left, it will be purged from memory by the runtime after the transaction. Fees are charged based on optimized calculations taking many variables into account, like space used for your account data (more rent and fee links to details below). For many circumstances you will want to create a rent-exempt account. Any account can be made rent-exempt if its balance is higher than some threshold that depends on the space it’s consuming. This can be calculated by calling a get minimum rent function. In most cases, you can close an account and send the remaining balance to a destination address. When sending transactions, some instructions like 'close' may require an account signer.

Signers/Signatures are used as a way to authorize transactions. Transactions may contain instructions that contain actions that require authorizations, such as transfers and account state changes. Remember, when submitting a transaction we include the instructions, accounts, and signatures as required. The various actions and logic inside of a program will determine which accounts and signatures are required. Programs can use these account signatures to authorize the actions that are executed while processing the instructions passed in from transactions. A typical account signer would typically be something like a wallet or keypair. A new type of signer introduced that is able to sign transactions on behalf of a program is called a PDA (Program Derived Address). This allows a program owned account to sign much in the same way a wallet or keypair would. More soon on PDAs.

#### Resources
[Accounts](https://docs.solana.com/developing/programming-model/accounts)
[Account Model](https://solana.wiki/docs/solidity-guide/accounts/)
