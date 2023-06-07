---
title: Interacting with Tokens
head:
  - - meta
    - name: title
      content: Solana Cookbook | Interacting with Tokens
  - - meta
    - name: og:title
      content: Solana Cookbook | Interacting with Tokens
  - - meta
    - name: description
      content: Learn how to use, transfer, and more with tokens on Solana
  - - meta
    - name: og:description
      content: Learn how to use, transfer, and more with tokens on Solana
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

# Token

## Ano ang kailangan ko para makapagsimula sa SPL-Tokens?

Sa tuwing nakikipag-ugnayan ka sa mga token sa Solana, ikaw talaga
nakikipag-ugnayan sa Solana Program Library Token, o SPL-Token
pamantayan. Ang pamantayan ng SPL-Token ay nangangailangan ng isang partikular na library upang
gamitin, na makikita mo sa ibaba batay sa iyong wika.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## Paano gumawa ng bagong Token

Ang paggawa ng mga token ay ginagawa sa pamamagitan ng paggawa ng tinatawag na "mint account".
Ang mint account na ito ay ginamit sa ibang pagkakataon upang mag-mint ng mga token sa token account ng isang user.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makakuha ng token mint

Upang makuha ang kasalukuyang supply, awtoridad, o mga decimal na mayroon ang isang token,
kakailanganin mong makuha ang impormasyon ng account para sa token mint.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano gumawa ng token account

Ang isang token account ay kinakailangan para sa isang user na humawak ng mga token.

Ang isang user ay magkakaroon ng kahit isang token account para sa bawat uri ng token na pagmamay-ari nila.

Ang Mga Kaugnay na Token Account ay tiyak na nilikha
account para sa bawat keypair. Ang mga ATA ay ang inirerekomendang paraan
ng pamamahala ng mga token account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makakuha ng Token Account

Ang bawat token account ay may impormasyon sa token tulad ng may-ari,
mint, halaga(balanse), at mga decimal.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makakuha ng balanse ng token account

Ang token account ay may balanse ng token, na maaaring makuha gamit ang a
iisang tawag.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Ang isang token account ay maaari lamang magkaroon ng isang uri ng mint. Kapag tinukoy mo ang isang token
account, tukoy ka rin ng mint.
:::

## Paano mag-mint ng mga token

Kapag nag-mint ka ng mga token, dinadagdagan mo ang supply at inilipat mo ang mga bagong token
sa isang partikular na token account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano maglipat ng mga token

Maaari kang maglipat ng mga token mula sa isang token account patungo sa isa pang token account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magsunog ng mga token

Maaari kang magsunog ng token kung ikaw ang may-ari ng token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano isara ang mga token account

Maaari mong isara ang isang token account kung ayaw mo na itong gamitin.
Mayroong dalawang sitwasyon:

1. Nakabalot na SOL - Ang pagsasara ng mga nagpalit na Nakabalot na SOL sa SOL
2. Iba pang mga Token - Maaari mo lamang itong isara kung ang balanse ng token account ay 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magtakda ng awtoridad sa mga token account o mints

Maaari mong itakda/i-update ang awtoridad. Mayroong 4 na uri:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano mag-apruba ng token delegate

Maaari kang magtakda ng delegado na may pinapayagang halaga. Pagkatapos mong magtakda, ang delegado ay parang isa pang may-ari ng iyong token account. `Ang isang token account ay maaari lamang magtalaga sa isang account sa parehong oras`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano bawiin ang isang token delegate

Itatakda ng pagbawi ang delegado sa null at itatakda ang delegadong halaga sa 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano i-manage ang wrapped SOL

Nakabalot na SOL tulad ng ibang token mint. Ang pagkakaiba ay gumagamit ng `syncNative`
at paggawa ng mga token account partikular sa `NATIVE_MINT` na address.

### Lumikha ng Token Account

Tulad ng [Gumawa ng Token Account](#create-token-account) ngunit palitan ang mint ng `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Magdagdag ng Balanse

Mayroong dalawang paraan upang magdagdag ng balanse para sa Wrapped SOL

#### 1. Sa pamamagitan ng SOL Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. By Token Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano makuha ang lahat ng token account ng may-ari

Maaari kang kumuha ng mga token account ng may-ari. Mayroong dalawang paraan upang gawin ito.

1. Kunin ang Lahat ng Token Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Filter By Mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
