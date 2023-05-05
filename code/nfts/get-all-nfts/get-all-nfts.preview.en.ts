const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
metaplex.use(keypairIdentity(keypair));

const owner = new PublicKey("2R4bHmSBHkHAskerTHE6GE1Fxbn31kaD5gHqpsPySVd7");
const allNFTs = await metaplex.nfts().findAllByOwner({ owner });

console.log(allNFTs);
