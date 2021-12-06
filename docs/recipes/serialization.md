---
title: Serialization
---

# Serialization

When we talk about serialization we mean both serializing data as well as deserialization of data.

Serialization comes into play at a few points along Solana program and program accounts lifecycle:

1. Serializing instruction data for transmitting to program
2. Program serializing/deserializing data in/out of a program owned accounts
3. Client deserializing data from a program owned account's data

It is important that the above actions are all supported by the same serialization approach. The
included snippets are demonstrating serializaation using Borsh with examples in Rust and Typescript/Javascript

## Serializing Instruction data for Transactions
<CodeGroup>
  <CodeGroupItem title="TS" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>

## Program deserialization of instruction data
<CodeGroup>
  <CodeGroupItem title="TS" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>

## Program serialization/deserialization of program owned account data
<CodeGroup>
  <CodeGroupItem title="TS" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>

## Client deserialization of program owned account data
<CodeGroup>
  <CodeGroupItem title="TS" active>
  </CodeGroupItem>

  <CodeGroupItem title="Rust">
  </CodeGroupItem>
</CodeGroup>
