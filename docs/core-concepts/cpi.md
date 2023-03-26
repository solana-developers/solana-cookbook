---
title: Cross Program Invocations (CPIs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | CPIs
  - - meta
    - name: og:title
      content: Solana Cookbook | CPIs
  - - meta
    - name: description
      content: CPIs enable programs to call instructions on other programs, allowing for the composability of Solana programs. Learn about CPIs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: CPIs enable programs to call instructions on other programs, allowing for the composability of Solana programs. Learn about CPIs and more Core Concepts at The Solana cookbook.
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

# Cross Program Invocations (CPIs)

A Cross-Program Invocation (CPI) is a direct call from one program into another, allowing for the composability of Solana programs. Just as any client can call any program using the JSON RPC, any program can call any other program via a CPI. CPIs essentially turn the entire Solana ecosystem into one giant API that is at your disposal as a developer.

The purpose of this section is to provide a high-level overview CPIs. Please refer to the linked resources below for more detailed explanations, examples, and walkthroughs.

## Facts

::: tip Fact Sheet
- A Cross-Program Invocation (CPI) is a call from one program to another, targeting a specific instruction on the program being called
- CPIs allow the calling program to extend its signer privileges to the callee program
- Programs can execute CPIs using either `invoke` or `invoke_signed` within their instructions
- `invoke` is used when all required signatures are accessible prior to invocation, without the need for PDAs to act as signers
- `invoke_signed` is used when PDAs from the calling program are required as signers in the CPI
- After a CPI is made to another program, the callee program can make further CPIs to other programs, up to a maximum depth of 4
:::

## Deep Dive

Cross Program Invocations (CPIs) enable the composability of Solana programs, which allow developers to utilize and build on the instruction of existing programs.

To execute CPIs, use the [invoke](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke.html) or [invoke_signed](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke_signed.html) function found in the `solana_program` crate.

```rust
// Used when there are not signatures for PDAs needed
pub fn invoke(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>]
) -> ProgramResult

// Used when a program must provide a 'signature' for a PDA, hence the signer_seeds parameter
pub fn invoke_signed(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>],
    signers_seeds: &[&[&[u8]]]
) -> ProgramResult
```

To make a CPI, you must specify and construct an instruction on the program being invoked and supply a list of accounts necessary for that instruction. If a PDA is required as a signer, the `signers_seeds` must also be provided when using `invoke_signed`.

### CPI with `invoke`

The `invoke` function is used when making a CPI that does not require any PDAs to act as signers. When making CPIs, the Solana runtime extends the original signature passed into a program to the callee program.

```rust
invoke(
    &some_instruction,                           // instruction to invoke
    &[account_one.clone(), account_two.clone()], // accounts required by instruction
)?;
```

### CPI with `invoke_signed`

To make a CPI that requires a PDA as a signer, use the `invoke_signed` function and provide the necessary seeds to derive the required PDA of the calling program.

```rust
invoke_signed(
    &some_instruction,                   // instruction to invoke
    &[account_one.clone(), pda.clone()], // accounts required by instruction, where one is a pda required as signer
    &[signers_seeds],                    // seeds to derive pda
)?;
```

While PDAs have no private keys of their own, they can still act as a signer in an instruction via a CPI. To verify that a PDA belongs to the calling program, the seeds used to generate the PDA required as a signer must be included in as `signers_seeds`.

The Solana runtime will internally call `create_program_address` using the seeds provided and the `program_id` of the calling program. The resulting PDA is then compared to the addresses supplied in the instruction. If there's a match, the PDA is considered a valid signer.

### CPI `Instruction`

Depending on the program you're making the call to, there may be a crate available with helper functions for creating the `Instruction`. Many individuals and organizations create publicly available crates alongside their programs that expose these sorts of functions to simplify calling their programs.

The definition of the `Instruction` type required for a CPI includes:

- `program_id` - the public key of the program that executes the instruction
- `accounts` - a list of all accounts that may be read or written to during the execution of the instruction
- `data` -  the instruction data required by the instruction

```rust
pub struct Instruction {
    pub program_id: Pubkey,
    pub accounts: Vec<AccountMeta>,
    pub data: Vec<u8>,
}
```

The `AccountMeta` struct has the following definition:

```rust
pub struct AccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

When creating a CPI, use the following syntax to specify the `AccountMeta` for each account:

- `AccountMeta::new` - indicates writable
- `AccountMeta::new_readonly` - indicates *not* writable
- `(pubkey, true)` - indicates account is signer
- `(pubkey, false)` - indicates account is *not* signer

Here is an example:

```rust
use solana_program::instruction::AccountMeta;

let account_metas = vec![
    AccountMeta::new(account1_pubkey, true),
    AccountMeta::new(account2_pubkey, false),
    AccountMeta::new_readonly(account3_pubkey, false),
    AccountMeta::new_readonly(account4_pubkey, true),
]
```

### CPI `AccountInfo`

To use `invoke` and `invoke_signed`, a list of `account_infos` is also required. Similar to the list of `AccountMeta` in the instruction, you need to include all the `AccountInfo` of each account that the program you're calling will read from or write to.

For reference, the `AccountInfo` struct has the following definition:

```rust
/// Account information
#[derive(Clone)]
pub struct AccountInfo<'a> {
    /// Public key of the account
    pub key: &'a Pubkey,
    /// Was the transaction signed by this account's public key?
    pub is_signer: bool,
    /// Is the account writable?
    pub is_writable: bool,
    /// The lamports in the account.  Modifiable by programs.
    pub lamports: Rc<RefCell<&'a mut u64>>,
    /// The data held in this account.  Modifiable by programs.
    pub data: Rc<RefCell<&'a mut [u8]>>,
    /// Program that owns this account
    pub owner: &'a Pubkey,
    /// This account's data contains a loaded program (and is now read-only)
    pub executable: bool,
    /// The epoch at which this account will next owe rent
    pub rent_epoch: Epoch,
}
```

You can create a copy of the `AccountInfo` for each required account using the [Clone](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html#impl-Clone-for-AccountInfo%3C'a%3E) trait, which is implemented for the [AccountInfo](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html) struct in the `solana_program` crate.

```rust
let accounts_infos = [
    account_one.clone(),
    account_two.clone(),
    account_three.clone(),
];
```

While this section has provided a high-level overview of CPIs, more detailed explanations, examples, and walkthroughs can be found in the linked resources below.

## Other Resources
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)
- [Solana Cookbook Reference](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- [Solana Course Native CPI Lesson](https://www.soldev.app/course/cpi)
- [Solana Course Anchor CPI Lesson](https://www.soldev.app/course/anchor-cpi)
- [Solana Developers Program Examples](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation)
