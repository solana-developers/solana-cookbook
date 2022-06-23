import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const keypair = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(process.env.SOLANA_KEYPAIR!.toString()))
  );

  const metaplex = new Metaplex(connection);
  metaplex.use(keypairIdentity(keypair));

  const feePayerAirdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(feePayerAirdropSignature);

  const mintNFTResponse = await metaplex.nfts().create({
    uri: "https://ffaaqinzhkt4ukhbohixfliubnvpjgyedi3f2iccrq4efh3s.arweave.net/KUAIIbk6p8oo4XHRcq0U__C2r0mwQaNl0gQow4Qp9yk",
    maxSupply: 1,
  });

  console.log(mintNFTResponse);
})();
