let tx = new Transaction().add(
  // nonce advance must be the first instruction
  SystemProgram.nonceAdvance({
    noncePubkey: nonceAccountPubkey,
    authorizedPubkey: nonceAccountAuth.publicKey,
  }),
  // after that, you do what you really want to do, here we append a transfer instruction as an example.
  SystemProgram.transfer({
    fromPubkey: feePayer.publicKey,
    toPubkey: nonceAccountAuth.publicKey,
    lamports: 1,
  })
);
// assign `nonce` as recentBlockhash
tx.recentBlockhash = nonceAccount.nonce;
tx.feePayer = feePayer.publicKey;
tx.sign(
  feePayer,
  nonceAccountAuth
); /* fee payer + nonce account authority + ... */

console.log(`txhash: ${await connection.sendRawTransaction(tx.serialize())}`);
