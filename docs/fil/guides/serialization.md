---
title: Serializing Data
head:
  - - meta
    - name: title
      content: Solana Cookbook | Serializing Data
  - - meta
    - name: og:title
      content: Solana Cookbook | Serializing Data
  - - meta
    - name: description
      content: Learn how to serialize and deserialize data on Solana
  - - meta
    - name: og:description
      content: Learn how to serialize and deserialize data on Solana
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

# Pagse-serye ng Data

Kapag pinag-uusapan natin ang tungkol sa serialization, ang ibig sabihin ay parehong serializing data pati na rin ang deserialization ng data.

Naglalaro ang serialization sa ilang mga punto kasama ang lifecycle ng program at program account ng Solana:

1. Pagse-serye ng data ng pagtuturo sa kliyente
2. Deserializing data ng pagtuturo sa programa
3. Pagse-serye ng data ng Account sa programa
4. Deserializing Data ng Account sa kliyente

Mahalagang lahat ng mga aksyon sa itaas ay sinusuportahan ng parehong paraan ng serialization. Ang
ang mga kasamang snippet ay nagpapakita ng serialization gamit ang [Borsh](#resources).

Ang mga sample sa natitirang bahagi ng dokumentong ito ay mga sipi na kinuha mula sa [Solana CLI Program Template](#resources)

## Pagse-set up para sa Borsh Serialization

Ang mga library para sa Borsh ay dapat na setup para sa Rust program, Rust client, Node at/o Python client.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## Paano i-serialize ang data ng pagtuturo sa kliyente

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

Kung ikaw ay nagse-serialize ng papalabas na data ng pagtuturo upang ipadala sa isang program dapat itong i-mirror kung paano deserialize ng program ang
papasok na data ng pagtuturo.

Sa template na ito, ang isang bloke ng data ng pagtuturo ay isang serialized array na naglalaman ng, na may mga halimbawa:

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | not applicable for instruction | not applicable for instruction |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | not applicable for instruction |
| Burn (2)                    | "foo"                          | not applicable for instruction |

Sa sumusunod na halimbawa, ipinapalagay namin na ang account na pagmamay-ari ng programa ay nasimulan

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Paano i-deserialize ang data ng instruction sa programa

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Paano i-serialize ang data ng account sa program

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Ang bloke ng data ng account ng program (mula sa sample na repo) ay inilatag bilang

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Initialized flag | length of serialized BTreeMap | BTreeMap (where key value pairs are stored) |

### Pack

Isang salita tungkol sa katangian ng [Pack][1].

Pinapadali ng Pack trait na itago ang mga detalye ng serialization/deserialization ng data ng account
mula sa iyong pangunahing pagproseso ng pagtuturo ng Programa. Kaya sa halip na ilagay ang lahat ng serialize/deserialize
mag-log in sa code sa pagpoproseso ng programa, isinasama nito ang mga detalye sa likod ng (3) mga function:

1. `unpack_unchecked` - Binibigyang-daan kang i-deserialize ang isang account nang hindi tinitingnan kung ito ay nasimulan. Ito
    ay kapaki-pakinabang kapag aktwal mong pinoproseso ang pagpapaandar ng Initialization (variant index 0)
2. `unpack` - Tinatawag ang pagpapatupad ng iyong Pack ng `unpack_from_slice` at tinitingnan kung nasimulan na ang account.
3. `pack` - Tinatawag ang pagpapatupad ng iyong Pack ng `pack_into_slice`

Narito ang pagpapatupad ng Pack trait para sa aming sample na programa. Sinusundan ito ng aktwal
pagproseso ng data ng account gamit ang borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialization/Deserialization

Para kumpletuhin ang pinagbabatayan na serialization at deserialization:

1. `sol_template_shared::pack_into_slice` - Kung saan nangyayari ang aktwal na serialization
2. `sol_template_shared::unpack_from_slice` - Kung saan nangyayari ang aktwal na deserialization

**Tandaan** na sa mga sumusunod ay mayroon kaming `u32` (4 bytes) na partition sa layout ng data para sa
`BTREE_LENGTH` bago ang `BTREE_STORAGE`. Ito ay dahil borsh, sa panahon ng deseryalisasyon,
sinusuri na ang haba ng slice na iyong deserializing ay sumasang-ayon sa dami ng
data na binabasa nito bago ang aktwal na recombobulation ng receiving object. Ang diskarte
na ipinakita sa ibaba ay unang nagbabasa ng `BTREE_LENGTH` upang makuha ang laki na `hiwain` mula sa
`BTREE_STORAGE` na pointer.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Paggamit

Pinagsasama-sama ng sumusunod ang lahat at ipinapakita kung paano nakikipag-ugnayan ang program sa `ProgramAccountState`
na nakapaloob sa flag ng initialization pati na rin ang pinagbabatayan na `BTreeMap` para sa aming mga pares ng key/value.

Una kapag gusto nating magpasimula ng bagong account:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Ngayon ay maaari na kaming gumana sa aming iba pang mga instruction habang ang mga sumusunod ay nagpapakita ng paggawa ng bago
key value pair na ipinakita namin sa itaas noong nagpapadala ng mga instruction mula sa isang kliyente:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## Paano i-deserialize ang data ng account sa kliyente

Maaaring tawagan ng mga kliyente si Solana upang kunin ang account na pagmamay-ari ng program, kung saan ang serialized
Ang data block ay isang bahagi ng pagbabalik. Ang deserializing ay nangangailangan ng pag-alam sa block ng data
layout.

Ang layout ng data ng account ay inilarawan [dito](#account-data-serialization)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Mga Karaniwang Solana TS/JS Mappings

Ang [Borsh Specification](#resources) ay naglalaman ng karamihan sa mga pagmamapa para sa primitive at
tambalang uri ng data.

Ang susi sa TS/JS at Python ay ang paglikha ng Borsh Schema na may wastong kahulugan kaya ang serialize
at deserialize ay maaaring bumuo o maglakad sa kani-kanilang mga input.

Dito ipinapakita namin ang serialization ng mga primitive (mga numero, string) at mga uri ng tambalan (fixed size array, Map)
una sa Typescript, pagkatapos ay sa Python at pagkatapos ay katumbas na deserialization sa Rust side:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Advanced Constructs

Ipinakita namin kung paano gumawa ng mga simpleng Payload sa mga nakaraang halimbawa. Minsan
Naghahagis ng fastball si Solana na may ilang uri. Ipapakita ng seksyong ito
wastong pagmamapa sa pagitan ng TS/JS at Rust para mahawakan ang mga iyon

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Resources

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
