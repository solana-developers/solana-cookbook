---
title: Accounts
---

# Accounts

## Create a System Account

Create an account that the [System Program][1] owns. The Solana runtime will grant the owner of an account, access to write to its data or transfer lamports. When creating an account, we have to preallocate a fixed storage space in bytes (`space`) and enough lamports to cover the rent.
[Rent][2] is a cost incurred to keep accounts alive on Solana.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/create-system-account/create-system-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent