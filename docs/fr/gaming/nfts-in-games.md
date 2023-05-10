---
title: Gaming avec des NFTs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Gaming avec des NFTs
  - - meta
    - name: og:title
      content: Solana Cookbook | Gaming avec des NFTs
  - - meta
    - name: description
      content: Les NFTs peuvent être un outil puissant dans les jeux blockchain. Apprenez à utiliser pleinement les NFTs dans les jeux sur Solana.
  - - meta
    - name: og:description
      content: Les NFTs peuvent être un outil puissant dans les jeux blockchain. Apprenez à utiliser pleinement les NFTs dans les jeux sur Solana.
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

# Les NFTs dans les jeux

Les jetons non fongibles (NFT) deviennent rapidement populaires en tant que moyen d'intégrer Solana dans les jeux.
Ces actifs numériques uniques sont stockés sur la blockchain Solana et sont accompagnés de métadonnées JSON. 
Les métadonnées permettent aux développeurs de stocker des attributs et des informations importants sur le NFT, tels que sa rareté ou ses caractéristiques spécifiques dans le jeu. Les NFTs peuvent être utilisés dans les jeux pour représenter n'importe quoi, des armes et armures aux biens immobiliers numériques et aux objets de collection, offrant ainsi aux joueurs un nouveau niveau de propriété et de rareté.

## Token gating avec des NFTs

Grâce aux NFTs, vous pouvez autoriser l'accès à une certaine partie d'un jeu en fonction de la possession d'un NFT. Cela permet de créer une communauté plus soudée au sein de votre jeu.
En [JS](https://docs.solana.com/de/developing/clients/javascript-api) et en utilisant le [SDK de Metaplex](https://github.com/metaplex-foundation/js#readme), cela ressemblerait à ceci :

```js
JSON.parse(
  // For example '.config/solana/devnet.json'
  fs.readFileSync("yourKeyPair.json").toString())
);
let keyPair = Keypair.fromSecretKey(decodedKey);

const metaplex = Metaplex.make(connection).use(keypairIdentity(keyPair));

const nfts = await metaplex
  .nfts()
  .findAllByOwner({ owner: wallet.publicKey })

let collectionNfts = []
for (let i = 0; i < nfts.length; i++) {
  if (nfts[i].collection?.address.toString() == collectionAddress.toString()) {
    collectionNfts.push(nfts[i])
  }
}
```

## Bonus d'Effets avec des NFTs

En plus de fournir de nouvelles sources de revenus, les NFT peuvent également être utilisés pour offrir des avantages et des bonus aux joueurs. Par exemple, un joueur qui possède un NFT "doubleur de pièces" peut recevoir le double de pièces tant qu'il conserve le NFT dans son portefeuille. De plus, les NFTs peuvent être utilisés comme consommables, ce qui permet aux joueurs de les utiliser pour obtenir des effets temporaires tels que des potions ou des sorts. Une fois consommé, le NFT est brûlé et l'effet est appliqué au personnage du joueur. Ainsi, ces fonctionnalités innovantes des NFTs offrent aux développeurs de jeux de nouvelles opportunités de créer des expériences de jeu uniques et de récompenser les joueurs pour leur possession d'actifs sur la blockchain Solana.

[Comment interagir avec les jetons](../references/token#how-to-burn-tokens)

[NFTs](../references/nfts)


## Utilisation des métadonnées d'un NFT pour les statistiques des joueurs

Les NFTs disposent également de métadonnées qui peuvent être utilisées pour toutes sortes de caractéristiques relatives aux objets du jeu. Par exemple, un NFT pourrait représenter un personnage de jeu et ses traits Force/Intelligence/Agilité pourraient directement influencer la puissance du personnage dans le jeu.
Vous pouvez charger les métadonnées NFT et leurs attributs à l'aide du SDK de Metaplex :

```js
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";

JSON.parse(
  // For example '.config/solana/devnet.json'
  fs.readFileSync("yourKeyPair.json").toString())
);
let keyPair = Keypair.fromSecretKey(decodedKey);

const metaplex = Metaplex.make(connection).use(keypairIdentity(keyPair));
const nfts = await metaplex.nfts().findAllByOwner({owner: keyPair.publicKey});

const physicalDamage = 5;
const magicalDamage = 5;

nfts.forEach(async nft => {
  const metaData = await metaplex.nfts().load({metadata: nft});

    metaData.json.attributes.forEach(async attribute => {
      if (attribute.trait_type == "Strength") {
        physicalDamage += parseInt(attribute.value)
      }
      if (attribute.trait_type == "Int") {
        magicalDamage += parseInt(attribute.value)
      }
    });
})

console.log("Player Physical Damage: " + physicalDamage)
console.log("Player Magical Damage: " + magicalDamage)
```

## Fusionner des NFTs

Le [programme Fusion Trifle de Metaplex](https://docs.metaplex.com/programs/fusion/overview) vous permet de faire en sorte que des NFTs possèdent d'autres NFTs. Par exemple, vous pouvez créer un NFT pour une zone de plantation, puis le combiner avec un NFT d'eau et un NFT de semences pour créer un NFT de tomates.

## Utilisation de NFTs 3D dans un jeu

Les métadonnées d'un NFT peuvent également avoir une url d'animation. Cette url peut contenir une vidéo, un gif ou un fichier 3D. Ces fichiers 3D utilisent généralement le format .glb ou .gltf et peuvent être chargés dynamiquement dans un jeu.
Pour Unity, vous pouvez utiliser le package [GLTFast](https://github.com/atteneder/glTFast) et pour JS le package
[GLTFast JS](https://discoverthreejs.com/book/first-steps/load-models/). Exemple de [métadonnées d'un NFT avec un modèle glb](https://solscan.io/token/DzHPvbGzrHK4UcyeDurw2nuBFKNvt4Kb7K8Bx9dtsfn#metadata)

```c#
  var gltf = gameObject.AddComponent<GLTFast.GltfAsset>();
  gltf.url = nft.metadata.animationUrl;
```

```js
npm install --save-dev gltf-loader-ts

import { GltfLoader } from 'gltf-loader-ts';

let loader = new GltfLoader();
let uri = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured.gltf';
let asset: Asset = await loader.load(uri);
let gltf: GlTf = asset.gltf;
console.log(gltf);
// -> {asset: {…}, scene: 0, scenes: Array(1), nodes: Array(2), meshes: Array(1), …}

let data = await asset.accessorData(0); // fetches BoxTextured0.bin
let image: Image = await asset.imageData.get(0) // fetches CesiumLogoFlat.png
```

## Personnaliser des NFTs avec des items et des traits (Raindrops boots)

Avec le [programme Raindrops Boots](https://docs.raindrops.xyz/services/boots) vous pouvez avoir un personnage de jeu d'aventure qui possède une épée et un casque. Lorsque le NFT du personnage est vendu sur une place de marché, les autres NFTs qu'il possède sont également vendus.

## Comment créer une collection NFT

Les NFTs sur Solana suivent pour la plupart la norme de Metaplex. Metaplex est une entreprise qui s'occupe de la norme NFT la plus utilisée sur Solana. La manière la plus courante de créer une collection NFT consiste à créer une *candy machine* avec Metaplex. Celle-ci permet à l'utilisateur de mint des paires de métadonnées et d'images prédéfinies.

[Documentations de Metaplex](https://docs.metaplex.com/programs/candy-machine/how-to-guides/my-first-candy-machine-part1)

[Configuration d'une candy machine, étape par étape](https://youtu.be/0KHv1dMV8zU)

[NFTs](../references/nfts)
