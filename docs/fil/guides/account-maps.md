---
title: Account Maps
---

# Mapa ng Account

Ang mga mapa ay mga istruktura ng data na madalas nating ginagamit sa programming upang iugnay ang isang **key** sa isang **value** ng ilang uri. Ang susi at halaga ay maaaring maging anumang arbitrary na uri at ang key ay gumaganap bilang isang identifier para sa isang naibigay na halaga na sini-save. Pagkatapos, dahil sa susi nito, ay nagbibigay-daan sa amin na mahusay na maipasok, kunin at i-update ang mga halagang ito nang mahusay.

Ang modelo ng Account ng Solana, tulad ng alam natin, ay nangangailangan ng data ng programa at ang nauugnay na data ng estado nito na maiimbak sa iba't ibang mga account. Ang mga account na ito ay may isang address na nauugnay sa kanila. Ito, sa kanyang sarili, ay gumaganap bilang isang mapa! Matuto pa tungkol sa Account mode ni Solana [dito][AccountCookbook].

Kaya, makatuwirang iimbak ang iyong **mga halaga** sa magkahiwalay na mga account, na ang address nito ang **key** na kinakailangan upang makuha ang halaga. Ngunit nagdudulot ito ng ilang isyu, tulad ng,

* Ang mga address na binanggit sa itaas ay malamang na hindi magiging perpektong **mga susi**, na maaari mong matandaan at makuha ang kinakailangang halaga.

* Ang mga address na binanggit sa itaas, ay tumutukoy sa mga pampublikong key ng iba't ibang **Pares ng Key**, kung saan ang bawat pampublikong susi (o *address*) ay magkakaroon ng **pribadong key** na nauugnay din dito. Ang pribadong key na ito ay kinakailangan na pumirma ng iba't ibang mga instruction kung at kapag kinakailangan, na nangangailangan sa amin na iimbak ang pribadong key sa isang lugar, na talagang **hindi** inirerekomenda!

Nagpapakita ito ng problemang kinakaharap ng maraming developer ng Solana, na nagpapatupad ng lohika na parang `Map` sa kanilang mga programa. Tingnan natin ang ilang paraan kung paano natin gagawin ang problemang ito,

## Pagkuha ng mga PDA

Ang PDA ay nangangahulugang [Program Derived Address][PDA], at sa madaling sabi, mga address **derived** mula sa isang set ng seeds, at isang program id (o _address_).

Ang natatanging bagay tungkol sa mga PDA ay, ang mga address na ito ay **hindi** nauugnay sa anumang pribadong key. Ito ay dahil ang mga address na ito ay hindi nasa ED25519 curve. Kaya naman, **lamang** ang programa, kung saan nagmula ang _address_ na ito, ang maaaring pumirma sa isang instruction gamit ang susi, basta ang mga buto rin. Matuto pa tungkol dito [dito][CPI].

Ngayong may ideya na tayo tungkol sa kung ano ang mga PDA, gamitin natin ang mga ito para imapa ang ilang account! Kukuha kami ng halimbawa ng isang **Blog** program upang ipakita kung paano ito ipapatupad.

Sa Blog program na ito, gusto nating magkaroon ng iisang `Blog` ang bawat `User`. Ang blog na ito ay maaaring magkaroon ng anumang bilang ng `Mga Post`. Nangangahulugan iyon na **namamapa** namin ang bawat user sa isang blog, at ang bawat post ay **namamapa** sa isang partikular na blog.

Sa madaling salita, mayroong `1:1` na pagmamapa sa pagitan ng isang user at ng kanyang blog, samantalang isang `1:N` na pagmamapa sa pagitan ng isang blog at mga post nito.

Para sa pagmamapa ng `1:1`, nais nating makuha ang address ng isang blog **lamang** mula sa user nito, na magbibigay-daan sa amin na kunin ang isang blog, na ibinigay sa awtoridad nito (o _user_). Samakatuwid, ang mga buto para sa isang blog ay bubuuin ng **authority's key** nito, at posibleng prefix ng **"blog"**, upang kumilos bilang type identifier.

Para sa pagmamapa ng `1:N`, gugustuhin nating makuha ang address ng bawat post **hindi lamang** mula sa blog kung saan ito nauugnay, kundi pati na rin sa isa pang **identifier**, na nagbibigay-daan sa amin na pag-iba-ibahin ang pagitan ng `N ` bilang ng mga post sa blog. Sa halimbawa sa ibaba, ang address ng bawat post ay hinango mula sa **blog's key**, isang **slug** upang matukoy ang bawat post, at isang prefix ng **"post"**, upang kumilos bilang type identifier.

Ang code ay tulad ng ipinapakita sa ibaba,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Sa panig ng kliyente, maaari mong gamitin ang `PublicKey.findProgramAddress()` upang makuha ang kinakailangang `Blog` at `Post` account address, na maaari mong ipasa sa `connection.getAccountInfo()` upang makuha ang data ng account. Ang isang halimbawa ay ipinapakita sa ibaba,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Isang Account sa Mapa

Ang isa pang paraan para ipatupad ang pagmamapa ay ang pagkakaroon ng `BTreeMap` na istraktura ng data na tahasang nakaimbak sa isang account. Ang mismong address ng account na ito ay maaaring isang PDA, o ang pampublikong key ng isang nabuong Keypair.

Ang pamamaraang ito ng pagmamapa ng mga account ay hindi perpekto dahil sa mga sumusunod na dahilan,

* Kailangan mo munang simulan ang account na nag-iimbak ng `BTreeMap`, bago mo maipasok ang mga kinakailangang key-value pairs dito. Pagkatapos, kakailanganin mo ring iimbak ang address ng account na ito sa isang lugar, upang ma-update ito sa bawat oras.

* May mga limitasyon sa memorya sa isang account, kung saan ang isang account ay maaaring magkaroon ng maximum na laki na **10 megabytes**, na naghihigpit sa `BTreeMap` sa pag-imbak ng malaking bilang ng mga pares ng key-value.

Samakatuwid, pagkatapos isaalang-alang ang iyong use-case, maaari mong ipatupad ang paraang ito tulad ng ipinapakita sa ibaba,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ang code sa panig ng kliyente upang subukan ang programa sa itaas ay magmumukhang isang bagay tulad ng ipinapakita sa ibaba,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address