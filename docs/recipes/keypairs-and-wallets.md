---
title: Keypairs and Wallets
---

# Keypairs and Wallets

## Generating a Keypair

Many of the different actions you can take with the various Solana
libraries require a Keypair or Wallet. If you are connecting to a 
wallet, you do not have to worry. However, if you are in need of a 
keypair, you will need to generate one.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/generate-keypair/generate-keypair.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/generate-keypair/generate-keypair.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Getting Keypair from a Secret

If you already have your secret, you can get your Keypair from secret
to test out your dApp.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypair-from-secret/keypair-from-secret.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI" active>

@[code](@/code/keypair-from-secret/keypair-from-secret.en.sh)

  </CodeGroupItem>
</CodeGroupItem>

## Verify a Keypair



## Convert Mnemonic to Keypair



## Vanity PublicKeys

