import {clusterApiUrl, Connection, Keypair, SystemProgram, Transaction} from "@solana/web3.js";

(async () => {
  // Connect to cluster
  const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed',
  );

  const wallet = Keypair.generate();

  const recentBlockhash = await connection.getRecentBlockhash();

  const transaction = new Transaction({
    recentBlockhash: recentBlockhash.blockhash
  })
    .add(SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports: 10
    }));
  transaction.sign(wallet);
  console.log(`SOL transfer would cost: ${transaction.signatures.length * recentBlockhash.feeCalculator.lamportsPerSignature} lamports`);
  // SOL transfer would cost: 5000 lamports
})();