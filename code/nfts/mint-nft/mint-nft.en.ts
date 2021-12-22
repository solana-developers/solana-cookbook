import { actions, utils, programs, NodeWallet} from '@metaplex/js'; 
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';


(async () => {
  const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed',
  );
  const keypair = Keypair.generate();
  const feePayerAirdropSignature = await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL);
  await connection.confirmTransaction(feePayerAirdropSignature);

  const mintNFTResponse = await actions.mintNFT({
    connection,
    wallet: new NodeWallet(keypair),
    uri: 'https://34c7ef24f4v2aejh75xhxy5z6ars4xv47gpsdrei6fiowptk2nqq.arweave.net/3wXyF1wvK6ARJ_9ue-O58CMuXrz5nyHEiPFQ6z5q02E',
    maxSupply: 1
  });

  console.log(mintNFTResponse);

})();