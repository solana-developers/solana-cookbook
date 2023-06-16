---
title: Local Development
head:
  - - meta
    - name: title
      content: Solana Cookbook | Local Development
  - - meta
    - name: og:title
      content: Solana Cookbook | Local Development
  - - meta
    - name: description
      content: Setup Local Validator for local developer environment and Airdrop SOL. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
  - - meta
    - name: og:description
      content: Setup Local Validator and Airdrop SOL for building on Solana Locally. Learn about Local Development and more references for Building on Solana at The Solana cookbook.
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

# Lokal na Pag-gawa

## Pagsisimula ng Lokal na Validator

Ang pagsubok sa iyong program code nang lokal ay maaaring maging mas maaasahan kaysa
pagsubok sa devnet, at makakatulong sa iyong subukan bago ito subukan sa devnet.

Maaari mong i-setup ang iyong local-test-validator sa pamamagitan ng pag-install ng [solana tool suite](/getting-started/installation.md#install-cli)
at tumatakbo

```console
solana-test-validator
```

Ang mga pakinabang ng paggamit ng local-test-validator ay kinabibilangan ng:

- Walang mga limitasyon sa rate ng RPC
- Walang limitasyon sa airdrop
- Direktang on-chain program deployment (`--bpf-program ...`)
- I-clone ang mga account mula sa isang pampublikong cluster, kabilang ang mga programa (`--clone ...`)
- Nako-configure ang pagpapanatili ng kasaysayan ng transaksyon (`--limit-ledger-size ...`)
- Nako-configure na haba ng panahon (`--slots-per-epoch ...`)
- Tumalon sa isang arbitrary slot (`--warp-slot ...`)

## Kumokonekta sa Mga Environment

Kapag nagtatrabaho ka sa pagbuo ng Solana, kakailanganin mong kumonekta
sa isang partikular na endpoint ng RPC API. May 3 pampublikong pag-gawa ang Solana
environment:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Sa wakas, maaari ka ring kumonekta sa isang pribadong kumpol, alinman sa isang lokal o
tumatakbo nang malayuan kasama ang mga sumusunod:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Pag-subscribe sa Mga Kaganapan

Nagbibigay ang mga websocket ng interface ng pub/sub kung saan maaari kang makinig sa ilang partikular na kaganapan. Sa halip na i-ping ang isang tipikal na HTTP endpoint sa isang agwat upang makakuha ng madalas na mga update, maaari mo na lang matanggap ang mga update na iyon kapag nangyari ang mga ito.

Ang web3 ni Solana [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) sa ilalim ng hood ay bumubuo ng endpoint ng websocket at nagrerehistro ng websocket client kapag gumawa ka ng bagong ` Halimbawa ng koneksyon (tingnan ang source code [dito](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

Ang klase ng `Connection` ay naglalantad ng mga pub/sub na pamamaraan - lahat sila ay nagsisimula sa `on`, tulad ng mga emitter ng kaganapan. Kapag tinawag mo ang mga pamamaraan ng listener na ito, nagrerehistro ito ng bagong subscription sa websocket client ng instance na `Connection` na iyon. Ang halimbawang paraan ng pub/sub na ginagamit namin sa ibaba ay [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). Ibibigay ng callback ang na-update na data ng estado sa pamamagitan ng mga argumento (tingnan ang [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) bilang isang halimbawa).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Pagkuha ng Test SOL

Kapag nagtatrabaho ka nang lokal, kailangan mo ng ilang SOL para makapagpadala
mga transaksyon. Sa mga hindi mainnet na environment maaari kang makatanggap ng SOL sa pamamagitan ng
i-airdrop ito sa iyong address

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Paggamit ng Mainnet Accounts at Programs

Kadalasan, umaasa ang mga lokal na pagsubok sa mga programa at account na available lang sa mainnet. Ang Solana CLI ay nagbibigay-daan sa parehong:
* Mag-download ng Mga Programa at Account
* Mag-load ng Mga Programa at Account sa isang lokal na validator

### Paano mag-load ng mga account mula sa mainnet

Posibleng i-download ang SRM token mint account para mag-file:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Ang paglo-load nito sa iyong localnet ay ginagawa sa pamamagitan ng pagpasa sa file ng account at patutunguhang address (sa lokal na cluster) kapag sinimulan ang validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Paano mag-load ng mga programa mula sa mainnet

Katulad nito, posibleng i-download ang Serum Dex v3 program:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Ang paglo-load nito sa iyong localnet ay tapos na sa pamamagitan ng pagpasa sa file ng programa at patutunguhang address (sa lokal na kumpol) kapag sinimulan ang validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
