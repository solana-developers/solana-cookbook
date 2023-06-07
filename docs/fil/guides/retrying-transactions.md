---
title: Retrying Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Retrying Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Retrying Transactions
  - - meta
    - name: description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana cookbook.
  - - meta
    - name: og:description
      content: On some occasions, a seemingly valid transaction may be dropped before it is included in a block. To combat this, application developers are able to develop their own custom rebroadcasting logic. Learn about retrying transactions and more at The Solana cookbook.
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

# Sinusubukang muli ang mga Transaksyon

Sa ilang mga pagkakataon, ang isang tila wastong transaksyon ay maaaring i-drop bago ito isama sa isang bloke. Madalas itong nangyayari sa mga panahon ng pagsisikip ng network, kapag nabigo ang isang RPC node na i-rebroadcast ang transaksyon sa [lider](https://docs.solana.com/terminology#leader). Sa isang end-user, maaaring lumitaw na parang ganap na nawala ang kanilang transaksyon. Habang ang mga RPC node ay nilagyan ng generic na rebroadcasting algorithm, ang mga developer ng application ay may kakayahang bumuo ng kanilang sariling custom na rebroadcasting logic.

## Mga Katotohanan

::: tip Fact Sheet
- Susubukan ng mga RPC node na i-rebroadcast ang mga transaksyon gamit ang isang generic na algorithm
- Maaaring ipatupad ng mga developer ng application ang kanilang sariling custom na rebroadcasting logic
- Dapat samantalahin ng mga developer ang parameter na `maxRetries` sa `sendTransaction` JSON-RPC method
- Dapat paganahin ng mga developer ang mga pagsusuri sa preflight upang magtaas ng mga error bago isumite ang mga transaksyon
- Bago muling pumirma sa anumang transaksyon, **napakahalaga** upang matiyak na ang blockhash ng paunang transaksyon ay nag-expire na
:::

## Ang Paglalakbay ng isang Transaksyon

### Paano Nagsusumite ang Mga Kliyente ng Mga Transaksyon

Sa Solana, walang konsepto ng mempool. Ang lahat ng mga transaksyon, pinasimulan man ang mga ito sa programmatically o ng isang end-user, ay mahusay na iruruta sa mga pinuno upang maproseso ang mga ito sa isang block. Mayroong dalawang pangunahing paraan kung saan maaaring maipadala ang isang transaksyon sa mga pinuno:
1. Sa pamamagitan ng proxy sa pamamagitan ng isang RPC server at ang [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC method
2. Direkta sa mga pinuno sa pamamagitan ng [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

Ang karamihan sa mga end-user ay magsusumite ng mga transaksyon sa pamamagitan ng isang RPC server. Kapag ang isang kliyente ay nagsumite ng isang transaksyon, ang tatanggap na RPC node ay susubukan namang i-broadcast ang transaksyon sa kasalukuyan at susunod na mga pinuno. Hanggang sa ang transaksyon ay naproseso ng isang pinuno, walang talaan ng transaksyon sa labas ng kung ano ang nalalaman ng kliyente at ng mga relaying RPC node. Sa kaso ng isang TPU client, ang rebroadcast at pagpapasa ng lider ay ganap na pinangangasiwaan ng software ng kliyente.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### Paano Mga Transaksyon sa Pag-broadcast ng RPC Nodes

Pagkatapos makatanggap ng transaksyon ang isang RPC node sa pamamagitan ng `sendTransaction`, iko-convert nito ang transaksyon sa isang [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) packet bago ito ipasa sa mga nauugnay na pinuno. Pinapayagan ng UDP ang mga validator na mabilis na makipag-ugnayan sa isa't isa, ngunit hindi nagbibigay ng anumang mga garantiya tungkol sa paghahatid ng transaksyon.

Dahil alam nang maaga ang iskedyul ng pinuno ng Solana sa bawat [panahon](https://docs.solana.com/terminology#epoch) (~2 araw), direktang i-broadcast ng isang RPC node ang transaksyon nito sa kasalukuyan at susunod na mga pinuno. Kabaligtaran ito sa iba pang mga protocol ng tsismis tulad ng Ethereum na nagpapalaganap ng mga transaksyon nang random at malawak sa buong network. Bilang default, susubukan ng mga RPC node na ipasa ang mga transaksyon sa mga pinuno bawat dalawang segundo hanggang sa ma-finalize ang transaksyon o mag-expire ang blockhash ng transaksyon (150 block o ~1 minuto 19 segundo mula sa oras ng pagsulat na ito). Kung ang natitirang rebroadcast na laki ng queue ay mas malaki kaysa sa [10,000 mga transaksyon](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/srcctions/sendly/send-transaction-service/srcctions/sendly_service. ay ibinaba. May command-line [mga argumento](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) na maaaring isaayos ng mga operator ng RPC ang default na gawi na ito para baguhin ang default na pag-uugali. lohika.

Kapag nag-broadcast ang isang RPC node ng isang transaksyon, susubukan nitong ipasa ang transaksyon sa [Transaction Processing Unit (TPU)] ng isang lider(https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175/a760/validator .rs#L867). Pinoproseso ng TPU ang mga transaksyon sa limang natatanging yugto:
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

Sa limang yugtong ito, ang Fetch Stage ang may pananagutan sa pagtanggap ng mga transaksyon. Sa loob ng Fetch Stage, ikakategorya ng mga validator ang mga papasok na transaksyon ayon sa tatlong port:
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) handles regular transactions such as token transfers, NFT mints, and program instructions
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) focuses exclusively on voting transactions
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) forwards unprocessed packets to the next leader if the current leader is unable to process all transactions 

Para sa higit pang impormasyon sa TPU, mangyaring sumangguni sa [mahusay na pagsulat na ito ng Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Paano Nababawasan ang Mga Transaksyon

Sa buong paglalakbay ng isang transaksyon, may ilang mga sitwasyon kung saan ang transaksyon ay maaaring hindi sinasadyang i-drop mula sa network.

### Bago maproseso ang isang transaksyon

Kung ang network ay nag-drop ng isang transaksyon, ito ay malamang na gawin ito bago ang transaksyon ay naproseso ng isang pinuno. Ang UDP [packet loss](https://en.wikipedia.org/wiki/Packet_loss) ay ang pinakasimpleng dahilan kung bakit ito maaaring mangyari. Sa panahon ng matinding pag-load ng network, posible ring ma-overwhelm ang mga validator sa dami ng mga transaksyong kinakailangan para sa pagproseso. Bagama't ang mga validator ay nilagyan ng mga surplus na transaksyon sa pamamagitan ng `tpu_forwards`, may limitasyon sa dami ng data na maaaring [ipasa](https://github.com/solana-labs/solana/blob/master/core/src /banking_stage.rs#L389). Higit pa rito, ang bawat pasulong ay limitado sa isang solong hop sa pagitan ng mga validator. Ibig sabihin, ang mga transaksyong natanggap sa `tpu_forwards` port ay hindi ipinapasa sa ibang mga validator.

Mayroon ding dalawang hindi gaanong kilalang dahilan kung bakit maaaring i-drop ang isang transaksyon bago ito maproseso. Ang unang senaryo ay nagsasangkot ng mga transaksyon na isinumite sa pamamagitan ng isang RPC pool. Paminsan-minsan, ang bahagi ng RPC pool ay maaaring sapat na nauuna sa natitirang bahagi ng pool. Maaari itong magdulot ng mga isyu kapag ang mga node sa loob ng pool ay kinakailangang magtulungan. Sa halimbawang ito, ang [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) ng transaksyon ay na-query mula sa advanced na bahagi ng pool (Backend A). Kapag isinumite ang transaksyon sa lagging bahagi ng pool (Backend B), hindi makikilala ng mga node ang advanced blockhash at ibababa ang transaksyon. Maaari itong matukoy sa pagsusumite ng transaksyon kung ie-enable ng mga developer ang [preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) sa `sendTransaction`.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Ang pansamantalang network forks ay maaari ding magresulta sa mga bumabagsak na transaksyon. Kung ang validator ay mabagal na i-replay ang mga block nito sa loob ng Banking Stage, maaari itong humantong sa paglikha ng minority fork. Kapag ang isang kliyente ay bumuo ng isang transaksyon, posible para sa transaksyon na sumangguni sa isang `recentBlockhash` na umiiral lamang sa minority fork. Pagkatapos maisumite ang transaksyon, maaaring lumipat ang cluster mula sa minority fork nito bago maproseso ang transaksyon. Sa sitwasyong ito, ang transaksyon ay bumaba dahil sa blockhash na hindi nahanap.

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Pagkatapos maproseso ang isang transaksyon at bago ito ma-finalize

Kung ang isang transaksyon ay sumangguni sa isang `recentBlockhash` mula sa isang minorya na tinidor, posible pa ring maproseso ang transaksyon. Sa kasong ito, gayunpaman, ito ay ipoproseso ng pinuno sa tinidor ng minorya. Kapag sinubukan ng pinunong ito na ibahagi ang mga naprosesong transaksyon nito sa natitirang bahagi ng network, mabibigo itong maabot ang consensus sa karamihan ng mga validator na hindi kumikilala sa minority fork. Sa oras na ito, aalisin ang transaksyon bago ito ma-finalize.

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Pangangasiwa sa mga Nahulog na Transaksyon

Bagama't susubukan ng mga RPC node na i-rebroadcast ang mga transaksyon, ang algorithm na ginagamit nila ay generic at kadalasang hindi angkop para sa mga pangangailangan ng mga partikular na application. Upang maghanda para sa mga oras ng pagsisikip ng network, dapat i-customize ng mga developer ng application ang kanilang sariling lohika sa pag-rebroadcasting.

### Isang Malalim na Pagtingin sa sendTransaction

Pagdating sa pagsusumite ng mga transaksyon, ang `sendTransaction` na paraan ng RPC ay ang pangunahing tool na available sa mga developer. Ang `sendTransaction` ay responsable lamang sa pag-relay ng isang transaksyon mula sa isang kliyente patungo sa isang RPC node. Kung natanggap ng node ang transaksyon, ibabalik ng `sendTransaction` ang transaction id na maaaring magamit upang subaybayan ang transaksyon. Ang isang matagumpay na tugon ay hindi nagsasaad kung ang transaksyon ay ipoproseso o isasapinal ng cluster.

:::tip
#### Request Parameters
- `transaksyon`: `string` - ganap na nilagdaan na Transaksyon, bilang naka-encode na string
- (opsyonal) `configuration object`: `object`
     - `skipPreflight`: `boolean` - kung totoo, laktawan ang preflight transaction checks (default: false)
     - (opsyonal) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) na antas na gagamitin para sa preflight simulation laban sa slot ng bangko (default: "na-finalize").
     - (opsyonal) `encoding`: `string` - Encoding na ginagamit para sa data ng transaksyon. Alinman sa "base58" (mabagal), o "base64". (default: "base58").
     - (opsyonal) `maxRetries`: `usize` - Maximum na dami ng beses para muling subukan ng RPC node na ipadala ang transaksyon sa pinuno. Kung hindi ibinigay ang parameter na ito, muling susubukan ng RPC node ang transaksyon hanggang sa ito ay ma-finalize o hanggang sa mag-expire ang blockhash.

#### Response
- `transaction id`: `string` - Unang lagda ng transaksyon na naka-embed sa transaksyon, bilang base-58 na naka-encode na string. Ang transaction id na ito ay maaaring gamitin sa [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) upang mag-poll para sa mga update sa status.
:::

## Pag-customize ng Rebroadcast Logic

Upang makabuo ng kanilang sariling lohika sa pag-rebroadcast, dapat samantalahin ng mga developer ang parameter na `maxRetries` ng `sendTransaction`. Kung ibinigay, i-o-override ng `maxRetries` ang default na retry logic ng RPC node, na magbibigay-daan sa mga developer na manu-manong kontrolin ang proseso ng muling pagsubok [sa loob ng makatwirang mga hangganan](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6df9s5406df9s540f6dfb144d/ /main.rs#L1258-L1274).

Ang isang karaniwang pattern para sa manu-manong muling pagsubok sa mga transaksyon ay kinabibilangan ng pansamantalang pag-iimbak ng `lastValidBlockHeight` na nagmumula sa [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Kapag naitago na, maaaring [i-poll ng application ang blockheight ng cluster](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) at manu-manong subukang muli ang transaksyon sa naaangkop na agwat. Sa mga oras ng pagsisikip ng network, kapaki-pakinabang na itakda ang `maxRetries` sa 0 at manu-manong i-rebroadcast sa pamamagitan ng custom na algorithm. Bagama't maaaring gumamit ang ilang application ng algorithm ng [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), ang iba tulad ng [Mango](https://www.mango.markets/) ay nag-opt na [tuloy na muling isumite ](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) mga transaksyon sa pare-parehong pagitan hanggang sa magkaroon ng ilang timeout.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>


Kapag nagbobotohan sa pamamagitan ng `getLatestBlockhash`, dapat tukuyin ng mga application ang kanilang nilalayon na [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) na antas. Sa pamamagitan ng pagtatakda ng commitment nito sa `confirmed` (voted on) o `finalized` (~30 blocks pagkatapos ng `confirmed`), maiiwasan ng isang application ang pagboto ng blockhash mula sa minority fork.

Kung ang isang application ay may access sa mga RPC node sa likod ng isang load balancer, maaari din nitong piliing hatiin ang workload nito sa mga partikular na node. Ang mga RPC node na naghahatid ng mga kahilingang masinsinan sa data gaya ng [getProgramAccounts](./get-program-accounts.md) ay maaaring madaling mahuli at maaaring hindi angkop para sa pagpapasa ng mga transaksyon. Para sa mga application na nangangasiwa ng mga transaksyong sensitibo sa oras, maaaring maging maingat na magkaroon ng mga nakalaang node na humahawak lamang sa `sendTransaction`.

### Ang Gastos ng Paglaktaw Preflight

Bilang default, magsasagawa ang `sendTransaction` ng tatlong pagsusuri sa preflight bago magsumite ng transaksyon. Sa partikular, ang `sendTransaction` ay:
- I-verify na ang lahat ng mga lagda ay wasto
- Suriin na ang isinangguni na blockhash ay nasa loob ng huling 150 na bloke
- Gayahin ang transaksyon laban sa slot ng bangko na tinukoy ng `preflightCommitment`

Kung sakaling mabigo ang alinman sa tatlong pagsusuring ito bago ang paglipad, maglalabas ang `sendTransaction` ng error bago isumite ang transaksyon. Ang mga pagsusuri sa preflight ay kadalasang ang pagkakaiba sa pagitan ng pagkawala ng isang transaksyon at pagpapahintulot sa isang kliyente na maayos na pangasiwaan ang isang error. Upang matiyak na ang mga karaniwang error na ito ay isinasaalang-alang, inirerekomenda na ang mga developer ay panatilihing nakatakda ang `skipPreflight` sa `false`.

### Kailan Muli Mag-sign ng Mga Transaksyon

Sa kabila ng lahat ng pagtatangka na mag-rebroadcast, maaaring may mga pagkakataon na ang isang kliyente ay kinakailangan na muling pumirma sa isang transaksyon. Bago muling pumirma sa anumang transaksyon, **napakahalaga** upang matiyak na ang blockhash ng paunang transaksyon ay nag-expire na. Kung valid pa rin ang paunang blockhash, posibleng tanggapin ng network ang parehong mga transaksyon. Sa isang end-user, lalabas ito na parang hindi nila sinasadyang nagpadala ng parehong transaksyon nang dalawang beses.

Sa Solana, ang isang na-drop na transaksyon ay maaaring ligtas na itapon kapag ang blockhash na tinutukoy nito ay mas luma kaysa sa `lastValidBlockHeight` na natanggap mula sa `getLatestBlockhash`. Dapat subaybayan ng mga developer ang `lastValidBlockHeight` na ito sa pamamagitan ng pag-query sa [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) at paghahambing sa `blockHeight` sa tugon. Kapag na-invalidate ang isang blockhash, maaaring muling pumirma ang mga kliyente gamit ang isang bagong query na blockhash.

## Pasasalamat

Maraming salamat kay Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), at [Jito Labs](https://twitter.com/jito_labs) para sa kanilang pagsusuri at feedback.
