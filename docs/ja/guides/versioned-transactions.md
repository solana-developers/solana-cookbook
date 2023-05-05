---
title: Versioned Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: description
      content: New and improved transaction format on Solana.
  - - meta
    - name: og:description
      content: New and improved transaction format on Solana.
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

# Versioned Transactions

Solana recently released Versioned Transactions. The proposed changes are as follows:

1. Introduce a new program which manages on-chain address lookup tables
    
2. Add a new transaction format which can make use of on-chain address lookup tables

## Facts

::: tip Fact Sheet
- Legacy transactions have a major issue: Maximum allowed size of 1232 bytes, and hence the number of accounts that can fit in an atomic transaction: 35 addresses.
- Address Lookup Tables (LUTs): Once accounts are stored in this table, the address of the table can be referenced in a transaction message using 1-byte u8 indices.
- `solana/web3.js`'s `createLookupTable()` can be used to construct a new lookup table, as well as determine its address.
- Once an LUT is created, it can be extended, ie., accounts can be appended to the table.
- Versioned Transactions: The structure of legacy transaction needs to be modified to incorporate LUTs
- Before versioning was introduced, txs left an unused upper bit in the first byte of their headers, which can be used to explicitly declare the version of txs
:::

We'll talk more about the above introduced changes and what they mean for developers. To understand the changes better, however, we need to first understand the anatomy of a regular (or legacy) transaction.

## Legacy Transaction

The Solana network uses a maximum transactional unit (MTU) size of 1280 bytes, adherent to the [IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) size constraints to ensure speed and reliability. This leaves **1232 bytes** for packet data like serialised transactions.

A transaction is comprised of:

