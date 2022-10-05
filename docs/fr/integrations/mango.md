---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Solana Cookbook | Développer sur Mango Markets
  - - meta
    - name: og:title
      content: Solana Cookbook | Développer sur Mango Markets
  - - meta
    - name: description
      content: Mango Markets offre le standard pour le trading décentralisé, à marge croisée. Apprenez à utiliser et à construire par-dessus Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets offre le standard pour le trading décentralisé, à marge croisée. Apprenez à utiliser et à construire par-dessus Mango Markets.
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

# Mango Markets

Mango offre un lieu unique pour prêter, emprunter, échanger et négocier des crypto-actifs par le biais d'un mécanisme de gestion des risques on-chain. Vous pouvez vous connecter au programme de Mango à l'aide des bibliothèques API Client. Vous aurez également besoin de la bibliothèque API javascript de Solana.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## Comment récupérer un Groupe Mango

Un groupe Mango est un panier de jetons à marges croisées. Il contient des informations générales sur le marché des jetons, les dex de Serum, les marchés perp, les oracles, les fonds d'assurance et les vaults de frais. Chaque version de Mango Markets utilise un groupe Mango différent contenant des jetons différents. Le groupe v3 actuel `mainnet.1`. Voici un tableau présentant les différents groupes :


| Groupe                | Version     | Cluster          |
|-----------------------|-------------|------------------|
| mainnet.1             | v3          | mainnet          |
| devnet.2              | v3          | devnet           |
| devnet.3              | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC  | v2          | mainnet & devnet |
| BTC_ETH_USDT          | v2          | devnet           |
| BTC_ETH_USDC          | v2          | testnet          |


:::tip Remarque
Si vous souhaitez utiliser les groupes v2, vous devrez utiliser la bibliothèque client v2. Vous pouvez la trouver [ici](https://github.com/blockworks-foundation/mango-client-ts)
:::


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## Comment créer un Compte Mango

Un Compte Mango est associé à un Groupe Mango, il détient vos jetons et vous permet de négocier sur les marchés de ce groupe. Vous pouvez trouver la référence [ici](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment déposer des USDC sur un Compte Mango
Après avoir créé un compte mango, vous devrez l'approvisionner en jetons pour pouvoir trader. Vous pouvez trouver la référence de la procédure de dépôt [ici](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit). 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment placer un ordre spot
Mango interagit avec le Protocole Serum pour placer des ordres spot sur les marchés. Vous pouvez passer un ordre spot en procédant ainsi. Vous pouvez trouver la référence de la fonction placeSpotOrder [ici](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder). 
Mango possède un fichier de configuration qui contient des informations sur les groupes, les marchés, les jetons et les oracles que vous pouvez trouver [ici](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). Nous utilisons les informations de ce dossier pour trouver le bon groupe et le bon marché.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment charger les offres
Mango utilise les informations de marché du Protocole Serum pour charger les offres. Vous pouvez les charger directement depuis Serum pour travailler avec sur Mango. Vous pouvez en savoir plus sur les marchés de Serum [ici](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment charger les demandes
Mango utilise les informations de marché du Protocole Serum pour charger les demandes. Vous pouvez les charger directement depuis Serum pour travailler avec sur Mango. Vous pouvez en savoir plus sur les marchés de Serum [ici](https://github.com/project-serum/serum-ts/tree/master/packages/serum)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Autres Ressources

- [Bibliothèques du Client](https://docs.mango.markets/development-resources/client-libraries)
- [Documents Mango](https://docs.mango.markets)
- [Présentation Technique](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
