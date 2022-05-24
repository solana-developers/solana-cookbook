const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: Keypair.generate().publicKey,
    lamports: 10,
  })
);

await transaction.add(
  new TransactionInstruction({
    keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from("Data to send in transaction", "utf-8"),
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
  })
);

const signature = await sendTransaction(transaction, connection);

await connection.confirmTransaction(signature, "processed");
