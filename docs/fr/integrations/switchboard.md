---
title: Switchboard
head:
  - - meta
    - name: title
      content: Solana Cookbook | Utilisation de Switchboard pour créer des flux de données Onchain
  - - meta
    - name: og:title
      content: Solana Cookbook | Utilisation de Switchboard pour créer des flux de données Onchain
  - - meta
    - name: description
      content: Switchboard permet aux développeurs d'exploiter la puissance de Solana en créant des flux de données performants à partir de n'importe quelle API.
  - - meta
    - name: og:description
      content: Switchboard permet aux développeurs d'exploiter la puissance de Solana en créant des flux de données performants à partir de n'importe quelle API.
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

# Switchboard

Switchboard est un Oracle qui permet aux développeurs de s'approvisionner en données on-chain pour une variété de cas d'utilisation tels que l'obtention du prix de jetons, le prix plancher (floor price) de NFTs, les statistiques sportives ou même le caractère vérifiable du hasard. D'une manière générale, Switchboard est une ressource hors chaîne que les développeurs peuvent utiliser pour relier des données on-chain de haute qualité et alimenter la prochaine génération du Web3 et de la DeFi.

## Flux de Données

Switchboard fournit une bibliothèque JavaScript/TypeScript appelée **@switchboard-xyz/switchboard-v2**. Cette bibliothèque peut être utilisée pour accéder aux données On-chain à partir de flux de données existants ou pour publier vos propres flux personnalisés. Plus d'informations à ce sujet [ici](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2
)

### Lire les données d'un flux d'agrégation

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Créer un nouveau flux d'agrégation

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>





### Lire les données d'un flux d'agrégation dans un programme
Switchboard fournit une crate appelée **switchboard_v2**. Plus d'informations à ce sujet [ici](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Comment Créer un Flux à partir du Publisher
La documentation officielle de Switchboard explique en détail comment créer un flux à partir du Publisher. Découvrez-la [ici](https://docs.switchboard.xyz/feed/publisher).

## Oracles
La caractéristique unique de Switchboard est qu'il vous permet de créer votre propre oracle et de l'exécuter localement.

### Créer un oracle
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.oracle.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.oracle.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Exécuter un oracle localement
Vous pouvez exécuter un oracle localement et l'affecter à votre propre file d'attente d'oracles pour tester comment votre programme peut fonctionner en production. Les oracles du Mainnet doivent toujours être exécutés dans des environnements à haute disponibilité avec un certain nombre de fonctionnalités de contrôle.

#### Conditions Requises
 - Docker-compose

Créez un fichier docker-compose.yml avec les variables d'environnement dans [Oracle Config](/integrations/switchboard.html#oracle-config)



<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Exécutez le conteneur en utilisant `docker-compose up`

### Configuration de l'Oracle
<table>
  <thead>
    <tr>
      <th>Variable Env</th>
      <th>Définition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORACLE_KEY</td>
      <td>
        <b>
          <u>Obligatoire</u>
        </b>
        <br />
        <b>Type</b> - Clé Publique
        <br />
        <b>Description</b> - Clé publique du compte de l'oracle qui a reçu les permissions d'utiliser une file d'attente oracle <br />
      </td>
    </tr>
    <tr>
      <td>HEARTBEAT_INTERVAL</td>
      <td>
        <b>
          <u>Facultatif</u>
        </b>
        <br />
        <b>Type</b> - Nombre (secondes)
        <br />
        <b>Par Défaut</b> - 30
        <br />
        <b>Description</b> - Secondes entre les battements de cœur de l'oracle. Les files d'attente ont différentes exigences en matière de battement de cœur de l'oracle. La valeur recommandée est de 15
      </td>
    </tr>
    <tr>
      <td>GCP_CONFIG_BUCKET</td>
      <td>
        <b>
          <u>Facultatif</u>
        </b>
        <br />
        <b>Type</b> - GCP Resource Path
        <br />
        <b>Par Défaut</b> - Recherche le fichier configs.json dans le répertoire de travail actuel. Si elle n'est pas trouvée, aucune configuration n'est chargée.
        <br />
        <b>Description</b> - Contient les clés API pour les points de terminaison API privés
      </td>
    </tr>
    <tr>
      <td>UNWRAP_STAKE_THRESHOLD</td>
      <td>
        <b>
          <u>Facultatif</u>
        </b>
        <br />
        <b>Type</b> - Nombre (montant de SOL amount, Ex. 1.55)
        <br />
        <b>Par Défaut</b> - 0, désactivé.
        <br />
        <b>Description</b> - Le montant de la balance Solana pour déclencher une action de déblocage de la mise. Lorsque le solde de Solana d'un oracle tombe sous le seuil fixé, le nœud débloque automatiquement les fonds du portefeuille de staking de l'oracle, laissant au moins 0,1 wSOL ou 10 % de plus que l'exigence de mise minimale de la file. 
      </td>
    </tr>
  </tbody>
</table>

## Fonction Aléatoire Vérifiable(VRF)
Une Fonction Aléatoire Vérifiable (VRF) est une fonction pseudo-aléatoire à clé publique qui fournit des preuves que ses sorties ont été calculées correctement.
### Lire un compte VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Créer un compte VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  

</SolanaCodeGroup>

### Demande de Hasard à partir d'un compte VRF

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/request.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/request.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## Ressources
### API et Bibliothèques
 - [Types de Tâches de Switchboard](https://docs.switchboard.xyz/api/tasks)
 - [Documents sur l'API Rust](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Documents sur l'API Typescript](https://docs.switchboard.xyz/api/ts)
 - [Documents sur l'API Python](https://docs.switchboard.xyz/api/py)
 - [Documents sur le CLI](https://docs.switchboard.xyz/api/cli)
### Exemples
 - [[Client] Visite Guidée du Flux de Données Personnalisé](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Programme] Analyseur de Flux pour Anchor](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Programme] Analyseur VRF pour Anchor](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)
### Plus d'Informations
 - [Documentation du Protocole](https://docs.switchboard.xyz/introduction)
 - [Examen Approfondi de SuperteamDAO](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)

