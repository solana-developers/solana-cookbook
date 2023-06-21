---
title: Migrating Program Data Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: og:title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
  - - meta
    - name: og:description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
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

# Paglilipat ng Mga Account ng Data ng Programa

## Paano mo maililipat ang mga data account ng isang programa?

Kapag gumawa ka ng program, ang bawat data account ay nauugnay doon
Ang programa ay magkakaroon ng isang tiyak na istraktura ng data. Kung kailangan mo
para mag-upgrade ng program derived account, magkakaroon ka ng isang grupo
ng mga natitirang account na nagmula sa programa na may lumang istraktura.

Sa account versioning, maaari mong i-upgrade ang iyong mga lumang account
ang bagong istraktura.

:::tip Tandaan
Isa lang ito sa maraming paraan para mag-migrate ng data sa Program Owned Accounts (POA).
:::

## Sitwasyon

Upang i-version at i-migrate ang aming data ng account, magbibigay kami ng **id** para sa bawat isa
account. Ang id na ito ay magbibigay-daan sa amin na matukoy ang bersyon ng account kung kailan
ipinapasa namin ito sa programa, at sa gayon ay pinangangasiwaan nang tama ang account.

Kunin ang sumusunod na estado at programa ng account:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Sa aming unang bersyon ng isang account, ginagawa namin ang sumusunod:

| ID | Aksyon |
| - | - |
|1| Magsama ng field na 'bersyon ng data' sa iyong data. Maaari itong maging isang simpleng incrementing ordinal (hal. u8) o isang bagay na mas sopistikado
|2| Paglalaan ng sapat na espasyo para sa paglago ng data
|3| Pagsisimula ng bilang ng mga constant na gagamitin sa mga bersyon ng program
|4| Magdagdag ng function ng update ng account sa ilalim ng `fn conversion_logic` para sa mga upgrade sa hinaharap

Sabihin nating gusto nating i-upgrade ngayon ang mga account ng aming programa para maisama
isang bagong kinakailangang field, ang field na `somestring`.

Kung hindi kami naglaan ng dagdag na espasyo sa nakaraang account, magagawa namin
hindi i-upgrade ang account at ma-stuck.

## Pag-upgrade ng Account

Sa aming bagong programa gusto nating magdagdag ng bagong property para sa estado ng nilalaman.
Ang mga kasunod na pagbabago ay kung paano namin ginamit ang paunang programa
mga konstruksyon habang ginagamit ang mga ito ngayon.

### 1. Magdagdag ng lohika ng conversion ng account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| (Mga) Linya | Tandaan |
| ------- | - |
| 6 | Idinagdag namin ang `solana_program::borsh::try_from_slice_unchecked` ni Solana upang pasimplehin ang pagbabasa ng mga subset ng data mula sa mas malaking data block
| 13-26| Dito napanatili namin ang lumang istraktura ng nilalaman, `AccountContentOld` na linya 24, bago palawigin ang `AccountContentCurrent` simula sa linya 17.
| 60 | Binabangga namin ang pare-parehong `DATA_VERSION`
| 71 | Mayroon na kaming 'nakaraang' na bersyon at gusto nating malaman ang laki nito
| 86 | Ang Coup de grace ay nagdaragdag ng code upang i-upgrade ang dating estado ng nilalaman sa bagong (kasalukuyang) estado ng nilalaman

Pagkatapos ay ina-update namin ang aming mga instruction, upang magdagdag ng bago para sa pag-update ng `somestring`, at processor para sa paghawak ng bagong pagtuturo. Tandaan na ang 'pag-upgrade' sa istraktura ng data ay naka-encapsulated sa likod ng `pack/unpack`

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Pagkatapos bumuo at magsumite ng instruction: `VersionProgramInstruction::SetString(String)` mayroon na kaming sumusunod na 'na-upgrade' na layout ng data ng account

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)