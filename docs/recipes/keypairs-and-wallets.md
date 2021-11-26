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

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Getting Keypair from a Secret

If you already have your secret, you can get your Keypair from secret
to test out your dApp.

1. From Bytes

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </CodeGroupItem>
</CodeGroup>

2. From Base58 String

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.ts)

  </CodeGroupItem>
</CodeGroup>


## Verify a Keypair

If you are given a keypair, you can verify whether or not the secret
matches the given public key

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Convert Mnemonic to Keypair

Many wallet extensions use mnemonics to represent their secret keys.
You can convert the mneomics to Keypairs for local testing.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/mnemonic-to-keypair.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/mnemonic-to-keypair.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Vanity PublicKeys

Vanity publickeys are keys that have start with specific characters.
For example, a person may want a publickey to start with "elv1s", or
maybe even "cook". These can help other people remember who the key
belongs to, making the key more easily identifiable.

Note: The more characters in your vanity address, the longer it will
take.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </CodeGroupItem>
</CodeGroup>