1. A compact array of signatures, where each signature is a 64 byte [ed25519](https://ed25519.cr.yp.to/).  
2. A (legacy) message
    

![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Compact-Array format
 
A compact array is an array serialised to have the following components:
 
1. An array length in a multi-byte encoding called [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Followed by each array item  

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## Legacy Message

A Legacy Message has the following components:

1. A header
2. A compact-array of account addresses, where each account address takes 32 bytes
3. A recent blockhash
  * a 32-byte SHA-256 hash used to indicate when ledger was last observed. If a blockhash is too old, validators reject it.
4. A compact-array of Instructions
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### Header

The message header is 3 bytes in length and contains 3 u8 integers:
1. The number of required signatures: the Solana runtime verifies this number with the length of the compact array of signatures in the transaction.
2. The number of read-only account addresses that require signatures.
3. The number of read-only account addresses that do not require signatures.
    
![Message Header](./versioned-transactions/message_header.png)

### Compact-array of account addresses

This compact array starts with a compact-u16 encoding of the number of account addresses, followed by:

1. **Account addresses that require signatures**: The addresses that request read and write access are listed first, followed by the ones that request for read-only access
2. **Account addresses that do not require signatures**: Same as above, the addresses that request read and write access are listed first, followed by the ones that request for read-only access
    
![Compact array of account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### Compact array of instructions

Much like the array of account addresses, this compact array starts with a compact-u16 encoding of the number of instructions, followed by an array of instructions. Each instruction in the array has the following components:

1. **Program ID**: identifies an on-chain program that will process the instruction. This is represented as a u8 index to an address in the compact array of account addresses inside the message.   
2. **Compact array of account address indexes**: u8 indexes to a subset of account addresses in the compact array of account addresses, that require signatures.
3. **Compact array of opaque u8 data**: a general purpose byte array that is specific to the program ID mentioned before. This array of data specifies any operations that the program should perform and any additional information that the accounts might not contain.
    
![Compact array of Instructions](./versioned-transactions/compact_array_of_ixs.png)

## Issues with Legacy Transactions

What is the issue with the above Transaction model?

**The max size of a transaction, and hence the number of accounts that can fit in a single atomic transaction.**

As discussed earlier, the maximum allowed size of a transaction is **1232 bytes**. The size of an account address is 32 bytes. Thus, a transaction can at the very best store **35 accounts**, taking into account some space for headers, signatures and other metadata.

![Issue with legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

This is problematic as there are several cases where developers need to include 100s of signature-free accounts in a single transaction. This is currently not possible with the legacy transaction model. The solution currently being used is to temporarily store state on-chain and consume it later in transactions. This workaround does not work when multiple programs need to be composed in a single transaction. Each program requires multiple accounts as input and hence we fall into the same problem as before.

This is where **Address Lookup Tables (LUT)** are introduced.

## Address Lookup Tables (LUT)

The idea behind Address Lookup Tables is to store account addresses in a table-like (array) data structure on-chain. Once accounts are stored in this table, the address of the table can be referenced in a transaction message. To point to an individual account within the table, a 1-byte u8 index is needed.

![LUTs](./versioned-transactions/luts.png)

This opens up space as addresses need not be stored inside the transaction message anymore. They only need to be referenced in the form of an index within the array like table. This leads to a possibility of referencing 2^8=**256** accounts, as accounts are referenced using a u8 index.

LUTs need to be rent-exempt when initialised or whenever a new address is added to the table. Addresses can be added to this table either by an on-chain buffer, or by directly appending them to the table through the `Extension` instruction. Furthermore, LUTs can store associated metadata followed by a compact-array of accounts. Below you can see the structure of a typical Address Lookup Table.

![LUT Format](./versioned-transactions/lut_format.png)

One important pitfall of LUTs is that since address lookups require extra overhead during transaction processing, they usually incur higher costs for a transaction.

## Versioned Transactions: TransactionV0

The structure of legacy transaction needs to be modified to incorporate address table lookups. These changes should not break transaction processing on Solana, nor should they indicate any format changes to the invoked programs.

To ensure the above, it is important to explicitly mention the transaction type: `legacy` or `versioned`. How do we include this information in a transaction?

Before versioning was introduced, transactions left an unused upper bit in the first byte of their message headers: `num_required_signatures`. We can now use this bit to explicitly declare the version of our transactions.

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

If the first bit is set, the remaining bits in the first byte will encode a version number. Solana is beginning with “Version 0”, which is the versioned required to begin using LUTs.

If the first bit is not set, the transaction will be considered a “Legacy Transaction” and the remainder of the first byte will be treated as the first byte of an encoded legacy message.

## MessageV0

The structure of the new MessageV0 is more or less the same, except for two small but important changes:

1. **Message Header**: unchanged from legacy 
2. **Compact array of account keys**: unchanged from legacy. We will denote the array of indexes pointing to elements in this array as *index array A* (you will see why we are denoting this soon)
3. **Recent blockhash**: unchanged from legacy
4. **Compact array of instructions**: change from legacy
5. **Compact array of address table lookups**: introduced in v0
    
![Message v0](./versioned-transactions/messagev0.png)

We'll first discuss the structure of the compact array of address table lookups before seeing what changed in the instruction array.

### Compact array of address table lookups

This struct introduces Address Lookup Tables (LUT) to Versioned Transactions, hence enables the usage of LUTs for loading more readonly and writable accounts in a single transaction.

The compact array starts with a compact-u16 encoding of the number of address table lookups, followed by an array of address table lookups. Each lookup has the following structure:

1. **Account key**: account key of the address lookup table
2. **Writable indexes**: compact array of indexes used to load writable account addresses. We will denote this array as *index array B*.
3. **Readonly indexes**: compact array of indexes used to load readonly account addresses. We will denote this array as *index array C*.
    
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

Now let's see what changes were made in the instructions compact array

### Compact array of instructions

As discussed before, the compact array of legacy instructions stores individual legacy instructions that in-turn store the following:

1. Program ID index   
2. Compact array of account address indexes
3. Compact array of opaque 8-bit data
    

The change in the new instruction is not in the structure of the instruction itself, but the array being used to get indexes from for 1 and 2. In legacy transactions, a subset of the index array A is used, while in versioned transactions, a subset of the combined array of the following are used:

1. **index array A**: Compact array of accounts stored in the message    
2. **index array B**: Writable indexes in address table lookup
3. **index array C**: Readonly indexes in address table lookup
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## RPC Changes

Transaction responses will require a new version field: `maxSupportedTransactionVersion` to indicate to clients which transaction structure needs to be followed for deserialisation.

The following methods need to be updated to avoid errors:

* `getTransaction`
* `getBlock`
    

The following parameter needs to be added to the requests:

`maxSupportedTransactionVersion: 0`

If `maxSupportedTransactionVersion` is not explicitly added to the request, the transaction version will fallback to `legacy`. Any block that contains a versioned transaction will return with an error by the client in the case of a legacy transaction.

You can set this via JSON formatted requests to the RPC endpoint like below:

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

You can also do the same using the [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) library.

```js
// connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## Other Resources
* [How to build a Versioned Transaction](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [How to build a Versioned Transaction with Address Lookup using LUTs](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [Limitations of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [Security concerns of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [Alternate proposed solutions to Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## References
* [Transactions-V2 Proposal](https://beta.docs.solana.com/proposals/transactions-v2)
* [Developing with Versioned Transactions](https://beta.docs.solana.com/developing/versioned-transactions)