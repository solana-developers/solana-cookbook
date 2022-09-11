import {
  clusterApiUrl,
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

(async () => {
  // Connect to cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const payer = Keypair.generate();
  const payee = Keypair.generate();

  const recentBlockhash = await connection.getLatestBlockhash();

  const transaction = new Transaction({
    recentBlockhash: recentBlockhash.blockhash, 
    feePayer: payer.publicKey
  }).add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: payee.publicKey,
      lamports: 10,
    })
  );

  const fees = await transaction.getEstimatedFee(connection);
  console.log(`Estimated SOL transfer cost: ${fees} lamports`);
  // Estimated SOL transfer cost: 5000 lamports
})();
