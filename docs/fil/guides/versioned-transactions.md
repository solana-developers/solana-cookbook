---
title: Versioned Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Versioned Transactions
  - - meta
    - name: description
      content: New and improved transaction format on Solana.
  - - meta
    - name: og:description
      content: New and improved transaction format on Solana.
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

# Mga Bersyon na Transaksyon

Inilabas kamakailan ni Solana ang Mga Bersyon na Transaksyon. Ang mga iminungkahing pagbabago ay ang mga sumusunod:

1. Magpakilala ng bagong programa na namamahala sa mga talahanayan ng paghahanap ng on-chain na address
    
2. Magdagdag ng bagong format ng transaksyon na maaaring gumamit ng on-chain na mga talahanayan ng paghahanap ng address

## Facts

::: tip Fact Sheet
- May malaking isyu ang mga legacy na transaksyon: Maximum na pinapayagang laki na 1232 bytes, at samakatuwid ang bilang ng mga account na maaaring magkasya sa isang atomic na transaksyon: 35 na address.
- Address Lookup Tables (LUTs): Kapag naimbak na ang mga account sa talahanayang ito, ang address ng talahanayan ay maaaring i-reference sa isang mensahe ng transaksyon gamit ang 1-byte u8 na mga indeks.
- Maaaring gamitin ang `solana/web3.js` na `createLookupTable()` upang bumuo ng bagong lookup table, pati na rin matukoy ang address nito.
- Kapag nalikha ang isang LUT, maaari itong palawigin, ibig sabihin, ang mga account ay maaaring idagdag sa talahanayan.
- Mga Bersyon na Transaksyon: Ang istraktura ng legacy na transaksyon ay kailangang baguhin upang maisama ang mga LUT
- Bago ipinakilala ang bersyon, nag-iwan ng hindi nagamit na upper bit ang mga tx sa unang byte ng kanilang mga header, na maaaring magamit upang tahasang ideklara ang bersyon ng txs
:::

Pag-uusapan pa natin ang tungkol sa mga ipinakilalang pagbabago sa itaas at kung ano ang ibig sabihin ng mga ito para sa mga developer. Upang mas maunawaan ang mga pagbabago, gayunpaman, kailangan muna nating maunawaan ang anatomy ng isang regular (o legacy) na transaksyon.

## Legacy na Transaksyon

Gumagamit ang Solana network ng maximum transactional unit (MTU) na laki na 1280 bytes, na sumusunod sa mga hadlang sa laki ng [IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) upang matiyak ang bilis at pagiging maaasahan. Nag-iiwan ito ng **1232 bytes** para sa packet data tulad ng mga serialized na transaksyon.

Ang isang transaksyon ay binubuo ng:

