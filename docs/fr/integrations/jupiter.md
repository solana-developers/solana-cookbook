---
title: Jupiter
head:
  - - meta
    - name: title
      content: Solana Cookbook | Échanger des jetons avec Jupiter
  - - meta
    - name: og:title
      content: Solana Cookbook | Échanger des jetons avec Jupiter
  - - meta
    - name: description
      content: Jupiter est le principal agrégateur de liquidités pour Solana, offrant la plus large gamme de jetons et la meilleure recherche de route entre n'importe quelle paire de jetons.
  - - meta
    - name: og:description
      content: Jupiter est le principal agrégateur de liquidités pour Solana, offrant la plus large gamme de jetons et la meilleure recherche de route entre n'importe quelle paire de jetons.
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

Jupiter est le principal agrégateur de liquidités pour Solana, offrant la plus large gamme de jetons et la meilleure recherche de route entre n'importe quelle paire de jetons.

### Installation

@jup-ag/core est le paquet de base (Core package) utilisé pour interagir avec les programmes on-chain de jupiter afin d'effectuer des échanges entre deux paires de jetons possibles.

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

### Récupération de la liste des jetons depuis Jupiter

Tous les jetons possibles qui peuvent être échangés avec Jupiter pour un réseau donné sont récupérés comme cela :

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

### Chargement de l'instance Jupiter

L'instance de Jupiter est créée avec les configurations fournies. Il existe de nombreux paramètres optionnels que l'instance peut prendre, pour en savoir plus allez [ici](https://docs.jup.ag/jupiter-core/full-guide)

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

### Obtenir le Chemin d'Accès (RouteMap)

La RouteMap identifie les jetons qui peuvent être échangés pour un jeton d'entrée donné. Le chemin d'accès ne contient que les adresses de mint des jetons et aucune métadonnée.

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

### Obtention des chemins pour un jeton d'Entrée et de Sortie donné
La méthode `computeRoutes` prend l'adresse de Mint d'entrée et l'adresse de Mint de sortie en argument et retourne tous les chemins possibles par ordre décroissant de meilleur prix.

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

### Exécuter l'Echange de Jetons
La méthode `exchange` est appelée ici, elle construit la transaction pour un chemin donné.

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

## Comment utiliser Jupiter dans une application React

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

### Ajout du Provider

Nous configurons ici le JupiterProvider afin d'utiliser le Hook useJupiter dans l'application React. Le paramètre cluster est défini comme **mainnet-beta** afin d'obtenir une grande variété de jetons, mais si vous le souhaitez, vous pouvez également le changer en **devnet**.

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

### Récupération de la Liste de Jetons

Tous les jetons qu'il est possible d'échanger sur un réseau donné sont récupérés et stockés dans l'état.

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

### Création de l'État

InputMint et OutputMint sont des états qui sont ajoutés afin de pouvoir être échangés entre eux ou qui peuvent également être prélevés à l'utilisateur.

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

### Utilisation du hook react useJupiter

Le hook useJupiter prend tous les paramètres nécessaires pour trouver les chemins par lesquels les tokens renseignés dans InputMint et OutputMint peuvent être échangés. Pour en savoir plus, rendez-vous [ici](https://docs.jup.ag/jupiter-react/using-the-react-hook)

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

### Exécution de l'Echange

Après avoir fourni toutes les données au hook useJupiter, il est possible d'utiliser l'instance jupiter pour effectuer un échange en utilisant la méthode `exchange`.

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

## Comment utiliser l'API de Jupiter

C'est le moyen le plus simple d'interagir avec les programmes de jupiter pour échanger deux jetons donnés.

### Installation

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

### Obtention du Chemin d'Accès

Cette API récupère tous les jetons disponibles qui peuvent être échangés en utilisant l'API jupiter. Une liste de tous les chemins possibles est récupérée ici et `allInputMints` contient la liste des adresses de mint de tous les jetons d'entrée possibles et `swappableOutputForSol` contient tous les jetons qu'il est possible d'échanger contre des SOL.

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

### Obtention de la Transaction Sérialisée pour effectuer le Swap
La requête API POST est effectuée avec le chemin que nous souhaitons emprunter et l'adresse du portefeuille de l'utilisateur. Il y a quelques paramètres optionnels qui peuvent être ajoutés à cette api comme **wrapUnwrapSOL** et **feeAccount**. pour en savoir plus, consultez les documents officiels [ici](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

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

### Exécution de l'Opération d'Echange
Un objet Transaction est créé puis signé par l'utilisateur.

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

## Autres Ressources

- [Docs Principaux](https://docs.jup.ag/)
- [Code d'Exemple de Jupiter Core](https://github.com/jup-ag/jupiter-core-example)
- [Code d'Exemple de Jupiter React](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Code d'Exemple de Jupiter API](https://github.com/jup-ag/api-arbs-example)
