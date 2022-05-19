const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: Keypair.generate().publicKey,
    lamports: 10,
  })
);

const signature = await sendTransaction(transaction, connection);

await connection.confirmTransaction(signature, "processed");
