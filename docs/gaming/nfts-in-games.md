---
title: NFTs in games
head:
  - - meta
    - name: title
      content: Solana Cookbook | NFTs in games
  - - meta
    - name: og:title
      content: Solana Cookbook | NFTs in games
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


NFTs are probably the easiest and most popular way to integrate Solana into your game.
NFTs are objects that are saved on the Solana block chain and have a json metadata attached to them which can be used to safe attributes about the NFT. These are perfect for usage in games.

## Allow only players from a collection

- You can for example only allow players that own an NFT of an NFT collection to enter the game.
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

## Nft Boosters

Players could also gain certain bonuses by owning certain NFTs. For example a coin doubler NFT, which grants the player 2x coin as long as he has the NFT in his wallet. NFTs can also be burned. So there could be consumable NFTs as well. So a potion or spell in the inventory could be burned or transferred somewhere to give the character the effect.

[How to interact with tokens](../references/token#how-to-burn-tokens) <br/>
[NFTs](../references/nfts)


## Use metadata as stats

NFTs also have Metadata, which can be used for all kind of traits for game objects. For example an NFT could represent a game character and his traits Strength/Intelligence/Agility etc could directly influence how strong the character is in the game.
This is how you can load nft metadata and their attributes using the metaplex sdk:

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

## Have NFTs own other NFTs (Fusion)

The [Metaplex Fusion Trifle program](https://docs.metaplex.com/programs/fusion/overview) allows you to have NFTs own other NFTs. For example you could create a plant plot NFT and then use  to combine it with a water NFT and a seed NFT to create a Tomato NFT. (Tutorial coming soon)

## Use 3D Nfts in a game

Every NFT metadata can also have a animation url. This url can contain a video, gif or a 3d file. These 3d files usually use the format .glb or .gltf and can dynamically be loaded into a game.
For unity you can use this [GLTFast](https://github.com/atteneder/glTFast) package and in js for example this
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

With the [Raindrops Boots program](https://docs.raindrops.xyz/services/boots) you can for example have an adventure character which owns a sword and a helmet. When the Character NFT would be sold on a market place the other NFTs it owns would be sold as well.

The possibilities are pretty much endless. (Tutorial coming soon)

## How to create an NFT collection

NFTs on Solana mostly follow the Metaplex standard. Metaplex is a company which takes care of the NFT most used standard on Solana. The most common way to create an NFT collection is to create a metaplex candy machine which lets the user mint predefined pairs of metadata and images.

[Metaplex Docs](https://docs.metaplex.com/)<br />
[Setup a candy machine step by step](https://youtu.be/0KHv1dMV8zU)<br />

