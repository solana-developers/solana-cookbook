---
title: Local Development
---

# Local Development

## Setting Up Connections

When you are working on Solana development, you will need to connect
to a specific RPC API endpoint. Solana has 3 public development 
environments:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/connecting-cluster/connecting-cluster.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/connecting-cluster/connecting-cluster.en.sh)

  </CodeGroupItem>
</CodeGroup>

Finally, you can also connect to a private cluster, either one local or
running remotely with the following:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/connecting-private-cluster/connecting-private-cluster.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/connecting-private-cluster/connecting-private-cluster.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Airdropping SOL

When you're working locally, you need some SOL in order to send 
transactions. In non-mainnet environments you can achieve SOL by
airdropping it to your address

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/airdropping-sol/airdropping-sol.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/airdropping-sol/airdropping-sol.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Setting Up Local Validator

Testing your program code locally can be a lot more reliable than
testing on devnet, and can help you test before trying it out on devnet.

You can setup your local-test-validator by installing the solana tool suite 
and running 

```console
solana-test-validator
```

Benefits of using local-test-validator include:

- No RPC rate-limits 
- No airdrop limits
- Direct on-chain program deployment (`--bpf-program ...`)
- Clone accounts from a public cluster, including programs (`--clone ...`)
- Configurable transaction history retention (`--limit-ledger-size ...`)
- Configurable epoch length (`--slots-per-epoch ...`)
- Jump to an arbitrary slot (`--warp-slot ...`)