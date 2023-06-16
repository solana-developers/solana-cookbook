---
title: Writing Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
  - - meta
    - name: og:description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
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

# Mga Programa sa Pagsusulat

## Paano maglipat ng SOL sa isang programa

Ang iyong Solana Program ay maaaring maglipat ng mga lampor mula sa isang account patungo sa isa pa
nang walang 'invoking' ang System program. Ang pangunahing tuntunin ay iyon
ang iyong programa ay maaaring maglipat ng mga lampor mula sa anumang account **pagmamay-ari** ng iyong programa
sa anumang account sa lahat.

Ang recipient account *ay hindi kailangang* isang account na pagmamay-ari ng iyong programa.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Paano makakuha ng orasan sa isang programa

Ang pagkuha ng orasan ay maaaring gawin sa dalawang paraan

1. Pagpasa ng `SYSVAR_CLOCK_PUBKEY` sa isang instruction
2. Pag-access sa Orasan nang direkta sa loob ng isang pagtuturo.

Nakakatuwang malaman ang parehong mga pamamaraan, dahil inaasahan pa rin ng ilang legacy na programa ang `SYSVAR_CLOCK_PUBKEY` bilang isang account.

### Pagpasa ng Orasan bilang isang account sa loob ng isang pagtuturo

Gumawa tayo ng pagtuturo na tumatanggap ng account para sa pagsisimula at ang sysvar pubkey

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ngayon ipinapasa namin ang sysvar pampublikong address ng orasan sa pamamagitan ng kliyente

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Pag-access sa Orasan nang direkta sa loob ng isang pagtuturo

Gumawa tayo ng parehong pagtuturo, ngunit hindi inaasahan ang `SYSVAR_CLOCK_PUBKEY` mula sa panig ng kliyente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ang instruction sa client-side, ngayon ay kailangan lamang na ipasa ang mga account ng estado at nagbabayad.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano baguhin ang laki ng account

Maaari mong baguhin ang laki ng account na pagmamay-ari ng program gamit ang paggamit
ng `realloc`. Maaaring i-resize ng `realloc` ang isang account hanggang 10KB.
Kapag gumamit ka ng `realloc` upang palakihin ang laki ng isang account,
kailangan mong maglipat ng mga lampara upang mapanatili ang account na iyon
rent-exempt.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano gawin ang Cross Program Invocation

Ang isang cross program invocation, ay simpleng pagtawag sa isa pa
pagtuturo ng programa sa loob ng aming programa. Isang pinakamagandang halimbawa
ang ilalabas ay ang `swap` functionality ng Uniswap. Ang
Ang kontrata ng `UniswapV2Router`, ay tumatawag sa kinakailangang lohika sa
swap, at tinatawagan ang function ng paglilipat ng kontrata ng `ERC20`
upang magpalit mula sa isang tao patungo sa isa pa. Sa parehong paraan, kaya natin
tumawag sa pagtuturo ng isang programa upang magkaroon ng maraming layunin.

Tingnan natin ang aming unang halimbawa na kung saan ay ang
`Paglipat ng SPL Token Program` na pagtuturo. Ang kinakailangan
ang mga account na kakailanganin namin para mangyari ang paglilipat ay

1. Ang Source Token Account (Ang account na hawak namin ng aming mga token)
2. Ang Destination Token Account (Ang account kung saan namin ililipat ang aming mga token)
3. Ang May-ari ng Source Token Account (Ang aming wallet address kung saan kami pipirmahan)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
Ang kaukulang instruction ng kliyente ay ang mga sumusunod. Para sa pag-alam sa mga instruction sa paggawa ng mint at token, mangyaring sumangguni sa buong code sa malapit.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ngayon tingnan natin ang isa pang halimbawa, na pagtuturo ng `System Program's create_account`. Mayroong kaunting pagkakaiba sa pagitan ng nabanggit na pagtuturo at ito. Doon, hindi na namin kinailangang ipasa ang `token_program` bilang isa sa mga account sa loob ng function na `invoke`. Gayunpaman, may mga pagbubukod kung saan kailangan mong ipasa ang `program_id` ng invoking instruction. Sa aming kaso, ito ang magiging program_id ng `System Program's`. ("1111111111111111111111111111111111"). Kaya ngayon ang mga kinakailangang account ay magiging

