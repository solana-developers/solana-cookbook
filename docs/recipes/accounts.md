---
title: Accounts
---

# Accounts

## Create a System Account

Create an account that the [System Program][1] owns. The Solana runtime will grant the owner of an account, access to 
write to its data or transfer lamports. When creating an account, we have to preallocate a fixed storage space in bytes 
(`space`) and enough lamports to cover the rent. [Rent][2] is a cost incurred to keep accounts alive on Solana.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/create-system-account/create-system-account.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Calculating Rent Exemption

Keeping accounts alive on Solana incurs a storage cost called [rent][2]. An account can be made entirely exempt
from rent collection by depositing at least two years worth of rent. For the calculation, you need to consider
the amount of data you intend to store in the account. 

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent