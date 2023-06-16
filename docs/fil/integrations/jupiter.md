---
title: Jupiter
head:
  - - meta
    - name: title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: og:title
      content: Solana Cookbook | Swap tokens using Jupiter
  - - meta
    - name: description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
  - - meta
    - name: og:description
      content: Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.
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

# Jupiter

Ang Jupiter ay ang pangunahing liquidity aggregator para sa Solana, na nag-aalok ng pinakamalawak na hanay ng mga token at pinakamahusay na pagtuklas ng ruta sa pagitan ng anumang pares ng token.

### Pag-install

Ang @jup-ag/core ay ang Core package na ginagamit upang makipag-ugnayan sa jupiter on-chain programs upang magsagawa ng mga swap sa pagitan ng dalawang posibleng pares ng token.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### Kinukuha ang listahan ng Token mula sa Jupiter

Ang lahat ng posibleng mga token na maaaring ipagpalit sa jupiter para sa isang partikular na network ay kinukuha.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Nilo-load ang instance ng Jupiter

Ginagawa ang instance ng Jupiter gamit ang mga ibinigay na configuration. Maraming opsyonal na parameter na kailangan ng instance para malaman ang higit pa tungkol dito pumunta [dito](https://docs.jup.ag/jupiter-core/full-guide)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Pagkuha ng RouteMap

Tinutukoy ng RouteMap kung anong mga token ang maaaring ipagpalit para sa isang ibinigay na input token. Ang mapa ng ruta ay naglalaman lamang ng mga token mint address at walang metadata.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/route-map/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/route-map/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Pagkuha ng mga ruta para sa ibinigay na Input at Output token
Kinukuha ng mga pamamaraan ng `computeRoutes` ang input Mint address at ang output Mint address at binibigyan muna ang lahat ng posibleng ruta sa pagkakasunud-sunod ng pinakamahusay na presyo.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/routes/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/routes/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Isagawa ang Token Swap
Ang `exchange` na paraan ay tinatawag dito na bumubuo ng transaksyon para sa isang partikular na ruta.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## How to use Jupiter in a React Application

### Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/react-hook
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/react-hook
```

  </CodeGroupItem>
</CodeGroup>

### Pagdaragdag ng Provider

Kami ay nagse-set up ng JupiterProvider dito upang magamit ang paggamit ng Jupiter Hook sa pamamagitan ng React App. Ang cluster parameter ay itinakda bilang **mainnet-beta** upang makakuha ng malawak na iba't ibang mga token ngunit kung gusto mo ay maaari mo ring baguhin ito sa **devnet**

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/providerSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/providerSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Kinukuha ang Listahan ng mga Token

Ang lahat ng posibleng Token na maaaring ipagpalit sa isang Given Network ay kinukuha na nakaimbak sa estado.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/react-token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/react-token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Pag-set up ng Estado

Ang InputMint at OutputMint ay estado na idinagdag upang ito ay maipagpalit sa isa't isa o maaari ring kunin mula sa gumagamit.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/inputSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/inputSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Gamit ang useJupiter react hook

Kinukuha ng useJupiter Hook ang lahat ng mga parameter na kinakailangan para mahanap nito ang mga ruta kung saan ang mga Token ng parehong InputMint at OutputMint ay maaaring mapalitan. Para matuto pa tungkol dito pumunta [dito](https://docs.jup.ag/jupiter-react/using-the-react-hook)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/useJupiter/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/useJupiter/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Nagsasagawa ng Swap

Matapos ibigay ang lahat ng data sa useJupiter Hook. Magagamit natin ang jupiter instance para magsagawa ng swap gamit ang `exchange` method

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/reactSwap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/reactSwap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Paano gamitin ang Jupiter API

Ito ang pinakamadaling paraan upang makipag-ugnayan sa mga jupiter program upang magpalit ng anumang 2 ibinigay na token.

### Pag-install

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-serum/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-serum/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### Pagkuha ng Mapa ng Ruta

Kinukuha ng API na ito ang lahat ng available na token na maaaring ipagpalit gamit ang jupiter API. Ang isang listahan ng lahat ng posibleng mga ruta ng token ay kinukuha dito at ang `allInputMints` ay naglalaman ng listahan ng lahat ng posibleng Input Token ayon sa mint address at ang `swappableOutputForSol` ay naglalaman ng lahat ng posibleng mga token na maaaring palitan para sa SOL sa kasong ito.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/retriveapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/retriveapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Pagkuha ng Serialized na Transaksyon para magsagawa ng Swap
Ang kahilingan sa POST API ay tapos na sa rutang nais nating puntahan at ang wallet address ng user ay may ilang mga opsyonal na parameter na maaaring idagdag sa api na ito tulad ng **wrapUnwrapSOL** at **feeAccount** upang matuto nang higit pa tungkol dito dumaan sa mga opisyal na doc dito [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/getTxapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/getTxapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Isinasagawa ang Swap Transaction
Ang isang bagay na Transaksyon ay nilikha at pagkatapos ay pinipirmahan ito ng user.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/executeapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/executeapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Main Docs](https://docs.jup.ag/)
- [Jupiter Core Example Code](https://github.com/jup-ag/jupiter-core-example)
- [Jupiter React Example Code](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Jupiter API Example Code](https://github.com/jup-ag/api-arbs-example)
