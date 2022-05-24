const transferTransaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: lamportsToSend,
  })
);

await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
