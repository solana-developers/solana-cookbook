const recentBlockhash = await connection.getLatestBlockhash();

const transaction = new Transaction({
  recentBlockhash: recentBlockhash.blockhash,
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
