---
title: Gaming with NFTs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Gaming with NFTS
  - - meta
    - name: og:title
      content: Solana Cookbook | Gaming with NFTS
  - - meta
    - name: description
      content: NFTs can be a powerful tool in blockchain games. Learn how to utilize NFTs in Solana games to their full potential.
  - - meta
    - name: og:description
      content: NFTs can be a powerful tool in blockchain games. Learn how to utilize NFTs in Solana games to their full potential.
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

# NFTs In Games

Non-fungible tokens (NFTs) are rapidly gaining popularity as a means of integrating Solana into games.
These unique digital assets are stored on the Solana blockchain and come with a JSON metadata attached
to them. The metadata allows developers to store important attributes and information about the NFT, such
as its rarity or specific in-game capabilities. NFTs can be used in games to represent anything from weapons
and armor to digital real estate and collectibles, providing a new level of ownership and scarcity for players.

## Token gating with NFTs

Using NFTs, you can gate access to a particular part of a game based on owning the NFT. This can form a more tight-knit community within your game.
In [js](https://docs.solana.com/de/developing/clients/javascript-api) using the [Metaplex sdk](https://github.com/metaplex-foundation/js#readme) this would look like this:

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

## Bonus Effects with NFTs

In addition to providing new revenue streams, NFTs can also be used to provide in-game benefits and bonuses to players. For instance, a player who owns a "coin doubler" NFT may receive double the amount of coins for as long as they hold the NFT in their wallet. Additionally, NFTs can be used as consumables, allowing players to use them to gain temporary effects such as potions or spells. Once consumed, the NFT is burned, and the effect is applied to the player's character. These innovative features of NFTs provide game developers with new opportunities to create unique gameplay experiences and reward players for their ownership of valuable assets on the Solana blockchain.

[How to interact with tokens](../references/token#how-to-burn-tokens)

[NFTs](../references/nfts)


## Using NFT Metadata for Player Stats

NFTs also have Metadata, which can be used for all kind of traits for game objects. For example an NFT could represent a game character and his traits Strength/Intelligence/Agility could directly influence how strong the character is in the game.
You can load NFT metadata and their attributes using the Metaplex SDK:

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
````

## Fusing NFTs Together

The [Metaplex Fusion Trifle program](https://docs.metaplex.com/programs/fusion/overview) allows you to have NFTs own other NFTs. For example you could create a plant plot NFT and then use  to combine it with a water NFT and a seed NFT to create a Tomato NFT.

## Use 3D Nfts in a game

Every NFT metadata can also have a animation url. This url can contain a video, gif or a 3d file. These 3d files usually use the format .glb or .gltf and can dynamically be loaded into a game.
For unity you can use the [GLTFast](https://github.com/atteneder/glTFast) package and in js the
[GLTFast JS](https://discoverthreejs.com/book/first-steps/load-models/). For reference a [NFT metadata with glb model](https://solscan.io/token/DzHPvbGzrHK4UcyeDurw2nuBFKNvt4Kb7K8Bx9dtsfn#metadata)

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

## Customize NFTs with items and traits (Raindrops boots)

With the [Raindrops Boots program](https://docs.raindrops.xyz/services/boots) you can have an adventure character which owns a sword and a helmet. When the Character NFT would be sold on a market place the other NFTs it owns would be sold as well.

## How to create an NFT collection

NFTs on Solana mostly follow the Metaplex standard. Metaplex is a company which takes care of the NFT most used standard on Solana. The most common way to create an NFT collection is to create a metaplex candy machine which lets the user mint predefined pairs of metadata and images.

[Metaplex Docs](https://docs.metaplex.com/programs/candy-machine/how-to-guides/my-first-candy-machine-part1)

[Setup a candy machine step by step](https://youtu.be/0KHv1dMV8zU)

[NFTs](../references/nfts)
