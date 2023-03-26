import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

(async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const keypair = Keypair.generate();

  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const mintAddress = new PublicKey(
    "Ay1U9DWphDgc7hq58Yj1yHabt91zTzvV2YJbAWkPNbaK"
  );

  const nft = await metaplex.nfts().findByMint({ mintAddress });

  console.log(nft.json);
  /*
  {
    name: 'SMB #139',
    symbol: 'SMB',
    description: 'SMB is a collection of 5000 randomly generated 24x24 pixels NFTs on the Solana Blockchain. Each SolanaMonkey is unique and comes with different type and attributes varying in rarity.',
    seller_fee_basis_points: 600,
    image: 'https://arweave.net/tZrNpbFUizSoFnyTqP4n2e1Tf7WvP3siUwFWKMMid_Q',
    external_url: 'https://solanamonkey.business/',
    collection: { name: 'SMB Gen2', family: 'SMB' },
    attributes: [
      { trait_type: 'Attributes Count', value: 2 },
      { trait_type: 'Type', value: 'Solana' },
      { trait_type: 'Clothes', value: 'Orange Shirt' },
      { trait_type: 'Ears', value: 'None' },
      { trait_type: 'Mouth', value: 'None' },
      { trait_type: 'Eyes', value: 'Cool Glasses' },
      { trait_type: 'Hat', value: 'None' }
    ],
    properties: {
      files: [ [Object], [Object] ],
      category: 'image',
      creators: [ [Object] ]
    }
  }
  */
})();
