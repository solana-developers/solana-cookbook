const transactionInstruction = SystemProgram.transfer({
  fromPubkey: new PublicKey(publicKey),
  toPubkey: new PublicKey(destPublicKey),
  lamports: 0.1 * LAMPORTS_PER_SOL,
});
const transaction = new Transaction({
  recentBlockhash: blockhash,
  feePayer: new PublicKey(publicKey),
}).add(transactionInstruction);

const res = await torus.sendTransaction(transaction);
