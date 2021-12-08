---
title: Serialization
---

# Serialization

When we talk about serialization we mean both serializing data as well as deserialization of data.

Serialization comes into play at a few points along Solana program and program accounts lifecycle:

1. Serializing instruction data (Client)
2. Deserializing instruction data (Program)
3. Serializing/deserializing account data (Program)
4. Deserializing data from an account (Client)

It is important that the above actions are all supported by the same serialization approach. The
included snippets are demonstrating serializaation using [Borsh][1] with examples in Rust and Typescript.

The samples in the remainder of this document are excerpts as taken from this [Solana Template][2]

And, program account data block is layed out as
|Byte 0 | Bytes 1-4 | Remaining Byte up to 1019
| - | - | -
| Initialized flag | length of serialized BTreeMap | BTreeMap


[1]: https://github.com/near/borsh-rs
[2]: https://github.com/hashblock/solana-cli-program-template

## Setting up for Borsh Serialization
Libraries for Borsh must be setup for the Rust program, Rust CLI, and Node

<CodeGroup>
  <CodeGroupItem title="Program">

  @[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="CLI" active>

  @[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node" active>

  @[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

</CodeGroup>

## Serializing Instruction data
If you are serializing outbound instruction data to send to a program it must mirror how the program deserializes the
inbound instruction data

In this template, an instruction data block is a serialized array containing

|Instruction (Variant index) | Serialized Key | Serialized Value
| - | - | -
| Mint (1) | "foo" | "bar"
| Transfer (2) | "foo" | not applicable for instruction
| Burn (2) | "foo" | not applicable for instruction


<CodeGroup>
  <CodeGroupItem title="TS Client" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

  @[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Deserialization of instruction data
<CodeGroup>
  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>

## Serialization/deserialization of account data
<CodeGroup>
  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>

## Deserialization of program owned account data
<CodeGroup>
  <CodeGroupItem title="TS" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>
