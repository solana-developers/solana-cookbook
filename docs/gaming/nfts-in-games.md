---
title: NFTs in games
description: A list of options that should give you an idea of how NFTs can be utilized in games
---

# NFTs In Games

## Nft use cases

NFTs are probably the easiest and most popular way to integrate Solana into your game. 
NFTs are objects that are saved on the Solana block chain and have a json meta data attached to them which can be used to safe attributes about the NFT. These are perfect for usage in games.

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

- Players could also gain certain bonuses by owning certain NFTs. For example a coin doubler NFT, which grants the player 2x coin as long as he has the NFT in his wallet.
- NFTs also have Metadata, which can be used for all kind of traits for game objects. For example an NFT could represent a game character and his traits Strength/Intelligence/Agility etc could directly influence how strong the character is in the game.
This is how you can load nft meta data and their attributes in js: 

```js
    JSON.parse(
      // For example '.config/solana/devnet.json'
      fs.readFileSync("yourKeyPair.json").toString())
    );
    let keyPair = Keypair.fromSecretKey(decodedKey);

    const metaplex = Metaplex.make(connection).use(keypairIdentity(keyPair));
    const nfts = await metaplex.nfts()
    .findAllByOwner({owner: keyPair.publicKey});
   
    nfts.forEach(async nft => {
      const meta = await metaplex.nfts()
        .load({metadata: nft});
        console.log("Name: " + meta.json.name);
        meta.json.attributes.forEach(async attribute => {
          console.log(JSON.stringify(attribute));
        });
    })
````

- NFTs can also directly be objects in a game. For example you could create a plant plot NFT and then use [Metaplex Fusion Trifle program](https://docs.metaplex.com/guides/fusion) to combine it with a water NFT and a seed NFT to create a Tomato NFT.
- NFTs can also own other NFTs, so with [Raindrops Boots program](https://docs.raindrops.xyz/services/boots) you could for example have an adventure character which owns a sword and a helmet. When the Character NFT would be sold on a market place the other NFTs it owns would be sold as well.

The possibilities are pretty much endless.

## How to create an NFT collection

NFTs on Solana mostly follow the Metaplex standard. Metaplex is a company which takes care of the NFT most used standard on Solana. The most common way to create an NFT collection is to create a metaplex candy machine which lets the user mint predefined pairs of meta data and images. 

[Metaplex Docs](https://docs.metaplex.com/)<br />
[Setup a candy machine step by step](https://youtu.be/0KHv1dMV8zU)<br />

