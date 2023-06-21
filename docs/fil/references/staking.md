---
title: Staking
head:
  - - meta
    - name: title
      content: Solana Cookbook | Staking
  - - meta
    - name: og:title
      content: Solana Cookbook | Staking
  - - meta
    - name: description
      content: stake SOL and earn rewards for helping secure the network.
  - - meta
    - name: og:description
      content: Stake SOL and earn rewards for helping secure the network. Learn more about Creating Stake Accounts, Delegate Stake, Withdraw Stake and more references for Building on Solana at The Solana cookbook.
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
footer: MIT Licensed
---

# Pagtataya



## Kumuha ng Mga Kasalukuyang Validator

Maaari nating i-stake ang SOL at makakuha ng mga reward para sa pagtulong sa pag-secure ng network. Para i-stake, itinatalaga namin ang SOL sa mga validator na nagpoproseso naman ng mga transaksyon.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Gumawa ng Stake Account

Ang lahat ng mga instruction sa staking ay pinangangasiwaan ng [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Upang magsimula, gumawa kami ng [Stake Account](https://docs.solana.com/staking/stake-accounts) na ginawa at pinamamahalaan nang iba kaysa sa karaniwang [system account](accounts.md#create-a-system -account). Sa partikular, dapat nating itakda ang `Stake Authority` at `Withdrawal Authority` ng account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Delegate Stake

Kapag napondohan ang isang stake account, maaaring italaga ito ng `Stake Authority` sa isang validator. Ang bawat stake account ay maaari lamang italaga sa isang validator sa isang pagkakataon. Bilang karagdagan, ang lahat ng mga token sa account ay dapat na italaga o hindi itinalaga. Kapag na-delegate, kailangan ng ilang panahon para maging aktibo ang isang stake account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Kumuha ng Delegator ng mga Validator

Maaaring na-stakes ng maraming account sa isang partikular na validator account. Para makuha ang lahat ng staker, gagamitin namin ang `getProgramAccounts` o `getParsedProgramAccounts` API. Sumangguni sa [guides section](/guides/get-program-accounts.html) para sa higit pang impormasyon. Ang mga stake account ay 200 bytes ang haba at ang Voter Public Key ay nagsisimula sa 124 bytes. [Sanggunian](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## I-deactivate ang Stake

Sa anumang oras pagkatapos maitalaga ang isang stake account, maaaring piliin ng `Stake Authority` na i-deactivate ang account. Maaaring tumagal ng ilang panahon upang makumpleto ang pag-deactivate, at kinakailangan bago mabawi ang anumang SOL.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## I-withdraw ang Stake

Kapag na-deactivate, ang `Withdrawal Authority` ay maaaring mag-withdraw ng SOL pabalik sa isang system account. Kapag ang isang stake account ay hindi na na-delegate at may balanseng 0 SOL, ito ay epektibong masisira.

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
