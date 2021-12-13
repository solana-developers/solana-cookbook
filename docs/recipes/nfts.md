---
title: Non Fungible Tokens (NFTs)
---

# Non Fungible Tokens (NFTs)

## Create a NFT

An NFT on Solana is simply an SPL-Token where only a single token has been minted.

To create a NFT, you will need to interact with both the [SystemProgram][1] and the [TokenProgram][2].

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/nfts/create-nft-token/create-nft-token.en.ts)

  </CodeGroupItem>
</CodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program
[2]: https://spl.solana.com/token