1. Ang account ng nagbabayad na nagpopondo sa upa
2. Ang account na gagawin
3. Account ng System Program

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ang kaukulang client side code ay magiging ganito ang hitsura

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano gumawa ng PDA

Ang Programa Derived Address ay simpleng account na pagmamay-ari ng program, ngunit walang pribadong key. Sa halip, ang pirma nito ay nakuha sa pamamagitan ng isang hanay ng mga buto at isang paga (isang nonce na tinitiyak na ito ay off curve). Ang "**Pagbuo**" ng Programa Address ay iba sa "**paggawa**" nito. Maaaring bumuo ng PDA gamit ang `Pubkey::find_program_address`. Ang paglikha ng isang PDA ay mahalagang nangangahulugang simulan ang address na may espasyo at itakda ang estado dito. Ang isang normal na Keypair account ay maaaring gawin sa labas ng aming programa at pagkatapos ay i-feed upang simulan ang estado nito. Sa kasamaang palad, para sa mga PDA, ito ay ginawa sa kadena, dahil sa likas na katangian ng hindi makapag-sign sa ngalan ng sarili nito. Kaya't ginagamit namin ang `invoke_signed` upang maipasa ang mga binhi ng PDA, kasama ang lagda ng account sa pagpopondo na nagreresulta sa paglikha ng account ng isang PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

One can send the required accounts via client as follows

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magbasa ng mga account

Halos lahat ng mga instruction sa Solana ay mangangailangan ng hindi bababa sa 2 - 3 account, at babanggitin ang mga ito sa mga tagapangasiwa ng instruction kung anong pagkakasunud-sunod ang inaasahan sa mga hanay ng mga account na iyon. Ito ay medyo simple kung sasamantalahin natin ang paraan ng `iter()` sa Rust, sa halip na manu-manong ipahiwatig ang mga account. Ang pamamaraang `next_account_info` ay karaniwang hinihiwa ang unang index ng iterable at ibinabalik ang account na nasa loob ng array ng mga account. Tingnan natin ang isang simpleng pagtuturo na umaasa sa isang grupo ng mga account at nangangailangang i-parse ang bawat isa sa kanila.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano i-verify ang mga account

Dahil ang mga programa sa Solana ay stateless, kami bilang isang tagalikha ng programa ay kailangang tiyakin na ang mga account na naipasa ay napatunayan hangga't maaari upang maiwasan ang anumang malisyosong account entry. Ang mga pangunahing pagsusuri na maaaring gawin ng isa ay

1. Suriin kung ang inaasahang signer account ay aktwal na naka-sign
2. Suriin kung ang inaasahang account ng estado ay nasuri bilang nasusulat
3. Suriin kung ang inaasahang may-ari ng state account ay ang tinatawag na program id
4. Kung sinisimulan ang estado sa unang pagkakataon, tingnan kung nasimulan na ang account o hindi.
5. Suriin kung anumang mga cross program id na naipasa (kapag kinakailangan) ay tulad ng inaasahan.

Ang isang pangunahing instruction na nagpapasimula ng isang hero state account, ngunit sa mga nabanggit na pagsusuri ay tinukoy sa ibaba

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Paano magbasa ng maraming instruction mula sa isang transaksyon

Pinapayagan kami ng Solana na silipin ang lahat ng mga instruction sa kasalukuyang transaksyon. Maaari nating iimbak ang mga ito sa isang variable at
umulit sa kanila. Marami tayong magagawa dito, tulad ng pagsuri para sa mga kahina-hinalang transaksyon.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
