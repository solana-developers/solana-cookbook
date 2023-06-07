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

# NFT Sa Mga Laro

Ang mga non-fungible token (NFTs) ay mabilis na nagiging popular bilang isang paraan ng pagsasama ng Solana sa mga laro.
Ang mga natatanging digital asset na ito ay naka-store sa Solana blockchain at may naka-attach na JSON metadata
sa kanila. Ang metadata ay nagpapahintulot sa mga developer na mag-imbak ng mahahalagang katangian at impormasyon tungkol sa NFT, tulad
bilang pambihira o partikular na mga kakayahan sa laro. Maaaring gamitin ang mga NFT sa mga laro upang kumatawan sa anumang bagay mula sa mga armas
at armor sa digital real estate at collectibles, na nagbibigay ng bagong antas ng pagmamay-ari at kakulangan para sa mga manlalaro.

## Token gating sa mga NFT

Gamit ang mga NFT, maaari mong i-gate ang access sa isang partikular na bahagi ng isang laro batay sa pagmamay-ari ng NFT. Maaari itong bumuo ng isang mas mahigpit na komunidad sa loob ng iyong laro.
Sa [js](https://docs.solana.com/de/developing/clients/javascript-api) gamit ang [Metaplex sdk](https://github.com/metaplex-foundation/js#readme) gagawin nito ganito ang hitsura:

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

## Bonus Effects sa mga NFT

Bilang karagdagan sa pagbibigay ng mga bagong stream ng kita, ang mga NFT ay maaari ding gamitin upang magbigay ng mga in-game na benepisyo at bonus sa mga manlalaro. Halimbawa, ang isang manlalaro na nagmamay-ari ng "coin doubler" na NFT ay maaaring makatanggap ng doble sa halaga ng mga barya hangga't hawak nila ang NFT sa kanilang wallet. Bilang karagdagan, ang mga NFT ay maaaring gamitin bilang mga consumable, na nagpapahintulot sa mga manlalaro na gamitin ang mga ito upang makakuha ng mga pansamantalang epekto tulad ng mga potion o spell. Kapag natupok, ang NFT ay sinusunog, at ang epekto ay inilalapat sa karakter ng manlalaro. Ang mga makabagong feature na ito ng mga NFT ay nagbibigay sa mga developer ng laro ng mga bagong pagkakataon upang lumikha ng mga natatanging karanasan sa gameplay at gantimpalaan ang mga manlalaro para sa kanilang pagmamay-ari ng mahahalagang asset sa Solana blockchain.

[Paano makipag-ugnayan sa mga token](../references/token#how-to-burn-tokens)

[NFTs](../references/nfts)


## Paggamit ng NFT Metadata para sa Player Stats

Ang mga NFT ay mayroon ding Metadata, na maaaring magamit para sa lahat ng uri ng mga katangian para sa mga bagay ng laro. Halimbawa ang isang NFT ay maaaring kumatawan sa isang karakter ng laro at ang kanyang mga katangian Lakas/Katalinuhan/Agility ay maaaring direktang makaimpluwensya kung gaano kalakas ang karakter sa laro.
Maaari mong i-load ang NFT metadata at ang kanilang mga katangian gamit ang Metaplex SDK:

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

## Pinagsasama-sama ang mga NFT

Binibigyang-daan ka ng [Metaplex Fusion Trifle program](https://docs.metaplex.com/programs/fusion/overview) na magkaroon ang mga NFT ng iba pang mga NFT. Halimbawa, maaari kang lumikha ng isang plot ng halaman na NFT at pagkatapos ay gamitin ito upang pagsamahin ito sa isang water NFT at isang buto ng NFT upang lumikha ng isang Tomato NFT.

## Gumamit ng 3D Nfts sa isang laro

Ang bawat NFT metadata ay maaari ding magkaroon ng animation url. Ang url na ito ay maaaring maglaman ng isang video, gif o isang 3d na file. Karaniwang ginagamit ng mga 3d file na ito ang format na .glb o .gltf at maaaring dynamic na mai-load sa isang laro.
Para sa pagkakaisa maaari mong gamitin ang [GLTFast](https://github.com/atteneder/glTFast) package at sa js ang
[GLTFast JS](https://discoverthreejs.com/book/first-steps/load-models/). Para sa sanggunian ng [NFT metadata na may glb model](https://solscan.io/token/DzHPvbGzrHK4UcyeDurw2nuBFKNvt4Kb7K8Bx9dtsfn#metadata)

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

## I-customize ang mga NFT gamit ang mga item at katangian (Mga patak ng ulan na bota)

Gamit ang [Raindrops Boots program](https://docs.raindrops.xyz/services/boots) maaari kang magkaroon ng adventure character na nagmamay-ari ng espada at helmet. Kapag ang Character NFT ay ibebenta sa isang pamilihan, ang iba pang mga NFT na pagmamay-ari nito ay ibebenta rin.

## Paano lumikha ng isang koleksyon ng NFT

Karamihan sa mga NFT sa Solana ay sumusunod sa pamantayan ng Metaplex. Ang Metaplex ay isang kumpanyang nangangalaga sa pinaka ginagamit na pamantayan ng NFT sa Solana. Ang pinakakaraniwang paraan upang lumikha ng isang koleksyon ng NFT ay ang lumikha ng isang metaplex candy machine na nagbibigay-daan sa user na mag-mint ng mga pares ng metadata at mga imahe.

[Metaplex Docs](https://docs.metaplex.com/programs/candy-machine/how-to-guides/my-first-candy-machine-part1)

[Mag-set up ng candy machine nang sunud-sunod](https://youtu.be/0KHv1dMV8zU)

[NFTs](../references/nfts)