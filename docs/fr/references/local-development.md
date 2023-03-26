---
title: Développement Local
head:
  - - meta
    - name: title
      content: Solana Cookbook | Développement Local
  - - meta
    - name: og:title
      content: Solana Cookbook | Développement Local
  - - meta
    - name: description
      content: Configurer un Validateur Local pour avoir un environnement de développement local et faire un Airdrop de SOL. Découvrez le Développement Local et d'autres références pour Construire sur Solana dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Configurer un Validateur Local pour avoir un environnement de développement local et faire un Airdrop de SOL. Découvrez le Développement Local et d'autres références pour Construire sur Solana dans le Solana cookbook.
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

# Développement Local

## Démarrer un Validateur Local

Tester le code de votre programme localement peut être beaucoup plus fiable que de le tester sur le devnet, et peut vous aider à faire des tests avant de l'essayer sur le devnet.

Vous pouvez configurer votre validateur de test local (local-test-validator) en installant la [suite d'outils de solana (solana tool suite)](/getting-started/installation.md#installer-cli)
et en exécutant

```console
solana-test-validator
```

Les avantages de l'utilisation de local-test-validator sont les suivants :

- Pas de limites de débit RPC
- Pas de limites d'airdrop
- Déploiement direct de programme sur la blockchain (`--bpf-program ...`)
- Clonage de comptes à partir d'un cluster public, y compris les programmes (`--clone ...`)
- Possibilité de configurer l'historique de conservation des transactions (`--limit-ledger-size ...`)
- Possibilité de configurer la durée des époques (`--slots-per-epoch ...`)
- Sauter à un slot précis (`--warp-slot ...`)

## Connexion aux Environnements

Lorsque vous développez sur Solana, vous devez vous connecter à un point de terminaison API de RPC en particulier. Solana dispose de 3 environnements de développement publics :
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

Enfin, vous pouvez également vous connecter à un cluster privé, qu'il soit local ou fonctionnant à distance avec l'élément suivant :

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

## Inscription à des Evénements

Les Websockets fournissent une interface pub/sub où vous pouvez écouter certains événements. Au lieu d'envoyer une requête à un point de terminaison HTTP classique à intervalles réguliers pour obtenir des mises à jour fréquentes, vous pouvez recevoir ces mises à jour uniquement lorsqu'elles se produisent.

La classe web3 [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) de Solana génère un point de terminaison websocket et enregistre un client websocket lorsque vous créez une nouvelle instance `Connection` (voir le code source [ici](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

La classe `Connection` présente des méthodes pub/sub - elles commencent toutes par `on`, comme les émetteurs d'événements. Lorsque vous appelez ces méthodes d'écoute, un nouvel enregistrement est effectué auprès du client websocket de l'instance `Connection`. L'exemple de méthode pub/sub que nous utilisons ci-dessous est [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). Le callback fournira les données d'état mises à jour par le biais d'arguments (voir [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) en guise d'exemple).

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

## Obtention de SOL pour les Tests

Lorsque vous travaillez localement, vous avez besoin d'un certain nombre de SOL pour envoyer des transactions. Dans les environnements non-mainnet, vous pouvez recevoir des SOL en les airdroppant à votre adresse.

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

## Utilisation des Comptes et des Programmes du Mainnet

Parfois, les tests locaux reposent sur des programmes et des comptes disponibles uniquement sur le mainnet. Le CLI de Solana permet à la fois de :
* Télécharger des Programmes et des Comptes
* Charger des Programmes et des Comptes dans un validateur local

### Comment charger des comptes depuis le mainnet

Il est possible de télécharger les comptes de mint du jeton SRM dans un fichier comme suit :

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

Le chargement sur votre réseau local se fait ensuite en passant le fichier contenant les comptes et l'adresse de destination (sur le cluster local) lors du démarrage du validateur :

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

### Comment charger des programmes depuis le mainnet

De même, il est possible de télécharger le programme Serum Dex v3 :

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

Le chargement sur votre réseau local se fait alors en passant le fichier du programme et l'adresse de destination (sur le cluster local) lors du démarrage du validateur :

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
