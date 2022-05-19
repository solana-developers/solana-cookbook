const transferTransaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromKeypair.publicKey,
    toPubkey: toKeypair.publicKey,
    lamports: lamportsToSend,
  })
);

await transferTransaction.add(
  new TransactionInstruction({
    keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from("Data to send in transaction", "utf-8"),
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
  })
);

await sendAndConfirmTransaction(connection, transferTransaction, [fromKeypair]);
