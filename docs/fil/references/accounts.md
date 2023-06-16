---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Account References
  - - meta
    - name: og:title
      content: Solana Cookbook | Account References
  - - meta
    - name: description
      content: Learn more about accounts on Solana and how to use them in your programs.
  - - meta
    - name: og:description
      content: Learn more about accounts on Solana and how to use them in your programs.
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

# Accounts

## How to create a system account

Gumawa ng account na pagmamay-ari ng [System Program][1]. Ang Solana runtime ay magbibigay sa may-ari ng isang account, ng access sa
sumulat sa data nito o maglipat ng mga laport. Kapag gumagawa ng account, kailangan nating maglaan ng isang nakapirming espasyo sa imbakan sa mga byte
(`space`) at sapat na laport para mabayaran ang renta. Ang [Rent][2] ay isang gastos na natamo upang mapanatiling buhay ang mga account sa Solana.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano kalkulahin ang halaga ng account

Ang pagpapanatiling buhay ng mga account sa Solana ay nagkakaroon ng halaga ng storage na tinatawag na [renta][2]. Ang isang account ay maaaring gawing ganap na exempt
mula sa koleksyon ng upa sa pamamagitan ng pagdeposito ng hindi bababa sa dalawang taong halaga ng upa. Para sa pagkalkula, kailangan mong isaalang-alang
ang dami ng data na balak mong iimbak sa account.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Paano gumawa ng mga account gamit ang mga buto

Maaari mong gamitin ang `createAccountWithSeed` upang pamahalaan ang iyong mga account sa halip na gumawa ng grupo ng iba't ibang keypair.

### Bumuo

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Create

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Tanging isang account na pagmamay-ari ng system program ang maaaring ilipat sa pamamagitan ng system program.
:::

## Paano gumawa ng mga PDA

Ang [Program derived address (PDA)][3] ay tulad ng isang normal na address na may mga sumusunod na pagkakaiba:

1. Bumagsak sa ed25519 curve
2. Paggamit ng program para mag-sign sa halip na pribadong key

**Tandaan**: Ang mga PDA account ay maaari lamang gawin sa programa. Ang address ay maaaring gawin sa panig ng kliyente.

::: tip
Bagama't ang PDA ay hinango ng isang program id, hindi ito nangangahulugan na ang PDA ay pagmamay-ari ng parehong programa. (Kumuha ng halimbawa, maaari mong simulan ang iyong PDA bilang isang token account na isang account na pagmamay-ari ng token program)
:::

### Bumuo ng PDA

Ang `findProgramAddress` ay magdaragdag ng karagdagang byte sa dulo ng iyong seed.
Nagsisimula ito sa 255 hanggang 0 at ibinabalik ang unang off-curve na pampublikong key.
Palagi kang makakakuha ng parehong resulta kung pumasa ka sa parehong program id
at binhi.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Gumawa ng PDA

Nasa ibaba ang isang
halimbawa ng programa para sa paglikha ng isang PDA account na pagmamay-ari ng programa at isang halimbawa para sa pagtawag sa programa kasama ang kliyente.

#### Programa

Ang nasa ibaba ay nagpapakita ng iisang instruction na `system_instruction::create_account` na lumilikha ng account na may nakalaan na laki ng data na `space`, `rent_lamports` na halaga ng mga lampor para sa nagmula na PDA. Ito ay nilagdaan gamit ang PDA gamit ang `invoke_signed` katulad ng tinalakay sa itaas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano mag-sign gamit ang isang PDA

Ang mga PDA ay maaari lamang pirmahan sa loob ng programa. Nasa ibaba ang isang programa
halimbawa ng pagpirma sa isang PDA at pagtawag sa programa kasama ang kliyente.

### Programa

Ang ibaba ay nagpapakita ng isang pagtuturo na naglilipat ng SOL mula sa isang PDA na
ay hinango ng binhing `escrow` sa isang account na naipasa. Ang `invoke_signed` ay
ginamit upang pumirma sa PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makakuha ng mga program account

Ibalik ang lahat ng account na pagmamay-ari ng isang programa. Sumangguni sa [seksyon ng mga gabay](../guides/get-program-accounts.md) para sa higit pang impormasyon sa `getProgramAccounts` at ang configuration nito.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Paano isara ang mga account

Maaari mong isara ang isang account (burahin ang lahat ng nakaimbak na data) sa pamamagitan ng pag-alis ng lahat ng SOL. (maaari kang sumangguni sa [renta][2] para sa higit pang impormasyon)

#### Programa


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makakuha ng balanse sa account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Kung gusto mong makakuha ng balanse ng token, kakailanganin mong malaman ang address ng token account. Para sa higit pang impormasyon, tingnan ang [Token References](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
