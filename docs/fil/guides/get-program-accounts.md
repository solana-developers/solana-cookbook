---
title: Get Program Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Get Program Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Get Program Accounts
  - - meta
    - name: description
      content: Learn how to query data on Solana using getProgramAccounts and accountsDB
  - - meta
    - name: og:description
      content: Learn how to query data on Solana using getProgramAccounts and accountsDB
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

# Kumuha ng Mga Program Accounts

Isang paraan ng RPC na nagbabalik ng lahat ng account na pagmamay-ari ng isang programa. Kasalukuyang hindi sinusuportahan ang pagination. Ang mga kahilingan sa `getProgramAccounts` ay dapat isama ang mga parameter ng `dataSlice` at/o `filters` upang mapahusay ang oras ng pagtugon at magbalik lamang ng mga nilalayong resulta.

## Facts

::: tip Mga Parameter

- `programId`: `string` - Pubkey ng program na itatanong, na ibinigay bilang base58 na naka-encode na string
- (opsyonal) `configOrCommitment`: `object` - Mga parameter ng configuration na naglalaman ng mga sumusunod na opsyonal na field:
     - (opsyonal) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
     - (opsyonal) `encoding`: `string` - Encoding para sa data ng account, alinman sa: `base58`, `base64`, o `jsonParsed`. Tandaan, dapat gamitin ng mga user ng web3js ang [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
     - (opsyonal) `dataSlice`: `object` - Limitahan ang ibinalik na data ng account batay sa:
         - `offset`: `number` - Bilang ng mga byte sa data ng account upang simulan ang pagbabalik
         - `length`: `number` - Bilang ng mga byte ng data ng account na ibabalik
     - (opsyonal) `mga filter`: `array` - I-filter ang mga resulta gamit ang mga sumusunod na filter object:
         - `memcmp`: `object` - Itugma ang isang serye ng mga byte sa data ng account:
             - `offset`: `number` - Bilang ng mga byte sa data ng account upang simulan ang paghahambing
             - `bytes`: `string` - Data upang tumugma, bilang base58 na naka-encode na string ay limitado sa 129 bytes
         - `dataSize`: `number` - Inihahambing ang haba ng data ng account sa ibinigay na laki ng data
     - (opsyonal) `withContext`: `boolean` - I-wrap ang resulta sa isang [RpcResponse JSON object](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

#### Response

Bilang default, magbabalik ang `getProgramAccounts` ng hanay ng mga JSON object na may sumusunod na istraktura:

- `pubkey`: `string` - Ang account pubkey bilang base58 na naka-encode na string
- `account`: `object` - isang JSON object, na may mga sumusunod na sub field:
     - `lamports`: `number`, bilang ng lamports na itinalaga sa account
     - `may-ari`: `string`, Ang base58 na naka-encode na pubkey ng program kung saan nakatalaga ang account
     - `data`: `string` | `object` - data na nauugnay sa account, alinman bilang naka-encode na binary data o JSON na format depende sa ibinigay na parameter ng pag-encode
     - `executable`: `boolean`, Indikasyon kung ang account ay naglalaman ng program
     - `rentEpoch`: `number`, Ang panahon kung saan susunod na uutang ang account na ito
:::

## Deep Dive

Ang `getProgramAccounts` ay isang versatile na paraan ng RPC na ibinabalik ang lahat ng account na pagmamay-ari ng isang program. Maaari nating gamitin ang `getProgramAccounts` para sa ilang kapaki-pakinabang na query, gaya ng paghahanap ng:

- Lahat ng token account para sa isang partikular na wallet
- Lahat ng token account para sa isang partikular na mint (i.e. Lahat ng [SRM](https://www.projectserum.com/) may hawak)
- Lahat ng custom na account para sa isang partikular na programa (ibig sabihin, Lahat ng [Mango](https://mango.markets/) user)

Sa kabila ng pagiging kapaki-pakinabang nito, ang `getProgramAccounts` ay madalas na hindi maintindihan dahil sa mga kasalukuyang hadlang nito. Marami sa mga query na sinusuportahan ng `getProgramAccounts` ay nangangailangan ng mga RPC node na mag-scan ng malalaking set ng data. Ang mga pag-scan na ito ay parehong memory at resource intensive. Bilang resulta, ang mga tawag na masyadong madalas o masyadong malaki ang saklaw ay maaaring magresulta sa mga timeout ng koneksyon. Higit pa rito, sa oras ng pagsulat na ito, ang endpoint ng `getProgramAccounts` ay hindi sumusuporta sa pagination. Kung ang mga resulta ng isang query ay masyadong malaki, ang tugon ay puputulin.

Upang malampasan ang mga kasalukuyang hadlang na ito, nag-aalok ang `getProgramAccounts` ng ilang kapaki-pakinabang na parameter: ibig sabihin, `dataSlice` at ang mga opsyon sa `filters` na `memcmp` at `dataSize`. Sa pamamagitan ng pagbibigay ng mga kumbinasyon ng mga parameter na ito, maaari nating bawasan ang saklaw ng aming mga query hanggang sa mga mapapamahalaan at mahuhulaan na laki.

Ang isang karaniwang halimbawa ng `getProgramAccounts` ay kinabibilangan ng pakikipag-ugnayan sa [SPL-Token Program](https://spl.solana.com/token). Ang paghiling sa lahat ng account na pagmamay-ari ng Token Program na may [pangunahing tawag](../references/accounts.md#get-program-accounts) ay magsasangkot ng napakalaking dami ng data. Sa pamamagitan ng pagbibigay ng mga parameter, gayunpaman, maaari nating mahusay na humiling ng data na nilalayon nating gamitin.

### `mga filter`
Ang pinakakaraniwang parameter na gagamitin sa `getProgramAccounts` ay ang hanay ng `filters`. Tumatanggap ang array na ito ng dalawang uri ng mga filter, `dataSize` at `memcmp`. Bago gamitin ang alinman sa mga filter na ito, dapat na pamilyar tayo sa kung paano inilatag at na-serialize ang data na hinihiling namin.

#### `dataSize`
Sa kaso ng Token Program, makikita natin na [ang mga token account ay 165 bytes ang haba](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Sa partikular, ang isang token account ay may walong magkakaibang field, na ang bawat field ay nangangailangan ng predictable na bilang ng mga byte. Maaari nating mailarawan kung paano inilatag ang data na ito gamit ang paglalarawan sa ibaba.

![Laki ng Account](./get-program-accounts/account-size.png)

Kung gusto nating mahanap ang lahat ng token account na pagmamay-ari ng aming wallet address, maaari nating idagdag ang `{ dataSize: 165 }` sa aming hanay ng `filters` upang paliitin ang saklaw ng aming query sa mga account na eksaktong 165 bytes ang haba. Ito lamang, gayunpaman, ay hindi sapat. Kakailanganin din nating magdagdag ng filter na naghahanap ng mga account na pagmamay-ari ng aming address. Maaabot natin ito gamit ang filter na `memcmp`.

#### `memcmp`
Ang filter na `memcmp`, o filter na "paghahambing ng memorya," ay nagbibigay-daan sa amin na paghambingin ang data sa anumang field na nakaimbak sa aming account. Sa partikular, maaari lang kaming mag-query para sa mga account na tumutugma sa isang partikular na hanay ng mga byte sa isang partikular na posisyon. Ang `memcmp` ay nangangailangan ng dalawang argumento:

- `offset`: Ang posisyon kung saan magsisimulang maghambing ng data. Ang posisyon na ito ay sinusukat sa bytes at ipinahayag bilang isang integer.
- `bytes`: Ang data na dapat tumugma sa data ng account. Ito ay kinakatawan bilang isang base-58 na naka-encode na string ay dapat na limitado sa mas mababa sa 129 byte.

Mahalagang tandaan na ang `memcmp` ay magbabalik lamang ng mga resultang eksaktong tugma sa `bytes`. Sa kasalukuyan, hindi nito sinusuportahan ang mga paghahambing para sa mga value na mas mababa o mas malaki kaysa sa `bytes` na ibinibigay namin.

Alinsunod sa aming halimbawa ng Token Program, maaari nating baguhin ang aming query upang ibalik lamang ang mga token account na pagmamay-ari ng aming wallet address. Kapag tumitingin sa isang token account, makikita natin ang unang dalawang field na nakaimbak sa isang token account ay parehong mga pubkey, at ang bawat pubkey ay 32 byte ang haba. Dahil ang `may-ari` ay ang pangalawang field, dapat nating simulan ang ating `memcmp` sa isang `offset` na 32 bytes. Mula rito, maghahanap kami ng mga account na ang field ng may-ari ay tumutugma sa aming address ng wallet.

![Laki ng Account](./get-program-accounts/memcmp.png)

Maaari nating tawagan ang query na ito sa pamamagitan ng sumusunod na halimbawa:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

Sa labas ng dalawang parameter ng filter, ang ikatlong pinakakaraniwang parameter para sa `getProgramAccounts` ay `dataSlice`. Hindi tulad ng parameter na `filters`, hindi babawasan ng `dataSlice` ang bilang ng mga account na ibinalik ng isang query. Sa halip, lilimitahan ng `dataSlice` ang dami ng data para sa bawat account.

Katulad ng `memcmp`, ang `dataSlice` ay tumatanggap ng dalawang argumento:

- `offset`: Ang posisyon (sa bilang ng mga byte) kung saan magsisimulang ibalik ang data ng account
- `length`: Ang bilang ng mga byte na dapat ibalik

Partikular na kapaki-pakinabang ang `dataSlice` kapag nagpapatakbo kami ng mga query sa isang malaking dataset ngunit wala talagang pakialam sa data ng account mismo. Ang isang halimbawa nito ay kung gusto nating hanapin ang bilang ng mga token account (ibig sabihin, bilang ng mga may hawak ng token) para sa isang partikular na token mint.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

Sa pamamagitan ng pagsasama-sama ng lahat ng tatlong parameter (`dataSlice`, `dataSize`, at `memcmp`) maaari nating limitahan ang saklaw ng aming query at mahusay na ibalik lamang ang data kung saan kami interesado.

## Other Resources

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
