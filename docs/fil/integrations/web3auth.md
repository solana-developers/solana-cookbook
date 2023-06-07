---
title: web3Auth (Torus Wallet)
head:
  - - meta
    - name: title
      content: Solana Cookbook | Wallet
  - - meta
    - name: og:title
      content: Solana Cookbook | Wallet
  - - meta
    - name: description
      content: Learn about wallets, integrating social logins, signing and verifying messages and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Learn about wallets, integrating social logins, signing and verifying messages and more references for Building on Solana at The Solana cookbook.
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

# Wallet

## Ano ang wallet?

Ang crypto wallet ay isang digital wallet na ginagamit upang makipag-ugnayan sa blockchain. Pinapayagan ka nitong mag-sign, mag-verify, at magpadala ng mga transaksyon. Mayroong maraming mga solusyon sa crypto wallet na naroroon sa merkado, mula sa simpleng-gamitin na mga web app hanggang sa mas kumplikadong mga solusyon sa seguridad ng hardware.

## Mga Social Login sa Solana

Binibigyang-daan ng [**Web3Auth**](https://docs.web3auth.io/) ang mga user na mag-sign in gamit ang kanilang mga kasalukuyang Web2 OAuth Provider(Facebook, Google, Twitter atbp.) sa Web3 dapps. Nagbibigay ito ng user-friendly at [non-custodial](https://docs.web3auth.io/key-infrastructure/overview) na diskarte sa pamamahala ng mga asset at pagkakakilanlan. Inaalis nito ang mga teknikal na hadlang at binabawasan ang kurba ng pagkatuto para sa digital na pagmamay-ari para sa lahat ng mga user sa pamamagitan ng pagbibigay ng wrapper sa paligid ng pribadong pamamahala ng key.

## Gabay sa Pagsasama

Gagabayan ka ng tutorial na ito sa isang pangunahing halimbawa upang maisama ang mga social login sa iyong dapp.

### Pag-install ng Dependencies

Upang simulang gamitin ang wallet gamit ang isang dapp, maaari mong i-install ang `@toruslabs/solana-embed`. Maaari kang gumamit ng mga sikat na manager ng package tulad ng yarn at npm para i-download ang mga ito.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @toruslabs/solana-embed
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @toruslabs/solana-embed
```

  </CodeGroupItem>
</CodeGroup>

### I-import ang SDK at simulan

Sa snippet ng code sa ibaba, gumagawa kami ng instance ng solana-embed at pagkatapos ay sinisimulan ito gamit ang testing environment na gumagamit ng solana testnet. Maaari mong ipasa ang iba pang mga opsyon sa pagsasaayos habang sinisimulan ang interface ng wallet. Maaari kang sumangguni sa solana-embed [api-reference](https://docs.tor.us/solana-wallet/api-reference/class) para malaman ang higit pa tungkol doon.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/initialize-instance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/initialize-instance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### I-trigger ang pag-login ng user​

Tawagan lang ang `torus.login()` para mag-trigger ng login kung saan man ito makatuwiran sa lifecycle ng iyong application. Ang pagtawag sa paraan ng pag-log in nang walang anumang parameter ay magbubukas ng modal para piliin ng user ang lahat ng sinusuportahang logins.

![](./assets/Web3Auth/login-modal.png)

Pagkatapos ng matagumpay na pag-login, ang pamamaraan ay magbabalik ng hanay ng mga pampublikong key. Ang unang elemento ng array ay ang kasalukuyang wallet public key

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/login.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/login.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Paggamit ng torus instance upang kunin ang detalye ng user account​

Ang torus instance ay nagbibigay ng isang interface para sa mga pakikipag-ugnayan tulad ng pag-sign ng mga transaksyon at mga mensahe sa isang naka-log-in na estado. Maaari rin itong magbigay sa amin ng isang interface upang ma-access ang impormasyon sa pag-login ng user tulad ng email ng user, larawan sa profile atbp. (depende sa paraan ng pag-login)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/user-info.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/user-info.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Paggamit ng Torus Solana API para mag-sign ng mensahe.

Upang makapagpadala ng mensahe para lagdaan ng user, dapat magbigay ang web application ng UTF-8 na naka-encode na string bilang isang Uint8Array.

Sa tuwing gustong mag-sign ng isang user ng mensahe, magbubukas ang wallet ng confirmation window.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/sign-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/sign-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Katulad nito, maaari mo ring gamitin ang [signTransaction](https://docs.tor.us/solana-wallet/api-reference/solana/sign-transaction) at mga paraan ng `signAllTransactions` sa torus instance para sa pag-sign ng isa, maramihang transaksyon ayon sa pagkakabanggit .

### Gamit ang torus Solana API upang magpadala ng transaksyon.​

Upang magpadala ng transaksyon, kailangan lang tawagan ang paraan ng `sendTransaction` sa torus instance at ipasa ang `Transaction`.

Nagbubukas ang wallet ng confirmation window. Pagkatapos ng pag-apruba, pinipirmahan at ipinapadala ng SDK ang transaksyon sa chain.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/send-transaction.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/send-transaction.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Top-ups​

Currently, the API supports topups from Moonpay.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/topup.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/wallet/Web3Auth/topup.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Logout

Upang mag-logout ng user, kailangan lang nitong tawagan ang function na `logout` sa torus wallet instance.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/wallet/Web3Auth/logout.en.ts)

  </template>
    
  <template v-slot:preview>
    
@[code](@/code/wallet/Web3Auth/logout.preview.en.ts)
    
  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Resources

* [solana-embed](https://github.com/torusresearch/solana-embed)
* [Api Reference](https://docs.web3auth.io/solana-wallet/api-reference/class)
* [Hosted Demo](https://demo-solana.tor.us/)
* [Sample React Integration](https://github.com/torusresearch/solana-embed-react-demo)
* [Solana Wallet](https://solana.tor.us/)