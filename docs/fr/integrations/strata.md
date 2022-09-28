---
title: Strata
head:
  - - meta
    - name: title
      content: Solana Cookbook | Développer le Protocole de Strata
  - - meta
    - name: og:title
      content: Solana Cookbook | Développer le Protocole de Strata
  - - meta
    - name: description
      content: Strata est un protocole permettant de lancer des jetons sur Solana. Apprenez à utiliser et à construire par-dessus Strata.
  - - meta
    - name: og:description
      content: Strata est un protocole permettant de lancer des jetons sur Solana. Apprenez à utiliser et à construire par-dessus Strata.
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

# Strata

Strata est un protocole permettant de lancer des jetons construit sur Solana. Vous pouvez utiliser Strata pour lancer tout type de jeton fongible, allant des jetons sociaux aux jetons dao et gamefi. Vous pouvez également utiliser Strata avec n'importe quel mécanisme de prix fixe pour obtenir un mécanisme de prix dynamique, comme par exemple la *CandyMachine* de Metaplex.

Des documents plus détaillés sont disponibles [ici](docs.strataprotocol.com). Vous pouvez également utiliser l'interface graphique (GUI) de [Strata Launchpad](app.strataprotocol.com)

## Comment créer un jeton entièrement géré

Un jeton Strata entièrement géré est un jeton dont la liquidité est gérée par le protocole. Le résultat est que vous obtenez immédiatement un jeton tradable, sans avoir besoin de pools ou de fournisseurs de liquidités. Un jeton entièrement géré est un jeton spl classique avec des métadonnées de jeton Metaplex et une courbe de liaison (bonding curve) associée.
La courbe de liaison gère la liquidité, le prix et l'offre de ce jeton.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Comment acheter et vendre un jeton

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Comment initier la liquidité

Strata peut également vendre des jetons lorsque vous souhaitez gérer manuellement son offre. Cela peut être utile pour l'initiation de la liquidité avant de lister votre jeton sur un dex. Vous pouvez en savoir plus à ce sujet [ici](https://docs.strataprotocol.com/marketplace/lbc) ou lancez vôtre jeton sur [Strata Launchpad](app.strataprotocol.com)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Autres Ressources

- [Documentation du Client Typescript](https://docs.strataprotocol.com) - Exemples de code pour créer et gérer les jetons de Strata
- [Launchpad de Strata](https://app.strataprotocol.com/launchpad) - Lancer un jeton à l'aide de l'interface graphique (GUI)
