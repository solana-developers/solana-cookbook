---
title: Basic Transactions
---

# Basic Transactions

## Sending SOL

To sending SOL, you will need to interact with the [SystemProgram][1].

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/sending-sol/sending-sol.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="Wallet-Adapter">

@[code](@/code/sending-sol/sending-sol.adapter.en.tsx)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/sending-sol/sending-sol.en.sh)

  </CodeGroupItem>
</CodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## Sending SPL-Tokens

Any tokens other than SOL currently use the [Token Program][1] to be
transferred. In order to send a SPL token, you need to know their
SPL token account address. You can both get the address and send tokens
with the following example.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/sending-spl-token/sending-spl-token.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="Wallet-Adapter">

@[code](@/code/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/sending-spl-token/sending-spl-token.en.sh)

  </CodeGroupItem>
</CodeGroup>

[1]: https://spl.solana.com/token

## Calculating Transaction Cost

The number of signatures a transaction requires are used to calculate
the transaction cost. As long as you are not create an account, this
will be the final transaction cost. To find out more about costs to create
and account, check out [calculating rent exemption](accounts.md#calculating-rent-exemption)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/calc-tx-cost/calc-tx-cost.en.ts)

  </CodeGroupItem>
</CodeGroup>