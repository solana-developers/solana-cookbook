---
title: Serialization
head:
  - - meta
    - name: title
      content: Solana Cookbook | Serialization
  - - meta
    - name: og:title
      content: Solana Cookbook | Serialization
  - - meta
    - name: description
      content: Serialization is translating data so that it can be stored or transmitted and/or reconstructed. Learn about Serialization and more guides at The Solana cookbook.
  - - meta
    - name: og:description
      content: Serialization is translating data so that it can be stored, transmitted and/or reconstructed. Learn about Serialization and more guides at The Solana cookbook.
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

# Serialization

When we talk about serialization we mean both serializing data as well as deserialization of data.

Serialization comes into play at a few points along Solana program and program accounts lifecycle:

1. Serializing instruction data (Client)
2. Deserializing instruction data (Program)
3. Account Data Serialization (Program)
4. Client Account Data Deserialization (Client)

It is important that the above actions are all supported by the same serialization approach. The
included snippets are demonstrating serialization using [Borsh](#resources) with examples in Rust and Typescript.

The samples in the remainder of this document are excerpts as taken from the [Solana CLI Program Template](#resources)

## Setting up for Borsh Serialization

Libraries for Borsh must be setup for the Rust program, Rust client, Node and/or Python client.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## Serializing Instruction Data

<img src="./ser1.png" alt="Serialize Instruction Data">

If you are serializing outbound instruction data to send to a program it must mirror how the program deserializes the
inbound instruction data.

In this template, an instruction data block is a serialized array containing, with examples:

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | not applicable for instruction | not applicable for instruction |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | not applicable for instruction |
| Burn (2)                    | "foo"                          | not applicable for instruction |

In the following example we assume the program owned account has been initialized

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Deserialization of instruction data

<img src="./ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Account Data Serialization

<img src="./ser3.png" alt="Account Data Serialization">

The program account data block (from the sample repo) is layed out as

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Initialized flag | length of serialized BTreeMap | BTreeMap (where key value pairs are stored) |

### Pack

A word about the [Pack][1] trait

The Pack trait makes it easier to hide the details of account data serialization/deserialization
from your core Program instruction processing. So instead of putting all the serialize/deserialize
log in the program processing code, it encapsulates the details behind (3) functions:

1. `unpack_unchecked` - Allows you to deserialize an account without checking if it has been initialized. This
   is useful when you are actually processing the Initialization function (variant index 0)
2. `unpack` - Calls your Pack implementation of `unpack_from_slice` and checks if account has been initialized.
3. `pack` - Calls your Pack implementation of `pack_into_slice`

Here is the implementation of the Pack trait for our sample program. This is followed with the actual
processing of the account data using borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialization/Deserialization

To complete the underlying serialization and deserialization:

1. `sol_template_shared::pack_into_slice` - Where the actual serialization occurs
2. `sol_template_shared::unpack_from_slice` - Where the actual deserialization occurs

**Note** that in the following we have a `u32` (4 bytes) partition in the data layout for
`BTREE_LENGTH` preceding the `BTREE_STORAGE`. This is because borsh, during deserialization,
checks that the length of the slice you are deserializing agrees with the amount of
data it reads prior to actually recombobulation of the receiving object. The approach
demonstrated below first reads the `BTREE_LENGTH` to get the size to `slice` out of the
`BTREE_STROAGE` pointer.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Usage

The following pulls it all together and demonstrates how the program interacts with the `ProgramAccountState`
which encapsulates the initialization flag as well as the underlying `BTreeMap` for our key/value pairs.

First when we want to initialize a brand new account:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Now we can operate on our other instructions as the following demonstrates minting a new
key value pair that we demonstrated above when sending instructions from a client:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## Client Account Data Deserialization

Clients can call Solana to fetch program owned account, in which the serialized
data block is a part of the return. Deserializing requires knowing the data block
layout.

The layout of the account data was described [Here](#account-data-serialization)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Common Solana TS/JS Mappings

The [Borsh Specification](#resources) contains most mappings for primitive and
compound data types.

The key to TS/JS and Python is creating a Borsh Schema with a proper definition so the serialize
and deserialize can generate or walk the respective inputs.

Here we demonstrate serialization of primitives (numbers, strings) and compound types (fixed size array, Map)
first in Typescript, then in Python and then equivalent deserialization on the Rust side:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Advanced Constructs

We've shown how to create simple Payloads in previous examples. Sometimes
Solana throws a fastball with certain types. This section will demonstrate
proper mapping between TS/JS and Rust to handle those

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Resources

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
