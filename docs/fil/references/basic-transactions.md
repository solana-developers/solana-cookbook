---
title: Sending Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sending Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Sending Transactions
  - - meta
    - name: description
      content: Learn Basic Transactions like Sending SOL, SPL-Tokens, Calculating Transaction Cost, and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Learn Basic Transactions like Sending SOL, SPL-Tokens, Calculating Transaction Cost, and more references for Building on Solana at The Solana cookbook.
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
---

# Nagpapadala ng mga Transaksyon

## Paano magpadala ng SOL

Upang magpadala ng SOL, kakailanganin mong makipag-ugnayan sa [SystemProgram][1].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## Paano magpadala ng mga SPL-Token

Gamitin ang [Token Program][1] para maglipat ng SPL Token. Para makapagpadala ng SPL token, kailangan mong malaman ang address ng SPL token account nito. Maaari mong parehong kunin ang address at magpadala ng mga token
kasama ang sumusunod na halimbawa.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## Paano kalkulahin ang gastos sa transaksyon

Ang bilang ng mga lagda na kailangan ng isang transaksyon ay ginagamit upang kalkulahin
ang halaga ng transaksyon. Hangga't hindi ka gumagawa ng account, ito
ang magiging huling halaga ng transaksyon. Upang malaman ang higit pa tungkol sa mga gastos sa paggawa
isang account, tingnan ang [calculating rent exemption](accounts.md#calculating-rent-exemption)

Ang dalawang halimbawa sa ibaba ay nagpapakita ng dalawang paraan na kasalukuyang magagamit upang kalkulahin ang tinantyang gastos sa transaksyon.

Ang unang halimbawa ay gumagamit ng `getEstimatedFee`, na isang bagong paraan sa `Transaction` na klase, habang ang pangalawang halimbawa ay gumagamit ng `getFeeForMessage` na pumapalit sa `getFeeCalculatorForBlockhash` sa `Connection` na klase.

### getEstimatedFee
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magdagdag ng memo sa isang transaksyon

Anumang transaksyon ay maaaring magdagdag ng mensahe gamit ang [memo program][2].
Sa kasalukuyan ang `programID` mula sa **Memo Program** ay kailangang idagdag
manu-manong `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Paano baguhin ang pagkalkula ng badyet, bayad, &amp; priyoridad para sa isang transaksyon
Ang priyoridad ng Transaction (TX) ay nakakamit sa pamamagitan ng pagbabayad ng Prioritization Fee in
karagdagan sa Base Fee. Bilang default, ang compute budget ay produkto ng
200,000 Compute Units (CU) * bilang ng mga instruction, na may max na 1.4M CU. Ang
Ang Base Fee ay 5,000 Lamports. Ang isang microLamport ay 0.000001 Lamports.

Ang kabuuang compute budget o Prioritization Fee para sa isang TX ay maaaring baguhin ng
pagdaragdag ng mga instruction mula sa ComputeBudgetProgram.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })`
ay magdaragdag ng Prioritization Fee sa itaas ng Base Fee (5,000 Lamports). Ang halaga
na ibinigay sa microLamports ay pararamihin sa badyet ng CU upang matukoy ang
Bayarin sa Prioritization sa Lamports. Halimbawa, kung ang iyong badyet sa CU ay 1M CU, at ikaw
magdagdag ng 1 microLamport/CU, ang Prioritization Fee ay magiging 1 Lamport (1M * 0.000001).
Ang kabuuang bayad ay magiging 5001 Lamports.

Gamitin ang `ComputeBudgetProgram.setComputeUnitLimit({ units: number })` para itakda
ang bagong compute budget. Papalitan ng value na ibinigay ang default na value.
Ang mga transaksyon ay dapat humiling ng pinakamababang halaga ng CU na kinakailangan para sa
execution para ma-maximize ang throughput, o mabawasan ang mga bayarin.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Program Logs Example ( [Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