1. Isang compact na hanay ng mga lagda, kung saan ang bawat lagda ay isang 64 byte [ed25519](https://ed25519.cr.yp.to/).
2. Isang (legacy) na mensahe


![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Compact-Array format
 
Ang isang compact array ay isang array na naka-serialize upang magkaroon ng mga sumusunod na bahagi:
 
1. Isang haba ng array sa isang multi-byte na encoding na tinatawag na [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Sinusundan ng bawat array item

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## Legacy Message

Ang isang Legacy na Mensahe ay may mga sumusunod na bahagi:

1. Isang header
2. Isang compact-array ng mga address ng account, kung saan ang bawat address ng account ay tumatagal ng 32 byte
3. Isang kamakailang blockhash
   * isang 32-byte na SHA-256 hash na ginamit upang ipahiwatig kung kailan huling naobserbahan ang ledger. Kung ang isang blockhash ay masyadong luma, tinatanggihan ito ng mga validator.
4. Isang compact-array ng Mga Instruction
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### Header

Ang header ng mensahe ay 3 byte ang haba at naglalaman ng 3 u8 integer:

1. Ang bilang ng mga kinakailangang lagda: ang Solana runtime ay nagpapatunay sa numerong ito sa haba ng compact array ng mga lagda sa transaksyon.
2. Ang bilang ng mga read-only na address ng account na nangangailangan ng mga lagda.
3. Ang bilang ng mga read-only na address ng account na hindi nangangailangan ng mga lagda.
    
![Message Header](./versioned-transactions/message_header.png)

### Compact-array ng mga address ng account

Nagsisimula ang compact array na ito sa isang compact-u16 encoding ng bilang ng mga address ng account, na sinusundan ng:

1. **Mga address ng account na nangangailangan ng mga lagda**: Ang mga address na humihiling ng read at write access ay unang nakalista, na sinusundan ng mga address na humihiling ng read-only na access
2. **Mga address ng account na hindi nangangailangan ng mga lagda**: Katulad ng nasa itaas, unang nakalista ang mga address na humihiling ng read at write access, na sinusundan ng mga humihiling ng read-only na access
    
![Compact array of account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### Compact na hanay ng mga instruction

Katulad ng hanay ng mga address ng account, ang compact array na ito ay nagsisimula sa isang compact-u16 encoding ng bilang ng mga instruction, na sinusundan ng hanay ng mga instruction. Ang bawat pagtuturo sa array ay may mga sumusunod na bahagi:

1. **Program ID**: kinikilala ang isang on-chain program na magpoproseso ng pagtuturo. Ito ay kinakatawan bilang u8 index sa isang address sa compact na hanay ng mga address ng account sa loob ng mensahe.
2. **Compact na hanay ng mga index ng address ng account**: Ang u8 ay nag-i-index sa isang subset ng mga address ng account sa compact na hanay ng mga address ng account, na nangangailangan ng mga lagda.
3. **Compact array ng opaque u8 data**: isang general purpose byte array na partikular sa program ID na nabanggit dati. Ang hanay ng data na ito ay tumutukoy sa anumang mga operasyon na dapat gawin ng program at anumang karagdagang impormasyon na maaaring hindi naglalaman ng mga account.

![Compact array of Instructions](./versioned-transactions/compact_array_of_ixs.png)

## Mga Isyu sa Mga Legacy na Transaksyon

Ano ang isyu sa modelo ng Transaksyon sa itaas?

**Ang maximum na laki ng isang transaksyon, at samakatuwid ang bilang ng mga account na maaaring magkasya sa isang atomic na transaksyon.**

Gaya ng tinalakay kanina, ang maximum na pinapayagang laki ng isang transaksyon ay **1232 bytes**. Ang laki ng isang account address ay 32 bytes. Kaya, ang isang transaksyon ay maaaring mag-imbak ng **35 account** sa pinakamagandang tindahan, na isinasaalang-alang ang ilang espasyo para sa mga header, lagda at iba pang metadata.

![Issue with legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

Ito ay may problema dahil may ilang mga kaso kung saan ang mga developer ay kailangang magsama ng 100s ng signature-free account sa isang transaksyon. Kasalukuyang hindi ito posible sa legacy na modelo ng transaksyon. Ang solusyon na kasalukuyang ginagamit ay pansamantalang mag-imbak ng estado on-chain at gamitin ito sa ibang pagkakataon sa mga transaksyon. Hindi gumagana ang workaround na ito kapag maraming program ang kailangang buuin sa isang transaksyon. Ang bawat programa ay nangangailangan ng maramihang mga account bilang input at samakatuwid ay nahuhulog tayo sa parehong problema tulad ng dati.

Dito ipinakilala ang **Address Lookup Tables (LUT)**.

## Address Lookup Tables (LUT)

Ang ideya sa likod ng Address Lookup Tables ay ang pag-imbak ng mga address ng account sa isang tulad ng talahanayan (array) na istraktura ng data na on-chain. Kapag naimbak na ang mga account sa talahanayang ito, maaaring i-reference ang address ng talahanayan sa isang mensahe ng transaksyon. Upang tumuro sa isang indibidwal na account sa loob ng talahanayan, kailangan ng 1-byte na u8 index.

![LUTs](./versioned-transactions/luts.png)

Nagbubukas ito ng espasyo dahil hindi na kailangang itago ang mga address sa loob ng mensahe ng transaksyon. Kailangan lamang na i-reference ang mga ito sa anyo ng isang index sa loob ng array tulad ng talahanayan. Ito ay humahantong sa posibilidad ng pagtukoy sa 2^8=**256** na account, dahil ang mga account ay nire-reference gamit ang u8 index.

Kailangang maging rent-exempt ang mga LUT kapag nasimulan o kapag may idinagdag na bagong address sa talahanayan. Maaaring idagdag ang mga address sa talahanayang ito sa pamamagitan ng isang on-chain buffer, o sa pamamagitan ng direktang pagdaragdag sa mga ito sa talahanayan sa pamamagitan ng pagtuturo ng `Extension`. Higit pa rito, maaaring mag-imbak ang mga LUT ng nauugnay na metadata na sinusundan ng isang compact-array ng mga account. Sa ibaba makikita mo ang istraktura ng isang tipikal na Address Lookup Table.

![LUT Format](./versioned-transactions/lut_format.png)

Ang isang mahalagang patibong ng mga LUT ay dahil ang mga paghahanap ng address ay nangangailangan ng dagdag na overhead sa panahon ng pagproseso ng transaksyon, kadalasang nagkakaroon sila ng mas mataas na gastos para sa isang transaksyon.

## Mga Bersyon na Transaksyon: TransaksyonV0

Kailangang baguhin ang istruktura ng legacy na transaksyon upang maisama ang mga paghahanap sa talahanayan ng address. Hindi dapat masira ng mga pagbabagong ito ang pagpoproseso ng transaksyon sa Solana, at hindi rin dapat magpahiwatig ang mga ito ng anumang mga pagbabago sa format sa mga ini-invoke na programa.

Upang matiyak ang nasa itaas, mahalagang tahasang banggitin ang uri ng transaksyon: `legacy` o `versioned`. Paano namin isasama ang impormasyong ito sa isang transaksyon?

Bago ipinakilala ang bersyon, ang mga transaksyon ay nag-iwan ng hindi nagamit na upper bit sa unang byte ng kanilang mga header ng mensahe: `num_required_signatures`. Magagamit na namin ngayon ang bit na ito para tahasang ideklara ang bersyon ng aming mga transaksyon.

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

Kung ang unang bit ay nakatakda, ang natitirang mga bit sa unang byte ay mag-e-encode ng numero ng bersyon. Nagsisimula ang Solana sa "Bersyon 0", na kinakailangang bersyon upang simulan ang paggamit ng mga LUT.

Kung hindi nakatakda ang unang bit, ang transaksyon ay ituturing na "Legacy Transaction" at ang natitira sa unang byte ay ituturing bilang unang byte ng isang naka-encode na legacy na mensahe.

## MessageV0

Ang istraktura ng bagong MessageV0 ay halos pareho, maliban sa dalawang maliit ngunit mahalagang pagbabago:

1. **Message Header**: hindi binago mula sa legacy
2. **Compact array ng mga account key**: hindi nabago mula sa legacy. Ipapahiwatig namin ang hanay ng mga index na tumuturo sa mga elemento sa array na ito bilang *index array A* (makikita mo kung bakit namin ito tinutukoy sa lalong madaling panahon)
3. **Kamakailang blockhash**: hindi nabago mula sa legacy
4. **Compact na hanay ng mga instruction**: baguhin mula sa legacy
5. **Compact array ng address table lookups**: ipinakilala sa v0
    
![Message v0](./versioned-transactions/messagev0.png)

Tatalakayin muna natin ang istruktura ng compact na hanay ng mga paghahanap sa talahanayan ng address bago makita kung ano ang nagbago sa hanay ng pagtuturo.

### Compact na hanay ng mga paghahanap sa talahanayan ng address

Ang struct na ito ay nagpapakilala ng Address Lookup Tables (LUT) sa Mga Bersyon na Transaksyon, samakatuwid ay nagbibigay-daan sa paggamit ng mga LUT para sa pag-load ng higit pang readonly at masusulat na mga account sa iisang transaksyon.

Nagsisimula ang compact array sa isang compact-u16 encoding ng bilang ng mga paghahanap sa talahanayan ng address, na sinusundan ng isang hanay ng mga paghahanap sa talahanayan ng address. Ang bawat paghahanap ay may sumusunod na istraktura:

1. **Account key**: account key ng address lookup table
2. **Mga nasusulat na index**: compact na hanay ng mga index na ginagamit upang i-load ang mga naisusulat na address ng account. Ipatukoy namin ang array na ito bilang *index array B*.
3. **Readonly indexes**: compact array of indexes na ginagamit upang i-load ang readonly account address. Ipatukoy namin ang array na ito bilang *index array C*.
    
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

Ngayon tingnan natin kung anong mga pagbabago ang ginawa sa compact array ng mga instruction

### Compact na hanay ng mga instruction

Gaya ng tinalakay dati, ang compact na hanay ng mga legacy na instruction ay nag-iimbak ng mga indibidwal na legacy na instruction na nag-iimbak ng mga sumusunod:

1. Program ID index
2. Compact na hanay ng mga index ng address ng account
3. Compact na hanay ng opaque na 8-bit na data
    

Ang pagbabago sa bagong pagtuturo ay wala sa istruktura ng mismong pagtuturo, ngunit ang array na ginagamit upang makakuha ng mga index mula sa para sa 1 at 2. Sa mga legacy na transaksyon, isang subset ng index array A ang ginagamit, habang sa mga bersyong transaksyon, isang subset ng pinagsamang hanay ng mga sumusunod ay ginagamit:

1. **index array A**: Compact array ng mga account na nakaimbak sa mensahe
2. **index array B**: Mga nasusulat na index sa address table lookup
3. **index array C**: Readonly index sa address table lookup
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## Mga Pagbabago sa RPC

Ang mga tugon sa transaksyon ay mangangailangan ng bagong field ng bersyon: `maxSupportedTransactionVersion` upang isaad sa mga kliyente kung aling istraktura ng transaksyon ang kailangang sundin para sa deseryalisasyon.

Ang mga sumusunod na pamamaraan ay kailangang i-update upang maiwasan ang mga error:

* `getTransaction`
* `getBlock`
    

Ang sumusunod na parameter ay kailangang idagdag sa mga kahilingan:

`maxSupportedTransactionVersion: 0`

Kung ang `maxSupportedTransactionVersion` ay hindi tahasang idinagdag sa kahilingan, ang bersyon ng transaksyon ay magbabalik sa `legacy`. Anumang block na naglalaman ng isang bersyon na transaksyon ay babalik na may error ng kliyente sa kaso ng isang legacy na transaksyon.

Maaari mong itakda ito sa pamamagitan ng mga kahilingang naka-format sa JSON sa endpoint ng RPC tulad ng nasa ibaba:

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

Magagawa mo rin ang parehong gamit ang [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) library.

```js
// connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## Other Resources
* [How to build a Versioned Transaction](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [How to build a Versioned Transaction with Address Lookup using LUTs](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [Limitations of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [Security concerns of Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [Alternate proposed solutions to Versioned Transactions](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## References
* [Transactions-V2 Proposal](https://beta.docs.solana.com/proposals/transactions-v2)
* [Developing with Versioned Transactions](https://beta.docs.solana.com/developing/versioned-transactions)